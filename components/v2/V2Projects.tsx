"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { V2Btn } from "./V2Btn";
import { useViewport } from "./useViewport";
import { CASES, FAN_SLOTS } from "./v2-cases";

/**
 * V2Projects — coreografia Pallet Ross: LEQUE → PILHA → ESCADA,
 * scroll-linked (voltar desfaz). Seção 340vh + viewport sticky.
 * Tags @ ancoradas na MESMA matemática da escada (nada de % no olho).
 * Mobile/reduced-motion: strip horizontal com scroll-snap.
 */

const P = { fanEnd: 0.26, stackAt: 0.5, slideAt: 0.68, ladderAt: 0.96 };

/* Geometria da escada — compartilhada entre cards e tags */
function ladderPos(i: number, cw: number, vp: { w: number; h: number }) {
  return {
    x: vp.w * 0.06 + (i - 3) * cw * 0.66,
    y: -vp.h * 0.06 + (i - 3) * cw * 0.3,
    r: -3 + i * 2,
  };
}

function ChoreoCard({
  c,
  i,
  progress,
  vp,
  cw,
}: {
  c: (typeof CASES)[number];
  i: number;
  progress: MotionValue<number>;
  vp: { w: number; h: number };
  cw: number;
}) {
  const [hovered, setHovered] = useState(false);
  const k = Math.min(1, vp.w / 1500);
  const slot = FAN_SLOTS[i];
  const L = ladderPos(i, cw, vp);

  const x = useTransform(
    progress,
    [0, P.fanEnd, P.stackAt, P.slideAt, P.ladderAt],
    [slot.x * k, slot.x * k, 0, vp.w * 0.06, L.x]
  );
  const y = useTransform(
    progress,
    [0, P.fanEnd, P.stackAt, P.slideAt, P.ladderAt],
    [slot.y * k, slot.y * k, 0, L.y, L.y]
  );
  const rotate = useTransform(
    progress,
    [0, P.fanEnd, P.stackAt, P.ladderAt],
    [slot.r, slot.r, 0, L.r]
  );
  const scale = useTransform(
    progress,
    [0, P.fanEnd, P.stackAt, P.ladderAt],
    [slot.s, slot.s, 1, 1]
  );

  return (
    <motion.div
      data-choreo-card
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
      className="absolute left-1/2 top-1/2"
      style={{ zIndex: hovered ? 30 : slot.z, x: "-50%", y: "-50%" }}
    >
      <motion.div style={{ x, y, rotate, scale }}>
        <Link
          href={`/projetos/${c.slug}`}
          aria-label={`Ver case ${c.title}`}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.25, ease: [0.34, 1.56, 0.64, 1] }}
            className="relative overflow-hidden rounded-[18px] border border-ink-900/10 bg-surface"
            style={{ width: cw, height: cw }}
          >
            <Image src={c.img} alt={c.title} fill sizes="220px" className="object-cover" draggable={false} />
          </motion.div>
        </Link>
      </motion.div>
    </motion.div>
  );
}

