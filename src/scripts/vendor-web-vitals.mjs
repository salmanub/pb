/**
 * Refresca src/assets/js/vendor/web-vitals.js desde npm.
 *
 *   npm run vendor:web-vitals
 *
 * Se vendoriza en vez de tirar de un CDN por tres motivos:
 *   1. el sitio ya se autohospeda todo (fuentes incluidas) y proxya GA por su
 *      propio dominio: un tercero en la ruta crítica rompería esa política;
 *   2. un subrecurso de otro origen no se puede firmar dentro del Signed
 *      Exchange, así que desde la caché de Google sería una petición extra a
 *      un host distinto, justo lo que el SXG viene a evitar;
 *   3. una dependencia de runtime que puede cambiar bajo los pies no pinta
 *      nada en un sitio que se despliega firmado.
 *
 * No añade dependencia permanente: usa npm pack sobre el registro y descarta
 * el tarball. Requiere red.
 */
import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const DESTINO = resolve(AQUI, '..', 'assets', 'js', 'vendor', 'web-vitals.js');
const PAQUETE = process.argv[2] || 'web-vitals@latest';

const tmp = mkdtempSync(join(tmpdir(), 'web-vitals-'));
try {
  execFileSync('npm', ['install', '--no-save', '--prefix', tmp, PAQUETE], { stdio: 'inherit' });

  const raiz = join(tmp, 'node_modules', 'web-vitals');
  const version = JSON.parse(readFileSync(join(raiz, 'package.json'), 'utf8')).version;
  const iife = readFileSync(join(raiz, 'dist', 'web-vitals.iife.js'), 'utf8')
    // El sourceMappingURL apunta a un .map que no se publica: dejaría un 404
    // en la consola de todos los visitantes con DevTools abierto.
    .replace(/\n\/\/# sourceMappingURL=.*\n?/, '\n');

  const cabecera = `/*!
 * web-vitals v${version} — build IIFE oficial, vendorizada.
 * Google LLC · Apache-2.0 · https://github.com/GoogleChrome/web-vitals
 *
 * NO EDITAR A MANO. Se refresca con:  npm run vendor:web-vitals
 *
 * Vive en /assets/js/vendor/ y NO en /assets/js/ a secas por dos motivos:
 *   1. el transform inline-js de .eleventy.js mete en el HTML todo lo que
 *      cuelga de /assets/js/, y 9 KB por página en un sitio que presume de
 *      cero JS no se sostiene: aquí interesa UN fichero cacheado un año y
 *      compartido por todas las páginas;
 *   2. desde la copia en caché de Google (webpkgcache.com) la página se
 *      carga con un origen distinto, así que el <script> la referencia por
 *      URL absoluta — y una URL absoluta no la toca ese transform.
 *
 * Expone el global \`webVitals\`.
 */
`;

  mkdirSync(dirname(DESTINO), { recursive: true });
  writeFileSync(DESTINO, cabecera + iife, 'utf8');
  console.log(`✓ web-vitals ${version} → ${DESTINO}`);
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
