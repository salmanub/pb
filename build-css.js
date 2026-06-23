/**
 * build-css.js — Compila Tailwind a built.css (standalone, para CI).
 * Uso: npm run build:css
 */
import fs from 'fs';
import path from 'path';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import cssnano from 'cssnano';

const inputPath = path.resolve('src/assets/css/main.css');
const outputPath = path.resolve('src/assets/css/built.css');

const input = fs.readFileSync(inputPath, 'utf8');

const result = await postcss([
  tailwindcss(),
  cssnano({ preset: ['default', { discardComments: { removeAll: true } }] }),
]).process(input, { from: inputPath, to: outputPath });

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, result.css);
console.log(`✓ built.css (${(result.css.length / 1024).toFixed(1)} KB)`);
