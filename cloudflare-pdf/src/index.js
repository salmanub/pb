// ============================================================
//  Vilardell PDF · Cloudflare Worker (Browser Rendering / Puppeteer)
//  Renderiza HTML -> PDF pixel-perfect.
//  Apps Script le envía el HTML por POST y recibe el PDF.
//  Protegido por token (cabecera x-auth-token == secret RENDER_TOKEN).
// ============================================================
import puppeteer from '@cloudflare/puppeteer';

// Reemplaza @import url("...") por el CSS real inline, para que el
// browser no tenga que hacer network requests (evita timeouts y
// "Printing failed" por fuentes colgadas).
// Además, convierte las URLs relativas de los @font-face src a absolutas
// para que funcionen con page.setContent (que no tiene base URL).
async function inlineCssImports(html) {
  const importRe = /@import\s+url\(["']([^"']+)["']\)\s*;?/g;
  const urls = new Set();
  let m;
  while ((m = importRe.exec(html)) !== null) urls.add(m[1]);
  if (!urls.size) return html;

  for (const url of urls) {
    try {
      const res = await fetch(url, { cf: { cacheTtl: 3600 } });
      if (res.ok) {
        let css = await res.text();

        // Extraer el origin de la URL del CSS para absolutificar las rutas
        // e.g. "https://perito.barcelona/assets/css/fonts.css" → "https://perito.barcelona"
        let origin = '';
        try { origin = new URL(url).origin; } catch (_) {}

        // Convertir rutas relativas (/assets/fonts/...) a absolutas
        if (origin) {
          css = css.replace(/url\(([^)]*)\)/g, (match, inner) => {
            const cleaned = inner.trim().replace(/^['"]|['"]$/g, '');
            if (cleaned.startsWith('/') && !cleaned.startsWith('//')) {
              return 'url(' + origin + cleaned + ')';
            }
            return match;
          });
        }

        // Reemplazar todas las ocurrencias de este @import con el CSS inline
        html = html.replaceAll('@import url("' + url + '");', '/* inlined: ' + url + ' */\n' + css);
        html = html.replaceAll("@import url('" + url + "');", '/* inlined: ' + url + ' */\n' + css);
        html = html.replaceAll('@import url("' + url + '")', '/* inlined: ' + url + ' */\n' + css);
        html = html.replaceAll("@import url('" + url + "')", '/* inlined: ' + url + ' */\n' + css);
      }
    } catch (e) {
      console.warn('No se pudo inlinear ' + url + ': ' + (e && e.message));
    }
  }
  return html;
}

// Flujo completo: launch → page → setContent → pdf → close.
async function renderPdf(env, html, pdfOpts) {
  let browser;
  try {
    browser = await puppeteer.launch(env.BROWSER);
    const page = await browser.newPage();

    // Inyectar HTML con CSS ya inlineado — no hay network requests pendientes
    await page.setContent(html, { waitUntil: 'load', timeout: 20000 });

    // Pequeña pausa para estabilizar layout
    await new Promise(r => setTimeout(r, 500));

    const pdf = await page.pdf(pdfOpts);
    return pdf;
  } finally {
    if (browser) {
      try { await browser.close(); } catch (_) {}
    }
  }
}

export default {
  async fetch(request, env) {
    // Health-check
    if (request.method === 'GET') {
      return new Response('Vilardell PDF renderer · OK', { status: 200 });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Auth
    const token = request.headers.get('x-auth-token') || '';
    if (!env.RENDER_TOKEN || token !== env.RENDER_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }

    if (!env.BROWSER) {
      return new Response('Browser Rendering binding "BROWSER" no configurado', { status: 500 });
    }

    // Parse body
    let payload;
    try { payload = await request.json(); }
    catch (_) { return new Response('Invalid JSON', { status: 400 }); }

    let html = payload && payload.html;
    if (!html) return new Response('Missing "html"', { status: 400 });

    // Pre-proceso: inlinear @import url() para eliminar dependencias de red
    try {
      html = await inlineCssImports(html);
    } catch (e) {
      console.warn('inlineCssImports falló: ' + (e && e.message));
    }

    // Si viene headerHtml/footerHtml, fusionarlos en el HTML principal
    // en lugar de usar displayHeaderFooter de Puppeteer (que es inestable
    // en Cloudflare Workers con templates complejos).
    if (payload.headerHtml || payload.footerHtml) {
      let headerCss = '';
      let headerBody = '';
      let footerBody = '';

      if (payload.headerHtml) {
        // Inlinear también los @import del header
        let hdr = payload.headerHtml;
        try { hdr = await inlineCssImports(hdr); } catch (_) {}
        headerBody = '<div id="pdf-hdr" style="position:fixed;top:0;left:0;right:0;z-index:999;">' + hdr + '</div>';
      }
      if (payload.footerHtml) {
        let ftr = payload.footerHtml;
        try { ftr = await inlineCssImports(ftr); } catch (_) {}
        footerBody = '<div id="pdf-ftr" style="position:fixed;bottom:0;left:0;right:0;z-index:999;">' + ftr + '</div>';
      }

      // Inyectar header/footer justo después del <body>
      html = html.replace(/<body([^>]*)>/i, '<body$1>' + headerBody + footerBody);
    }

    // Opciones del PDF — NO usar displayHeaderFooter
    const pdfOpts = {
      format: payload.format || 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: payload.margin || { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
    };

    // Retry hasta 3 veces con browser fresco
    const MAX = 3;
    let lastError;

    for (let i = 1; i <= MAX; i++) {
      try {
        const pdf = await renderPdf(env, html, pdfOpts);
        const name = String(payload.filename || 'documento').replace(/[^\w.-]/g, '_');
        return new Response(pdf, {
          headers: {
            'Content-Type': 'application/pdf',
            'Content-Disposition': 'inline; filename="' + name + '.pdf"'
          }
        });
      } catch (e) {
        lastError = e;
        const msg = (e && e.message) || String(e);
        console.warn('Render intento ' + i + '/' + MAX + ': ' + msg);
        if (msg.includes('Rate limit') || msg.includes('Unable to create')) break;
        if (i < MAX) await new Promise(r => setTimeout(r, 1500 * i));
      }
    }

    const msg = (lastError && lastError.message) || String(lastError);
    console.error('PDF fallo definitivo: ' + msg);
    const isRL = msg.includes('Rate limit') || msg.includes('Unable to create');
    return new Response(
      JSON.stringify({ error: msg, isRateLimit: isRL, suggestion: isRL ? 'Espera 1 min' : null }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
