"use client";

import { cn } from "@/lib/utils";

/**
 * ProcessArt — SVGs animados (CSS keyframes em globals.css, prefixo ds-)
 * que ilustram cada etapa do processo nos cards do StickyStack.
 *
 * Tudo em currentColor → herda o tom do card (cream no brand/dark,
 * ink no soft), sem cor hardcoded. Animações desligam com
 * prefers-reduced-motion (regra .ds-art no globals).
 *
 *  1. Discovery  — radar varrendo com blips
 *  2. Conceito   — curva bézier se desenhando com handles de vetor
 *  3. Execução   — wireframe montando bloco a bloco + cursor
 *  4. Entrega    — anel de progresso completando + check
 */

type Props = { step: 1 | 2 | 3 | 4; className?: string };

export function ProcessArt({ step, className }: Props) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={cn("ds-art", className)}
      aria-hidden
      fill="none"
    >
      {step === 1 && (
        <>
          {/* radar: círculos concêntricos + varredura + blips */}
          <g stroke="currentColor" strokeWidth="0.75">
            <circle cx="60" cy="60" r="18" opacity="0.18" />
            <circle cx="60" cy="60" r="34" opacity="0.14" />
            <circle cx="60" cy="60" r="50" opacity="0.10" />
            <path d="M60 4v10M60 106v10M4 60h10M106 60h10" opacity="0.35" strokeLinecap="round" />
          </g>
          <g className="ds1-sweep" style={{ transformOrigin: "60px 60px" }}>
            <line x1="60" y1="60" x2="60" y2="12" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.7" />
            <circle cx="60" cy="12" r="2" fill="currentColor" />
          </g>
          <circle cx="82" cy="44" r="2.5" fill="currentColor" className="ds1-blip" />
          <circle cx="40" cy="76" r="2" fill="currentColor" className="ds1-blip-2" />
        </>
      )}

      {step === 2 && (
        <>
          {/* handles de vetor (estilo Figma/Illustrator) */}
          <g stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.3">
            <line x1="18" y1="92" x2="42" y2="18" />
            <line x1="102" y1="34" x2="78" y2="104" />
          </g>
          {/* âncoras */}
          <g stroke="currentColor" strokeWidth="1">
            <rect x="14" y="88" width="8" height="8" />
            <rect x="98" y="30" width="8" height="8" />
          </g>
          {/* pontos de controle pulsando */}
          <circle cx="42" cy="18" r="2" fill="currentColor" className="ds1-blip" />
          <circle cx="78" cy="104" r="2" fill="currentColor" className="ds1-blip-2" />
          {/* a curva que se desenha em loop */}
          <path
            d="M18 92 C 42 18, 78 104, 102 34"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            className="ds2-draw"
          />
        </>
      )}

      {step === 3 && (
        <>
          {/* wireframe montando: header + 2 colunas, staggered */}
          <g stroke="currentColor" strokeWidth="0.75">
            <rect x="18" y="16" width="84" height="26" rx="6" className="ds3-b1" fill="currentColor" fillOpacity="0.05" />
            <rect x="18" y="50" width="44" height="52" rx="6" className="ds3-b2" fill="currentColor" fillOpacity="0.05" />
            <rect x="70" y="50" width="32" height="52" rx="6" className="ds3-b3" fill="currentColor" fillOpacity="0.05" />
          </g>
          {/* linhas de conteúdo do header */}
          <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="ds3-b1">
            <line x1="26" y1="26" x2="58" y2="26" opacity="0.5" />
            <line x1="26" y1="33" x2="44" y2="33" opacity="0.3" />
          </g>
          {/* cursor flutuando (eco dos cursores da CTA) — outline fino,
              fill leve pra não pesar */}
          <g className="ds3-cursor">
            <path
              d="M76 78 l16 6 -7 3 3.5 8 -3 1.5 -3.5 -8 -6 5 Z"
              fill="currentColor"
              fillOpacity="0.15"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </g>
        </>
      )}

      {step === 4 && (
        <g className="ds4-wrap">
          {/* anel completando */}
          <circle
            cx="60" cy="60" r="40"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            className="ds4-ring"
            style={{ transformOrigin: "60px 60px", transform: "rotate(-90deg)" }}
          />
          {/* check */}
          <path
            d="M44 61 L56 73 L79 49"
            stroke="currentColor"
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ds4-check"
          />
          {/* sparkles */}
          <path d="M100 24 v10 M95 29 h10" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" className="ds1-blip" />
          <path d="M18 88 v8 M14 92 h8" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" className="ds1-blip-2" />
        </g>
      )}
    </svg>
  );
}
