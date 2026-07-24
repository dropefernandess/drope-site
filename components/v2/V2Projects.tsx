"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LocalLink as Link } from "@/components/i18n/LocalLink";

/**
 * V2Projects — coreografia Pallet Ross adaptada: os covers dos cases
 * entram em LEQUE, colapsam numa PILHA central e abrem em ESCADA
 * diagonal, tudo amarrado ao scroll (voltar o scroll desfaz).
 *
 * Implementação robusta: seção alta (340vh) + viewport sticky interno —
 * nada de lock math no documento. Framer useScroll + useTransform com
 * keyframes por fase. Reduced-motion e mobile caem pra um strip
 * horizontal simples com scroll-snap.
 */

const CASES = [
  { slug: "bada-bing",    title: "Bada Bing",      img: "/projetos/bada-bing.png" },
  { slug: "use-duali",    title: "Use Dualí",      img: "/projetos/use-duali.png" },
  { slug: "myko",         title: "MYKO",           img: "/projetos/myko.png" },
  { slug: "sirius",       title: "Sirius",         img: "/projetos/sirius.png" },
  { slug: "go-trace",     title: "GO Trace",       img: "/projetos/go-trace.jpg" },
  { slug: "moneyfy",      title: "MoneyFy",        img: "/projetos/moneyfy.jpg" },
  { slug: "gisto-xavier", title: "Gisto & Xavier", img: "/projetos/gisto-xavier.png" },
];

/* Leque (padrão Pallet) — offsets do centro, escalados pelo viewport */
const SLOTS = [
  { x: -480, y: 18, r: -18, s: 0.88, z: 1 },
  { x: -310, y: 6,  r: -10, s: 0.92, z: 2 },
  { x: -155, y: -2, r: -4,  s: 0.96, z: 3 },
  { x: 0,    y: -8, r: 0,   s: 1,    z: 4 },
  { x: 160,  y: -2, r: 5,   s: 0.96, z: 3 },
  { x: 320,  y: 6,  r: 12,  s: 0.92, z: 2 },
  { x: 480,  y: 18, r: 20,  s: 0.88, z: 1 },
];

/* Fases do scroll dentro da seção */
const P = { fanEnd: 0.26, stackAt: 0.5, slideAt: 0.68, ladderAt: 0.96 };

function useViewport() {
  const [vp, setVp] = useState({ w: 1440, h: 900 });
  useEffect(() => {
    const upd = () => setVp({ w: window.innerWidth, h: window.innerHeight });
    upd();
    window.addEventListener("resize", upd);
    return () => window.removeEventListener("resize", upd);
  }, []);
  return vp;
}

