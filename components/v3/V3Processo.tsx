"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROCESSO } from "./data";

/**
 * V3Processo — a régua que se preenche em sage conforme o scroll.
 *
 * Aqui a cor tem função inequívoca: ela É o progresso. É o exemplo
 * canônico de "motion explica, não enfeita" — se você tirar a animação,
 * a informação se perde, o que é o teste de que ela merecia existir.
 */
export function V3Processo() {
  const wrap = useRef<HTMLElement>(null);
  const fill = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    const bar = fill.current;
    if (!el || !bar) return;

    gsap.registerPlugin(ScrollTrigger);
    const set = gsap.quickSetter(bar, "scaleX") as (v: number) => void;
    set(0);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 72%",
      end: "bottom 78%",
      scrub: true,
      onUpdate: (self) => set(self.progress),
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="processo"
      ref={wrap}
      className="v3-section v3-wrap"
      style={{ scrollMarginTop: "24px" }}
    >
      <div className="v3-grid">
        <div className="col-span-4 md:col-span-8 lg:col-span-7">
          <p className="v3-mono" data-reveal>
            04 — Como funciona
          </p>
          <h2 className="v3-h1 mt-5" data-reveal>
            Do brief ao deploy,{" "}
            <em className="v3-em v3-em--sage">sem ruído.</em>
          </h2>
        </div>
      </div>

      {/* A régua */}
      <div className="relative mt-16 h-px w-full bg-[var(--line)] md:mt-20">
        <span
          ref={fill}
          className="absolute inset-0 block origin-left bg-[var(--sage-400)]"
        />
      </div>

      <ol className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {PROCESSO.map((p) => (
          <li key={p.n} data-reveal>
            <span className="v3-num v3-mono !text-[13px]">{p.n}</span>
            <h3 className="v3-h3 mt-4">{p.title}</h3>
            <p className="v3-small mt-3 text-[var(--n-500)]">{p.desc}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
