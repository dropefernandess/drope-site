import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { getProjeto, projetos, categorias } from "@/content/projetos";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projeto = getProjeto(slug);
  if (!projeto) return {};

  return {
    title: projeto.title,
    description: projeto.description,
    openGraph: {
      title: `${projeto.title} — Dropê`,
      description: projeto.description,
      images: [projeto.image],
    },
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const projeto = getProjeto(slug);

  if (!projeto) notFound();

  const cats = projeto.categorias
    .map((c) => categorias.find((x) => x.slug === c)?.label)
    .filter(Boolean)
    .join(" · ");

  // Próximo e anterior (loop)
  const idx = projetos.findIndex((p) => p.slug === projeto.slug);
  const prev = projetos[(idx - 1 + projetos.length) % projetos.length];
  const next = projetos[(idx + 1) % projetos.length];

  return (
    <article className="pt-[140px]">
      {/* Hero do case */}
      <section className="section-padding-tight">
        <Container className="flex flex-col gap-8">
          <Link href="/#projetos" className="text-body hover:text-fg-strong">
            ← Voltar pra projetos
          </Link>
          <header className="flex flex-col gap-4 max-w-prose">
            <p className="label-mono">
              {cats}
              {projeto.year ? ` · ${projeto.year}` : ""}
            </p>
            <h1 className="text-display">{projeto.title}</h1>
            <p className="text-lead">{projeto.description}</p>
          </header>
        </Container>
      </section>

      {/* Hero image */}
      <section className="px-6 md:px-16">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-container overflow-hidden rounded-section bg-surface">
          <Image
            src={projeto.image}
            alt={projeto.title}
            fill
            priority
            className="object-cover"
            sizes="(min-width: 1400px) 1400px, 100vw"
          />
        </div>
      </section>

      {/* Body — content do case (substituir pelo MDX real) */}
      <section className="section-padding">
        <Container className="flex flex-col gap-8 max-w-prose">
          <h2 className="text-h-2">O desafio</h2>
          <p className="text-body">
            {/* TODO: trocar pelo conteúdo real do case. Idealmente carregar
                de MDX em content/projetos/{slug}.mdx */}
            Espaço pro brief: contexto do cliente, mercado, problema
            estratégico que motivou o projeto.
          </p>

          <h2 className="text-h-2">A solução</h2>
          <p className="text-body">
            Como o projeto resolveu o problema. Direção visual, decisões de
            design, tradeoffs.
          </p>

          <h2 className="text-h-2">Resultado</h2>
          <p className="text-body">
            Métricas, prêmios, feedback do cliente, impacto no negócio.
          </p>
        </Container>
      </section>

      {/* Próximo/anterior */}
      <section className="border-t border-line section-padding-tight">
        <Container className="flex items-center justify-between gap-6">
          <Link
            href={`/projetos/${prev.slug}`}
            className="flex flex-col gap-1 hover:text-fg-strong"
          >
            <span className="label-mono">← Anterior</span>
            <span className="text-h-3">{prev.title}</span>
          </Link>
          <Link
            href={`/projetos/${next.slug}`}
            className="flex flex-col gap-1 text-right hover:text-fg-strong"
          >
            <span className="label-mono">Próximo →</span>
            <span className="text-h-3">{next.title}</span>
          </Link>
        </Container>
      </section>

      {/* CTA inline */}
      <section className="bg-bg-soft section-padding">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2 className="text-h-1">Gostou desse projeto?</h2>
          <p className="text-lead max-w-[420px]">
            Manda um oi e vamos trocar uma ideia sobre o seu.
          </p>
          <Button href="mailto:contato@dropefernandes.com">
            Começar projeto →
          </Button>
        </Container>
      </section>
    </article>
  );
}
