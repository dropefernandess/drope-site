"use client";

import Link from "next/link";
import { ArrowUpRight, Clock, Check, X as XIcon } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * /proposta — clean agency. Sem editorial layer.
 */

const escopo = [
  {
    n: "01",
    t: "Discovery",
    dur: "Semana 01",
    items: [
      "Reunião de imersão (1h, sem PowerPoint)",
      "Análise de referências (suas e da concorrência)",
      "Definição de objetivos e KPIs",
      "Brief consolidado por escrito",
    ],
  },
  {
    n: "02",
    t: "Direção criativa",
    dur: "Semanas 02–03",
    items: [
      "Moodboards e exploração visual",
      "Princípios de design e tom",
      "1 caminho recomendado + 1 alternativa",
      "Defendo minha aposta. Você decide",
    ],
  },
  {
    n: "03",
    t: "Construção",
    dur: "Semanas 03–06",
    items: [
      "Sistema completo (cores, tipografia, grids)",
      "Componentes, templates, aplicações reais",
      "Duas rodadas de revisão estruturadas",
      "Reuniões semanais de alinhamento",
    ],
  },
  {
    n: "04",
    t: "Entrega",
    dur: "Semana 06+",
    items: [
      "Arquivos fonte (Figma + assets)",
      "Manual de uso em PDF",
      "Handoff técnico se houver dev",
      "30 dias de suporte pós-entrega",
    ],
  },
];

const inclui = [
  "Reuniões semanais de alinhamento",
  "Canal direto via WhatsApp ou Slack",
  "Apresentações ao vivo (não só PDF mudo)",
  "Revisões dentro do escopo combinado",
  "Documentação final entregável",
];

const naoInclui = [
  "Produção de fotos e vídeos",
  "Compra de fontes ou licenças premium",
  "Hospedagem ou domínios",
  "Gestão de tráfego pago",
];

const planos = [
  {
    label: "Lean",
    sub: "Essencial bem-feito",
    price: "a partir de R$ 3.5K",
    desc: "Pra quem tá começando e precisa estruturar o essencial sem sacrificar qualidade.",
    items: ["1 serviço principal", "1 rodada de revisão", "Entrega em 2–3 semanas", "Suporte por 15 dias"],
    cta: "Quero o Lean",
  },
  {
    label: "Completo",
    sub: "O padrão",
    price: "a partir de R$ 9K",
    desc: "Pacote padrão. Profundidade real, mais iterações, escopo amplo. É o que a maioria escolhe.",
    items: ["Até 3 serviços combinados", "2 rodadas de revisão", "Entrega em 4–6 semanas", "Suporte por 30 dias"],
    cta: "Quero o Completo",
    featured: true,
  },
  {
    label: "Premium",
    sub: "Dedicação estendida",
    price: "sob consulta",
    desc: "Pra projetos complexos que pedem dedicação prolongada e cuidado raro. Conversa antes de orçamento.",
    items: ["Escopo flexível", "Revisões ilimitadas", "Entrega em 6–10 semanas", "Suporte por 60 dias"],
    cta: "Conversar sobre Premium",
  },
];

