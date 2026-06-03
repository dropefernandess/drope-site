"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { posts } from "@/content/posts";

export default function BlogPage() {
  const { t, locale } = useLocale();
  const dateFmt = (s: string) =>
    new Date(s).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
      day: "2-digit", month: "short", year: "numeric",
    });

  return (
    <div className="pt-24 md:pt-28 pb-24">
      <Container as="div" className="flex flex-col gap-16 md:gap-20">

        {/* ===== HERO ===== */}
        <section className="flex flex-col gap-10">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("blog_idx.eyebrow")}
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              {t("blog_idx.badge")}
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8">
              <h1 className="text-display text-fg-strong text-balance">
                {t("blog_idx.title")}
              </h1>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-4">
              <p className="text-body max-w-prose">
                {t("blog_idx.lead")}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ===== LISTA ===== */}
        <Stagger as="section" className="flex flex-col">
          {posts.map((p, i) => (
            <StaggerItem
              as="article"
              key={p.slug}
              className={`group ${
                i < posts.length - 1 ? "border-b border-line" : ""
              }`}
            >
              <Link
                href={`/blog/${p.slug}`}
                className="grid gap-6 md:grid-cols-12 md:gap-8 py-10 transition hover:bg-bg-soft -mx-6 px-6 rounded-section"
              >
                <div className="md:col-span-3 flex md:flex-col gap-4 md:gap-2 items-baseline md:items-start">
                  <p className="text-2xl md:text-3xl font-semibold tabular-nums text-brand">
                    N. 0{i + 1}
                  </p>
                  <span className="label-mono">{p.categoria}</span>
                  <span className="label-mono">{dateFmt(p.data)} · {p.leitura}</span>
                </div>

                <div className="md:col-span-9 flex flex-col gap-3">
                  <h2 className="text-h-2 text-fg-strong text-balance group-hover:text-brand transition">
                    {p.titulo}
                  </h2>
                  <p className="text-body max-w-prose">{p.excerpt}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="label-mono text-fg-strong">{t("blog_idx.read_full")}</p>
                    <ArrowUpRight className="size-5 text-fg-mute transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand" strokeWidth={2} />
                  </div>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>

        {/* ===== CTA — newsletter style ===== */}
        <Reveal className="rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-6 md:grid-cols-2 items-center">
          <div className="flex flex-col gap-3">
            <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">
              {t("blog_idx.cta_eyebrow")}
            </p>
            <h2 className="text-h-1 text-bg text-balance">
              {t("blog_idx.cta_title")}
            </h2>
            <p className="text-body text-bg/75 max-w-prose">
              {t("blog_idx.cta_desc")}
            </p>
          </div>
          <Link
            href="mailto:contato@dropefernandes.com?subject=Avisa%20quando%20sair%20um%20post"
            className="group inline-flex items-center justify-between gap-3 self-end rounded-pill bg-brand px-5 py-4 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
          >
            {t("cta.conversar")}
            <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>
        </Reveal>
      </Container>
    </div>
  );
}
