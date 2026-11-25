"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Icon, ICONS, Label } from "@/components/rb/ui";
import { BLOG_COPY, capaAltDe, capaDe, categoria, formatDate, POST_GRID, type PostMeta } from "./copy";

/**
 * Cabeçalho do post. Mesma grade do corpo (coluna do sumário + coluna do
 * texto), então o título alinha com a medida de leitura no desktop.
 */

export function PostHeader({ post }: { post: PostMeta }) {
  const { locale } = useLocale();
  const c = BLOG_COPY[locale];
  const capa = capaDe(post);
  return (
    <header className="rb-container pt-[120px] lg:pt-[160px]">
      <div className={POST_GRID}>
        <div>
          <Link
            href="/blog"
            className="t-small group inline-flex items-center gap-2 text-ink-700 transition-colors hover:text-fg-strong dark:text-ink-200 dark:hover:text-ink-50"
          >
            <Icon d={ICONS.arrowLeft} size={18} className="transition-transform group-hover:-translate-x-1 motion-reduce:transition-none" />
            {c.back}
          </Link>
        </div>
        <div className="mt-10 min-w-0 lg:mt-0">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <Label as="span" className="inline-flex items-center gap-2 text-fg-strong">
              <span aria-hidden className="size-2 bg-brand" />
              {categoria(post.categoria, locale)}
            </Label>
            <span aria-hidden className="t-label text-ink-400">·</span>
            <Label as="span" className="whitespace-nowrap text-ink-700 dark:text-ink-200">
              <time dateTime={post.data}>{formatDate(post.data, locale)}</time>
            </Label>
            <span aria-hidden className="t-label hidden text-ink-400 sm:inline">·</span>
            <Label as="span" className="basis-full whitespace-nowrap text-ink-700 dark:text-ink-200 sm:basis-auto">{c.reading(post.leitura)}</Label>
          </p>
          <h1 lang="pt-BR" className="t-hero mt-5 max-w-[1000px] text-balance text-fg-strong lg:mt-8">
            {post.titulo}
          </h1>
          <p lang="pt-BR" className="t-lead mt-6 max-w-[820px] text-ink-700 dark:text-ink-200 lg:mt-10">
            {post.subtitulo}
          </p>
          {c.langNote && <p className="t-small mt-4 text-ink-700 dark:text-ink-200">{c.langNote}</p>}
        </div>
      </div>
      {capa && (
        <div className="relative mt-12 aspect-[16/9] overflow-hidden rounded-lg bg-ink-100 lg:mt-20">
          <Image src={capa} alt={capaAltDe(post)} fill priority sizes="(min-width: 1440px) 1280px, 100vw" className="object-cover" />
        </div>
      )}
    </header>
  );
}
