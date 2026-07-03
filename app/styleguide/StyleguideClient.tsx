"use client";

import { Container } from "@/components/ui/Container";
import { ButtonPrimary, ButtonSecondary, ButtonGhost, ButtonDark } from "@/components/ui/Buttons";
import { TextScrollReveal, StickyStack, StickyCard } from "@/components/ui/ScrollFX";
import { ProcessArt } from "@/components/ui/ProcessArt";

/**
 * Styleguide interno — documentação VIVA do design system.
 *
 * Decisão registrada (Fase 0): identidade segue o BRAND SYSTEM — DROPE
 * (paleta #DE2828 + escala ink + Inter em todos os pesos). O redesign é
 * de INTERAÇÃO: botões modernos, scroll-driven reveals, sticky stacking.
 */

const brandScale = [
  { name: "brand", hex: "#DE2828", use: "Cor principal — CTAs, accents, marcadores" },
  { name: "coral", hex: "#F25041", use: "Apoio quente — badges, categorias" },
  { name: "deep", hex: "#BF2C2C", use: "Hover de CTAs primários" },
  { name: "burnt", hex: "#A61F12", use: "Detalhes profundos" },
  { name: "wine", hex: "#73160E", use: "Overlays escuros" },
  { name: "dark", hex: "#400C08", use: "Gradientes de fundo" },
];

const inkScale = [
  { name: "ink-50", hex: "#F2F2EB", use: "Cream — bg light / texto sobre dark" },
  { name: "ink-100", hex: "#D1D1D1", use: "Neutro claro" },
  { name: "ink-200", hex: "#A6A6A6", use: "Neutro médio" },
  { name: "ink-400", hex: "#7D7D7D", use: "Texto mute (com alpha semântico)" },
  { name: "ink-700", hex: "#3D3D3D", use: "Texto de corpo" },
  { name: "ink-900", hex: "#101010", use: "Ink — texto forte / bg dark" },
];

const typeScale = [
  { cls: "text-display", label: "Display · clamp(2.5–5rem) · 600 · -0.025em" },
  { cls: "text-h-1", label: "H1 · clamp(2–3.25rem) · 600" },
  { cls: "text-h-2", label: "H2 · clamp(1.5–2rem) · 600" },
  { cls: "text-h-3", label: "H3 · 1.125rem · 600" },
  { cls: "text-lead", label: "Lead · 1.0625rem · 400" },
  { cls: "text-body", label: "Body · 0.9375rem · 400" },
  { cls: "label-mono", label: "Label · 0.75rem · 500 · tracking 0.02em" },
];

function SectionLabel({ n, children }: { n: string; children: React.ReactNode }) {
  return (
    <p className="label-mono flex items-center gap-3">
      <span className="text-fg-strong">{n}</span>
      <span className="text-fg-faint">──</span>
      <span>{children}</span>
    </p>
  );
}

