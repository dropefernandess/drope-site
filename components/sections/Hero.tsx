"use client";

import Image from "next/image";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { ArrowUpRight } from "lucide-react";
import { AnimatedClock } from "@/components/ui/AnimatedIcons";
import { ButtonPrimary, ButtonGhost } from "@/components/ui/Buttons";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import {
  Magnetic,
  AnimatedCounter,
  Parallax,
} from "@/components/ui/Effects";
import { projetos } from "@/content/projetos";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";

const featured = projetos.find((p) => p.slug === "bada-bing")!;

const stats: { v: number; suffix: string; lKey: DictionaryKey }[] = [
  { v: 30, suffix: "+", lKey: "stats.marcas" },
  { v: 82, suffix: "%", lKey: "stats.retorno" },
  { v: 24, suffix: "h", lKey: "stats.resposta" },
];

/**
 * Hero — copy humanizada, sem hífens, sem floreio.
 * Glitch text reveal no nome, parallax na foto, animated counters,
 * magnetic CTAs.
 */
export function Hero() {
  const { t } = useLocale();
  return (
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 overflow-hidden">
      <Container className="relative flex flex-col gap-12">

        {/* — TOP META BAR — */}
        <Reveal className="flex items-center justify-between gap-4 flex-wrap" delay={0.05}>
          <p className="label-mono flex items-center gap-2">
            <span className="size-1 rounded-full bg-brand" />
            {t("hero.eyebrow")}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <AnimatedClock className="size-3 text-fg-mute" strokeWidth={2.5} />
              {t("hero.status_q3")}
            </span>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <span className="size-1.5 rounded-full bg-status" />
              {t("hero.location")}
            </span>
          </div>
        </Reveal>

        {/* — HEADLINE + FOTO — */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col gap-7">
            <Reveal delay={0.1}>
              <h1 className="text-display text-fg-strong text-balance">
                <span className="block">{t("hero.headline_1")}</span>
                <span className="block text-fg-mute">{t("hero.headline_2")}</span>
              </h1>
            </Reveal>

            <Reveal delay={0.3} className="text-lead max-w-prose">
              {t("hero.subhead")}
            </Reveal>

            <Reveal delay={0.4} className="flex flex-wrap items-center gap-4">
              <Magnetic strength={0.18}>
                <ButtonPrimary href="#projetos">{t("hero.cta_primary")}</ButtonPrimary>
              </Magnetic>
              <ButtonGhost href="/agendar">{t("hero.cta_secondary")}</ButtonGhost>
            </Reveal>
          </div>

          {/* — FOTO com parallax sutil + tag — */}
          <Reveal delay={0.2} className="lg:col-span-4 flex justify-center lg:justify-end">
            <Parallax amount={20} className="relative aspect-[4/5] w-full max-w-[340px]">
              <motion.div
                className="relative h-full overflow-hidden rounded-section bg-surface"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/hero-portrait.jpg"
                  alt="Pedro Fernandes (Drope)"
                  fill
                  sizes="(min-width:1024px) 340px, 80vw"
                  quality={90}
                  className="object-cover"
                  priority
                />
                {/* gradiente sutil pra dar contraste à pill em foto escura */}
                <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink-900/60 to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <span className="rounded-pill bg-ink-900/55 backdrop-blur-md border border-ink-50/15 px-3 py-1.5 text-xs font-semibold text-ink-50">
                    Drope · 2026
                  </span>
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand shadow-lg shadow-brand/30">
                    <ArrowUpRight className="size-4 text-brand-fg" strokeWidth={2.5} />
                  </span>
                </div>
              </motion.div>
            </Parallax>
          </Reveal>
        </div>

        {/* — STATS + FEATURED — */}
        <div className="grid gap-3 lg:grid-cols-12 lg:gap-4 pt-6">
          {stats.map((s, i) => (
            <Reveal
              key={i}
              delay={0.5 + i * 0.08}
              className="lg:col-span-2 rounded-card border border-line bg-bg-soft p-4 md:p-5 flex flex-col gap-2"
            >
              <p className="text-2xl md:text-3xl font-semibold tabular-nums text-fg-strong tracking-tight">
                <AnimatedCounter value={s.v} suffix={s.suffix} />
              </p>
              <p className="text-[11px] leading-snug whitespace-pre-line text-fg-mute">
                {t(s.lKey)}
              </p>
            </Reveal>
          ))}

          <Reveal delay={0.75} className="lg:col-span-6">
            <Link
              href={`/projetos/${featured.slug}`}
              className="group relative block overflow-hidden rounded-card border border-line bg-bg-soft h-full"
            >
              <div className="grid grid-cols-2 h-full">
                <div className="relative aspect-square md:aspect-auto bg-surface overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    sizes="(min-width:1024px) 25vw, 50vw"
                    quality={90}
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 md:p-5 flex flex-col justify-between gap-3">
                  <div className="flex flex-col gap-1.5">
                    <span className="label-mono text-brand">{t("stats.destaque")}</span>
                    <h3 className="text-base md:text-lg font-semibold text-fg-strong leading-tight">
                      {featured.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-fg-strong">
                    {t("stats.ver_case")}
                    <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                  </span>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
