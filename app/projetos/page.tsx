import type { Metadata } from "next";
import { ProjectsIndex } from "@/components/rb/projetos/ProjectsIndex";

export const metadata: Metadata = {
  title: "Trabalhos",
  alternates: { canonical: "/projetos", languages: { "pt-BR": "/projetos", en: "/en/projetos" } },
  description: "Marcas, sites, direção de arte e motion levados do conceito ao ar. Cada projeto abre com o caminho e o resultado.",
};

/** Trabalhos — rebrand 2026 (Figma: "Trabalhos · Desktop 1440"). */
export default function ProjetosPage() {
  return <ProjectsIndex />;
}
