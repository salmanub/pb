// ============================================================
//  Vilardell PDF · Cloudflare Worker (Browser Rendering / Puppeteer)
//  Renderiza HTML -> PDF pixel-perfect (fuentes web reales).
//  Apps Script le envía el HTML por POST y recibe el PDF.
//  Protegido por token (cabecera x-auth-token == secret RENDER_TOKEN).
// ============================================================
import puppeteer from '@cloudflare/puppeteer';

// Reutiliza una sesión de navegador libre si existe (ahorra arranques en
// frío). Si no hay ninguna, lanza una nueva.
async function acquireBrowser(env) {
  try {
    const sessions = await puppeteer.sessions(env.BROWSER);
    const free = sessions.find((s) => !s.connectionId);
    if (free) {
      return await puppeteer.connect(env.BROWSER, free.sessionId);
    }
  } catch (e) {
    console.error('sessions/connect fallo, lanzando nueva: ' + (e && e.message));
  }
  return await puppeteer.launch(env.BROWSER);
}

// Elimina @import y @font-face de un fragmento HTML.
// Los templates de header/footer de Puppeteer se renderizan en un contexto
// aislado sin acceso a red, así que los @import y @font-face con URLs
// siempre fallan y causan "Protocol error (Page.printToPDF): Printing failed".
// Los font-family ya tienen stacks de fallback (Georgia, Arial, Courier New).
function stripFontLoading(html) {
  // Quitar @import url(...); completo
  html = html.replace(/@import\s+url\([^)]*\)\s*;?\s*/g, '');
  // Quitar bloques @font-face { ... }
  html = html.replace(/@font-face\s*\{[^}]*\}/g, '');
  // Quitar tags <style> vacíos que queden
  html = html.replace(/<style>\s*<\/style>/gi, '');
  return html;
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
      console.error('Falta el binding BROWSER.');
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
      await page.setContent(html, { waitUntil: 'networkidle0' });
      // Espera a que las fuentes web (Spectral, IBM Plex) estén listas
      try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch (e) {}

      // Opciones del PDF
      const pdfOpts = {
        format: payload.format || 'A4',
        printBackground: true,
        preferCSSPageSize: true,
        margin: payload.margin || { top: '0mm', right: '0mm', bottom: '0mm', left: '0mm' }
      };

      // Header/footer: Puppeteer los renderiza en un contexto aislado sin
      // acceso a red. Hay que eliminar @import/@font-face de los templates
      // para evitar "Printing failed". Los font stacks de fallback
      // (Georgia, Arial, Courier New) se usan automáticamente.
      if (payload.headerHtml || payload.footerHtml) {
        pdfOpts.displayHeaderFooter = true;
        pdfOpts.headerTemplate = payload.headerHtml
          ? stripFontLoading(payload.headerHtml)
          : '<span></span>';
        pdfOpts.footerTemplate = payload.footerHtml
          ? stripFontLoading(payload.footerHtml)
          : '<span></span>';
      }

      const pdf = await page.pdf(pdfOpts);
      const name = String(payload.filename || 'documento').replace(/[^\w.-]/g, '_');
      return new Response(pdf, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': 'inline; filename="' + name + '.pdf"'
        }
      });
    } catch (e) {
      const msg = (e && e.message) ? e.message : String(e);
      console.error('Render PDF fallo: ' + msg);
      return new Response(
        JSON.stringify({ error: msg, isRateLimit: msg.includes('Rate limit'), suggestion: null }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    } finally {
      if (browser) {
        try { await browser.disconnect(); }
        catch (e) { try { await browser.close(); } catch (e2) {} }
      }
    }
  }
};
