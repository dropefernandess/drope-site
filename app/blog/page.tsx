"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { posts } from "@/content/posts";

const dateFmt = (s: string) =>
  new Date(s).toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });

export default function BlogPage() {
  return (
    <div className="pt-24 md:pt-28 pb-24">
      <Container as="div" className="flex flex-col gap-16 md:gap-20">

        {/* ===== HERO ===== */}
        <section className="flex flex-col gap-10">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Ensaios · Processo · Técnica
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              Publicado quando faz sentido
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8">
              <h1 className="text-display text-fg-strong text-balance">
                Notas sobre o que aprendo no caminho.
              </h1>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-4">
              <p className="text-body max-w-prose">
                Texto curto, técnico quando precisa, sem floreio.
                Sem calendário editorial. Publico quando tenho algo
                pra dizer que valha 6 minutos do seu dia.
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
                    <p className="label-mono text-fg-strong">Ler texto completo</p>
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
              PRA RECEBER OS PRÓXIMOS
            </p>
            <h2 className="text-h-1 text-bg text-balance">
              Quer ser avisado quando sair texto novo?
            </h2>
            <p className="text-body text-bg/75 max-w-prose">
              Sem newsletter automática. É um e-mail meu pra você,
              quando o texto valer a pena.
            </p>
          </div>
          <Link
            href="mailto:contato@dropefernandes.com?subject=Avisa%20quando%20sair%20um%20post"
            className="group inline-flex items-center justify-between gap-3 self-end rounded-pill bg-brand px-5 py-4 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
          >
            Conversar
            <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>
        </Reveal>
      </Container>
    </div>
  );
}
