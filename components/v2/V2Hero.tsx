"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { motion, cubicBezier, useReducedMotion } from "framer-motion";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { V2Btn } from "./V2Btn";
import { useViewport } from "./useViewport";
import { CASES, FAN_SLOTS } from "./v2-cases";

/**
 * V2Hero — hero da ref Pallet Ross, fiel ao prompt:
 * headline central gigante word-by-word, LEQUE de 7 covers embaixo com
 * entrada coreografada em 3 fases do card líder (sobe → voa pro slot 6 →
 * varre até o slot 0) revelando os outros exatamente quando passa por
 * eles (bezier invertida), balões de chat com squash-and-stretch.
 * Header Kubric (logo + nav pill glass + botão sólido) + side-nav.
 * Superfície FLAT — cream puro, zero gradiente, zero sombra decorativa.
 */

const smoothEase = cubicBezier(0.22, 1, 0.36, 1);

/* Inverte a easing: acha t onde ease(t) ≈ p (busca binária) */
function timeForProgress(p: number): number {
  let lo = 0, hi = 1;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (smoothEase(mid) < p) lo = mid;
    else hi = mid;
  }
  return (lo + hi) / 2;
}

/* Timeline da entrada (segundos) — valores do prompt */
const INTRO_DELAY = 0.8;
const RISE = 0.72;
const TRAVEL = 0.6;
const SWEEP = 1.6;
const TOTAL = RISE + TRAVEL + SWEEP;
const SWEEP_START = INTRO_DELAY + RISE + TRAVEL;

const NAV = [
  { href: "#hero", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#contato", label: "Contato" },
];

const H1_LINES = [["Crio", "marcas", "pra", "durar"], ["e", "entrego", "funcionando."]];

/** Palavra com rise (Pallet: y28 → 0, delay global × 0.08) */
function Word({ w, i, accent }: { w: string; i: number; accent?: boolean }) {
  return (
    <motion.span
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut", delay: i * 0.08 }}
      className={`mr-[0.22em] inline-block ${accent ? "text-brand" : ""}`}
    >
      {w}
    </motion.span>
  );
}

/** Balão de chat com jelly squash-and-stretch (valores do prompt) */
function Bubble({
  label,
  tone,
  delay,
  style,
  tail,
}: {
  label: string;
  tone: "brand" | "ink";
  delay: number;
  style: React.CSSProperties;
  tail: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        scaleX: [1, 1.25, 0.75, 1.15, 0.95, 1.05, 1],
        scaleY: [1, 0.75, 1.25, 0.85, 1.05, 0.95, 1],
      }}
      transition={{ duration: 0.8, delay }}
      style={style}
      className={`absolute z-20 rounded-full px-[18px] py-[8px] text-[15px] font-semibold text-white ${
        tone === "brand" ? "bg-brand" : "bg-ink-900"
      }`}
    >
      {label}
      <span
        aria-hidden
        className={`absolute -bottom-2 size-0 border-t-[10px] ${
          tone === "brand" ? "border-t-brand" : "border-t-ink-900"
        } ${
          tail === "left"
            ? "left-4 border-l-8 border-r-4 border-l-transparent border-r-transparent"
            : "right-4 border-l-4 border-r-8 border-l-transparent border-r-transparent"
        }`}
      />
    </motion.div>
  );
}

