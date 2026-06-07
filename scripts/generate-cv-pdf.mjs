/**
 * Gera PDF do /cv via Playwright headless.
 *
 * Estratégia:
 *  1. Abre a URL de produção (https://dropefernandes.com/cv)
 *  2. Espera animações terminarem (Reveal entrando + Signature)
 *  3. Força `prefers-color-scheme: light` pra PDF sempre em modo claro
 *  4. Emula media "print" — aciona @media print do globals
 *  5. Exporta PDF A4 com print backgrounds + margens generosas
 *  6. Salva em public/cv/curriculo-drope-fernandes.pdf
 *
 * USO:
 *  node scripts/generate-cv-pdf.mjs
 *  ou: npm run cv:pdf
 *
 * Pra usar URL local (dev): defina CV_URL=http://localhost:3000/cv
 */

import { chromium } from "playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_PATH = path.join(__dirname, "..", "public", "cv", "curriculo-drope-fernandes.pdf");

const URL = process.env.CV_URL || "https://dropefernandes.com/cv";

console.log(`📄 Gerando PDF de ${URL}...`);

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  colorScheme: "light",       // força light mode (PDF sempre claro)
  reducedMotion: "reduce",    // pula animações de Reveal/Stagger
  viewport: { width: 1024, height: 1400 },
});

const page = await context.newPage();

// Aciona @media print no CSS
await page.emulateMedia({ media: "print", colorScheme: "light" });

await page.goto(URL, { waitUntil: "networkidle", timeout: 60_000 });

// Bypass do splash screen (que aparece só na primeira visita) — define a flag
await page.evaluate(() => {
  sessionStorage.setItem("drope-splash-shown", "1");
});

// Pequena espera pra estabilizar fontes e Signature
await page.waitForTimeout(1500);

await page.pdf({
  path: OUTPUT_PATH,
  format: "A4",
  printBackground: true,
  preferCSSPageSize: false,
  margin: {
    top: "15mm",
    right: "15mm",
    bottom: "15mm",
    left: "15mm",
  },
});

await browser.close();

console.log(`✅ PDF salvo: ${OUTPUT_PATH}`);
