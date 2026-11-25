"use client";

import Image from "next/image";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Chip, Icon, ICONS, Label, SOCIAL } from "@/components/rb/ui";
import { FinalCTA } from "@/components/rb/FinalCTA";
import type { PostCard } from "./copy";
import { BLOG_COPY, capaAltDe, capaDe, categoria, formatDate } from "./copy";

/**
 * /blog — rebrand 2026. Título grande com destaque em serifa, o texto mais
 * recente em destaque (imagem se tiver capa, senão um cartão tipográfico com
 * a citação do próprio texto), os anteriores em linhas e a chamada final.
 */

/** Círculo com a seta; acende em vermelho no hover do cartão. */
function ArrowDot({ className = "" }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={`grid size-12 shrink-0 place-items-center rounded-full border transition-colors duration-200 motion-reduce:transition-none lg:size-14 ${className}`}
    >
      <Icon d={ICONS.arrowUpRight} size={22} className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" />
    </span>
  );
}

function Featured({ post }: { post: PostCard }) {
  const { locale } = useLocale();
  const c = BLOG_COPY[locale];
  const capa = capaDe(post);
  const citacao = post.citacao;
  const aside = capa || citacao;
  return (
    <article
      className={`group relative grid overflow-hidden rounded-2xl bg-ink-900 text-ink-50 dark:border dark:border-ink-700 ${
        aside ? "lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)]" : ""
      } has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand`}
    >
      <div className="flex flex-col p-6 sm:p-8 lg:p-14">
        <div className="flex flex-wrap items-center gap-3">
          <Label as="span" className="text-ink-200">{c.latest}</Label>
          <Chip className="border-ink-700 text-ink-100">{categoria(post.categoria, locale)}</Chip>
        </div>
        <h2 lang="pt-BR" className="t-h1 mt-6 max-w-[760px] text-balance lg:mt-10">
          <Link
            href={`/blog/${post.slug}`}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {post.titulo}
          </Link>
        </h2>
        <p lang="pt-BR" className="t-small mt-4 max-w-[600px] text-ink-200 lg:mt-6">{post.excerpt}</p>
        <div className="mt-8 flex items-end justify-between gap-6 lg:mt-auto lg:pt-16">
          <p className="t-small flex flex-col text-ink-200 sm:flex-row sm:flex-wrap sm:gap-x-2">
            <time dateTime={post.data} className="whitespace-nowrap">{formatDate(post.data, locale)}</time>
            <span aria-hidden className="hidden sm:inline">·</span>
            <span className="whitespace-nowrap">{c.reading(post.leitura)}</span>
          </p>
          <span className="flex items-center gap-4">
            <span className="t-small hidden text-ink-50 sm:inline">{c.readPost}</span>
            <ArrowDot className="border-brand bg-brand text-ink-50 group-hover:bg-ink-50 group-hover:text-ink-900 group-hover:border-ink-50" />
          </span>
        </div>
      </div>

      {capa ? (
        <div className="relative min-h-[260px] bg-ink-700 lg:min-h-full">
          <Image src={capa} alt={capaAltDe(post)} fill sizes="(min-width: 1024px) 440px, 100vw" className="object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transition-none" />
        </div>
      ) : citacao ? (
        <figure aria-hidden className="flex flex-col justify-between border-t border-ink-700 p-6 sm:p-8 lg:border-l lg:border-t-0 lg:p-14">
          <span className="t-serif block h-[0.45em] text-[72px] leading-[0.9] text-brand lg:h-auto lg:text-[120px] lg:leading-[0.6]">“</span>
          <blockquote lang="pt-BR" className="t-serif mt-4 text-[clamp(28px,calc(21.31px+1.714vw),46px)] leading-[1.12] text-ink-50 lg:mt-10">
            {citacao}
          </blockquote>
        </figure>
      ) : null}
    </article>
  );
}

