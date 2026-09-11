/**
 * GET /js/pb?id=pa-xxxx — proxy first-party del script de Plausible.
 *
 * Sirve la analítica desde perito.barcelona en vez de plausible.io, para que los
 * bloqueadores que filtran por hostname no la eliminen y todo sea same-origin.
 * Es el mismo patrón que tenía el proxy de gtag.js.
 *
 * POR QUÉ EL ID VIENE EN LA QUERY Y NO ESTÁ AQUÍ HARDCODEADO
 * En el script v2 de Plausible el sitio va codificado en el nombre del fichero
 * (`pa-<id>.js`), no en un atributo `data-domain`. Ese id vive en
 * src/_data/metadata.json (`site.plausibleScriptId`), que es lo que consume la
 * plantilla; duplicarlo aquí daría dos fuentes de verdad que se desincronizarían
 * en el primer cambio de propiedad.
 *
 * POR ESO HAY QUE VALIDARLO
 * Reenviar la query sin más convertiría esto en un proxy abierto a cualquier
 * ruta de plausible.io (y, con un id malicioso, a cualquier ruta del origen: un
 * `../` bastaría). El id se acepta sólo si encaja con el formato real que emite
 * Plausible, y la URL upstream se compone con el id ya validado, nunca
 * concatenando la query entera.
 *
 * El script son ~1,5 KB y no cambia casi nunca; una hora de caché de borde es de
 * sobra y mantiene el TTL que ya tenía /gtag/js en src/_headers.
 *
 * OJO CON LA RUTA: Cloudflare Pages QUITA la extensión del nombre del fichero para
 * derivar la ruta, así que este fichero se sirve en `/js/pb`, NO en `/js/pb.js`.
 * Pedir `/js/pb.js` no da 404: cae en el catch-all de _redirects y devuelve la
 * portada en HTML, con lo que el `<script>` no falla visiblemente y la analítica
 * deja de registrar visitas en silencio. Fue exactamente el fallo del despliegue
 * inicial. Si se cambia la ruta, cambiar también el src de components/analytics.njk
 * y el bloque de src/_headers.
 */

const ID_VALIDO = /^pa-[A-Za-z0-9_-]{1,64}$/;

export async function onRequestGet(context) {
  const { request } = context;
  const id = new URL(request.url).searchParams.get('id') || '';

  if (!ID_VALIDO.test(id)) {
    return new Response('// id de Plausible ausente o con formato inválido\n', {
      status: 400,
      headers: {
        'Content-Type': 'application/javascript; charset=utf-8',
        'Cache-Control': 'no-store',
      },
    });
  }

  const upstream = await fetch(`https://plausible.io/js/${id}.js`, {
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
