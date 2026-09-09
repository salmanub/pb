// GET /pagar/<numero> — enlace de pago con tarjeta, estable y sin copiar nada.
//
// EL PROBLEMA QUE RESUELVE
// La tentación es meter la URL de Stripe Checkout directamente en el PDF de la
// factura. No funciona: una sesión de Checkout CADUCA (24 h por defecto). El
// cliente que abre la factura el jueves siguiente se encuentra un enlace muerto,
// y el despacho se entera cuando llama. Además obligaría a generar la sesión al
// maquetar, aunque nadie llegue a pagar con tarjeta.
//
// Por eso en el documento va SIEMPRE la misma URL —https://perito.barcelona/pagar/F-26-0123—
// y la sesión de Stripe se crea en el momento del clic. La URL no caduca nunca,
// vale igual para el PDF, el email y un QR, y no hay ningún enlace que pegar a
// mano en ninguna parte.
//
// ORDEN DE LAS FORMAS DE PAGO
// La transferencia es la primera opción del documento y la tarjeta la segunda:
// la transferencia no tiene comisión de pasarela y concilia sola por el webhook
// de Wise. Esta página es la segunda opción, y por eso también enseña los datos
// de la transferencia cuando algo falla: nunca se deja al cliente sin forma de
// pagar.
//
// SE CONSULTA EL ESTADO ANTES DE COBRAR
// Un PDF vive para siempre. Si la factura ya está cobrada, este endpoint NO crea
// una sesión: enseña que ya está pagada. Cobrar dos veces por un enlace viejo es
// el fallo caro de este flujo.
//
// Env (Cloudflare Pages → Environment variables):
//   CRM_WEBAPP_URL     — web app de Apps Script del CRM
//   PERITIA_API_TOKEN  — token compartido con el CRM
//   STRIPE_SECRET_KEY  — clave secreta de Stripe
//   SITE_URL           — base para success/cancel (def. https://perito.barcelona)
//   WISE_IBAN · WISE_BIC · WISE_TITULAR — para el bloque de transferencia

const SITIO = (env) => env.SITE_URL || 'https://perito.barcelona';

/** El número de documento va en la URL: se acota antes de usarlo para nada. */
function numeroLimpio(s) {
  return String(s || '').toUpperCase().replace(/[^A-Z0-9-]/g, '').slice(0, 32);
}

function esc(s) {
  return String(s == null ? '' : s).replace(/[&<>"']/g, (c) => (
    { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
  ));
}

/**
 * Página mínima y autocontenida. No usa el layout del sitio a propósito: esto
 * se abre desde un PDF, a veces desde el visor de correo, y tiene que pintar
 * aunque no cargue nada externo.
 */
function pagina(env, { titulo, texto, numero, mostrarTransferencia }) {
  const iban = env.WISE_IBAN || '';
  const transferencia = mostrarTransferencia && iban ? `
    <div class="caja">
      <div class="rot">Pago por transferencia</div>
      <dl>
        <dt>Titular</dt><dd>${esc(env.WISE_TITULAR || '')}</dd>
        <dt>IBAN</dt><dd><code>${esc(iban)}</code></dd>
        ${env.WISE_BIC ? `<dt>BIC</dt><dd><code>${esc(env.WISE_BIC)}</code></dd>` : ''}
        <dt>Concepto</dt><dd><strong>${esc(numero)}</strong></dd>
      </dl>
      <p class="nota">El concepto es obligatorio: es lo que permite identificar el pago.</p>
    </div>` : '';

  return new Response(`<!doctype html><html lang="es"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>${esc(titulo)} — Perito Barcelona</title>
<style>
:root{color-scheme:light}
body{margin:0;padding:48px 20px;background:#f6f5f1;color:#1a1d1a;
     font:16px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif}
main{max-width:34rem;margin:0 auto;background:#fff;border:1px solid #e2e0da;
     border-radius:10px;padding:32px}
h1{font-size:1.3rem;margin:0 0 12px;font-weight:600}
p{margin:0 0 14px;color:#4a4f49}
.caja{margin-top:24px;padding:18px 20px;background:#f6f5f1;border:1px solid #e2e0da;border-radius:8px}
.rot{font-size:.72rem;letter-spacing:.1em;text-transform:uppercase;color:#1C7A4A;font-weight:600;margin-bottom:10px}
dl{display:grid;grid-template-columns:6.5rem 1fr;gap:6px 14px;margin:0;font-size:.92rem}
dt{color:#6b706a}dd{margin:0}
code{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:.9rem}
.nota{margin:12px 0 0;font-size:.82rem;color:#6b706a}
</style></head><body><main>
<h1>${esc(titulo)}</h1><p>${esc(texto)}</p>${transferencia}
</main></body></html>`, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8', 'X-Robots-Tag': 'noindex' },
  });
}

