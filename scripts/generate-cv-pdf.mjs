/**
 * Gera PDF a partir de /cv/print (página dedicada de print).
 *
 * Estratégia:
 *  1. Aponta pra /cv/print (layout A4 puro, sem menu/footer/decoração)
 *  2. Bypass splash via addInitScript (seta sessionStorage antes do load)
 *  3. Força colorScheme light + reducedMotion
 *  4. Exporta PDF A4 SEM margens (página é A4 inteira)
 *  5. printBackground true pra capturar bg branco do <html>
 *  6. Salva em public/cv/curriculo-drope-fernandes.pdf
 *
 * USO:
 *  node scripts/generate-cv-pdf.mjs
 *  ou: npm run cv:pdf
 *
 * Pra usar URL local (dev): defina CV_URL=http://localhost:3000/cv/print
 */

import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.join(__dirname, "..", "public", "cv", "curriculo-drope-fernandes.pdf");

const URL = process.env.CV_URL || "https://dropefernandes.com/cv/print";

console.log(`📄 Gerando PDF de ${URL}...`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  colorScheme: "light",       // força light mode (PDF sempre claro)
  reducedMotion: "reduce",    // pula animações
  viewport: { width: 794, height: 1123 }, // A4 a 96dpi
});

// Bypass splash screen ANTES de qualquer load — seta flag de sessionStorage
await context.addInitScript(() => {
  try {
    sessionStorage.setItem("drope-splash-shown", "1");
  } catch {}
});

const page = await context.newPage();

await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });

// Pequena espera pra fontes
await page.waitForTimeout(800);

await page.pdf({
  path: OUTPUT_PATH,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: false,
  margin: {
    top: "0mm",
    right: "0mm",
    bottom: "0mm",
    left: "0mm",
  },
});

await browser.close();

console.log(`✅ PDF salvo: ${OUTPUT_PATH}`);
