"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Label } from "@/components/rb/ui";
import { AGORA } from "@/content/rb/agora";

/**
 * Quem sou — Figma "03 Quem sou" (fundo escuro, "multidisciplinar" em
 * vermelho). Cartões "agora" na linha da Broadcast; a hora local de
 * Senador Firmino é real.
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
        <div className="relative order-2 aspect-[4/5] overflow-hidden rounded-lg lg:order-1">
          <Image src="/rb/portrait.jpg" alt={pt ? "Drope Fernandes sentado numa poltrona de couro" : "Drope Fernandes sitting in a leather armchair"} fill sizes="(min-width: 1024px) 560px, 100vw" className="object-cover" />
        </div>
        <div className="order-1 flex flex-col lg:order-2">
          <Label>{pt ? "Quem sou" : "About me"}</Label>
          <h2 id="quem-sou" className="mt-3 text-[clamp(36px,calc(27.43px+2.19vw),58px)] font-semibold leading-[1.08] tracking-[-0.03em] lg:mt-9">
            {pt ? (<>Sou o Drope Fernandes, designer <span className="text-brand">multidisciplinar</span> há 7 anos.</>) : (<>I&apos;m Drope Fernandes, a <span className="text-brand">multidisciplinary</span> designer for 7 years.</>)}
          </h2>
          <p className="t-small mt-4 max-w-[600px] text-ink-400 lg:mt-9">
            {pt
              ? "Construo marcas, interfaces e sites que saem do conceito e chegam ao ar. Atendo clientes no Brasil, nos Emirados Árabes e em Portugal, daqui de Senador Firmino, MG."
              : "I build brands, interfaces and websites that go from concept to launch. I work with clients in Brazil, the United Arab Emirates and Portugal, from Senador Firmino, Brazil."}
          </p>
          <div className="mt-8 grid grid-cols-2 gap-3 lg:mt-auto lg:gap-5">
            <div className={`${cardCls} col-span-2 flex items-center gap-4 sm:col-span-1`}>
              <div className="relative size-16 shrink-0 overflow-hidden rounded-md bg-ink-900 lg:size-[82px]">
                {AGORA.ouvindoCapa && <Image src={AGORA.ouvindoCapa} alt="" fill sizes="82px" className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <Label>{pt ? "Ouvindo agora" : "Listening to"}</Label>
                <p className="t-small mt-1.5 truncate">{AGORA.ouvindo[locale]}</p>
                <div className="mt-3 h-1 rounded-full bg-ink-400/60"><div className="h-1 w-[42%] rounded-full bg-brand" /></div>
              </div>
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
              <Label>Senador Firmino, MG</Label>
              <p className="t-small mt-1.5"><LocalTime /> {pt ? "agora" : "right now"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
