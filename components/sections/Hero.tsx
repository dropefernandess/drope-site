"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import {
  GlitchText,
  Magnetic,
  AnimatedCounter,
  Parallax,
} from "@/components/ui/Effects";
import { projetos } from "@/content/projetos";

const featured = projetos.find((p) => p.slug === "bada-bing")!;

const stats: { v: number; suffix: string; l: string }[] = [
  { v: 30, suffix: "+", l: "Marcas atendidas\ndesde 2018" },
  { v: 82, suffix: "%", l: "Voltam pra um\nsegundo projeto" },
  { v: 24, suffix: "h", l: "Tempo médio\nde resposta" },
];

/**
 * Hero — copy humanizada, sem hífens, sem floreio.
 * Glitch text reveal no nome, parallax na foto, animated counters,
 * magnetic CTAs.
 */
export function Hero() {
  return (
    <section className="relative pt-28 md:pt-32 pb-12 md:pb-20 overflow-hidden">
      <Container className="relative flex flex-col gap-12">

        {/* — TOP META BAR — */}
        <Reveal className="flex items-center justify-between gap-4 flex-wrap" delay={0.05}>
          <p className="label-mono flex items-center gap-2">
            <span className="size-1 rounded-full bg-brand" />
            Pedro Fernandes · Designer desde 2018
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <Clock className="size-3 text-fg-mute" strokeWidth={2.5} />
              Aceitando projetos pra Q3 2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <span className="size-1.5 rounded-full bg-status" />
              Senador Firmino · MG
            </span>
          </div>
        </Reveal>

        {/* — HEADLINE + FOTO — */}
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-center">
          <div className="lg:col-span-8 flex flex-col gap-7">
            <Reveal delay={0.1}>
              <h1 className="text-display text-fg-strong text-balance">
                <span className="block">Crio marcas que ficam</span>
                <span className="block">na memória <span className="text-fg-mute">e nascem prontas pra durar.</span></span>
              </h1>
            </Reveal>

            <Reveal delay={0.3} className="text-lead max-w-prose">
              Sou{" "}
              <GlitchText
                text="Drope"
                className="font-semibold text-fg-strong"
                trigger="mount"
                duration={900}
                delay={400}
              />
              . Atuo entre identidade visual, interface, motion e código,
              do briefing à launch. Quando o projeto pede mais profundidade em
              alguma frente, conto com{" "}
              <span className="text-fg-strong">parceiros de confiança</span>{" "}
              em motion e dev pra fechar o time.
            </Reveal>

            <Reveal delay={0.4} className="flex flex-wrap items-center gap-3">
              <Magnetic strength={0.18}>
                <Link
                  href="#projetos"
                  className="group inline-flex items-center gap-2 rounded-pill bg-brand px-6 py-3.5 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition shadow-sm"
                >
                  Ver trabalhos
                  <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
              </Magnetic>
              <Magnetic strength={0.18}>
                <Link
                  href="/agendar"
                  className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-6 py-3.5 text-sm font-semibold text-fg-strong hover:bg-surface transition"
                >
                  Agendar conversa
                </Link>
              </Magnetic>
              <Link
                href="/calculadora"
                className="hidden md:inline-flex items-center gap-1.5 text-sm font-medium text-fg-mute hover:text-fg-strong transition ml-2"
              >
                Estimar projeto
                <ArrowUpRight className="size-3.5" strokeWidth={2} />
              </Link>
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
                  src="/sobre.png"
                  alt="Pedro Fernandes (Drope)"
                  fill
                  sizes="(min-width:1024px) 340px, 80vw"
                  quality={90}
                  className="object-cover"
                  priority
                />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between gap-3">
                  <span className="rounded-pill bg-bg/90 backdrop-blur border border-line px-3 py-1.5 text-xs font-semibold text-fg-strong">
                    Drope · 2026
                  </span>
                  <span className="inline-flex size-9 items-center justify-center rounded-full bg-brand">
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
                {s.l}
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
                    <span className="label-mono text-brand">Em destaque · 2025</span>
                    <h3 className="text-base md:text-lg font-semibold text-fg-strong leading-tight">
                      {featured.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-semibold text-fg-strong">
                    Ver case
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
