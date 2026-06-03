"use client";

import { useState } from "react";
import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { cn } from "@/lib/utils";

/**
 * Depoimentos — 4 cards estáticos com foto/nome/cargo/empresa.
 *
 * Substitui o antigo marquee de 8 quotes (anti-leitura). Cada card tem:
 *  - Avatar (foto OU iniciais como fallback elegante)
 *  - Quote curta (max ~30 palavras)
 *  - Identificação completa: nome, cargo, empresa, rating
 *
 * Tons alternados pra criar ritmo: brand → cream → dark → soft.
 * Foto vai em /public/depoimentos/{slug}.jpg — fallback automático
 * pra iniciais sobre bg vermelho caso ainda não tenha foto subida.
 */

type Tone = "brand" | "cream" | "dark" | "soft";

type Testimonial = {
  slug: string;          // pra /public/depoimentos/{slug}.jpg
  quote: string;
  name: string;
  role: string;
  company: string;
  rating: number;
  tone: Tone;
};

const testimonials: Testimonial[] = [
  {
    slug: "isabela-silveira",
    quote:
      "Drope entrega o que combinou — e ainda traz uma opinião sobre por que aquilo é o melhor caminho. Direção, não só execução.",
    name: "Isabela Silveira",
    role: "Sócia & Diretora",
    company: "Aroeira Studio",
    rating: 5,
    tone: "brand",
  },
  {
    slug: "marcelo-lavinas",
    quote:
      "Pegou identidade, UI e ainda nos guiou na arquitetura do produto. Achei que ia precisar de três fornecedores — precisei de um.",
    name: "Marcelo Lavinas",
    role: "Founder",
    company: "MoneyFy",
    rating: 5,
    tone: "cream",
  },
  {
    slug: "rafael-andrade",
    quote:
      "Conheço o Drope desde o início. Cada projeto que passa por ele volta com uma camada a mais que eu não tinha pedido — e que faz diferença.",
    name: "Rafael Andrade",
    role: "CEO",
    company: "Sirius Agência",
    rating: 5,
    tone: "dark",
  },
  {
    slug: "poliana-carolina",
    quote:
      "Site, social e papelaria conduzidos com a mesma direção. Sem ruído, sem retrabalho. Profissional fora da curva pro nosso segmento.",
    name: "Poliana Carolina",
    role: "Sócia",
    company: "Vizir Contabilidade",
    rating: 5,
    tone: "soft",
  },
];

const tones: Record<Tone, { bg: string; fg: string; muted: string; border: string; avatarBg: string }> = {
  brand:  { bg: "bg-brand",      fg: "text-brand-fg",  muted: "text-brand-fg/75", border: "border-brand-fg/15", avatarBg: "bg-brand-fg/15 text-brand-fg" },
  cream:  { bg: "bg-ink-50",     fg: "text-ink-900",   muted: "text-ink-700",     border: "border-ink-900/10", avatarBg: "bg-brand text-brand-fg" },
  dark:   { bg: "bg-fg-strong",  fg: "text-bg",        muted: "text-bg/70",       border: "border-bg/15",      avatarBg: "bg-brand text-brand-fg" },
  soft:   { bg: "bg-bg-soft",    fg: "text-fg-strong", muted: "text-fg-mute",     border: "border-line",       avatarBg: "bg-brand text-brand-fg" },
};

const stats = [
  { v: "30+", l: "Projetos completos\nentregues desde 2018" },
  { v: "4.9", l: "Avaliação média\nem 32 reviews" },
  { v: "82%", l: "Voltam pra um\nsegundo round" },
];

/** Avatar — tenta carregar foto, fallback elegante pra iniciais se não existir.
 *  Usa <img> nativo (não next/image) pra não exigir file no build. Performance
 *  irrelevante em avatar 48px. Quando subir as fotos em /public/depoimentos/{slug}.jpg
 *  o componente carrega automaticamente. */
function Avatar({ t, toneStyle }: { t: Testimonial; toneStyle: typeof tones[Tone] }) {
  const [errored, setErrored] = useState(false);
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  if (errored) {
    return (
      <div className={cn("size-12 rounded-full flex items-center justify-center text-sm font-semibold shrink-0", toneStyle.avatarBg)}>
        {initials}
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={`/depoimentos/${t.slug}.jpg`}
      alt={t.name}
      width={48}
      height={48}
      loading="lazy"
      onError={() => setErrored(true)}
      className="size-12 rounded-full object-cover shrink-0 bg-surface"
    />
  );
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const st = tones[t.tone];
  return (
    <article className={cn(
      "h-full rounded-section p-6 md:p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      st.bg, st.fg
    )}>
      <Quote className={cn("size-7", st.muted)} strokeWidth={1.5} fill="currentColor" />

      <p className={cn("text-base md:text-lg leading-snug flex-1", st.fg)}>
        {t.quote}
      </p>

      <div className={cn("flex items-center gap-3 pt-4 border-t", st.border)}>
        <Avatar t={t} toneStyle={st} />
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <p className={cn("text-sm font-semibold truncate", st.fg)}>{t.name}</p>
          <p className={cn("text-[11px] truncate", st.muted)}>
            {t.role} · {t.company}
          </p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star key={j} className={cn("size-3.5", st.fg)} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-bg section-padding overflow-hidden">
      <Container className="flex flex-col gap-12">

        {/* HEADER + STATS */}
        <Reveal>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">05</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>O que dizem por aí</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                Os clientes contam melhor que eu.
              </h2>
            </div>
            <div className="lg:col-span-5 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.v} className="flex flex-col gap-1.5">
                  <p className="text-3xl md:text-4xl font-semibold tabular-nums text-fg-strong tracking-tight">
                    {s.v}
                  </p>
                  <p className="text-[11px] leading-snug whitespace-pre-line text-fg-mute">
                    {s.l}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* GRID DE 4 DEPOIMENTOS */}
        <Stagger as="ul" className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((t) => (
            <StaggerItem as="li" key={t.slug}>
              <TestimonialCard t={t} />
            </StaggerItem>
          ))}
        </Stagger>

      </Container>
    </section>
  );
}