function Row({ post }: { post: PostCard }) {
  const { locale } = useLocale();
  const c = BLOG_COPY[locale];
  return (
    <li className="border-b border-ink-100 dark:border-ink-700">
      <article className="group relative grid gap-4 py-8 lg:grid-cols-[260px_minmax(0,1fr)_auto] lg:gap-x-[120px] lg:py-12 has-[a:focus-visible]:outline has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-brand">
        <p className="t-small flex flex-wrap gap-x-2 text-ink-700 dark:text-ink-200 lg:flex-col lg:pt-2">
          <time dateTime={post.data}>{formatDate(post.data, locale)}</time>
          <span aria-hidden className="lg:hidden">·</span>
          <span>{c.reading(post.leitura)}</span>
        </p>
        <div className="min-w-0">
          <h3 lang="pt-BR" className="t-h2 max-w-[820px] text-balance text-fg-strong transition-colors duration-200 group-hover:text-brand motion-reduce:transition-none">
            <Link
              href={`/blog/${post.slug}`}
              className="outline-none after:absolute after:inset-0 after:content-['']"
            >
              {post.titulo}
            </Link>
          </h3>
          <p lang="pt-BR" className="t-small mt-3 max-w-[640px] text-ink-700 dark:text-ink-200 lg:mt-4">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Chip>{categoria(post.categoria, locale)}</Chip>
          </div>
        </div>
        <ArrowDot className="hidden border-ink-200 text-fg-strong group-hover:border-brand group-hover:bg-brand group-hover:text-ink-50 lg:grid dark:border-ink-700" />
      </article>
    </li>
  );
}

export function BlogIndex({ posts }: { posts: PostCard[] }) {
  const { locale, t } = useLocale();
  const c = BLOG_COPY[locale];
  const [latest, ...rest] = posts;
  const mailto = `mailto:${SOCIAL.email}?subject=${encodeURIComponent(c.notifySubject)}`;

  return (
    <>
      <section aria-labelledby="blog-titulo" className="bg-bg">
        <div className="rb-container pb-16 pt-[120px] lg:pb-[120px] lg:pt-[160px]">
          <Label className="text-ink-700 dark:text-ink-200">{c.label}</Label>
          <h1 id="blog-titulo" className="t-hero mt-3 max-w-[1100px] text-fg-strong lg:mt-4">
            {c.titleA}{" "}
            <span className="t-serif t-hero-serif text-brand">{c.titleB}</span>
          </h1>
          <div className="mt-6 flex flex-col gap-3 lg:mt-10">
            <p className="t-lead max-w-[760px] text-ink-700 dark:text-ink-200">{t("blog_idx.lead")}</p>
            {c.langNote && <p className="t-small text-ink-700 dark:text-ink-200">{c.langNote}</p>}
          </div>

          {latest && (
            <div className="mt-12 lg:mt-20">
              <Featured post={latest} />
            </div>
          )}

          {rest.length > 0 && (
            <section aria-labelledby="blog-anteriores" className="mt-16 lg:mt-[120px]">
              <h2 id="blog-anteriores" className="t-h2 text-fg-strong">{c.earlier}</h2>
              <ul className="mt-6 border-t border-ink-100 dark:border-ink-700 lg:mt-10">
                {rest.map((p) => <Row key={p.slug} post={p} />)}
              </ul>
            </section>
          )}

          <div className="mt-12 flex flex-col gap-4 rounded-2xl border border-ink-100 p-6 dark:border-ink-700 sm:p-8 lg:mt-20 lg:flex-row lg:items-center lg:justify-between lg:gap-12 lg:p-10">
            <div>
              <p className="t-h3 text-fg-strong">{t("blog_idx.cta_title")}</p>
              <p className="t-small mt-2 max-w-[620px] text-ink-700 dark:text-ink-200">{t("blog_idx.cta_desc")}</p>
            </div>
            <a
              href={mailto}
              className="t-small group inline-flex shrink-0 items-center gap-3 self-start font-semibold text-fg-strong underline decoration-ink-200 underline-offset-[6px] transition-colors hover:text-brand hover:decoration-brand lg:self-auto"
            >
              {c.notifyLink}
              <Icon d={ICONS.arrowRight} size={18} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" />
            </a>
          </div>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
