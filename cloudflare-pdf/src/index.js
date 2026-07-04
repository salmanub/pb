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

    // Cuerpo JSON: { html, filename?, format?, margin? }
    let payload;
    try { payload = await request.json(); }
    catch (e) { return new Response('Invalid JSON', { status: 400 }); }

    const html = payload && payload.html;
    if (!html) return new Response('Missing "html"', { status: 400 });

    let browser;
    try {
      browser = await acquireBrowser(env);
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      // Espera a que las fuentes web (Spectral, IBM Plex) estén listas
      try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch (e) {}
      const pdf = await page.pdf({
        format: payload.format || 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: payload.margin || { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
      });
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
      return new Response('PDF render error: ' + msg, { status: 500 });
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
