"use client";

import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * Servicos — bento clean. Apenas Branding em vermelho protagonista;
 * resto na escala neutra (bg-soft, surface, ink-700). ASCII pattern
 * decorativo em alguns cards.
 */
const ascii = `· · · · · · · · · · · · · · · · ·
* * * * * * * * * * * * * * * * *
· · · · · · · · · · · · · · · · ·
+ + + + + + + + + + + + + + + + +
· · · · · · · · · · · · · · · · ·`;

const servicos = [
  {
    num: "01",
    title: "Branding",
    desc: "Marcas que respiram propósito. Da estratégia ao manual final.",
    bullets: ["Naming", "Identidade", "Brand book", "Aplicações"],
    variant: "brand",  // vermelho protagonista
    span: "md:col-span-8 md:row-span-2",
    big: true,
  },
  {
    num: "02",
    title: "UI/UX",
    desc: "Interfaces funcionais, alinhadas ao usuário real.",
    bullets: ["Wireframes", "Protótipo", "Design final"],
    variant: "soft",
    span: "md:col-span-4",
  },
  {
    num: "03",
    title: "Web",
    desc: "Sites institucionais, landings e portfólios.",
    bullets: ["Landing", "Institucional", "Portfólio"],
    variant: "surface",
    span: "md:col-span-4",
  },
  {
    num: "04",
    title: "Motion",
    desc: "Animações que dão vida à identidade. De logo reveal a launch reels.",
    bullets: ["Logo reveal", "Reels", "Apresentações", "Microinterações"],
    variant: "dark",
    span: "md:col-span-6",
  },
  {
    num: "05",
    title: "Gráfico",
    desc: "Materiais de apoio, social e print. Da arte ao arquivo final pra gráfica.",
    bullets: ["Social media", "Editorial", "Print", "Apresentações"],
    variant: "soft",
    span: "md:col-span-6",
  },
];

const variantStyles: Record<string, { bg: string; fg: string; muted: string; chip: string }> = {
  brand: {
    bg: "bg-brand",
    fg: "text-brand-fg",
    muted: "text-brand-fg/70",
    chip: "border-brand-fg/25 text-brand-fg/85",
  },
  soft: {
    bg: "bg-bg-soft",
    fg: "text-fg-strong",
    muted: "text-fg-mute",
    chip: "border-line text-fg-mute",
  },
  surface: {
    bg: "bg-surface",
    fg: "text-fg-strong",
    muted: "text-fg-mute",
    chip: "border-line text-fg-mute",
  },
  dark: {
    bg: "bg-fg-strong",
    fg: "text-bg",
    muted: "text-bg/70",
    chip: "border-bg/25 text-bg/85",
  },
};

export function Servicos() {
  return (
    <section id="servicos" className="bg-bg section-padding">
      <Container className="flex flex-col gap-12">
        {/* HEADER + CTA destacado à direita */}
        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">02</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>O que entrego</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                Cinco frentes. Uma cabeça só do briefing ao último pixel.
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4 items-start">
              <p className="text-body max-w-prose">
                Conduzo cada etapa pessoalmente. Quando o projeto pede,
                conto com parceiros de confiança em frentes específicas,
                sempre com transparência total.
              </p>
              <Link
                href="/proposta"
                className="group inline-flex items-center gap-2 rounded-pill bg-fg-strong px-5 py-3 text-sm font-semibold text-bg hover:opacity-90 transition"
              >
                Ver método e investimento
                <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Reveal>

        {/* BENTO */}
        <Stagger as="ul" className="grid gap-3 md:grid-cols-12 md:auto-rows-[minmax(220px,auto)]">
          {servicos.map((s) => {
            const st = variantStyles[s.variant];
            return (
              <StaggerItem
                as="li"
                key={s.num}
                className={`${s.span} group relative overflow-hidden rounded-section ${st.bg} p-7 md:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* ASCII pattern decorativo no Branding gigante */}
                {s.big && (
                  <pre
                    aria-hidden
                    className={`absolute top-3 right-4 text-[10px] leading-[1.1] ${st.muted} opacity-30 select-none pointer-events-none font-mono`}
                  >
                    {ascii}
                  </pre>
                )}

                {/* Top: num + arrow */}
                <div className="flex items-start justify-between relative">
                  <span className={`text-sm font-medium ${st.muted}`}>
                    {s.num} ── Serviço
                  </span>
                  <ArrowUpRight
                    className={`size-5 ${st.fg} opacity-50 transition group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5`}
                    strokeWidth={2}
                  />
                </div>

                {/* Bottom: title + desc + chips */}
                <div className="flex flex-col gap-3 relative">
                  <h3 className={`font-semibold tracking-tight leading-[1.05] ${st.fg} ${
                    s.big ? "text-[clamp(2rem,3.5vw,3rem)]" : "text-[clamp(1.5rem,2vw,1.875rem)]"
                  }`}>
                    {s.title}
                  </h3>
                  <p className={`text-sm leading-relaxed ${st.muted} max-w-prose`}>
                    {s.desc}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {s.bullets.map((b) => (
                      <span
                        key={b}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${st.chip}`}
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

      </Container>
    </section>
  );
}
