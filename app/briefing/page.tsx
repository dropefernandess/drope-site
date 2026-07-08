import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import { BriefingClient } from "./BriefingClient";

/**
 * /briefing — formulário de briefing da marca de biscoitos (mãe do Pedro).
 *
 * Página STANDALONE: sem Nav/Footer/Splash do portfólio (ver SiteChrome
 * no layout root), paleta própria (creme + rosé + neutro quente) e
 * Fraunces carregada só neste chunk — a identidade Dropê continua
 * Inter-only no resto do site.
 *
 * noindex: rota utilitária de uso privado, fora do sitemap.
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  weight: ["400", "500"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Briefing · Marca de Biscoitos",
  description: "Questionário de briefing para a criação da marca.",
  robots: { index: false, follow: false },
};

export default function BriefingPage() {
  return (
    <div className={fraunces.variable}>
      <BriefingClient />
    </div>
  );
}
