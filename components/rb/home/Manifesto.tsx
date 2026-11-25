"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * Manifesto — Figma "04 Manifesto" (fundo vermelho). Referências Ekon e
 * Ovlay: as palavras acendem conforme a rolagem.
 */
const TEXT = {
  pt: "Todo projeto tem um ponto de silêncio. É o momento em que o briefing para de fazer barulho, a referência para de mandar e a forma certa aparece. Não é pausa, é alinhamento. Eu prefiro profundidade: pensar até o simples ficar inevitável, construir até o bonito funcionar.",
  en: "Every project has a point of silence. It's the moment the brief stops making noise, the references stop giving orders and the right form shows up. It isn't a pause, it's alignment. I choose depth: thinking until the simple becomes inevitable, building until the beautiful works.",
};

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.4, 1]);
  return <motion.span style={{ opacity }}>{children} </motion.span>;
}

export function Manifesto() {
  const { locale } = useLocale();
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = TEXT[locale].split(" ");
  return (
    <section aria-label="Manifesto" className="bg-brand text-ink-50">
      <div className="rb-container py-20 text-center lg:py-[145px]">
        <p className="t-label">Manifesto</p>
        <p ref={ref} className="t-h2 mx-auto mt-6 max-w-[1040px] lg:mt-10">
          {reduce
            ? TEXT[locale]
            : words.map((w, i) => (
                <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>{w}</Word>
              ))}
        </p>
      </div>
    </section>
  );
}
