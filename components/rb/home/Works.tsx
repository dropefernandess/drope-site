"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { BrandButton, Chip, Label } from "@/components/rb/ui";
import { ImageReveal, LineReveal, Reveal, RevealGroup } from "@/components/rb/motion";
import { rbProject, SERVICES } from "@/content/rb/projects";
import { cn } from "@/lib/utils";

/**
 * Trabalhos selecionados — Figma "02 Trabalhos selecionados".
 * Duas colunas desencontradas (a da direita começa 120px abaixo),
 * cada card com nome, ano, descrição e etiquetas de categoria.
 * No celular vira uma coluna, na ordem das linhas.
 *
 * Movimento (referência Peu): a seção desliza por cima do hero preso; em
 * cada card a moldura da imagem abre, o nome e o ano sobem da máscara e as
 * etiquetas entram em sequência. Repete ao rolar de novo.
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
    <RevealGroup as="article" stagger={0.09} className={cn(order, "lg:order-none")}>
      <Link href={`/projetos/${p.slug}`} className="group block">
        <ImageReveal radius={8} className={cn("relative overflow-hidden rounded-lg bg-ink-100", aspect)}>
          <Image quality={90} src={p.cover} alt={p.name} fill sizes="(min-width: 1024px) 600px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        </ImageReveal>
        <div className="mt-4 flex items-end justify-between gap-4 lg:mt-7">
          <LineReveal as="h3" className="t-h2 text-fg-strong">{p.name}</LineReveal>
          <LineReveal as="span" className="t-small shrink-0 pb-1 text-ink-700 dark:text-ink-200">{p.year}</LineReveal>
        </div>
        <Reveal as="p" y={16} className="t-small mt-2 max-w-[520px] text-ink-700 dark:text-ink-200 lg:mt-4">{p.desc[locale]}</Reveal>
      </Link>
      <RevealGroup stagger={0.06} className="mt-3.5 flex flex-wrap gap-2 lg:mt-5">
        {p.cats.map((c) => (
          <Reveal key={c} as="span" y={12} className="inline-flex">
            <Chip>{SERVICES[c][locale]}</Chip>
          </Reveal>
        ))}
      </RevealGroup>
    </RevealGroup>
  );
}

export function Works() {
  const { locale } = useLocale();
  return (
    <section id="trabalhos" aria-labelledby="trabalhos-titulo" className="relative z-10 bg-bg pt-16 lg:pt-[120px]">
      <div className="rb-container">
        <LineReveal>
          <Label className="text-ink-700 dark:text-ink-200">{locale === "pt" ? "Trabalhos selecionados" : "Selected work"}</Label>
        </LineReveal>
        <Reveal as="h2" id="trabalhos-titulo" delay={0.08} className="t-h1 mt-3 max-w-[760px] text-fg-strong lg:mt-4">
          {locale === "pt" ? "Projetos levados do primeiro rascunho ao ar." : "Projects taken from first sketch to launch."}
        </Reveal>
        <div className="mt-10 flex flex-col gap-12 lg:mt-16 lg:grid lg:grid-cols-[560fr_600fr] lg:gap-x-[120px]">
          <div className="contents lg:flex lg:flex-col lg:gap-[120px]">
            {LEFT.map((c) => <Card key={c.slug} {...c} />)}
          </div>
          <div className="contents lg:flex lg:flex-col lg:gap-[120px] lg:pt-[120px]">
            {RIGHT.map((c) => <Card key={c.slug} {...c} />)}
          </div>
        </div>
        <Reveal className="flex justify-center pb-16 pt-14 lg:pb-[120px] lg:pt-[120px]">
          <BrandButton href="/projetos" variant="contorno" className="w-full justify-between sm:w-auto">
            {locale === "pt" ? "Ver todos os trabalhos" : "See all work"}
          </BrandButton>
        </Reveal>
      </div>
    </section>
  );
}
