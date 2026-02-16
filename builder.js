import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { exec, spawn } from 'child_process';
import util from 'util';
import dotenv from 'dotenv';

dotenv.config();

const execPromise = util.promisify(exec);

// Configuración
const CONFIG = {
  sheetId: process.env.GOOGLE_SHEET_ID || 'TU_SHEET_ID',
  serviceAccountEmail: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
  privateKey: process.env.GOOGLE_PRIVATE_KEY,
  outputDir: 'dist', // Directorio de salida de 11ty
  publicUrl: 'https://perito.barcelona'
};

// Verificación de entorno
console.log('🔧 Configuración cargada:');
console.log(`- Sheet ID: ${CONFIG.sheetId ? '✅ Configurado' : '❌ Faltante'}`);
console.log(`- Service Account: ${CONFIG.serviceAccountEmail ? '✅ Configurado' : '❌ Faltante'}`);
console.log(`- Private Key: ${CONFIG.privateKey ? '✅ Configurado' : '❌ Faltante'}`);

/**
 * Ejecuta el build de Eleventy
 */
async function buildSite() {
  console.log('🚀 Iniciando build de 11ty...');
  return new Promise((resolve, reject) => {
    // Usar spawn para evitar problemas de buffer y ver output en tiempo real
    const child = spawn('npx', ['@11ty/eleventy', '--quiet'], { stdio: 'inherit', shell: true });

    child.on('close', (code) => {
      if (code === 0) {
        console.log('✅ Build completado.');
        resolve();
      } else {
        console.error(`❌ Build falló con código ${code}`);
        process.exit(1);
      }
    });

    child.on('error', (err) => {
      console.error('❌ Error al iniciar el proceso:', err);
      process.exit(1);
    });
  });
}

/**
 * Escanea los archivos HTML generados y extrae metadatos
 */
async function scanFiles() {
  console.log(`🔍 Escaneando archivos en ${CONFIG.outputDir}...`);

  const pattern = `${CONFIG.outputDir}/**/*.html`;
  const files = await glob(pattern, {
    ignore: [`${CONFIG.outputDir}/404.html`, `${CONFIG.outputDir}/admin/**`, `${CONFIG.outputDir}/google*.html`]
  });

  console.log(`📂 Procesando ${files.length} archivos en paralelo...`);

  // Procesar archivos en paralelo con Promise.all
  const promises = files.map(async (file) => {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const $ = cheerio.load(content);

      const title = $('title').text().trim() || 'Sin título';
      const description = $('meta[name="description"]').attr('content') || '';

      // Inferir URL pública
      let relativePath = path.relative(CONFIG.outputDir, file).split(path.sep).join('/');

      if (relativePath.endsWith('index.html')) {
        relativePath = relativePath.replace('index.html', '');
      }

      const fullUrl = `${CONFIG.publicUrl}/${relativePath}`;

      // Inferir Tipo y Tags
      let tipo = 'info';
      let tags = [];
      let lang = $('html').attr('lang') || 'es';

      if (!lang || lang === 'es') {
        if (fullUrl.includes('/ca/')) lang = 'ca';
        else if (fullUrl.includes('/en/')) lang = 'en';
        else if (fullUrl.includes('/fr/')) lang = 'fr';
        else if (fullUrl.includes('/it/')) lang = 'it';
      }

      if (fullUrl.includes('/blog/')) {
        tipo = 'blog';
        tags.push('blog');
      } else if (fullUrl.includes('/casos/') || fullUrl.includes('caso-exito')) {
        tipo = 'caso_exito';
        tags.push('caso_exito');
      } else if (fullUrl.includes('/servicios/')) {
        tipo = 'servicio';
        tags.push('servicio');
      }

      const metaKeywords = $('meta[name="keywords"]').attr('content');
      if (metaKeywords) {
        tags = [...tags, ...metaKeywords.split(',').map(t => t.trim())];
      }

      const titleWords = title.toLowerCase().split(' ').filter(w => w.length > 4);
      tags = [...tags, ...titleWords];
      tags = [...new Set(tags)].filter(t => t);

      return {
        titulo: title,
        url: fullUrl,
        tipo: tipo,
        tags: tags.join(', '),
        descripcion: description,
        lang: lang
      };
    } catch (err) {
      console.error(`Error procesando ${file}:`, err);
      return null;
    }
  });

  const results = await Promise.all(promises);
  // Filtrar nulos (errores)
  const resources = results.filter(r => r !== null);

  console.log(`✅ Encontrados ${resources.length} recursos.`);
  return resources;
}

/**
 * Sube los datos a Google Sheets
 */
async function updateSheet(resources) {
  console.log('📊 Conectando a Google Sheets...');

  if (!CONFIG.serviceAccountEmail || !CONFIG.privateKey) {
    console.error('❌ Faltan credenciales de Service Account en .env');
    console.log('⚠️ Saltando sincronización con Sheets (Modo Dry Run)');
    console.log('Muestra de datos:', resources.slice(0, 3));
    return;
  }

  try {
    const serviceAccountAuth = new JWT({
      email: CONFIG.serviceAccountEmail,
      key: CONFIG.privateKey.replace(/\\n/g, '\n'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(CONFIG.sheetId, serviceAccountAuth);

    await doc.loadInfo();

    let sheet = doc.sheetsByTitle['Recursos_Web'];
    if (!sheet) {
      console.log('⚠️ Pestaña Recursos_Web no existe. Creándola...');
      sheet = await doc.addSheet({ title: 'Recursos_Web', headerValues: ['titulo', 'url', 'tipo', 'tags', 'descripcion', 'lang'] });
    }

    console.log('🧹 Limpiando datos antiguos...');
    await sheet.clearRows();

    // Asegurar headers
    await sheet.setHeaderRow(['titulo', 'url', 'tipo', 'tags', 'descripcion', 'lang']);

    console.log(`📝 Subiendo ${resources.length} nuevos recursos...`);
    await sheet.addRows(resources);

    console.log('✅ Sincronización completada.');
  } catch (error) {
    console.error('❌ Error actualizando Sheets:', error);
  }
}


async function optimizeImages() {
  console.log('🖼️  Optimizando imágenes...');
  try {
    const { stdout, stderr } = await execPromise('npm run optimize-images');
    console.log(stdout);
    if (stderr) console.error(stderr);
    console.log('✅ Imágenes optimizadas correctamente.');
  } catch (err) {
    console.error('❌ Error optimizando imágenes:', err);
    process.exit(1);
  }
}

async function main() {
  await buildSite();
  await optimizeImages(); // Run optimization after build to popualte dist
  const resources = await scanFiles();
  await updateSheet(resources);
}

main();
