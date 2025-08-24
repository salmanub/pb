import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import fs from 'fs/promises';

const QUALITY = {
    avif: 75, // Higher quality for AVIF since it compresses better
    webp: 80,
    jpeg: 80,
    jpg: 80,
    png: 80
};
const INPUT_DIR = './static/images';
const FORMATS = ['avif', 'webp']; // AVIF first for priority
const SIZES = [320, 480, 640, 768, 1024, 1280, 1536, 1920, 2048];
const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1536
};

async function checkExistingSizes(dir, name, format) {
    const existingSizes = [];
    for (const size of SIZES) {
        const path = join(dir, `${name}-${size}.${format}`);
        try {
            await fs.access(path);
            existingSizes.push(size);
        } catch {
            // File doesn't exist
        }
    }
    return existingSizes;
}

async function getMissingSizes(inputPath, info) {
    const dir = dirname(inputPath);
    const name = basename(inputPath, extname(inputPath));
    const missingSizes = new Set();

    // Get required sizes based on image dimensions
    const requiredSizes = SIZES.filter(size => size <= info.width);

    // Check missing sizes for each format
    for (const format of [...FORMATS, extname(inputPath).slice(1)]) {
        const existingSizes = await checkExistingSizes(dir, name, format);
        const formatMissing = requiredSizes.filter(size => !existingSizes.includes(size));
        
        if (formatMissing.length > 0) {
            console.log(`Missing ${format} sizes for ${name}: ${formatMissing.join(', ')}px`);
            formatMissing.forEach(size => missingSizes.add(size));
        } else {
            console.log(`All ${format} sizes exist for ${name}`);
        }
    }

    return Array.from(missingSizes).sort((a, b) => a - b);
}

async function optimizeImage(inputPath) {
    try {
        const image = sharp(inputPath);
        const ext = extname(inputPath).toLowerCase();
        
        if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
            console.log(`Skipping unsupported format: ${inputPath}`);
            return;
        }

        const info = await image.metadata();
        const dir = dirname(inputPath);
        const name = basename(inputPath, ext);

        // Get missing sizes
        const missingSizes = await getMissingSizes(inputPath, info);
        
        if (missingSizes.length === 0) {
            console.log(`All formats and sizes exist for: ${inputPath}`);
            return;
        }

        // Generate different sizes for each format including original
        for (const format of [...FORMATS, ext.slice(1)]) {
            for (const width of missingSizes) {
                // Skip if target width is larger than original
                if (info.width && width > info.width) {
                    console.log(`Skipping ${width}px for ${format} (larger than original ${info.width}px)`);
                    continue;
                }

                const outputPath = join(dir, `${name}-${width}.${format}`);
                
                // Create a new sharp instance for each resize to avoid pipeline issues
                const resizedImage = sharp(inputPath)
                    .resize(width, null, {
                        withoutEnlargement: true,
                        fit: 'cover'
                    });

                if (format === 'avif') {
                    await resizedImage
                        .avif({
                            quality: QUALITY.avif,
                            effort: 9, // Maximum compression effort
                            chromaSubsampling: '4:4:4' // Better quality
                        })
                        .toFile(outputPath);
                    console.log(`Generated AVIF ${width}px: ${outputPath}`);
                } else if (format === 'webp') {
                    await resizedImage
                        .webp({
                            quality: QUALITY.webp,
                            effort: 6
                        })
                        .toFile(outputPath);
                    console.log(`Generated WebP ${width}px: ${outputPath}`);
                } else {
                    await resizedImage
                        .jpeg({
                            quality: QUALITY[format] || QUALITY.jpeg,
                            mozjpeg: true
                        })
                        .toFile(outputPath);
                    console.log(`Generated ${format.toUpperCase()} ${width}px: ${outputPath}`);
                }
            }
        }
    } catch (error) {
        console.error(`Error processing ${inputPath}:`, error);
    }
}

async function processDirectory(directory) {
    try {
        const files = await readdir(directory);
        
        for (const file of files) {
            const filePath = join(directory, file);
            const stat = await fs.stat(filePath);
            
            if (stat.isDirectory()) {
                // Skip node_modules and hidden directories
                if (file !== 'node_modules' && !file.startsWith('.')) {
                    await processDirectory(filePath);
                }
            } else {
                const ext = extname(file).toLowerCase();
                // Only process original images (not already processed ones)
                if (['.jpg', '.jpeg', '.png'].includes(ext) && !file.match(/-\d+\./)) {
                    console.log(`\nProcessing: ${filePath}`);
                    await optimizeImage(filePath);
                }
            }
        }
    } catch (error) {
        console.error('Error processing directory:', error);
    }
}

// Start optimization process
console.log('Starting image optimization...');
processDirectory(INPUT_DIR)
    .then(() => console.log('Image optimization complete!'))
    .catch(error => console.error('Optimization failed:', error));
