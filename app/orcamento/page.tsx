import type { Metadata } from "next";
import { Calculadora } from "@/components/rb/calculadora/Calculadora";

/**
 * /orcamento — antiga /calculadora (pedido do Pedro em 25/11; /calculadora
 * redireciona para cá em next.config.ts). Estimativa com detalhamento e
 * pedido de orçamento personalizado. Lógica em components/rb/calculadora/
 * Calculadora.tsx e components/calculadora/EstimativaForm.tsx.
 */
export const metadata: Metadata = {
  title: "Orçamento",
  description:
    "Marque os serviços, o escopo e o prazo e veja na hora uma estimativa para o seu projeto de marca, site ou motion. Depois, peça o orçamento personalizado.",
  alternates: {
    canonical: "/orcamento",
    languages: { "pt-BR": "/orcamento", en: "/en/orcamento" },
  },
};

export default function OrcamentoPage() {
  return <Calculadora />;
}
