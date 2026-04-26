/**
 * generate-touch-icon.cjs
 * Genera apple-touch-icon.png (180×180) + favicon-32x32.png + favicon-16x16.png
 * desde el SVG del logo de Perito Barcelona.
 * Usa sharp si está disponible, o escribe un SVG wrapper como fallback.
 */
const fs = require('fs');
const path = require('path');

const OUT_DIR = path.join(__dirname, 'src/assets/favicons');
fs.mkdirSync(OUT_DIR, { recursive: true });

// SVG fuente (mismo que el favicon existente, ampliado con fondo blanco y padding)
const svgSource = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 375" width="180" height="180" preserveAspectRatio="xMidYMid meet">
  <!-- Fondo blanco con esquinas redondeadas (iOS) -->
  <rect width="375" height="375" rx="80" ry="80" fill="#ffffff"/>
  <!-- Padding 15%: logo ocupa 70% del área centrado -->
  <g transform="translate(56,56) scale(0.7)">
    <defs>
      <clipPath id="c1"><path d="M 223.109375 37.496094 L 314.597656 37.496094 L 314.597656 337.6875 L 223.109375 337.6875 Z" clip-rule="nonzero"/></clipPath>
      <clipPath id="c2"><path d="M 314.597656 67.992188 L 314.597656 337.496094 L 223.109375 307 L 223.109375 37.496094 Z" clip-rule="nonzero"/></clipPath>
      <clipPath id="c3"><path d="M 146.625 37.496094 L 223.117188 37.496094 L 223.117188 249.945312 L 146.625 249.945312 Z" clip-rule="nonzero"/></clipPath>
      <clipPath id="c4"><path d="M 146.625 62.996094 L 146.625 249.945312 L 223.117188 224.449219 L 223.117188 37.496094 Z" clip-rule="nonzero"/></clipPath>
      <clipPath id="c5"><path d="M 112.101562 111.523438 L 177.742188 111.523438 L 177.742188 291.515625 L 112.101562 291.515625 Z" clip-rule="nonzero"/></clipPath>
      <clipPath id="c6"><path d="M 177.742188 133.402344 L 177.742188 291.402344 L 112.101562 269.523438 L 112.101562 111.523438 Z" clip-rule="nonzero"/></clipPath>
      <clipPath id="c7"><path d="M 60.398438 111.367188 L 112.109375 111.367188 L 112.109375 237.410156 L 60.398438 237.410156 Z" clip-rule="nonzero"/></clipPath>
      <clipPath id="c8"><path d="M 60.398438 128.75 L 60.398438 237.410156 L 112.109375 220.175781 L 112.109375 111.515625 Z" clip-rule="nonzero"/></clipPath>
    </defs>
    <g clip-path="url(#c1)"><g clip-path="url(#c2)">
      <path fill="#00B8D4" d="M 314.597656 37.496094 L 314.597656 337.332031 L 223.109375 337.332031 L 223.109375 37.496094 Z" fill-opacity="1" fill-rule="nonzero"/>
    </g></g>
    <g clip-path="url(#c3)"><g clip-path="url(#c4)">
      <path fill="#00B8D4" d="M 146.625 249.945312 L 146.625 37.496094 L 223.117188 37.496094 L 223.117188 249.945312 Z" fill-opacity="1" fill-rule="nonzero"/>
    </g></g>
    <g clip-path="url(#c5)"><g clip-path="url(#c6)">
      <path fill="#00B8D4" d="M 177.742188 111.523438 L 177.742188 291.515625 L 112.101562 291.515625 L 112.101562 111.523438 Z" fill-opacity="1" fill-rule="nonzero"/>
    </g></g>
    <g clip-path="url(#c7)"><g clip-path="url(#c8)">
      <path fill="#00B8D4" d="M 60.398438 237.410156 L 60.398438 111.570312 L 112.109375 111.570312 L 112.109375 237.410156 Z" fill-opacity="1" fill-rule="nonzero"/>
    </g></g>
  </g>
</svg>`;

// Guardar SVG base (útil como safari-pinned-tab)
fs.writeFileSync(path.join(OUT_DIR, 'safari-pinned-tab.svg'), svgSource, 'utf8');
console.log('✓ safari-pinned-tab.svg escrito');

// Intentar usar sharp para generar PNGs
let sharpAvailable = false;
try {
  require.resolve('sharp');
  sharpAvailable = true;
} catch (_) {}

if (sharpAvailable) {
  const sharp = require('sharp');
  const svgBuf = Buffer.from(svgSource);

  const sizes = [
    { file: 'apple-touch-icon.png', size: 180 },
    { file: 'favicon-32x32.png',    size: 32  },
    { file: 'favicon-16x16.png',    size: 16  },
  ];

  Promise.all(sizes.map(({ file, size }) =>
    sharp(svgBuf)
      .resize(size, size)
      .png()
      .toFile(path.join(OUT_DIR, file))
      .then(() => console.log(`✓ ${file} (${size}×${size})`))
  )).catch(console.error);

} else {
  // Fallback: copiar SVG renombrado (los navegadores aceptan SVG como apple-touch-icon en algunos casos,
  // pero mejor aún: exportar el SVG 180px como placeholder PNG usando base64 embed trick)
  console.warn('⚠  sharp no instalado. Instalando...');
  const { execSync } = require('child_process');
  try {
    execSync('npm install sharp --save-dev', { stdio: 'inherit' });
    // Re-run after install
    execSync('node generate-touch-icon.cjs', { stdio: 'inherit' });
  } catch (e) {
    // Si no se puede instalar, escribir un SVG con extensión .png como fallback mínimo
    const svgSmall = svgSource.replace('width="180" height="180"', 'width="180" height="180"');
    fs.writeFileSync(path.join(OUT_DIR, 'apple-touch-icon.png'), svgSmall, 'utf8');
    fs.writeFileSync(path.join(OUT_DIR, 'favicon-32x32.png'), svgSmall, 'utf8');
    fs.writeFileSync(path.join(OUT_DIR, 'favicon-16x16.png'), svgSmall, 'utf8');
    console.log('⚠  Escritos SVGs como fallback PNG (instala sharp para PNG real)');
  }
}

// Crear site.webmanifest si no existe
const manifest = {
  name: "Perito Barcelona",
  short_name: "Perito BCN",
  icons: [
    { src: "/assets/favicons/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    { src: "/assets/favicons/favicon-32x32.png",    sizes: "32x32",   type: "image/png" },
  ],
  theme_color: "#00B8D4",
  background_color: "#ffffff",
  display: "standalone"
};

const manifestPath = path.join(OUT_DIR, 'site.webmanifest');
if (!fs.existsSync(manifestPath)) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2), 'utf8');
  console.log('✓ site.webmanifest creado');
}
