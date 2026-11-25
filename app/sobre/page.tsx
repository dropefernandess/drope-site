import type { Metadata } from "next";
import { AboutPage } from "@/components/rb/sobre/AboutPage";

export const metadata: Metadata = {
  title: "Sobre",
  alternates: { canonical: "/sobre", languages: { "pt-BR": "/sobre", en: "/en/sobre" } },
  description: "Drope Fernandes, designer multidisciplinar há 7 anos. A história, o processo e o que me move: pensar até o simples ficar inevitável.",
};

/** Sobre — rebrand 2026 (Figma: "Sobre · Desktop 1440"). */
export default function SobrePage() {
  return <AboutPage />;
}
