"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EstimativaForm } from "@/components/calculadora/EstimativaForm";
import { cn } from "@/lib/utils";

/**
 * Calculadora de orçamento — referência visual: athos2/calculator.
 * Lógica real com state. Valores são FAIXAS estimadas (não preço fechado).
 *
 * Modelo:
 *   total = (serviços somados) × multiplicador(escopo) × multiplicador(prazo)
 *   + add-ons fixos
 *
 * Ajustar números abaixo conforme seu pricing real.
 */

type Servico = { id: string; label: string; price: number; desc: string };
const SERVICOS: Servico[] = [
  { id: "branding",  label: "Brand system",  price: 4900, desc: "Logo, paleta, tipografia, manual." },
  { id: "ui",        label: "UI/UX Design",  price: 4100, desc: "Wireframes, protótipo, design final." },
  { id: "web",       label: "Web design",    price: 3400, desc: "Landing ou site institucional." },
  { id: "dev",       label: "Front-end",     price: 3600, desc: "Implementação em Next.js + Tailwind." },
  { id: "motion",    label: "Motion design", price: 2400, desc: "Logo reveal, microinterações." },
  { id: "social",    label: "Social media",  price: 1800, desc: "Kit de templates + 1 mês de posts." },
];

type Escopo = "lean" | "completo" | "premium";
const ESCOPOS: { id: Escopo; label: string; mult: number; desc: string }[] = [
  { id: "lean",     label: "Lean",     mult: 1.0,  desc: "Essencial. 2–3 semanas." },
  { id: "completo", label: "Completo", mult: 1.35, desc: "Padrão. Mais iterações. 4–6 semanas." },
  { id: "premium",  label: "Premium",  mult: 1.7,  desc: "Estendido. Suporte prolongado. 6–10 semanas." },
];

type Prazo = "flex" | "normal" | "express";
const PRAZOS: { id: Prazo; label: string; mult: number; desc: string }[] = [
  { id: "flex",    label: "Flexível", mult: 0.92, desc: "Sem prazo apertado. Desconto pequeno." },
  { id: "normal",  label: "Normal",   mult: 1.0,  desc: "Cronograma padrão." },
  { id: "express", label: "Express",  mult: 1.3,  desc: "Prioridade máxima. Fila reduzida." },
];

type Addon = { id: string; label: string; price: number };
const ADDONS: Addon[] = [
  { id: "copy",      label: "Copywriting estratégico", price: 900 },
  { id: "extra-rev", label: "Rodada extra de revisão", price: 450 },
  { id: "handoff",   label: "Handoff dev completo",    price: 700 },
];

const fmt = (n: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);

