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
import { linkPreloader } from './src/assets/js/link-preloader.js';


// Definir __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (eleventyConfig) {
  
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  // Agregar el plugin de linkPreloader
  linkPreloader(eleventyConfig);
  
  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/scripts");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  eleventyConfig.addPassthroughCopy("src/assets/js");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");
  eleventyConfig.addPassthroughCopy("src/_redirects");
  eleventyConfig.addPassthroughCopy("src/_headers");
  
  eleventyConfig.addFilter('renderMarkdown', function(content) {
        return md.render(content);
    });
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

  // El shortcode de imagen asíncrono (la lógica interna no cambia)
  eleventyConfig.addAsyncShortcode("image", async function(src, alt, sizes = "100vw", loading = "lazy", fetchpriority = "auto", additionalClasses = "") {
    if (alt === undefined) {
      throw new Error(`Missing \`alt\` on image from: ${src}`);
    }

    // Normalizar la ruta de la imagen
    if (src.startsWith('/')) {
      // Si comienza con /, es una ruta relativa a la raíz del sitio
      src = path.join(__dirname, 'src', src.substring(1));
    } else if (!path.isAbsolute(src) && !src.startsWith("http")) {
      // Si no es absoluta ni HTTP, asumimos que es relativa al directorio del proyecto
      src = path.join(__dirname, src);
    }

    // Asegurar que el archivo existe
    if (!fs.existsSync(src) && !src.startsWith("http")) {
      console.warn(`Warning: Image file not found: ${src}`);
      return `<img src="${src}" alt="${alt}" sizes="${sizes}" loading="${loading}" fetchpriority="${fetchpriority}" class="${additionalClasses}">`;
    }

    let metadata = await Image(src, {
      widths: [320, 640, 960, 1280, 1920],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./src/assets/images/optimized/", 
      urlPath: "/assets/images/optimized/",
      filenameFormat: function (id, src, width, format) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });

    let imageAttributes = {
      alt,
      sizes,
      loading,
      fetchpriority,
      decoding: "async",
      class: additionalClasses || "" // Agregar clases adicionales si se proporcionan
    };

    return Image.generateHTML(metadata, imageAttributes);
  });

  // Leer el contenido del favicon SVG como Data URI (opcional)
  const faviconPath = path.join(__dirname, "src", "assets", "images", "logos", "favicon.txt");
  const faviconSVGDataURI = fs.existsSync(faviconPath) 
    ? fs.readFileSync(faviconPath, "utf8").trim()
    : null;

  // Shortcode para favicons - nombre cambiado a "favicon" para coincidir con {% favicon %}
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
  eleventyConfig.addFilter("markdown", function(content) {
    return md.render(content);
  });

  //compile tailwind before eleventy processes the files
  eleventyConfig.on('eleventy.before', async () => {
    // Procesar global.css
    const globalInputPath = path.resolve('./src/assets/styles/global.css');
    const globalOutputPath = './dist/assets/styles/global.css';
    
    const globalContent = fs.readFileSync(globalInputPath, 'utf8');
    
    // Asegurar que existe el directorio de salida
    const outputDir = path.dirname(globalOutputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Procesar global.css
    const globalResult = await postcss([
      cssnano({
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
          minifyFontValues: true,
          minifyGradients: true
        }]
      })
    ]).process(globalContent, {
      from: globalInputPath,
      to: globalOutputPath
    });

    fs.writeFileSync(globalOutputPath, globalResult.css);

    // Procesar tailwind
    const tailwindInputPath = path.resolve('./src/assets/styles/index.css');
    const tailwindOutputPath = './dist/assets/styles/index.css';
    
    const cssContent = fs.readFileSync(tailwindInputPath, 'utf8');
    
    const result = await processor.process(cssContent, {
      from: tailwindInputPath,
      to: tailwindOutputPath,
    });

    fs.writeFileSync(tailwindOutputPath, result.css);
  });

  const processor = postcss([
    //compile tailwind
    tailwindcss({
      content: ['./src/**/*.{njk,md,js}'],
      theme: {
        extend: {}
      },
      safelist: ['group', 'group-hover:text-emerald-600']
    }),
    //minify tailwind css
    cssnano({
      preset: ['default', {
        discardComments: {
          removeAll: true,
        },
        normalizeWhitespace: true,
        minifyFontValues: true,
        minifyGradients: true
      }]
    }),
  ]);
  // Minify HTML output
  eleventyConfig.addTransform("htmlmin", function (content, outputPath) {
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
      ready: function(err, bs) {
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
