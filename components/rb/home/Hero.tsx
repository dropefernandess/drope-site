"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { RB_PROJECTS } from "@/content/rb/projects";

/**
 * Hero — Figma "01 Hero". Referências: Zara Miller (frase centralizada com
 * miniaturas entre as palavras) e Noah Miles (rastro de imagens no mouse).
 * As miniaturas trocam a cada 2 s; o rastro só aparece com mouse e sem
 * "reduzir movimento".
 */

const SLOTS = [
  ["/rb/hero/go-trace.jpg", "/rb/covers/sirius.jpg", "/rb/covers/myko.jpg"],
  ["/rb/hero/aroeira.jpg", "/rb/covers/espaco-equilibrio.jpg", "/rb/covers/bosque-do-sol.jpg"],
  ["/rb/hero/marisco.jpg", "/rb/covers/use-duali.jpg", "/rb/covers/financas-ja.jpg"],
];

function Thumb({ slot, tick }: { slot: number; tick: number }) {
  const imgs = SLOTS[slot];
  const active = Math.floor((tick + slot) / 1) % imgs.length;
  return (
    <span aria-hidden className="relative mx-[0.1em] inline-block h-[0.93em] w-[1.68em] overflow-hidden rounded-[0.09em] align-middle [vertical-align:-0.12em]">
      {imgs.map((src, i) => (
        <Image key={src} src={src} alt="" fill sizes="160px" priority={i === 0} className={`object-cover transition-opacity duration-700 ${i === active ? "opacity-100" : "opacity-0"}`} />
      ))}
    </span>
  );
}

function Symbol() {
  return (
    <span aria-hidden className="relative mx-[0.1em] inline-block h-[0.8em] w-[0.82em] [vertical-align:-0.08em]">
      <Image src="/brand/icone-light.svg" alt="" fill sizes="80px" />
    </span>
  );
}

type Trail = { id: number; x: number; y: number; src: string };
const TRAIL = RB_PROJECTS.map((p) => p.cover);

export function Hero() {
  const { locale } = useLocale();
  const [tick, setTick] = useState(0);
  const [trail, setTrail] = useState<Trail[]>([]);
  const last = useRef({ x: -999, y: -999, n: 0 });
  const enabled = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    enabled.current = !reduce && window.matchMedia("(pointer: fine)").matches;
    if (reduce) return;
    const id = window.setInterval(() => setTick((t) => t + 1), 2000);
    return () => window.clearInterval(id);
  }, []);

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
    <section onMouseMove={onMove} className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg lg:min-h-[900px]">
      <div aria-hidden className="rb-grid-bg absolute inset-0" />
      <div className="relative z-10 flex flex-1 items-center justify-center px-6 pb-28 pt-32 lg:px-20">
        <h1 className="t-hero max-w-[1180px] text-center text-fg-strong max-lg:[text-wrap:balance]">
          {locale === "pt" ? (
            <>
              Designer <Thumb slot={0} tick={tick} /> multidisciplinar levando <Symbol /> marcas e sites <Thumb slot={1} tick={tick} /> do <Thumb slot={2} tick={tick} />{" "}
              <span className="t-serif t-hero-serif text-brand">conceito ao ar.</span>
            </>
          ) : (
            <>
              Multidisciplinary <Thumb slot={0} tick={tick} /> designer taking <Symbol /> brands and websites <Thumb slot={1} tick={tick} /> from <Thumb slot={2} tick={tick} />{" "}
              <span className="t-serif t-hero-serif text-brand">concept to launch.</span>
            </>
          )}
        </h1>
      </div>
      <a href="#trabalhos" className="t-label absolute inset-x-0 bottom-12 z-10 mx-auto w-fit text-ink-700 transition-colors hover:text-fg-strong dark:text-ink-200">
        {label}
      </a>
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
