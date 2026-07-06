// ============================================================
//  Vilardell PDF · Cloudflare Worker (Browser Rendering / Puppeteer)
//  Renderiza HTML -> PDF pixel-perfect (fuentes web reales).
//  Apps Script le envía el HTML por POST y recibe el PDF.
//  Protegido por token (cabecera x-auth-token == secret RENDER_TOKEN).
//
//  Nota: si algo falla aquí, el .gs cae a su conversor HTML->PDF
//  interno, así que la facturación nunca se bloquea.
// ============================================================
import puppeteer from '@cloudflare/puppeteer';

// Reutiliza una sesión de navegador libre si existe (ahorra arranques en
// frío). Si no hay ninguna, lanza una nueva. Cloudflare recicla las sesiones
// inactivas automáticamente, así que siempre hacemos disconnect (no close).
async function acquireBrowser(env) {
  try {
    const sessions = await puppeteer.sessions(env.BROWSER);
    const free = sessions.find((s) => !s.connectionId);
    if (free) {
      return await puppeteer.connect(env.BROWSER, free.sessionId);
    }
  } catch (e) {
    // Si listar/conectar falla, caemos a un launch nuevo.
    console.error('sessions/connect fallo, lanzando nueva: ' + (e && e.message));
  }
  return await puppeteer.launch(env.BROWSER);
}

export default {
  async fetch(request, env) {
    // Health-check simple
    if (request.method === 'GET') {
      return new Response('Vilardell PDF renderer · OK', { status: 200 });
    }
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    // Auth por token
    const token = request.headers.get('x-auth-token') || '';
    if (!env.RENDER_TOKEN || token !== env.RENDER_TOKEN) {
      return new Response('Unauthorized', { status: 401 });
    }

    // Comprobación de binding (config incorrecta => error legible, no crash mudo)
    if (!env.BROWSER) {
      console.error('Falta el binding BROWSER (Browser Rendering no habilitado).');
      return new Response('Browser Rendering binding "BROWSER" no configurado', { status: 500 });
    }

    // Cuerpo JSON: { html, filename?, format?, margin?, headerHtml?, footerHtml? }
    let payload;
    try { payload = await request.json(); }
    catch (e) { return new Response('Invalid JSON', { status: 400 }); }

    const html = payload && payload.html;
    if (!html) return new Response('Missing "html"', { status: 400 });

    let browser;
    try {
      browser = await acquireBrowser(env);
      const page = await browser.newPage();

      // Cargar el HTML — usar 'load' en lugar de 'networkidle0' para evitar
      // timeouts cuando @import de fuentes tarda. Luego esperar fuentes aparte.
      await page.setContent(html, { waitUntil: 'load', timeout: 15000 });

      // Espera a que las fuentes web (Spectral, IBM Plex) estén listas,
      // con timeout propio para no bloquear si las fuentes no cargan.
      try {
        await page.evaluate(() => {
          return Promise.race([
            document.fonts && document.fonts.ready,
            new Promise(r => setTimeout(r, 5000))
          ]);
        });
      } catch (e) {
        console.warn('fonts.ready falló (no bloqueante): ' + (e && e.message));
      }

      // Breve pausa para que el layout se estabilice tras carga de fuentes
      await new Promise(r => setTimeout(r, 300));

      // Opciones del PDF
      const pdfOpts = {
        format: payload.format || 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: payload.margin || { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
      };

      // Header/footer template de Puppeteer (si el CRM los envía)
      if (payload.headerHtml || payload.footerHtml) {
        pdfOpts.displayHeaderFooter = true;
        pdfOpts.headerTemplate = payload.headerHtml || '<span></span>';
        pdfOpts.footerTemplate = payload.footerHtml || '<span></span>';
      }

      // Generar PDF con retry: a veces el primer intento falla con
      // "Protocol error (Page.printToPDF)" por timing de renderizado.
      let pdf;
      let lastError;
      for (let attempt = 0; attempt < 3; attempt++) {
        try {
          pdf = await page.pdf(pdfOpts);
          break;
        } catch (e) {
          lastError = e;
          console.warn('printToPDF intento ' + (attempt + 1) + ' falló: ' + (e && e.message));
          if (attempt < 2) {
            await new Promise(r => setTimeout(r, 500 * (attempt + 1)));
          }
        }
      }

      if (!pdf) {
        throw lastError || new Error('printToPDF falló tras 3 intentos');
      }

      const name = String(payload.filename || 'documento').replace(/[^\w.-]/g, '_');
      return new Response(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="' + name + '.pdf"'
        }
      });
    } catch (e) {
      // Error legible en `wrangler tail`; el .gs usará su respaldo interno.
      const msg = (e && e.message) ? e.message : String(e);
      console.error('Render PDF fallo: ' + msg);

      // Distinguir rate limit de otros errores
      const isRateLimit = msg.includes('Rate limit') || msg.includes('Unable to create');
      return new Response(
        JSON.stringify({ error: msg, isRateLimit, suggestion: isRateLimit ? 'Espera 1 min y reintenta' : null }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    } finally {
      // disconnect mantiene viva la sesión para reutilizarla; Cloudflare
      // cierra las inactivas. Si disconnect no aplica, cerramos.
      if (browser) {
        try { await browser.disconnect(); }
        catch (e) { try { await browser.close(); } catch (e2) {} }
      }
    }
  }
};
