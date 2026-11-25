"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { RB_PROJECTS } from "@/content/rb/projects";
import { EASE, MaskWord as W, useIntroReady, useReducedMotionSafe } from "@/components/rb/motion";

/**
 * Hero — Figma "01 Hero". Referências: Zara Miller (frase centralizada com
 * miniaturas entre as palavras) e Noah Miles (rastro de imagens no mouse).
 * As miniaturas trocam a cada 2 s; o rastro só aparece com mouse e sem
 * "reduzir movimento".
 *
 * Movimento (referência Peu): as palavras sobem de trás de uma máscara no
 * carregamento, as miniaturas abrem do centro, e o hero fica preso no topo
 * enquanto "Trabalhos selecionados" desliza por cima (o embrulho em
 * app/page.tsx limita o sticky a essas duas seções).
 */

const SLOTS = [
  ["/rb/hero/go-trace.jpg", "/rb/covers/sirius.jpg", "/rb/covers/myko.jpg"],
  ["/rb/hero/aroeira.jpg", "/rb/covers/espaco-equilibrio.jpg", "/rb/covers/bosque-do-sol.jpg"],
  ["/rb/hero/marisco.jpg", "/rb/covers/use-duali.jpg", "/rb/covers/financas-ja.jpg"],
];

const THUMB_IN: Variants = {
  hidden: { clipPath: "inset(0% 50% 0% 50% round 0.09em)" },
  show: { clipPath: "inset(0% 0% 0% 0% round 0.09em)", transition: { duration: 1, ease: EASE } },
};
const THUMB_STATIC: Variants = {
  hidden: { clipPath: "inset(0% 0% 0% 0% round 0.09em)" },
  show: { clipPath: "inset(0% 0% 0% 0% round 0.09em)", transition: { duration: 0 } },
};

