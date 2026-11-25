"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Icon, ICONS } from "@/components/rb/ui";
import { FinalCTA } from "@/components/rb/FinalCTA";
import { ImageReveal, LineReveal, Reveal, RevealGroup } from "@/components/rb/motion";
import { RB_PROJECTS, SERVICES, type ServiceKey, type RBProject } from "@/content/rb/projects";
import { cn } from "@/lib/utils";

/**
 * Trabalhos — Figma "Trabalhos · Desktop 1440" / "· Ampla" / "· Celular 390".
 * Referência Caspia: título enorme com a contagem, troca entre Grade e
 * Ampla, ano e categorias acima da imagem, nome embaixo. Filtros por área
 * vêm do site atual.
 */
const COPY = {
  pt: { title: "Trabalhos", desc: "Marcas, sites, direção de arte e motion levados do conceito ao ar. Cada projeto abre com o caminho e o resultado.", grid: "Grade", wide: "Ampla", filter: "Filtrar por área", all: "Tudo", view: "Escolher visualização", empty: "Nenhum projeto nesta área ainda." },
  en: { title: "Work", desc: "Brands, websites, art direction and motion taken from concept to launch. Each project opens with the path and the result.", grid: "Grid", wide: "Full", filter: "Filter by area", all: "All", view: "Choose view", empty: "No projects in this area yet." },
};

type Filter = "all" | ServiceKey;

function meta(p: RBProject, locale: "pt" | "en") {
  return `${p.year} · ${p.cats.map((c) => SERVICES[c][locale]).join(", ")}`;
}

function GridItem({ p, tall }: { p: RBProject; tall: boolean }) {
  const { locale } = useLocale();
  // Cada item: rótulo sobe da máscara, a moldura abre, o nome sobe (em sequência).
  return (
    <RevealGroup stagger={0.08}>
      <Link href={`/projetos/${p.slug}`} className="group block">
        <LineReveal as="p" className="t-label text-ink-700 dark:text-ink-200">{meta(p, locale)}</LineReveal>
        <ImageReveal radius={8} className={cn("relative mt-2.5 overflow-hidden rounded-lg bg-ink-100 lg:mt-3", "aspect-[4/3] lg:aspect-auto", tall ? "lg:h-[640px]" : "lg:h-[512px]")}>
          <Image quality={90} src={p.cover} alt={p.name} fill sizes="(min-width: 1024px) 410px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </ImageReveal>
        <LineReveal as="h2" className="t-lead mt-3 text-fg-strong lg:mt-4">{p.name}</LineReveal>
      </Link>
    </RevealGroup>
  );
}

function WidePanel({ p, first }: { p: RBProject; first: boolean }) {
  const { locale } = useLocale();
  return (
    <Link href={`/projetos/${p.slug}`} className={cn("group relative grid items-center bg-ink-900 px-6 py-12 text-ink-50 lg:min-h-[720px] lg:grid-cols-[1fr_620px_1fr] lg:gap-6 lg:px-10", !first && "border-t border-ink-700")}>
      <LineReveal as="span" className="t-h3 order-2 mt-6 lg:order-none lg:mt-0">{p.year}</LineReveal>
      <span className="relative order-1 block lg:order-none">
        <ImageReveal as="span" radius={0} className="relative block aspect-[620/440] overflow-hidden">
          <Image quality={90} src={p.cover} alt={p.name} fill sizes="(min-width: 1024px) 620px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.02]" />
          {[["left-2.5 top-2.5", "M0 14V0h14"], ["right-2.5 top-2.5", "M0 0h14v14"], ["bottom-2.5 left-2.5", "M0 0v14h14"], ["bottom-2.5 right-2.5", "M14 0v14H0"]].map(([pos, d]) => (
            <svg key={pos} aria-hidden width="14" height="14" viewBox="0 0 14 14" className={cn("absolute", pos)} fill="none" stroke="#F2F2EB" strokeWidth="1.5"><path d={d} /></svg>
          ))}
        </ImageReveal>
        <LineReveal as="span" className="t-label mt-4 block">{p.name}</LineReveal>
      </span>
      <Reveal as="span" y={20} delay={0.1} className="t-h3 order-3 lg:order-none lg:text-right">
        {p.cats.map((c) => <span key={c} className="block">{SERVICES[c][locale]}</span>)}
      </Reveal>
    </Link>
  );
}

