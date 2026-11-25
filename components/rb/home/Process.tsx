"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Icon, ICONS } from "@/components/rb/ui";

/**
 * Como funciona — Figma "06 Como funciona" (referência Quintal, "Etapas do
 * processo"). Coluna da esquerda presa; trilho no meio com o marcador
 * vermelho que acompanha a rolagem; cartões das etapas à direita.
 */
export const MOVES = [
  { n: "01", img: "/rb/pieces/meiotom.jpg",
    pt: { t: "Escuta e imersão", d: "Ouço o negócio, o cliente e o mercado antes de pensar em qualquer forma. Entrevista, pesquisa e referências entram aqui.", c: "Etapas 01 e 02" },
    en: { t: "Listening and immersion", d: "I listen to the business, the client and the market before thinking about any form. Interviews, research and references come in here.", c: "Steps 01 and 02" } },
  { n: "02", img: "/rb/pieces/dither.jpg",
    pt: { t: "Silêncio e território", d: "Tudo o que foi ouvido decanta até virar uma direção clara. As escolhas importantes são feitas juntos, com opções na mesa.", c: "Etapas 03 e 04" },
    en: { t: "Silence and territory", d: "Everything heard settles until it becomes a clear direction. The important choices are made together, with options on the table.", c: "Steps 03 and 04" } },
  { n: "03", img: "/rb/pieces/seda.jpg",
    pt: { t: "Forma, sistema e prova", d: "A direção vira marca, interface e site, testados com conteúdo real. Nada é aprovado em mockup ideal.", c: "Etapas 05, 06 e 07" },
    en: { t: "Form, system and proof", d: "The direction becomes brand, interface and website, tested with real content. Nothing gets approved in an ideal mockup.", c: "Steps 05, 06 and 07" } },
  { n: "04", img: "/rb/pieces/brilho.jpg",
    pt: { t: "Construção, entrega e órbita", d: "Do layout ao ar, com documentação completa e 30 dias de acompanhamento depois da entrega.", c: "Etapas 08, 09 e 10" },
    en: { t: "Build, delivery and orbit", d: "From layout to launch, with complete documentation and 30 days of follow-up after delivery.", c: "Steps 08, 09 and 10" } },
];

const COPY = {
  pt: { chip: "Cronograma", title: "Dez etapas, quatro movimentos, um processo só.", a: "Profundidade não atrasa projeto, evita retrabalho.", b: "Quem pensa fundo uma vez não refaz três vezes." },
  en: { chip: "Timeline", title: "Ten steps, four movements, one process.", a: "Depth doesn't delay a project, it prevents rework.", b: "Think deep once and you won't redo it three times." },
};

export function Process({ id = "como-funciona" }: { id?: string }) {
  const { locale } = useLocale();
  const c = COPY[locale];
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.7"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const top = useTransform(p, (v) => `calc(${v * 100}% - 22px)`);
  const fill = useTransform(p, (v) => `${v * 100}%`);
  return (
    <section id={id} aria-labelledby={`${id}-titulo`} className="bg-ink-900 text-ink-50">
      <div className="rb-container py-16 lg:py-40">
        <div className="lg:grid lg:grid-cols-[560px_80px_1fr] lg:gap-x-10">
          <div className="lg:sticky lg:top-40 lg:self-start">
            <span className="inline-flex items-center gap-2 rounded-pill border border-ink-700 px-3 py-1.5 text-sm font-medium text-ink-200">
              <Icon d={ICONS.clock} size={14} /> {c.chip}
            </span>
            <h2 id={`${id}-titulo`} className="t-h1 mt-5 text-brand">{c.title}</h2>
            <p className="t-small mt-6 max-w-[480px] text-ink-200 lg:mt-8">
              <span className="text-brand">{c.a}</span>
              <br />
              {c.b}
            </p>
          </div>
          <div aria-hidden className="relative hidden lg:block">
            <div className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-ink-700" />
            <motion.div className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top bg-brand" style={{ height: fill }} />
            <motion.div className="absolute left-1/2 grid h-11 w-[22px] -translate-x-1/2 place-items-center rounded-full bg-brand text-ink-50" style={{ top }}>
              <Icon d={ICONS.chevronDown} size={14} />
            </motion.div>
          </div>
          <div ref={ref} className="mt-12 flex flex-col gap-10 lg:mt-0 lg:gap-12">
            {MOVES.map((m) => {
              const t = m[locale];
              return (
                <article key={m.n} className="relative pt-3">
                  <svg aria-hidden viewBox="0 0 300 22" className="absolute right-4 top-0 h-[18px] w-[180px] text-brand lg:right-5 lg:h-[22px] lg:w-[300px]" preserveAspectRatio="none" fill="currentColor"><path d="M0 22 16 0h284v22Z" /></svg>
                  <div className="relative overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 p-2">
                    <div className="relative aspect-[584/220] overflow-hidden rounded-[10px] bg-ink-700 max-lg:aspect-[326/140]">
                      <Image src={m.img} alt="" fill sizes="(min-width: 1024px) 584px, 100vw" className="object-cover" />
                    </div>
                    <div className="px-2 pb-4 pt-5 lg:px-4 lg:pb-4 lg:pt-6">
                      <div className="flex flex-col items-start gap-2.5 lg:flex-row lg:items-center lg:gap-3.5">
                        <span className="rounded-pill bg-brand px-3 py-1 text-lg font-semibold leading-[22px] text-ink-50">{m.n}</span>
                        <h3 className="t-h3 text-brand">{t.t}</h3>
                      </div>
                      <p className="t-small mt-3 text-ink-200 lg:mt-5">{t.d}</p>
                      <span className="mt-4 inline-flex items-center gap-2 rounded-pill border border-ink-700 px-3 py-1.5 text-sm font-medium text-ink-200 lg:mt-5">
                        <Icon d={ICONS.clock} size={14} /> {t.c}
                      </span>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
