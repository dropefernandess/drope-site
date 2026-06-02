"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { projetos, categorias, type CategoriaSlug } from "@/content/projetos";
import { cn } from "@/lib/utils";

type Filter = "all" | CategoriaSlug;

const catColor: Record<CategoriaSlug, string> = {
  "branding":      "bg-brand text-brand-fg",
  "ui-ux-design":  "bg-ink-50 text-ink-900",
  "web-design":    "bg-brand-coral text-ink-900",
  "graphic-design":"bg-brand-wine text-ink-50",
  "motion-design": "bg-ink-700 text-ink-50",
};

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
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = useMemo(
    () => projetos.filter((p) => filter === "all" || p.categorias.includes(filter)),
    [filter]
  );

  // Stats agregadas
  const stats = useMemo(() => {
    const total = projetos.length;
    const anos = new Set(projetos.map((p) => p.year).filter(Boolean)).size;
    const oldest = Math.min(...(projetos.map((p) => p.year).filter(Boolean) as number[]));
    return {
      total,
      anos,
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
              Portfólio · Trabalhos selecionados
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              {stats.total} projetos · Desde {stats.desde}
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8">
              <h1 className="text-display text-fg-strong text-balance">
                Cada projeto pensado do briefing à entrega final.
              </h1>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-4 flex flex-col gap-4">
              <p className="text-body max-w-prose">
                Identidade visual, web, UI/UX, motion e gráfico. Use os
                filtros pra ver por área. Passe o mouse sobre o card pra ler
                o resumo do projeto.
              </p>
            </Reveal>
          </div>

          {/* Mini stats em cards */}
          <Reveal delay={0.3} className="grid gap-3 md:grid-cols-3 mt-4">
            <div className="rounded-section border border-line bg-bg-soft p-5 md:p-6 flex items-baseline gap-3">
              <p className="text-4xl md:text-5xl font-semibold tabular-nums text-fg-strong">{stats.total}</p>
              <p className="text-sm text-fg-mute">projetos selecionados</p>
            </div>
            <div className="rounded-section border border-line bg-bg-soft p-5 md:p-6 flex items-baseline gap-3">
              <p className="text-4xl md:text-5xl font-semibold tabular-nums text-fg-strong">{categorias.length}</p>
              <p className="text-sm text-fg-mute">áreas de criação</p>
            </div>
            <div className="rounded-section bg-brand p-5 md:p-6 flex items-baseline gap-3">
              <p className="text-4xl md:text-5xl font-semibold tabular-nums text-brand-fg">{stats.desde}</p>
              <p className="text-sm text-brand-fg/85">primeira marca paga</p>
            </div>
          </Reveal>
        </section>

        {/* ===== FILTROS ===== */}
        <Reveal className="flex flex-wrap items-center gap-2 border-y border-line py-4">
          <span className="label-mono mr-2">Filtrar por área:</span>
          <FilterChip active={filter === "all"} onClick={() => setFilter("all")}>
            Tudo
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
          {filtered.map((p) => {
            const primaryCat = p.categorias[0];
            const catLabel = categorias.find((c) => c.slug === primaryCat)?.label;
            return (
              <li key={p.slug}>
                <Link
                  href={`/projetos/${p.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-section bg-surface"
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    quality={90}
                    className="object-cover transition duration-700 group-hover:scale-105 group-hover:blur-sm"
                  />

                  {/* Badge categoria */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={cn(
                      "inline-block rounded-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                      catColor[primaryCat]
                    )}>
                      {catLabel}
                    </span>
                  </div>

                  {/* Ano */}
                  {p.year && (
                    <span className="absolute top-4 right-4 z-10 rounded-pill bg-ink-900/40 backdrop-blur-sm border border-ink-50/15 px-2.5 py-1 text-[11px] font-medium text-ink-50 tabular-nums">
                      © {p.year}
                    </span>
                  )}

                  {/* Overlay hover */}
                  <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/85 to-transparent" />
                    <div className="relative p-6 flex flex-col gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl md:text-2xl font-semibold text-ink-50 leading-tight">
                        {p.title}
                      </h3>
                      <p className="text-sm text-ink-50/80 leading-snug line-clamp-3">
                        {p.description}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-50">
                          Ver case completo
                          <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                        </span>
                        <div className="size-9 rounded-full bg-brand flex items-center justify-center">
                          <ArrowUpRight className="size-4 text-brand-fg" strokeWidth={2.5} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pill com título — idle */}
                  <div className="absolute bottom-4 left-4 right-4 z-[1] opacity-100 group-hover:opacity-0 transition-opacity duration-200">
                    <div className="inline-block rounded-pill bg-bg/95 backdrop-blur-sm border border-line px-3 py-1.5">
                      <p className="text-xs font-semibold text-fg-strong">
                        {p.title}
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>

        {filtered.length === 0 && (
          <div className="rounded-section border border-line bg-bg p-12 text-center">
            <p className="text-body">Nenhum projeto nessa categoria ainda.</p>
          </div>
        )}

        {/* ===== CTA FINAL ===== */}
        <Reveal>
          <div className="rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-7 flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">
                VIU ALGO QUE TE INTERESSOU?
              </p>
              <h2 className="text-h-1 text-bg text-balance">
                Vamos pensar o seu projeto juntos.
              </h2>
              <p className="text-body text-bg/75 max-w-prose">
                Agenda uma conversa de 30 minutos pra alinhar contexto,
                ou usa a calculadora pra ter uma faixa estimada do investimento.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3">
              <Link
                href="/agendar"
                className="group inline-flex items-center justify-between gap-3 rounded-pill bg-brand px-5 py-4 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
              >
                Agendar 30 min
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/calculadora"
                className="inline-flex items-center justify-between gap-3 rounded-pill border border-bg/20 bg-bg/5 px-5 py-4 text-sm font-semibold text-bg hover:bg-bg/15 transition"
              >
                Estimar projeto
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