function ChoreoCard({
  c,
  i,
  progress,
  vp,
}: {
  c: (typeof CASES)[number];
  i: number;
  progress: MotionValue<number>;
  vp: { w: number; h: number };
}) {
  const [hovered, setHovered] = useState(false);

  const k = Math.min(1, vp.w / 1500);         // escala do leque pro viewport
  const cw = Math.max(150, Math.min(210, vp.w * 0.13)); // lado do card
  const slot = SLOTS[i];

  /* Escada final: diagonal do canto sup-esq da metade direita */
  const ladderX = vp.w * 0.06 + (i - 3) * cw * 0.66;
  const ladderY = -vp.h * 0.06 + (i - 3) * cw * 0.3;
  const ladderR = -3 + i * 2;

  const x = useTransform(
    progress,
    [0, P.fanEnd, P.stackAt, P.slideAt, P.ladderAt],
    [slot.x * k, slot.x * k, 0, vp.w * 0.06, ladderX]
  );
  const y = useTransform(
    progress,
    [0, P.fanEnd, P.stackAt, P.slideAt, P.ladderAt],
    [slot.y * k, slot.y * k, 0, ladderY, ladderY]
  );
  const rotate = useTransform(
    progress,
    [0, P.fanEnd, P.stackAt, P.ladderAt],
    [slot.r, slot.r, 0, ladderR]
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
            className="relative overflow-hidden rounded-[18px] bg-surface shadow-[0_20px_60px_rgb(16_16_16/0.20)]"
            style={{ width: cw, height: cw }}
          >
            <Image
              src={c.img}
              alt={c.title}
              fill
              sizes="220px"
              className="object-cover"
              draggable={false}
            />
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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  /* Título central (fase leque) sai quando a pilha se forma */
  const titleOpacity = useTransform(scrollYProgress, [0, P.fanEnd, P.stackAt], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [P.fanEnd, P.stackAt], [0, -40]);

  /* Coluna de texto (fase escada) entra com a pilha deslizando */
  const colOpacity = useTransform(scrollYProgress, [P.slideAt - 0.06, P.ladderAt - 0.12], [0, 1]);
  const colX = useTransform(scrollYProgress, [P.slideAt - 0.06, P.ladderAt - 0.12], [-32, 0]);

  /* Tags @ aparecem no fim */
  const tagScale = useTransform(scrollYProgress, [0.88, 0.97], [0.6, 1]);
  const tagOpacity = useTransform(scrollYProgress, [0.88, 0.95], [0, 1]);

  /* Mobile / reduced-motion: strip horizontal simples */
  const fallback = (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 md:hidden">
      {CASES.map((c) => (
        <Link
          key={c.slug}
          href={`/projetos/${c.slug}`}
          className="relative aspect-square w-[240px] shrink-0 snap-center overflow-hidden rounded-[18px] bg-surface shadow-lg"
        >
          <Image src={c.img} alt={c.title} fill sizes="240px" className="object-cover" />
          <span className="absolute bottom-3 left-3 rounded-pill bg-ink-900/60 px-3 py-1 text-xs font-semibold text-ink-50 backdrop-blur">
            {c.title}
          </span>
        </Link>
      ))}
    </div>
  );

  return (
    <section id="trabalhos" className="bg-bg-soft">
      {/* Header mobile + fallback */}
      <div className="px-6 pt-20 md:hidden">
        <p className="label-mono mb-3">
          <span className="text-fg-strong">03</span>
          <span className="mx-3 text-fg-faint">──</span>
          <span>Trabalhos</span>
        </p>
        <h2 className="text-h-1 mb-8 text-fg-strong">Cases que já saíram do forno.</h2>
      </div>
      <div className="md:hidden">{fallback}</div>
      <div className="px-6 pb-16 md:hidden">
        <Link href="/projetos" className="text-sm font-semibold text-brand">
          Ver todos os projetos ↗
        </Link>
      </div>

      {/* Coreografia (desktop) */}
      <section
        ref={sectionRef}
        className="relative hidden md:block"
        style={{ height: reduced ? "auto" : "340vh" }}
        aria-label="Seleção de projetos"
      >
        {reduced ? (
          /* estático digno com reduced-motion */
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
              className="absolute inset-x-0 top-[14%] z-10 flex flex-col items-center gap-3 text-center"
            >
              <p className="label-mono flex items-center gap-3">
                <span className="text-fg-strong">03</span>
                <span className="text-fg-faint">──</span>
                <span>Trabalhos selecionados</span>
              </p>
              <h2 className="text-h-1 max-w-2xl text-balance text-fg-strong">
                Cases que já saíram do forno — role e veja o baralho se armar.
              </h2>
            </motion.div>

            {/* Coluna de texto da fase escada */}
            <motion.div
              style={{ opacity: colOpacity, x: colX }}
              className="relative z-10 ml-[7vw] flex w-[400px] flex-col gap-5"
            >
              <p className="label-mono">
                <span className="text-fg-strong">03</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>Trabalhos</span>
              </p>
              <h2 className="text-h-1 text-fg-strong">
                Branding, sites e produtos{" "}
                <span className="text-brand">num só repertório.</span>
              </h2>
              <p className="max-w-[340px] text-[15px] leading-relaxed text-fg-mute">
                De marca de biscoito a fintech: 13 projetos no ar, cada um com o
                processo inteiro documentado — do conceito ao deploy.
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4">
                <Link
                  href="/projetos"
                  className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-fg-strong px-6 py-3.5 text-sm font-semibold text-bg"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 translate-y-full rounded-pill bg-brand transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
                  />
                  <span className="relative">Ver todos os projetos</span>
                  <ArrowUpRight className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
              </div>
            </motion.div>

            {/* Cards coreografados */}
            {CASES.map((c, i) => (
              <ChoreoCard key={c.slug} c={c} i={i} progress={scrollYProgress} vp={vp} />
            ))}

            {/* Tags @ no fim da escada */}
            <motion.span
              style={{
                opacity: tagOpacity,
                scale: tagScale,
                position: "absolute",
                top: "30%",
                left: "58%",
              }}
              className="z-20 rounded-pill bg-brand px-5 py-2 text-sm font-semibold text-brand-fg shadow-lg"
            >
              <span className="absolute -bottom-2 left-5 size-0 border-x-8 border-t-[10px] border-x-transparent border-t-brand" aria-hidden />
              @badabing
            </motion.span>
            <motion.span
              style={{
                opacity: tagOpacity,
                scale: tagScale,
                position: "absolute",
                top: "62%",
                left: "78%",
              }}
              className="z-20 rounded-pill bg-fg-strong px-5 py-2 text-sm font-semibold text-bg shadow-lg"
            >
              <span className="absolute -bottom-2 left-5 size-0 border-x-8 border-t-[10px] border-x-transparent border-t-fg-strong" aria-hidden />
              @gotrace
            </motion.span>
          </div>
        )}
      </section>
    </section>
  );
}