function Thumb({ slot, tick }: { slot: number; tick: number }) {
  const reduced = useReducedMotionSafe();
  const imgs = SLOTS[slot];
  const active = Math.floor((tick + slot) / 1) % imgs.length;
  return (
    <motion.span data-rb-m="" variants={reduced ? THUMB_STATIC : THUMB_IN} aria-hidden className="relative mx-[0.1em] inline-block h-[0.93em] w-[1.68em] overflow-hidden rounded-[0.09em] align-middle [vertical-align:-0.12em]">
      {imgs.map((src, i) => (
        <Image key={src} src={src} alt="" fill sizes="160px" priority={i === 0} className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`} />
      ))}
    </motion.span>
  );
}

function Symbol() {
  return (
    <span aria-hidden className="relative mx-[0.1em] inline-block h-[0.8em] w-[0.82em] [vertical-align:-0.08em]">
      <Image src="/brand/icone-light.svg" alt="" fill sizes="80px" />
    </span>
  );
}

/** Mouse em traço com a rodinha descendo em loop (CSS rb-wheel, desliga em "reduzir movimento"). */
function ScrollMouse() {
  return (
    <svg width="20" height="30" viewBox="0 0 20 30" fill="none" stroke="currentColor" aria-hidden>
      <rect x="0.75" y="0.75" width="18.5" height="28.5" rx="9.25" strokeWidth="1.5" />
      <line x1="10" y1="7" x2="10" y2="11" strokeWidth="2" strokeLinecap="round" className="rb-wheel" />
    </svg>
  );
}

const FADE_UP: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};
const FADE_STATIC: Variants = {
  hidden: { opacity: 1, y: 0 },
  show: { opacity: 1, y: 0, transition: { duration: 0 } },
};

type Trail = { id: number; x: number; y: number; src: string };
const TRAIL = RB_PROJECTS.map((p) => p.cover);

export function Hero() {
  const { locale } = useLocale();
  const [tick, setTick] = useState(0);
  const [trail, setTrail] = useState<Trail[]>([]);
  const last = useRef({ x: -999, y: -999, n: 0 });
  const enabled = useRef(false);
  const reduced = useReducedMotionSafe();
  const ready = useIntroReady();
  const intro = ready || reduced ? "show" : "hidden";

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabled.current = !reduce && window.matchMedia("(pointer: fine)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2000);
    return () => window.clearInterval(id);
  }, []);

  /* Sticky: se o hero for mais alto que a tela, ele rola até o fim antes de prender. */
  const ref = useRef<HTMLElement>(null);
  const [top, setTop] = useState(0);
  const geo = useRef({ start: 0, h: 900, reduced: false });
  geo.current.reduced = reduced;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => {
      const h = el.offsetHeight;
      const t = Math.min(0, window.innerHeight - h);
      geo.current.h = h;
      geo.current.start = -t;
      setTop(t);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => { ro.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  /* Enquanto a próxima seção cobre o hero, a frase recua de leve. */
  const { scrollY } = useScroll();
  const covered = useTransform(scrollY, (v) => {
    const g = geo.current;
    return g.reduced ? 0 : Math.min(1, Math.max(0, (v - g.start) / g.h));
  });
  const contentScale = useTransform(covered, [0, 1], [1, 0.93]);
  const contentOpacity = useTransform(covered, [0, 1], [1, 0.25]);
  // A dica some quando os trabalhos começam a cobrir o hero (em telas baixas, depois que ele prende).
  const hintOpacity = useTransform(scrollY, (v) => {
    const g = geo.current;
    return g.reduced ? 1 : Math.min(1, Math.max(0, 1 - (v - g.start) / 180));
  });

  const onMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    if (!enabled.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const dx = x - last.current.x, dy = y - last.current.y;
    if (dx * dx + dy * dy < 110 * 110) return;
    const n = last.current.n++;
    last.current.x = x; last.current.y = y;
    const item = { id: n, x, y, src: TRAIL[n % TRAIL.length] };
    setTrail((t) => [...t.slice(-6), item]);
    window.setTimeout(() => setTrail((t) => t.filter((i) => i.id !== n)), 900);
  }, []);

  const label = locale === "pt" ? "Role para ver os trabalhos" : "Scroll to see the work";

  return (
    <section ref={ref} onMouseMove={onMove} style={{ top }} className="sticky top-0 z-0 flex min-h-[100svh] flex-col overflow-hidden bg-bg lg:min-h-[900px]">
      <div aria-hidden className="rb-grid-bg absolute inset-0" />
      <motion.div style={{ scale: contentScale, opacity: contentOpacity }} className="relative z-10 flex flex-1 items-center justify-center px-6 pb-28 pt-32 lg:px-20">
        <motion.h1
          initial="hidden"
          animate={intro}
          variants={{ hidden: {}, show: { transition: reduced ? { duration: 0 } : { staggerChildren: 0.045, delayChildren: 0.05 } } }}
          className="t-hero max-w-[1180px] text-center text-fg-strong max-lg:[text-wrap:balance]"
        >
          {locale === "pt" ? (
            <>
              <W>Designer</W> <Thumb slot={0} tick={tick} /> <W>multidisciplinar</W> <W>levando</W> <W><Symbol /></W> <W>marcas</W> <W>e</W> <W>sites</W> <Thumb slot={1} tick={tick} /> <W>do</W> <Thumb slot={2} tick={tick} />{" "}
              <span className="t-serif t-hero-serif text-brand"><W>conceito</W> <W>ao</W> <W>ar.</W></span>
            </>
          ) : (
            <>
              <W>Multidisciplinary</W> <Thumb slot={0} tick={tick} /> <W>designer</W> <W>taking</W> <W><Symbol /></W> <W>brands</W> <W>and</W> <W>websites</W> <Thumb slot={1} tick={tick} /> <W>from</W> <Thumb slot={2} tick={tick} />{" "}
              <span className="t-serif t-hero-serif text-brand"><W>concept</W> <W>to</W> <W>launch.</W></span>
            </>
          )}
        </motion.h1>
      </motion.div>
      <motion.a
        href="#trabalhos"
        initial="hidden"
        animate={intro}
        variants={{ hidden: {}, show: { transition: reduced ? { duration: 0 } : { staggerChildren: 0.1, delayChildren: 0.75 } } }}
        style={{ opacity: hintOpacity }}
        className="t-label absolute inset-x-0 bottom-12 z-10 mx-auto flex w-fit flex-col items-center gap-3 text-ink-700 transition-colors hover:text-fg-strong dark:text-ink-200"
      >
        <motion.span data-rb-m="" variants={reduced ? FADE_STATIC : FADE_UP} className="block">
          <ScrollMouse />
        </motion.span>
        <motion.span data-rb-m="" variants={reduced ? FADE_STATIC : FADE_UP} className="block">
          {label}
        </motion.span>
      </motion.a>
      {trail.map((t) => (
        <span
          key={t.id}
          aria-hidden
          className="pointer-events-none absolute z-20 h-[150px] w-[200px] overflow-hidden rounded-lg shadow-2xl [animation:rb-trail_900ms_cubic-bezier(.22,1,.36,1)_forwards]"
          style={{ left: t.x - 100, top: t.y - 75 }}
        >
          <Image src={t.src} alt="" fill sizes="200px" className="object-cover" />
        </span>
      ))}
    </section>
  );
}
