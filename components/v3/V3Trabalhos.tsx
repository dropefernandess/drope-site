"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { CASES } from "./data";

/**
 * V3Trabalhos — A TRAVA. O único momento de espetáculo do site.
 *
 * Pin feito com `position: sticky` (CSS), não com ScrollTrigger.pin:
 * o pin do GSAP reescreve o DOM em wrappers e é a fonte clássica de
 * salto de layout quando há Lenis no meio. Sticky é à prova de bala;
 * o GSAP entra só pro scrub, que é onde ele é insubstituível.
 *
 * Cada case se ENCAIXA enquanto os metadados se resolvem ao lado —
 * meia tela por projeto. No leque da versão antiga, sete miniaturas
 * de 220px giradas não deixavam ler nada.
 */
export function V3Trabalhos() {
  const wrap = useRef<HTMLElement>(null);
  const metas = useRef<HTMLDivElement[]>([]);
  const shots = useRef<HTMLDivElement[]>([]);
  const rail = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const n = CASES.length;

    const setMeta = metas.current.map((m) => ({
      opacity: gsap.quickSetter(m, "opacity") as (v: number) => void,
      y: gsap.quickSetter(m, "y", "px") as (v: number) => void,
    }));
    const setShot = shots.current.map((s) => ({
      opacity: gsap.quickSetter(s, "opacity") as (v: number) => void,
      y: gsap.quickSetter(s, "yPercent") as (v: number) => void,
      scale: gsap.quickSetter(s, "scale") as (v: number) => void,
    }));
    const setRail = rail.current
      ? (gsap.quickSetter(rail.current, "scaleY") as (v: number) => void)
      : null;

    const apply = (progress: number) => {
      const t = progress * (n - 1);
      for (let i = 0; i < n; i++) {
        const d = t - i;
        const a = Math.min(1, Math.abs(d));
        const o = 1 - a;
        setMeta[i]?.opacity(o);
        setMeta[i]?.y(d * -28);
        setShot[i]?.opacity(o);
        setShot[i]?.y(d * -7);
        setShot[i]?.scale(1 - a * 0.05);
      }
      setRail?.(progress);
    };

    apply(0);

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top top",
      end: "bottom bottom",
      scrub: true,
      onUpdate: (self) => apply(self.progress),
    });

    return () => st.kill();
  }, []);

  return (
    <section
      id="trabalhos"
      ref={wrap}
      style={{ height: `${CASES.length * 92}vh`, scrollMarginTop: "0px" }}
    >
      <div className="sticky top-0 flex h-svh flex-col justify-center overflow-hidden">
        <div className="v3-wrap">
          <div className="v3-grid items-center">
            {/* ===== METADADOS (crossfade) ===== */}
            <div className="col-span-4 md:col-span-8 lg:col-span-4">
              <p className="v3-mono">03 — Trabalhos selecionados</p>

              <div className="relative mt-6 h-[280px]">
                {CASES.map((c, i) => (
                  <div
                    key={c.slug}
                    ref={(node) => {
                      if (node) metas.current[i] = node;
                    }}
                    className="absolute inset-x-0 top-0"
                  >
                    <h3 className="v3-h1">{c.title}</h3>
                    <p className="v3-small mt-4 text-[var(--n-500)]">
                      {c.servico} · {c.ano}
                    </p>
                    <p className="v3-h3 mt-8 text-[var(--sage-300)]">{c.metrica}</p>
                    <p className="mt-2 text-[13px] italic text-[var(--n-500)]">{c.hedge}</p>
                    <Link
                      href={`/projetos/${c.slug}`}
                      className="v3-btn v3-btn--ghost mt-8 !min-h-0 !px-5 !py-2.5 !text-sm"
                    >
                      Ver o case
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* ===== RÉGUA DE PROGRESSO ===== */}
            <div className="hidden lg:col-span-1 lg:flex lg:justify-center">
              <span className="relative h-[300px] w-px bg-[var(--line)]">
                <span
                  ref={rail}
                  className="absolute inset-0 block origin-top bg-[var(--sage-400)]"
                />
              </span>
            </div>

            {/* ===== CASES ===== */}
            <div className="col-span-4 mt-12 md:col-span-8 lg:col-span-7 lg:mt-0">
              <div className="relative aspect-[4/3] w-full">
                {CASES.map((c, i) => (
                  <div
                    key={c.slug}
                    ref={(node) => {
                      if (node) shots.current[i] = node;
                    }}
                    className="v3-case"
                  >
                    <Image
                      src={c.img}
                      alt={`Case ${c.title}`}
                      fill
                      sizes="(min-width: 1024px) 58vw, 100vw"
                      priority={i === 0}
                      loading={i === 0 ? undefined : "lazy"}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
