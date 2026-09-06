/**
 * POST /api/rum — Cloudflare Pages Function (perito.barcelona)
 *
 * Recibe los beacons de Core Web Vitals que manda src/_includes/components/rum.njk
 * y escribe un punto por métrica en Workers Analytics Engine.
 *
 * PARA QUÉ: comparar el rendimiento de las páginas que Chrome precarga desde la
 * SERP como Signed Exchange (deliveryType 'navigational-prefetch', o servidas
 * desde webpkgcache.com) frente a la navegación normal. Sin esta segmentación
 * el p75 mezcla los dos caminos y no dice nada.
 *
 * Binding (wrangler.toml, o Pages → Settings → Functions → Analytics Engine):
 *   RUM → dataset "rum_pb"
 *
 * Esquema del dataset (el orden IMPORTA: las consultas van por blobN):
 *   blob1 metric   blob2 delivery  blob3 path     blob4 lang
 *   blob5 connection  blob6 fromGoogle  blob7 isSXGCache  blob8 rating
 *   double1 value   double2 ua_mobile (0|1)
 *   index1 metric
 *
 * index1 es la clave de muestreo de Analytics Engine, así que tiene que ser de
 * cardinalidad BAJA: con cinco valores posibles el muestreo reparte bien. Poner
 * ahí `path` haría que el muestreo se comiera las rutas de cola larga.
 *
 * Sin cookies, sin identificador de usuario, sin IP almacenada.
 */

/* text/plain en el beacon evita el preflight; aun así se responde a OPTIONS por
   si algún cliente lo manda igualmente. */
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '86400',
};

/** Sólo estas métricas entran. Cualquier otra cosa se descarta sin ruido. */
const METRICAS = new Set(['LCP', 'INP', 'CLS', 'FCP', 'TTFB']);

/** Techo por métrica, en sus propias unidades. Descarta valores imposibles. */
const TECHO = { LCP: 120000, INP: 120000, FCP: 120000, TTFB: 120000, CLS: 10 };

/** Cuerpo máximo. Un beacon legítimo con las cinco métricas no llega a 1 KB. */
const MAX_BYTES = 8192;

/** Máximo de métricas por beacon. Cinco, más margen para reenvíos de INP. */
const MAX_METRICAS = 12;

/* ── Rate limiting ────────────────────────────────────────────────────────
 * Contador en memoria del isolate. NO es un límite global: Cloudflare levanta
 * muchos isolates y cada uno lleva su cuenta, así que el techo real es este
 * número por isolate. Sirve para lo que tiene que servir —que un bucle o un
 * script tonto no inunde el dataset— y no para contener un ataque; para eso
 * está Cloudflare delante. Se prefiere esto a un KV o un Durable Object porque
 * un beacon de telemetría no merece ni una lectura de estado ni su latencia.
 */
const VENTANA_MS = 60000;
const MAX_POR_IP = 60;
const visitas = new Map();

function pasaElLimite(ip) {
  if (!ip) return true;
  const ahora = Date.now();
  const v = visitas.get(ip);

  if (!v || ahora - v.desde > VENTANA_MS) {
    visitas.set(ip, { desde: ahora, n: 1 });
    /* Poda perezosa: sin esto el Map crece hasta que el isolate muere. Se hace
       aquí y no con un temporizador porque en Workers no hay temporizadores de
       fondo entre peticiones. */
    if (visitas.size > 5000) {
      for (const [k, w] of visitas) if (ahora - w.desde > VENTANA_MS) visitas.delete(k);
    }
    return true;
  }

  v.n += 1;
  return v.n <= MAX_POR_IP;
}

/* ── Validación ───────────────────────────────────────────────────────── */

/** Texto acotado: recorta y quita saltos de línea, que ensucian las consultas. */
function texto(v, max) {
  if (typeof v !== 'string') return '';
  const s = v.replace(/[\r\n\t]/g, ' ').trim();
  return s.length > max ? s.slice(0, max) : s;
}

function booleano(v) {
  return v === true ? '1' : '0';
}

/**
 * Normaliza el beacon o devuelve null. No lanza: un cuerpo mal formado es un
 * caso esperado (un bot, una extensión, una versión vieja del script en una
 * pestaña abierta hace días), no un error del servidor.
 */
function normalizar(bruto) {
  if (!bruto || typeof bruto !== 'object') return null;
  const d = bruto.d;
  const m = bruto.m;
  if (!d || typeof d !== 'object' || !Array.isArray(m) || !m.length) return null;

  const dim = {
    delivery: texto(d.delivery, 40) || 'normal',
    path: texto(d.path, 200) || '/',
    lang: texto(d.lang, 8) || 'es',
    connection: texto(d.connection, 16) || 'unknown',
    fromGoogle: booleano(d.fromGoogle),
    isSXGCache: booleano(d.isSXGCache),
    uaMobile: d.ua_mobile === true ? 1 : 0,
  };

  const metricas = [];
  for (const it of m.slice(0, MAX_METRICAS)) {
    if (!it || typeof it !== 'object') continue;
    const nombre = texto(it.metric, 8);
    if (!METRICAS.has(nombre)) continue;
    const valor = Number(it.value);
    if (!Number.isFinite(valor) || valor < 0 || valor > TECHO[nombre]) continue;
    metricas.push({ nombre, valor, rating: texto(it.rating, 16) || 'unknown' });
  }

  return metricas.length ? { dim, metricas } : null;
}

/* ── Handlers ─────────────────────────────────────────────────────────── */

export const onRequestOptions = () => new Response(null, { status: 204, headers: CORS });

export const onRequestPost = async ({ request, env }) => {
  /* 204 en casi todos los caminos, incluidos los de rechazo: el cliente no
     puede hacer nada con un error y sendBeacon no lee la respuesta. Lo único
     que se distingue es el 413, que sí señala un cliente roto. */
  const nada = () => new Response(null, { status: 204, headers: CORS });

  if (!pasaElLimite(request.headers.get('CF-Connecting-IP'))) return nada();

  const declarado = Number(request.headers.get('Content-Length') || 0);
  if (declarado > MAX_BYTES) {
    return new Response(null, { status: 413, headers: CORS });
  }

  let cuerpo;
  try {
    cuerpo = await request.text();
  } catch (e) {
    return nada();
  }
  /* Content-Length puede faltar o mentir: se vuelve a comprobar sobre lo leído. */
  if (cuerpo.length > MAX_BYTES) return new Response(null, { status: 413, headers: CORS });

  let datos;
  try {
    datos = normalizar(JSON.parse(cuerpo));
  } catch (e) {
    return nada();
  }
  if (!datos) return nada();

  /* Sin binding no se rompe la página: se descarta en silencio. Un despliegue
     de preview sin el dataset configurado no debe devolver errores al cliente. */
  if (!env.RUM || typeof env.RUM.writeDataPoint !== 'function') return nada();

  const { dim, metricas } = datos;
  for (const met of metricas) {
    env.RUM.writeDataPoint({
      blobs: [
        met.nombre,        // blob1  metric
        dim.delivery,      // blob2  delivery
        dim.path,          // blob3  path
        dim.lang,          // blob4  lang
        dim.connection,    // blob5  connection
        dim.fromGoogle,    // blob6  fromGoogle  '0'|'1'
        dim.isSXGCache,    // blob7  isSXGCache  '0'|'1'
        met.rating,        // blob8  rating
      ],
      doubles: [met.valor, dim.uaMobile],
      indexes: [met.nombre],
    });
  }

  return nada();
};
