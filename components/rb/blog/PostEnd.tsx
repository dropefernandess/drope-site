"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Chip, Icon, ICONS, Label } from "@/components/rb/ui";
import { Reveal } from "@/components/rb/motion";
import type { Post } from "@/content/posts";
import { BLOG_COPY, categoria, formatDate, POST_GRID } from "./copy";

/** Fim do post: caixa do autor (na coluna do texto) e o próximo texto. */
export function PostEnd({ next }: { next: Pick<Post, "slug" | "titulo" | "excerpt" | "categoria" | "data" | "leitura"> }) {
  const { locale } = useLocale();
  const c = BLOG_COPY[locale];
  return (
    <div className="rb-container pb-20 lg:pb-[120px]">
      {/* Autor */}
      <div className={`mt-16 lg:mt-24 ${POST_GRID}`}>
        <Reveal className="max-w-[680px] border-t border-ink-100 pt-8 dark:border-ink-700 lg:col-start-2 lg:pt-10">
          <div className="flex items-start gap-5">
            <div className="relative size-16 shrink-0 overflow-hidden rounded-full bg-ink-900 lg:size-20">
              <Image
                src="/rb/portrait.jpg"
                alt=""
                fill
                sizes="280px"
                className="origin-[45.6%_30.5%] scale-[3.2] object-cover"
              />
            </div>
            <div className="min-w-0">
              <Label className="text-ink-700 dark:text-ink-200">{c.writtenBy}</Label>
              <p className="t-lead mt-1 text-fg-strong">Drope Fernandes</p>
              <p className="t-small mt-3 text-ink-700 dark:text-ink-200">{c.bio}</p>
              <Link
                href="/sobre"
                className="t-small group mt-4 inline-flex items-center gap-2 font-semibold text-fg-strong underline decoration-ink-200 underline-offset-[6px] transition-colors hover:text-brand hover:decoration-brand"
              >
                {c.aboutLink}
                <Icon d={ICONS.arrowRight} size={18} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Próximo texto */}
      <section aria-labelledby="proximo-texto" className="mt-16 lg:mt-[120px]">
        <Reveal as="article" className="group relative grid gap-6 rounded-2xl border border-ink-100 p-6 transition-colors duration-200 hover:border-ink-900 motion-reduce:transition-none dark:border-ink-700 dark:hover:border-ink-50 sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:gap-16 lg:p-14 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-3">
              <Label as="span" className="text-ink-700 dark:text-ink-200">{c.next}</Label>
              <Chip>{categoria(next.categoria, locale)}</Chip>
            </div>
            <h2 id="proximo-texto" lang="pt-BR" className="t-h1 mt-6 max-w-[900px] text-balance text-fg-strong transition-colors duration-200 group-hover:text-brand motion-reduce:transition-none lg:mt-10">
              <Link
                href={`/blog/${next.slug}`}
                className="outline-none after:absolute after:inset-0 after:content-['']"
              >
                {next.titulo}
              </Link>
            </h2>
            <p lang="pt-BR" className="t-small mt-4 max-w-[640px] text-ink-700 dark:text-ink-200">{next.excerpt}</p>
            <p className="t-small mt-6 text-ink-700 dark:text-ink-200">
              <time dateTime={next.data}>{formatDate(next.data, locale)}</time>
              <span aria-hidden className="px-2">·</span>
              {c.reading(next.leitura)}
            </p>
          </div>
          <span
            aria-hidden
            className="grid size-14 place-items-center justify-self-start rounded-full bg-brand text-ink-50 transition-colors duration-200 group-hover:bg-ink-900 motion-reduce:transition-none dark:group-hover:bg-ink-50 dark:group-hover:text-ink-900 lg:size-[72px]"
          >
            {/* A seta dá um toque para o lado de tempos em tempos (rb-nudge-x) */}
            <span className="rb-nudge-x">
              <Icon d={ICONS.arrowRight} size={26} className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none" />
            </span>
          </span>
        </Reveal>
      </section>
    </div>
  );
}
