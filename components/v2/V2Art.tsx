"use client";

import { cn } from "@/lib/utils";

/**
 * V2Art — micro-ilustrações animadas dos cards do bento de serviços.
 * Mesma linguagem hairline do ProcessArt (currentColor, traço fino),
 * reusando os keyframes ds-* já existentes no globals.css — zero CSS novo.
 */

type Props = { kind: "branding" | "uiux" | "web" | "grafico" | "motion"; className?: string };

export function V2Art({ kind, className }: Props) {
  return (
    <svg viewBox="0 0 120 120" className={cn("ds-art", className)} aria-hidden fill="none">
      {kind === "branding" && (
        <>
          {/* forma de marca sendo desenhada — bézier + âncoras (vetor) */}
          <g stroke="currentColor" strokeWidth="0.75" strokeDasharray="3 4" opacity="0.3">
            <line x1="20" y1="88" x2="46" y2="22" />
            <line x1="100" y1="38" x2="76" y2="100" />
          </g>
          <g stroke="currentColor" strokeWidth="1">
            <rect x="16" y="84" width="8" height="8" />
            <rect x="96" y="34" width="8" height="8" />
          </g>
          <circle cx="46" cy="22" r="2" fill="currentColor" className="ds1-blip" />
          <circle cx="76" cy="100" r="2" fill="currentColor" className="ds1-blip-2" />
          <path
            d="M20 88 C 46 22, 76 100, 100 38"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            className="ds2-draw"
          />
          {/* selo ® girando devagar */}
          <g className="ds1-sweep" style={{ transformOrigin: "96px 92px" }}>
            <circle cx="96" cy="92" r="9" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
            <circle cx="96" cy="83" r="1.5" fill="currentColor" />
          </g>
        </>
      )}

      {kind === "uiux" && (
        <>
          {/* wireframe montando + cursor — eco do ProcessArt 03 */}
          <g stroke="currentColor" strokeWidth="0.75">
            <rect x="16" y="14" width="88" height="24" rx="6" className="ds3-b1" fill="currentColor" fillOpacity="0.05" />
            <rect x="16" y="46" width="52" height="58" rx="6" className="ds3-b2" fill="currentColor" fillOpacity="0.05" />
            <rect x="76" y="46" width="28" height="58" rx="6" className="ds3-b3" fill="currentColor" fillOpacity="0.05" />
          </g>
          <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" className="ds3-b1">
            <line x1="24" y1="23" x2="56" y2="23" opacity="0.5" />
            <line x1="24" y1="30" x2="42" y2="30" opacity="0.3" />
          </g>
          <g className="ds3-cursor">
            <path
              d="M62 74 l15 5.5 -6.5 2.8 3.2 7.5 -2.8 1.4 -3.2 -7.5 -5.7 4.7 Z"
              fill="currentColor"
              fillOpacity="0.15"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinejoin="round"
            />
          </g>
        </>
      )}

      {kind === "web" && (
        <>
          {/* browser + linhas de código pulsando */}
          <rect x="14" y="20" width="92" height="80" rx="8" stroke="currentColor" strokeWidth="0.75" />
          <line x1="14" y1="36" x2="106" y2="36" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
          <circle cx="24" cy="28" r="2" fill="currentColor" opacity="0.4" />
          <circle cx="32" cy="28" r="2" fill="currentColor" opacity="0.25" />
          <circle cx="40" cy="28" r="2" fill="currentColor" opacity="0.15" />
          <g stroke="currentColor" strokeWidth="1.25" strokeLinecap="round">
            <line x1="26" y1="50" x2="62" y2="50" opacity="0.5" className="ds1-blip" />
            <line x1="26" y1="60" x2="80" y2="60" opacity="0.35" className="ds1-blip-2" />
            <line x1="34" y1="70" x2="70" y2="70" opacity="0.5" className="ds1-blip" />
            <line x1="34" y1="80" x2="56" y2="80" opacity="0.3" className="ds1-blip-2" />
          </g>
          {/* asterisco de deploy girando */}
          <g className="ds1-sweep" style={{ transformOrigin: "92px 84px" }}>
            <path d="M92 76v16M84 84h16M86.3 78.3l11.4 11.4M97.7 78.3 86.3 89.7" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
          </g>
        </>
      )}

      {kind === "grafico" && (
        <>
          {/* halftone + cruz de registro (gráfica) */}
          {Array.from({ length: 5 }).map((_, r) =>
            Array.from({ length: 5 }).map((_, c) => (
              <circle
                key={`${r}-${c}`}
                cx={26 + c * 14}
                cy={30 + r * 14}
                r={2.6 - r * 0.45}
                fill="currentColor"
                opacity={0.55 - r * 0.09}
                className={(r + c) % 2 ? "ds1-blip" : "ds1-blip-2"}
              />
            ))
          )}
          <g className="ds1-sweep" style={{ transformOrigin: "96px 92px" }}>
            <circle cx="96" cy="92" r="10" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
            <path d="M96 78v28M82 92h28" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
          </g>
        </>
      )}

      {kind === "motion" && (
        <>
          {/* play + órbita — timeline embaixo */}
          <circle cx="60" cy="52" r="26" stroke="currentColor" strokeWidth="0.75" opacity="0.5" />
          <path d="M54 42 L72 52 L54 62 Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round" fill="currentColor" fillOpacity="0.12" />
          <g className="ds1-sweep" style={{ transformOrigin: "60px 52px" }}>
            <circle cx="60" cy="18" r="2.5" fill="currentColor" />
          </g>
          {/* timeline com keyframes piscando */}
          <line x1="20" y1="96" x2="100" y2="96" stroke="currentColor" strokeWidth="0.75" opacity="0.4" />
          <rect x="34" y="92.5" width="7" height="7" transform="rotate(45 37.5 96)" stroke="currentColor" strokeWidth="0.75" fill="currentColor" fillOpacity="0.2" className="ds1-blip" />
          <rect x="62" y="92.5" width="7" height="7" transform="rotate(45 65.5 96)" stroke="currentColor" strokeWidth="0.75" fill="currentColor" fillOpacity="0.2" className="ds1-blip-2" />
          <rect x="86" y="92.5" width="7" height="7" transform="rotate(45 89.5 96)" stroke="currentColor" strokeWidth="0.75" fill="currentColor" fillOpacity="0.2" className="ds1-blip" />
        </>
      )}
    </svg>
  );
}
