/**
 * optimize-images.mjs — Optimiza imágenes para la web
 * Genera webp y avif al lado de los originales (NO sobreescribe originales)
 * Los originales se pueden eliminar manualmente después si se desea
 * 
 * Uso: node optimize-images.mjs
 */
import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, basename } from 'path';
import { existsSync } from 'fs';

const SRC_DIR = 'src/assets/images';
const MAX_WIDTH = 1280;
const WEBP_QUALITY = 80;
const AVIF_QUALITY = 55;

const SUPPORTED_EXTS = ['.jpg', '.jpeg', '.png'];

async function getImageFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      const subFiles = await getImageFiles(fullPath);
      files.push(...subFiles);
    } else if (entry.isFile()) {
      const ext = extname(entry.name).toLowerCase();
      if (!SUPPORTED_EXTS.includes(ext)) continue;
      
      const base = basename(entry.name, ext);
      if (base.match(/-\d{3,4}$/)) continue;
      if (base.includes(' copy')) continue;
      
      const info = await stat(fullPath);
      files.push({ path: fullPath, name: entry.name, base, ext, size: info.size, dir });
    }
  }
  return files;
}

async function optimizeImage(file) {
  const { path: filePath, base, ext, size, dir } = file;
  const sizeKB = Math.round(size / 1024);
  
  console.log(`\n📸 ${base}${ext} (${sizeKB}KB)`);
  
  try {
    const metadata = await sharp(filePath).metadata();
    const needsResize = metadata.width > MAX_WIDTH;
    const resizeOpts = needsResize ? { width: MAX_WIDTH, withoutEnlargement: true } : {};
    
    if (needsResize) {
      console.log(`   ↘ Source: ${metadata.width}x${metadata.height} → target ${MAX_WIDTH}px`);
    }
    
    let generated = 0;
    
    // 1. Generate WebP
    const webpPath = join(dir, `${base}.webp`);
    if (!existsSync(webpPath)) {
      await sharp(filePath).resize(resizeOpts).webp({ quality: WEBP_QUALITY }).toFile(webpPath);
      const ws = await stat(webpPath);
      console.log(`   ✅ WebP: ${Math.round(ws.size / 1024)}KB`);
      generated++;
    } else {
      console.log(`   ⏭  WebP: exists`);
    }
    
    // 2. Generate AVIF
    const avifPath = join(dir, `${base}.avif`);
    if (!existsSync(avifPath)) {
      await sharp(filePath).resize(resizeOpts).avif({ quality: AVIF_QUALITY }).toFile(avifPath);
      const as2 = await stat(avifPath);
      console.log(`   ✅ AVIF: ${Math.round(as2.size / 1024)}KB`);
      generated++;
    } else {
      console.log(`   ⏭  AVIF: exists`);
    }
    
    return generated;
  } catch (err) {
    console.error(`   ❌ Error: ${err.message}`);
    return -1;
  }
}

async function main() {
  console.log('🖼️  Image Optimizer — perito.barcelona');
  console.log(`   Max width: ${MAX_WIDTH}px | WebP: ${WEBP_QUALITY} | AVIF: ${AVIF_QUALITY}\n`);
  
  const allFiles = await getImageFiles(SRC_DIR);
  
  console.log(`Found ${allFiles.length} source images\n`);
  
  let ok = 0, fail = 0, totalGen = 0;
  for (const file of allFiles) {
    const r = await optimizeImage(file);
    if (r >= 0) { ok++; totalGen += r; } else { fail++; }
  }
  
  console.log(`\n✅ Done! ${ok} processed, ${totalGen} files generated, ${fail} failed.`);
}

main().catch(console.error);
