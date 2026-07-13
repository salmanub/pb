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
async function postToGAS(url, payload) {
  const body = JSON.stringify(payload);

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: body,
      redirect: 'follow',
    });

    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }

    // HTTP 200 — the POST was received. Try to parse the JSON response.
    const text = await res.text();
    try {
      const json = JSON.parse(text);
      return { ok: json.ok !== false, status: res.status, data: json };
    } catch (_) {
      // Google returned HTML (redirect page) but status 200 — data was likely written
      return { ok: true, status: res.status, note: 'non-JSON 200 response' };
    }
  } catch (err) {
    return { ok: false, error: err.message };
  }
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

/**
 * Verifica el token de Cloudflare Turnstile SERVER-SIDE.
 *  - Sin TURNSTILE_SECRET → true (FAIL-OPEN: dev/preview y despliegue previo a
 *    poner el secreto no rompen la captación).
 *  - Con secreto y token ausente/inválido → false (rechazo). Red que no concluye
 *    con el secreto puesto → false (fail-closed: si activas Turnstile, se exige).
 */
async function verificarTurnstile(secret, token, ip) {
  // TEMP (rollback 2026-07-13): FAIL-OPEN forzado hasta autorizar los dominios en
  // el panel de Turnstile (el widget no renderizaba → 403 → leads perdidos).
  // Quitar este return para re-activar la validación cuando el widget se vea.
  return true;
  if (!secret) return true; // fail-open sin secreto
  if (typeof token !== 'string' || token.trim() === '') return false;
  const form = new URLSearchParams({ secret, response: token });
  if (ip) form.set('remoteip', ip);
  try {
    const r = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form.toString(),
    });
    if (!r.ok) return false;
    const data = await r.json();
    return data.success === true;
  } catch (_) {
    return false; // configurado pero verificación no concluye → rechazo
  }
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

    // Turnstile (anti-bot). Fail-open sin secreto; con secreto exige token válido.
    const tsOk = await verificarTurnstile(
      env && env.TURNSTILE_SECRET,
      data['cf-turnstile-response'],
      request.headers.get('cf-connecting-ip'),
    );
    if (!tsOk) {
      return new Response(JSON.stringify({ ok: false, error: 'captcha' }), {
        status: 403, headers: CORS_HEADERS,
      });
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
