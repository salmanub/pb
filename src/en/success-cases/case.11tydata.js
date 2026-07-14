/**
 * Datos computados para los casos de éxito EN (paginación en case.njk).
 * Expone `translations` (es/ca/en, sin el idioma actual) a partir de
 * `caso.translations`, para que el selector de idioma del nav y los
 * hreflang de base.njk enlacen a la traducción real del caso en vez de
 * caer a la home. Se descartan fr/it (sin páginas generadas).
 */
const NAV_LANGS = ['es', 'ca', 'en'];
const CURRENT = 'en';

export default {
  eleventyComputed: {
    translations: (data) => {
      const src = (data.caso && data.caso.translations) || [];
      return src.filter((t) => t.lang !== CURRENT && NAV_LANGS.includes(t.lang));
    },
  },
};
