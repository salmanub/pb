/**
 * Datos computados para los posts EN (paginación en post.njk).
 * Ver src/blog/post.11tydata.js.
 */
const NAV_LANGS = ['es', 'ca', 'en'];
const CURRENT = 'en';

export default {
  eleventyComputed: {
    translations: (data) => {
      const src = (data.post && data.post.translations) || [];
      return src.filter((t) => t.lang !== CURRENT && NAV_LANGS.includes(t.lang));
    },
  },
};