export default function PropostaPage() {
  return (
    <div className="pt-24 md:pt-28 pb-24">
      <Container as="div" className="flex flex-col gap-20 md:gap-28">

        {/* ===== HERO ===== */}
        <section className="flex flex-col gap-10">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Método · Proposta · Investimento
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <Clock className="size-3 text-fg-mute" strokeWidth={2.5} />
              Booking Q3 2026
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8 flex flex-col gap-6">
              <h1 className="text-display text-fg-strong text-balance">
                Como eu estruturo, precifico e entrego.
              </h1>
              <p className="text-lead max-w-prose">
                Tudo aqui é o que uso pra cada projeto novo. Sem letra
                miúda, sem reunião de descoberta-do-óbvio. Você sabe
                no que tá entrando antes da primeira conversa.
              </p>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-4">
              <div className="rounded-section border border-line bg-bg-soft p-6 flex flex-col gap-3">
                <p className="label-mono">Cronograma médio</p>
                <p className="text-h-1 text-brand tabular-nums">6 semanas</p>
                <p className="text-body-sm">
                  Mais rápido pra escopo enxuto. Mais devagar se
                  envolver dev complexo.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ===== AS 4 FASES ===== */}
        <section className="flex flex-col gap-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="label-mono">
                  <span className="text-fg-strong">01</span>
                  <span className="mx-3 text-fg-faint">──</span>
                  <span>As quatro fases</span>
                </p>
                <h2 className="text-h-1 text-fg-strong text-balance">
                  Sempre nessa ordem. Sem desvio.
                </h2>
              </div>
              <p className="lg:col-span-5 text-body max-w-prose">
                Cada fase tem entregável claro. Você sabe onde está
                e o que vem a seguir.
              </p>
            </div>
          </Reveal>

          <Stagger as="ol" className="grid gap-3 md:grid-cols-2">
            {escopo.map((e) => (
              <StaggerItem
                as="li"
                key={e.n}
                className="rounded-section border border-line bg-bg-soft p-7 md:p-9 flex flex-col gap-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-3xl font-semibold tabular-nums text-brand">{e.n}</p>
                  <p className="label-mono">{e.dur}</p>
                </div>
                <h3 className="text-h-2 text-fg-strong">{e.t}</h3>
                <ul className="flex flex-col gap-2 mt-2">
                  {e.items.map((i) => (
                    <li key={i} className="text-body text-fg-body flex gap-3 border-b border-line pb-2 last:border-0">
                      <Check className="size-4 text-brand shrink-0 mt-0.5" strokeWidth={2.5} />
                      <span className="flex-1">{i}</span>
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== INCLUI / NÃO INCLUI ===== */}
        <section className="grid gap-3 md:grid-cols-2">
          <Reveal className="rounded-section border border-line bg-bg-soft p-7 md:p-9">
            <p className="label-mono mb-3">
              <span className="text-fg-strong">02</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>Incluso</span>
            </p>
            <h2 className="text-h-2 text-fg-strong mb-6 text-balance">
              Sempre faz parte do combinado.
            </h2>
            <ul className="flex flex-col gap-2">
              {inclui.map((i) => (
                <li key={i} className="text-body text-fg-body border-b border-line py-3 flex gap-3 last:border-0">
                  <Check className="size-4 text-brand shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="flex-1">{i}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="rounded-section border border-line bg-bg p-7 md:p-9">
            <p className="label-mono mb-3">
              <span className="text-fg-strong">03</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>Fica de fora</span>
            </p>
            <h2 className="text-h-2 text-fg-strong mb-6 text-balance">
              Combinado à parte (mas converso sobre).
            </h2>
            <ul className="flex flex-col gap-2">
              {naoInclui.map((i) => (
                <li key={i} className="text-body text-fg-mute border-b border-line py-3 flex gap-3 last:border-0">
                  <XIcon className="size-4 text-fg-faint shrink-0 mt-0.5" strokeWidth={2.5} />
                  <span className="flex-1 line-through opacity-70">{i}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>

        {/* ===== TRÊS PLANOS ===== */}
        <section className="flex flex-col gap-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="label-mono">
                  <span className="text-fg-strong">04</span>
                  <span className="mx-3 text-fg-faint">──</span>
                  <span>Três níveis de envolvimento</span>
                </p>
                <h2 className="text-h-1 text-fg-strong text-balance">
                  Escolha o que faz sentido pro seu momento.
                </h2>
              </div>
              <p className="lg:col-span-5 text-body max-w-prose">
                Valores são ponto de partida. Escopo final é sempre customizado
                após a primeira conversa.
              </p>
            </div>
          </Reveal>

          <Stagger as="div" className="grid gap-4 md:grid-cols-3">
            {planos.map((p) => (
              <StaggerItem
                key={p.label}
                as="article"
                className={`flex flex-col gap-5 rounded-section border p-7 md:p-8 transition hover:-translate-y-1 hover:shadow-lg ${
                  p.featured
                    ? "border-brand bg-brand text-brand-fg"
                    : "border-line bg-bg-soft"
                }`}
              >
                <header className="flex flex-col gap-2">
                  <div className="flex items-center justify-between gap-3">
                    <p className={`label-mono ${p.featured ? "text-brand-fg/80" : "text-brand"}`}>
                      {p.label}
                    </p>
                    {p.featured && (
                      <span className="rounded-pill bg-brand-fg/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider">
                        Mais escolhido
                      </span>
                    )}
                  </div>
                  <h3 className={`text-h-2 ${p.featured ? "text-brand-fg" : "text-fg-strong"}`}>
                    {p.sub}
                  </h3>
                  <p className={`text-h-3 ${p.featured ? "text-brand-fg/85" : "text-fg-mute"}`}>
                    {p.price}
                  </p>
                </header>
                <p className={`text-body-sm ${p.featured ? "text-brand-fg/80" : "text-fg-mute"}`}>
                  {p.desc}
                </p>
                <ul className="flex flex-col gap-1 flex-1">
                  {p.items.map((i) => (
                    <li
                      key={i}
                      className={`text-body-sm flex gap-3 py-2 border-b last:border-0 ${
                        p.featured ? "text-brand-fg/90 border-brand-fg/15" : "text-fg-body border-line"
                      }`}
                    >
                      <Check className={`size-3.5 shrink-0 mt-0.5 ${p.featured ? "text-brand-fg" : "text-brand"}`} strokeWidth={2.5} />
                      <span className="flex-1">{i}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/calculadora"
                  className={`mt-auto inline-flex items-center justify-between gap-2 rounded-pill px-5 py-3 text-sm font-semibold transition ${
                    p.featured
                      ? "bg-brand-fg text-brand hover:opacity-90"
                      : "border border-line bg-bg text-fg-strong hover:bg-surface"
                  }`}
                >
                  {p.cta}
                  <ArrowUpRight className="size-4" strokeWidth={2.5} />
                </Link>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== CTA FINAL ===== */}
        <Reveal>
          <div className="rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7 flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">PRÓXIMO PASSO</p>
              <h2 className="text-h-1 text-bg text-balance">
                Quer ver isso aplicado ao seu projeto?
              </h2>
              <p className="text-body text-bg/75 max-w-prose">
                Use a calculadora se já souber o escopo aproximado.
                Se ainda tá no ar, me escreve direto que a gente conversa.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3 justify-end">
              <Link
                href="/calculadora"
                className="group inline-flex items-center justify-between gap-3 rounded-pill bg-brand px-5 py-4 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
              >
                Abrir calculadora
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/agendar"
                className="inline-flex items-center justify-between gap-3 rounded-pill border border-bg/20 bg-bg/5 px-5 py-4 text-sm font-semibold text-bg hover:bg-bg/15 transition"
              >
                Agendar conversa
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
