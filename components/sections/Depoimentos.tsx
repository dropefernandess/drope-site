"use client";

import { Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";

/**
 * Depoimentos — duas trilhas marquee infinito em direções opostas.
 * Cards CHUCKLE-style com cores pastéis variadas, quote icon, rating.
 * Stats grandes alinhados no header.
 */

type Tone = "cream" | "dark" | "brand" | "soft" | "sky";

// Tons alternados pra evitar repetição adjacente. Ordem: brand → cream →
// dark → soft → sky → brand → cream → dark.
const testimonials: { quote: string; name: string; role: string; company: string; rating: number; tone: Tone }[] = [
  {
    quote: "O Drope entregou muito além do que pedi. Trouxe direção, opinião e um olhar de marca que faltava no projeto desde o início.",
    name: "Lara M.",
    role: "Founder",
    company: "Bada Bing · Dubai",
    rating: 5,
    tone: "brand",
  },
  {
    quote: "Processo direto, sem ruído. Sem briefing burocrático. Recebi exatamente o que combinamos. E melhor.",
    name: "Iago Sá",
    role: "CMO",
    company: "Use Dualí",
    rating: 5,
    tone: "cream",
  },
  {
    quote: "Identidade, site e motion na mesma cabeça mudou nosso ritmo. Sem ping-pong entre fornecedores.",
    name: "Renata C.",
    role: "Head of Design",
    company: "GO Trace",
    rating: 5,
    tone: "dark",
  },
  {
    quote: "Trabalhei com agências grandes antes. O Drope sozinho entregou em 4 semanas o que duas levaram 3 meses.",
    name: "Marcos A.",
    role: "Diretor",
    company: "MoneyFy",
    rating: 5,
    tone: "soft",
  },
  {
    quote: "Recomendaria pra qualquer fundador que queira parceiro, não só executor. Briefing virou conversa que muda a marca.",
    name: "Carolina B.",
    role: "Founder",
    company: "Sirius Agência",
    rating: 5,
    tone: "sky",
  },
  {
    quote: "Tipografia, copy, motion, código. Pega tudo. E parece que faz uma coisa só, porque é o mesmo cérebro do começo ao fim.",
    name: "Felipe T.",
    role: "Sócio",
    company: "Gisto & Xavier",
    rating: 5,
    tone: "brand",
  },
  {
    quote: "A escuta dele faz diferença. Não é briefing, entrega. É conversa, devolução de pergunta, defesa de ideia.",
    name: "Bianca L.",
    role: "Fundadora",
    company: "Kátia Assis Psi",
    rating: 5,
    tone: "cream",
  },
  {
    quote: "Calmo no processo, profundo na entrega. Cara raro. Voltamos pra ele a cada projeto novo.",
    name: "Daniel V.",
    role: "Founder",
    company: "Finanças Já!",
    rating: 5,
    tone: "dark",
  },
];

const tones: Record<Tone, { bg: string; fg: string; muted: string; border: string }> = {
  brand:  { bg: "bg-brand",         fg: "text-brand-fg",   muted: "text-brand-fg/75",  border: "border-brand-fg/15" },
  cream:  { bg: "bg-ink-50",        fg: "text-ink-900",    muted: "text-ink-700",      border: "border-ink-900/10" },
  dark:   { bg: "bg-fg-strong",     fg: "text-bg",         muted: "text-bg/70",        border: "border-bg/15" },
  soft:   { bg: "bg-bg",            fg: "text-fg-strong",  muted: "text-fg-mute",      border: "border-line" },
  sky:    { bg: "bg-[#D7E5F5]",     fg: "text-ink-900",    muted: "text-ink-700",      border: "border-ink-900/10" },
};

const stats = [
  { v: "11", l: "Projetos completos\nentregues em 2024–25" },
  { v: "4.9", l: "Avaliação média\nem 32 reviews" },
  { v: "82%", l: "Voltam pra um\nsegundo round" },
];

function Card({ t }: { t: typeof testimonials[number] }) {
  const st = tones[t.tone];
  return (
    <article className={`${st.bg} shrink-0 w-[340px] md:w-[420px] rounded-section p-6 md:p-7 flex flex-col gap-5 ${st.fg} mr-4 transition-colors hover:brightness-105`}>
      <Quote className={`size-7 ${st.muted}`} strokeWidth={1.5} fill="currentColor" />
      <p className={`text-base md:text-lg leading-snug ${st.fg}`}>{t.quote}</p>
      <div className={`flex items-center justify-between gap-3 mt-auto pt-4 border-t ${st.border}`}>
        <div className="flex flex-col gap-0.5 min-w-0">
          <p className={`text-sm font-semibold ${st.fg} truncate`}>{t.name}</p>
          <p className={`text-[11px] ${st.muted} truncate`}>
            {t.role} · {t.company}
          </p>
        </div>
        <div className="flex items-center gap-0.5 shrink-0">
          {Array.from({ length: t.rating }).map((_, j) => (
            <Star key={j} className={`size-3.5 ${st.fg}`} fill="currentColor" strokeWidth={0} />
          ))}
        </div>
      </div>
    </article>
  );
}

export function Depoimentos() {
  // Duplica array pra loop do marquee
  const rowA = [...testimonials, ...testimonials];
  const rowB = [...testimonials.slice().reverse(), ...testimonials.slice().reverse()];

  return (
    <section id="depoimentos" className="bg-bg section-padding-tight overflow-hidden">
      <Container className="flex flex-col gap-12 mb-12">

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
      </Container>

      {/* MARQUEE ROW A — esquerda → direita */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-64 md:w-80 lg:w-96 bg-gradient-to-r from-bg from-30% via-bg/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-64 md:w-80 lg:w-96 bg-gradient-to-l from-bg from-30% via-bg/60 to-transparent" />
        <div className="marquee-track">
          {rowA.map((t, i) => <Card key={`a-${i}`} t={t} />)}
        </div>
      </div>

      {/* MARQUEE ROW B — direção oposta (reverse) */}
      <div className="relative overflow-hidden mt-4">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-64 md:w-80 lg:w-96 bg-gradient-to-r from-bg from-30% via-bg/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-64 md:w-80 lg:w-96 bg-gradient-to-l from-bg from-30% via-bg/60 to-transparent" />
        <div className="marquee-track" style={{ animationDirection: "reverse", animationDuration: "60s" }}>
          {rowB.map((t, i) => <Card key={`b-${i}`} t={t} />)}
        </div>
      </div>
    </section>
  );
}
