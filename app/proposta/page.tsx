"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Check, X as XIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";

/**
 * /proposta — método, fases, planos. Totalmente i18n via dictionaries.
 */

type Fase = {
  n: string;
  titleKey: DictionaryKey;
  durKey: DictionaryKey;
  itemKeys: DictionaryKey[];
};

const escopo: Fase[] = [
  { n: "01", titleKey: "proposta.f1_t", durKey: "proposta.f1_dur", itemKeys: ["proposta.f1_i1", "proposta.f1_i2", "proposta.f1_i3", "proposta.f1_i4"] },
  { n: "02", titleKey: "proposta.f2_t", durKey: "proposta.f2_dur", itemKeys: ["proposta.f2_i1", "proposta.f2_i2", "proposta.f2_i3", "proposta.f2_i4"] },
  { n: "03", titleKey: "proposta.f3_t", durKey: "proposta.f3_dur", itemKeys: ["proposta.f3_i1", "proposta.f3_i2", "proposta.f3_i3", "proposta.f3_i4"] },
  { n: "04", titleKey: "proposta.f4_t", durKey: "proposta.f4_dur", itemKeys: ["proposta.f4_i1", "proposta.f4_i2", "proposta.f4_i3", "proposta.f4_i4"] },
];

const incluiKeys: DictionaryKey[] = [
  "proposta.inclui_i1", "proposta.inclui_i2", "proposta.inclui_i3", "proposta.inclui_i4", "proposta.inclui_i5",
];

const naoIncluiKeys: DictionaryKey[] = [
  "proposta.naoinclui_i1", "proposta.naoinclui_i2", "proposta.naoinclui_i3", "proposta.naoinclui_i4",
];

type Plano = {
  labelKey: DictionaryKey;
  subKey: DictionaryKey;
  priceKey: DictionaryKey;
  descKey: DictionaryKey;
  itemKeys: DictionaryKey[];
  ctaKey: DictionaryKey;
  featured?: boolean;
};

const planos: Plano[] = [
  {
    labelKey: "proposta.p1_label", subKey: "proposta.p1_sub", priceKey: "proposta.p1_price", descKey: "proposta.p1_desc",
    itemKeys: ["proposta.p1_i1", "proposta.p1_i2", "proposta.p1_i3", "proposta.p1_i4"],
    ctaKey: "proposta.p1_cta",
  },
  {
    labelKey: "proposta.p2_label", subKey: "proposta.p2_sub", priceKey: "proposta.p2_price", descKey: "proposta.p2_desc",
    itemKeys: ["proposta.p2_i1", "proposta.p2_i2", "proposta.p2_i3", "proposta.p2_i4"],
    ctaKey: "proposta.p2_cta",
    featured: true,
  },
  {
    labelKey: "proposta.p3_label", subKey: "proposta.p3_sub", priceKey: "proposta.p3_price", descKey: "proposta.p3_desc",
    itemKeys: ["proposta.p3_i1", "proposta.p3_i2", "proposta.p3_i3", "proposta.p3_i4"],
    ctaKey: "proposta.p3_cta",
  },
];

