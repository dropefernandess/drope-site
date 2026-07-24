"use client";

/* eslint-disable @next/next/no-img-element */
// Textura decorativa fora do next/image de propósito (cover full-bleed).

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { AnimatedCursor } from "@/components/ui/AnimatedCursor";
import { V2Btn } from "./V2Btn";
import { V2Footer } from "./V2Footer";

/**
 * V2Finale — CTA STICKY + cortina: o CTA fica pinado (sticky top-0)
 * e o footer desliza POR CIMA dele ao rolar (overlap pedido pelo Pedro).
 * Enquanto pinado, a textura camo dá zoom-out lento e o conteúdo deriva
 * (efeito amarrado ao progresso do wrapper). Progressive blur de 8
 * camadas no rodapé do CTA — assinatura do prompt Kubric.
 * Superfícies flat: overlay de ink sólido, sem radial, sem sombra.
 */

const BLUR_STEPS = [0.6, 1, 1.5, 2, 3, 4, 6, 8];

export function V2Finale() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });

  const texScale = useTransform(scrollYProgress, [0, 1], [1.18, 1]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], [40, 0]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.35], [0.4, 1]);

  return (
    <div ref={wrapRef} className="relative">
      {/* ===== CTA pinado ===== */}
      <section
        id="contato"
        className="sticky top-0 z-0 flex h-screen items-center overflow-hidden bg-[#121210]"
      >
        {/* textura camo com zoom-out amarrado ao scroll */}
        <motion.img
          src="/v2/cta-texture.jpg"
          alt=""
          aria-hidden
          style={reduced ? undefined : { scale: texScale }}
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* overlay FLAT (sem radial) pra contraste */}
        <div className="absolute inset-0 bg-ink-900/45" aria-hidden />

        {/* progressive blur (8 camadas, padrão Kubric) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[24%]" aria-hidden>
          {BLUR_STEPS.map((b, i) => (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: `blur(${b}px)`,
                maskImage: `linear-gradient(to bottom, transparent ${i * 12.5}%, black ${
                  i * 12.5 + 12.5
                }%)`,
              }}
            />
          ))}
        </div>

        {/* cursores — assinatura Dropê */}
        <AnimatedCursor
          color="#DE2828"
          label="Branding"
          position={{ top: "22%", right: "16%" }}
          offsetX={90}
          offsetY={50}
          duration={5}
          delay={0}
          className="hidden md:block"
        />
        <AnimatedCursor
          color="#F2F2EB"
          label="Visão"
          position={{ top: "66%", left: "14%" }}
          offsetX={-80}
          offsetY={-40}
          duration={6}
          delay={1.5}
          className="hidden md:block"
        />

        <motion.div
          style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
          className="relative z-10 mx-auto flex max-w-[900px] flex-col items-center gap-7 px-6 text-center"
        >
          <p className="text-[11px] font-medium uppercase tracking-[0.24em] text-ink-50/60">
            04 · Próximo projeto
          </p>
          <h2 className="text-balance text-[clamp(2.6rem,6vw,5.2rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-ink-50">
            Vamos criar algo
            <br />
            que <span className="text-brand">dura.</span>
          </h2>
          <p className="max-w-[460px] text-base leading-[1.6] text-ink-50/65">
            Me conta o que você precisa e eu respondo em até 24h — com opinião,
            não com formulário.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <V2Btn href="/agendar" variant="light">
              Agendar conversa
            </V2Btn>
            <V2Btn href="/calculadora" variant="brand">
              Estimar projeto
            </V2Btn>
          </div>
          <ul className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2 pt-2 text-xs font-medium text-ink-50/45">
            <li>Resposta em até 24h</li>
            <li className="size-1 rounded-full bg-brand" aria-hidden />
            <li>Primeira reunião sem custo</li>
            <li className="size-1 rounded-full bg-brand" aria-hidden />
            <li>Cronograma na 1ª semana</li>
          </ul>
        </motion.div>
      </section>

      {/* pista de scroll: CTA fica pinado sozinho por 50vh antes da cortina */}
      <div className="h-[50vh]" aria-hidden />

      {/* ===== FOOTER — desliza POR CIMA do CTA pinado ===== */}
      <V2Footer />
    </div>
  );
}
