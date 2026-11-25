// Mirror EN: re-exporta a página PT. O locale vem do pathname (/en/*).
import type { Metadata } from "next";
export { default } from "../../privacidade/page";

export const metadata: Metadata = {
  title: "Privacy policy",
  description: "What happens to the information you share through this website: what I receive, what I use it for, who I share it with and how to ask me to correct or delete it.",
  alternates: {
    canonical: "/en/privacidade",
    languages: { "pt-BR": "/privacidade", en: "/en/privacidade" },
  },
};
