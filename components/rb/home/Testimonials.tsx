"use client";

import { useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Icon, ICONS, Label } from "@/components/rb/ui";
import { LineReveal, Reveal, RevealGroup } from "@/components/rb/motion";

/**
 * Depoimentos — Figma "07 Depoimentos". Números em vermelho; no desktop os
 * quatro cartões em grade 2×2, no celular um carrossel com o próximo cartão
 * aparecendo na borda, setas e contador. Fotos dos clientes pendentes:
 * por enquanto, iniciais.
 */
export const QUOTES = [
  { name: "Isabela Silveira", role: { pt: "Sócia e diretora · Aroeira Studio", en: "Partner and director · Aroeira Studio" },
    q: { pt: "Drope entrega o que combinou, e ainda traz uma opinião sobre por que aquilo é o melhor caminho. Direção, não só execução.", en: "Drope delivers what was agreed, and brings an opinion on why that's the best path. Direction, not just execution." } },
  { name: "Marcelo Lavinas", role: { pt: "Founder · MoneyFy", en: "Founder · MoneyFy" },
    q: { pt: "Pegou identidade, UI e ainda nos guiou na arquitetura do produto. Achei que ia precisar de três fornecedores, precisei de um.", en: "He handled identity, UI and even guided us through the product architecture. I thought I'd need three vendors, I needed one." } },
  { name: "Rafael Andrade", role: { pt: "CEO · Sirius Agência", en: "CEO · Sirius Agência" },
    q: { pt: "Conheço o Drope desde o início. Cada projeto que passa por ele volta com uma camada a mais que eu não tinha pedido, e que faz diferença.", en: "I've known Drope from the start. Every project that goes through him comes back with an extra layer I didn't ask for, and it makes a difference." } },
  { name: "Poliana Carolina", role: { pt: "Sócia · Vizir Contabilidade", en: "Partner · Vizir Contabilidade" },
    q: { pt: "Site, social e papelaria conduzidos com a mesma direção. Sem ruído, sem retrabalho. Profissional fora da curva para o nosso segmento.", en: "Website, social and stationery led with the same direction. No noise, no rework. An outstanding professional for our field." } },
];

const STATS = [
  { v: "30+", pt: "projetos entregues desde 2018", en: "projects delivered since 2018" },
  { v: "4,9", en_v: "4.9", pt: "de média em 32 avaliações", en: "average across 32 reviews" },
  { v: "82%", pt: "voltam para um segundo projeto", en: "come back for a second project" },
];

const initials = (n: string) => n.split(" ").map((w) => w[0]).slice(0, 2).join("");

function QuoteCard({ q, className = "" }: { q: (typeof QUOTES)[number]; className?: string }) {
  const { locale } = useLocale();
  return (
    <figure className={`flex flex-col justify-between rounded-2xl border border-ink-100 p-6 dark:border-ink-700 lg:min-h-[306px] lg:p-8 ${className}`}>
      <blockquote className="t-body text-fg-strong">“{q.q[locale]}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-4">
        <span aria-hidden className="grid size-11 shrink-0 place-items-center rounded-full bg-ink-100 text-sm font-semibold text-ink-700 lg:size-12">{initials(q.name)}</span>
        <span>
          <span className="t-small block text-fg-strong">{q.name}</span>
          <span className="block text-sm text-ink-700 dark:text-ink-200 lg:text-base">{q.role[locale]}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const { locale } = useLocale();
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const go = (d: number) => {
    const el = track.current; if (!el) return;
    const next = Math.max(0, Math.min(QUOTES.length - 1, idx + d));
    const card = el.children[next] as HTMLElement | undefined;
    if (card) el.scrollTo({ left: card.offsetLeft - el.offsetLeft, behavior: "smooth" });
    setIdx(next);
  };
  const onScroll = () => {
    const el = track.current; if (!el) return;
    const w = (el.children[0] as HTMLElement)?.offsetWidth ?? 1;
    setIdx(Math.round(el.scrollLeft / (w + 12)));
  };
  return (
    <section aria-labelledby="depoimentos" className="bg-bg">
      <div className="rb-container py-16 lg:py-[68px]">
        <LineReveal>
          <Label className="text-ink-700 dark:text-ink-200">{locale === "pt" ? "Depoimentos" : "Testimonials"}</Label>
        </LineReveal>
        <LineReveal as="h2" id="depoimentos" delay={0.08} className="t-h1 mt-3 text-fg-strong">{locale === "pt" ? "Os clientes contam melhor." : "Clients tell it better."}</LineReveal>
        <RevealGroup as="dl" stagger={0.12} className="mt-8 divide-y divide-ink-100 border-y border-ink-100 dark:divide-ink-700 dark:border-ink-700 lg:mt-14 lg:grid lg:grid-cols-3 lg:divide-y-0 lg:border-0">
          {STATS.map((s) => (
            <RevealGroup key={s.v} stagger={0.1} className="flex items-center gap-6 py-4 lg:block lg:py-0">
              <LineReveal as="dt" className="t-hero w-[130px] shrink-0 text-brand lg:w-auto">{locale === "en" && s.en_v ? s.en_v : s.v}</LineReveal>
              <Reveal as="dd" y={12} className="t-small text-ink-700 dark:text-ink-200 lg:mt-2">{s[locale]}</Reveal>
            </RevealGroup>
          ))}
        </RevealGroup>
        {/* Desktop: grade 2×2 */}
        <RevealGroup stagger={0.1} className="mt-[90px] hidden gap-6 lg:grid lg:grid-cols-2">
          {QUOTES.map((q) => (
            <Reveal key={q.name} className="grid">
              <QuoteCard q={q} />
            </Reveal>
          ))}
        </RevealGroup>
        {/* Celular: carrossel */}
        <Reveal className="mt-10 lg:hidden">
          <div ref={track} onScroll={onScroll} className="-mr-6 flex snap-x snap-mandatory gap-3 overflow-x-auto pr-6 [scrollbar-width:none]">
            {QUOTES.map((q) => <QuoteCard key={q.name} q={q} className="w-[300px] shrink-0 snap-start" />)}
          </div>
          <div className="mt-6 flex items-center justify-between">
            <span className="t-label text-fg-strong" aria-live="polite">{idx + 1} / {QUOTES.length}</span>
            <div className="flex gap-2">
              <button type="button" onClick={() => go(-1)} aria-label={locale === "pt" ? "Depoimento anterior" : "Previous testimonial"} className="grid size-11 place-items-center rounded-full border border-ink-100 text-fg-strong disabled:opacity-40 dark:border-ink-700" disabled={idx === 0}>
                <Icon d={ICONS.arrowLeft} size={20} />
              </button>
              <button type="button" onClick={() => go(1)} aria-label={locale === "pt" ? "Próximo depoimento" : "Next testimonial"} className="grid size-11 place-items-center rounded-full border border-ink-100 text-fg-strong disabled:opacity-40 dark:border-ink-700" disabled={idx === QUOTES.length - 1}>
                <Icon d={ICONS.arrowRight} size={20} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
