import type { Metadata } from "next";
import { V2Client } from "./V2Client";
import "./v2.css";

/**
 * /v2 — preview INTERNO do redesign (não substitui o site até aprovação).
 *
 * Identidade do manual intocada (Inter · #DE2828 · cream/ink). As refs
 * (Kubric, Pallet Ross, GroundAI, 10×Designers, bento azul) entram como
 * estrutura, motion e nível de acabamento — recoloridas nos tokens.
 * Stack da rota: GSAP + ScrollTrigger, Lenis, Framer Motion.
 */
export const metadata: Metadata = {
  title: "V2 — Preview do redesign (interno)",
  robots: { index: false, follow: false },
};

export default function V2Page() {
  return <V2Client />;
}