export function V2Hero() {
  const vp = useViewport();
  const reduced = useReducedMotion();
  const [leadDone, setLeadDone] = useState(false);

  const k = Math.min(1, vp.w / 1500);
  const cw = Math.max(150, Math.min(210, vp.w * 0.13));
  const rowY = vp.h * 0.76; // linha do leque (HERO_ROW_Y proporcional)

  /* Delays de reveal por slot: quando o líder passa por cada um */
  const reveals = useMemo(() => {
    const s6 = FAN_SLOTS[6].x, s0 = FAN_SLOTS[0].x;
    return FAN_SLOTS.map((slot, i) => {
      if (i === 0) return 0;
      const p = (slot.x - s6) / (s0 - s6);
      return SWEEP_START + timeForProgress(p) * SWEEP;
    });
  }, []);

  const slotStyle = (i: number) => ({
    left: vp.w / 2 + FAN_SLOTS[i].x * k,
    top: rowY + FAN_SLOTS[i].y * k,
  });

  return (
    <section id="hero" className="relative min-h-screen overflow-hidden bg-bg">
      {/* ===== HEADER (Kubric) ===== */}
      <header className="relative z-30 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-7">
        <Link href="/" aria-label="Dropê — início" className="shrink-0">
          <Image
            src="/brand/drope-light.svg"
            alt="Dropê"
            width={104}
            height={36}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>
        <nav
          aria-label="Seções"
          className="v2-pill hidden items-center gap-8 rounded-full px-5 py-2.5 md:inline-flex"
        >
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className="v2-pill-link text-[15px] font-medium text-fg-strong/70 transition-colors hover:text-fg-strong"
              style={{ animationDelay: `${0.6 + i * 0.08}s` }}
            >
              {n.label}
            </a>
          ))}
        </nav>
        <V2Btn href="/agendar" variant="brand" className="px-5 py-2.5">
          Agendar
        </V2Btn>
      </header>

      {/* ===== SIDE-NAV (Kubric) ===== */}
      <nav
        aria-label="Navegação lateral"
        className="absolute right-6 top-1/2 z-30 hidden -translate-y-1/2 flex-col items-end gap-3.5 md:right-12 lg:flex"
      >
        {NAV.map((n, i) => (
          <a
            key={n.href}
            href={n.href}
            className="group inline-flex items-center gap-2.5 text-sm font-medium text-fg-mute transition-colors hover:text-fg-strong"
          >
            <span
              className="v2-pill-link inline-block"
              style={{ animationDelay: `${0.9 + i * 0.14}s` }}
            >
              {n.label}
            </span>
            <span
              className={`h-px bg-fg-strong transition-all duration-300 ${
                i === 0 ? "w-3.5" : "w-0 group-hover:w-3.5"
              }`}
            />
          </a>
        ))}
      </nav>

      {/* ===== CENTRO (Pallet): headline word-by-word ===== */}
      <main className="relative z-10 mx-auto flex max-w-[1100px] flex-col items-center px-6 pt-16 text-center md:pt-20">
        <h1 className="text-[clamp(2.8rem,7vw,6rem)] font-extrabold leading-[1.0] tracking-[-0.035em] text-fg-strong">
          {(() => {
            let g = 0;
            return H1_LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((w) => {
                  const idx = g++;
                  return (
                    <Word
                      key={idx}
                      w={w}
                      i={idx}
                      accent={w === "funcionando."}
                    />
                  );
                })}
              </span>
            ));
          })()}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.2 }}
          className="mt-10 max-w-[480px] text-base leading-[1.6] text-fg-strong/55"
        >
          Branding, UI/UX e desenvolvimento na mesma cabeça, do briefing à
          launch. Sem ping-pong entre fornecedores.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 2.4 }}
          className="mt-7 flex items-center gap-4"
        >
          <V2Btn href="#trabalhos" variant="dark" arrow={false} className="rounded-full px-7">
            Ver trabalhos
          </V2Btn>
          <V2Btn href="/agendar" variant="ghost" arrow={false} className="rounded-full px-5 text-fg-strong/80">
            Agendar 30 min
          </V2Btn>
        </motion.div>
      </main>

      {/* ===== LEQUE DE COVERS (coreografia de entrada Pallet) ===== */}
      <div className="pointer-events-none absolute inset-0 z-[5] hidden md:block" aria-hidden={false}>
        {/* Balões — pipocam quando o sweep termina */}
        <Bubble
          label="Vi teu trabalho no Insta!"
          tone="brand"
          delay={reduced ? 0.4 : 3.05}
          style={{ left: `calc(50% - ${380 * k}px)`, top: rowY - cw * 0.62 }}
          tail="left"
        />
        <Bubble
          label="@drope · bora criar?"
          tone="ink"
          delay={reduced ? 0.55 : 3.2}
          style={{ left: `calc(50% + ${180 * k}px)`, top: rowY - cw * 0.68 }}
          tail="right"
        />

        {reduced ? (
          /* reduced-motion: leque estático, sem coreografia */
          CASES.map((c, i) => (
            <div
              key={c.slug}
              className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
              style={{ ...slotStyle(i), zIndex: FAN_SLOTS[i].z }}
            >
              <FanCard c={c} cw={cw} rotate={FAN_SLOTS[i].r} scale={FAN_SLOTS[i].s} />
            </div>
          ))
        ) : (
          <>
            {/* Card líder — 3 fases: sobe / voa pro slot 6 / varre até o 0 */}
            <motion.div
              className="pointer-events-auto absolute left-0 top-0 z-[8]"
              initial={false}
              animate={{
                x: [vp.w / 2, vp.w / 2, vp.w / 2 + FAN_SLOTS[6].x * k, vp.w / 2 + FAN_SLOTS[0].x * k],
                y: [vp.h / 2 + 180, rowY, rowY + FAN_SLOTS[6].y * k, rowY + FAN_SLOTS[0].y * k],
                rotate: [0, 0, FAN_SLOTS[6].r, FAN_SLOTS[0].r],
                scale: [0.3, 1, FAN_SLOTS[6].s, FAN_SLOTS[0].s],
                opacity: [0, 1, 1, 1],
              }}
              transition={{
                duration: TOTAL,
                delay: INTRO_DELAY,
                times: [0, RISE / TOTAL, (RISE + TRAVEL) / TOTAL, 1],
                ease: [smoothEase, smoothEase, smoothEase],
              }}
              onAnimationComplete={() => setLeadDone(true)}
              style={{ translateX: "-50%", translateY: "-50%" }}
            >
              <FanCard c={CASES[0]} cw={cw} rotate={0} scale={1} />
            </motion.div>

            {/* Slots 1–6 — revelam quando o líder passa (bezier invertida) */}
            {CASES.slice(1).map((c, j) => {
              const i = j + 1;
              return (
                <motion.div
                  key={c.slug}
                  className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2"
                  style={{ ...slotStyle(i), zIndex: FAN_SLOTS[i].z }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: i <= 3 ? 0.06 : 0.18,
                    delay: leadDone ? 0 : reveals[i],
                    ease: "easeOut",
                  }}
                >
                  <FanCard c={c} cw={cw} rotate={FAN_SLOTS[i].r} scale={FAN_SLOTS[i].s} />
                </motion.div>
              );
            })}
          </>
        )}
      </div>

      {/* Scroll-down (canto inferior esquerdo) */}
      <motion.a
        href="#servicos"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.8, duration: 0.5 }}
        className="group absolute bottom-7 left-6 z-20 inline-flex items-center gap-2 text-sm font-semibold text-fg-strong md:left-12"
      >
        Rolar
        <span className="inline-flex size-6 items-center justify-center overflow-hidden rounded-full border border-fg-strong/20 transition-colors group-hover:border-fg-strong">
          <svg viewBox="0 0 8 9" className="v2-chevron size-2.5" fill="none" aria-hidden>
            <path d="M4 1v6.5M4 7.5 1.4 5M4 7.5 6.6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </motion.a>
    </section>
  );
}

function FanCard({
  c,
  cw,
  rotate,
  scale,
}: {
  c: (typeof CASES)[number];
  cw: number;
  rotate: number;
  scale: number;
}) {
  return (
    <Link href={`/projetos/${c.slug}`} aria-label={`Ver case ${c.title}`}>
      <motion.div
        whileHover={{ scale: 1.04, zIndex: 30 }}
        transition={{ duration: 0.22, ease: [0.34, 1.56, 0.64, 1] }}
        className="relative overflow-hidden rounded-[18px] border border-ink-900/10 bg-surface"
        style={{ width: cw, height: cw, rotate, scale }}
      >
        <Image
          src={c.img}
          alt={c.title}
          fill
          sizes="220px"
          priority
          className="object-cover"
          draggable={false}
        />
      </motion.div>
    </Link>
  );
}
