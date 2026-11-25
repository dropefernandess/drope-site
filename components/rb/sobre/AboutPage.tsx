"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { BrandButton, Icon, ICONS, Label, SOCIAL } from "@/components/rb/ui";
import { FinalCTA } from "@/components/rb/FinalCTA";
import { ImageReveal, LineReveal, Reveal, RevealGroup, useReducedMotionSafe } from "@/components/rb/motion";
import { AGORA } from "@/content/rb/agora";
import { cn } from "@/lib/utils";

/**
 * Sobre — Figma "Sobre · Desktop 1440" / "Sobre · Celular 390".
 * Referências: Sobre da Francielle Lima (retrato com guias, origem,
 * "O que me move" com a frase presa e a lista rolando, créditos) e About
 * da Berriel (bloco com links, lista grande com um item aceso, tabela).
 */
const COPY = {
  pt: {
    label: "Sobre · Drope Fernandes",
    h1: "Penso até o simples ficar inevitável.",
    portrait: "Retrato · 2026", portraitRole: "Designer multidisciplinar", role: "Role",
    origemL: "01 · Origem",
    origem: "Comecei desenhando marca para a banda do colégio, em 2018, e nunca mais parei. Nasci no design gráfico e fui me expandindo para branding, UI/UX, web e motion, até conseguir levar um projeto inteiro do conceito ao ar.",
    hojeL: "02 · Hoje",
    hojeT: "Construo marcas, interfaces e sites que chegam ao ar funcionando.",
    hojeP: "Tenho uma tese simples: profundidade evita retrabalho. Por isso estratégia, design e código andam no mesmo processo, sem tradução perdida entre fornecedores. Atendo startups, agências e negócios no Brasil e no exterior.",
    conversar: "Vamos conversar",
    caminhoL: "03 · O caminho", caminhoT: "Sete anos, quatro marcos.",
    marcos: [["2018", "Primeira identidade visual paga", "Sirius Agência"], ["2020", "Dedicação total aos meus projetos", "Saí do estúdio onde trabalhava"], ["2022", "Primeiro projeto fora do Brasil", "Bada Bing, em Dubai"], ["2024", "Atendimento internacional, de casa", "Senador Firmino, MG, até hoje"]],
    moveL: "04 · O que me move", moveFix: "O que me move é ver",
    move: ["um briefing virar direção", "uma marca se explicar sozinha", "um site abrir rápido", "o detalhe que ninguém pediu", "o cliente voltar para o segundo projeto", "a ideia chegar ao ar."],
    valoresL: "05 · Valores",
    valores: ["Profundidade", "Compromisso", "Excelência", "Resiliência", "Inovação", "Dedicação", "Determinação"],
    numerosL: "06 · Em números",
    numeros: [["Anos de ofício", "Desde 2018, do design gráfico ao produto digital", "7"], ["Projetos publicados", "Marcas, sites e produtos digitais", "14"], ["Países atendidos", "Brasil, Emirados Árabes e Portugal", "3"], ["Clientes que voltam", "Fazem um segundo projeto comigo", "82%"], ["Disciplinas, um processo", "Branding, web design, direção de arte e motion design", "4"]],
    creditosL: "07 · Créditos",
    faco: "Faço", opero: "Também opero", fora: "Fora do Figma", ouvindo: "Ouvindo", lendo: "Lendo", aprendendo: "Aprendendo", onde: "De onde crio",
    facoList: ["Branding", "Web design", "Direção de arte", "Motion design"],
    operoList: ["Design systems e tokens", "Front-end em Next.js", "Copywriting", "Matte painting"],
    trabalhos: "Ver todos os trabalhos",
  },
  en: {
    label: "About · Drope Fernandes",
    h1: "I think until the simple becomes inevitable.",
    portrait: "Portrait · 2026", portraitRole: "Multidisciplinary designer", role: "Scroll",
    origemL: "01 · Origin",
    origem: "I started drawing a logo for my school band in 2018 and never stopped. I was born in graphic design and kept expanding into branding, UI/UX, web and motion, until I could take a whole project from concept to launch.",
    hojeL: "02 · Today",
    hojeT: "I build brands, interfaces and websites that launch working.",
    hojeP: "I have a simple thesis: depth prevents rework. That's why strategy, design and code run in the same process, with nothing lost in translation between vendors. I work with startups, agencies and businesses in Brazil and abroad.",
    conversar: "Let's talk",
    caminhoL: "03 · The path", caminhoT: "Seven years, four milestones.",
    marcos: [["2018", "First paid visual identity", "Sirius Agência"], ["2020", "Full dedication to my own projects", "I left the studio I worked at"], ["2022", "First project outside Brazil", "Bada Bing, in Dubai"], ["2024", "International clients, from home", "Senador Firmino, Brazil, to this day"]],
    moveL: "04 · What moves me", moveFix: "What moves me is seeing",
    move: ["a brief become direction", "a brand explain itself", "a website load fast", "the detail nobody asked for", "a client come back for a second project", "an idea reach launch."],
    valoresL: "05 · Values",
    valores: ["Depth", "Commitment", "Excellence", "Resilience", "Innovation", "Dedication", "Determination"],
    numerosL: "06 · In numbers",
    numeros: [["Years in the craft", "Since 2018, from graphic design to digital product", "7"], ["Published projects", "Brands, websites and digital products", "14"], ["Countries served", "Brazil, United Arab Emirates and Portugal", "3"], ["Returning clients", "Do a second project with me", "82%"], ["Disciplines, one process", "Branding, web design, art direction and motion", "4"]],
    creditosL: "07 · Credits",
    faco: "I do", opero: "I also run", fora: "Outside Figma", ouvindo: "Listening to", lendo: "Reading", aprendendo: "Learning", onde: "Where I create",
    facoList: ["Branding", "Web design", "Art direction", "Motion & graphics"],
    operoList: ["Design systems and tokens", "Front-end in Next.js", "Copywriting", "Matte painting"],
    trabalhos: "See all work",
  },
};

