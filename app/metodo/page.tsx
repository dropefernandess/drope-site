import type { Metadata } from "next";
import { MetodoPage } from "@/components/rb/metodo/MetodoPage";

/**
 * Método — rebrand 2026. O processo em dez etapas (plataforma de marca,
 * "O Processo"), agrupadas nos quatro movimentos da Home, e o pacote
 * Ponto de Partida. A interface fica em components/rb/metodo.
 */
export const metadata: Metadata = {
  title: "Método",
  description:
    "Meu processo em dez etapas, da primeira conversa ao acompanhamento depois do lançamento. Profundidade não atrasa projeto, ela evita retrabalho.",
  alternates: {
    canonical: "/metodo",
    languages: { "pt-BR": "/metodo", en: "/en/metodo" },
  },
};

export default function Page() {
  return <MetodoPage />;
}
