import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const imagesDir = path.resolve(__dirname, '../public/images');

function getFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getFiles(fullPath));
    } else if (/\.(jpe?g|png)$/i.test(file)) {
      results.push(fullPath);
    }
  });
  return results;
}

async function optimizeAll() {
  const files = getFiles(imagesDir);
  console.log(`Found ${files.length} images to optimize...`);
  let savedBytes = 0;

  for (const file of files) {
    const statBefore = fs.statSync(file);
    const isPng = /\.png$/i.test(file);
    
    try {
      const inputBuffer = fs.readFileSync(file);
      let pipeline = sharp(inputBuffer);
      const metadata = await pipeline.metadata();

      // Resize excessively huge images if dimensions > 1600px width
      if (metadata.width && metadata.width > 1600) {
        pipeline = pipeline.resize({ width: 1600, withoutEnlargement: true });
      }

      let buffer;
      if (isPng) {
        buffer = await pipeline
          .png({ quality: 82, compressionLevel: 9 })
          .toBuffer();
      } else {
        buffer = await pipeline
          .jpeg({ quality: 82, progressive: true, mozjpeg: true })
          .toBuffer();
      }

      if (buffer.length < statBefore.size) {
        fs.writeFileSync(file, buffer);
        savedBytes += (statBefore.size - buffer.length);
        console.log(`Optimized ${path.basename(file)}: ${(statBefore.size/1024).toFixed(1)}KB -> ${(buffer.length/1024).toFixed(1)}KB`);
      }
    } catch (e) {
      console.error(`Failed to optimize ${file}:`, e.message);
    }
  }

  console.log(`Total saved: ${(savedBytes / 1024 / 1024).toFixed(2)} MB!`);
}

optimizeAll();
