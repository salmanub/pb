import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import Image from "@11ty/eleventy-img";
import { glob } from 'glob';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

// Configuración de dimensiones y formatos (coincidentes con el shortcode de imagen en eleventy.config.js)
const widths = [320, 480, 640, 768, 1024, 1280, 1536, 1920, 2048];
const formats = ["avif", "webp", "jpg"];
const outputDir = "./dist/assets/images/optimized/";
const urlPath = "/assets/images/optimized/";

// Función para procesar una imagen
async function processImage(imagePath) {
  console.log(`Procesando: ${imagePath}`);
  
  try {
    // Generar versiones optimizadas
    let metadata = await Image(imagePath, {
      widths: widths,
      formats: formats,
      outputDir: path.join(rootDir, outputDir.substring(2)), // Convertir a ruta absoluta
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

// Verifica y lista los contenidos de un directorio
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

// Función principal para procesar todas las imágenes
async function processAllImages() {
  try {
    console.log("Iniciando optimización de imágenes...");
    
    // Mostrar la ruta raíz para diagnóstico
    console.log(`Directorio raíz: ${rootDir}`);
    console.log(`Directorio actual: ${process.cwd()}`);
    
    // Listar todos los directorios en la raíz para diagnosticar
    console.log("Contenido del directorio raíz:");
    try {
      const rootContents = fs.readdirSync(rootDir);
      rootContents.forEach(item => console.log(` - ${item}`));
    } catch (err) {
      console.error(`Error al leer directorio raíz: ${err}`);
    }
    
    // Asegurarse de que el directorio de salida existe
    const fullOutputDir = path.join(rootDir, outputDir.substring(2));
    console.log(`Directorio de salida: ${fullOutputDir}`);
    
    if (!fs.existsSync(fullOutputDir)) {
      fs.mkdirSync(fullOutputDir, { recursive: true });
      console.log(`Creado directorio de salida: ${fullOutputDir}`);
    }
    
    // Buscar imágenes manualmente sin usar glob primero
    let allImages = [];
    const searchDirectories = [
      path.join(rootDir, 'assets', 'images'),
      path.join(rootDir, 'src', 'assets', 'images')  // Intentamos una ruta alternativa
    ];
    
    // Intentamos encontrar el directorio de imágenes
    let imagesDirectory = null;
    for (const dir of searchDirectories) {
      if (fs.existsSync(dir)) {
        console.log(`Directorio de imágenes encontrado: ${dir}`);
        imagesDirectory = dir;
        break;
      }
    }
    
    if (!imagesDirectory) {
      console.error('No se pudo encontrar el directorio de imágenes. Verificando estructura:');
      listDirectoryContents(rootDir);
      return;
    }
    
    // Buscar todas las imágenes en el directorio de assets
    console.log(`Buscando imágenes en: ${imagesDirectory}`);
    
    // Usar glob de manera síncrona para simplificar
    try {
      const jpgImages = glob.sync(`${imagesDirectory}/**/*.{jpg,jpeg}`, { windowsPathsNoEscape: true });
      const pngImages = glob.sync(`${imagesDirectory}/**/*.png`, { windowsPathsNoEscape: true });
      const gifImages = glob.sync(`${imagesDirectory}/**/*.gif`, { windowsPathsNoEscape: true });
      
      allImages = [...jpgImages, ...pngImages, ...gifImages];
      
      console.log(`Encontradas ${jpgImages.length} imágenes JPG`);
      console.log(`Encontradas ${pngImages.length} imágenes PNG`);
      console.log(`Encontradas ${gifImages.length} imágenes GIF`);
    } catch (err) {
      console.error(`Error al buscar imágenes: ${err}`);
    }
    
    console.log(`Total: Encontradas ${allImages.length} imágenes para procesar`);
    
    if (allImages.length === 0) {
      console.error("No se encontraron imágenes para procesar");
      console.log("Explorando manualmente la estructura de directorios:");
      listDirectoryContents(imagesDirectory);
      return;
    }
    
    // Procesamos las primeras 5 imágenes como muestra
    const imagesToProcess = allImages.slice(0, 5);
    console.log(`Procesando ${imagesToProcess.length} imágenes de muestra:`);
    
    // Procesar cada imagen y recopilar resultados
    const results = {
      successful: 0,
      failed: 0,
      details: []
    };
    
    // Procesamos una por una para mayor claridad en caso de error
    for (const imagePath of imagesToProcess) {
      console.log(`\nProcesando imagen: ${imagePath}`);
      try {
        const result = await processImage(imagePath);
        
        if (result.success) {
          results.successful++;
        } else {
          results.failed++;
        }
        results.details.push(result);
      } catch (error) {
        console.error(`Error general al procesar imagen ${imagePath}:`, error);
        results.failed++;
        results.details.push({
          success: false,
          imagePath,
          error: error.toString()
        });
      }
    }
    
    // Generar informe de resultados
    const reportPath = path.join(rootDir, 'image-optimization-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));
    
    console.log("\n=== RESUMEN DE OPTIMIZACIÓN DE IMÁGENES ===");
    console.log(`Total de imágenes procesadas: ${imagesToProcess.length}`);
    console.log(`✓ Exitosas: ${results.successful}`);
    console.log(`✗ Fallidas: ${results.failed}`);
    console.log(`Informe detallado guardado en: ${reportPath}`);
    console.log("==========================================\n");
    
    if (results.successful > 0) {
      console.log("El script funciona correctamente. Para procesar todas las imágenes, elimina el límite de 5 imágenes en el código.");
    }
  } catch (error) {
    console.error("Error general en el proceso de optimización:", error);
  }
}

// Ejecutar el script
processAllImages().catch(err => {
  console.error("Error crítico en el proceso de optimización:", err);
  process.exit(1);
});
