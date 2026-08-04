// POST /api/create-payment — genera el enlace de cobro de un presupuesto.
// Lo llama el PANEL DE PERITIA al aprobar el presupuesto (no el público).
// Protegido por token compartido (x-auth-token == env.PERITIA_API_TOKEN).
// Devuelve { stripe_url, wise_url } para adjuntarlos al email/PDF del presupuesto.
//
// Env (Cloudflare Pages → Environment variables):
//   PERITIA_API_TOKEN   — token que comparte el panel de Peritia con esta Function
//   STRIPE_SECRET_KEY   — clave secreta de Stripe (sk_live_… / sk_test_…)
//   SITE_URL            — (opcional) base para success/cancel; def. https://perito.barcelona
//   WISE_PAYMENT_URL    — (opcional) enlace estático de solicitud de cobro por Wise

const json = (s, b) => new Response(JSON.stringify(b), { status: s, headers: { 'Content-Type': 'application/json' } });

export async function onRequestPost({ request, env }) {
  const token = request.headers.get('x-auth-token') || '';
  if (!env.PERITIA_API_TOKEN || token !== env.PERITIA_API_TOKEN) return json(401, { error: 'unauthorized' });

  let d; try { d = await request.json(); } catch { return json(400, { error: 'bad_json' }); }
  const amount = Math.round(Number(d.amount_eur) * 100); // céntimos
  if (!amount || amount < 100) return json(400, { error: 'bad_amount' });
  const concepto = (d.concepto || 'Informe pericial').slice(0, 250);
  const presupuestoId = String(d.presupuesto_id || '');

  let stripeUrl = null;
  if (env.STRIPE_SECRET_KEY) {
    const params = new URLSearchParams();
    params.set('mode', 'payment');
    params.set('success_url', (env.SITE_URL || 'https://perito.barcelona') + '/pago-ok/');
    params.set('cancel_url', (env.SITE_URL || 'https://perito.barcelona') + '/pago-cancelado/');
    params.set('line_items[0][quantity]', '1');
    params.set('line_items[0][price_data][currency]', 'eur');
    params.set('line_items[0][price_data][unit_amount]', String(amount));
    params.set('line_items[0][price_data][product_data][name]', concepto);
    if (d.email) params.set('customer_email', d.email);
    params.set('metadata[presupuesto_id]', presupuestoId);

    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + env.STRIPE_SECRET_KEY, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });
    if (!r.ok) { const e = await r.text(); return json(502, { error: 'stripe', detail: e.slice(0, 300) }); }
    const sess = await r.json();
    stripeUrl = sess.url;
  }

  // Wise: enlace estático de solicitud de cobro (reconciliación manual, o vía Wise
  // Business API en una fase posterior).
  const wiseUrl = env.WISE_PAYMENT_URL || null;

  return json(200, { stripe_url: stripeUrl, wise_url: wiseUrl, presupuesto_id: presupuestoId, amount_eur: amount / 100 });
}
