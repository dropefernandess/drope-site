"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { EstimativaForm } from "@/components/calculadora/EstimativaForm";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { BrandButton, Label } from "@/components/rb/ui";
import { LineReveal, Reveal } from "@/components/rb/motion";
import type { Locale } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * Orçamento (antiga Calculadora, rebrand 2026). Valores 30% menores desde 25/11. Lógica real com state: os valores
 * são FAIXAS estimadas, não preço fechado. Preços, multiplicadores e a conta
 * da faixa (0,9× a 1,15× do total) são os mesmos da versão anterior.
 *
 * Desktop: etapas 01 a 05 à esquerda, resumo escuro preso à direita.
 * Celular: etapas, resumo e envio em sequência, com uma barra no rodapé da
 * tela mostrando a faixa enquanto a pessoa marca as opções.
 */

type Servico = { id: string; price: number };
const SERVICOS: Servico[] = [
  { id: "branding", price: 2500 },
  { id: "web",      price: 2400 },
  { id: "ui",       price: 2900 },
  { id: "motion",   price: 1700 },
  { id: "social",   price: 1300 },
];

type Escopo = "lean" | "completo" | "premium";
const ESCOPOS: { id: Escopo; mult: number }[] = [
  { id: "lean",     mult: 1.0 },
  { id: "completo", mult: 1.25 },
  { id: "premium",  mult: 1.5 },
];

type Prazo = "flex" | "normal" | "express";
const PRAZOS: { id: Prazo; mult: number }[] = [
  { id: "flex",    mult: 0.92 },
  { id: "normal",  mult: 1.0 },
  { id: "express", mult: 1.2 },
];

type Addon = { id: string; price: number };
const ADDONS: Addon[] = [
  { id: "copy",      price: 650 },
  { id: "extra-rev", price: 300 },
  { id: "handoff",   price: 500 },
];

type Item = { label: string; desc?: string };

