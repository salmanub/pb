// ============================================================
//  Vilardell PDF · Cloudflare Worker (Browser Rendering / Puppeteer)
//  Renderiza HTML -> PDF pixel-perfect (fuentes web reales).
//  Apps Script le envía el HTML por POST y recibe el PDF.
//  Protegido por token (cabecera x-auth-token == secret RENDER_TOKEN).
// ============================================================
import puppeteer from '@cloudflare/puppeteer';

// Siempre lanza un browser nuevo. Reutilizar sesiones causa
// "Session closed" intermitente porque Cloudflare las recicla.
async function launchBrowser(env) {
  return await puppeteer.launch(env.BROWSER);
}

// Flujo completo: launch browser → new page → setContent → pdf → close.
// Si falla, el caller reintenta con un browser fresco.
async function renderPdf(env, html, pdfOpts) {
  let browser;
  try {
    browser = await launchBrowser(env);
    const page = await browser.newPage();

    // Cargar HTML — 'load' es más fiable que 'networkidle0' con @import de fuentes
    await page.setContent(html, { waitUntil: 'load', timeout: 15000 });

    // Esperar fuentes web con timeout propio (no bloquear si falla)
    try {
      await page.evaluate(() =>
        Promise.race([
          document.fonts && document.fonts.ready,
          new Promise(r => setTimeout(r, 5000))
        ])
      );
    } catch (_) { /* fuentes no disponibles — se usan stacks de fallback */ }

    // Pausa para que el layout se estabilice tras carga de fuentes
    await new Promise(r => setTimeout(r, 400));

    const pdf = await page.pdf(pdfOpts);
    return pdf;
  } finally {
    // Siempre cerrar (no disconnect): cada render usa su propio browser
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

    // Binding check
    if (!env.BROWSER) {
      return new Response('Browser Rendering binding "BROWSER" no configurado', { status: 500 });
    }

    // Parse body
    let payload;
    try { payload = await request.json(); }
    catch (_) { return new Response('Invalid JSON', { status: 400 }); }

    const html = payload && payload.html;
    if (!html) return new Response('Missing "html"', { status: 400 });

    // Opciones del PDF
    const pdfOpts = {
      format: payload.format || 'A4',
      printBackground: true,
      preferCSSPageSize: true,
      margin: payload.margin || { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
    };

    // Header/footer (si el CRM los envía)
    if (payload.headerHtml || payload.footerHtml) {
      pdfOpts.displayHeaderFooter = true;
      pdfOpts.headerTemplate = payload.headerHtml || '<span></span>';
      pdfOpts.footerTemplate = payload.footerHtml || '<span></span>';
    }

    // Intentar hasta 3 veces con browser fresco cada vez
    const MAX_ATTEMPTS = 3;
    let lastError;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
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
        console.warn('Render intento ' + attempt + '/' + MAX_ATTEMPTS + ' falló: ' + msg);

        // Rate limit → no reintentar más, no tiene sentido
        if (msg.includes('Rate limit') || msg.includes('Unable to create')) {
          break;
        }

        // Espera progresiva antes del siguiente intento
        if (attempt < MAX_ATTEMPTS) {
          await new Promise(r => setTimeout(r, 1000 * attempt));
        }
      }
    }

    // Todos los intentos fallaron
    const msg = (lastError && lastError.message) || String(lastError);
    console.error('Render PDF fallo definitivo: ' + msg);
    const isRateLimit = msg.includes('Rate limit') || msg.includes('Unable to create');
    return new Response(
      JSON.stringify({ error: msg, isRateLimit, suggestion: isRateLimit ? 'Espera 1 min y reintenta' : null }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
