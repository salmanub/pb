/**
 * POST /api/event — proxy first-party de los eventos de Plausible.
 *
 * El script se carga con data-api="/api/event", así que manda los hits aquí
 * (mismo origen) en vez de a plausible.io/api/event. Los reenviamos tal cual.
 *
 * LAS DOS CABECERAS QUE NO SE PUEDEN PERDER
 * Plausible no usa cookies ni identificador persistente: deriva el visitante de
 * un hash diario de (sal rotatoria + IP + User-Agent). Si el proxy no reenvía
 * ambas, todo el tráfico colapsa en un único visitante con la IP del centro de
 * datos de Cloudflare y la geolocalización sale toda del mismo sitio. Por eso:
 *  · X-Forwarded-For ← CF-Connecting-IP, la IP real del visitante.
 *  · User-Agent, que además es lo que usa para descartar bots.
 * La IP se usa para calcular el hash y se descarta; no se almacena (es la razón
 * por la que esta analítica no necesita consentimiento previo).
 *
 * X-Forwarded-For se FIJA, no se concatena a la que llegue: un cliente puede
 * mandar la cabecera a mano y encadenarla dejaría que falsifique su origen.
 */

const UPSTREAM = 'https://plausible.io/api/event';

export async function onRequestPost(context) {
  const { request } = context;

  const headers = {
    'Content-Type': request.headers.get('Content-Type') || 'application/json',
    'User-Agent': request.headers.get('User-Agent') || '',
  };
  const ip = request.headers.get('CF-Connecting-IP');
  if (ip) headers['X-Forwarded-For'] = ip;

  const upstream = await fetch(UPSTREAM, {
    method: 'POST',
    headers,
    body: await request.arrayBuffer(),
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') || 'text/plain',
      'Cache-Control': 'no-store',
    },
  });
}
