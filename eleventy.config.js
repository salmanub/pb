import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import markdownIt from 'markdown-it';

import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';


// Definir __dirname para módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default function (eleventyConfig) {
  

  eleventyConfig.addPassthroughCopy("src/assets/images");
  eleventyConfig.addPassthroughCopy("src/assets/scripts");
  eleventyConfig.addPassthroughCopy("src/assets/fonts");
  eleventyConfig.addPassthroughCopy("src/assets/icons");
  eleventyConfig.addPassthroughCopy("src/site.webmanifest");
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

  return {
    dir: { 
      input: 'src', 
      output: 'dist',
      includes: '_includes' 
    }
  };
}
