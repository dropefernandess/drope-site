"use client";

/* eslint-disable @next/next/no-img-element */
// Textura decorativa fora do pipeline do next/image de propósito:
// se public/v2/cta-texture.jpg não existir ainda, o onError esconde a
// <img> e o fallback procedural (.v2-twill) segura o visual.

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { AnimatedCursor } from "@/components/ui/AnimatedCursor";
import { TextScrollReveal } from "@/components/ui/ScrollFX";

/**
 * V2CTA — fecho escuro com a textura camo (anexo do Pedro) de fundo.
 * Parallax sutil na textura, TextScrollReveal na headline, cursores
 * animados (assinatura do site atual) e CTAs do DS em tokens ink-50.
 */
export function V2CTA() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [texOk, setTexOk] = useState(true);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const texY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section
      id="contato"
      ref={ref}
      className="relative overflow-hidden bg-[#121210] py-28 md:py-40"
    >
      {/* Fallback procedural (sarja escura) — sempre presente por baixo */}
      <div className="v2-twill" aria-hidden />

      {/* Textura real (public/v2/cta-texture.jpg) com parallax */}
      {texOk && (
        <motion.div
          aria-hidden
          style={reduced ? undefined : { y: texY }}
          className="absolute -inset-y-[8%] inset-x-0"
        >
          <img
            src="/v2/cta-texture.jpg"
            alt=""
            onError={() => setTexOk(false)}
            className="h-full w-full object-cover opacity-80"
          />
        </motion.div>
      )}

      {/* Vinheta pra segurar contraste do texto */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(75% 90% at 50% 45%, rgb(16 16 16 / 0.55) 0%, rgb(16 16 16 / 0.85) 100%)",
        }}
      />

      {/* Cursores animados — assinatura do site atual */}
      <AnimatedCursor
        color="#DE2828"
        label="Branding"
        position={{ top: "24%", right: "18%" }}
        offsetX={90}
        offsetY={50}
        duration={5}
        delay={0}
        className="hidden md:block"
      />
      <AnimatedCursor
        color="#F2F2EB"
        label="Visão"
        position={{ top: "64%", right: "30%" }}
        offsetX={-80}
        offsetY={-40}
        duration={6}
        delay={1.5}
        className="hidden md:block"
      />

      <div className="relative z-10 mx-auto flex max-w-container flex-col items-center gap-8 px-6 text-center md:px-12">
        <p className="label-mono flex items-center gap-2 !text-ink-50/60" data-v2-reveal>
          <span className="size-1 rounded-full bg-brand" />
          04 — Próximo projeto
        </p>

        <TextScrollReveal
          as="h2"
          className="max-w-4xl text-balance text-[clamp(2.4rem,5.5vw,4.6rem)] font-semibold leading-[1.06] tracking-[-0.025em] text-ink-50"
          text="Vamos criar algo que dura mais que a tendência da semana."
        />

        <p className="max-w-xl text-base leading-relaxed text-ink-50/70 md:text-lg" data-v2-reveal>
          Me conta o que você precisa e eu respondo em até 24h — com opinião,
          não com formulário.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2" data-v2-reveal>
          <Link
            href="/agendar"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-brand px-7 py-4 text-sm font-semibold text-brand-fg shadow-lg shadow-brand/30"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full rounded-pill bg-brand-deep transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
            />
            <span className="relative">Agendar conversa</span>
            <ArrowUpRight className="relative size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>
          <Link
            href="/calculadora"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill border border-ink-50/25 bg-ink-50/5 px-7 py-4 text-sm font-semibold text-ink-50 backdrop-blur"
          >
            <span
              aria-hidden
              className="absolute inset-0 translate-y-full rounded-pill bg-ink-50/15 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
            />
            <span className="relative">Estimar projeto</span>
          </Link>
        </div>

        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 pt-4 text-xs font-medium text-ink-50/50" data-v2-reveal>
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-status" /> Resposta em até 24h
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-status" /> Primeira reunião sem custo
          </li>
          <li className="flex items-center gap-2">
            <span className="size-1 rounded-full bg-status" /> Cronograma na 1ª semana
          </li>
        </ul>
      </div>
    </section>
  );
}
