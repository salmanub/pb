import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import markdownIt from 'markdown-it';
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import htmlminifier from 'html-minifier-terser';
import Image from "@11ty/eleventy-img";

import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';



// Definir __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (eleventyConfig) {

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/scripts");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/_headers");

  eleventyConfig.addFilter('renderMarkdown', function (content) {
    return md.render(content);
  });
  // No necesitamos filtros personalizados para acceder a los datos

  eleventyConfig.addCollection("langCollections", function (collectionApi) {
    const collectionsByLang = {};

    // Obtener todos los items de la colección
    const allItems = collectionApi.getAll();

    // Iterar sobre los items y clasificarlos por 'lang'
    allItems.forEach((item) => {
      const lang = item.data.lang;

      // Asegúrate de que el item tenga un 'lang' definido
      if (lang) {
        // Si la colección para ese idioma no existe, crearla
        if (!collectionsByLang[lang]) {
          collectionsByLang[lang] = [];
        }

        // Añadir el item a la colección correspondiente
        collectionsByLang[lang].push(item);
      }
    });

    return collectionsByLang;
  });

  const isServe = process.argv.includes('--serve');

  // El shortcode de imagen asíncrono optimizado para dev
  eleventyConfig.addAsyncShortcode("image", async function (src, alt, sizes = "100vw", loading = "lazy", fetchpriority = "auto", additionalClasses = "") {
    if (alt === undefined) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    // Normalizar la ruta de la imagen
    if (src.startsWith('/')) {
      src = path.join(__dirname, 'src', src.substring(1));
    } else if (!path.isAbsolute(src) && !src.startsWith("http")) {
      src = path.join(__dirname, src);
    }

    if (!fs.existsSync(src) && !src.startsWith("http")) {
      console.warn(`Warning: Image file not found: ${src}`);
      return `<img src="${src}" alt="${alt}" class="${additionalClasses}">`;
    }

    // En modo serve, reducimos la carga de procesamiento de imágenes
    let opts = {
      widths: isServe ? [null] : [320, 640, 960, 1280, 1920], // En dev solo tamaño original (o redimensionado básico)
      formats: isServe ? ["auto"] : ["avif", "webp", "jpeg"], // En dev solo formato original
      outputDir: "./src/assets/images/optimized/",
      urlPath: "/assets/images/optimized/",
      filenameFormat: function (id, src, width, format) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    };

    let metadata = await Image(src, opts);

    let imageAttributes = {
      alt,
      sizes,
      loading,
      fetchpriority,
      decoding: "async",
      class: additionalClasses || ""
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Leer el contenido del favicon SVG como Data URI (opcional)
  const faviconPath = path.join(__dirname, "src", "assets", "images", "logos", "favicon.txt");
  const faviconSVGDataURI = fs.existsSync(faviconPath)
    ? fs.readFileSync(faviconPath, "utf8").trim()
    : null;

  // Shortcode para favicons
  eleventyConfig.addShortcode("favicons", function () {
    return `
      <!-- Favicons básicos -->
      ${faviconSVGDataURI ? `<link rel="icon" type="image/svg+xml" href="${faviconSVGDataURI}">` : ''}
      <link rel="icon" type="image/png" sizes="96x96" href="https://perito.barcelona/assets/icons/favicon-96x96.png">
      <link rel="icon" type="image/png" sizes="48x48" href="https://perito.barcelona/assets/icons/favicon-48x48.png">
      <link rel="icon" type="image/png" sizes="32x32" href="https://perito.barcelona/assets/icons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="https://perito.barcelona/assets/icons/favicon-16x16.png">
      
      <!-- PWA/Mobile icons -->
      <link rel="apple-touch-icon" sizes="180x180" href="https://perito.barcelona/assets/icons/apple-touch-icon.png">
      <link rel="mask-icon" href="https://perito.barcelona/assets/icons/safari-pinned-tab.svg" color="#06b6d4">
      
      <!-- Manifest y configuración del navegador -->
      <link rel="manifest" href="https://perito.barcelona/site.webmanifest">
      <meta name="msapplication-TileColor" content="#06b6d4">
      <meta name="theme-color" content="#06b6d4">
    `;
  });

  // Configurar markdown-it
  const md = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  });

  // Añadir filtro markdown
  eleventyConfig.addFilter("markdown", function (content) {
    if (!content) {
      console.warn("Se intentó renderizar contenido Markdown nulo o vacío");
      return "";
    }
    try {
      return md.render(content);
    } catch (error) {
      console.error("Error al renderizar Markdown:", error);
      return `<p class="text-red-600">Error al procesar contenido: ${error.message}</p>`;
    }
  });

  // Añadir filtro para comprobar si un valor es un array
  eleventyConfig.addFilter("isArray", function (value) {
    return Array.isArray(value);
  });

  // Añadir filtro default para valores nulos o undefined
  eleventyConfig.addFilter("default", function (value, defaultValue) {
    return (value !== null && value !== undefined) ? value : defaultValue;
  });

  // Shortcodes para capturar CSS y JS de componentes anidados
  eleventyConfig.addPairedShortcode("css", function (content) {
    this.page.css = (this.page.css || "") + content;
    return "";
  });

  eleventyConfig.addPairedShortcode("js", function (content) {
    this.page.js = (this.page.js || "") + content;
    return "";
  });

  // compile tailwind before eleventy processes the files
  eleventyConfig.on('eleventy.before', async () => {
    // Procesar global.css
    const globalInputPath = path.resolve('./src/assets/styles/global.css');
    const globalOutputPath = './dist/assets/styles/global.css';
    const globalContent = fs.readFileSync(globalInputPath, 'utf8');

    const outputDir = path.dirname(globalOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Optimización: Solo minificar en producción
    const globalPlugins = [];
    if (!isServe) {
      globalPlugins.push(cssnano({
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifyGradients: true
        }]
      }));
    }

    const globalResult = await postcss(globalPlugins).process(globalContent, {
      from: globalInputPath,
      to: globalOutputPath
    });

    fs.writeFileSync(globalOutputPath, globalResult.css);

    // Procesar tailwind
    const tailwindInputPath = path.resolve('./src/assets/styles/index.css');
    const tailwindOutputPath = './dist/assets/styles/index.css';
    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');

    // Configurar plugins dinámicamente
    const twPlugins = [
      tailwindcss({ config: './tailwind.config.js' })
    ];

    // Solo agregar cssnano si NO estamos en modo serve
    if (!isServe) {
      twPlugins.push(cssnano({
        preset: ['default', {
          discardComments: { removeAll: true },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifyGradients: true
        }]
      }));
    }

    const processor = postcss(twPlugins);
    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  // Minify HTML output - Disabled inside 'serve'
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
    if (isServe) return content; // Skip minification in dev

    if (outputPath && outputPath.endsWith(".html")) {
      return htmlminifier.minify(content, {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        minifyJS: true,
      });
    }
    return content;
  });

  // Configuración para páginas 404
  eleventyConfig.setUseGitIgnore(false);
  eleventyConfig.setBrowserSyncConfig({
    callbacks: {
      ready: function (err, bs) {
        bs.addMiddleware("*", (req, res) => {
          const content_404 = fs.readFileSync('dist/404.html');
          // Añadir headers para una respuesta 404 correcta
          res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
          res.write(content_404);
          res.end();
        });
      }
    }
  });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes'
    }
  };
}
