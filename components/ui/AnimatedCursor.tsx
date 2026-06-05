"use client";

import { motion } from "framer-motion";

/**
 * AnimatedCursor — cursor flutuante com label, movimento em loop (vai e volta).
 *
 * Visual:
 *  - SVG do cursor (estilo Figma/Framer) com cor custom
 *  - Pill label colada no canto (com mesma cor)
 *  - Drop shadow sutil pra "flutuar"
 *
 * Movimento:
 *  - x/y oscilam entre 0 e offset definido, easeInOut, repetição infinita
 *  - direction `mirror` faz vai-e-volta suave (não jump)
 *
 * Posição base é configurada via `style` (top/left/right/bottom) ou via Tailwind.
 */
type Props = {
  color: string;            // cor sólida (hex ou rgb()) — aplica ao cursor + pill
  label: string;
  /** Posição inicial (left/top/right/bottom em CSS). */
  position: React.CSSProperties;
  /** Offset máximo do movimento (px). Cursor oscila entre 0 e este valor. */
  offsetX?: number;
  offsetY?: number;
  /** Duração de 1 ciclo completo em segundos. */
  duration?: number;
  /** Delay inicial pra desincronizar múltiplos cursores. */
  delay?: number;
  className?: string;
};

export function AnimatedCursor({
  color,
  label,
  position,
  offsetX = 60,
  offsetY = 30,
  duration = 4,
  delay = 0,
  className,
}: Props) {
  return (
    <motion.div
      aria-hidden
      className={`pointer-events-none absolute z-20 select-none ${className ?? ""}`}
      style={position}
      animate={{
        x: [0, offsetX, 0, offsetX * 0.5, 0],
        y: [0, offsetY, offsetY * 1.5, offsetY * 0.5, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: [0.45, 0, 0.55, 1], // easeInOut
        times: [0, 0.25, 0.5, 0.75, 1],
      }}
    >
      {/* Cursor SVG (estilo Framer/Figma) */}
      <svg
        width="20"
        height="22"
        viewBox="0 0 20 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-md"
        style={{ filter: `drop-shadow(0 4px 12px ${color}66)` }}
      >
        <path
          d="M3.5 1.5L17.5 11L9.5 13L6.5 20L3.5 1.5Z"
          fill={color}
          stroke="white"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Label pill */}
      <span
        className="absolute left-4 top-5 inline-flex items-center rounded-pill px-2.5 py-1 text-[11px] font-semibold text-white whitespace-nowrap shadow-md"
        style={{
          backgroundColor: color,
          boxShadow: `0 4px 12px ${color}55`,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
