import type { Metadata } from "next";
import { GlossarioClient } from "@/components/glossario/GlossarioClient";

export const metadata: Metadata = {
  title: "Glossário de Design — termos explicados em português claro",
  description:
    "O vocabulário do design sem jargão: brand system, design tokens, kerning, wireframe, microinteração e mais. Glossário do Drope Fernandes.",
  alternates: {
    canonical: "/glossario",
    languages: { "pt-BR": "/glossario", en: "/en/glossario" },
  },
};

export default function GlossarioPage() {
  return <GlossarioClient />;
}
