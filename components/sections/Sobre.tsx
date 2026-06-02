"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, MapPin, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { AnimatedCounter } from "@/components/ui/Effects";

/**
 * Sobre — bento. Foto grande à esquerda + cards de meta à direita.
 * Spotify "Ouvindo agora" substituiu o Status (era redundante).
 */

export function Sobre() {
  return (
    <section id="sobre" className="bg-bg-soft section-padding overflow-hidden">
      <Container className="flex flex-col gap-12">

        {/* HEADER */}
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">04</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>Quem é o Drope</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                Por trás de cada projeto.
              </h2>
            </div>
            <p className="lg:col-span-5 text-body max-w-prose">
              Atuo na intersecção entre arte e técnica. Cada projeto é tratado
              como um organismo vivo que precisa de forma, função e sentido.
            </p>
          </div>
        </Reveal>

        {/* BENTO GRID — 12 cols × auto-rows */}
        <div className="grid gap-3 lg:grid-cols-12 lg:auto-rows-[180px]">

          {/* FOTO GRANDE — 5 cols × 3 rows */}
          <Reveal delay={0.05} className="lg:col-span-5 lg:row-span-3 relative rounded-section overflow-hidden bg-surface min-h-[420px]">
            <Image
              src="/sobre-trabalho.png"
              alt="Pedro Fernandes (Drope) trabalhando no MacBook"
              fill
              sizes="(min-width:1024px) 45vw, 100vw"
              quality={90}
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900/85 via-ink-900/20 to-transparent" />
            <div className="absolute top-5 left-5 right-5 flex items-center justify-between gap-3">
              <span className="rounded-pill bg-bg/90 backdrop-blur border border-line px-3 py-1.5 text-xs font-semibold text-fg-strong">
                Pedro Fernandes
              </span>
              <Link
                href="/sobre"
                aria-label="Conhecer a história completa"
                className="size-10 rounded-full bg-brand flex items-center justify-center transition hover:scale-105"
              >
                <ArrowUpRight className="size-4 text-brand-fg" strokeWidth={2.5} />
              </Link>
            </div>
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-ink-50 text-xl md:text-2xl font-semibold leading-tight text-balance max-w-md">
                Drope é como me chamam. Trabalho com design desde 2018.
              </p>
            </div>
          </Reveal>

          {/* CARD BIO TEXT — 7 cols × 1 row (texto mais punchy) */}
          <Reveal delay={0.1} className="lg:col-span-7 lg:row-span-1 rounded-section border border-line bg-bg p-6 md:p-7 flex flex-col gap-3 justify-center">
            <p className="label-mono">MANIFESTO</p>
            <p className="text-lg md:text-xl leading-snug text-fg-strong max-w-prose font-medium">
              Branding, web, UI e motion.{" "}
              <span className="text-fg-mute">
                Tudo da mesma cabeça, do briefing à launch.
              </span>
            </p>
          </Reveal>

          {/* STAT — anos no ofício — 3 cols × 1 row */}
          <Reveal delay={0.15} className="lg:col-span-3 lg:row-span-1 rounded-section bg-brand p-6 md:p-7 flex flex-col justify-between gap-3">
            <p className="text-[11px] uppercase tracking-wider font-medium text-brand-fg/80">
              ANOS NO OFÍCIO
            </p>
            <p className="text-5xl md:text-6xl font-semibold tabular-nums text-brand-fg tracking-tight leading-none">
              <AnimatedCounter value={8} suffix="+" />
            </p>
          </Reveal>

          {/* STAT — projetos — 4 cols × 1 row */}
          <Reveal delay={0.2} className="lg:col-span-4 lg:row-span-1 rounded-section border border-line bg-bg p-6 md:p-7 flex flex-col justify-between gap-3">
            <p className="text-[11px] uppercase tracking-wider font-medium text-fg-mute">
              PROJETOS ENTREGUES
            </p>
            <div className="flex items-baseline gap-2">
              <p className="text-5xl md:text-6xl font-semibold tabular-nums text-fg-strong tracking-tight leading-none">
                <AnimatedCounter value={30} suffix="+" />
              </p>
              <Sparkles className="size-5 text-brand" strokeWidth={2} />
            </div>
          </Reveal>

          {/* CARD LOCATION — 3 cols × 1 row */}
          <Reveal delay={0.25} className="lg:col-span-3 lg:row-span-1 rounded-section border border-line bg-bg-soft p-6 md:p-7 flex flex-col justify-between gap-3">
            <div className="flex items-center justify-between">
              <p className="label-mono">LOCALIZAÇÃO</p>
              <MapPin className="size-4 text-brand" strokeWidth={2} />
            </div>
            <p className="text-base md:text-lg font-semibold text-fg-strong leading-snug">
              Senador Firmino<br />
              <span className="text-fg-mute font-normal text-sm">Minas Gerais, BR</span>
            </p>
          </Reveal>

          {/* SPOTIFY — 4 cols × 1 row, player compacto Spotify */}
          <Reveal delay={0.3} className="lg:col-span-4 lg:row-span-1 rounded-section border border-line bg-bg p-4 flex flex-col gap-2.5 overflow-hidden">
            <div className="flex items-center justify-between gap-3">
              <p className="label-mono">OUVINDO ENQUANTO CRIO</p>
              <span className="inline-flex items-center gap-1.5 rounded-pill bg-[#1ed760]/15 px-2.5 py-1 text-[10px] font-semibold text-[#178a44]">
                <span className="size-1.5 rounded-full bg-[#1ed760] animate-pulse" />
                Spotify
              </span>
            </div>
            <iframe
              title="Saudade do Mar — Don L"
              src="https://open.spotify.com/embed/track/74ZZCnIZETJKxU4poj7vtB?utm_source=generator&theme=0"
              width="100%"
              height="80"
              frameBorder={0}
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="rounded-xl"
            />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
