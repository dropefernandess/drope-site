"use client";

import { useEffect } from "react";

/**
 * Timeline de entrada do hero — DIRECAO-CRIATIVA-V2.md §4.3.
 *
 * O hero não é scroll-linked nem state-linked: é uma timeline de load.
 * Por isso não é GSAP (que é dono do scroll) nem Framer (dono do estado) —
 * é uma sequência de classes, o mais barato e o mais previsível.
 *
 * Ordem por `data-step`, não por posição no DOM. Termina em 1,16 s.
 * (O /v2 anterior levava >3 s e revelava palavra por palavra.)
 */

/** Passo → atraso em ms. Índice = data-step. */
const STEPS = [0, 120, 200, 320, 400, 480, 560];

export function useEnterTimeline(
  ref: React.RefObject<HTMLElement | null>,
  { enabled = true }: { enabled?: boolean } = {},
) {
  useEffect(() => {
    if (!enabled) return;
    const root = ref.current;
    if (!root) return;

    const nodes = Array.from(
      root.querySelectorAll<HTMLElement>("[data-step]"),
    );
    if (nodes.length === 0) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const timers: number[] = [];

    // rAF duplo: garante que o estado inicial pintou antes de transicionar,
    // senão o browser colapsa a transição e o elemento só aparece.
    const start = requestAnimationFrame(() =>
      requestAnimationFrame(() => {
        for (const node of nodes) {
          const step = Number(node.dataset.step ?? 0);
          const delay = reduced ? 0 : (STEPS[step] ?? step * 80);
          if (delay === 0) {
            node.classList.add("is-in");
          } else {
            timers.push(window.setTimeout(() => node.classList.add("is-in"), delay));
          }
        }
      }),
    );

    return () => {
      cancelAnimationFrame(start);
      timers.forEach(clearTimeout);
    };
  }, [ref, enabled]);
}
