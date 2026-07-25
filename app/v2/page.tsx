import type { Metadata } from "next";
import { V2Client } from "./V2Client";
import "./v2-tokens.css";
import "./v2.css";

/**
 * /v2 — preview INTERNO do redesign.
 *
 * Direção: "O Ponto de Silêncio" (ver DIRECAO-CRIATIVA-V2.md na raiz).
 * Fundação em v2-tokens.css. Stack: Lenis (scroll) + GSAP/ScrollTrigger
 * (posição) + Framer Motion (estado).
 *
 * Estado da migração:
 *   ✔ Fase 1 — tokens e primitivos
 *   ✔ Fase 2 — hero
 *   … Fases 3–5 — serviços, trabalhos, processo, CTA (ainda no código antigo)
 */
export const metadata: Metadata = {
  title: "V2 — Preview do redesign (interno)",
  robots: { index: false, follow: false },
};

/**
 * Sem JS os gestos nunca recebem .is-in — este override garante que o
 * conteúdo apareça mesmo assim. É a rede de segurança que faltava no /v2
 * anterior, onde `body:not(.is-ready)` escondia tudo por padrão.
 */
const NOSCRIPT_FALLBACK = `
.v2-ready [data-snap]{opacity:1;transform:none}
.v2-ready .v2-rule{transform:scaleX(1)}
.v2-ready .v2-line>span{transform:none}
`;

export default function V2Page() {
  return (
    <>
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NOSCRIPT_FALLBACK }} />
      </noscript>
      <V2Client />
    </>
  );
}
