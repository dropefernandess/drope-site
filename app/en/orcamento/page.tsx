// Mirror EN: re-exporta a página PT. O locale vem do pathname (/en/*).
import type { Metadata } from "next";
export { default } from "../../orcamento/page";

export const metadata: Metadata = {
  title: "Project quote",
  description:
    "Pick the services, scope and timeline and see an estimate for your brand, website or motion project right away. Then ask for a personalized quote.",
  alternates: {
    canonical: "/en/orcamento",
    languages: { "pt-BR": "/orcamento", en: "/en/orcamento" },
  },
};