export function V2Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const vp = useViewport();
  const reduced = useReducedMotion();
  const cw = Math.max(150, Math.min(210, vp.w * 0.13));

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const titleOpacity = useTransform(scrollYProgress, [0, P.fanEnd, P.stackAt], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [P.fanEnd, P.stackAt], [0, -40]);
  const colOpacity = useTransform(scrollYProgress, [P.slideAt - 0.06, P.ladderAt - 0.12], [0, 1]);
  const colX = useTransform(scrollYProgress, [P.slideAt - 0.06, P.ladderAt - 0.12], [-32, 0]);
  const tagScale = useTransform(scrollYProgress, [0.88, 0.97], [0.6, 1]);
  const tagOpacity = useTransform(scrollYProgress, [0.88, 0.95], [0, 1]);

  /* Tags ancoradas em cards específicos da escada (1 e 5) */
  const t1 = ladderPos(1, cw, vp);
  const t5 = ladderPos(5, cw, vp);

  return (
    <section id="trabalhos" className="bg-bg">
      {/* ===== Mobile: strip horizontal ===== */}
      <div className="px-6 pt-20 md:hidden">
        <p className="label-mono mb-3">
          <span className="text-fg-strong">03</span>
          <span className="mx-3 text-fg-faint">──</span>
          <span>Trabalhos</span>
        </p>
        <h2 className="text-h-1 mb-8 text-fg-strong">Cases que já saíram do forno.</h2>
      </div>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:hidden">
        {CASES.map((c) => (
          <Link
            key={c.slug}
            href={`/projetos/${c.slug}`}
            className="relative aspect-square w-[240px] shrink-0 snap-center overflow-hidden rounded-[18px] border border-ink-900/10 bg-surface"
          >
            <Image src={c.img} alt={c.title} fill sizes="240px" className="object-cover" />
            <span className="absolute bottom-3 left-3 rounded-full bg-ink-900/60 px-3 py-1 text-xs font-semibold text-ink-50 backdrop-blur">
              {c.title}
            </span>
          </Link>
        ))}
      </div>
      <div className="px-6 pb-16 md:hidden">
        <Link href="/projetos" className="text-sm font-semibold text-brand">
          Ver todos os projetos ↗
        </Link>
      </div>

      {/* ===== Desktop: coreografia ===== */}
      <section
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: reduced ? "auto" : "340vh" }}
        aria-label="Seleção de projetos"
      >
        {reduced ? (
          <div className="mx-auto grid max-w-container gap-4 px-12 py-24 md:grid-cols-4">
            {CASES.slice(0, 4).map((c) => (
              <Link key={c.slug} href={`/projetos/${c.slug}`} className="relative aspect-square overflow-hidden rounded-[18px]">
                <Image src={c.img} alt={c.title} fill sizes="25vw" className="object-cover" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="sticky top-0 flex h-screen items-center overflow-hidden">
            {/* Título da fase leque */}
            <motion.div
              style={{ opacity: titleOpacity, y: titleY }}
              className="absolute inset-x-0 top-[13%] z-10 flex flex-col items-center gap-3 text-center"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-faint">
                03 · Trabalhos selecionados
              </p>
              <h2 className="max-w-2xl text-balance text-[clamp(2rem,3.6vw,3.2rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-fg-strong">
                Role e veja o baralho se armar.
              </h2>
            </motion.div>

            {/* Coluna de texto da fase escada */}
            <motion.div
              style={{ opacity: colOpacity, x: colX }}
              className="relative z-10 ml-[6vw] flex w-[420px] flex-col gap-5"
            >
              <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-fg-faint">
                03 · Trabalhos
              </p>
              <h2 className="text-[clamp(2rem,3.4vw,3rem)] font-extrabold leading-[1.05] tracking-[-0.02em] text-fg-strong">
                Branding, sites e produtos{" "}
                <span className="text-brand">num só repertório.</span>
              </h2>
              <p className="max-w-[340px] text-[15px] leading-[1.65] text-fg-strong/55">
                De marca de biscoito a fintech: 13 projetos no ar, cada um com o
                processo inteiro documentado — do conceito ao deploy.
              </p>
              <div className="mt-2">
                <V2Btn href="/projetos" variant="dark">
                  Ver todos os projetos
                </V2Btn>
              </div>
            </motion.div>

            {/* Cards coreografados */}
            {CASES.map((c, i) => (
              <ChoreoCard key={c.slug} c={c} i={i} progress={scrollYProgress} vp={vp} cw={cw} />
            ))}

            {/* Tags @ — ancoradas na geometria da escada */}
            <motion.span
              style={{
                opacity: tagOpacity,
                scale: tagScale,
                position: "absolute",
                left: `calc(50% + ${t1.x - cw * 0.1}px)`,
                top: `calc(50% + ${t1.y - cw * 0.78}px)`,
              }}
              className="z-20 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-brand-fg"
            >
              <span
                aria-hidden
                className="absolute -bottom-2 left-1/2 size-0 -translate-x-1/2 border-x-8 border-t-[10px] border-x-transparent border-t-brand"
              />
              @usedualí
            </motion.span>
            <motion.span
              style={{
                opacity: tagOpacity,
                scale: tagScale,
                position: "absolute",
                left: `calc(50% + ${t5.x + cw * 0.05}px)`,
                top: `calc(50% + ${t5.y - cw * 0.82}px)`,
              }}
              className="z-20 rounded-full bg-ink-900 px-5 py-2 text-sm font-semibold text-ink-50"
            >
              <span
                aria-hidden
                className="absolute -bottom-2 left-5 size-0 border-x-8 border-t-[10px] border-x-transparent border-t-ink-900"
              />
              @moneyfy
            </motion.span>
          </div>
        )}
      </section>
    </section>
  );
}
