import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

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
