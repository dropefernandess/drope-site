import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight, ArrowLeft, ExternalLink } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { CaseImage } from "@/components/projetos/CaseImage";
import { VideoPlaceholder } from "@/components/projetos/VideoPlaceholder";
import { getProjeto, projetos, categorias } from "@/content/projetos";

/** Cases UI/UX e Web ganham vídeo (ou placeholder) antes do hero image. */
const VIDEO_CATEGORIES = ["ui-ux-design", "web-design"] as const;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return projetos.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const projeto = getProjeto(slug);
  if (!projeto) return {};

  return {
    title: `${projeto.title} — Drope`,
    description: projeto.case.subtitle,
    openGraph: {
      title: `${projeto.title} — Drope`,
      description: projeto.case.subtitle,
      images: [projeto.case.hero.src],
    },
  };
}

/**
 * Página de case study — refatorado pra estilo Wegrow.
 *
 * Nova ORDEM:
 *  1. Back link (compacto no topo)
 *  2. HERO MEDIA grande (full bleed) — vídeo ou imagem ANTES da descrição
 *  3. Header (título + subtítulo + tags + meta lateral)
 *  4. Stats (3 números)
 *  5. Sections intercaladas (eyebrow + title + body + imagem grande por section)
 *  6. Gallery final (6 imgs 16:9 grid 3 cols)
 *  7. CTA inline
 *  8. Next/prev
 */
