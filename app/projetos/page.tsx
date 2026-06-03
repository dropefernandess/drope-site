"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { ProjectCard } from "@/components/projetos/ProjectCard";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { projetos, categorias, type CategoriaSlug } from "@/content/projetos";
import { cn } from "@/lib/utils";

type Filter = "all" | CategoriaSlug;

/**
 * /projetos — Index completo de todos os trabalhos.
 *
 * Diferente da seção da home (que é teaser com 6 cards), essa página:
 *  - Tem hero próprio com stats e descrição
 *  - Mostra TODOS os projetos por padrão
 *  - Filtros amplos no topo
 *  - SEO e URL canônica (compartilhável)
 *  - CTA final com agendar + calculadora
 */

export default function ProjetosIndexPage() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => projetos.filter((p) => filter === "all" || p.categorias.includes(filter)),
    [filter]
  );

  // Stats agregadas
  const stats = useMemo(() => {
    const total = projetos.length;
    const oldest = Math.min(...(projetos.map((p) => p.year).filter(Boolean) as number[]));
    const anosOficio = new Date().getFullYear() - oldest; // 8+
    return {
      total,
      anosOficio,
      desde: oldest,
    };
  }, []);

  return (
    <div className="pt-24 md:pt-28 pb-24">
      <Container as="div" className="flex flex-col gap-16 md:gap-20">

        {/* ===== HERO ===== */}
        <section className="flex flex-col gap-10">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("projetos_idx.eyebrow")}
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              {stats.total} {t("projetos_idx.badge_suffix")} {stats.desde}
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8">
              <h1 className="text-display text-fg-strong text-balance">
                {t("projetos.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-4 flex flex-col gap-4">
              <p className="text-body max-w-prose">
                {t("projetos_idx.lead")}
              </p>
            </Reveal>
          </div>

          {/* Mini stats em cards */}
          <Reveal delay={0.3} className="grid gap-3 md:grid-cols-3 mt-4">
            <div className="rounded-section border border-line bg-bg-soft p-5 md:p-6 flex items-baseline gap-3">
              <p className="text-4xl md:text-5xl font-semibold tabular-nums text-fg-strong">{stats.total}</p>
              <p className="text-sm text-fg-mute">{t("projetos_idx.stats_total_label")}</p>
            </div>
            <div className="rounded-section border border-line bg-bg-soft p-5 md:p-6 flex items-baseline gap-3">
              <p className="text-4xl md:text-5xl font-semibold tabular-nums text-fg-strong">{categorias.length}</p>
              <p className="text-sm text-fg-mute">{t("projetos_idx.stats_areas_label")}</p>
            </div>
            <div className="rounded-section bg-brand p-5 md:p-6 flex items-baseline gap-3">
              <p className="text-4xl md:text-5xl font-semibold tabular-nums text-brand-fg">
                {stats.anosOficio}+
              </p>
              <p className="text-sm text-brand-fg/85">{t("projetos_idx.stats_anos_label")}</p>
            </div>
          </Reveal>
        </section>

        {/* ===== FILTROS ===== */}
        <Reveal className="flex flex-wrap items-center gap-2 border-y border-line py-4">
          <span className="label-mono mr-2">{t("projetos_idx.filter_label")}</span>
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            {t("projetos.filter_all")}
          </FilterChip>
          {categorias.map((c) => (
            <FilterChip
              key={c.slug}
              active={filter === c.slug}
              onClick={() => setFilter(c.slug)}
            >
              {c.label}
            </FilterChip>
          ))}
        </Reveal>

        {/* ===== GRID ===== */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>

        {filtered.length === 0 && (
          <div className="rounded-section border border-line bg-bg p-12 text-center">
            <p className="text-body">{t("projetos.empty")}</p>
          </div>
        )}

        {/* ===== CTA FINAL ===== */}
        <Reveal>
          <div className="rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-7 flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">
                {t("projetos_idx.cta_eyebrow")}
              </p>
              <h2 className="text-h-1 text-bg text-balance">
                {t("projetos_idx.cta_title")}
              </h2>
              <p className="text-body text-bg/75 max-w-prose">
                {t("projetos_idx.cta_desc")}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3">
              <Link
                href="/agendar"
                className="group inline-flex items-center justify-between gap-3 rounded-pill bg-brand px-5 py-4 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
              >
                {t("cta.agendar_30")}
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/calculadora"
                className="inline-flex items-center justify-between gap-3 rounded-pill border border-bg/20 bg-bg/5 px-5 py-4 text-sm font-semibold text-bg hover:bg-bg/15 transition"
              >
                {t("cta.estimar")}
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}

function FilterChip({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-pill px-4 py-1.5 text-sm font-medium transition",
        active
          ? "bg-fg-strong text-bg"
          : "bg-surface text-fg-body hover:bg-surface-2 hover:text-fg-strong"
      )}
    >
      {children}
    </button>
  );
}
