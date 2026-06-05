"use client";

import { useEffect, useState } from "react";

/**
 * AnimatedSVG — renderiza SVG animado preservando SMIL/CSS animations.
 *
 * 3 MODOS:
 *
 *  1. mode="object" (DEFAULT)
 *     Renderiza via <object type="image/svg+xml">. Carrega o SVG como
 *     documento independente — preserva animações SMIL (<animate>,
 *     <animateTransform>) e CSS <style> embutido. Mais robusto.
 *
 *  2. mode="img"
 *     Renderiza via <img src>. Browsers modernos preservam SMIL/CSS mas
 *     é mais limitado (sem interação JS). Mais leve.
 *
 *  3. mode="inline"
 *     Faz fetch do SVG e injeta inline via dangerouslySetInnerHTML.
 *     Permite manipulação via Framer Motion / refs / props CSS. Use se
 *     precisa controlar cor por theme ou interagir com elementos.
 *
 * QUANDO USAR CADA UM:
 *  - SVG com SMIL puro (animateTransform, animate, animateMotion) → "object" ou "img"
 *  - SVG com CSS dentro <style>...</style> → "object" (mais confiável)
 *  - SVG estático que você quer animar via Framer Motion → "inline"
 *  - SVG simples sem animação interna → use <Image> do next/image
 */
type Props = {
  /** Caminho público do SVG, ex: "/animations/loader.svg". */
  src: string;
  /** Alt accessibility. */
  alt: string;
  /** Largura em px. */
  width?: number;
  /** Altura em px. */
  height?: number;
  /** Como renderizar (default "object"). */
  mode?: "object" | "img" | "inline";
  /** Loop o SVG resetando a cada N ms. Útil pra SVGs SMIL que tocam só 1×. */
  loopMs?: number;
  className?: string;
};

export function AnimatedSVG({
  src,
  alt,
  width = 64,
  height = 64,
  mode = "object",
  loopMs,
  className,
}: Props) {
  const [tick, setTick] = useState(0);
  const [inlineMarkup, setInlineMarkup] = useState<string | null>(null);

  // Loop resetting key
  useEffect(() => {
    if (!loopMs) return;
    const interval = setInterval(() => setTick((t) => t + 1), loopMs);
    return () => clearInterval(interval);
  }, [loopMs]);

  // Modo inline — fetch + inject
  useEffect(() => {
    if (mode !== "inline") return;
    let cancelled = false;
    fetch(src)
      .then((r) => r.text())
      .then((txt) => {
        if (!cancelled) setInlineMarkup(txt);
      })
      .catch(() => {
        if (!cancelled) setInlineMarkup(null);
      });
    return () => { cancelled = true; };
  }, [src, mode]);

  if (mode === "inline") {
    if (!inlineMarkup) {
      return <div style={{ width, height }} className={className} aria-label={alt} role="img" />;
    }
    return (
      <div
        style={{ width, height }}
        className={className}
        role="img"
        aria-label={alt}
        dangerouslySetInnerHTML={{ __html: inlineMarkup }}
      />
    );
  }

  if (mode === "img") {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        key={tick}            // reset força replay quando loopMs muda tick
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
      />
    );
  }

  // Default: object — mais robusto pra SMIL + CSS embutido
  return (
    <object
      key={tick}
      type="image/svg+xml"
      data={src}
      width={width}
      height={height}
      aria-label={alt}
      role="img"
      className={className}
      style={{ pointerEvents: "none" }} // evita capturar cliques (decoração)
    />
  );
}
