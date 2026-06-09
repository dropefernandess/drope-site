// Mirror EN — re-exporta a página PT. O locale (/en → en) faz o
// GlossarioClient renderizar termos e definições em inglês.
import type { Metadata } from "next";
export { default } from "../../glossario/page";

export const metadata: Metadata = {
  title: "Design Glossary — design terms explained in plain English",
  description:
    "The vocabulary of design without jargon: brand system, design tokens, kerning, wireframe, microinteraction and more. Drope Fernandes glossary.",
  alternates: {
    canonical: "/en/glossario",
    languages: { "pt-BR": "/glossario", en: "/en/glossario" },
  },
};
