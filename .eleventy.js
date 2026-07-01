/**
 * .eleventy.js — perito.barcelona
 *
 * Config Eleventy v3 (ESM). Según AGENTES §3–§5:
 * - Nunjucks como template engine
 * - CSS: Tailwind → built.css → inline purgado por página (transform)
 * - Cero <link> de CSS en producción
 * - Output: dist/
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import markdownIt from 'markdown-it';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import cssnano from 'cssnano';
import { PurgeCSS } from 'purgecss';
import eleventyNavigationPlugin from '@11ty/eleventy-navigation';
import { minify } from 'html-minifier-terser';
import { readFileSync } from 'node:fs';
import { isPublished, filterPublished, PUBLISH_CUTOFF } from './lib/publish.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  const isServe = process.argv.includes('--serve');
  const builtCssPath = path.resolve(__dirname, 'src', 'assets', 'css', 'built.css');

  // ── Passthrough copies ──
  eleventyConfig.addPassthroughCopy('src/assets/images');
  // JS is inlined by the inline-js transform — no passthrough needed
  eleventyConfig.addPassthroughCopy('src/assets/fonts');
  eleventyConfig.addPassthroughCopy('src/assets/favicons');
  eleventyConfig.addPassthroughCopy({ 'Design System/assets/icons': 'assets/icons' });
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  // Root-level icon probes (browsers request these at "/" regardless of <link> tags)
  eleventyConfig.addPassthroughCopy({ 'Design System/assets/icons/favicon.svg': 'favicon.svg' });
  eleventyConfig.addPassthroughCopy({ 'Design System/assets/icons/apple-touch-icon.png': 'apple-touch-icon.png' });
  eleventyConfig.addPassthroughCopy('src/site.webmanifest');
  eleventyConfig.addPassthroughCopy('src/_redirects');
  eleventyConfig.addPassthroughCopy('src/_headers');

  // Ignore optimized images rebuild loop
  eleventyConfig.watchIgnores.add('src/assets/images/optimized/');
  eleventyConfig.watchIgnores.add('src/assets/css/built.css');

  // ── Markdown ──
  const md = markdownIt({ html: true, breaks: true, linkify: true });

  eleventyConfig.addFilter('markdown', function (content) {
    if (!content) return '';
    return md.render(content);
  });

  // ── Publicación programada (zona horaria de Madrid) ──
  // Ver lib/publish.js. `isPublished` (post → bool) y `published` (array → array)
  // se usan en los listados; los datos *Published alimentan la paginación
  // (pagination.data no admite filtros) para no generar páginas de posts futuros.
  console.log(`[publish] Corte de publicación (Madrid): ${PUBLISH_CUTOFF}`);
  eleventyConfig.addFilter('isPublished', isPublished);
  eleventyConfig.addFilter('published', filterPublished);
  eleventyConfig.addGlobalData('publishCutoff', PUBLISH_CUTOFF);

  const loadPosts = (file) =>
    JSON.parse(readFileSync(path.resolve(__dirname, 'src', '_data', file), 'utf8'));
  eleventyConfig.addGlobalData('postsPublished', () => filterPublished(loadPosts('posts.json')));
  eleventyConfig.addGlobalData('posts_caPublished', () => filterPublished(loadPosts('posts_ca.json')));
  eleventyConfig.addGlobalData('posts_enPublished', () => filterPublished(loadPosts('posts_en.json')));

  eleventyConfig.addFilter('isArray', function (value) {
    return Array.isArray(value);
  });

  // Filter a collection by data.lang for eleventyNavigation.
  // For non-ES languages, includes ES pages as fallback for nav keys
  // that haven't been translated yet.
  eleventyConfig.addFilter('filterByLang', function (collection, lang) {
    if (!lang || !collection) return collection;
    const langPages = collection.filter(item => item.data && item.data.lang === lang);
    if (lang === 'es') return langPages;
    // Collect eleventyNavigation keys present in the target language
    const langKeys = new Set();
    for (const item of langPages) {
      if (item.data && item.data.eleventyNavigation && item.data.eleventyNavigation.key) {
        langKeys.add(item.data.eleventyNavigation.key);
      }
    }
    // Add ES pages whose nav key is NOT covered by the target language
    const esPages = collection.filter(item => {
      if (!item.data || item.data.lang !== 'es') return false;
      const navKey = item.data.eleventyNavigation && item.data.eleventyNavigation.key;
      return navKey && !langKeys.has(navKey);
    });
    return [...langPages, ...esPages];
  });

  eleventyConfig.addFilter('default', function (value, defaultValue) {
    return (value !== null && value !== undefined) ? value : defaultValue;
  });

  eleventyConfig.addFilter('head', function (array, n) {
    if (!Array.isArray(array)) return array;
    return n < 0 ? array.slice(n) : array.slice(0, n);
  });

  eleventyConfig.addFilter('format', function (fmt, value) {
    // Simple zero-pad format for '%02d' style
    if (typeof fmt === 'string' && fmt.includes('%')) {
      return fmt.replace(/%0(\d)d/, (_, len) => String(value).padStart(parseInt(len), '0'));
    }
    return fmt;
  });

  // ── hreflang: find alternate URLs for current page ──
  eleventyConfig.addFilter('hreflangAlternates', function (pageUrl, i18nPages) {
    if (!i18nPages) return [];
    // Find the entry where any language URL matches the current page URL
    for (const [key, langs] of Object.entries(i18nPages)) {
      for (const [lang, url] of Object.entries(langs)) {
        if (url === pageUrl) {
          return Object.entries(langs).map(([l, u]) => ({ lang: l, url: u }));
        }
      }
    }
    return [];
  });

  // Nav language selector — always shows all 3 languages, falls back to home
  const LANG_HOMES = { es: '/', ca: '/ca/', en: '/en/' };
  eleventyConfig.addFilter('navAlternates', function (pageUrl, i18nPages) {
    if (!i18nPages) return Object.entries(LANG_HOMES).map(([l, u]) => ({ lang: l, url: u }));
    for (const [key, langs] of Object.entries(i18nPages)) {
      for (const [lang, url] of Object.entries(langs)) {
        if (url === pageUrl) {
          // Fill missing langs with their home
          const result = {};
          for (const [l, homeUrl] of Object.entries(LANG_HOMES)) {
            result[l] = langs[l] || homeUrl;
          }
          return Object.entries(result).map(([l, u]) => ({ lang: l, url: u }));
        }
      }
    }
    return Object.entries(LANG_HOMES).map(([l, u]) => ({ lang: l, url: u }));
  });

  // ── Compile Tailwind (eleventy.before) ──
  eleventyConfig.on('eleventy.before', async () => {
    const inputPath = path.resolve(__dirname, 'src', 'assets', 'css', 'main.css');

    if (!fs.existsSync(inputPath)) {
      console.warn('[CSS] main.css not found, skipping compilation');
      return;
    }

    const cssContent = fs.readFileSync(inputPath, 'utf8');

    const plugins = [tailwindcss()];
    if (!isServe) {
      plugins.push(cssnano({
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
        }],
      }));
    }

    const result = await postcss(plugins).process(cssContent, {
      from: inputPath,
      to: builtCssPath,
    });

    const outDir = path.dirname(builtCssPath);
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
    fs.writeFileSync(builtCssPath, result.css);
  });

  // ── Auto <picture> with AVIF/WebP srcset ──
  const SIZES = [320, 480, 640, 768, 1024, 1280, 1536, 1920, 2048];
  eleventyConfig.addTransform('picture-srcset', function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html')) return content;

    return content.replace(/<img\b([^>]*?)src="([^"]+)"([^>]*?)>/gi, (match, pre, src, post) => {
      // Skip SVGs, data URIs, external URLs, and already-wrapped pictures
      if (src.endsWith('.svg') || src.startsWith('data:') || src.startsWith('http') || src.startsWith('//')) return match;
      // Skip if already inside <picture>
      if (content.indexOf('<picture') !== -1) {
        const imgIdx = content.indexOf(match);
        const prevChunk = content.substring(Math.max(0, imgIdx - 200), imgIdx);
        if (prevChunk.includes('<picture')) return match;
      }

      const ext = path.extname(src);
      const base = src.replace(ext, '');
      const imgDir = path.join(__dirname, 'src', src.startsWith('/') ? src.substring(1) : src);
      const srcDir = path.dirname(imgDir);

      // Build srcset for a given extension
      function buildSrcset(newExt) {
        const entries = [];
        for (const w of SIZES) {
          const sizedName = path.basename(base) + '-' + w + newExt;
          const sizedPath = path.join(srcDir, sizedName);
          if (fs.existsSync(sizedPath)) {
            entries.push(base + '-' + w + newExt + ' ' + w + 'w');
          }
        }
        return entries.join(', ');
      }

      const avifSrcset = buildSrcset('.avif');
      const webpSrcset = buildSrcset('.webp');
      const jpgSrcset = buildSrcset(ext);

      // If no sized variants exist, check for same-name avif/webp
      const avifFull = base + '.avif';
      const webpFull = base + '.webp';
      const hasAvifFull = fs.existsSync(path.join(__dirname, 'src', avifFull.startsWith('/') ? avifFull.substring(1) : avifFull));
      const hasWebpFull = fs.existsSync(path.join(__dirname, 'src', webpFull.startsWith('/') ? webpFull.substring(1) : webpFull));

      if (!avifSrcset && !webpSrcset && !hasAvifFull && !hasWebpFull) return match;

      // Extract existing attributes
      const allAttrs = (pre + post).trim();

      let sources = '';
      if (avifSrcset) {
        sources += `<source type="image/avif" srcset="${avifSrcset}" sizes="(max-width: 768px) 100vw, 50vw">`;
      } else if (hasAvifFull) {
        sources += `<source type="image/avif" srcset="${avifFull}">`;
      }
      if (webpSrcset) {
        sources += `<source type="image/webp" srcset="${webpSrcset}" sizes="(max-width: 768px) 100vw, 50vw">`;
      } else if (hasWebpFull) {
        sources += `<source type="image/webp" srcset="${webpFull}">`;
      }
      if (jpgSrcset) {
        sources += `<source srcset="${jpgSrcset}" sizes="(max-width: 768px) 100vw, 50vw">`;
      }

      return `<picture>${sources}<img src="${src}" ${allAttrs}></picture>`;
    });
  });

  // ── PurgeCSS inline per page (AGENTES §5) ──
  eleventyConfig.addTransform('inline-css', async function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html')) return content;
    if (!fs.existsSync(builtCssPath)) return content;

    const fullCss = fs.readFileSync(builtCssPath, 'utf8');

    if (isServe) {
      // Dev: inline todo el CSS (rápido, no purga)
      return content.replace('</head>', `<style>${fullCss}</style>\n</head>`);
    }

    // Producción: purga por página
    try {
      const purged = await new PurgeCSS().purge({
        content: [{ raw: content, extension: 'html' }],
        css: [{ raw: fullCss }],
        safelist: {
          standard: [/^html/, /^body/, /^\:root/, /^\*/],
          greedy: [/data-/, /aria-/],
        },
      });

      const purgedCss = purged[0]?.css || fullCss;
      return content.replace('</head>', `<style>${purgedCss}</style>\n</head>`);
    } catch (err) {
      console.warn(`[PurgeCSS] Error en ${outputPath}:`, err.message);
      return content.replace('</head>', `<style>${fullCss}</style>\n</head>`);
    }
  });

  // ── Inline JS — replace <script src="/assets/js/…"> with inline <script> ──
  const jsDir = path.resolve(__dirname, 'src', 'assets', 'js');
  eleventyConfig.addTransform('inline-js', function (content, outputPath) {
    if (!outputPath || !outputPath.endsWith('.html')) return content;

    return content.replace(
      /<script\s+src="(\/assets\/js\/([^"]+))"[^>]*>\s*<\/script>/gi,
      (match, srcPath, filename) => {
        const filePath = path.join(jsDir, filename);
        if (!fs.existsSync(filePath)) return match; // keep external if file not found
        const js = fs.readFileSync(filePath, 'utf8');
        return `<script>${js}</script>`;
      }
    );
  });

  // ── HTML minify (producción) ──
  eleventyConfig.addTransform('html-minify', async function (content, outputPath) {
    if (isServe) return content;
    if (!outputPath || !outputPath.endsWith('.html')) return content;
    return await minify(content, {
      collapseWhitespace: true,
      removeComments: true,
      removeRedundantAttributes: true,
      removeScriptTypeAttributes: true,
      removeStyleLinkTypeAttributes: true,
      useShortDoctype: true,
      minifyCSS: false,   // ya lo hace cssnano
      minifyJS: false,    // JS está inlineado y ya minificado
    });
  });

  // ── Favicon shortcode (Design System/assets/icons/) ──
  eleventyConfig.addShortcode('favicons', function () {
    return `
      <link rel="icon" type="image/svg+xml" href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Crect width='512' height='512' rx='112' fill='%2316202A'/%3E%3Ctext x='232' y='356' text-anchor='middle' font-family='Georgia, serif' font-weight='500' font-size='372' fill='%23F4F0E8'%3Ep%3C/text%3E%3Ccircle cx='356' cy='332' r='40' fill='%231C7A4A'/%3E%3C/svg%3E">
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16.png">
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
      <link rel="manifest" href="/assets/icons/site.webmanifest">
      <meta name="theme-color" content="#16202A">
    `;
  });

  // ── 404 fallback ──
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware('*', (req, res) => {
          const content404 = fs.existsSync('dist/404.html')
            ? fs.readFileSync('dist/404.html')
            : '<h1>404</h1>';
          res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
          res.write(content404);
          res.end();
        });
      },
    },
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      data: '_data',
    },
    templateFormats: ['njk', 'md', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
  };
}