function Corners({ className }: { className?: string }) {
  return (
    <>
      {[["-left-3 -top-3", "M0 16V0h16"], ["-right-3 -top-3", "M0 0h16v16"], ["-bottom-3 -left-3", "M0 0v16h16"], ["-bottom-3 -right-3", "M16 0v16H0"]].map(([pos, d]) => (
        <svg key={pos} aria-hidden width="16" height="16" viewBox="0 0 16 16" className={cn("absolute text-fg-strong", pos, className)} fill="none" stroke="currentColor" strokeWidth="1.5"><path d={d} /></svg>
      ))}
    </>
  );
}

function MoveItem({ text, i, p, last }: { text: string; i: number; p: MotionValue<number>; last: boolean }) {
  // Só a frase na linha de leitura fica nítida (pedido do Pedro, 25/11): a de baixo
  // aparece bem apagada e desfocada, e a que sai por cima some desfocando.
  const opacity = useTransform(p, (v) => {
    const d = i - v;
    if (d < -0.6) return 0;
    if (d < 0) return 1 + d * 1.6;
    if (d < 0.3) return 1;
    if (d < 0.7) return 1 - ((d - 0.3) / 0.4) * 0.85;
    if (d < 1.6) return 0.15;
    if (d < 2.2) return 0.15 * (1 - (d - 1.6) / 0.6);
    return 0;
  });
  const filter = useTransform(p, (v) => {
    const d = i - v;
    const b = d < 0 ? Math.min(12, -d * 16) : Math.min(18, Math.max(0, d - 0.3) * 24);
    return `blur(${b}px)`;
  });
  return (
    <motion.span style={{ opacity, filter }} className={cn("block pb-[0.08em]", last ? "text-ink-50" : "text-ink-200")}>
      {text}
    </motion.span>
  );
}

