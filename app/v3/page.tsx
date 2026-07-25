import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { V3Client } from "./V3Client";
import "./v3.css";

/**
 * /v3 — "AFLUENTE". Dark-first, identidade nova.
 * Direção em DIRECAO-V3.md.
 *
 * Inter já vem do layout raiz (todos os pesos). Instrument Serif entra
 * SÓ neste chunk — a display de ênfase. É a equivalente gratuita mais
 * próxima da Sentient em espírito: serif de alto contraste, itálico com
 * voz. Sem download de arquivo: next/font/google faz self-host no build,
 * então não há request pra fonts.gstatic em runtime.
 */
const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "V3 — Afluente (preview interno)",
  robots: { index: false, follow: false },
};

/** Sem JS os reveals nunca disparam — a rede de segurança. */
const NOSCRIPT = `.v3-ready [data-reveal]{opacity:1!important;transform:none!important}`;

export default function V3Page() {
  return (
    <>
      <noscript>
        <style dangerouslySetInnerHTML={{ __html: NOSCRIPT }} />
      </noscript>
      <div className={serif.variable}>
        <V3Client />
      </div>
    </>
  );
}
