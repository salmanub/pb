// POST /api/stripe-webhook — Stripe notifica el pago; verificamos firma y avisamos al
// CRM de Peritia (Apps Script) para marcar el presupuesto como PAGADO.
//
// Env:
//   STRIPE_WEBHOOK_SECRET — secreto de firma del endpoint (whsec_…)
//   CRM_WEBAPP_URL        — web app de Apps Script (ya usado por /api/contacto)
//
// En el panel de Stripe: añade el endpoint https://perito.barcelona/api/stripe-webhook
// escuchando el evento "checkout.session.completed".
//
// El CRM (Apps Script doPost) debe reconocer { action: 'pago', ... } y actualizar la
// fila del presupuesto (buscar por presupuesto_id → estado = pagado).

const json = (s, b) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });

// Verificación de firma de Stripe (t=…,v1=…) con HMAC-SHA256 (Web Crypto).
async function verify(raw, sigHeader, secret) {
  const parts = {};
  sigHeader.split(',').forEach((kv) => { const i = kv.indexOf('='); if (i > 0) parts[kv.slice(0, i)] = kv.slice(i + 1); });
  const t = parts.t, v1 = parts.v1;
  if (!t || !v1) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = await crypto.subtle.sign('HMAC', key, enc.encode(t + '.' + raw));
  const hex = [...new Uint8Array(mac)].map((b) => b.toString(16).padStart(2, '0')).join('');
  if (hex.length !== v1.length) return false;
  let diff = 0;
  for (let i = 0; i < hex.length; i++) diff |= hex.charCodeAt(i) ^ v1.charCodeAt(i);
  return diff === 0;
}

export async function onRequestPost({ request, env }) {
  const raw = await request.text();
  const sig = request.headers.get('stripe-signature') || '';
  if (env.STRIPE_WEBHOOK_SECRET) {
    const ok = await verify(raw, sig, env.STRIPE_WEBHOOK_SECRET);
    if (!ok) return json(400, { error: 'bad_signature' });
  }

  let event; try { event = JSON.parse(raw); } catch { return json(400, { error: 'bad_json' }); }

  if (event.type === 'checkout.session.completed') {
    const s = event.data.object || {};
    const payload = {
      action: 'pago',
      presupuesto_id: (s.metadata && s.metadata.presupuesto_id) || '',
      estado: 'pagado',
      importe_eur: (s.amount_total || 0) / 100,
      email: (s.customer_details && s.customer_details.email) || s.customer_email || '',
      pasarela: 'stripe',
      stripe_session: s.id || '',
      fecha: new Date().toISOString(),
    };
    if (env.CRM_WEBAPP_URL) {
      try {
        await fetch(env.CRM_WEBAPP_URL, { method: 'POST', headers: { 'Content-Type': 'text/plain' }, body: JSON.stringify(payload), redirect: 'follow' });
      } catch (_) { /* fail-open: Stripe reintenta si devolvemos !=2xx, pero no queremos loops */ }
    }
  }

  return json(200, { received: true });
}
