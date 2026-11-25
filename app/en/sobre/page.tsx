import type { Metadata } from "next";
import { AboutPage } from "@/components/rb/sobre/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "Drope Fernandes, a multidisciplinary designer for 7 years. Creating from the countryside of Minas Gerais for Brazil, the Emirates and Portugal.",
  alternates: { canonical: "/en/sobre", languages: { "pt-BR": "/sobre", en: "/en/sobre" } },
};

// Mirror EN: o locale vem do pathname (/en/*).
export default function SobrePageEn() {
  return <AboutPage />;
}
