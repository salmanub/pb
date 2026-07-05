/**
 * POST /api/contacto — Cloudflare Pages Function (perito.barcelona)
 *
 * Dual-write: envia al CRM (Apps Script) directamente Y a Make.com.
 * Si Make.com no está configurado, el lead llega igualmente al CRM.
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

async function postWithRetry(url, payload, attempts = 3) {
  const body = JSON.stringify(payload);
  const headers = { 'Content-Type': 'application/json' };
  let lastErr;

  for (let i = 0; i < attempts; i++) {
    try {
      let target = url;
      let res;

      // Follow up to 10 redirects manually, preserving POST method
      for (let hop = 0; hop < 10; hop++) {
        res = await fetch(target, {
          method: 'POST',
          headers,
          body,
          redirect: 'manual',
        });

        if (res.status >= 300 && res.status < 400) {
          const location = res.headers.get('location');
          if (location) {
            target = location;
            continue;
          }
        }
        break; // not a redirect, we have the final response
      }

      if (res.ok) return { ok: true, status: res.status };
      lastErr = new Error(`responded ${res.status}`);
    } catch (err) {
      lastErr = err;
    }
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, 400 * (i + 1)));
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

    // ── 1. Envío DIRECTO al CRM (Apps Script web app) ──────────────
    const crmUrl = env && env.CRM_WEBAPP_URL;
    let crmOk = false;

    if (crmUrl) {
      const crmResult = await postWithRetry(crmUrl, payload);
      crmOk = crmResult.ok;
      if (!crmOk) {
        console.error('[contacto] CRM direct failed:', crmResult.error);
      }
    } else {
      console.warn('[contacto] CRM_WEBAPP_URL not configured — leads will only go to Make.com');
    }

    // ── 2. Envío a Make.com (complementario, para automatizaciones) ─
    const perfil = String(data.perfil || '').toLowerCase();
    const webhookUrl = perfil === 'particular'
      ? (env && env.MAKE_WEBHOOK_PARTICULAR)
      : (env && env.MAKE_WEBHOOK_PROFESIONAL);

    let makeOk = false;
    if (webhookUrl) {
      const makeResult = await postWithRetry(webhookUrl, payload);
      makeOk = makeResult.ok;
      if (!makeOk) {
        console.error('[contacto] Make.com webhook failed:', makeResult.error);
      }
    }

    // ── Resultado ──────────────────────────────────────────────────
    if (!crmOk && !makeOk) {
      // Ninguno de los dos destinos funcionó
      const reason = !crmUrl && !webhookUrl
        ? 'No CRM_WEBAPP_URL nor MAKE_WEBHOOK configured'
        : 'Both CRM and Make.com delivery failed';
      console.error('[contacto] TOTAL FAILURE:', reason, JSON.stringify(payload));
      return new Response(JSON.stringify({ ok: false, error: reason }), {
        status: 502,
        headers: CORS_HEADERS,
      });
    }

    return new Response(JSON.stringify({ ok: true, crm: crmOk, make: makeOk }), {
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
