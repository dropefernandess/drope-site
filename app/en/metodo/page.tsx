// Mirror EN — re-exporta a página PT. O locale é derivado do pathname
// (/en/* → en) pelo LocaleProvider, então a página renderiza em inglês.
import type { Metadata } from "next";
export { default } from "../../metodo/page";

export const metadata: Metadata = {
  title: "Method",
  description:
    "My process in ten steps, from the first conversation to the follow-up after launch. Depth doesn't delay a project, it prevents rework.",
  alternates: {
    canonical: "/en/metodo",
    languages: { "pt-BR": "/metodo", en: "/en/metodo" },
  },
};