const aspectClasses: Record<NonNullable<NonNullable<typeof projetos[number]["case"]["gallery"][number]["aspect"]>>, string> = {
  square: "aspect-square",
  portrait: "aspect-[4/5]",
  video: "aspect-video",
  wide: "aspect-[16/9]",
};

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const projeto = getProjeto(slug);
  if (!projeto) notFound();

  const c = projeto.case;
  const cats = projeto.categorias
    .map((cat) => categorias.find((x) => x.slug === cat)?.label)
    .filter(Boolean)
    .join(" · ");

  const idx = projetos.findIndex((p) => p.slug === projeto.slug);
  const prev = projetos[(idx - 1 + projetos.length) % projetos.length];
  const next = projetos[(idx + 1) % projetos.length];

  const hasVideo = projeto.categorias.some(
    (cat) => VIDEO_CATEGORIES.includes(cat as (typeof VIDEO_CATEGORIES)[number])
  );

  return (
    <article className="pt-24 md:pt-28">

      {/* ===== 1. BACK LINK compacto ===== */}
      <Container as="section" className="mb-10 md:mb-14">
        <Reveal direction="right">
          <Link
            href="/#projetos"
            className="inline-flex items-center gap-2 text-sm font-medium text-fg-mute hover:text-fg-strong transition group"
          >
            <ArrowLeft className="size-3.5 transition group-hover:-translate-x-1" strokeWidth={2.5} />
            Voltar pra todos os projetos
          </Link>
        </Reveal>
      </Container>

      {/* ===== 2. HERO MEDIA grande — vai ANTES da descrição (estilo Wegrow) ===== */}
      <Reveal direction="up" delay={0.05} className="px-6 md:px-12">
        <div className="relative mx-auto aspect-[16/9] w-full max-w-container overflow-hidden rounded-section bg-surface">
          {hasVideo ? (
            <VideoPlaceholder slug={projeto.slug} alt={c.hero.alt} poster={c.hero.src} />
          ) : (
            <Image
              src={c.hero.src}
              alt={c.hero.alt}
              fill
              priority
              quality={90}
              sizes="(min-width: 1400px) 1400px, 100vw"
              className="object-cover"
            />
          )}
        </div>
      </Reveal>

      {/* ===== 3. HEADER — Título + subtítulo + meta lateral ===== */}
      <Container as="section" className="mt-20 md:mt-28 flex flex-col gap-10">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Esquerda — título + subtítulo + tags */}
          <Reveal direction="right" className="lg:col-span-8 flex flex-col gap-6">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {cats}
              {projeto.year ? ` · ${projeto.year}` : ""}
            </p>
            <h1 className="text-display text-fg-strong text-balance">
              {projeto.title}
            </h1>
            <p className="text-lead max-w-prose">
              {c.subtitle}
            </p>
            <div className="flex flex-wrap gap-1.5 pt-2">
              {c.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-[11px] font-medium uppercase tracking-wider px-3 py-1.5 rounded-full border border-line bg-bg-soft text-fg-mute"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Reveal>

          {/* Direita — meta box */}
          <Reveal direction="left" delay={0.1} className="lg:col-span-4 rounded-section border border-line bg-bg-soft p-6 md:p-7 flex flex-col gap-4">
            <p className="label-mono">DETALHES DO PROJETO</p>
            <dl className="flex flex-col gap-3">
              <MetaRow label="Cliente"      value={c.meta.cliente} />
              <MetaRow label="Setor"        value={c.meta.setor} />
              <MetaRow label="Papel"        value={c.meta.role} />
              <MetaRow label="Duração"      value={c.meta.duracao} />
              <MetaRow label="Entregáveis"  value={c.meta.entregaveis.join(", ")} />
            </dl>
            {c.meta.link && (
              <Link
                href={c.meta.link}
                target="_blank"
                rel="noopener"
                className="group mt-2 inline-flex items-center justify-between gap-2 rounded-pill bg-fg-strong px-4 py-2.5 text-sm font-semibold text-bg hover:opacity-90 transition"
              >
                Visitar projeto
                <ExternalLink className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
            )}
          </Reveal>
        </div>
      </Container>

      {/* ===== 4. STATS ===== */}
      {c.stats && c.stats.length > 0 && (
        <Container as="section" className="mt-20 md:mt-28">
          <Reveal direction="up">
            <div className="grid gap-3 md:grid-cols-3">
              {c.stats.map((s, i) => (
                <div
                  key={i}
                  className={`rounded-section p-7 md:p-8 flex flex-col gap-3 ${
                    i === 0 ? "bg-brand text-brand-fg" : "border border-line bg-bg-soft"
                  }`}
                >
                  <p className={`text-4xl md:text-5xl font-semibold tabular-nums tracking-tight leading-none ${i === 0 ? "text-brand-fg" : "text-fg-strong"}`}>
                    {s.value}
                  </p>
                  <p className={`text-sm leading-snug ${i === 0 ? "text-brand-fg/85" : "text-fg-mute"}`}>
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      )}

      {/* ===== 5. SECTIONS — alternando texto e imagens GRANDES (Wegrow style) =====
            Cada section: header pequeno + body + imagem full-width grande abaixo.
            Direções de Reveal alternam pra ritmo visual. */}
      <Container as="section" className="mt-24 md:mt-32 flex flex-col gap-24 md:gap-32">
        {c.sections.map((section, i) => (
          <div key={i} className="flex flex-col gap-10 md:gap-12">
            {/* Header + body */}
            <Reveal direction={i % 2 === 0 ? "right" : "left"} delay={0.05}>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
                <div className="lg:col-span-4 flex flex-col gap-3">
                  {section.eyebrow && (
                    <p className="label-mono">
                      <span className="text-fg-strong">{String(i + 1).padStart(2, "0")}</span>
                      <span className="mx-3 text-fg-faint">──</span>
                      <span>{section.eyebrow}</span>
                    </p>
                  )}
                  {section.title && (
                    <h2 className="text-h-2 text-fg-strong text-balance">
                      {section.title}
                    </h2>
                  )}
                </div>
                <div className="lg:col-span-8 flex flex-col gap-6">
                  <p className="text-body max-w-prose whitespace-pre-line">
                    {section.body}
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Imagem da section GRANDE (full width do container) */}
            {section.image && (
              <Reveal direction="up" delay={0.15}>
                <div
                  className={`relative ${
                    section.image.aspect ? aspectClasses[section.image.aspect] : "aspect-[16/10]"
                  } w-full overflow-hidden rounded-section bg-surface`}
                >
                  <CaseImage
                    src={section.image.src}
                    alt={section.image.alt}
                    sizes="(min-width:1400px) 1400px, 100vw"
                  />
                </div>
              </Reveal>
            )}
          </div>
        ))}
      </Container>

      {/* ===== 6. GALLERY FINAL — sequência de imagens (sem buracos) =====
            Layout estilo Wegrow: 2 fileiras de 3 imagens 16:9 iguais ao hero. */}
      {c.gallery.length > 0 && (
        <Container as="section" className="mt-24 md:mt-32">
          <Reveal direction="up" className="flex flex-col gap-6">
            <div className="flex items-baseline justify-between gap-4 mb-2">
              <p className="label-mono">
                <span className="text-fg-strong">{String(c.sections.length + 1).padStart(2, "0")}</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>Mais imagens do projeto</span>
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {c.gallery.slice(0, 6).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-video overflow-hidden rounded-section bg-surface"
                >
                  <CaseImage
                    src={img.src}
                    alt={img.alt}
                    index={i}
                    total={Math.min(c.gallery.length, 6)}
                    sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  />
                </div>
              ))}
            </div>
          </Reveal>
        </Container>
      )}

      {/* ===== 7. CTA INLINE ===== */}
      <Container as="section" className="mt-24 md:mt-32">
        <Reveal direction="up">
          <div className="rounded-section bg-[#101010] dark:bg-[#1A1A1A] text-bg p-8 md:p-12 grid gap-8 md:grid-cols-12 items-center">
            <div className="md:col-span-7 flex flex-col gap-3">
              <p className="text-[11px] uppercase tracking-wider font-medium text-ink-50/60">
                CURTIU O QUE VIU?
              </p>
              <h2 className="text-h-1 text-ink-50 text-balance">
                Vamos conversar sobre o seu projeto.
              </h2>
              <p className="text-body text-ink-50/75 max-w-prose">
                Posso aplicar o mesmo cuidado no que você tem em mente.
                Agenda uma conversa de 30 min ou usa a calculadora pra estimar.
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
                href="/calculadora"
                className="inline-flex items-center justify-between gap-3 rounded-pill border border-ink-50/20 bg-ink-50/5 px-5 py-4 text-sm font-semibold text-ink-50 hover:bg-ink-50/15 transition"
              >
                Estimar projeto
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>

      {/* ===== 8. NEXT / PREV ===== */}
      <Container as="section" className="mt-20 md:mt-28 pb-20 grid gap-3 md:grid-cols-2">
        <Reveal direction="right">
          <Link
            href={`/projetos/${prev.slug}`}
            className="group rounded-section border border-line bg-bg-soft p-6 md:p-7 flex items-center gap-4 hover:border-fg-strong transition h-full"
          >
            <ArrowLeft className="size-5 text-fg-mute group-hover:text-fg-strong group-hover:-translate-x-1 transition" strokeWidth={2.5} />
            <div className="flex flex-col gap-1 min-w-0">
              <p className="label-mono">PROJETO ANTERIOR</p>
              <p className="text-h-3 text-fg-strong truncate">{prev.title}</p>
            </div>
          </Link>
        </Reveal>
        <Reveal direction="left" delay={0.05}>
          <Link
            href={`/projetos/${next.slug}`}
            className="group rounded-section border border-line bg-bg-soft p-6 md:p-7 flex items-center gap-4 hover:border-fg-strong transition h-full"
          >
            <div className="flex flex-col gap-1 min-w-0 ml-auto text-right">
              <p className="label-mono">PRÓXIMO PROJETO</p>
              <p className="text-h-3 text-fg-strong truncate">{next.title}</p>
            </div>
            <ArrowUpRight className="size-5 text-fg-mute group-hover:text-fg-strong group-hover:translate-x-1 group-hover:-translate-y-1 transition" strokeWidth={2.5} />
          </Link>
        </Reveal>
      </Container>
    </article>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 border-b border-line pb-2 last:border-0 last:pb-0">
      <dt className="text-[10px] uppercase tracking-wider font-medium text-fg-mute">{label}</dt>
      <dd className="text-sm font-medium text-fg-strong leading-snug">{value}</dd>
    </div>
  );
}
