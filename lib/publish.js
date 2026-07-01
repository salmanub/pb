/**
 * lib/publish.js — Fuente única de verdad para la publicación programada.
 *
 * Un post se considera PUBLICADO cuando su `datePublished` (YYYY-MM-DD) es
 * hoy o una fecha anterior, evaluado en la zona horaria de Madrid en el
 * momento del build. Los posts con fecha futura quedan fuera de:
 *   - las páginas individuales (no se generan)
 *   - los listados de blog, la home y los "artículos relacionados"
 *   - el sitemap.xml
 *
 * Como el corte se calcula en tiempo de build, hace falta un rebuild diario
 * (cron en .github/workflows/deploy-sxg.yml) para que un post "aparezca" solo
 * al llegar su fecha, sin intervención manual.
 */

// Fecha de hoy en Madrid como 'YYYY-MM-DD' (formato 'en-CA' = ISO).
export function madridToday() {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Europe/Madrid',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date());
}

// Corte fijado una vez por build.
export const PUBLISH_CUTOFF = madridToday();

// Normaliza la fecha del post a 'YYYY-MM-DD' (admite datetime).
function postDate(post) {
  return post && post.datePublished ? String(post.datePublished).slice(0, 10) : '';
}

// ¿Está publicado a día de hoy (Madrid)? Sin fecha => visible (comportamiento seguro).
// Comparación lexicográfica de 'YYYY-MM-DD' == comparación cronológica.
export function isPublished(post) {
  const d = postDate(post);
  if (!d) return true;
  return d <= PUBLISH_CUTOFF;
}

// Filtra un array de posts dejando solo los ya publicados.
export function filterPublished(posts) {
  return (posts || []).filter(isPublished);
}
