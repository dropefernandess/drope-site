"use client";

import { useMemo, useState } from "react";
import { Search, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { LocalLink } from "@/components/i18n/LocalLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import {
  glossario,
  categoryLabels,
  type GlossCategory,
} from "@/content/glossario";

const SITE = "https://dropefernandes.com";
const CATEGORY_ORDER: GlossCategory[] = ["branding", "tipografia", "uiux", "motion", "frontend"];

export function GlossarioClient() {
  const { t, locale } = useLocale();
  const [query, setQuery] = useState("");

  // Schema DefinedTermSet (não filtrado — sempre o set completo pro Google)
  const schema = useMemo(
    () => ({
      "@context": "https://schema.org",
      "@type": "DefinedTermSet",
      name: locale === "pt" ? "Glossário de Design — Drope Fernandes" : "Design Glossary — Drope Fernandes",
      url: locale === "pt" ? `${SITE}/glossario` : `${SITE}/en/glossario`,
      inLanguage: locale === "pt" ? "pt-BR" : "en",
      hasDefinedTerm: glossario.map((g) => ({
        "@type": "DefinedTerm",
        name: g.term[locale],
        description: g.def[locale],
        url: `${SITE}${locale === "pt" ? "" : "/en"}/glossario#${g.slug}`,
        inDefinedTermSet: locale === "pt" ? `${SITE}/glossario` : `${SITE}/en/glossario`,
      })),
    }),
    [locale]
  );

  // Filtro por busca (termo ou definição no locale ativo)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return glossario;
    return glossario.filter(
      (g) =>
        g.term[locale].toLowerCase().includes(q) ||
        g.def[locale].toLowerCase().includes(q)
    );
  }, [query, locale]);

  const grouped = useMemo(() => {
    return CATEGORY_ORDER.map((cat) => ({
      cat,
      items: filtered.filter((g) => g.category === cat),
    })).filter((group) => group.items.length > 0);
  }, [filtered]);

  return (
    <div className="pt-24 md:pt-28 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Container as="div" className="flex flex-col gap-14 md:gap-20">

        {/* ===== HERO ===== */}
        <section className="flex flex-col gap-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal direction="up" className="lg:col-span-8 flex flex-col gap-5">
              <p className="label-mono flex items-center gap-2">
                <span className="size-1 rounded-full bg-brand" />
                {t("gloss.eyebrow")}
              </p>
              <h1 className="text-display text-fg-strong text-balance">
                {t("gloss.title")}
              </h1>
              <p className="text-lead max-w-prose">{t("gloss.lead")}</p>
            </Reveal>

            {/* Busca */}
            <Reveal direction="left" delay={0.1} className="lg:col-span-4">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-fg-mute" strokeWidth={2.5} />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={t("gloss.search_placeholder")}
                  aria-label={t("gloss.search_placeholder")}
                  className="w-full rounded-pill border border-line bg-bg-soft pl-11 pr-4 py-3 text-sm text-fg-strong placeholder:text-fg-mute outline-none focus-visible:border-brand transition"
                />
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== TERMOS POR CATEGORIA ===== */}
        {grouped.length === 0 ? (
          <div className="rounded-section border border-line bg-bg-soft p-12 text-center">
            <p className="text-body">{t("gloss.empty")}</p>
          </div>
        ) : (
          <div className="flex flex-col gap-16 md:gap-20">
            {grouped.map(({ cat, items }) => (
              <section key={cat} className="flex flex-col gap-6">
                <Reveal direction="right" className="flex items-baseline gap-4 border-b border-line pb-3">
                  <span className="text-xl md:text-2xl font-semibold tabular-nums text-brand">
                    {String(CATEGORY_ORDER.indexOf(cat) + 1).padStart(2, "0")}
                  </span>
                  <span className="text-fg-faint">──</span>
                  <h2 className="text-h-2 text-fg-strong">{categoryLabels[cat][locale]}</h2>
                  <span className="ml-auto label-mono">{items.length}</span>
                </Reveal>

                <div className="grid gap-3 md:grid-cols-2">
                  {items.map((g) => (
                    <article
                      key={g.slug}
                      id={g.slug}
                      className="scroll-mt-28 rounded-section border border-line bg-bg-soft p-6 md:p-7 flex flex-col gap-2 transition hover:border-fg-mute"
                    >
                      <h3 className="text-h-3 text-fg-strong">{g.term[locale]}</h3>
                      <p className="text-body text-fg-body leading-relaxed">{g.def[locale]}</p>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {/* ===== CTA FINAL ===== */}
        <Reveal direction="up" className="rounded-section bg-[#101010] dark:bg-[#1A1A1A] text-bg p-8 md:p-12 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-wider font-medium text-ink-50/60">
              {t("gloss.cta_eyebrow")}
            </p>
            <h2 className="text-h-1 text-ink-50 text-balance">{t("gloss.cta_title")}</h2>
            <p className="text-body text-ink-50/75 max-w-prose">{t("gloss.cta_desc")}</p>
          </div>
          <LocalLink
            href="/agendar"
            className="group inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-5 py-3.5 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition whitespace-nowrap"
          >
            {t("gloss.cta_button")}
            <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </LocalLink>
        </Reveal>
      </Container>
    </div>
  );
}
