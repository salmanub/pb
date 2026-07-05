/**
 * POST /api/contacto — Cloudflare Pages Function (perito.barcelona)
 *
 * Dual-write: envia al CRM (Apps Script) directamente Y a Make.com.
 *
 * Env vars (Cloudflare Pages → Settings → Environment variables):
 *   CRM_WEBAPP_URL             — URL del web app de Apps Script (doPost)
 *   MAKE_WEBHOOK_PARTICULAR    — (opcional) webhook Make.com para particulares
 *   MAKE_WEBHOOK_PROFESIONAL   — (opcional) webhook Make.com para profesionales
 */

const CORS_HEADERS = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

/**
 * POST to Google Apps Script web app.
 * GAS redirects POST→GET (losing body), so we use a workaround:
 * encode the payload as a URL query parameter that doGet can also read,
 * OR use the Apps Script /exec endpoint which accepts the POST after redirect.
 *
 * Strategy: just use fetch with redirect:'follow' and check the response text.
 * Even if the redirect changes POST to GET, we verify the actual response.
 */
async function postToGAS(url, payload, attempts = 3) {
  const body = JSON.stringify(payload);
  let lastErr;

  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain' },
        body: body,
        redirect: 'follow',
      });

      if (!res.ok) {
        lastErr = new Error(`HTTP ${res.status}`);
        continue;
      }

      // Check response body for Apps Script JSON
      const text = await res.text();
      try {
        const json = JSON.parse(text);
        if (json.ok) return { ok: true, status: res.status, data: json };
        lastErr = new Error(json.error || 'CRM returned ok:false');
      } catch (_) {
        // Response is HTML (redirect landed on a page), not JSON → POST was lost
        lastErr = new Error('Response was not JSON (redirect lost POST body)');
      }
    } catch (err) {
      lastErr = err;
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, 500 * (i + 1)));
  }
  return { ok: false, error: lastErr && lastErr.message };
}

async function postToWebhook(url, payload, attempts = 2) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) return { ok: true, status: res.status };
      lastErr = new Error(`responded ${res.status}`);
    } catch (err) {
      lastErr = err;
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, 400));
  }
  return { ok: false, error: lastErr && lastErr.message };
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

    // Honeypot
    if (data.website && String(data.website).trim() !== '') {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: CORS_HEADERS });
    }

    // Detect language
    const referer = request.headers.get('referer') || '';
    let lang = data.lang || 'es';
    if (!data.lang) {
      if (referer.includes('/ca/')) lang = 'ca';
      else if (referer.includes('/en/')) lang = 'en';
    }

    // Enriched payload
    const payload = {
      ...data,
      lang,
      timestamp: data.timestamp || new Date().toISOString(),
      source: data.source || 'perito.barcelona',
      referer,
      ua: request.headers.get('user-agent') || '',
    };

    // ── 1. Send to CRM (Apps Script web app) ──────────────────
    const crmUrl = env && env.CRM_WEBAPP_URL;
    let crmOk = false;

    if (crmUrl) {
      const crmResult = await postToGAS(crmUrl, payload);
      crmOk = crmResult.ok;
      if (!crmOk) {
        console.error('[contacto] CRM failed:', crmResult.error);
      }
    } else {
      console.warn('[contacto] CRM_WEBAPP_URL not set');
    }

    // ── 2. Send to Make.com (optional) ────────────────────────
    const perfil = String(data.perfil || '').toLowerCase();
    const webhookUrl = perfil === 'particular'
      ? (env && env.MAKE_WEBHOOK_PARTICULAR)
      : (env && env.MAKE_WEBHOOK_PROFESIONAL);

    let makeOk = false;
    if (webhookUrl) {
      const makeResult = await postToWebhook(webhookUrl, payload);
      makeOk = makeResult.ok;
      if (!makeOk) console.error('[contacto] Make.com failed:', makeResult.error);
    }

    // ── Result ────────────────────────────────────────────────
    if (!crmOk && !makeOk) {
      const reason = !crmUrl && !webhookUrl
        ? 'No CRM_WEBAPP_URL nor MAKE_WEBHOOK configured'
        : 'Both CRM and Make.com delivery failed';
      console.error('[contacto] TOTAL FAILURE:', reason);
      return new Response(JSON.stringify({ ok: false, error: reason }), {
        status: 502, headers: CORS_HEADERS,
      });
    }

    return new Response(JSON.stringify({ ok: true, crm: crmOk, make: makeOk }), {
      status: 200, headers: CORS_HEADERS,
    });

  } catch (err) {
    console.error('contacto error:', err);
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500, headers: CORS_HEADERS,
    });
  }
}
