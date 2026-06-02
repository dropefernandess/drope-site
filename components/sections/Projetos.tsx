"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { projetos, categorias, type CategoriaSlug } from "@/content/projetos";
import { cn } from "@/lib/utils";

type Filter = "all" | CategoriaSlug;

const INITIAL_LIMIT = 6;

const catColor: Record<CategoriaSlug, string> = {
  "branding":      "bg-brand text-brand-fg",
  "ui-ux-design":  "bg-ink-50 text-ink-900",
  "web-design":    "bg-brand-coral text-ink-900",
  "graphic-design":"bg-brand-wine text-ink-50",
  "motion-design": "bg-ink-700 text-ink-50",
};

/**
 * Projetos — grid uniforme 4:5. Card só mostra cover.
 * Hover: overlay com blur backdrop revela título + descrição + categoria.
 * Sem texto embaixo dos cards (era informação perdida).
 */
export function Projetos() {
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
                <span>Trabalhos selecionados</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                Cada projeto pensado do briefing à entrega final.
              </h2>
            </div>
            <p className="lg:col-span-5 text-body max-w-prose">
              Branding, web, UI e motion. Use os filtros pra ver apenas
              uma frente. Passe o mouse pra ler sobre o projeto.
            </p>
          </div>
        </Reveal>

        {/* FILTROS */}
        <Reveal delay={0.1} className="flex flex-wrap items-center gap-2 border-y border-line py-4">
          <span className="label-mono mr-2">Filtrar:</span>
          <FilterChip active={filter === "all"} onClick={() => { setFilter("all"); setShowAll(false); }}>
            Tudo
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

        {/* GRID — cards uniformes 4:5 */}
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((p) => {
            const primaryCat = p.categorias[0];
            const catLabel = categorias.find((c) => c.slug === primaryCat)?.label;
            return (
              <li key={p.slug}>
                <Link
                  href={`/projetos/${p.slug}`}
                  className="group relative block aspect-[4/5] overflow-hidden rounded-section bg-surface"
                >
                  {/* COVER */}
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                    quality={90}
                    className="object-cover transition duration-700 group-hover:scale-105 group-hover:blur-sm"
                  />

                  {/* Badge sempre visível (top-left) */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={cn(
                      "inline-block rounded-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
                      catColor[primaryCat]
                    )}>
                      {catLabel}
                    </span>
                  </div>

                  {/* Ano sempre visível (top-right) */}
                  {p.year && (
                    <span className="absolute top-4 right-4 z-10 rounded-pill bg-ink-900/40 backdrop-blur-sm border border-ink-50/15 px-2.5 py-1 text-[11px] font-medium text-ink-50 tabular-nums">
                      © {p.year}
                    </span>
                  )}

                  {/* OVERLAY HOVER — revela info com fade + blur backdrop */}
                  <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {/* gradiente escuro pra contraste */}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/85 to-transparent" />
                    {/* conteúdo */}
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

                  {/* TÍTULO sempre visível (bottom em estado idle) — somem no hover */}
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

        {visible.length === 0 && (
          <div className="rounded-section border border-line bg-bg p-12 text-center">
            <p className="text-body">Nenhum projeto nessa categoria ainda.</p>
          </div>
        )}

        {/* Botão Ver mais */}
        {hasMore && (
          <Reveal className="flex justify-center pt-4">
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2 rounded-pill border border-line bg-bg px-6 py-3.5 text-sm font-semibold text-fg-strong hover:bg-surface transition"
            >
              <Plus className="size-4 transition group-hover:rotate-90" strokeWidth={2.5} />
              Ver mais
            </button>
          </Reveal>
        )}
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
