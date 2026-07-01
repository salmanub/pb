/**
 * Datos computados para los posts CA (paginación en post.njk).
 * Ver src/blog/post.11tydata.js.
 */
const NAV_LANGS = ['es', 'ca', 'en'];
const CURRENT = 'ca';

export default {
  eleventyComputed: {
    translations: (data) => {
      const src = (data.post && data.post.translations) || [];
      return src.filter((t) => t.lang !== CURRENT && NAV_LANGS.includes(t.lang));
    },
  },
};
