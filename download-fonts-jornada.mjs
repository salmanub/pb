/**
 * download-fonts-jornada.mjs — autoaloja las fuentes del design system Jornada
 * (Lora, Archivo, JetBrains Mono) que usan los documentos del motor de
 * maquetación: presupuestos, facturas e informes.
 *
 * Va aparte de download-fonts.mjs (Spectral / IBM Plex, las del sitio) y
 * escribe en su propio CSS, para no tocar las fuentes de la web.
 *
 *   node download-fonts-jornada.mjs
 */
import fs from 'fs';
import path from 'path';
import https from 'https';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const GOOGLE_URL = 'https://fonts.googleapis.com/css2' +
  '?family=Archivo:wght@500;600;700' +
  '&family=JetBrains+Mono:wght@400;500;600' +
  '&family=Lora:ital,wght@0,400;0,500;0,600;1,400' +
  '&display=swap';
const FONT_DIR = 'src/assets/fonts/self-hosted';
const CSS_OUT = 'src/assets/css/fonts-jornada.css';

function fetch(url) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location).then(resolve, reject);
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  fs.mkdirSync(FONT_DIR, { recursive: true });

  const css = (await fetch(GOOGLE_URL)).toString('utf8');

  const urls = new Set();
  const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g;
  let m;
  while ((m = urlRegex.exec(css)) !== null) urls.add(m[1]);
  console.log(`Encontrados ${urls.size} woff2`);

  for (const url of urls) {
    const filename = path.basename(new URL(url).pathname);
    const filepath = path.join(FONT_DIR, filename);
    if (fs.existsSync(filepath)) {
      console.log(`  • ${filename} (ya estaba)`);
      continue;
    }
    const data = await fetch(url);
    fs.writeFileSync(filepath, data);
    console.log(`  ✓ ${filename} (${(data.length / 1024).toFixed(1)} KB)`);
  }

  const cabecera = '/* Design system Jornada — Lora, Archivo, JetBrains Mono.\n' +
    '   Generado por download-fonts-jornada.mjs. No editar a mano.\n' +
    '   Lo consume el motor de maquetación (motor-maquetacion/src/render/estilos.ts). */\n';

  const localCss = cabecera + css.replace(
    /https:\/\/fonts\.gstatic\.com\/s\/[^)]+\/([\w.-]+\.woff2)/g,
    '/assets/fonts/self-hosted/$1',
  );

  fs.writeFileSync(CSS_OUT, localCss);
  console.log(`\n✓ ${CSS_OUT} escrito (${(localCss.length / 1024).toFixed(1)} KB)`);
}

main().catch((e) => { console.error(e); process.exit(1); });
