/**
 * POST /api/contacto — Cloudflare Pages Function (perito.barcelona)
 *
 * Proxy to Make.com webhooks. Routes to the correct webhook based on
 * the "perfil" field in the payload:
 *   - perfil = "particular" → env.MAKE_WEBHOOK_PARTICULAR
 *   - perfil = "profesional" (or any other / missing) → env.MAKE_WEBHOOK_PROFESIONAL
 *
 * Env vars (set in Cloudflare Pages → Settings → Environment variables):
 *   MAKE_WEBHOOK_PARTICULAR   — webhook URL for homeowner forms
 *   MAKE_WEBHOOK_PROFESIONAL  — webhook URL for professional forms
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

async function forwardWithRetry(url, payload, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return true;
      lastErr = new Error(`Make responded ${res.status}`);
    } catch (err) {
      lastErr = err;
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, 400 * (i + 1)));
  }
  console.error('contacto: forward to Make failed after retries:', lastErr && lastErr.message);
  return false;
}

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const contentType = request.headers.get('content-type') || '';
    let data;

    if (contentType.includes('application/json')) {
      data = await request.json();
    } else {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    }

    // Honeypot: hidden field "website" — if filled, it's a bot → fake success
    if (data.website && String(data.website).trim() !== '') {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: CORS_HEADERS,
      });
    }

    // Detect language from Referer or payload
    const referer = request.headers.get('referer') || '';
    let lang = data.lang || 'es';
    if (!data.lang) {
      if (referer.includes('/ca/')) lang = 'ca';
      else if (referer.includes('/en/')) lang = 'en';
    }

    // Build enriched payload
    const payload = {
      ...data,
      lang,
      timestamp: data.timestamp || new Date().toISOString(),
      source: data.source || 'perito.barcelona',
      referer,
      ua: request.headers.get('user-agent') || '',
    };

    // Route to the correct webhook based on perfil
    const perfil = String(data.perfil || '').toLowerCase();
    const webhookUrl = perfil === 'particular'
      ? (env && env.MAKE_WEBHOOK_PARTICULAR)
      : (env && env.MAKE_WEBHOOK_PROFESIONAL);

    if (!webhookUrl) {
      const missing = perfil === 'particular' ? 'MAKE_WEBHOOK_PARTICULAR' : 'MAKE_WEBHOOK_PROFESIONAL';
      console.error(`[contacto] ${missing} not configured. Payload:`, JSON.stringify(payload));
      return new Response(JSON.stringify({ ok: false, error: 'webhook not configured' }), {
        status: 500,
        headers: CORS_HEADERS,
      });
    }

    const sent = await forwardWithRetry(webhookUrl, payload);

    if (!sent) {
      return new Response(JSON.stringify({ ok: false, error: 'webhook delivery failed' }), {
        status: 502,
        headers: CORS_HEADERS,
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: CORS_HEADERS,
    });

  } catch (err) {
    console.error('contacto error:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: CORS_HEADERS,
    });
  }
}
