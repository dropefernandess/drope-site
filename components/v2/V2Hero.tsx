"use client";

import Image from "next/image";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { ArrowUpRight } from "lucide-react";

/**
 * V2Hero — estrutura Kubric (header absoluto + headline char-by-char +
 * side-nav + bottom row com about-card), recolorida no manual:
 * cream de base, wash vermelha respirando, grain de papel.
 */

const CHAR_STEP = 0.032;
const LINE_GAP = 0.55;

/** Divide a linha em chars com delay incremental (padrão Kubric). */
function CharLine({
  text,
  base,
  className,
}: {
  text: string;
  base: number;
  className?: string;
}) {
  let i = 0;
  return (
    <span className={`v2-line ${className ?? ""}`}>
      {text.split(" ").map((word, w) => (
        <span key={w} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, c) => {
            const delay = base + i * CHAR_STEP;
            i++;
            return (
              <span
                key={c}
                className="v2-char"
                style={{ animationDelay: `${delay}s` }}
              >
                {ch}
              </span>
            );
          })}
          {w < text.split(" ").length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </span>
  );
}

const NAV = [
  { href: "#hero", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#contato", label: "Contato" },
];

export function V2Hero() {
  return (
    <section
      id="hero"
      className="v2-grain relative flex min-h-screen flex-col overflow-hidden"
    >
      <div className="v2-wash" aria-hidden />

      {/* ===== HEADER (absoluto, só no hero — padrão Kubric) ===== */}
      <header className="relative z-20 flex items-center justify-between px-6 pt-6 md:px-12 md:pt-8">
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
          className="v2-pill hidden items-center gap-7 rounded-pill px-5 py-2.5 md:inline-flex"
        >
          {NAV.map((n, i) => (
            <a
              key={n.href}
              href={n.href}
              className="v2-pill-link text-sm font-medium text-fg-strong/70 transition-colors hover:text-fg-strong"
              style={{ animationDelay: `${0.6 + i * 0.08}s` }}
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Link
          href="/agendar"
          className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-fg-strong px-5 py-2.5 text-sm font-semibold text-bg"
        >
          <span
            aria-hidden
            className="absolute inset-0 translate-y-full rounded-pill bg-brand transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
          />
          <span className="relative">Agendar</span>
          <ArrowUpRight className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
        </Link>
      </header>

      {/* ===== SIDE-NAV vertical (direita) ===== */}
      <nav
        aria-label="Navegação lateral"
        className="absolute right-6 top-1/2 z-20 hidden -translate-y-1/2 flex-col items-end gap-3.5 md:right-12 lg:flex"
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

      {/* ===== HEADLINE ===== */}
      <div className="relative z-10 flex flex-1 flex-col justify-center px-6 md:px-12">
        <p
          className="label-mono v2-pill-link mb-5 flex items-center gap-2"
          style={{ animationDelay: "0.35s" }}
        >
          <span className="size-1 rounded-full bg-brand" />
          Pedro Fernandes · Designer multidisciplinar
        </p>
        <h1 className="max-w-5xl text-[clamp(2.9rem,7.2vw,6.2rem)] font-semibold leading-[1.04] tracking-[-0.03em] text-fg-strong">
          <CharLine text="Crio marcas" base={0.35} />
          <CharLine text="pra durar e entrego" base={0.35 + LINE_GAP} />
          <span className="v2-line">
            <CharLine text="elas " base={0.35 + LINE_GAP * 2} className="!inline" />
            <span className="text-brand">
              <CharLine text="funcionando." base={0.35 + LINE_GAP * 2.4} className="!inline" />
            </span>
          </span>
        </h1>
      </div>

      {/* ===== BOTTOM ROW ===== */}
      <div className="relative z-10 grid items-end gap-x-10 gap-y-3 px-6 pb-8 md:grid-cols-[1fr_auto] md:px-12">
        <div className="flex flex-col gap-3">
          <p
            className="v2-pill-link text-sm font-semibold text-fg-strong"
            style={{ animationDelay: "1.1s" }}
          >
            01 — Manifesto
          </p>
          <p
            className="v2-pill-link max-w-[440px] text-[15px] leading-relaxed text-fg-mute"
            style={{ animationDelay: "1.2s" }}
          >
            Branding, UI/UX e desenvolvimento na mesma cabeça, do briefing à
            launch. Sem ping-pong entre fornecedores, sem perder a direção no
            caminho.
          </p>
          <div
            className="v2-pill-link mt-2 flex flex-wrap items-center gap-5"
            style={{ animationDelay: "1.32s" }}
          >
            <a
              href="#trabalhos"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-brand px-6 py-3.5 text-sm font-semibold text-brand-fg shadow-sm shadow-brand/20"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full rounded-pill bg-brand-deep transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
              />
              <span className="relative">Ver trabalhos</span>
              <ArrowUpRight className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </a>
            <a
              href="#servicos"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-fg-strong"
            >
              Rolar pra ver
              <span className="inline-flex size-6 items-center justify-center overflow-hidden rounded-full border border-line transition-colors group-hover:border-fg-strong">
                <svg viewBox="0 0 8 9" className="v2-chevron size-2.5" fill="none" aria-hidden>
                  <path d="M4 1v6.5M4 7.5 1.4 5M4 7.5 6.6 5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* About-card (padrão Kubric, com a tua foto) */}
        <Link
          href="/sobre"
          className="v2-pill-link group hidden w-[340px] overflow-hidden rounded-card border border-line bg-bg-soft shadow-sm transition-shadow hover:shadow-lg md:flex"
          style={{ animationDelay: "1.45s" }}
        >
          <div className="w-[128px] shrink-0 p-1.5">
            <div className="relative h-full min-h-[110px] overflow-hidden rounded-[12px] bg-surface">
              <Image
                src="/hero-portrait.jpg"
                alt="Pedro Fernandes (Drope)"
                fill
                sizes="128px"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col justify-between p-4 pl-2">
            <div>
              <h3 className="text-[13px] font-bold text-fg-strong">Quem é o Dropê</h3>
              <p className="mt-1 text-xs leading-snug text-fg-mute">
                Design gráfico de base, tecnologia como extensão. 8+ anos de
                ofício.
              </p>
            </div>
            <svg
              viewBox="0 0 77 13"
              className="h-3 w-16 self-end text-fg-faint transition-colors group-hover:text-brand"
              fill="none"
              aria-hidden
            >
              <path d="M1 6.5H75M75 6.5L70 1.5M75 6.5L70 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}