export default function PropostaPage() {
  const { t } = useLocale();
  return (
    <div className="pt-24 md:pt-28 pb-24">
      <Container as="div" className="flex flex-col gap-20 md:gap-28">

        {/* ===== HERO ===== */}
        <section className="flex flex-col gap-10">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("proposta.eyebrow")}
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <Clock className="size-3 text-fg-mute" strokeWidth={2.5} />
              {t("proposta.status")}
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8 flex flex-col gap-6">
              <h1 className="text-display text-fg-strong text-balance">
                {t("proposta.title")}
              </h1>
              <p className="text-lead max-w-prose">
                {t("proposta.lead")}
              </p>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-4">
              <div className="rounded-section border border-line bg-bg-soft p-6 flex flex-col gap-3">
                <p className="label-mono">{t("proposta.cronograma_label")}</p>
                <p className="text-h-1 text-brand tabular-nums">{t("proposta.cronograma_weeks")}</p>
                <p className="text-body-sm">
                  {t("proposta.cronograma_desc")}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== AS 4 FASES ===== */}
        <section className="flex flex-col gap-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="label-mono">
                  <span className="text-fg-strong">01</span>
                  <span className="mx-3 text-fg-faint">──</span>
                  <span>{t("proposta.fases_eyebrow")}</span>
                </p>
                <h2 className="text-h-1 text-fg-strong text-balance">
                  {t("proposta.fases_title")}
                </h2>
              </div>
              <p className="lg:col-span-5 text-body max-w-prose">
                {t("proposta.fases_desc")}
              </p>
            </div>
          </Reveal>

          <Stagger as="ol" className="grid gap-3 md:grid-cols-2">
            {escopo.map((e) => (
              <StaggerItem
                as="li"
                key={e.n}
                className="rounded-section border border-line bg-bg-soft p-7 md:p-9 flex flex-col gap-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-3xl font-semibold tabular-nums text-brand">{e.n}</p>
                  <p className="label-mono">{t(e.durKey)}</p>
                </div>
                <h3 className="text-h-2 text-fg-strong">{t(e.titleKey)}</h3>
                <ul className="flex flex-col gap-2 mt-2">
                  {e.itemKeys.map((iKey) => (
                    <li key={iKey} className="text-body text-fg-body flex gap-3 border-b border-line pb-2 last:border-0">
                      <Check className="size-4 text-brand shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="flex-1">{t(iKey)}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== INCLUI / NÃO INCLUI ===== */}
        <section className="grid gap-3 md:grid-cols-2">
          <Reveal className="rounded-section border border-line bg-bg-soft p-7 md:p-9">
            <p className="label-mono mb-3">
              <span className="text-fg-strong">02</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>{t("proposta.inclui_eyebrow")}</span>
            </p>
            <h2 className="text-h-2 text-fg-strong mb-6 text-balance">
              {t("proposta.inclui_title")}
            </h2>
            <ul className="flex flex-col gap-2">
              {incluiKeys.map((iKey) => (
                <li key={iKey} className="text-body text-fg-body border-b border-line py-3 flex gap-3 last:border-0">
                  <Check className="size-4 text-brand shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="flex-1">{t(iKey)}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-section border border-line bg-bg p-7 md:p-9">
            <p className="label-mono mb-3">
              <span className="text-fg-strong">03</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>{t("proposta.naoinclui_eyebrow")}</span>
            </p>
            <h2 className="text-h-2 text-fg-strong mb-6 text-balance">
              {t("proposta.naoinclui_title")}
            </h2>
            <ul className="flex flex-col gap-2">
              {naoIncluiKeys.map((iKey) => (
                <li key={iKey} className="text-body text-fg-mute border-b border-line py-3 flex gap-3 last:border-0">
                  <XIcon className="size-4 text-fg-faint shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="flex-1 line-through opacity-70">{t(iKey)}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ===== TRÊS PLANOS ===== */}
        <section className="flex flex-col gap-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="label-mono">
                  <span className="text-fg-strong">04</span>
                  <span className="mx-3 text-fg-faint">──</span>
                  <span>{t("proposta.planos_eyebrow")}</span>
                </p>
                <h2 className="text-h-1 text-fg-strong text-balance">
                  {t("proposta.planos_title")}
                </h2>
              </div>
              <p className="lg:col-span-5 text-body max-w-prose">
                {t("proposta.planos_desc")}
              </p>
            </div>
          </Reveal>

          <Stagger as="div" className="grid gap-4 md:grid-cols-3">
            {planos.map((p) => (
              <StaggerItem
                key={p.labelKey}
                as="article"
                className={`flex flex-col gap-5 rounded-section border p-7 md:p-8 transition hover:-translate-y-1 hover:shadow-lg ${
                  p.featured
                    ? "border-brand bg-brand text-brand-fg"
                    : "border-line bg-bg-soft"
                }`}
              >
                <header className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className={`label-mono ${p.featured ? "text-brand-fg/80" : "text-brand"}`}>
                      {t(p.labelKey)}
                    </p>
                    {p.featured && (
                      <span className="rounded-pill bg-brand-fg/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                        {t("proposta.featured_badge")}
                      </span>
                    )}
                  </div>
                  <h3 className={`text-h-2 ${p.featured ? "text-brand-fg" : "text-fg-strong"}`}>
                    {t(p.subKey)}
                  </h3>
                  <p className={`text-h-3 ${p.featured ? "text-brand-fg/85" : "text-fg-mute"}`}>
                    {t(p.priceKey)}
                  </p>
                </header>
                <p className={`text-body-sm ${p.featured ? "text-brand-fg/80" : "text-fg-mute"}`}>
                  {t(p.descKey)}
                </p>
                <ul className="flex flex-col gap-1 flex-1">
                  {p.itemKeys.map((iKey) => (
                    <li
                      key={iKey}
                      className={`text-body-sm flex gap-3 py-2 border-b last:border-0 ${
                        p.featured ? "text-brand-fg/90 border-brand-fg/15" : "text-fg-body border-line"
                      }`}
                    >
                      <Check className={`size-3.5 shrink-0 mt-0.5 ${p.featured ? "text-brand-fg" : "text-brand"}`} strokeWidth={2.5} />
                      <span className="flex-1">{t(iKey)}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/calculadora"
                  className={`mt-auto inline-flex items-center justify-between gap-2 rounded-pill px-5 py-3 text-sm font-semibold transition ${
                    p.featured
                      ? "bg-brand-fg text-brand hover:opacity-90"
                      : "border border-line bg-bg text-fg-strong hover:bg-surface"
                  }`}
                >
                  {t(p.ctaKey)}
                  <ArrowUpRight className="size-4" strokeWidth={2.5} />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== CTA FINAL ===== */}
        <Reveal>
          <div className="rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7 flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">{t("proposta.cta_next")}</p>
              <h2 className="text-h-1 text-bg text-balance">
                {t("proposta.cta_title")}
              </h2>
              <p className="text-body text-bg/75 max-w-prose">
                {t("proposta.cta_desc")}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3 justify-end">
              <Link
                href="/calculadora"
                className="group inline-flex items-center justify-between gap-3 rounded-pill bg-brand px-5 py-4 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
              >
                {t("proposta.cta_calc")}
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/agendar"
                className="inline-flex items-center justify-between gap-3 rounded-pill border border-bg/20 bg-bg/5 px-5 py-4 text-sm font-semibold text-bg hover:bg-bg/15 transition"
              >
                {t("proposta.cta_agendar")}
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
