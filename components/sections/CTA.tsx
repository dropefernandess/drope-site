"use client";

import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { ArrowUpRight } from "lucide-react";
import { AnimatedClock, AnimatedMail } from "@/components/ui/AnimatedIcons";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { AnimatedCursor } from "@/components/ui/AnimatedCursor";
import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * CTA Final — versão moderna com cursores animados.
 *
 * Inspirado nas referências do Drope:
 *  - Card escuro com glow radial difuso (não mais foto Unsplash + overlay)
 *  - 2 cursores em loop (vai e volta) com labels: "Branding" + "Visão"
 *  - Headline com pedaço em peso reduzido (efeito "Together")
 *  - CTA pill brand + secundário outline
 *  - Meta cards à direita preservam info útil (tempo de resposta, etc)
 */
export function CTA() {
  const { t } = useLocale();

  return (
    <section id="contato" className="bg-bg pb-24 md:pb-32">
      <Container>
        {/* bg fixo escuro em LIGHT e DARK mode — não vira cream em dark
            #101010 no light (fg-strong) / #1A1A1A no dark (mais fosco que --bg) */}
        <Reveal className="relative overflow-hidden rounded-section bg-[#101010] dark:bg-[#1A1A1A]">

          {/* === Glow radial difuso (multi-layer) === */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at 75% 50%, rgba(222, 40, 40, 0.35) 0%, transparent 45%),
                radial-gradient(circle at 90% 80%, rgba(255, 200, 100, 0.22) 0%, transparent 35%),
                radial-gradient(circle at 20% 90%, rgba(222, 40, 40, 0.18) 0%, transparent 40%)
              `,
            }}
          />

          {/* Glow blur layer (mais difuso) */}
          <motion.div
            aria-hidden
            className="absolute -right-32 top-1/2 -translate-y-1/2 size-[600px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(222,40,40,0.4) 0%, transparent 60%)",
              filter: "blur(80px)",
            }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0.85, 0.6] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* === Cursores animados (decoração viva) === */}
          {/* Cursor 1: brand vermelho — "Branding" */}
          <AnimatedCursor
            color="#DE2828"
            label={t("cta.cursor1")}
            position={{ top: "30%", right: "16%" }}
            offsetX={100}
            offsetY={55}
            duration={5}
            delay={0}
            className="hidden md:block"
          />

          {/* Cursor 2: cream/ink-50 — "Visão" (contraste no bg dark) */}
          <AnimatedCursor
            color="#F2F2EB"
            label={t("cta.cursor2")}
            position={{ top: "60%", right: "36%" }}
            offsetX={-90}
            offsetY={-45}
            duration={6}
            delay={1.5}
            className="hidden md:block"
          />

          {/* === Conteúdo === */}
          <div className="relative grid gap-10 md:gap-12 lg:grid-cols-12 p-8 sm:p-10 md:p-14 lg:p-20">

            {/* Coluna esquerda — headline + sub + CTAs */}
            <div className="lg:col-span-7 flex flex-col gap-6">
              <Reveal delay={0.05} direction="left" className="inline-flex items-center gap-2 self-start rounded-pill bg-ink-50/10 backdrop-blur border border-ink-50/15 px-3.5 py-1.5">
                <AnimatedClock className="size-3 text-ink-50" strokeWidth={2.5} />
                <span className="text-xs font-medium text-ink-50">
                  {t("cta.badge_vagas")}
                </span>
              </Reveal>

              <Reveal delay={0.1} direction="up">
                <h2 className="text-[clamp(2rem,5.5vw,4.5rem)] font-semibold leading-[1.05] tracking-[-0.025em] text-ink-50 text-balance">
                  {t("cta.headline_pt1")}{" "}
                  <span className="text-ink-50/40">{t("cta.headline_pt2")}</span>
                </h2>
              </Reveal>

              <Reveal delay={0.2} direction="up" className="text-base md:text-lg leading-relaxed text-ink-50/80 max-w-prose">
                {t("cta.subhead")}
              </Reveal>

              <Reveal delay={0.3} direction="up" className="flex flex-wrap items-center gap-3 pt-3">
                <Link
                  href="/agendar"
                  className="group inline-flex items-center gap-2 rounded-pill bg-brand px-6 py-3.5 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition shadow-lg shadow-brand/30"
                >
                  <AnimatedMail className="size-4" strokeWidth={2.5} />
                  <span>{t("cta.button_primary")}</span>
                  <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/calculadora"
                  className="inline-flex items-center gap-2 rounded-pill border border-ink-50/25 bg-ink-50/5 backdrop-blur px-6 py-3.5 text-sm font-semibold text-ink-50 hover:bg-ink-50/15 transition"
                >
                  {t("cta.button_calc")}
                </Link>
              </Reveal>
            </div>

            {/* Coluna direita — meta cards (mantém info útil) */}
            <div className="lg:col-span-5 grid gap-3 content-start">
              <Reveal delay={0.35} direction="right" className="rounded-card bg-ink-50/8 backdrop-blur border border-ink-50/12 p-5 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <p className="text-[11px] uppercase tracking-wider text-ink-50/60 font-medium">
                    {t("cta.meta1_label")}
                  </p>
                  <p className="text-h-3 text-ink-50">{t("cta.meta1_value")}</p>
                </div>
                <span className="size-2 rounded-full bg-status animate-pulse" />
              </Reveal>

              <Reveal delay={0.4} direction="right" className="rounded-card bg-ink-50/8 backdrop-blur border border-ink-50/12 p-5 flex flex-col gap-1">
                <p className="text-[11px] uppercase tracking-wider text-ink-50/60 font-medium">
                  {t("cta.meta2_label")}
                </p>
                <p className="text-h-3 text-ink-50">{t("cta.meta2_value")}</p>
              </Reveal>

              <Reveal delay={0.45} direction="right" className="rounded-card bg-ink-50/8 backdrop-blur border border-ink-50/12 p-5 flex flex-col gap-1">
                <p className="text-[11px] uppercase tracking-wider text-ink-50/60 font-medium">
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