export const onRequestGet = async ({ params, env }) => {
  const numero = numeroLimpio(params.numero);
  if (!numero) return pagina(env, {
    titulo: 'Documento no indicado',
    texto: 'El enlace está incompleto. Escríbanos y le mandamos uno nuevo.',
    numero, mostrarTransferencia: false,
  });

  /* El CRM es la única fuente del importe y del estado. Aquí no se guarda nada:
     un segundo sitio con el importe de la factura es un segundo sitio donde
     puede estar mal. */
  let doc = null;
  try {
    const r = await fetch(env.CRM_WEBAPP_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-auth-token': env.PERITIA_API_TOKEN || '' },
      body: JSON.stringify({ action: 'cobro-datos', numero }),
    });
    if (r.ok) doc = await r.json();
  } catch (e) { /* se cae al bloque de transferencia */ }

  if (!doc || !doc.ok) {
    return pagina(env, {
      titulo: 'No hemos podido preparar el pago con tarjeta',
      texto: 'Puede pagar por transferencia con los datos de abajo, o escribirnos y se lo resolvemos.',
      numero, mostrarTransferencia: true,
    });
  }

  if (doc.cobrado) {
    return pagina(env, {
      titulo: 'Este documento ya consta pagado',
      texto: `El documento ${numero} figura como cobrado en nuestro registro. No hace falta que haga nada. Si cree que hay un error, escríbanos.`,
      numero, mostrarTransferencia: false,
    });
  }

  const centimos = Math.round(Number(doc.importe) * 100);
  if (!centimos || centimos < 100) {
    return pagina(env, {
      titulo: 'Importe no disponible',
      texto: 'No hemos podido leer el importe de este documento. Puede pagar por transferencia con los datos de abajo.',
      numero, mostrarTransferencia: true,
    });
  }

  const p = new URLSearchParams();
  p.set('mode', 'payment');
  p.set('success_url', SITIO(env) + '/pago-ok/?ref=' + encodeURIComponent(numero));
  p.set('cancel_url', SITIO(env) + '/pagar/' + encodeURIComponent(numero));
  p.set('line_items[0][quantity]', '1');
  p.set('line_items[0][price_data][currency]', 'eur');
  p.set('line_items[0][price_data][unit_amount]', String(centimos));
  p.set('line_items[0][price_data][product_data][name]', String(doc.concepto || numero).slice(0, 200));
  if (doc.email) p.set('customer_email', doc.email);
  /* metadata: es lo que /api/stripe-webhook usa para marcar el documento.
     `docNum` con el mismo nombre que ya usa el CRM, para no tener dos claves
     distintas diciendo lo mismo. */
  p.set('metadata[docNum]', numero);
  p.set('metadata[source]', 'pagar-link');
  /* La referencia también en el propio pago: aparece en el extracto de Stripe y
     ahorra un cruce cuando alguien pregunta por un cobro suelto. */
  p.set('payment_intent_data[description]', numero);

  let sesion = null;
  try {
    const r = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + env.STRIPE_SECRET_KEY,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: p.toString(),
    });
    if (r.ok) sesion = await r.json();
  } catch (e) { /* abajo */ }

  if (!sesion || !sesion.url) {
    return pagina(env, {
      titulo: 'El pago con tarjeta no está disponible ahora mismo',
      texto: 'Puede pagar por transferencia con los datos de abajo. El concepto es lo que identifica su pago.',
      numero, mostrarTransferencia: true,
    });
  }

  /* 302 y no 301: la sesión de Stripe es de un solo uso y el navegador no debe
     cachear este salto. Un 301 dejaría al cliente atado a una sesión caducada. */
  return new Response(null, {
    status: 302,
    headers: { Location: sesion.url, 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex' },
  });
};
