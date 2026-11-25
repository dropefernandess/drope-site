"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { ImageReveal, LineReveal, Reveal } from "@/components/rb/motion";
import { Label } from "@/components/rb/ui";
import { DitherPortrait } from "@/components/rb/Dither";
import { AGORA } from "@/content/rb/agora";

/**
 * Quem sou — Figma "03 Quem sou" (fundo escuro, "multidisciplinar" em
 * vermelho). Cartões "agora" na linha da Broadcast; a hora local de
 * de Brasília é real.
 */

function LocalTime() {
  const [t, setT] = useState<string | null>(null);
  useEffect(() => {
    const fmt = () => new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" }).format(new Date());
    setT(fmt());
    const id = window.setInterval(() => setT(fmt()), 30_000);
    return () => window.clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t ?? "--:--"}</span>;
}

const cardCls = "rounded-2xl border border-ink-400 bg-ink-700 p-5 lg:p-6";

export function About() {
  const { locale } = useLocale();
  const pt = locale === "pt";
  return (
    <section aria-labelledby="quem-sou" className="bg-ink-900 text-ink-50">
      <div className="rb-container grid gap-10 py-16 lg:grid-cols-[560px_1fr] lg:gap-20 lg:py-[100px]">
        <ImageReveal radius={8} className="relative order-2 aspect-[4/5] overflow-hidden rounded-lg lg:order-1">
          {/* Dither animado (pedido do Pedro, 25/11): só os pixels vermelhos por cima da foto; o mouse limpa um círculo, no celular um toque. */}
          <DitherPortrait src="/rb/portrait.jpg" alt={pt ? "Drope Fernandes sentado numa poltrona de couro" : "Drope Fernandes sitting in a leather armchair"} sizes="(min-width: 1024px) 560px, 100vw" pixel={3} overlay className="absolute inset-0" />
        </ImageReveal>
        <div className="order-1 flex flex-col lg:order-2">
          <LineReveal>
            <Label>{pt ? "Quem sou" : "About me"}</Label>
          </LineReveal>
          <Reveal as="h2" id="quem-sou" delay={0.08} className="mt-3 text-[clamp(36px,calc(27.43px+2.19vw),58px)] font-semibold leading-[1.08] tracking-[-0.03em] lg:mt-9">
            {pt ? (<>Sou o Drope Fernandes, designer <span className="t-serif text-brand">multidisciplinar</span> há 7 anos.</>) : (<>I&apos;m Drope Fernandes, a <span className="t-serif text-brand">multidisciplinary</span> designer for 7 years.</>)}
          </Reveal>
          <Reveal as="p" delay={0.16} className="t-small mt-4 max-w-[600px] text-ink-400 lg:mt-9">
            {pt
              ? "Construo marcas, interfaces e sites que saem do conceito e chegam ao ar, para clientes dentro e fora do Brasil."
              : "I build brands, interfaces and websites that go from concept to launch, for clients in Brazil and abroad."}
          </Reveal>
          <Reveal delay={0.24} className="mt-8 grid grid-cols-2 gap-3 lg:mt-auto lg:gap-5 lg:pt-12">
            <div className={`${cardCls} col-span-2 sm:col-span-1`}>
              <Label>{pt ? "Ouvindo agora" : "Listening to"}</Label>
              <iframe
                title={pt ? "Bajo de la Piel, de Milo J, no Spotify" : "Bajo de la Piel by Milo J on Spotify"}
                src={AGORA.spotifyEmbed}
                width="100%"
                height="152"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                className="mt-3 block rounded-xl border-0"
              />
            </div>
            <div className={`${cardCls} col-span-1`}>
              <Label>{pt ? "Lendo" : "Reading"}</Label>
              <p className="t-small mt-1.5">{AGORA.lendo[locale]}</p>
            </div>
            <div className={`${cardCls} col-span-1`}>
              <Label>{pt ? "Aprendendo" : "Learning"}</Label>
              <p className="t-small mt-1.5">{AGORA.aprendendo[locale]}</p>
            </div>
            <div className={`${cardCls} col-span-2 sm:col-span-1`}>
              <Label>{pt ? "Horário de Brasília" : "Brasília time"}</Label>
              <p className="t-small mt-1.5"><LocalTime /> {pt ? "agora" : "right now"}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
