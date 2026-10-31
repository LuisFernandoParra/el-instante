// Genera variantes AVIF/WebP de public/images/*.jpg y un manifiesto para el componente de imagen.
import { mkdir, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = join(root, 'public', 'images');
const outputDir = join(sourceDir, 'opt');
const manifestPath = join(root, 'src', 'data', 'generated', 'imageManifest.json');

const WIDTHS = [480, 768, 1200, 1600];
const FORMATS = {
  avif: (image) => image.avif({ quality: 50, effort: 4 }),
  webp: (image) => image.webp({ quality: 72 }),
};

async function isFresh(outputPath, sourceTime) {
  try {
    return (await stat(outputPath)).mtimeMs >= sourceTime;
  } catch {
    return false;
  }
}

async function processImage(file) {
  const sourcePath = join(sourceDir, file);
  const sourceTime = (await stat(sourcePath)).mtimeMs;
  const { width } = await sharp(sourcePath).metadata();
  const widths = WIDTHS.filter((candidate) => candidate <= width);

  for (const candidate of widths) {
    for (const [extension, encode] of Object.entries(FORMATS)) {
      const outputPath = join(outputDir, `${parse(file).name}-${candidate}.${extension}`);
      if (await isFresh(outputPath, sourceTime)) continue;
      await encode(sharp(sourcePath).resize({ width: candidate })).toFile(outputPath);
    }
  }

  return [file, widths];
}

await mkdir(outputDir, { recursive: true });
await mkdir(dirname(manifestPath), { recursive: true });

const entries = await readdir(sourceDir, { withFileTypes: true });
const sources = entries
  .filter((entry) => entry.isFile() && /\.jpe?g$/i.test(entry.name))
  .map((entry) => entry.name);

const manifest = Object.fromEntries(await Promise.all(sources.map(processImage)));
await writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);

console.log(`Imágenes optimizadas: ${sources.length}`);