export function ProjectsIndex() {
  const { locale } = useLocale();
  const c = COPY[locale];
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"grid" | "wide">("grid");
  const list = useMemo(() => RB_PROJECTS.filter((p) => filter === "all" || p.cats.includes(filter)), [filter]);
  const count = (k: ServiceKey) => RB_PROJECTS.filter((p) => p.cats.includes(k)).length;
  const filters: [Filter, string][] = [["all", `${c.all} (${RB_PROJECTS.length})`], ...(Object.keys(SERVICES) as ServiceKey[]).map((k) => [k, `${SERVICES[k][locale]} (${count(k)})`] as [Filter, string])];
  const rows: RBProject[][] = [];
  for (let i = 0; i < list.length; i += 3) rows.push(list.slice(i, i + 3));

  return (
    <>
      <section className="bg-bg pt-32 lg:pt-44">
        <div className="rb-container">
          <RevealGroup as="h1" stagger={0.12} className="flex items-start text-fg-strong">
            <LineReveal as="span" className="t-display">{c.title}</LineReveal>
            <LineReveal as="span" className="t-lead ml-1 mt-1 lg:ml-2.5 lg:mt-3">({RB_PROJECTS.length})</LineReveal>
          </RevealGroup>
          <div className="mt-4 flex flex-col gap-6 lg:mt-6 lg:flex-row lg:items-center lg:justify-between">
            <Reveal as="p" delay={0.15} className="t-small max-w-[520px] text-ink-700 dark:text-ink-200">{c.desc}</Reveal>
            <Reveal delay={0.25} role="group" aria-label={c.view} className="hidden items-center gap-[100px] lg:mr-[52px] lg:flex">
              {([["grid", c.grid, ICONS.grid], ["wide", c.wide, ICONS.scan]] as const).map(([k, label, icon]) => (
                <button key={k} type="button" aria-pressed={view === k} onClick={() => setView(k)} className={cn("t-h3 flex items-center gap-3 transition-colors", view === k ? "text-fg-strong" : "text-ink-200 hover:text-ink-700")}>
                  {label} <Icon d={icon} size={24} />
                </button>
              ))}
            </Reveal>
          </div>
          <Reveal y={20} delay={0.3} className="mt-10 border-y border-ink-100 py-4 dark:border-ink-700 lg:mt-16 lg:py-5">
            <div className="-mr-6 flex items-center gap-3 overflow-x-auto pr-6 [scrollbar-width:none] lg:mr-0 lg:pr-0">
              <span className="t-label hidden shrink-0 pr-3 text-ink-400 lg:inline">{c.filter}</span>
              {filters.map(([k, label]) => (
                <button key={k} type="button" aria-pressed={filter === k} onClick={() => setFilter(k)} className={cn("shrink-0 rounded-pill border px-4 py-2 text-sm font-medium transition-colors lg:text-base", filter === k ? "border-ink-900 bg-ink-900 text-ink-50 dark:border-ink-50 dark:bg-ink-50 dark:text-ink-900" : "border-ink-200 text-ink-700 hover:border-ink-700 dark:text-ink-200")}>
                  {label}
                </button>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section aria-label={c.title} className="bg-bg pb-24 pt-12 lg:pb-32 lg:pt-16">
        <div className="rb-container">
          {list.length === 0 && <p className="t-small text-ink-700">{c.empty}</p>}
          {/* key: trocar o filtro ou a visualização remonta a lista e os itens entram de novo */}
          {view === "grid" || list.length === 0 ? (
            <div key={`grid-${filter}`} className="flex flex-col gap-10 lg:gap-20">
              {rows.map((row, r) => (
                <RevealGroup key={r} stagger={0.1} className="grid gap-10 lg:grid-cols-3 lg:items-start lg:gap-[25px]">
                  {row.map((p, i) => <GridItem key={p.slug} p={p} tall={i === 1} />)}
                </RevealGroup>
              ))}
            </div>
          ) : (
            <div key={`wide-${filter}`} className="overflow-hidden">
              {list.map((p, i) => <WidePanel key={p.slug} p={p} first={i === 0} />)}
            </div>
          )}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