/** Lista que sobe sob a frase presa: mede o topo de cada item (frases podem quebrar em duas linhas). */
function MoveList({ items, p }: { items: string[]; p: MotionValue<number> }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [tops, setTops] = useState<number[]>([]);
  useLayoutEffect(() => {
    const measure = () => { const el = ref.current; if (el) setTops(Array.from(el.children).map((c) => (c as HTMLElement).offsetTop)); };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [items]);
  const y = useTransform(p, (v) => {
    if (!tops.length) return 0;
    const a = Math.floor(v), b = Math.min(tops.length - 1, a + 1), f = v - a;
    return -((tops[a] ?? 0) + ((tops[b] ?? 0) - (tops[a] ?? 0)) * f);
  });
  return (
    <motion.span ref={ref} style={{ y }} className="block">
      {items.map((m, i) => <MoveItem key={m} text={m} i={i} p={p} last={i === items.length - 1} />)}
    </motion.span>
  );
}

function WhatMovesMe() {
  const { locale } = useLocale();
  const c = COPY[locale];
  const reduce = useReducedMotionSafe();
  const ref = useRef<HTMLDivElement>(null);
  const n = c.move.length;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useTransform(scrollYProgress, [0.05, 0.9], [0, n - 1], { clamp: true });
  if (reduce) {
    return (
      <section aria-labelledby="move" className="bg-ink-900 py-24 text-center text-ink-50">
        <div className="rb-container">
          <p className="t-label text-ink-200">{c.moveL}</p>
          <h2 id="move" className="t-hero mt-4">{c.moveFix}</h2>
          <ul className="t-hero text-ink-200">{c.move.map((m) => <li key={m}>{m}</li>)}</ul>
        </div>
      </section>
    );
  }
  return (
    <section aria-labelledby="move" ref={ref} className="relative bg-ink-900 text-ink-50" style={{ height: `${n * 55 + 60}vh` }}>
      <div className="sticky top-0 flex h-[100svh] flex-col items-center justify-center overflow-hidden px-6 text-center">
        <p className="t-label text-ink-200">{c.moveL}</p>
        <h2 id="move" className="t-hero mt-4 max-w-[1100px] [text-wrap:balance]">{c.moveFix}</h2>
        <p className="t-hero relative h-[4.6em] w-full max-w-[1200px] overflow-hidden" aria-label={c.move.join(", ")}>
          <MoveList items={c.move} p={p} />
        </p>
      </div>
    </section>
  );
}

function Values() {
  const { locale } = useLocale();
  const c = COPY[locale];
  const ref = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.75", "end 0.35"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => setActive(Math.min(c.valores.length - 1, Math.max(0, Math.floor(v * c.valores.length)))));
  return (
    <section aria-labelledby="valores" className="bg-bg">
      <div className="rb-container grid gap-6 py-20 lg:grid-cols-[360px_1fr] lg:py-[200px]">
        <Label as="h2" className="lg:pt-3"><span id="valores">{c.valoresL}</span></Label>
        <ul ref={ref}>
          {c.valores.map((v, i) => (
            <li key={v} className="flex items-baseline justify-between gap-4">
              <span className={cn("t-h1 transition-colors duration-500", i === active ? "text-fg-strong" : "text-ink-200 dark:text-ink-700")}>{v}</span>
              <span className="t-label text-ink-400">{String(i + 1).padStart(2, "0")}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AboutPage() {
  const { locale } = useLocale();
  const c = COPY[locale];
  return (
    <>
      {/* 01 Abertura */}
      <section className="bg-bg pt-28 lg:pt-44">
        <div className="rb-container grid items-center gap-12 lg:grid-cols-[1fr_480px] lg:gap-20">
          <div>
            <LineReveal><Label>{c.label}</Label></LineReveal>
            <Reveal as="h1" delay={0.08} className="t-h1 mt-3 max-w-[700px] text-fg-strong lg:mt-5">{c.h1}</Reveal>
          </div>
          <figure className="relative mx-2 lg:mx-0">
            {/* Só o retrato abre; as guias dos cantos ficam paradas */}
            <ImageReveal radius={8} delay={0.15} className="relative aspect-[4/5] overflow-hidden rounded-lg">
              <Image quality={90} src="/rb/portrait.jpg" alt={locale === "pt" ? "Drope Fernandes sentado numa poltrona de couro" : "Drope Fernandes sitting in a leather armchair"} fill priority sizes="(min-width: 1024px) 480px, 100vw" className="object-cover" />
            </ImageReveal>
            <Corners />
            <Reveal as="figcaption" y={12} delay={0.4} className="t-label mt-6 flex justify-between text-ink-400">
              <span>{c.portrait}</span><span>{c.portraitRole}</span>
            </Reveal>
          </figure>
        </div>
        <Reveal as="a" y={12} delay={0.5} href="#origem" className="t-label mx-auto mt-12 hidden w-fit items-center gap-2 text-ink-400 hover:text-fg-strong lg:flex">
          {c.role} <span className="rb-bob-y"><Icon d={ICONS.arrowDown} size={14} /></span>
        </Reveal>
      </section>

      {/* 02 Origem e hoje */}
      <section id="origem" className="scroll-mt-24 bg-bg pt-24 lg:pt-[200px]">
        <div className="rb-container">
          <div className="lg:px-[160px]">
            <LineReveal><Label>{c.origemL}</Label></LineReveal>
            <Reveal as="p" delay={0.08} className="t-lead mt-4 max-w-[800px] text-ink-700 dark:text-ink-200 lg:mt-6">{c.origem}</Reveal>
          </div>
          <div className="mt-20 grid gap-6 lg:mt-[200px] lg:grid-cols-[1fr_560px] lg:gap-20">
            <div>
              <LineReveal><Label>{c.hojeL}</Label></LineReveal>
              <Reveal as="h2" delay={0.08} className="t-h1 mt-3 max-w-[620px] text-fg-strong lg:mt-4">{c.hojeT}</Reveal>
            </div>
            <Reveal delay={0.16} className="lg:pt-12">
              <p className="t-small text-ink-700 dark:text-ink-200">{c.hojeP}</p>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-3 lg:mt-8">
                {[["Instagram", SOCIAL.instagram], ["Behance", SOCIAL.behance], ["LinkedIn", SOCIAL.linkedin]].map(([l, h]) => (
                  <li key={l}><a href={h} target="_blank" rel="noreferrer" className="t-label inline-flex items-center gap-1.5 text-fg-strong hover:text-brand">{l} <Icon d={ICONS.arrowUpRight} size={14} /></a></li>
                ))}
                <li><Link href="/agendar" className="t-label inline-flex items-center gap-1.5 text-fg-strong hover:text-brand">{c.conversar} <Icon d={ICONS.arrowUpRight} size={14} /></Link></li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 O caminho */}
      <section aria-labelledby="caminho" className="bg-bg py-24 lg:py-[200px]">
        <div className="rb-container">
          <LineReveal><Label>{c.caminhoL}</Label></LineReveal>
          <LineReveal as="h2" id="caminho" delay={0.08} className="t-h2 mt-3 text-fg-strong lg:mt-4">{c.caminhoT}</LineReveal>
          <RevealGroup as="ol" stagger={0.1} className="mt-8 grid gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-6">
            {c.marcos.map(([y, e, x], i) => (
              <Reveal as="li" key={y} className="border-t border-ink-100 pt-4 dark:border-ink-700 lg:pt-6">
                <LineReveal as="p" className={cn("t-h1", i === c.marcos.length - 1 ? "text-brand" : "text-fg-strong")}>{y}</LineReveal>
                <p className="t-lead mt-2 text-fg-strong lg:mt-4">{e}</p>
                <p className="t-small mt-1 text-ink-400 lg:mt-2">{x}</p>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <WhatMovesMe />
      <Values />

      {/* 06 Em números */}
      <section aria-labelledby="numeros" className="bg-bg pb-20 lg:pb-[200px]">
        <div className="rb-container grid gap-6 lg:grid-cols-[360px_1fr]">
          <Reveal y={16}><Label as="h2" className="lg:pt-6"><span id="numeros">{c.numerosL}</span></Label></Reveal>
          <RevealGroup as="dl" stagger={0.08} className="border-t border-ink-100 dark:border-ink-700">
            {c.numeros.map(([a, b, n]) => (
              <Reveal key={a} y={20} className="grid grid-cols-[1fr_auto] items-start gap-x-6 gap-y-1 border-b border-ink-100 py-4 dark:border-ink-700 lg:grid-cols-[300px_1fr_auto] lg:py-6">
                <dt className="t-lead text-fg-strong">{a}</dt>
                <LineReveal as="dd" className="t-h2 row-span-2 text-right text-fg-strong lg:order-last lg:row-span-1">{n}</LineReveal>
                <dd className="t-small text-ink-400 lg:pt-1">{b}</dd>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* 07 Créditos */}
      <section aria-labelledby="creditos" className="bg-bg pb-24 lg:pb-[200px]">
        <div className="rb-container">
          <LineReveal as="p" className="t-label text-center text-ink-400">{c.creditosL}</LineReveal>
          <LineReveal as="h2" id="creditos" delay={0.08} className="t-display mt-3 text-center text-fg-strong max-sm:text-[48px] lg:mt-4">Drope Fernandes</LineReveal>
          <RevealGroup as="dl" stagger={0.07} className="mx-auto mt-12 max-w-[760px] space-y-7 lg:mt-24 lg:space-y-10">
            {([
              [c.faco, c.facoList], [c.opero, c.operoList], [c.fora, AGORA.hobbies[locale]],
              [c.ouvindo, [AGORA.ouvindo[locale]]], [c.lendo, [AGORA.lendo[locale]]], [c.aprendendo, [AGORA.aprendendo[locale]]], [c.onde, ["Senador Firmino, MG"]],
            ] as [string, string[]][]).map(([k, vs]) => (
              <Reveal key={k} y={20} className="grid grid-cols-[120px_1fr] gap-4 lg:grid-cols-[1fr_1fr] lg:gap-10">
                <dt className="t-label pt-1 text-right text-ink-400">{k}</dt>
                <dd className="t-lead text-fg-strong">{vs.map((v, i) => <span key={i} className="block">{v}</span>)}</dd>
              </Reveal>
            ))}
          </RevealGroup>
          <Reveal className="mt-14 flex justify-center lg:mt-20">
            <BrandButton href="/projetos" variant="contorno" className="w-full sm:w-auto">{c.trabalhos}</BrandButton>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
