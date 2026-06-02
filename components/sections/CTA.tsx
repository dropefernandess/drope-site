"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";

/**
 * CTA Final — foto Unsplash dark/moody como background + overlay vermelho
 * sutil + texto sobre. Bem mais cinematográfico que o gradient anterior.
 */
export function CTA() {
  return (
    <section id="contato" className="bg-bg px-6 pb-24 md:pb-32 md:px-12">
      <Container>
        <Reveal className="relative overflow-hidden rounded-section min-h-[560px] md:min-h-[640px]">
          {/* Background — reunião/colaboração ao redor de mesa, gente conversando */}
          <Image
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=2400&q=90"
            alt=""
            fill
            sizes="(min-width: 1024px) 1200px, 100vw"
            quality={90}
            className="object-cover"
            aria-hidden
          />
          {/* Overlay vermelho denso pra legibilidade (multiplicado) */}
          <div className="absolute inset-0 bg-brand-wine/85 mix-blend-multiply" aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-br from-brand-wine/70 via-brand-dark/85 to-ink-900/90" aria-hidden />
          {/* Grain noise minúsculo */}
          <div
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage: `url("data:image/svg+xml;utf8,<svg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='2.5' numOctaves='1' stitchTiles='stitch'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>")`,
            }}
            aria-hidden
          />

          {/* Conteúdo */}
          <div className="relative p-6 sm:p-8 md:p-12 lg:p-16 xl:p-20 grid gap-8 md:gap-12 lg:grid-cols-12 items-end min-h-[520px] md:min-h-[640px]">

            <div className="lg:col-span-7 flex flex-col gap-6 justify-end">
              <Reveal delay={0.05} className="inline-flex items-center gap-2 self-start rounded-pill bg-ink-50/15 backdrop-blur border border-ink-50/20 px-3.5 py-1.5">
                <Clock className="size-3 text-ink-50" strokeWidth={2.5} />
                <span className="text-xs font-medium text-ink-50">
                  Aceitando 2 vagas pra Q3 2026
                </span>
              </Reveal>

              <h2 className="text-[clamp(1.875rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-50 text-balance">
                Vamos construir algo do seu jeito?
              </h2>

              <Reveal delay={0.25} className="text-base md:text-lg leading-relaxed text-ink-50/85 max-w-prose">
                Conta o que você precisa: identidade, site, motion, ou os três.
                Volto em até 24h com perguntas. Sem chatbot, sem formulário
                burocrático.
              </Reveal>

              <Reveal delay={0.35} className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="/agendar"
                  className="group inline-flex items-center gap-2 rounded-pill bg-ink-50 px-5 sm:px-6 py-3.5 text-sm font-semibold text-ink-900 hover:bg-bg transition shadow-lg"
                >
                  <Mail className="size-4" strokeWidth={2.5} />
                  <span className="truncate max-w-[200px] sm:max-w-none">contato@dropefernandes.com</span>
                  <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/calculadora"
                  className="inline-flex items-center gap-2 rounded-pill border border-ink-50/30 bg-ink-50/10 backdrop-blur px-6 py-3.5 text-sm font-semibold text-ink-50 hover:bg-ink-50/20 transition"
                >
                  Calcular estimativa
                </Link>
              </Reveal>
            </div>

            {/* Coluna direita — meta cards */}
            <div className="lg:col-span-5 grid gap-3">
              <Reveal delay={0.3} className="rounded-card bg-ink-50/10 backdrop-blur border border-ink-50/15 p-5 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] uppercase tracking-wider text-ink-50/70 font-medium">
                    Tempo de resposta
                  </p>
                  <p className="text-h-3 text-ink-50">Até 24h úteis</p>
                </div>
                <span className="size-2 rounded-full bg-status animate-pulse" />
              </Reveal>

              <Reveal delay={0.4} className="rounded-card bg-ink-50/10 backdrop-blur border border-ink-50/15 p-5 flex flex-col gap-1">
                <p className="text-[11px] uppercase tracking-wider text-ink-50/70 font-medium">
                  Primeira conversa
                </p>
                <p className="text-h-3 text-ink-50">Sem custo · 30 min</p>
              </Reveal>

              <Reveal delay={0.5} className="rounded-card bg-ink-50/10 backdrop-blur border border-ink-50/15 p-5 flex flex-col gap-1">
                <p className="text-[11px] uppercase tracking-wider text-ink-50/70 font-medium">
                  Localização
                </p>
                <p className="text-h-3 text-ink-50">Senador Firmino, MG · remoto</p>
              </Reveal>
            </div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
}
