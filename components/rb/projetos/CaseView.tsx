"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Icon, ICONS, Label } from "@/components/rb/ui";
import { FinalCTA } from "@/components/rb/FinalCTA";
import { nextRbProject, rbProject, SERVICES } from "@/content/rb/projects";
import type { Projeto } from "@/content/projetos";
import { cn } from "@/lib/utils";

/**
 * Página de projeto — Figma "Projeto · GO Trace" (referência: case Sol Agora,
 * Francielle Lima). Modelo para todos os cases: cabeçalho com imagem grande,
 * introdução com ficha e resumo de 1 minuto, números, seções, aplicações em
 * mosaico (legenda embaixo, nunca sobre a foto), resultado e próximo case.
 * A prosa dos cases fica em PT nas duas línguas (decisão antiga do site).
 */

const UI = {
  pt: { hint: "Role para ler o case", crumb: "Trabalhos", cliente: "Cliente", papel: "Papel", escopo: "Escopo", duracao: "Duração", ano: "Ano", resumo: "Resumo · 1 min de leitura", continua: "A história completa continua abaixo", problema: "Problema", papelR: "Papel", solucao: "Solução", resultado: "Resultado", aplic: "Aplicações", aplicT: "A marca no mundo.", mudou: "O que mudou", proximo: "Próximo case", decisao: "A decisão" },
  en: { hint: "Scroll to read the case", crumb: "Work", cliente: "Client", papel: "Role", escopo: "Scope", duracao: "Duration", ano: "Year", resumo: "Summary · 1 min read", continua: "The full story continues below", problema: "Problem", papelR: "Role", solucao: "Solution", resultado: "Result", aplic: "Applications", aplicT: "The brand out in the world.", mudou: "What changed", proximo: "Next case", decisao: "The decision" },
};

const EYEBROW: Record<string, { pt: string; en: string }> = {
  DESAFIO: { pt: "O problema", en: "The problem" },
  PROCESSO: { pt: "O processo", en: "The process" },
  RESULTADO: { pt: "Resultado", en: "Result" },
  "PONTO DE PARTIDA": { pt: "Ponto de partida", en: "Starting point" },
  "APLICAÇÃO": { pt: "Aplicação", en: "Application" },
};

/** O texto antigo dos cases usa travessões; a marca não usa. */
const clean = (s: string) => s.replace(/\s+—\s+/g, ", ").replace(/—/g, ",");

const Paras = ({ text, className }: { text: string; className?: string }) => (
  <div className={cn("space-y-4", className)}>
    {clean(text).split(/\n\n+/).map((p, i) => <p key={i}>{p}</p>)}
  </div>
);

