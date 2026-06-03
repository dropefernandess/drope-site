"use client";

import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { EstimativaForm } from "@/components/calculadora/EstimativaForm";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * Calculadora de orçamento — i18n via dictionaries.
 * Lógica real com state. Valores são FAIXAS estimadas (não preço fechado).
 */

type Servico = { id: string; labelKey: DictionaryKey; price: number; descKey: DictionaryKey };
const SERVICOS: Servico[] = [
  { id: "branding",  labelKey: "calc.serv_branding_label",  price: 3500, descKey: "calc.serv_branding_desc" },
  { id: "ui",        labelKey: "calc.serv_ui_label",        price: 4100, descKey: "calc.serv_ui_desc" },
  { id: "web",       labelKey: "calc.serv_web_label",       price: 3400, descKey: "calc.serv_web_desc" },
  { id: "dev",       labelKey: "calc.serv_dev_label",       price: 3600, descKey: "calc.serv_dev_desc" },
  { id: "motion",    labelKey: "calc.serv_motion_label",    price: 2400, descKey: "calc.serv_motion_desc" },
  { id: "social",    labelKey: "calc.serv_social_label",    price: 1800, descKey: "calc.serv_social_desc" },
];

type Escopo = "lean" | "completo" | "premium";
const ESCOPOS: { id: Escopo; labelKey: DictionaryKey; mult: number; descKey: DictionaryKey }[] = [
  { id: "lean",     labelKey: "calc.escopo_lean_label",     mult: 1.0,  descKey: "calc.escopo_lean_desc" },
  { id: "completo", labelKey: "calc.escopo_completo_label", mult: 1.35, descKey: "calc.escopo_completo_desc" },
  { id: "premium",  labelKey: "calc.escopo_premium_label",  mult: 1.7,  descKey: "calc.escopo_premium_desc" },
];

type Prazo = "flex" | "normal" | "express";
const PRAZOS: { id: Prazo; labelKey: DictionaryKey; mult: number; descKey: DictionaryKey }[] = [
  { id: "flex",    labelKey: "calc.prazo_flex_label",    mult: 0.92, descKey: "calc.prazo_flex_desc" },
  { id: "normal",  labelKey: "calc.prazo_normal_label",  mult: 1.0,  descKey: "calc.prazo_normal_desc" },
  { id: "express", labelKey: "calc.prazo_express_label", mult: 1.3,  descKey: "calc.prazo_express_desc" },
];

type Addon = { id: string; labelKey: DictionaryKey; price: number };
const ADDONS: Addon[] = [
  { id: "copy",      labelKey: "calc.addon_copy_label",      price: 900 },
  { id: "extra-rev", labelKey: "calc.addon_extra_rev_label", price: 450 },
  { id: "handoff",   labelKey: "calc.addon_handoff_label",   price: 700 },
];

