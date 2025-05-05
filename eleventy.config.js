import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import markdownIt from 'markdown-it';

import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';

// Definir la función linkPreloader directamente en eleventy.config.js
export function linkPreloader(config) {
  // Registrar el shortcode para usar en templates
  config.addShortcode("linkPreloader", function() {
    return `
      
        // Configuración
        const preloadConfig = {
          // Enlaces que NO queremos precargar
          excludePatterns: [
            /\\.pdf$/,
            /\\.zip$/,
            /^tel:/,
            /^mailto:/,
            /^#/,
            /^javascript:/
          ],
          // Prioridad de tipos de preload
          priorities: {
            samePage: 'high',
            sameOrigin: 'low',
            external: 'lowest'
          }
        };

        // Función principal de precarga
        function initLinkPreloader() {
          // Crear observer para detectar cuando el usuario está inactivo
          let idleCallback = window.requestIdleCallback || 
            function(cb) { return setTimeout(cb, 1); };

          // Obtener todos los enlaces de la página
          const links = Array.from(document.links);

          idleCallback(() => {
            links
              .filter(link => shouldPreloadLink(link))
              .forEach(link => preloadLink(link));
          });
        }

        // Determinar si debemos precargar un enlace
        function shouldPreloadLink(link) {
          const href = link.href;
          
          // Verificar exclusiones
          const isExcluded = preloadConfig.excludePatterns.some(pattern => 
            pattern.test(href)
          );
          
          if (isExcluded) return false;

          // No precargar si ya está en caché
          if (performance.getEntriesByName(href).length > 0) return false;

          // No precargar si está fuera de viewport
          const rect = link.getBoundingClientRect();
          const isInViewport = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
          );
          
          if (!isInViewport) return false;

          return true;
        }

        // Precargar un enlace específico
        function preloadLink(link) {
          const href = link.href;
          
          // Determinar prioridad
          let priority = 'auto';
          if (link.host === window.location.host) {
            if (link.pathname === window.location.pathname) {
              priority = preloadConfig.priorities.samePage;
            } else {
              priority = preloadConfig.priorities.sameOrigin;
            }
          } else {
            priority = preloadConfig.priorities.external;
          }

          // Crear elemento de precarga
          const preloader = document.createElement('link');
          preloader.rel = 'prefetch';
          preloader.href = href;
          preloader.as = 'document';
          preloader.importance = priority;

          // Agregar a head
          document.head.appendChild(preloader);
        }

        // Inicializar cuando el documento esté listo
        if (document.readyState === 'complete') {
          initLinkPreloader();
        } else {
          window.addEventListener('load', initLinkPreloader);
        }

        // Bonus: Integración con Partytown
        if (window.partytown) {
          window.partytown.forward(['requestIdleCallback']);
        }
      
    `;
  });
};

// Definir __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (eleventyConfig) {
  // Agregar el plugin linkPreloader aquí
  linkPreloader(eleventyConfig);

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/scripts");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  eleventyConfig.addPassthroughCopy("src/favicon.ico");

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

  // Leer el contenido del favicon SVG como Data URI (opcional)
  const faviconPath = path.join(__dirname, "src", "assets", "images", "logos", "favicon.txt");
  const faviconSVGDataURI = fs.existsSync(faviconPath) 
    ? fs.readFileSync(faviconPath, "utf8").trim()
    : null;

  // Shortcode para favicons - nombre cambiado a "favicon" para coincidir con {% favicon %}
  eleventyConfig.addShortcode("favicons", function () {
    return `
      <!-- Favicons básicos -->
      <link rel="icon" type="image/x-icon" href="/favicon.ico" sizes="any">
      ${faviconSVGDataURI ? `<link rel="icon" type="image/svg+xml" href="${faviconSVGDataURI}">` : ''}
      <link rel="icon" type="image/png" sizes="96x96" href="/assets/icons/favicon-96x96.png">
      <link rel="icon" type="image/png" sizes="48x48" href="/assets/icons/favicon-48x48.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png">
      
      <!-- PWA/Mobile icons -->
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
      <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#06b6d4">
      
      <!-- Manifest y configuración del navegador -->
      <link rel="manifest" href="/site.webmanifest">
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

  return {
    dir: { 
      input: 'src', 
      output: 'dist',
      includes: '_includes' 
    }
  };
}
