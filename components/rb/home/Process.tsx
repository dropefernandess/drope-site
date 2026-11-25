"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, type MotionValue } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Icon, ICONS } from "@/components/rb/ui";

/**
 * Como funciona — Figma "06 Como funciona" (referência Quintal, "Etapas do
 * processo"). Coluna da esquerda presa; trilho no meio com o marcador
 * vermelho que acompanha a rolagem; cartões das etapas à direita, que
 * empilham: cada um gruda no mesmo ponto e o seguinte sobe por cima dele
 * (os de baixo recuam um pouco e escurecem, deixando a aba aparecendo).
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

/** Faixa superior do cartão (pt-3) — onde mora a aba diagonal. */
const TAB = 12;
/** Recuo de cada cartão coberto: escala perdida e quanto a aba fica de fora. */
const DEPTH = { lg: { scale: 0.035, peek: 10 }, sm: { scale: 0.03, peek: 6 } };

type Stack = {
  /** topo (px) em que os cartões grudam */
  top: number;
  /** altura de um cartão (todos iguais, grid auto-rows-fr) */
  h: number;
  /** empilha só se o cartão couber inteiro na tela abaixo do topo */
  on: boolean;
  lg: boolean;
};

export function Process({ id = "como-funciona" }: { id?: string }) {
  const { locale } = useLocale();
  const c = COPY[locale];
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [stack, setStack] = useState<Stack>({ top: 160, h: 480, on: true, lg: true });

  useEffect(() => {
    const col = ref.current;
    if (!col) return;
    const measure = () => {
      const lg = window.matchMedia("(min-width: 1024px)").matches;
      const first = col.firstElementChild as HTMLElement | null;
      const h = first?.offsetHeight ?? 480;
      const vh = window.innerHeight;
      // desktop: alinhado ao topo da coluna da esquerda (160); celular: logo
      // abaixo da barra fixa (72). Em telas baixas sobe até o mínimo.
      const [min, max] = lg ? [96, 160] : [88, 100];
      const top = Math.round(Math.min(max, Math.max(min, vh - h - 24)));
      const on = top + h <= vh - 8;
      setStack((s) => (s.top === top && s.h === h && s.on === on && s.lg === lg ? s : { top, h, on, lg }));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(col);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  // 0 → primeiro cartão acabou de grudar; 1 → o último chegou na pilha.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: stack.on ? [`start ${stack.top}px` as const, `end ${stack.top + stack.h}px` as const] : ["start 0.7", "end 0.7"],
  });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });
  const rp = reduce ? scrollYProgress : smooth;
  // o marcador (44px) corre dentro do trilho: topo do 1º cartão → base do último
  const top = useTransform(rp, (v) => `calc((100% - 44px) * ${v})`);
  const fill = useTransform(rp, (v) => `calc((100% - 44px) * ${v} + 22px)`);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-titulo`}
      className="bg-ink-900 text-ink-50"
      style={{ "--rb-stack-top": `${stack.top}px` } as CSSProperties}
    >
      <div className="rb-container py-16 lg:py-40">
        <div className="lg:grid lg:grid-cols-[560px_80px_1fr] lg:gap-x-10">
          <div className="lg:sticky lg:top-[var(--rb-stack-top,160px)] lg:self-start">
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
            {/* trilho preso ao lado da pilha, da altura de um cartão */}
            <div
              data-stack-rail
              className={stack.on ? "sticky" : "absolute inset-0"}
              style={stack.on ? { top: stack.top + TAB, height: stack.h - TAB, marginTop: TAB } : undefined}
            >
              <motion.div className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 origin-top bg-brand" style={{ height: fill }} />
              <motion.div data-stack-marker className="absolute left-1/2 grid h-11 w-[22px] -translate-x-1/2 place-items-center rounded-full bg-brand text-ink-50" style={{ top }}>
                <Icon d={ICONS.chevronDown} size={14} />
              </motion.div>
            </div>
          </div>
          <div ref={ref} className="mt-12 grid auto-rows-fr gap-10 lg:mt-0 lg:gap-12">
            {MOVES.map((m, i) => (
              <StackCard key={m.n} m={m} t={m[locale]} i={i} n={MOVES.length} progress={scrollYProgress} stack={stack} reduce={reduce} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StackCard({
  m, t, i, n, progress, stack, reduce,
}: {
  m: (typeof MOVES)[number];
  t: (typeof MOVES)[number]["pt"];
  i: number;
  n: number;
  progress: MotionValue<number>;
  stack: Stack;
  reduce: boolean;
}) {
  const k = stack.lg ? DEPTH.lg : DEPTH.sm;
  // quantos cartões já estão por cima deste (0 → n-1-i), contínuo
  const depth = useTransform(progress, (v) => (stack.on ? Math.min(Math.max(v * (n - 1) - i, 0), n - 1 - i) : 0));
  const scale = useTransform(depth, (d) => (reduce ? 1 : 1 - d * k.scale));
  const y = useTransform(depth, (d) => (reduce ? 0 : -d * k.peek));
  const dim = useTransform(depth, (d) => Math.min(d * 0.3, 0.6));
  return (
    <article className={stack.on ? "flex flex-col" : "relative flex flex-col"} style={stack.on ? { position: "sticky", top: stack.top } : undefined}>
      <motion.div className="relative flex flex-1 flex-col pt-3" style={{ scale, y, originX: 0.5, originY: 0 }}>
        <svg aria-hidden viewBox="0 0 300 22" className="absolute right-4 top-0 h-[18px] w-[180px] text-brand lg:right-5 lg:h-[22px] lg:w-[300px]" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 22 16 0h284v22Z" />
          <motion.path d="M0 22 16 0h284v22Z" className="fill-ink-900" style={{ opacity: dim }} />
        </svg>
        <div className="relative flex flex-1 flex-col overflow-hidden rounded-2xl border border-ink-700 bg-ink-900 p-2">
          <div className="relative aspect-[584/220] overflow-hidden rounded-[10px] bg-ink-700 max-lg:aspect-[326/140]">
            <Image quality={90} src={m.img} alt="" fill sizes="(min-width: 1024px) 584px, 100vw" className="object-cover" />
          </div>
          <div className="flex flex-1 flex-col px-2 pb-4 pt-5 lg:px-4 lg:pb-4 lg:pt-6">
            <div className="flex flex-col items-start gap-2.5 lg:flex-row lg:items-center lg:gap-3.5">
              <span className="rounded-pill bg-brand px-3 py-1 text-lg font-semibold leading-[22px] text-ink-50">{m.n}</span>
              <h3 className="t-h3 text-brand">{t.t}</h3>
            </div>
            <p className="t-small mt-3 text-ink-200 lg:mt-5">{t.d}</p>
            <div className="mt-auto">
              <span className="mt-4 inline-flex items-center gap-2 rounded-pill border border-ink-700 px-3 py-1.5 text-sm font-medium text-ink-200 lg:mt-5">
                <Icon d={ICONS.clock} size={14} /> {t.c}
              </span>
            </div>
          </div>
          {/* escurece o cartão à medida que outro cobre ele */}
          <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-ink-900" style={{ opacity: dim }} />
        </div>
      </motion.div>
    </article>
  );
}
