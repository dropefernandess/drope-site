"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * CTA Final — foto Unsplash dark/moody como background + overlay vermelho
 * sutil + texto sobre. Bem mais cinematográfico que o gradient anterior.
 */
export function CTA() {
  const { t } = useLocale();
  return (
    <section id="contato" className="bg-bg pb-24 md:pb-32">
      <Container>
        <Reveal className="relative overflow-hidden rounded-section md:min-h-[640px]">
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

          {/* Conteúdo — padding simétrico em mobile (p-8 todos os lados) */}
          <div className="relative p-8 sm:p-10 md:p-12 lg:p-16 xl:p-20 grid gap-8 md:gap-12 lg:grid-cols-12 lg:items-end md:min-h-[640px]">

            <div className="lg:col-span-7 flex flex-col gap-6 lg:justify-end">
              <Reveal delay={0.05} className="inline-flex items-center gap-2 self-start rounded-pill bg-ink-50/15 backdrop-blur border border-ink-50/20 px-3.5 py-1.5">
                <Clock className="size-3 text-ink-50" strokeWidth={2.5} />
                <span className="text-xs font-medium text-ink-50">
                  {t("cta.badge_vagas")}
                </span>
              </Reveal>

              <h2 className="text-[clamp(1.875rem,5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-50 text-balance">
                {t("cta.headline")}
              </h2>

              <Reveal delay={0.25} className="text-base md:text-lg leading-relaxed text-ink-50/85 max-w-prose">
                {t("cta.subhead")}
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
                  {t("cta.button_calc")}
                </Link>
              </Reveal>
            </div>

            {/* Coluna direita — meta cards */}
            <div className="lg:col-span-5 grid gap-3">
              <Reveal delay={0.3} className="rounded-card bg-ink-50/10 backdrop-blur border border-ink-50/15 p-5 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] uppercase tracking-wider text-ink-50/70 font-medium">
                    {t("cta.meta1_label")}
                  </p>
                  <p className="text-h-3 text-ink-50">{t("cta.meta1_value")}</p>
                </div>
                <span className="size-2 rounded-full bg-status animate-pulse" />
              </Reveal>

              <Reveal delay={0.4} className="rounded-card bg-ink-50/10 backdrop-blur border border-ink-50/15 p-5 flex flex-col gap-1">
                <p className="text-[11px] uppercase tracking-wider text-ink-50/70 font-medium">
                  {t("cta.meta2_label")}
                </p>
                <p className="text-h-3 text-ink-50">{t("cta.meta2_value")}</p>
              </Reveal>

              <Reveal delay={0.5} className="rounded-card bg-ink-50/10 backdrop-blur border border-ink-50/15 p-5 flex flex-col gap-1">
                <p className="text-[11px] uppercase tracking-wider text-ink-50/70 font-medium">
                  {t("cta.meta3_label")}
                </p>
                <p className="text-h-3 text-ink-50">{t("cta.meta3_value")}</p>
              </Reveal>
            </div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
}
