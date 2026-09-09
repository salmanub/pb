// POST /api/wise-webhook — avisos de cobro de Wise Business.
//
// PARA QUÉ: cerrar el círculo del cobro por transferencia. La factura sale con
// el IBAN y el número de documento como concepto obligatorio; cuando el dinero
// entra en el saldo de Wise, este endpoint lo recibe y avisa al CRM, que casa el
// pago con el documento y lo marca cobrado. Sin tocar nada a mano.
//
// POR QUÉ `balances#update` Y NO `balances#credit`
// Los dos avisan de que ha entrado dinero, pero `balances#credit` NO trae la
// referencia de la transferencia —Wise es explícito: los webhooks no llevan
// datos personales— y sin referencia no hay forma de saber qué factura se ha
// pagado. `balances#update` (schema 3.0.0) sí trae `transfer_reference`, que es
// justo el número de documento que el cliente ha escrito en el concepto. Por eso
// se suscribe a ése y se filtra `transaction_type: "credit"`.
//
// LO QUE ESTE ENDPOINT NO HACE, A PROPÓSITO
// No decide si una factura está pagada. Verifica la firma, filtra y reenvía. La
// conciliación —casar referencia e importe con un documento abierto— vive en el
// CRM, que es quien tiene los datos. Un Worker que marcase facturas como
// cobradas sería un segundo sitio donde el estado del cobro puede equivocarse.
//
// Env (Cloudflare Pages → Environment variables):
//   WISE_WEBHOOK_PUBLIC_KEY — clave pública de Wise en PEM, la de PRODUCCIÓN.
//                             Se copia de la documentación de Wise; hay una
//                             distinta para sandbox. Sin ella no se acepta nada.
//   CRM_WEBAPP_URL          — URL del web app de Apps Script del CRM
//   PERITIA_API_TOKEN       — token compartido con el CRM
//
// Alta de la suscripción: Wise → Settings → Webhooks, evento `balances#update`,
// URL https://perito.barcelona/api/wise-webhook. Se puede hacer también por API
// (POST /v3/profiles/{profileId}/subscriptions), pero es un alta de una sola vez
// y por el panel no hay que adivinar la versión del path.

const CABECERA_FIRMA = 'X-Signature-SHA256';

/* Wise reintenta hasta 25 veces a lo largo de dos semanas mientras no reciba un
   2xx, y exige respuesta en menos de 5 segundos. De ahí la forma de este
   handler: responder ya y hacer el trabajo en waitUntil. Si el CRM tarda —Apps
   Script tarda— no se puede pagar con un reintento de Wise. */
const vacio = (status) => new Response(null, { status });

/** PEM → CryptoKey. Wise firma con RSA sobre el digest SHA-256 del cuerpo. */
async function clavePublica(pem) {
  const b64 = String(pem).replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const der = Uint8Array.from(atob(b64), (c) => c.charCodeAt(0));
  return crypto.subtle.importKey(
    'spki',
    der,
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' },
    false,
    ['verify']
  );
}

/**
 * Verifica la cabecera X-Signature-SHA256 contra el cuerpo EN CRUDO.
 * En crudo importa: si se parsea y se vuelve a serializar el JSON, un espacio
 * de diferencia invalida la firma. Por eso se lee el texto una sola vez y se
 * verifica antes de tocarlo.
 */
async function firmaValida(env, cuerpoCrudo, firmaB64) {
  if (!env.WISE_WEBHOOK_PUBLIC_KEY || !firmaB64) return false;
  try {
    const key = await clavePublica(env.WISE_WEBHOOK_PUBLIC_KEY);
    const firma = Uint8Array.from(atob(firmaB64), (c) => c.charCodeAt(0));
    return await crypto.subtle.verify(
      'RSASSA-PKCS1-v1_5',
      key,
      firma,
      new TextEncoder().encode(cuerpoCrudo)
    );
  } catch (e) {
    return false;
  }
}

/** Normaliza la referencia para que case con un número de documento. */
function referencia(txt) {
  return String(txt || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 64);
}

export const onRequestPost = async ({ request, env, ctx }) => {
  const cuerpo = await request.text();

  /* 401 y no 204: aquí sí interesa que un aviso no firmado falle de forma
     visible. Un webhook de cobro que acepta cualquier POST es una invitación a
     que alguien marque facturas como cobradas desde fuera. */
  if (!(await firmaValida(env, cuerpo, request.headers.get(CABECERA_FIRMA)))) {
    return vacio(401);
  }

  let ev;
  try { ev = JSON.parse(cuerpo); } catch (e) { return vacio(204); }

  const d = (ev && ev.data) || {};
  const esCobro = ev.event_type === 'balances#update' && d.transaction_type === 'credit';
  if (!esCobro) return vacio(204); // débitos y otros eventos: recibidos y descartados

  const aviso = {
    action: 'pago',
    origen: 'wise',
    /* delivery_id es la clave de idempotencia. Wise reintenta, y un reintento
       no puede contar como un segundo cobro: el CRM lo usa para ignorar
       repetidos. */
    delivery_id: request.headers.get('X-Delivery-Id') || '',
    subscription_id: ev.subscription_id || '',
    referencia: referencia(d.transfer_reference),
    importe: Number(d.amount) || 0,
    moneda: d.currency || '',
    balance_id: d.balance_id || (d.resource && d.resource.id) || '',
    profile_id: (d.resource && d.resource.profile_id) || '',
    canal: d.channel_name || '',
    fecha: d.occurred_at || ev.sent_at || '',
  };

  /* Se responde antes de hablar con el CRM. Si el CRM está caído, el cobro no
     se pierde: el barrido diario del extracto lo recoge igual. Ese barrido no
     es un adorno, es lo que hace que este endpoint pueda permitirse fallar. */
  ctx.waitUntil(
    fetch(env.CRM_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': env.PERITIA_API_TOKEN || '' },
      body: JSON.stringify(aviso),
    }).catch(() => {})
  );

  return vacio(204);
};

/* Wise sólo hace POST. Un GET aquí es casi siempre alguien probando la URL. */
export const onRequestGet = () => vacio(405);
