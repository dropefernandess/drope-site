import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: { canonical: "/en", languages: { "pt-BR": "/", en: "/en" } },
};

// Mirror EN — re-exporta a página PT. O locale é derivado do pathname
// (/en/* → en) pelo LocaleProvider, então o conteúdo renderiza em inglês.
export { default } from "../page";
