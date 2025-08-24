import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { glob } from 'glob';

// Configuración para alinearse con el shortcode de imagen en eleventy.config.js
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..', '..', '..');

// Configuración alineada con el shortcode en eleventy.config.js
const QUALITY = {
    avif: 75, // Mayor calidad para AVIF ya que comprime mejor
    webp: 80,
    jpeg: 80,
    jpg: 80,
    png: 80
};

// Mismos valores que en eleventy.config.js
const WIDTHS = [320, 640, 960, 1280, 1920];
const FORMATS = ['avif', 'webp', 'jpeg']; // AVIF primero para prioridad

// Directorios alineados con eleventy.config.js
const INPUT_DIR = path.join(rootDir, 'src', 'assets', 'images');
const OUTPUT_DIR = path.join(rootDir, 'dist', 'assets', 'images', 'optimized');
const URL_PATH = '/assets/images/optimized/';

// Crear directorio de salida si no existe
if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    console.log(`Creado directorio de salida: ${OUTPUT_DIR}`);
}

/**
 * Verifica qué tamaños de imagen ya existen para evitar reprocesar
 */
async function checkExistingSizes(outputDir, name, format) {
    const existingSizes = [];
    for (const width of WIDTHS) {
        const filePath = path.join(outputDir, `${name}-${width}w.${format}`);
        try {
            await fs.promises.access(filePath);
            existingSizes.push(width);
        } catch {
            // El archivo no existe
        }
    }
    return existingSizes;
}

/**
 * Determina qué tamaños faltan generar para una imagen
 */
async function getMissingSizes(inputPath, info) {
    const name = path.basename(inputPath, path.extname(inputPath));
    const missingSizes = new Set();

    // Obtener tamaños requeridos basados en las dimensiones de la imagen
    const requiredWidths = WIDTHS.filter(width => width <= info.width);

    // Verificar tamaños faltantes para cada formato
    for (const format of FORMATS) {
        const existingSizes = await checkExistingSizes(OUTPUT_DIR, name, format);
        const formatMissing = requiredWidths.filter(width => !existingSizes.includes(width));
        
        if (formatMissing.length > 0) {
            console.log(`Falta generar tamaños ${format} para ${name}: ${formatMissing.join(', ')}px`);
            formatMissing.forEach(width => missingSizes.add(width));
        } else {
            console.log(`Todos los tamaños ${format} existen para ${name}`);
        }
    }

    return Array.from(missingSizes).sort((a, b) => a - b);
}

/**
 * Procesa una imagen para generar todas las versiones responsivas
 * Sigue exactamente la misma configuración que el shortcode de imagen
 */
async function optimizeImage(inputPath) {
    try {
        const image = sharp(inputPath);
        const ext = path.extname(inputPath).toLowerCase();
        
        if (!['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
            console.log(`Omitiendo formato no soportado: ${inputPath}`);
            return;
        }

        const info = await image.metadata();
        const name = path.basename(inputPath, ext);

        // Obtener tamaños faltantes
        const missingSizes = await getMissingSizes(inputPath, info);
        
        if (missingSizes.length === 0) {
            console.log(`Todos los formatos y tamaños existen para: ${inputPath}`);
            return;
        }

        // Generar diferentes tamaños para cada formato
        for (const format of FORMATS) {
            for (const width of missingSizes) {
                // Omitir si el ancho objetivo es mayor que el original
                if (info.width && width > info.width) {
                    console.log(`Omitiendo ${width}px para ${format} (mayor que el original ${info.width}px)`);
                    continue;
                }

                // Formato de nombre coincidente con el shortcode
                const outputPath = path.join(OUTPUT_DIR, `${name}-${width}w.${format}`);
                
                // Crear una nueva instancia de sharp para cada redimensionamiento
                const resizedImage = sharp(inputPath)
                    .resize(width, null, {
                        withoutEnlargement: true,
                        fit: 'cover'
                    });

                if (format === 'avif') {
                    await resizedImage
                        .avif({
                            quality: QUALITY.avif,
                            effort: 9, // Máximo esfuerzo de compresión
                            chromaSubsampling: '4:4:4' // Mejor calidad
                        })
                        .toFile(outputPath);
                    console.log(`Generado AVIF ${width}px: ${outputPath}`);
                } else if (format === 'webp') {
                    await resizedImage
                        .webp({
                            quality: QUALITY.webp,
                            effort: 6
                        })
                        .toFile(outputPath);
                    console.log(`Generado WebP ${width}px: ${outputPath}`);
                } else {
                    await resizedImage
                        .jpeg({
                            quality: QUALITY[format] || QUALITY.jpeg,
                            mozjpeg: true
                        })
                        .toFile(outputPath);
                    console.log(`Generado ${format.toUpperCase()} ${width}px: ${outputPath}`);
                }
            }
        }
    } catch (error) {
        console.error(`Error procesando ${inputPath}:`, error);
    }
}

/**
 * Procesa recursivamente un directorio para optimizar todas las imágenes
 */
async function processDirectory(directory) {
    try {
        const files = await readdir(directory);
        
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = await fs.promises.stat(filePath);
            
            if (stat.isDirectory()) {
                // Omitir node_modules y directorios ocultos
                if (file !== 'node_modules' && !file.startsWith('.')) {
                    await processDirectory(filePath);
                }
            } else {
                const ext = path.extname(file).toLowerCase();
                // Solo procesar imágenes originales (no las ya procesadas)
                if (['.jpg', '.jpeg', '.png', '.webp'].includes(ext) && !file.match(/-\d+w\./)) {
                    console.log(`\nProcesando: ${filePath}`);
                    await optimizeImage(filePath);
                }
            }
        }
    } catch (error) {
        console.error('Error procesando directorio:', error);
    }
}

/**
 * Muestra información sobre la configuración
 */
function showConfiguration() {
    console.log('\n=== CONFIGURACIÓN DEL OPTIMIZADOR DE IMÁGENES ===');
    console.log(`Directorio de entrada: ${INPUT_DIR}`);
    console.log(`Directorio de salida: ${OUTPUT_DIR}`);
    console.log(`Tamaños a generar: ${WIDTHS.join(', ')}px`);
    console.log(`Formatos a generar: ${FORMATS.join(', ')}`);
    console.log('=============================================\n');
}

// Iniciar proceso de optimización
console.log('Iniciando optimización de imágenes...');
showConfiguration();
processDirectory(INPUT_DIR)
    .then(() => console.log('¡Optimización de imágenes completada!'))
    .catch(error => console.error('Falló la optimización:', error));