const COPY: Record<Locale, {
  label: string; titleA: string; titleB: string; lead: string;
  steps: { title: string; helper: string }[];
  servicos: Record<string, Item>;
  escopos: Record<Escopo, Item>;
  prazos: Record<Prazo, Item>;
  addons: Record<string, Item>;
  from: string; base: string;
  resumo: string; empty: string; to: string; note: string;
  rowServicos: string; rowEscopo: string; rowPrazo: string; rowAddons: string; rowTotal: string;
  cta: string; bar: string; barEmpty: string; barLink: string;
  wa: { hi: string; services: string; scope: string; timeline: string; addons: string; estimate: string; bye: string; empty: string };
}> = {
  pt: {
    label: "Orçamento",
    titleA: "Quanto custa o seu",
    titleB: "projeto?",
    lead: "Marque o que você precisa, escolha o escopo e o prazo. A estimativa muda na hora. Para um valor fechado, me manda a estimativa e eu respondo em até 24 horas.",
    steps: [
      { title: "Quais serviços você precisa?", helper: "Pode marcar mais de um." },
      { title: "Qual o escopo?", helper: "Define a profundidade e a duração do projeto." },
      { title: "Qual o prazo?", helper: "No expresso, o seu projeto passa na frente da fila." },
      { title: "Quer algum adicional?", helper: "Opcional. Soma ao valor final." },
      { title: "Quer um valor fechado?", helper: "Me manda a estimativa com seu nome e e-mail. Eu respondo em até 24 horas." },
    ],
    servicos: {
      branding: { label: "Branding", desc: "Logo, paleta, tipografia e manual." },
      ui:       { label: "UI/UX design", desc: "App, painel ou produto: fluxos, protótipo e telas finais." },
      web:      { label: "Web design", desc: "Landing page ou site institucional, já desenvolvido." },
      motion:   { label: "Motion design", desc: "Animação de logo e microinterações." },
      social:   { label: "Social media", desc: "Kit de templates e um mês de posts." },
    },
    escopos: {
      lean:     { label: "Enxuto", desc: "O essencial, em 2 a 3 semanas." },
      completo: { label: "Completo", desc: "Mais rodadas de ajuste, em 4 a 6 semanas." },
      premium:  { label: "Premium", desc: "Escopo estendido e suporte prolongado, em 6 a 10 semanas." },
    },
    prazos: {
      flex:    { label: "Flexível", desc: "Sem pressa. Sai um pouco mais em conta." },
      normal:  { label: "Normal", desc: "O cronograma padrão." },
      express: { label: "Expresso", desc: "Prioridade máxima na minha agenda." },
    },
    addons: {
      copy:        { label: "Copywriting estratégico" },
      "extra-rev": { label: "Rodada extra de revisão" },
      handoff:     { label: "Handoff completo para dev" },
    },
    from: "a partir de",
    base: "Base",
    resumo: "Sua estimativa",
    empty: "Marque ao menos um serviço para ver a estimativa.",
    to: "a",
    note: "É uma faixa, não um preço fechado. O valor final sai depois de conversarmos sobre o escopo.",
    rowServicos: "Serviços",
    rowEscopo: "Escopo",
    rowPrazo: "Prazo",
    rowAddons: "Adicionais",
    rowTotal: "Total estimado",
    cta: "Pedir orçamento",
    bar: "Estimativa",
    barEmpty: "Marque um serviço",
    barLink: "Ver resumo",
    wa: {
      hi: "Oi, Drope! Vim da página de orçamento do site.",
      services: "Serviços", scope: "Escopo", timeline: "Prazo", addons: "Adicionais",
      estimate: "Estimativa",
      bye: "Quero conversar sobre o projeto.",
      empty: "Oi, Drope! Vim da página de orçamento do site e quero conversar sobre um projeto.",
    },
  },
  en: {
    label: "Quote",
    titleA: "How much does your project",
    titleB: "cost?",
    lead: "Pick what you need, then choose the scope and timeline. The estimate updates as you go. For a final quote, send it to me and I'll reply within 24 hours.",
    steps: [
      { title: "Which services do you need?", helper: "You can pick more than one." },
      { title: "What scope?", helper: "It sets the depth and length of the project." },
      { title: "What timeline?", helper: "With express, your project moves to the front of the line." },
      { title: "Any add-ons?", helper: "Optional. Added to the final value." },
      { title: "Want a final quote?", helper: "Send me the estimate with your name and email. I'll reply within 24 hours." },
    ],
    servicos: {
      branding: { label: "Branding", desc: "Logo, palette, typography and guidelines." },
      ui:       { label: "UI/UX design", desc: "App, dashboard or product: flows, prototype and final screens." },
      web:      { label: "Web design", desc: "Landing page or company website, fully built." },
      motion:   { label: "Motion design", desc: "Logo animation and microinteractions." },
      social:   { label: "Social media", desc: "Template kit and one month of posts." },
    },
    escopos: {
      lean:     { label: "Lean", desc: "The essentials, in 2 to 3 weeks." },
      completo: { label: "Complete", desc: "More refinement rounds, in 4 to 6 weeks." },
      premium:  { label: "Premium", desc: "Extended scope and longer support, in 6 to 10 weeks." },
    },
    prazos: {
      flex:    { label: "Flexible", desc: "No rush. A little cheaper." },
      normal:  { label: "Standard", desc: "The usual schedule." },
      express: { label: "Express", desc: "Top priority in my schedule." },
    },
    addons: {
      copy:        { label: "Strategic copywriting" },
      "extra-rev": { label: "Extra review round" },
      handoff:     { label: "Complete dev handoff" },
    },
    from: "from",
    base: "Base",
    resumo: "Your estimate",
    empty: "Pick at least one service to see the estimate.",
    to: "to",
    note: "This is a range, not a final price. The final value comes after we talk about the scope.",
    rowServicos: "Services",
    rowEscopo: "Scope",
    rowPrazo: "Timeline",
    rowAddons: "Add-ons",
    rowTotal: "Estimated total",
    cta: "Get a final quote",
    bar: "Estimate",
    barEmpty: "Pick a service",
    barLink: "See summary",
    wa: {
      hi: "Hi Drope! I came from the quote page on your website.",
      services: "Services", scope: "Scope", timeline: "Timeline", addons: "Add-ons",
      estimate: "Estimate",
      bye: "I'd like to talk about the project.",
      empty: "Hi Drope! I came from the quote page on your website and I'd like to talk about a project.",
    },
  },
};