export default function CalculadoraPage() {
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

    return { subtotal, baseAddons, total, min, max };
  }, [servicos, escopo, prazo, addons]);

  const canCalc = servicos.length > 0;

  return (
    <div className="pt-24 md:pt-32 pb-24">
      <Container as="div" className="flex flex-col gap-12">
        {/* ===== HEADER CLEAN ===== */}
        <header className="flex flex-col gap-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Calculadora · Estimativa rápida
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              Faixa de ±10%. Não é preço fechado
            </span>
          </div>

          <div className="grid gap-10 md:grid-cols-12 md:gap-12 items-end">
            <h1 className="md:col-span-8 text-display text-fg-strong text-balance">
              Quanto custa o seu projeto?
            </h1>
            <p className="md:col-span-4 text-body max-w-prose">
              Marque o que precisa, escolha o ritmo e o escopo.
              A faixa aparece ao lado em tempo real. Pra cotação
              fechada, me manda os detalhes. Respondo em até 24h.
            </p>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* ============ COLUNA DE FORM ============ */}
        <div className="lg:col-span-7 space-y-12">

          {/* SERVIÇOS */}
          <Section number="01" title="Quais serviços você precisa?" helper="Selecione um ou mais.">
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICOS.map((s) => {
                const active = servicos.includes(s.id);
                return (
                  <Option
                    key={s.id}
                    active={active}
                    onClick={() => toggle(setServicos)(s.id)}
                    title={s.label}
                    desc={s.desc}
                    meta={`a partir de ${fmt(s.price)}`}
                  />
                );
              })}
            </div>
          </Section>

          {/* ESCOPO */}
          <Section number="02" title="Qual o escopo?" helper="Define profundidade e duração.">
            <div className="grid gap-3 sm:grid-cols-3">
              {ESCOPOS.map((e) => (
                <Option
                  key={e.id}
                  active={escopo === e.id}
                  onClick={() => setEscopo(e.id)}
                  title={e.label}
                  desc={e.desc}
                  meta={`${Math.round((e.mult - 1) * 100) >= 0 ? "+" : ""}${Math.round((e.mult - 1) * 100)}%`}
                />
              ))}
            </div>
          </Section>

          {/* PRAZO */}
          <Section number="03" title="Qual a urgência?" helper="Express prioriza sua fila.">
            <div className="grid gap-3 sm:grid-cols-3">
              {PRAZOS.map((p) => (
                <Option
                  key={p.id}
                  active={prazo === p.id}
                  onClick={() => setPrazo(p.id)}
                  title={p.label}
                  desc={p.desc}
                  meta={`${Math.round((p.mult - 1) * 100) >= 0 ? "+" : ""}${Math.round((p.mult - 1) * 100)}%`}
                />
              ))}
            </div>
          </Section>

          {/* ADD-ONS */}
          <Section number="04" title="Adicionais (opcional)" helper="Coisinhas que somam ao escopo.">
            <div className="grid gap-3 sm:grid-cols-2">
              {ADDONS.map((a) => (
                <Option
                  key={a.id}
                  active={addons.includes(a.id)}
                  onClick={() => toggle(setAddons)(a.id)}
                  title={a.label}
                  meta={`+ ${fmt(a.price)}`}
                />
              ))}
            </div>
          </Section>
        </div>

        {/* ============ STICKY SUMMARY ============ */}
        <aside className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 rounded-section border border-line bg-surface-2 p-8 md:p-10 space-y-6">
            <header className="space-y-2">
              <p className="label-mono text-fg-faint">Faixa estimada</p>
              <p className="text-display !text-[clamp(2.5rem,5vw,4rem)] !leading-none text-fg-strong">
                {canCalc ? fmt(calc.min) : "—"}
                <span className="text-fg-mute"> – </span>
                {canCalc ? fmt(calc.max) : "—"}
              </p>
              <p className="text-body-sm text-fg-mute">
                Faixa de ±10% pra absorver variações de escopo. Não é preço fechado.
              </p>
            </header>

            <div className="space-y-2 border-t border-line pt-6 text-body-sm">
              <Row label="Serviços" value={canCalc ? fmt(calc.subtotal - 0) : "—"} />
              <Row
                label={`Escopo (${ESCOPOS.find((e) => e.id === escopo)?.label})`}
                value={`× ${ESCOPOS.find((e) => e.id === escopo)?.mult.toFixed(2)}`}
              />
              <Row
                label={`Prazo (${PRAZOS.find((p) => p.id === prazo)?.label})`}
                value={`× ${PRAZOS.find((p) => p.id === prazo)?.mult.toFixed(2)}`}
              />
              {calc.baseAddons > 0 && <Row label="Adicionais" value={`+ ${fmt(calc.baseAddons)}`} />}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-line">
                <span className="text-fg-body">Total estimado</span>
                <span className="font-semibold text-fg-strong">{canCalc ? fmt(calc.total) : "—"}</span>
              </div>
            </div>

            <EstimativaForm
              canSubmit={canCalc}
              payload={{
                servicos: servicos.map((id) => SERVICOS.find((s) => s.id === id)?.label ?? "").filter(Boolean),
                escopo: ESCOPOS.find((e) => e.id === escopo)?.label ?? "",
                prazo: PRAZOS.find((p) => p.id === prazo)?.label ?? "",
                addons: addons.map((id) => ADDONS.find((a) => a.id === id)?.label ?? "").filter(Boolean),
                faixaMin: calc.min,
                faixaMax: calc.max,
              }}
              resumoWhatsapp={
                canCalc
                  ? `Oi Drope! Vim da calculadora do site.\n\n` +
                    `Serviços: ${servicos.map((id) => SERVICOS.find((s) => s.id === id)?.label).join(", ")}\n` +
                    `Escopo: ${ESCOPOS.find((e) => e.id === escopo)?.label}\n` +
                    `Prazo: ${PRAZOS.find((p) => p.id === prazo)?.label}\n` +
                    (addons.length ? `Adicionais: ${addons.map((id) => ADDONS.find((a) => a.id === id)?.label).join(", ")}\n` : "") +
                    `\nFaixa estimada: ${fmt(calc.min)} – ${fmt(calc.max)}\n\nQuero conversar sobre o projeto.`
                  : "Oi Drope! Vim da calculadora do site e quero conversar sobre um projeto."
              }
            />
          </div>
        </aside>
        </div>
      </Container>
    </div>
  );
}

/* ----- internos ----- */

function Section({
  number, title, helper, children,
}: { number: string; title: string; helper?: string; children: React.ReactNode }) {
  return (
    <section className="space-y-5">
      <header className="flex items-start gap-4">
        <span className="text-3xl font-extrabold tabular-nums text-brand mt-0.5">{number}</span>
        <div>
          <h2 className="text-h-3 text-fg-strong">{title}</h2>
          {helper && <p className="text-body-sm text-fg-mute mt-1">{helper}</p>}
        </div>
      </header>
      {children}
    </section>
  );
}

function Option({
  active, onClick, title, desc, meta,
}: { active: boolean; onClick: () => void; title: string; desc?: string; meta?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative text-left rounded-card border p-4 transition",
        active
          ? "border-brand bg-brand/10"
          : "border-line bg-surface hover:bg-surface-2 hover:border-line"
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <p className={cn("font-semibold", active ? "text-fg-strong" : "text-fg-strong")}>{title}</p>
          {desc && <p className="text-body-sm text-fg-mute mt-1">{desc}</p>}
        </div>
        <div
          className={cn(
            "size-5 shrink-0 rounded-full border flex items-center justify-center transition",
            active ? "bg-brand border-brand" : "border-line group-hover:border-white/40"
          )}
        >
          {active && <Check className="size-3 text-ink-50" strokeWidth={3} />}
        </div>
      </div>
      {meta && (
        <p className="label-mono text-fg-faint mt-3 uppercase">{meta}</p>
      )}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-fg-mute">{label}</span>
      <span className="text-fg-body">{value}</span>
    </div>
  );
}
