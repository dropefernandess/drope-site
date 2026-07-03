"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ScrollFX — interações scroll-driven do DS (Fase 0 revisada).
 *
 * 1. <TextScrollReveal/> — texto que "acende" palavra por palavra conforme
 *    o scroll avança (padrão unkern/Framer). Scroll-LINKED, não triggered:
 *    andar pra trás apaga de volta. GPU-only (opacity).
 *
 * 2. <StickyStack/> + <StickyCard/> — cards que empilham no scroll
 *    (padrão Framer templates: hox/wapfy). CSS sticky + top incremental,
 *    com leve scale/dim dos cards anteriores via scroll progress.
 *
 * Ambos respeitam prefers-reduced-motion (renderizam estáticos).
 */

// ============================================================
// 1. TEXT SCROLL REVEAL
// ============================================================

function Word({
  children,
  progress,
  range,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <span className="relative inline-block">
      {/* fantasma fixo (mantém layout estável e dá o efeito "apagado") */}
      <span aria-hidden className="opacity-[0.16]">{children}</span>
      <motion.span style={{ opacity }} className="absolute inset-0">
        {children}
      </motion.span>
    </span>
  );
}

export function TextScrollReveal({
  text,
  className,
  as: Tag = "p",
}: {
  text: string;
  className?: string;
  as?: "p" | "h2" | "h3" | "blockquote";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    // começa a acender quando o topo do bloco passa 85% da viewport,
    // termina quando o fim do bloco chega a 40% — janela confortável
    offset: ["start 0.85", "end 0.4"],
  });

  const words = text.split(" ");

  if (reduced) {
    return <Tag className={className}>{text}</Tag>;
  }

  return (
    // cast: ref polimórfico (p/h2/h3/blockquote compartilham HTMLElement)
    <Tag ref={ref as never} className={className} aria-label={text}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return (
          <span key={i} aria-hidden className="inline">
            <Word progress={scrollYProgress} range={[start, end]}>
              {word}
            </Word>
            {i < words.length - 1 ? " " : ""}
          </span>
        );
      })}
    </Tag>
  );
}

// ============================================================
// 2. STICKY STACK
// ============================================================

/**
 * Container do stack. Cada <StickyCard index={i}> gruda em
 * top = topOffset + i*gap, criando o efeito de empilhamento.
 * O card anterior escala/escurece levemente conforme o próximo cobre.
 */
export function StickyStack({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("relative flex flex-col", className)}>{children}</div>;
}

export function StickyCard({
  index,
  total,
  children,
  className,
  /** Offset do topo em px (default 96 = topo abaixo do nav). */
  topOffset = 96,
  /** Deslocamento incremental por card (px). */
  step = 14,
}: {
  index: number;
  total: number;
  children: React.ReactNode;
  className?: string;
  topOffset?: number;
  step?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  // Progresso: 0 quando o card gruda, 1 quando o PRÓXIMO cobre totalmente
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const isLast = index === total - 1;
  // Card coberto: encolhe 4% e escurece de leve (profundidade)
  const scale = useTransform(scrollYProgress, [0, 1], [1, isLast ? 1 : 0.96]);
  const filter = useTransform(
    scrollYProgress,
    [0, 1],
    ["brightness(1)", isLast ? "brightness(1)" : "brightness(0.92)"]
  );

  return (
    <div
      ref={ref}
      className="sticky"
      style={{ top: topOffset + index * step, zIndex: index + 1 }}
    >
      <motion.div
        style={reduced ? undefined : { scale, filter, transformOrigin: "center top" }}
        className={cn("will-change-transform", className)}
      >
        {children}
      </motion.div>
      {/* Espaçador: dá "pista" de scroll pro efeito respirar (exceto no último) */}
      {!isLast && <div aria-hidden className="h-[16vh]" />}
    </div>
  );
}