export function Calculadora() {
  const { locale } = useLocale();
  const c = COPY[locale];
  const tag = locale === "pt" ? "pt-BR" : "en-US";
  const fmt = (n: number) =>
    new Intl.NumberFormat(tag, { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);
  const fmtMult = (n: number) =>
    new Intl.NumberFormat(tag, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n);
  const pct = (mult: number) => {
    const p = Math.round((mult - 1) * 100);
    if (p === 0) return c.base;
    return p > 0 ? `+${p}%` : `−${Math.abs(p)}%`;
  };

  const [servicos, setServicos] = useState<string[]>(["branding"]);
  const [escopo, setEscopo]     = useState<Escopo>("completo");
  const [prazo, setPrazo]       = useState<Prazo>("normal");
  const [addons, setAddons]     = useState<string[]>([]);

  const toggle = (setter: React.Dispatch<React.SetStateAction<string[]>>) => (id: string) =>
    setter((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const calc = useMemo(() => {
    const baseServicos = SERVICOS.filter((s) => servicos.includes(s.id)).reduce((sum, s) => sum + s.price, 0);
    const multEscopo   = ESCOPOS.find((e) => e.id === escopo)?.mult ?? 1;
    const multPrazo    = PRAZOS.find((p) => p.id === prazo)?.mult ?? 1;
    const baseAddons   = ADDONS.filter((a) => addons.includes(a.id)).reduce((sum, a) => sum + a.price, 0);

    const subtotal = baseServicos * multEscopo * multPrazo;
    const total    = subtotal + baseAddons;
    const min      = Math.round(total * 0.9 / 100) * 100;
    const max      = Math.round(total * 1.15 / 100) * 100;

    return { baseServicos, multEscopo, multPrazo, subtotal, baseAddons, total, min, max };
  }, [servicos, escopo, prazo, addons]);

  const canCalc = servicos.length > 0;
  const escopoLabel = c.escopos[escopo].label;
  const prazoLabel  = c.prazos[prazo].label;
  const servicoLabels = SERVICOS.filter((s) => servicos.includes(s.id)).map((s) => c.servicos[s.id].label);
  const addonLabels   = ADDONS.filter((a) => addons.includes(a.id)).map((a) => c.addons[a.id].label);

  const resumoWhatsapp = canCalc
    ? `${c.wa.hi}\n\n` +
      `${c.wa.services}: ${servicoLabels.join(", ")}\n` +
      `${c.wa.scope}: ${escopoLabel}\n` +
      `${c.wa.timeline}: ${prazoLabel}\n` +
      (addonLabels.length ? `${c.wa.addons}: ${addonLabels.join(", ")}\n` : "") +
      `\n${c.wa.estimate}: ${fmt(calc.min)} ${c.to} ${fmt(calc.max)}\n\n${c.wa.bye}`
    : c.wa.empty;

  // Barra do celular: aparece enquanto as etapas estão na tela e o resumo não.
  const stepsRef = useRef<HTMLDivElement>(null);
  const resumoRef = useRef<HTMLElement>(null);
  const [stepsIn, setStepsIn] = useState(false);
  const [resumoIn, setResumoIn] = useState(false);
  useEffect(() => {
    const steps = stepsRef.current, resumo = resumoRef.current;
    if (!steps || !resumo || typeof IntersectionObserver === "undefined") return;
    const a = new IntersectionObserver(([e]) => setStepsIn(e.isIntersecting));
    // margem extra embaixo: a barra some um pouco antes de o resumo entrar
    const b = new IntersectionObserver(([e]) => setResumoIn(e.isIntersecting), { rootMargin: "0px 0px 160px 0px" });
    a.observe(steps); b.observe(resumo);
    return () => { a.disconnect(); b.disconnect(); };
  }, []);
  const showBar = stepsIn && !resumoIn;

  return (
    <div className="bg-bg pb-24 pt-[120px] lg:pb-40 lg:pt-[168px]">
      <div className="rb-container">
        {/* ===== CABEÇALHO ===== */}
        <header className="max-w-[980px]">
          <LineReveal><Label className="text-ink-700 dark:text-ink-200">{c.label}</Label></LineReveal>
          <Reveal as="h1" delay={0.08} className="t-hero mt-4 text-fg-strong">
            {c.titleA} <span className="t-serif t-hero-serif text-brand">{c.titleB}</span>
          </Reveal>
          <Reveal as="p" delay={0.18} className="t-lead mt-6 max-w-[760px] text-ink-700 dark:text-ink-200 lg:mt-8">{c.lead}</Reveal>
        </header>

        <div className="mt-14 grid grid-cols-1 gap-14 lg:mt-24 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-x-16 lg:gap-y-20 xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-x-24">
          {/* ===== ETAPAS 01 A 04 ===== */}
          <div ref={stepsRef} className="flex min-w-0 flex-col gap-14 lg:col-start-1 lg:row-start-1 lg:gap-20">
            <Step n="01" id="servicos" {...c.steps[0]}>
              <div className="grid gap-3 sm:grid-cols-2">
                {SERVICOS.map((s) => (
                  <Option
                    key={s.id}
                    type="checkbox"
                    name="servicos"
                    checked={servicos.includes(s.id)}
                    onChange={() => toggle(setServicos)(s.id)}
                    title={c.servicos[s.id].label}
                    desc={c.servicos[s.id].desc}
                    meta={`${c.from} ${fmt(s.price)}`}
                  />
                ))}
              </div>
            </Step>

            <Step n="02" id="escopo" {...c.steps[1]}>
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1 min-[1360px]:grid-cols-3">
                {ESCOPOS.map((e) => (
                  <Option
                    key={e.id}
                    type="radio"
                    name="escopo"
                    checked={escopo === e.id}
                    onChange={() => setEscopo(e.id)}
                    title={c.escopos[e.id].label}
                    desc={c.escopos[e.id].desc}
                    meta={pct(e.mult)}
                  />
                ))}
              </div>
            </Step>

            <Step n="03" id="prazo" {...c.steps[2]}>
              <div className="grid gap-3 md:grid-cols-3 lg:grid-cols-1 min-[1360px]:grid-cols-3">
                {PRAZOS.map((p) => (
                  <Option
                    key={p.id}
                    type="radio"
                    name="prazo"
                    checked={prazo === p.id}
                    onChange={() => setPrazo(p.id)}
                    title={c.prazos[p.id].label}
                    desc={c.prazos[p.id].desc}
                    meta={pct(p.mult)}
                  />
                ))}
              </div>
            </Step>

            <Step n="04" id="adicionais" {...c.steps[3]}>
              <div className="grid gap-3 sm:grid-cols-2">
                {ADDONS.map((a) => (
                  <Option
                    key={a.id}
                    type="checkbox"
                    name="adicionais"
                    checked={addons.includes(a.id)}
                    onChange={() => toggle(setAddons)(a.id)}
                    title={c.addons[a.id].label}
                    meta={`+ ${fmt(a.price)}`}
                  />
                ))}
              </div>
            </Step>
          </div>

          {/* ===== RESUMO (preso à direita no desktop) ===== */}
          <div className="min-w-0 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <section
              ref={resumoRef}
              id="resumo"
              aria-labelledby="resumo-titulo"
              className="scroll-mt-28 rounded-2xl bg-ink-900 p-6 text-ink-50 dark:border dark:border-ink-700 lg:sticky lg:top-[112px] lg:p-8"
            >
              <h2 id="resumo-titulo" className="t-label text-ink-200">{c.resumo}</h2>
              <div aria-live="polite" aria-atomic="true" className="mt-4">
                {canCalc ? (
                  <p className="t-h1 tabular-nums">
                    <span className="block">{fmt(calc.min)}</span>
                    <span className="block">
                      <span className="t-serif font-normal text-brand">{c.to}</span> {fmt(calc.max)}
                    </span>
                  </p>
                ) : (
                  <p className="t-lead text-ink-50">{c.empty}</p>
                )}
              </div>
              <p className="t-small mt-5 text-ink-200">{c.note}</p>

              <dl className="t-small mt-6 border-t border-ink-700">
                <Row label={c.rowServicos} value={fmt(calc.baseServicos)} />
                <Row label={`${c.rowEscopo} (${escopoLabel})`} value={`× ${fmtMult(calc.multEscopo)}`} />
                <Row label={`${c.rowPrazo} (${prazoLabel})`} value={`× ${fmtMult(calc.multPrazo)}`} />
                {calc.baseAddons > 0 && <Row label={c.rowAddons} value={`+ ${fmt(calc.baseAddons)}`} />}
                <Row label={c.rowTotal} value={canCalc ? fmt(calc.total) : fmt(0)} strong />
              </dl>

              <BrandButton href="#enviar" variant="principal" full className="mt-8">
                {c.cta}
              </BrandButton>
            </section>
          </div>

          {/* ===== ETAPA 05: ENVIAR ===== */}
          <div className="min-w-0 lg:col-start-1 lg:row-start-2">
            <Step n="05" id="enviar" {...c.steps[4]} asSection>
              <EstimativaForm
                canSubmit={canCalc}
                payload={{
                  servicos: servicoLabels,
                  escopo: escopoLabel,
                  prazo: prazoLabel,
                  addons: addonLabels,
                  faixaMin: calc.min,
                  faixaMax: calc.max,
                }}
                resumoWhatsapp={resumoWhatsapp}
              />
            </Step>
          </div>
        </div>
      </div>

      {/* ===== BARRA DO CELULAR ===== */}
      <div
        className={cn(
          "fixed inset-x-4 bottom-4 z-40 transition-[opacity,transform] duration-300 lg:hidden",
          showBar ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        aria-hidden={!showBar}
      >
        <a
          href="#resumo"
          tabIndex={showBar ? 0 : -1}
          className="flex min-h-14 items-center justify-between gap-4 rounded-2xl border border-ink-700 bg-ink-900 py-3 pl-5 pr-4 text-ink-50 shadow-xl"
        >
          <span className="min-w-0">
            <span className="block text-sm font-semibold uppercase tracking-[0.03em] text-ink-200">{c.bar}</span>
            <span className="block truncate text-base font-semibold tabular-nums">
              {canCalc ? `${fmt(calc.min)} ${c.to} ${fmt(calc.max)}` : c.barEmpty}
            </span>
          </span>
          <span className="shrink-0 text-base font-medium underline decoration-ink-400 underline-offset-4">{c.barLink}</span>
        </a>
      </div>
    </div>
  );
}

/* ----- peças internas ----- */

function Step({
  n, id, title, helper, children, asSection,
}: { n: string; id: string; title: string; helper: string; children: React.ReactNode; asSection?: boolean }) {
  const head = (
    <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:gap-4">
      <span aria-hidden className="rounded-pill bg-brand px-3 py-1 text-lg font-semibold leading-[22px] text-ink-50">{n}</span>
      <h2 id={`${id}-titulo`} className="t-h3 text-fg-strong">{title}</h2>
    </div>
  );
  const help = <p id={`${id}-ajuda`} className="t-small mt-3 text-ink-700 dark:text-ink-200">{helper}</p>;

  // Etapa 05 é um formulário, não um grupo de opções.
  if (asSection) {
    return (
      <section id={id} aria-labelledby={`${id}-titulo`} className="scroll-mt-28 border-t border-ink-100 pt-10 dark:border-ink-700 lg:pt-14">
        {head}
        {help}
        <div className="mt-8">{children}</div>
      </section>
    );
  }
  return (
    <fieldset id={id} aria-labelledby={`${id}-titulo`} aria-describedby={`${id}-ajuda`} className="min-w-0">
      {head}
      {help}
      <div className="mt-6 lg:mt-8">{children}</div>
    </fieldset>
  );
}

const CHECK = <path d="M20 6 9 17l-5-5" />;

function Option({
  type, name, checked, onChange, title, desc, meta,
}: {
  type: "checkbox" | "radio";
  name: string;
  checked: boolean;
  onChange: () => void;
  title: string;
  desc?: string;
  meta?: string;
}) {
  return (
    <label className="relative block cursor-pointer">
      <input type={type} name={name} checked={checked} onChange={onChange} className="peer sr-only" />
      <span
        className={cn(
          "flex h-full min-h-[44px] flex-col rounded-xl border p-5 transition-colors duration-200 lg:p-6",
          "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand",
          checked
            ? "border-ink-900 bg-ink-900 text-ink-50 dark:border-ink-50 dark:bg-ink-50 dark:text-ink-900"
            : "border-ink-100 bg-bg-soft/60 text-fg-strong hover:border-ink-400 dark:border-ink-700 dark:bg-transparent dark:hover:border-ink-400"
        )}
      >
        <span className="flex items-start justify-between gap-4">
          <span className="t-small font-semibold">{title}</span>
          <span
            aria-hidden
            className={cn(
              "mt-0.5 grid size-6 shrink-0 place-items-center transition-colors",
              type === "radio" ? "rounded-full" : "rounded-md",
              checked ? "bg-brand text-ink-50" : "border-2 border-ink-200 dark:border-ink-400"
            )}
          >
            {checked && type === "checkbox" && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3.5} strokeLinecap="round" strokeLinejoin="round">{CHECK}</svg>
            )}
            {checked && type === "radio" && <span className="size-2.5 rounded-full bg-ink-50" />}
          </span>
        </span>
        {desc && (
          <span className={cn("t-small mt-2 block", checked ? "text-ink-200 dark:text-ink-700" : "text-ink-700 dark:text-ink-200")}>
            {desc}
          </span>
        )}
        {meta && (
          <span className={cn("t-label mt-auto block pt-4", checked ? "text-ink-100 dark:text-ink-700" : "text-ink-700 dark:text-ink-200")}>
            {meta}
          </span>
        )}
      </span>
    </label>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4 border-b border-ink-700 py-3", strong && "border-b-0 pt-4")}>
      <dt className={strong ? "text-ink-50" : "text-ink-200"}>{label}</dt>
      <dd className={cn("tabular-nums", strong ? "font-semibold text-ink-50" : "text-ink-50")}>{value}</dd>
    </div>
  );
}
