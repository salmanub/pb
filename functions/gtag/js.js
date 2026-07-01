/**
 * GET /gtag/js — first-party proxy for the GA4 gtag.js library.
 *
 * Serves Google Analytics through the perito.barcelona domain instead of
 * www.googletagmanager.com, so ad-blockers / third-party blockers that key on
 * the Google hostname don't strip analytics, and everything is same-origin.
 *
 * The library itself sends its measurement beacons to whatever `transport_url`
 * the gtag config sets — we point that at /g/collect (see functions/g/collect.js).
 */

const UPSTREAM = 'https://www.googletagmanager.com/gtag/js';

export async function onRequestGet(context) {
  const { request } = context;
  const url = new URL(request.url);

  const upstream = await fetch(UPSTREAM + url.search, {
    headers: {
      'User-Agent': request.headers.get('User-Agent') || '',
      'Accept-Encoding': 'gzip, br',
    },
    cf: { cacheEverything: true, cacheTtl: 3600 },
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': 'application/javascript; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
      'Cross-Origin-Resource-Policy': 'same-site',
    },
  });
}