export default function CalculadoraPage() {
  const { t, locale } = useLocale();
  const fmt = (n: number) =>
    new Intl.NumberFormat(locale === "pt" ? "pt-BR" : "en-US", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(n);

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

  const escopoLabel = t(ESCOPOS.find((e) => e.id === escopo)!.labelKey);
  const prazoLabel  = t(PRAZOS.find((p) => p.id === prazo)!.labelKey);

  return (
    <div className="pt-24 md:pt-32 pb-24">
      <Container as="div" className="flex flex-col gap-12">
        {/* ===== HEADER ===== */}
        <header className="flex flex-col gap-10">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("calc.eyebrow")}
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              {t("calc.badge")}
            </span>
          </div>

          <div className="grid gap-10 md:grid-cols-12 md:gap-12 items-end">
            <h1 className="md:col-span-8 text-display text-fg-strong text-balance">
              {t("calc.title")}
            </h1>
            <p className="md:col-span-4 text-body max-w-prose">
              {t("calc.lead")}
            </p>
          </div>
        </header>

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* ============ COLUNA DE FORM ============ */}
        <div className="lg:col-span-7 space-y-12">

          {/* SERVIÇOS */}
          <Section number="01" title={t("calc.s1_title")} helper={t("calc.s1_helper")}>
            <div className="grid gap-3 sm:grid-cols-2">
              {SERVICOS.map((s) => (
                <Option
                  key={s.id}
                  active={servicos.includes(s.id)}
                  onClick={() => toggle(setServicos)(s.id)}
                  title={t(s.labelKey)}
                  desc={t(s.descKey)}
                  meta={`${t("calc.meta_a_partir")} ${fmt(s.price)}`}
                />
              ))}
            </div>
          </Section>

          {/* ESCOPO */}
          <Section number="02" title={t("calc.s2_title")} helper={t("calc.s2_helper")}>
            <div className="grid gap-3 sm:grid-cols-3">
              {ESCOPOS.map((e) => (
                <Option
                  key={e.id}
                  active={escopo === e.id}
                  onClick={() => setEscopo(e.id)}
                  title={t(e.labelKey)}
                  desc={t(e.descKey)}
                  meta={`${Math.round((e.mult - 1) * 100) >= 0 ? "+" : ""}${Math.round((e.mult - 1) * 100)}%`}
                />
              ))}
            </div>
          </Section>

          {/* PRAZO */}
          <Section number="03" title={t("calc.s3_title")} helper={t("calc.s3_helper")}>
            <div className="grid gap-3 sm:grid-cols-3">
              {PRAZOS.map((p) => (
                <Option
                  key={p.id}
                  active={prazo === p.id}
                  onClick={() => setPrazo(p.id)}
                  title={t(p.labelKey)}
                  desc={t(p.descKey)}
                  meta={`${Math.round((p.mult - 1) * 100) >= 0 ? "+" : ""}${Math.round((p.mult - 1) * 100)}%`}
                />
              ))}
            </div>
          </Section>

          {/* ADD-ONS */}
          <Section number="04" title={t("calc.s4_title")} helper={t("calc.s4_helper")}>
            <div className="grid gap-3 sm:grid-cols-2">
              {ADDONS.map((a) => (
                <Option
                  key={a.id}
                  active={addons.includes(a.id)}
                  onClick={() => toggle(setAddons)(a.id)}
                  title={t(a.labelKey)}
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
              <p className="label-mono text-fg-faint">{t("calc.faixa_label")}</p>
              <p className="text-display !text-[clamp(2.5rem,5vw,4rem)] !leading-none text-fg-strong">
                {canCalc ? fmt(calc.min) : "—"}
                <span className="text-fg-mute"> – </span>
                {canCalc ? fmt(calc.max) : "—"}
              </p>
              <p className="text-body-sm text-fg-mute">
                {t("calc.faixa_desc")}
              </p>
            </header>

            <div className="space-y-2 border-t border-line pt-6 text-body-sm">
              <Row label={t("calc.row_servicos")} value={canCalc ? fmt(calc.subtotal - 0) : "—"} />
              <Row
                label={`${t("calc.row_escopo")} (${escopoLabel})`}
                value={`× ${ESCOPOS.find((e) => e.id === escopo)?.mult.toFixed(2)}`}
              />
              <Row
                label={`${t("calc.row_prazo")} (${prazoLabel})`}
                value={`× ${PRAZOS.find((p) => p.id === prazo)?.mult.toFixed(2)}`}
              />
              {calc.baseAddons > 0 && <Row label={t("calc.row_adicionais")} value={`+ ${fmt(calc.baseAddons)}`} />}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-line">
                <span className="text-fg-body">{t("calc.row_total")}</span>
                <span className="font-semibold text-fg-strong">{canCalc ? fmt(calc.total) : "—"}</span>
              </div>
            </div>

            <EstimativaForm
              canSubmit={canCalc}
              payload={{
                servicos: servicos.map((id) => {
                  const s = SERVICOS.find((sv) => sv.id === id);
                  return s ? t(s.labelKey) : "";
                }).filter(Boolean),
                escopo: escopoLabel,
                prazo: prazoLabel,
                addons: addons.map((id) => {
                  const a = ADDONS.find((ad) => ad.id === id);
                  return a ? t(a.labelKey) : "";
                }).filter(Boolean),
                faixaMin: calc.min,
                faixaMax: calc.max,
              }}
              resumoWhatsapp={
                canCalc
                  ? `Oi Drope! Vim da calculadora do site.\n\n` +
                    `${t("calc.row_servicos")}: ${servicos.map((id) => t(SERVICOS.find((s) => s.id === id)!.labelKey)).join(", ")}\n` +
                    `${t("calc.row_escopo")}: ${escopoLabel}\n` +
                    `${t("calc.row_prazo")}: ${prazoLabel}\n` +
                    (addons.length ? `${t("calc.row_adicionais")}: ${addons.map((id) => t(ADDONS.find((a) => a.id === id)!.labelKey)).join(", ")}\n` : "") +
                    `\n${t("calc.faixa_label")}: ${fmt(calc.min)} – ${fmt(calc.max)}\n\nQuero conversar sobre o projeto.`
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
