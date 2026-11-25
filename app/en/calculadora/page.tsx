// Mirror EN — re-exporta a página PT. O locale é derivado do pathname
// (/en/* → en) pelo LocaleProvider, então a calculadora renderiza em inglês.
import type { Metadata } from "next";
export { default } from "../../calculadora/page";

export const metadata: Metadata = {
  title: "Design project cost calculator",
  description:
    "Pick the services, scope and timeline and see an investment range for your visual identity, UI/UX, website or motion project right away.",
  alternates: {
    canonical: "/en/calculadora",
    languages: { "pt-BR": "/calculadora", en: "/en/calculadora" },
  },
};
