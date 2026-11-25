"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { BrandButton, Chip, Label } from "@/components/rb/ui";
import { rbProject, SERVICES } from "@/content/rb/projects";
import { cn } from "@/lib/utils";

/**
 * Trabalhos selecionados — Figma "02 Trabalhos selecionados".
 * Duas colunas desencontradas (a da direita começa 120px abaixo),
 * cada card com nome, ano, descrição e etiquetas de categoria.
 * No celular vira uma coluna, na ordem das linhas.
 */

const LEFT = [
  { slug: "go-trace", aspect: "aspect-[560/700]", order: "order-1" },
  { slug: "aroeira", aspect: "aspect-[560/600]", order: "order-3" },
  { slug: "marisco-filmes", aspect: "aspect-[560/360]", order: "order-5" },
];
const RIGHT = [
  { slug: "espaco-equilibrio", aspect: "aspect-[600/450]", order: "order-2" },
  { slug: "sirius", aspect: "aspect-[600/650]", order: "order-4" },
  { slug: "use-duali", aspect: "aspect-[600/440]", order: "order-6" },
];

function Card({ slug, aspect, order }: { slug: string; aspect: string; order: string }) {
  const { locale } = useLocale();
  const p = rbProject(slug)!;
  return (
    <article className={cn(order, "lg:order-none")}>
      <Link href={`/projetos/${p.slug}`} className="group block">
        <div className={cn("relative overflow-hidden rounded-lg bg-ink-100", aspect)}>
          <Image src={p.cover} alt={p.name} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </div>
        <div className="mt-4 flex items-end justify-between gap-4 lg:mt-7">
          <h3 className="t-h2 text-fg-strong">{p.name}</h3>
          <span className="t-small shrink-0 pb-1 text-ink-700 dark:text-ink-200">{p.year}</span>
        </div>
        <p className="t-small mt-2 max-w-[520px] text-ink-700 dark:text-ink-200 lg:mt-4">{p.desc[locale]}</p>
      </Link>
      <div className="mt-3.5 flex flex-wrap gap-2 lg:mt-5">
        {p.cats.map((c) => <Chip key={c}>{SERVICES[c][locale]}</Chip>)}
      </div>
    </article>
  );
}

export function Works() {
  const { locale } = useLocale();
  return (
    <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="bg-bg pt-16 lg:pt-[120px]">
      <div className="rb-container">
        <Label className="text-ink-700 dark:text-ink-200">{locale === "pt" ? "Trabalhos selecionados" : "Selected work"}</Label>
        <h2 id="trabalhos-titulo" className="t-h1 mt-3 max-w-[760px] text-fg-strong lg:mt-4">
          {locale === "pt" ? "Projetos levados do primeiro rascunho ao ar." : "Projects taken from first sketch to launch."}
        </h2>
        <div className="mt-10 flex flex-col gap-12 lg:mt-16 lg:grid lg:grid-cols-[560fr_600fr] lg:gap-x-[120px]">
          <div className="contents lg:flex lg:flex-col lg:gap-[120px]">
            {LEFT.map((c) => <Card key={c.slug} {...c} />)}
          </div>
          <div className="contents lg:flex lg:flex-col lg:gap-[120px] lg:pt-[120px]">
            {RIGHT.map((c) => <Card key={c.slug} {...c} />)}
          </div>
        </div>
        <div className="flex justify-center pb-16 pt-14 lg:pb-[120px] lg:pt-[120px]">
          <BrandButton href="/projetos" variant="contorno" className="w-full justify-between sm:w-auto">
            {locale === "pt" ? "Ver todos os trabalhos" : "See all work"}
          </BrandButton>
        </div>
      </div>
    </section>
  );
}
