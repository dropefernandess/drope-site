"use client";

import Image from "next/image";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Afluente } from "./Afluente";
import { NAV, STATS } from "./data";

/**
 * V3Hero — declaração sobre o afluente.
 *
 * Composição ancorada, não centralizada: o shader ocupa o alto (onde a
 * vinheta é mais escura e o tipo tem contraste), o bloco de texto senta
 * na faixa dos 52%, os dados fecham embaixo. Zero espaço morto — foi
 * exatamente o defeito do hero da V2.
 *
 * A logo entra em branco: o vermelho da identidade brigaria com as
 * correntes. Em mono ela vira assinatura.
 */
export function V3Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-svh flex-col overflow-hidden">
      <Afluente className="absolute inset-0 -z-10 h-full w-full" />

      {/* Scrim: garante contraste do tipo e costura com a seção seguinte */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgb(8 8 11 / 0.72) 0%, rgb(8 8 11 / 0.22) 26%, rgb(8 8 11 / 0.10) 52%, rgb(8 8 11 / 0.55) 84%, #08080B 100%)",
        }}
      />

      {/* ===== HEADER ===== */}
      <header className="v3-wrap relative flex items-center justify-between py-6" data-reveal>
        <Link href="/" aria-label="Dropê — início" className="shrink-0">
          <Image
            src="/brand/drope-dark.svg"
            alt="Dropê"
            width={104}
            height={36}
            priority
            className="h-8 w-auto brightness-0 invert"
          />
        </Link>

        <nav aria-label="Seções" className="hidden items-center gap-9 md:flex">
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-sm text-[var(--n-300)] transition-colors duration-200 hover:text-[var(--n-0)]"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Link href="/agendar" className="v3-btn v3-btn--primary !min-h-0 !px-5 !py-2.5 !text-sm">
          Agendar
        </Link>
      </header>

      {/* ===== DECLARAÇÃO ===== */}
      <div className="v3-wrap relative flex flex-1 items-center">
        <div className="v3-grid w-full">
          <div className="col-span-4 md:col-span-8 lg:col-span-7">
            <div data-reveal>
              <span className="v3-chip">
                <span className="v3-chip__dot" aria-hidden="true" />
                <span className="text-[13px] text-[var(--n-300)]">
                  Disponível para novos projetos
                </span>
              </span>
            </div>

            <h1 className="v3-display mt-7" data-reveal>
              Crio marcas pra durar
              <br />
              e entrego{" "}
              <em className="v3-em v3-em--glow">funcionando.</em>
            </h1>

            <p className="v3-lead mt-8" data-reveal>
              Branding, UI/UX e desenvolvimento na mesma cabeça — três correntes
              que chegam como uma entrega só. Do briefing ao deploy, sem
              ping-pong entre fornecedores.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
              <a href="#trabalhos" className="v3-btn v3-btn--primary">
                Ver trabalhos
              </a>
              <Link href="/agendar" className="v3-btn v3-btn--ghost">
                Agendar 30&nbsp;min
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ===== RODAPÉ DO HERO ===== */}
      <div className="v3-wrap relative pb-8" data-reveal>
        <hr className="v3-rule mb-6" />
        <div className="flex flex-wrap items-end justify-between gap-6">
          <ul className="flex flex-wrap items-baseline gap-x-10 gap-y-3">
            {STATS.map((s) => (
              <li key={s.label} className="flex items-baseline gap-2.5">
                <span className="v3-num text-lg font-medium text-[var(--n-0)]">{s.value}</span>
                <span className="text-[13px] text-[var(--n-500)]">{s.label}</span>
              </li>
            ))}
          </ul>

          <a
            href="#servicos"
            className="group inline-flex items-center gap-2.5 text-[13px] text-[var(--n-300)] transition-colors duration-200 hover:text-[var(--n-0)]"
          >
            <span className="v3-mono !text-[11px] !text-inherit">Rolar</span>
            <span className="inline-flex size-7 items-center justify-center rounded-full border border-[var(--line-strong)] transition-colors duration-200 group-hover:border-[var(--sage-400)]">
              <svg viewBox="0 0 10 12" className="size-2.5" fill="none" aria-hidden="true">
                <path
                  d="M5 1v9.2M5 10.2 1.6 6.9M5 10.2 8.4 6.9"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
