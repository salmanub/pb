import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Image from "@11ty/eleventy-img";
import * as globModule from 'glob';
import { promisify } from 'util';

const globPromise = promisify(globModule.glob);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Configuración de dimensiones y formatos (coincidentes con el shortcode de imagen en eleventy.config.js)
const widths = [320, 480, 640, 768, 1024, 1280, 1536, 1920, 2048];
const formats = ["avif", "webp", "jpg"];
const outputDir = "./assets/images/optimized/"; // Cambiado para guardar en assets en lugar de dist
const urlPath = "/assets/images/optimized/";

// Función para procesar una imagen
async function processImage(imagePath) {
  console.log(`Procesando: ${imagePath}`);
  
  try {
    // Generar versiones optimizadas
    let metadata = await Image(imagePath, {
      widths: widths,
      formats: formats,
      outputDir: path.join(rootDir, outputDir), // Ruta relativa desde el directorio raíz
      urlPath: urlPath,
      filenameFormat: function (id, src, width, format) {
        const extension = path.extname(src);
        const name = path.basename(src, extension);
        return `${name}-${width}w.${format}`;
      }
    });
    
    console.log(`✓ Generadas ${Object.values(metadata).flat().length} versiones para ${path.basename(imagePath)}`);
    
    // Generamos un resumen de las versiones creadas
    let summary = {};
    for (const format in metadata) {
      summary[format] = metadata[format].map(img => ({
        width: img.width,
        height: img.height,
        size: `${(img.size / 1024).toFixed(1)}KB`,
        url: img.url
      }));
    }
    
    return { 
      success: true, 
      imagePath, 
      count: Object.values(metadata).flat().length,
      summary
    };
  } catch (error) {
    console.error(`✗ Error procesando ${imagePath}: ${error.message}`);
    return { 
      success: false, 
      imagePath, 
      error: error.message 
    };
  }
}

// Función principal para procesar todas las imágenes
async function processAllImages() {
  try {
    console.log("Iniciando optimización de imágenes...");
    
    // Mostrar la ruta raíz para diagnóstico
    console.log(`Directorio raíz: ${rootDir}`);
    
    // Asegurarse de que el directorio de salida existe
    const fullOutputDir = path.join(rootDir, outputDir);
    console.log(`Directorio de salida: ${fullOutputDir}`);
    
    if (!fs.existsSync(fullOutputDir)) {
      fs.mkdirSync(fullOutputDir, { recursive: true });
      console.log(`Creado directorio de salida: ${fullOutputDir}`);
    }
    
    // Verificar que existe el directorio de assets/images
    const imagesDir = path.join(rootDir, 'assets/images');
    if (!fs.existsSync(imagesDir)) {
      console.error(`Error: El directorio ${imagesDir} no existe`);
      console.log(`Directorios disponibles en ${rootDir}:`, fs.readdirSync(rootDir));
      return;
    }
    
    console.log(`Directorio de imágenes encontrado: ${imagesDir}`);
    
    // Buscar todas las imágenes en el directorio de assets
    const imagePatterns = [
      path.join(rootDir, 'assets/images/**/*.jpg'),
      path.join(rootDir, 'assets/images/**/*.jpeg'),
      path.join(rootDir, 'assets/images/**/*.png'),
      path.join(rootDir, 'assets/images/**/*.gif')
    ];
    
    console.log("Buscando imágenes con estos patrones:");
    imagePatterns.forEach(pattern => console.log(` - ${pattern}`));
    
    let allImages = [];
    for (const pattern of imagePatterns) {
      console.log(`Buscando con patrón: ${pattern}`);
      try {
        const images = await globPromise(pattern);
        console.log(`  Encontradas ${images.length} imágenes`);
        allImages = [...allImages, ...images];
      } catch (err) {
        console.error(`Error al buscar con el patrón ${pattern}:`, err);
      }
    }
  
    console.log(`Total: Encontradas ${allImages.length} imágenes para procesar`);
    
    if (allImages.length === 0) {
      console.log("No se encontraron imágenes para procesar. Verificando estructura de directorios...");
      
      // Verificar y mostrar estructura de directorios para diagnóstico
      function listDirectoryContents(directory, level = 0) {
        const indent = '  '.repeat(level);
        console.log(`${indent}${path.basename(directory)}/`);
        
        try {
          const items = fs.readdirSync(directory, { withFileTypes: true });
          
          for (const item of items) {
            if (item.isDirectory()) {
              listDirectoryContents(path.join(directory, item.name), level + 1);
            } else {
              console.log(`${indent}  ${item.name}`);
            }
          }
        } catch (err) {
          console.error(`${indent}Error al leer directorio ${directory}: ${err.message}`);
        }
      }
      
      console.log("Estructura de directorios:");
      listDirectoryContents(path.join(rootDir, 'assets'));
      return;
    }
    
    // Procesar cada imagen y recopilar resultados
    const results = {
      successful: 0,
      failed: 0,
      details: []
    };
    
    // Procesar en lotes para no sobrecargar el sistema
    const batchSize = 5; // Ajustar según el rendimiento del sistema
    const totalBatches = Math.ceil(allImages.length/batchSize);
    
    console.log("\n📊 PROGRESO DE OPTIMIZACIÓN");
    console.log("---------------------------");
    
    for (let i = 0; i < allImages.length; i += batchSize) {
      const batch = allImages.slice(i, i + batchSize);
      const currentBatch = Math.floor(i/batchSize) + 1;
      const percentComplete = Math.round((currentBatch / totalBatches) * 100);
      
      console.log(`\n🔄 Lote ${currentBatch}/${totalBatches} (${percentComplete}% completado)`);
      
      const batchPromises = batch.map(img => processImage(img));
      const batchResults = await Promise.all(batchPromises);
      
      let batchSuccesses = 0;
      let batchFailures = 0;
      
      for (const result of batchResults) {
        if (result.success) {
          results.successful++;
          batchSuccesses++;
        } else {
          results.failed++;
          batchFailures++;
        }
        results.details.push(result);
      }
      
      console.log(`   ✓ Éxitos en este lote: ${batchSuccesses}`);
      console.log(`   ✗ Fallos en este lote: ${batchFailures}`);
    }
    
    // Generar informe de resultados
    const reportPath = path.join(rootDir, 'image-optimization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    
    console.log("\n=== RESUMEN DE OPTIMIZACIÓN DE IMÁGENES ===");
    console.log(`Total de imágenes procesadas: ${allImages.length}`);
    console.log(`✓ Exitosas: ${results.successful}`);
    console.log(`✗ Fallidas: ${results.failed}`);
    console.log(`Informe detallado guardado en: ${reportPath}`);
    console.log("==========================================\n");
  } catch (error) {
    console.error("Error general en el proceso de optimización:", error);
  }
}

// Ejecutar el script
// Agregar un manejador para mostrar mensajes de finalización
async function runOptimization() {
  try {
    console.log("🚀 INICIANDO PROCESO DE OPTIMIZACIÓN DE IMÁGENES");
    console.log("=============================================");
    
    await processAllImages();
    
    console.log("\n✨ PROCESO COMPLETADO CON ÉXITO");
    console.log("Las imágenes optimizadas se han guardado en: src/assets/images/optimized/");
    console.log("Estas imágenes se incluirán en tu repositorio y serán utilizadas por el sitio web.");
    console.log("=============================================");
  } catch (err) {
    console.error("\n❌ ERROR EN EL PROCESO DE OPTIMIZACIÓN:", err);
    process.exit(1);
  }
}

runOptimization();
