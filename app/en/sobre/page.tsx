import type { Metadata } from "next";
import { AboutPage } from "@/components/rb/sobre/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description: "Drope Fernandes, a multidisciplinary designer for 7 years. The story, the process and what drives me: thinking until the simple becomes inevitable.",
  alternates: { canonical: "/en/sobre", languages: { "pt-BR": "/sobre", en: "/en/sobre" } },
};

// Mirror EN: o locale vem do pathname (/en/*).
export default function SobrePageEn() {
  return <AboutPage />;
}
