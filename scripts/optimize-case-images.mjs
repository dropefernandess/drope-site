/**
 * Comprime TODAS as imagens em /public/projetos recursivamente.
 *
 * Estratégia conservadora (sem perder qualidade perceptível):
 *  - Redimensiona pra no máx 1600px de largura (suficiente: hero do case
 *    renderiza em até 1400px; cards e gallery bem menos)
 *  - PNG: quality 82 + effort 10 (palette quando possível)
 *  - JPG: quality 82 + mozjpeg + progressive
 *  - Pula arquivos que já estão pequenos (< 400 KB) pra não reprocessar
 *
 * Roda: node scripts/optimize-case-images.mjs
 */
import sharp from "sharp";
import path from "node:path";
import fs from "node:fs/promises";

const ROOT = "public/projetos";
const MAX_W = 1600;
const SKIP_UNDER = 400 * 1024; // pula < 400 KB

async function walk(dir) {
  const out = [];
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (/\.(png|jpe?g)$/i.test(entry.name)) out.push(full);
  }
  return out;
}

const files = await walk(ROOT);
let totalBefore = 0;
let totalAfter = 0;
let processed = 0;
let skipped = 0;

for (const file of files) {
  const before = (await fs.stat(file)).size;
  totalBefore += before;

  if (before < SKIP_UNDER) {
    totalAfter += before;
    skipped++;
    continue;
  }

  const ext = path.extname(file).toLowerCase();
  const isPng = ext === ".png";
  const tmp = file + ".tmp";

  try {
    const pipeline = sharp(file).resize({ width: MAX_W, withoutEnlargement: true });
    const buf = await (isPng
      ? pipeline.png({ quality: 82, compressionLevel: 9, effort: 10 })
      : pipeline.jpeg({ quality: 82, mozjpeg: true, progressive: true })
    ).toBuffer();
    await fs.writeFile(tmp, buf);
    await fs.rename(tmp, file);
    const after = (await fs.stat(file)).size;
    totalAfter += after;
    processed++;
    const mb = (before / 1024 / 1024).toFixed(1);
    const kb = (after / 1024).toFixed(0);
    console.log(`  ${file.replace(ROOT + "/", "")}: ${mb}MB → ${kb}KB (-${Math.round((1 - after / before) * 100)}%)`);
  } catch (e) {
    console.error(`  ✗ ${file}: ${e.message}`);
    totalAfter += before;
  }
}

console.log(`\n📊 ${processed} comprimidas, ${skipped} já leves.`);
console.log(`Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB (-${Math.round((1 - totalAfter / totalBefore) * 100)}%)`);
