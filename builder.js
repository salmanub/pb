import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';
import { glob } from 'glob';
import * as cheerio from 'cheerio';
import fs from 'fs/promises';
import path from 'path';
import { exec } from 'child_process';
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

/**
 * Ejecuta el build de Eleventy
 */
async function buildSite() {
  console.log('🚀 Iniciando build de 11ty...');
  try {
    const { stdout, stderr } = await execPromise('npx @11ty/eleventy');
    console.log(stdout);
    if (stderr) console.error(stderr);
    console.log('✅ Build completado.');
  } catch (error) {
    console.error('❌ Error en el build:', error);
    process.exit(1);
  }
}

/**
 * Escanea los archivos HTML generados y extrae metadatos
 */
async function scanFiles() {
  console.log(`🔍 Escaneando archivos en ${CONFIG.outputDir}...`);
  
  // Buscar todos los HTMLs excepto 404 y admin
  // Usamos path.posix.join para asegurar separadores compatibles con glob
  const pattern = `${CONFIG.outputDir}/**/*.html`;
  const files = await glob(pattern, {
    ignore: [`${CONFIG.outputDir}/404.html`, `${CONFIG.outputDir}/admin/**`, `${CONFIG.outputDir}/google*.html`]
  });

  const resources = [];

  for (const file of files) {
    try {
      const content = await fs.readFile(file, 'utf-8');
      const $ = cheerio.load(content);
      
      const title = $('title').text().trim() || 'Sin título';
      const description = $('meta[name="description"]').attr('content') || '';
      
      // Inferir URL pública
      // Normalizar path separators a /
      let relativePath = path.relative(CONFIG.outputDir, file).split(path.sep).join('/');
      
      // Limpiar index.html para URLs limpias
      if (relativePath.endsWith('index.html')) {
        relativePath = relativePath.replace('index.html', '');
      }
      
      // Asegurar que no termine en / si no es la raíz, o sí? 
      // Perito.barcelona suele usar trailing slash.
      
      const fullUrl = `${CONFIG.publicUrl}/${relativePath}`;

      // Inferir Tipo y Tags
      let tipo = 'info';
      let tags = [];

      // Lógica de clasificación
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

      // Extraer keywords si existen en el HTML
      const metaKeywords = $('meta[name="keywords"]').attr('content');
      if (metaKeywords) {
        tags = [...tags, ...metaKeywords.split(',').map(t => t.trim())];
      }

      // Añadir palabras clave del título
      const titleWords = title.toLowerCase().split(' ').filter(w => w.length > 4);
      tags = [...tags, ...titleWords];

      // Limpiar tags duplicados y vacíos
      tags = [...new Set(tags)].filter(t => t);

      resources.push({
        titulo: title,
        url: fullUrl,
        tipo: tipo,
        tags: tags.join(', '),
        descripcion: description
      });
    } catch (err) {
      console.error(`Error procesando ${file}:`, err);
    }
  }

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
      sheet = await doc.addSheet({ title: 'Recursos_Web', headerValues: ['titulo', 'url', 'tipo', 'tags', 'descripcion'] });
    }

    console.log('🧹 Limpiando datos antiguos...');
    await sheet.clearRows(); 
    
    // Asegurar headers
    await sheet.setHeaderRow(['titulo', 'url', 'tipo', 'tags', 'descripcion']);

    console.log(`📝 Subiendo ${resources.length} nuevos recursos...`);
    await sheet.addRows(resources);
    
    console.log('✅ Sincronización completada.');
  } catch (error) {
    console.error('❌ Error actualizando Sheets:', error);
  }
}

async function main() {
  await buildSite();
  const resources = await scanFiles();
  await updateSheet(resources);
}

main();
