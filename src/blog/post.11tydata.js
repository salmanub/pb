/**
 * Datos computados para los posts ES (paginación en post.njk).
 * Expone `translations` (es/ca/en, sin el idioma actual) a partir de
 * `post.translations`, para que el selector de idioma del nav y los
 * hreflang de seo.njk enlacen a la traducción real del post en vez de
 * caer a la home. Se descartan fr/it (sin páginas generadas).
 */
const NAV_LANGS = ['es', 'ca', 'en'];
const CURRENT = 'es';

export default {
  eleventyComputed: {
    translations: (data) => {
      const src = (data.post && data.post.translations) || [];
      return src.filter((t) => t.lang !== CURRENT && NAV_LANGS.includes(t.lang));
    },
  },
};