export function StyleguideClient() {
  return (
    <div className="min-h-screen bg-bg">
      <Container as="div" className="pt-32 pb-24 flex flex-col gap-20">

        {/* HEADER */}
        <header className="flex flex-col gap-4">
          <p className="label-mono flex items-center gap-2">
            <span className="size-1 rounded-full bg-brand" />
            Design System · Rota interna (noindex)
          </p>
          <h1 className="text-display text-fg-strong">Styleguide Dropê</h1>
          <p className="text-lead max-w-prose">
            Identidade conforme o <strong>BRAND SYSTEM — DROPE</strong> (paleta
            e Inter intocadas). O que evolui aqui é a camada de{" "}
            <strong>interação</strong>: botões, scroll e empilhamento.
            Dica: aperta <kbd className="rounded border border-line bg-bg-soft px-1.5 py-0.5 text-xs font-semibold">R</kbd>{" "}
            pra ligar as réguas.
          </p>
        </header>

        {/* 01 — PALETA */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="01">Paleta oficial (do manual)</SectionLabel>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[...brandScale, ...inkScale].map((c) => (
              <div key={c.name} className="flex items-center gap-3 rounded-card border border-line bg-bg-soft p-3">
                <span
                  className="size-12 shrink-0 rounded-lg border border-line"
                  style={{ background: c.hex }}
                />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-fg-strong">
                    {c.name} <span className="font-normal text-fg-mute">{c.hex}</span>
                  </p>
                  <p className="truncate text-xs text-fg-mute">{c.use}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 02 — TIPOGRAFIA */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="02">Tipografia — Inter, peso radical</SectionLabel>
          <div className="flex flex-col gap-5 rounded-section border border-line bg-bg-soft p-7 md:p-10">
            {typeScale.map((ts) => (
              <div key={ts.cls} className="flex flex-col gap-1 border-b border-line pb-4 last:border-0 last:pb-0">
                <p className={`${ts.cls} text-fg-strong`}>Crio marcas pra durar.</p>
                <p className="text-xs text-fg-mute font-mono">{ts.cls} — {ts.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 03 — BOTÕES */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="03">Botões — fill-up + text-slide (passa o mouse)</SectionLabel>
          <div className="flex flex-wrap items-center gap-4 rounded-section border border-line bg-bg-soft p-7 md:p-10">
            <ButtonPrimary href="#">Ver trabalhos</ButtonPrimary>
            <ButtonSecondary href="#">Agendar conversa</ButtonSecondary>
            <ButtonDark href="#">Estimar projeto</ButtonDark>
            <ButtonGhost href="#">ou agenda 30 min direto</ButtonGhost>
          </div>
          <p className="text-body-sm max-w-prose">
            CSS puro (group-hover + transform) — zero JS por interação.
            Primário: fill brand-deep sobe. Secundário: surface sobe.
            Dark: fill brand sobe. Ghost: underline cresce da esquerda.
            Todos com text-slide no label.
          </p>
        </section>

        {/* 04 — TEXT SCROLL REVEAL */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="04">TextScrollReveal — rola devagar por aqui</SectionLabel>
          <div className="rounded-section border border-line bg-bg-soft p-7 md:p-12">
            <TextScrollReveal
              as="p"
              className="text-h-1 text-fg-strong max-w-4xl"
              text="O design que transforma não é o que grita. É o que fala na hora certa, da forma certa, com a intensidade exata — e este texto acende palavra por palavra conforme o teu scroll avança."
            />
          </div>
          <p className="text-body-sm max-w-prose">
            Scroll-linked (não triggered): voltar o scroll apaga de volta.
            Só opacity → GPU. Com prefers-reduced-motion, renderiza estático.
          </p>
        </section>

        {/* 05 — STICKY STACK */}
        <section className="flex flex-col gap-6">
          <SectionLabel n="05">StickyStack — continua rolando</SectionLabel>
          <StickyStack>
            {[
              { n: "01", t: "Brief & Discovery", d: "Conversa inicial pra entender o problema, o público e o objetivo. Reunião sem PowerPoint.", tone: "bg-bg-soft border border-line text-fg-strong" },
              { n: "02", t: "Conceito & Direção", d: "Exploração de referências, definição de direção visual e validação dos primeiros conceitos.", tone: "bg-brand text-brand-fg" },
              { n: "03", t: "Execução", d: "Design, código e motion construídos em iterações curtas com feedback contínuo.", tone: "bg-fg-strong text-bg" },
              { n: "04", t: "Entrega & Refinamento", d: "Refinos finais, deploy, documentação e suporte pros próximos passos.", tone: "bg-bg-soft border border-line text-fg-strong" },
            ].map((card, i, arr) => (
              <StickyCard key={card.n} index={i} total={arr.length}>
                <div className={`rounded-section p-8 md:p-12 min-h-[280px] grid gap-8 md:grid-cols-[1fr_auto] items-center shadow-lg ${card.tone}`}>
                  <div className="flex flex-col justify-between gap-6">
                    <p className="text-4xl font-semibold tabular-nums opacity-60">{card.n}</p>
                    <div className="flex flex-col gap-2">
                      <h3 className="text-h-2">{card.t}</h3>
                      <p className="text-base opacity-80 max-w-prose">{card.d}</p>
                    </div>
                  </div>
                  <ProcessArt
                    step={(i + 1) as 1 | 2 | 3 | 4}
                    className="w-28 md:w-36 shrink-0 justify-self-center md:justify-self-end opacity-90"
                  />
                </div>
              </StickyCard>
            ))}
          </StickyStack>
          <p className="text-body-sm max-w-prose">
            Cards grudam e empilham com offset incremental; o card coberto
            encolhe 4% e escurece de leve (profundidade). CSS sticky +
            scroll progress — padrão das referências Framer (hox/wapfy).
          </p>
        </section>

        {/* RODAPÉ */}
        <footer className="rounded-section bg-fg-strong text-bg p-8 md:p-10 flex flex-col gap-2">
          <p className="text-[11px] uppercase tracking-[0.18em] opacity-60">Status</p>
          <p className="text-xl font-semibold">
            Fase 0 fechada: identidade do manual + DS de interação.
          </p>
          <p className="text-sm opacity-70 max-w-prose leading-relaxed">
            Próximo: Fase 2 — aplicar esse vocabulário na home, seção a seção
            (botões novos, reveals, sticky no Processo), sem tocar em copy nem
            na lógica da calculadora.
          </p>
        </footer>
      </Container>
    </div>
  );
}
