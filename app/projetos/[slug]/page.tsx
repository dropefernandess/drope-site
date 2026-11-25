import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjeto, projetos, categorias } from "@/content/projetos";
import { rbProject } from "@/content/rb/projects";
import { CaseView } from "@/components/rb/projetos/CaseView";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

const nameOf = (slug: string, fallback: string) => rbProject(slug)?.name ?? fallback.split(" — ")[0];
const clean = (s: string) => s.replace(/\s+—\s+/g, ", ");

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projeto = getProjeto(slug);
  if (!projeto) return {};
  const name = nameOf(slug, projeto.title);
  const desc = clean(projeto.case.subtitle);
  const img = rbProject(slug)?.cover ?? projeto.case.hero.src;
  return {
    title: name,
    description: desc,
    openGraph: { title: `${name} · Drope Fernandes`, description: desc, images: [img] },
  };
}

/**
 * Página de projeto — rebrand 2026 (Figma: "Projeto · GO Trace").
 * O layout vive em components/rb/projetos/CaseView.tsx; aqui ficam os
 * parâmetros estáticos, a metadata e o JSON-LD (CreativeWork + Breadcrumb).
 */
export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const projeto = getProjeto(slug);
  if (!projeto) notFound();
  const c = projeto.case;
  const name = nameOf(slug, projeto.title);
  const cats = projeto.categorias.map((cat) => categorias.find((x) => x.slug === cat)?.label).filter(Boolean).join(" · ");
  const SITE = "https://www.dropefernandes.com";
  const creativeWorkSchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name,
    description: clean(c.subtitle),
    image: c.gallery.slice(0, 3).map((g) => `${SITE}${g.src}`),
    creator: { "@type": "Person", name: "Pedro Fernandes", alternateName: "Drope", url: SITE },
    datePublished: projeto.year ? `${projeto.year}-01-01` : undefined,
    genre: cats,
    keywords: c.tags.join(", "),
    inLanguage: "pt-BR",
    isPartOf: { "@type": "CollectionPage", name: "Portfólio Drope Fernandes", url: `${SITE}/projetos` },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE}/projetos/${projeto.slug}` },
    ...(c.meta.link && { url: c.meta.link, sameAs: [c.meta.link] }),
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Trabalhos", item: `${SITE}/projetos` },
      { "@type": "ListItem", position: 3, name },
    ],
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <CaseView projeto={projeto} />
    </>
  );
}
