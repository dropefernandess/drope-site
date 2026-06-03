"use client";

import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";
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
  quoteKey: DictionaryKey;
  name: string;          // nomes ficam universais
  roleKey: DictionaryKey;
  company: string;       // marcas universais
  rating: number;
  tone: Tone;
};

const testimonials: Testimonial[] = [
  {
    slug: "isabela-silveira",
    quoteKey: "depoimentos.q1",
    name: "Isabela Silveira",
    roleKey: "depoimentos.q1_role",
    company: "Aroeira Studio",
    rating: 5,
    tone: "brand",
  },
  {
    slug: "marcelo-lavinas",
    quoteKey: "depoimentos.q2",
    name: "Marcelo Lavinas",
    roleKey: "depoimentos.q2_role",
    company: "MoneyFy",
    rating: 5,
    tone: "cream",
  },
  {
    slug: "rafael-andrade",
    quoteKey: "depoimentos.q3",
    name: "Rafael Andrade",
    roleKey: "depoimentos.q3_role",
    company: "Sirius Agência",
    rating: 5,
    tone: "dark",
  },
  {
    slug: "poliana-carolina",
    quoteKey: "depoimentos.q4",
    name: "Poliana Carolina",
    roleKey: "depoimentos.q4_role",
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

const stats: { vKey: DictionaryKey; lKey: DictionaryKey }[] = [
  { vKey: "depoimentos.stat1_v", lKey: "depoimentos.stat1_l" },
  { vKey: "depoimentos.stat2_v", lKey: "depoimentos.stat2_l" },
  { vKey: "depoimentos.stat3_v", lKey: "depoimentos.stat3_l" },
];

/** Avatar — iniciais sobre cor da marca. Versão pré-fotos.
 *  Quando o Drope subir as fotos em /public/depoimentos/{slug}.jpg, basta
 *  reverter pra versão com <img> + onError fallback (commit ad2d1d0). */
function Avatar({ t, toneStyle }: { t: Testimonial; toneStyle: typeof tones[Tone] }) {
  const initials = t.name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <div className={cn("size-12 rounded-full flex items-center justify-center text-sm font-semibold shrink-0", toneStyle.avatarBg)}>
      {initials}
    </div>
  );
}

function TestimonialCard({ data }: { data: Testimonial }) {
  const { t } = useLocale();
  const st = tones[data.tone];
  return (
    <article className={cn(
      "h-full rounded-section p-6 md:p-7 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
      st.bg, st.fg
    )}>
      <Quote className={cn("size-7", st.muted)} strokeWidth={1.5} fill="currentColor" />

      <p className={cn("text-base md:text-lg leading-snug flex-1", st.fg)}>
        {t(data.quoteKey)}
      </p>

      <div className={cn("flex items-center gap-3 pt-4 border-t", st.border)}>
        <Avatar t={data} toneStyle={st} />
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <p className={cn("text-sm font-semibold truncate", st.fg)}>{data.name}</p>
          <p className={cn("text-[11px] truncate", st.muted)}>
            {t(data.roleKey)} · {data.company}
          </p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: data.rating }).map((_, j) => (
            <Star key={j} className={cn("size-3.5", st.fg)} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function Depoimentos() {
  const { t } = useLocale();
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
                <span>{t("depoimentos.eyebrow")}</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                {t("depoimentos.title")}
              </h2>
            </div>
            <div className="lg:col-span-5 grid grid-cols-3 gap-4">
              {stats.map((s) => (
                <div key={s.vKey} className="flex flex-col gap-1.5">
                  <p className="text-3xl md:text-4xl font-semibold tabular-nums text-fg-strong tracking-tight">
                    {t(s.vKey)}
                  </p>
                  <p className="text-[11px] leading-snug whitespace-pre-line text-fg-mute">
                    {t(s.lKey)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* GRID DE 4 DEPOIMENTOS */}
        <Stagger as="ul" className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {testimonials.map((data) => (
            <StaggerItem as="li" key={data.slug}>
              <TestimonialCard data={data} />
            </StaggerItem>
          ))}
        </Stagger>

      </Container>
    </section>
  );
}
