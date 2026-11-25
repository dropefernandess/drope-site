import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/rb/projetos/ProjectsIndex";

export const metadata: Metadata = {
  title: "Work",
  description: "Brands, websites, art direction and motion taken from concept to launch. Each project opens with the path and the result.",
  alternates: { canonical: "/en/projetos", languages: { "pt-BR": "/projetos", en: "/en/projetos" } },
};

// Mirror EN: o locale vem do pathname (/en/*).
export default function ProjetosPageEn() {
  return <ProjectsIndex />;
}
