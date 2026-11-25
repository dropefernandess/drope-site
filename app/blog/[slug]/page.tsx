import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { PostTOC } from "@/components/blog/PostTOC";
import { PostHeader } from "@/components/rb/blog/PostHeader";
import { PostBody } from "@/components/rb/blog/PostBody";
import { PostEnd } from "@/components/rb/blog/PostEnd";
import { POST_GRID } from "@/components/rb/blog/copy";
import { FinalCTA } from "@/components/rb/FinalCTA";
import { getPost, posts } from "@/content/posts";
import { SITE } from "@/lib/config";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.titulo} · Blog`,
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

/**
 * Post do blog — rebrand 2026. Cabeçalho, sumário lateral fixo no desktop
 * (recolhível no celular), corpo com medida de leitura de ~680px, autor,
 * próximo texto e a chamada final. /en/blog/[slug] re-exporta este arquivo:
 * a interface troca de idioma, o texto do post continua em português.
 */
export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // Só o necessário vai para os componentes client (o corpo renderiza no servidor).
  const { blocos: _corpo, ...meta } = post;
  const headings = post.blocos.filter((b) => b.tipo === "h2" || b.tipo === "h3");

  const idx = posts.findIndex((p) => p.slug === post.slug);
  const nextPost = posts[(idx + 1) % posts.length];
  const next = {
    slug: nextPost.slug,
    titulo: nextPost.titulo,
    excerpt: nextPost.excerpt,
    categoria: nextPost.categoria,
    data: nextPost.data,
    leitura: nextPost.leitura,
  };

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

      <article className="bg-bg">
        <PostHeader post={meta} />

        <div className="rb-container mt-12 lg:mt-24">
          <div className={POST_GRID}>
            <aside>
              <PostTOC blocos={headings} />
            </aside>
            <div className="min-w-0">
              <PostBody blocos={post.blocos} />
            </div>
          </div>
        </div>

        <PostEnd next={next} />
      </article>

      <FinalCTA />
    </>
  );
}
