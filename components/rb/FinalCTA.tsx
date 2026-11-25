"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { BrandButton } from "@/components/rb/ui";
import { LineReveal, Reveal, RevealGroup } from "@/components/rb/motion";

/** Chamada final vermelha — Figma "09 Chamada final". Usada no fim de todas as páginas. */
const COPY = {
  pt: {
    a: "Vamos",
    b: "alinhar?",
    p: "Trinta minutos de conversa, sem compromisso, para entender o projeto e o caminho até o ar. Se preferir, a página de orçamento dá uma estimativa honesta em dois minutos.",
    agendar: "Agendar uma conversa",
    calcular: "Fazer meu orçamento",
  },
  en: {
    a: "Shall we",
    b: "talk?",
    p: "Thirty minutes, no strings attached, to understand the project and the path to launch. If you prefer, the quote page gives you an honest estimate in two minutes.",
    agendar: "Book a call",
    calcular: "Get a quote",
  },
};

export function FinalCTA() {
  const { locale } = useLocale();
  const c = COPY[locale];
  return (
    <section aria-labelledby="cta-final" className="bg-brand text-ink-50">
      <div className="rb-container flex flex-col items-center py-24 text-center lg:py-44">
        <RevealGroup as="h2" id="cta-final" stagger={0.14} className="flex flex-col items-center leading-none md:flex-row md:items-baseline md:gap-6">
          <LineReveal as="span" className="t-display">{c.a}</LineReveal>
          {/* A palavra em serifa flutua de leve depois de entrar (rb-float, desliga em "reduzir movimento") */}
          <LineReveal as="span" className="t-serif text-[clamp(72px,calc(45.26px+6.857vw),150px)]"><span className="rb-float">{c.b}</span></LineReveal>
        </RevealGroup>
        <Reveal as="p" delay={0.25} className="t-lead mt-6 max-w-[760px] text-ink-50 lg:mt-12">{c.p}</Reveal>
        <Reveal delay={0.35} className="mt-8 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center sm:gap-6 lg:mt-12">
          <BrandButton href="/agendar" variant="escuro">{c.agendar}</BrandButton>
          <BrandButton href="/orcamento" variant="contorno-vermelho">{c.calcular}</BrandButton>
        </Reveal>
      </div>
    </section>
  );
}
