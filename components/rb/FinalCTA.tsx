"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { BrandButton } from "@/components/rb/ui";

/** Chamada final vermelha — Figma "09 Chamada final". Usada no fim de todas as páginas. */
const COPY = {
  pt: {
    a: "Vamos",
    b: "alinhar?",
    p: "Trinta minutos de conversa, sem compromisso, para entender o projeto e o caminho até o ar. Se preferir, a calculadora dá uma estimativa honesta em dois minutos.",
    agendar: "Agendar uma conversa",
    calcular: "Calcular meu projeto",
  },
  en: {
    a: "Shall we",
    b: "talk?",
    p: "Thirty minutes, no strings attached, to understand the project and the path to launch. If you prefer, the calculator gives you an honest estimate in two minutes.",
    agendar: "Book a call",
    calcular: "Estimate my project",
  },
};

export function FinalCTA() {
  const { locale } = useLocale();
  const c = COPY[locale];
  return (
    <section aria-labelledby="cta-final" className="bg-brand text-ink-50">
      <div className="rb-container flex flex-col items-center py-24 text-center lg:py-44">
        <h2 id="cta-final" className="flex flex-col items-center leading-none md:flex-row md:items-baseline md:gap-6">
          <span className="t-display">{c.a}</span>
          <span className="t-serif text-[clamp(72px,calc(45.26px+6.857vw),150px)]">{c.b}</span>
        </h2>
        <p className="t-lead mt-6 max-w-[760px] text-ink-50 lg:mt-12">{c.p}</p>
        <div className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6 lg:mt-12">
          <BrandButton href="/agendar" variant="escuro">{c.agendar}</BrandButton>
          <BrandButton href="/calculadora" variant="contorno-vermelho">{c.calcular}</BrandButton>
        </div>
      </div>
    </section>
  );
}
