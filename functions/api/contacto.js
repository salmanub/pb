/**
 * Cloudflare Pages Function — /api/contacto
 *
 * Accepts POST from:
 *   1. Intake modal (JSON body from fetch())
 *   2. Home inline form (FormData from <form> submit)
 *
 * Forwards payload to Make webhook and redirects to /gracias/.
 *
 * Variables de entorno requeridas:
 *   MAKE_WEBHOOK_URL — URL del webhook de Make.com
 */
export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const contentType = request.headers.get('content-type') || '';
    let data;

    // Parse body based on content type
    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    }

    // Detect language from Referer or payload
    const referer = request.headers.get('referer') || '';
    let lang = data.lang || 'es';
    if (referer.includes('/ca/')) lang = 'ca';
    else if (referer.includes('/en/')) lang = 'en';
    else if (referer.includes('/fr/')) lang = 'fr';
    else if (referer.includes('/it/')) lang = 'it';

    // Build webhook payload
    const payload = {
      ...data,
      lang,
      perfil: data.perfil || '',
      timestamp: data.timestamp || new Date().toISOString(),
      source: data.source || 'perito.barcelona',
      referer,
    };

    // Forward to Make webhook
    const webhookUrl = env.MAKE_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    } else {
      console.log('[contacto] No MAKE_WEBHOOK_URL set. Payload:', JSON.stringify(payload));
    }

    // Redirect to thank you page
    const redirectMap = {
      es: '/gracias/',
      ca: '/ca/gracies/',
      en: '/en/thank-you/',
      fr: '/fr/merci/',
      it: '/it/grazie/',
    };
    const redirectUrl = redirectMap[lang] || '/gracias/';

    // For JSON requests (from fetch), return JSON response instead of redirect
    if (contentType.includes('application/json')) {
      return new Response(JSON.stringify({ ok: true, redirect: redirectUrl }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    // For form submissions, redirect
    return Response.redirect(new URL(redirectUrl, request.url).href, 303);
  } catch (err) {
    console.error('Contact form error:', err);
    return new Response(JSON.stringify({ ok: false, error: 'Error processing form' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
