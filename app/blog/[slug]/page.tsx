import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { PostTOC } from "@/components/blog/PostTOC";
import { getPost, posts, type Bloco } from "@/content/posts";
import { SITE } from "@/lib/config";
import { slugify } from "@/lib/slugify";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.titulo} — Blog Drope`,
    description: post.subtitulo,
    openGraph: {
      title: post.titulo,
      description: post.subtitulo,
      type: "article",
      publishedTime: post.data,
      authors: ["Pedro Fernandes"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.titulo,
      description: post.subtitulo,
    },
  };
}

const dateFmt = (s: string) =>
  new Date(s).toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });

/**
 * Renderiza um bloco. Suporta markdown leve: __negrito__ vira <strong>.
 * Headings (h2/h3) ganham id slug pra ancorar via TOC.
 */
function RenderBloco({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case "h2":
      return (
        <h2 id={slugify(bloco.texto)} className="text-h-2 text-fg-strong mt-12 mb-4 text-balance scroll-mt-28">
          {bloco.texto}
        </h2>
      );
    case "h3":
      return (
        <h3 id={slugify(bloco.texto)} className="text-h-3 text-fg-strong mt-8 mb-3 scroll-mt-28">
          {bloco.texto}
        </h3>
      );
    case "p":
      return (
        <p className="text-body text-fg-strong leading-relaxed mb-5 text-[17px]">
          <Inline text={bloco.texto} />
        </p>
      );
    case "quote":
      return (
        <blockquote className="my-10 border-l-4 border-brand pl-6 py-2">
          <p className="text-lg md:text-xl text-fg-strong italic leading-snug">
            {bloco.texto}
          </p>
          {bloco.autor && (
            <p className="label-mono mt-3">— {bloco.autor}</p>
          )}
        </blockquote>
      );
    case "hr":
      return <hr className="my-12 border-line" />;
    case "ul":
      return (
        <ul className="flex flex-col gap-3 my-5 list-none">
          {bloco.itens.map((item, i) => (
            <li key={i} className="text-body text-fg-strong leading-relaxed flex gap-3 text-[17px]">
              <span className="text-brand shrink-0 mt-1">•</span>
              <span><Inline text={item} /></span>
            </li>
          ))}
        </ul>
      );
  }
}

/** Substitui __texto__ por <strong>texto</strong> de forma segura.
 *  Negrito mais forte (700) pra ganhar contraste no body de 17px. */
function Inline({ text }: { text: string }) {
  const parts = text.split(/(__[^_]+__)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("__") && part.endsWith("__")) {
          return <strong key={i} className="font-bold text-fg-strong">{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const idx = posts.findIndex((p) => p.slug === post.slug);
  const next = posts[(idx + 1) % posts.length];

  // JSON-LD Article schema pra Google rich snippets
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.subtitulo,
    datePublished: post.data,
    dateModified: post.data,
    author: {
      "@type": "Person",
      name: "Pedro Fernandes",
      alternateName: "Drope",
      url: SITE.url,
    },
    publisher: {
      "@type": "Person",
      name: "Pedro Fernandes",
      url: SITE.url,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE.url}/blog/${post.slug}`,
    },
    articleSection: post.categoria,
    inLanguage: "pt-BR",
    keywords: post.categoria,
  };

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.titulo },
    ],
  };

  return (
    <>
      {/* JSON-LD Article — pra rich snippet do Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <article className="pt-24 md:pt-28">

        {/* ===== HEADER ===== */}
        <Container as="section" className="flex flex-col gap-8">
          <Reveal>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm font-medium text-fg-mute hover:text-fg-strong transition"
            >
              <ArrowLeft className="size-3.5" strokeWidth={2.5} />
              Voltar pra todos os textos
            </Link>
          </Reveal>

          <Reveal delay={0.05} className="flex flex-col gap-6 max-w-3xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="label-mono flex items-center gap-2">
                <span className="size-1 rounded-full bg-brand" />
                {post.categoria}
              </span>
              <span className="label-mono">{dateFmt(post.data)}</span>
              <span className="label-mono">{post.leitura} de leitura</span>
            </div>
            <h1 className="text-display text-fg-strong text-balance">
              {post.titulo}
            </h1>
            <p className="text-lead text-fg-mute max-w-prose">
              {post.subtitulo}
            </p>
          </Reveal>
        </Container>

        {/* ===== BODY com TOC sticky lateral (desktop) ===== */}
        <Container as="section" className="mt-16 md:mt-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            {/* TOC sticky — col 3 em lg+, oculto em mobile */}
            <aside className="lg:col-span-3">
              <PostTOC blocos={post.blocos} />
            </aside>

            {/* Corpo do texto */}
            <Reveal className="lg:col-span-9 max-w-[680px]">
              {post.blocos.map((bloco, i) => (
                <RenderBloco key={i} bloco={bloco} />
              ))}
            </Reveal>
          </div>
        </Container>

        {/* ===== FOOTER POST ===== */}
        <Container as="section" className="mt-24 md:mt-32 pb-16">
          <Reveal>
            <div className="rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-8 md:grid-cols-12 items-center">
              <div className="md:col-span-7 flex flex-col gap-3">
                <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">
                  CURTIU O TEXTO?
                </p>
                <h2 className="text-h-1 text-bg text-balance">
                  Quer aplicar isso no seu projeto?
                </h2>
                <p className="text-body text-bg/75 max-w-prose">
                  Agenda uma conversa de 30 minutos. Sem custo,
                  sem compromisso.
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
                  href={`/blog/${next.slug}`}
                  className="inline-flex items-center justify-between gap-3 rounded-pill border border-bg/20 bg-bg/5 px-5 py-4 text-sm font-semibold text-bg hover:bg-bg/15 transition"
                >
                  Próximo texto: {next.titulo.slice(0, 26)}…
                  <ArrowUpRight className="size-4" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </Reveal>
        </Container>
      </article>
    </>
  );
}
