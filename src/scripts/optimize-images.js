import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Image from "@11ty/eleventy-img";
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Configuración de dimensiones y formatos (coincidentes con el shortcode de imagen en eleventy.config.js)
const widths = [320, 480, 640, 768, 1024, 1280, 1536, 1920, 2048];
const formats = ["avif", "webp", "jpg"]; // Para imágenes con transparencia PNG se añadirá dinámicamente
const outputDir = "../dist/assets/images/optimized/"; // Modified to output to dist for production
const urlPath = "/assets/images/optimized/";

// Opciones de calidad para cada formato
const formatOptions = {
  avif: {
    quality: 65,
    effort: 8
  },
  webp: {
    quality: 80,
    effort: 6,
    lossless: false // Se puede cambiar a true para PNG con transparencia si es necesario
  },
  jpg: {
    quality: 85,
    progressive: true
  },
  png: {
    quality: 90,
    compressionLevel: 9,
    palette: true, // Optimizar usando paleta cuando sea posible
    effort: 10 // Máximo esfuerzo de compresión (más lento pero mejor resultado)
  }
};

// Función para procesar una imagen
async function processImage(imagePath) {
  console.log(`⏳ Procesando: ${imagePath}`);

  try {
    // Verificar que el archivo existe
    if (!fs.existsSync(imagePath)) {
      throw new Error(`El archivo no existe: ${imagePath}`);
    }

    // Verificar tamaño del archivo
    const stats = fs.statSync(imagePath);
    const fileSizeMB = stats.size / (1024 * 1024);
    if (fileSizeMB > 20) {
      console.warn(`⚠️ Advertencia: Imagen grande (${fileSizeMB.toFixed(2)}MB): ${path.basename(imagePath)}`);
    }

    // Determinar la ruta relativa para mantener la estructura de directorios
    const relativePath = path.relative(path.join(rootDir, 'assets/images'), imagePath);
    const dirName = path.dirname(relativePath);
    const baseName = path.basename(relativePath, path.extname(relativePath));

    // Asegurarse de que existe el directorio de destino
    const targetDir = path.join(rootDir, outputDir, dirName);
    await fs.promises.mkdir(targetDir, { recursive: true });

    // Generar versiones optimizadas - con manejo específico según el formato
    const imageExt = path.extname(imagePath).toLowerCase();

    // Configurar opciones específicas para cada tipo de imagen
    // Usar siempre los mismos formatos de salida (AVIF, WebP, JPG)
    // independientemente del formato de entrada
    let options = {
      widths: widths,
      formats: formats,
      outputDir: path.join(rootDir, outputDir, dirName), // Mantener estructura de directorios
      urlPath: path.join(urlPath, dirName).replace(/\\/g, '/'), // Asegurar formato URL correcto
      filenameFormat: function (id, src, width, format) {
        return `${baseName}-${width}w.${format}`;
      },
      sharpAvifOptions: formatOptions.avif,
      sharpWebpOptions: formatOptions.webp,
      sharpJpegOptions: formatOptions.jpg,
      sharpPngOptions: formatOptions.png
    };

    // Mensajes informativos según el tipo de imagen
    if (imageExt === '.png') {
      console.log(`   ℹ️ PNG detectado - se convertirá a AVIF/WebP/JPG`);
    } else if (imageExt === '.gif') {
      options.widths = [null]; // Solo tamaño original para GIF
      console.log(`   ℹ️ GIF detectado - se mantendrá tamaño original`);
    }

    // Generar versiones optimizadas
    let metadata = await Image(imagePath, options);

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
      console.error(`❌ Error: El directorio ${imagesDir} no existe`);

      // Intenta verificar rutas alternativas comunes
      const alternativePaths = [
        path.join(rootDir, '../assets/images'),
        path.join(rootDir, '../../assets/images'),
        path.join(rootDir, 'src/assets/images'),
        path.join(process.cwd(), 'assets/images'),
        path.join(process.cwd(), 'src/assets/images')
      ];

      console.log("\n🔍 Buscando directorios de imágenes alternativos...");

      for (const altPath of alternativePaths) {
        if (fs.existsSync(altPath)) {
          console.log(`✅ Encontrado directorio alternativo: ${altPath}`);
          console.log(`💡 Sugerencia: Modifica la ruta en el script o mueve las imágenes a ${imagesDir}`);
        }
      }

      console.log("\n📁 Estructura de directorios disponible:");
      try {
        const items = fs.readdirSync(rootDir);
        items.forEach(item => {
          const itemPath = path.join(rootDir, item);
          const isDir = fs.statSync(itemPath).isDirectory();
          console.log(`   ${isDir ? '📂' : '📄'} ${item}`);
        });
      } catch (err) {
        console.error(`   Error al listar directorios: ${err.message}`);
      }

      return;
    }

    console.log(`✅ Directorio de imágenes encontrado: ${imagesDir}`);

    // Buscar todas las imágenes en el directorio de assets
    console.log("\n🔍 BUSCANDO IMÁGENES");
    console.log("---------------------------");

    // Usar la búsqueda síncrona directa para mayor fiabilidad
    let jpgImages = [];
    let pngImages = [];
    let gifImages = [];

    try {
      // Buscar imágenes JPG/JPEG
      const jpgPattern = 'assets/images/**/*.{jpg,jpeg,JPG,JPEG}';
      console.log(`Buscando JPG/JPEG: ${jpgPattern}`);
      jpgImages = await glob(jpgPattern, { cwd: rootDir, windowsPathsNoEscape: true });
      console.log(`✓ Encontradas ${jpgImages.length} imágenes JPG/JPEG`);

      // Buscar imágenes PNG (incluyendo mayúsculas)
      const pngPattern = 'assets/images/**/*.{png,PNG}';
      console.log(`Buscando PNG: ${pngPattern}`);
      pngImages = await glob(pngPattern, { cwd: rootDir, windowsPathsNoEscape: true });
      console.log(`✓ Encontradas ${pngImages.length} imágenes PNG`);

      // Buscar imágenes GIF
      const gifPattern = 'assets/images/**/*.{gif,GIF}';
      console.log(`Buscando GIF: ${gifPattern}`);
      gifImages = await glob(gifPattern, { cwd: rootDir, windowsPathsNoEscape: true });
      console.log(`✓ Encontradas ${gifImages.length} imágenes GIF`);

      // Convertir rutas relativas a absolutas
      jpgImages = jpgImages.map(img => path.join(rootDir, img));
      pngImages = pngImages.map(img => path.join(rootDir, img));
      gifImages = gifImages.map(img => path.join(rootDir, img));
    } catch (err) {
      console.error(`Error durante la búsqueda de archivos:`, err);
    }

    // Combinar todos los resultados
    let allImages = [...jpgImages, ...pngImages, ...gifImages];

    // Mostrar desglose por tipo
    if (allImages.length > 0) {
      console.log("\n📊 DESGLOSE POR TIPO:");
      console.log(`   📸 JPG/JPEG: ${jpgImages.length}`);
      console.log(`   🖼️  PNG: ${pngImages.length}`);
      console.log(`   🎞️  GIF: ${gifImages.length}`);
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
    const totalBatches = Math.ceil(allImages.length / batchSize);
    const startTime = Date.now();

    console.log("\n📊 PROGRESO DE OPTIMIZACIÓN");
    console.log("---------------------------");

    for (let i = 0; i < allImages.length; i += batchSize) {
      const batch = allImages.slice(i, i + batchSize);
      const currentBatch = Math.floor(i / batchSize) + 1;
      const percentComplete = Math.round((currentBatch / totalBatches) * 100);

      // Tiempo transcurrido y estimación
      const elapsedSeconds = (Date.now() - startTime) / 1000;
      const imagesProcessed = i;
      const avgTimePerImage = imagesProcessed > 0 ? elapsedSeconds / imagesProcessed : 0;
      const remainingImages = allImages.length - i;
      const estimatedRemainingSeconds = avgTimePerImage * remainingImages;

      // Formatear tiempo estimado
      const formatTime = (seconds) => {
        if (seconds < 60) return `${Math.round(seconds)}s`;
        if (seconds < 3600) return `${Math.floor(seconds / 60)}m ${Math.round(seconds % 60)}s`;
        return `${Math.floor(seconds / 3600)}h ${Math.floor((seconds % 3600) / 60)}m`;
      };

      console.log(`\n🔄 LOTE ${currentBatch}/${totalBatches} (${percentComplete}% completado)`);
      if (currentBatch > 1) {
        console.log(`   ⏱️ Tiempo restante estimado: ~${formatTime(estimatedRemainingSeconds)}`);
      }

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

      console.log(`   ✅ Éxitos en este lote: ${batchSuccesses}`);
      console.log(`   ❌ Fallos en este lote: ${batchFailures}`);
      console.log(`   📈 Progreso total: ${percentComplete}% (${i + batch.length}/${allImages.length})`);
    }

    // Generar informe de resultados
    const reportPath = path.join(rootDir, 'image-optimization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

    // Calcular estadísticas finales
    const totalTimeSeconds = (Date.now() - startTime) / 1000;
    const formatDuration = (seconds) => {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = Math.round(seconds % 60);

      if (hours > 0) return `${hours}h ${minutes}m ${secs}s`;
      if (minutes > 0) return `${minutes}m ${secs}s`;
      return `${secs} segundos`;
    };

    console.log("\n✨ RESUMEN DE OPTIMIZACIÓN DE IMÁGENES ✨");
    console.log("=========================================");
    console.log(`📊 Total de imágenes procesadas: ${allImages.length}`);
    console.log(`✅ Exitosas: ${results.successful}`);
    console.log(`❌ Fallidas: ${results.failed}`);
    console.log(`⏱️ Tiempo total de procesamiento: ${formatDuration(totalTimeSeconds)}`);

    if (results.successful > 0) {
      const avgTimePerImage = totalTimeSeconds / results.successful;
      console.log(`⚡ Promedio por imagen: ${avgTimePerImage.toFixed(2)} segundos`);
    }

    console.log(`📝 Informe detallado guardado en: ${reportPath}`);
    console.log("=========================================");
  } catch (error) {
    console.error("Error general en el proceso de optimización:", error);
  }
}

// Ejecutar el script
// Agregar un manejador para mostrar mensajes de finalización
async function runOptimization() {
  try {
    console.clear(); // Limpiar la terminal para mejor visibilidad

    console.log("\n");
    console.log("🚀 INICIANDO PROCESO DE OPTIMIZACIÓN DE IMÁGENES");
    console.log("==============================================");
    console.log("Este proceso convertirá todas las imágenes en los");
    console.log("formatos necesarios para el sitio web (AVIF, WebP, JPEG)");
    console.log("y en múltiples dimensiones para carga responsiva.");
    console.log("==============================================\n");

    const startTime = Date.now();
    await processAllImages();
    const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);

    console.log("\n✨✨✨ PROCESO COMPLETADO CON ÉXITO ✨✨✨");
    console.log("==============================================");
    console.log("✅ Las imágenes optimizadas se han guardado en:");
    console.log(`   ${path.join(rootDir, outputDir)}`);
    console.log("📸 Estas imágenes se incluirán en tu repositorio");
    console.log("   y serán utilizadas automáticamente por el sitio web.");
    console.log(`⏱️ Tiempo total de ejecución: ${totalTime} segundos`);
    console.log("\n📝 Para ver el sitio con las imágenes optimizadas:");
    console.log("   ejecuta el comando 'npm run build' seguido de 'npm run start'");
    console.log("==============================================");
  } catch (err) {
    console.error("\n❌ ERROR EN EL PROCESO DE OPTIMIZACIÓN");
    console.error("======================================");
    console.error(err);
    console.error("======================================");
    console.error("Revisa los mensajes anteriores para más detalles.");
    process.exit(1);
  }
}

runOptimization();
