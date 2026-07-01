/**
 * /g/collect — first-party proxy for GA4 measurement beacons.
 *
 * gtag.js is configured with `transport_url` = our own origin, so it POSTs its
 * hits here (same-origin) instead of to region1.google-analytics.com. We forward
 * them to Google, preserving the query string, body and — crucially — the real
 * visitor IP (via X-Forwarded-For) so geo/attribution stays accurate.
 */

const UPSTREAM = 'https://www.google-analytics.com/g/collect';

async function proxy(context) {
  const { request } = context;
  const url = new URL(request.url);

  const headers = {
    'Content-Type': request.headers.get('Content-Type') || 'text/plain;charset=UTF-8',
    'User-Agent': request.headers.get('User-Agent') || '',
  };
  const clientIp = request.headers.get('CF-Connecting-IP');
  if (clientIp) headers['X-Forwarded-For'] = clientIp;

  const upstream = await fetch(UPSTREAM + url.search, {
    method: request.method,
    headers,
    body: request.method === 'POST' ? await request.arrayBuffer() : undefined,
  });

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Content-Type': upstream.headers.get('Content-Type') || 'text/plain',
      'Cache-Control': 'no-store',
    },
  });
}

export const onRequestGet = proxy;
export const onRequestPost = proxy;
