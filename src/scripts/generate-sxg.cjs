/**
 * generate-sxg.cjs — Generate Signed HTTP Exchanges for all HTML pages.
 *
 * Reads HTML files from dist/, generates .sxg files using gen-signedexchange,
 * and writes them alongside the originals in dist/.
 *
 * Requirements (installed by the GitHub Actions workflow):
 *   - gen-signedexchange (Go binary on PATH)
 *   - .certs/privkey.pem  (EC P-256 private key)
 *   - .certs/fullchain.pem (leaf + CA chain)
 *   - .certs/cert.cbor already in dist/
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const DIST = path.resolve(__dirname, '..', '..', 'dist');
const DOMAIN = process.env.DOMAIN || 'perito.barcelona';
const CERT = path.resolve(__dirname, '..', '..', '.certs', 'fullchain.pem');
const KEY  = path.resolve(__dirname, '..', '..', '.certs', 'privkey.pem');
const CERT_URL = `https://${DOMAIN}/cert.cbor`;

// Validity: 7 days minus 1 hour (SXG max is 7 days)
const VALIDITY = 7 * 24 * 3600 - 3600;

function findHtmlFiles(dir, base) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    const rel = path.join(base, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findHtmlFiles(full, rel));
    } else if (entry.name.endsWith('.html')) {
      results.push({ abs: full, rel: rel.replace(/\\/g, '/') });
    }
  }
  return results;
}

// Validate prerequisites
if (!fs.existsSync(CERT)) {
  console.error('❌ Certificate not found:', CERT);
  process.exit(1);
}
if (!fs.existsSync(KEY)) {
  console.error('❌ Private key not found:', KEY);
  process.exit(1);
}

const htmlFiles = findHtmlFiles(DIST, '');
console.log(`Found ${htmlFiles.length} HTML files to sign.`);

let signed = 0;
let errors = 0;

for (const file of htmlFiles) {
  // Build the canonical URL: /index.html → /
  let urlPath = '/' + file.rel;
  urlPath = urlPath.replace(/\/index\.html$/, '/');
  if (urlPath === '/') urlPath = '/';

  const url = `https://${DOMAIN}${urlPath}`;
  const sxgPath = file.abs.replace(/\.html$/, '.sxg');

  try {
    execSync(
      `gen-signedexchange ` +
      `-uri "${url}" ` +
      `-content "${file.abs}" ` +
      `-certificate "${CERT}" ` +
      `-privateKey "${KEY}" ` +
      `-certUrl "${CERT_URL}" ` +
      `-validityUrl "https://${DOMAIN}/cert.cbor" ` +
      `-expire ${VALIDITY}s ` +
      `-o "${sxgPath}"`,
      { stdio: 'pipe', timeout: 30000 }
    );
    signed++;
  } catch (err) {
    console.warn(`⚠️ Failed to sign ${urlPath}: ${err.message?.split('\n')[0] || err}`);
    errors++;
  }
}

console.log(`✅ Signed ${signed}/${htmlFiles.length} pages (${errors} errors).`);
if (errors > 0 && signed === 0) {
  console.error('❌ All SXG generation failed.');
  process.exit(1);
}
