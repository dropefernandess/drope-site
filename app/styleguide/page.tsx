import type { Metadata } from "next";
import { StyleguideClient } from "./StyleguideClient";

/**
 * /styleguide — documentação viva do design system (rota interna, noindex).
 *
 * Fase 0 FECHADA: identidade segue o BRAND SYSTEM — DROPE (paleta #DE2828
 * + escala ink + Inter). O DS evolui só na camada de INTERAÇÃO — botões
 * fill-up/text-slide, TextScrollReveal, StickyStack — demonstrada live aqui.
 */
export const metadata: Metadata = {
  title: "Styleguide interno — Design System Dropê",
  robots: { index: false, follow: false },
};

export default function StyleguidePage() {
  return <StyleguideClient />;
}