export function CaseView({ projeto }: { projeto: Projeto }) {
  const { locale } = useLocale();
  const t = UI[locale];
  const c = projeto.case;
  const rb = c.rb;
  const card = rbProject(projeto.slug);
  const next = nextRbProject(projeto.slug);
  const name = card?.name ?? clean(projeto.title).replace(/,.*$/, "");
  const list = card ? card.cats.map((k) => SERVICES[k][locale]) : c.tags;
  const and = locale === "pt" ? " e " : " and ";
  const areas = list.length > 1 ? `${list.slice(0, -1).join(", ")}${and}${list[list.length - 1]}` : list[0];
  const heroSrc = c.hero.src;
  const wideSrc = rb?.wide?.src ?? c.gallery.find((g) => g.src !== heroSrc)?.src;
  // Legendas só onde foram conferidas imagem por imagem (os cases antigos têm legendas genéricas).
  const curated = !!rb || ["aroeira", "espaco-equilibrio", "marisco-filmes"].includes(projeto.slug);
  const sections = c.sections;

  return (
    <article>
      {/* 01 Cabeçalho */}
      <header className="bg-bg pt-32 lg:pt-[152px]">
        <div className="rb-container">
          <Label className="text-ink-700 dark:text-ink-200">{areas} · {name} · {c.meta.setor}</Label>
          <div className="mt-2 flex flex-col gap-4 lg:mt-3 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="t-display text-fg-strong">{name}</h1>
            <a href="#introducao" className="t-label inline-flex items-center gap-2 text-ink-400 hover:text-fg-strong lg:mb-7">
              {t.hint} <Icon d={ICONS.arrowDown} size={16} />
            </a>
          </div>
          <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-xl bg-ink-100 lg:mt-10 lg:aspect-[16/9] lg:rounded-2xl">
            <Image src={heroSrc} alt={c.hero.alt ? clean(c.hero.alt) : name} fill priority sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
          </div>
        </div>
      </header>

      {/* 02 Introdução */}
      <section id="introducao" className="scroll-mt-28 bg-bg pt-16 lg:pt-[120px]">
        <div className="rb-container lg:px-[160px]">
          <p className="t-label text-ink-400"><Link href="/projetos" className="hover:text-fg-strong">{t.crumb}</Link> / {name}</p>
          <h2 className="t-h1 mt-3 max-w-[860px] text-fg-strong lg:mt-4">{clean(rb?.headline ?? c.subtitle)}</h2>
          <p className="t-lead mt-4 max-w-[800px] text-ink-700 dark:text-ink-200 lg:mt-6">{clean(rb?.lead ?? projeto.description)}</p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-ink-100 pt-5 dark:border-ink-700 lg:mt-14 lg:grid-cols-5 lg:pt-6">
            {[
              [t.cliente, `${c.meta.cliente}, ${c.meta.setor}`],
              [t.papel, c.meta.role],
              [t.escopo, c.meta.entregaveis.join(", ")],
              [t.duracao, c.meta.duracao],
              [t.ano, String(projeto.year ?? card?.year ?? "")],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="t-label text-ink-400">{k}</dt>
                <dd className="t-small mt-1.5 text-fg-strong lg:mt-2">{clean(v)}</dd>
              </div>
            ))}
          </dl>
          {rb?.resumo && (
            <div className="mt-8 rounded-2xl bg-ink-900 p-5 text-ink-50 lg:mt-12 lg:p-8">
              <div className="flex flex-col gap-2 border-b border-ink-700 pb-4 lg:flex-row lg:justify-between lg:pb-5">
                <p className="t-label text-brand">{t.resumo}</p>
                <p className="t-label hidden items-center gap-2 text-ink-200 lg:inline-flex">{t.continua} <Icon d={ICONS.arrowDown} size={16} /></p>
              </div>
              <div className="mt-5 grid gap-5 lg:mt-6 lg:grid-cols-4 lg:gap-8">
                {([["01", t.problema, rb.resumo.problema], ["02", t.papelR, rb.resumo.papel], ["03", t.solucao, rb.resumo.solucao], ["04", t.resultado, rb.resumo.resultado]] as const).map(([n, k, v]) => (
                  <div key={n}>
                    <p className="t-label"><span className="text-ink-400">{n}</span> {k}</p>
                    <p className="t-small mt-2 text-ink-200 lg:mt-3">{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 03 Imagem e números */}
      <section className="bg-bg pt-16 lg:pt-24">
        <div className="rb-container">
          {wideSrc && (
            <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-100 lg:aspect-[16/9] lg:rounded-2xl">
              <Image src={wideSrc} alt="" fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
            </div>
          )}
          {c.stats && c.stats.length > 0 && (
            <dl className="mt-10 divide-y divide-ink-100 border-y border-ink-100 dark:divide-ink-700 dark:border-ink-700 lg:mx-20 lg:mt-24 lg:grid lg:grid-cols-3 lg:divide-x lg:divide-y-0 lg:border-y-0 lg:border-t lg:pt-8">
              {c.stats.map((s) => (
                <div key={s.label} className="flex items-center gap-6 py-4 lg:block lg:px-6 lg:py-0 lg:first:pl-0">
                  <dt className="t-hero w-[140px] shrink-0 text-fg-strong lg:w-auto">{s.value.replace("−", "−")}</dt>
                  <dd className="t-label text-ink-400 lg:mt-2">{clean(s.label)}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* 04+ Seções do case */}
      {sections.map((s, i) => {
        const label = s.eyebrow ? (EYEBROW[s.eyebrow]?.[locale] ?? s.eyebrow) : "";
        return (
          <section key={i} className="bg-bg pt-20 lg:pt-40">
            <div className="rb-container lg:px-[160px]">
              <div className="grid gap-4 lg:grid-cols-[440px_1fr] lg:gap-20">
                <div>
                  {label && <Label>{label}</Label>}
                  {s.title && <h2 className="t-h2 mt-3 text-fg-strong lg:mt-4">{clean(s.title)}</h2>}
                </div>
                <Paras text={s.body} className="t-small text-ink-700 dark:text-ink-200 lg:pt-9" />
              </div>
              {i === 0 && rb?.tabela && (
                <div className="mt-10 lg:mx-auto lg:mt-20 lg:max-w-[800px]">
                  <div className="grid grid-cols-2 gap-6 pb-3 lg:pb-4">
                    <p className="t-label text-ink-400">{rb.tabela.esquerda}</p>
                    <p className="t-label text-ink-400">{rb.tabela.direita}</p>
                  </div>
                  {rb.tabela.linhas.map(([a, b]) => (
                    <div key={a} className="grid grid-cols-2 gap-6 border-t border-ink-100 py-3 dark:border-ink-700 lg:py-4">
                      <p className="t-small text-fg-strong">{a}</p>
                      <p className="t-small text-ink-400">{b}</p>
                    </div>
                  ))}
                  <div className="border-t border-ink-100 dark:border-ink-700" />
                </div>
              )}
              {i === 1 && rb?.decisao && (
                <div className="mt-16 lg:mt-[120px]">
                  <Label>{t.decisao}</Label>
                  <h3 className="t-h2 mt-3 max-w-[860px] text-fg-strong lg:mt-4">{rb.decisao.title}</h3>
                  <div className="mt-8 grid gap-8 lg:mt-12 lg:grid-cols-3 lg:gap-9">
                    {rb.decisao.points.map((p, k) => (
                      <div key={p.title} className="border-t border-ink-100 pt-5 dark:border-ink-700 lg:pt-6">
                        <p className="t-label text-brand">{String(k + 1).padStart(2, "0")}</p>
                        <h4 className="t-lead mt-2 text-fg-strong lg:mt-3">{p.title}</h4>
                        <p className="t-small mt-2 text-ink-700 dark:text-ink-200">{p.body}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            {i === 1 && rb?.pair && (
              <div className="rb-container mt-12 grid gap-6 lg:mt-24 lg:grid-cols-2">
                {rb.pair.map((p) => (
                  <figure key={p.src}>
                    <div className="relative aspect-[628/470] overflow-hidden rounded-xl bg-ink-100 lg:rounded-2xl">
                      <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 628px, 100vw" className="object-cover" />
                    </div>
                    <figcaption className="t-label mt-3 text-ink-400">{p.alt}</figcaption>
                  </figure>
                ))}
              </div>
            )}
            {s.image && (
              <div className="rb-container mt-12 lg:mt-24">
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-ink-100 lg:aspect-[16/9] lg:rounded-2xl">
                  <Image src={s.image.src} alt={clean(s.image.alt)} fill sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
                </div>
                <p className="t-label mt-3 text-ink-400">{clean(s.image.alt)}</p>
              </div>
            )}
          </section>
        );
      })}

      {/* Aplicações: mosaico com legenda embaixo */}
      {c.gallery.length > 0 && (
        <section className="bg-bg pt-20 lg:pt-40">
          <div className="rb-container">
            <div className="lg:px-20">
              <Label>{t.aplic}</Label>
              <h2 className="t-h2 mt-3 max-w-[860px] text-fg-strong lg:mt-4">{rb?.aplicacoes?.title ?? t.aplicT}</h2>
              {rb?.aplicacoes?.body && <p className="t-small mt-4 max-w-[600px] text-ink-700 dark:text-ink-200">{rb.aplicacoes.body}</p>}
            </div>
            <div className="mt-10 columns-1 gap-6 sm:columns-2 lg:mt-14 lg:columns-3">
              {c.gallery.map((g) => (
                <figure key={g.src} className="mb-6 break-inside-avoid lg:mb-8">
                  <Image src={g.src} alt={clean(g.alt)} width={1600} height={1067} sizes="(min-width: 1024px) 410px, (min-width: 640px) 50vw, 100vw" className="h-auto w-full rounded-xl bg-ink-100" />
                  {curated && <figcaption className="t-label mt-3 text-ink-400">{clean(g.alt)}</figcaption>}
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Resultado */}
      {rb?.resultados && (
        <section className="bg-bg pt-20 lg:pt-40">
          <div className="rb-container lg:px-[160px]">
            <Label>{t.resultado}</Label>
            <h2 className="t-h1 mt-3 text-fg-strong">{t.mudou}</h2>
            <div className="mt-8 grid gap-3 lg:mt-12 lg:grid-cols-3 lg:gap-5">
              {rb.resultados.map((r) => (
                <div key={r.title} className="rounded-2xl border border-ink-100 p-5 dark:border-ink-700 lg:p-7">
                  <p className="t-label text-brand">{r.label}</p>
                  <h3 className="t-lead mt-3 text-fg-strong">{r.title}</h3>
                  <p className="t-small mt-2 text-ink-700 dark:text-ink-200">{r.body}</p>
                </div>
              ))}
            </div>
            {rb.citacao && (
              <figure className="mt-3 rounded-2xl bg-ink-900 p-5 text-ink-50 lg:mt-5 lg:p-8">
                <blockquote className="t-lead">“{rb.citacao.quote}”</blockquote>
                <figcaption className="t-label mt-4 text-ink-200">{rb.citacao.author}</figcaption>
              </figure>
            )}
          </div>
        </section>
      )}

      {/* Próximo case */}
      <section className="bg-bg pb-24 pt-20 lg:pb-40 lg:pt-40">
        <div className="rb-container lg:px-[160px]">
          <Link href={`/projetos/${next.slug}`} className="group block border-t border-ink-100 pt-8 dark:border-ink-700 lg:pt-12">
            <span className="t-label inline-flex items-center gap-2 text-ink-400">{t.proximo} <Icon d={ICONS.arrowRight} size={16} className="transition-transform group-hover:translate-x-1" /></span>
            <span className="t-hero mt-2 block text-brand">{next.name}</span>
            <span className="t-small mt-2 block max-w-[700px] text-ink-700 dark:text-ink-200">{next.desc[locale]}</span>
          </Link>
        </div>
      </section>
      <FinalCTA />
    </article>
  );
}
