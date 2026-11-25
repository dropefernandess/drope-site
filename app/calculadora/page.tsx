import type { Metadata } from "next";
import { Calculadora } from "@/components/rb/calculadora/Calculadora";

/**
 * /calculadora — estimativa de orçamento (rebrand 2026).
 * A lógica (preços, multiplicadores e faixa) e o envio por e-mail/WhatsApp
 * ficam em components/rb/calculadora/Calculadora.tsx e
 * components/calculadora/EstimativaForm.tsx.
 */
export const metadata: Metadata = {
  title: "Calculadora de orçamento de design",
  description:
    "Marque os serviços, o escopo e o prazo e veja na hora uma faixa de investimento para o seu projeto de identidade visual, UI/UX, site ou motion.",
  alternates: {
    canonical: "/calculadora",
    languages: { "pt-BR": "/calculadora", en: "/en/calculadora" },
  },
};

export default function CalculadoraPage() {
  return <Calculadora />;
}
