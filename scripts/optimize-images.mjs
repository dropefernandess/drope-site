/**
 * Otimiza as 4 fotos principais do site mantendo extensão.
 * Roda uma vez quando houver foto nova: node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const TARGETS = [
  { src: "public/sobre.png",          maxW: 1400, quality: 78 },
  { src: "public/sobre-fullbody.png", maxW: 1400, quality: 78 },
  { src: "public/sobre-trabalho.png", maxW: 1400, quality: 78 },
  { src: "public/hero-portrait.jpg",  maxW: 1400, quality: 75 },
];

for (const t of TARGETS) {
  const before = (await fs.stat(t.src)).size;
  const ext = path.extname(t.src).toLowerCase();
  const pipeline = sharp(t.src).resize({ width: t.maxW, withoutEnlargement: true });
  const buf = await (ext === ".png"
    ? pipeline.png({ quality: t.quality, compressionLevel: 9, effort: 10 })
    : pipeline.jpeg({ quality: t.quality, mozjpeg: true, progressive: true })
  ).toBuffer();
  await fs.writeFile(t.src, buf);
  const after = (await fs.stat(t.src)).size;
  console.log(`${t.src}: ${(before/1024/1024).toFixed(2)}MB → ${(after/1024).toFixed(0)}KB  (-${Math.round((1-after/before)*100)}%)`);
}
