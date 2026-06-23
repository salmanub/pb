/**
 * download-fonts.mjs — Download Google Fonts woff2 files for self-hosting
 */
import fs from 'fs';
import path from 'path';
import https from 'https';

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';
const GOOGLE_URL = 'https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:ital,wght@0,400;0,500;0,600;1,400&family=Spectral:ital,wght@0,300;0,400;0,500;0,600;1,400&display=swap';
const FONT_DIR = 'src/assets/fonts/self-hosted';
const CSS_OUT = 'src/assets/css/fonts.css';

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

  // 1. Get CSS from Google
  const cssBuffer = await fetch(GOOGLE_URL);
  let css = cssBuffer.toString('utf8');

  // 2. Extract all woff2 URLs
  const urlRegex = /url\((https:\/\/fonts\.gstatic\.com\/[^)]+\.woff2)\)/g;
  const urls = new Set();
  let m;
  while ((m = urlRegex.exec(css)) !== null) urls.add(m[1]);

  console.log(`Found ${urls.size} woff2 files`);

  // 3. Download each
  for (const url of urls) {
    const filename = path.basename(new URL(url).pathname);
    const filepath = path.join(FONT_DIR, filename);
    if (!fs.existsSync(filepath)) {
      const data = await fetch(url);
      fs.writeFileSync(filepath, data);
      console.log(`  ✓ ${filename} (${(data.length/1024).toFixed(1)} KB)`);
    } else {
      console.log(`  • ${filename} (cached)`);
    }
  }

  // 4. Rewrite CSS: replace Google URLs with local paths
  const localCss = css.replace(/https:\/\/fonts\.gstatic\.com\/s\/[^)]+\/([\w.-]+\.woff2)/g,
    '/assets/fonts/self-hosted/$1');

  fs.writeFileSync(CSS_OUT, localCss);
  console.log(`\n✓ ${CSS_OUT} written (${(localCss.length/1024).toFixed(1)} KB)`);
}

main().catch(console.error);
