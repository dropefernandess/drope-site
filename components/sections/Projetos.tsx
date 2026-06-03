"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { ProjectCard } from "@/components/projetos/ProjectCard";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { projetos, categorias, type CategoriaSlug } from "@/content/projetos";
import { cn } from "@/lib/utils";

type Filter = "all" | CategoriaSlug;

const INITIAL_LIMIT = 6;

/**
 * Projetos — grid uniforme 4:5. Card só mostra cover.
 * Hover: overlay com blur backdrop revela título + descrição + categoria.
 * Sem texto embaixo dos cards (era informação perdida).
 */
export function Projetos() {
  const { t } = useLocale();
  const [filter, setFilter] = useState<Filter>("all");
  const [showAll, setShowAll] = useState(false);

  const filtered = projetos.filter(
    (p) => filter === "all" || p.categorias.includes(filter)
  );
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_LIMIT);
  const hasMore = filtered.length > visible.length;

  return (
    <section id="projetos" className="bg-bg-soft section-padding">
      <Container className="flex flex-col gap-12">
        {/* HEADER */}
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">01</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>{t("projetos.eyebrow")}</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                {t("projetos.title")}
              </h2>
            </div>
            <p className="lg:col-span-5 text-body max-w-prose">
              {t("projetos.desc")}
            </p>
          </div>
        </Reveal>

        {/* FILTROS */}
        <Reveal delay={0.1} className="flex flex-wrap items-center gap-2 border-y border-line py-4">
          <span className="label-mono mr-2">{t("projetos.filter_label")}</span>
          <FilterChip active={filter === "all"} onClick={() => { setFilter("all"); setShowAll(false); }}>
            {t("projetos.filter_all")}
          </FilterChip>
          {categorias.map((c) => (
            <FilterChip
              key={c.slug}
              active={filter === c.slug}
              onClick={() => { setFilter(c.slug); setShowAll(false); }}
            >
              {c.label}
            </FilterChip>
          ))}
        </Reveal>

        {/* GRID — cards uniformes 4:5 com tilt 3D */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>

        {visible.length === 0 && (
          <div className="rounded-section border border-line bg-bg p-12 text-center">
            <p className="text-body">{t("projetos.empty")}</p>
          </div>
        )}

        {/* CTA pra portfólio completo */}
        <Reveal className="flex justify-center pt-4">
          <Link
            href="/projetos"
            className="group inline-flex items-center gap-2 rounded-pill bg-fg-strong px-6 py-3.5 text-sm font-semibold text-bg hover:opacity-90 transition"
          >
            {t("projetos.cta_portfolio")}
            <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>
        </Reveal>
      </Container>
    </section>
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
