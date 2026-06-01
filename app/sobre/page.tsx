"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";

/**
 * /sobre — agency clean (sem editorial). Hero 2-col + sections com
 * Reveal motion, Inter Medium/SemiBold.
 */

const valores = [
  { n: "01", t: "Profundidade", d: "Entender antes de criar. Cada projeto começa com escuta. Não com pressuposto." },
  { n: "02", t: "Compromisso",  d: "Presença do briefing à entrega final. Não terceirizo visão (gosto demais do ofício)." },
  { n: "03", t: "Excelência",   d: "Ofício artesanal. Detalhe é o que separa boa de memorável. E detalhe leva tempo." },
  { n: "04", t: "Inovação",     d: "Repertório cultural amplo, recusa do óbvio, abertura ao novo sem soltar o que funciona." },
];

const skillGroups = [
  { eyebrow: "DESIGN",   items: ["Brand systems", "Identidade visual", "Direção de arte", "Capas de álbum"] },
  { eyebrow: "PRODUTO",  items: ["UI/UX Design", "Design de produto", "Design tokens", "Web Design"] },
  { eyebrow: "TÉCNICO",  items: ["Front-end (Next.js)", "Motion design", "Matte painting", "Copywriting"] },
];

const timeline = [
  { ano: "2018", evento: "Primeira identidade visual paga", ctx: "Sirius Agência" },
  { ano: "2020", evento: "Decisão de virar solo full-time",  ctx: "Saí do estúdio onde trabalhava" },
  { ano: "2022", evento: "Primeiro projeto fora do Brasil",  ctx: "Bada Bing — Dubai" },
  { ano: "2024", evento: "Atendimento internacional remoto", ctx: "Senador Firmino, MG · Hoje" },
];

export default function SobrePage() {
  return (
    <div className="pt-24 md:pt-28 pb-24">
      <Container as="div" className="flex flex-col gap-20 md:gap-28">

        {/* ===== HERO ===== */}
        <section className="flex flex-col gap-10">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Sobre · Pedro Fernandes
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <Clock className="size-3 text-fg-mute" strokeWidth={2.5} />
              Designer desde 2018
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8 flex flex-col gap-6">
              <h1 className="text-display text-fg-strong text-balance">
                Pedro Fernandes. Drope pra quem trabalha comigo.
              </h1>
              <p className="text-lead max-w-prose">
                Designer multidisciplinar trabalhando entre identidade
                visual, interface, motion e código. Pego o projeto inteiro,
                do briefing à última animação, com parceiros pontuais de
                confiança quando o escopo pede mais profundidade em alguma
                frente.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="mailto:contato@dropefernandes.com"
                  className="group inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
                >
                  Conversar
                  <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/proposta"
                  className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-5 py-3 text-sm font-semibold text-fg-strong hover:bg-surface transition"
                >
                  Ver método
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="lg:col-span-4">
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-section bg-surface"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/sobre.png"
                  alt="Pedro Fernandes (Drope)"
                  fill
                  priority
                  sizes="(min-width:1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 rounded-pill bg-bg/90 backdrop-blur border border-line px-3 py-1.5 text-xs font-semibold text-fg-strong">
                  Drope · 2026
                </span>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ===== MANIFESTO TEXT ===== */}
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="label-mono mb-3">
              <span className="text-fg-strong">01</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>Manifesto</span>
            </p>
            <h2 className="text-h-1 text-fg-strong text-balance">
              Design é linguagem, não decoração.
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8 flex flex-col gap-5 text-body max-w-prose">
            <p>
              A vida toda gostei de duas coisas. Construir e contar histórias.
              Comecei a desenhar marca pra banda do colégio em 2018 e nunca
              mais parei. Hoje atuo solo: pego o briefing, projeto a identidade,
              monto o site, escrevo a copy, faço o motion da launch.
            </p>
            <p>
              Trabalho com startups, artistas e marcas pessoais que precisam
              tirar ideia do papel sem perder o que faz cada uma única.
              Brand system, web, UI, motion, capas de álbum, matte painting.
              tudo da mesma cabeça.
            </p>
            <p className="text-fg-strong">
              No fim, o design que transforma não é o que grita.
              É o que fala na hora certa, da forma certa, com a
              intensidade exata.
            </p>
          </Reveal>
        </section>

        {/* ===== TIMELINE — cards iguais grid ===== */}
        <section className="flex flex-col gap-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="label-mono">
                  <span className="text-fg-strong">02</span>
                  <span className="mx-3 text-fg-faint">──</span>
                  <span>O caminho</span>
                </p>
                <h2 className="text-h-1 text-fg-strong text-balance">
                  Oito anos. Quatro marcos.
                </h2>
              </div>
              <p className="lg:col-span-5 text-body max-w-prose">
                De freelancer paralelo a designer atendendo marcas
                em quatro saltos.
              </p>
            </div>
          </Reveal>

          <Stagger as="ol" className="grid gap-3 md:grid-cols-4">
            {timeline.map((t) => (
              <StaggerItem
                as="li"
                key={t.ano}
                className="rounded-section border border-line bg-bg-soft p-6 flex flex-col gap-3 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-3xl md:text-4xl font-semibold tabular-nums text-brand">
                  {t.ano}
                </p>
                <p className="text-body text-fg-strong font-medium leading-snug">{t.evento}</p>
                <p className="label-mono mt-auto">{t.ctx}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== VALORES — lista grande ===== */}
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="label-mono mb-3">
              <span className="text-fg-strong">03</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>Valores</span>
            </p>
            <h2 className="text-h-1 text-fg-strong text-balance">
              Quatro coisas guiam cada projeto.
            </h2>
            <p className="text-body mt-5 max-w-prose">
              Não são slogans. São critérios que uso pra decidir o que aceito
              e o que devolvo (sim, devolvo briefing às vezes).
            </p>
          </Reveal>

          <Stagger as="ol" className="lg:col-span-8 flex flex-col">
            {valores.map((v, i) => (
              <StaggerItem
                key={v.n}
                as="li"
                className={`grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-7 ${
                  i < valores.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="text-2xl md:text-3xl font-semibold tabular-nums text-brand min-w-[3ch]">
                  {v.n}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-h-3 text-fg-strong">{v.t}</h3>
                  <p className="text-body max-w-prose">{v.d}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== SKILLS — agrupadas ===== */}
        <section className="flex flex-col gap-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="label-mono">
                  <span className="text-fg-strong">04</span>
                  <span className="mx-3 text-fg-faint">──</span>
                  <span>Caixa de ferramentas</span>
                </p>
                <h2 className="text-h-1 text-fg-strong text-balance">
                  O que eu opero, agrupado por frente.
                </h2>
              </div>
              <p className="lg:col-span-5 text-body max-w-prose">
                Não é tudo que faço o tempo todo. É tudo que sei operar
                com profundidade.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-3">
            {skillGroups.map((g) => (
              <Reveal key={g.eyebrow} className="rounded-section border border-line bg-bg-soft p-6 md:p-7 flex flex-col gap-4">
                <p className="label-mono text-brand">{g.eyebrow}</p>
                <ul className="flex flex-col gap-2 flex-1">
                  {g.items.map((s) => (
                    <li key={s} className="text-body text-fg-strong border-b border-line pb-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <Reveal>
          <div className="rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7 flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">PRÓXIMO PASSO</p>
              <h2 className="text-h-1 text-bg text-balance">
                Conta o que você tá precisando.
              </h2>
              <p className="text-body text-bg/75 max-w-prose">
                Respondo em até 24h. Se for caso pra calculadora primeiro,
                ali do lado.
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3 justify-end">
              <Link
                href="mailto:contato@dropefernandes.com"
                className="group inline-flex items-center justify-between gap-3 rounded-pill bg-brand px-5 py-4 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
              >
                contato@dropefernandes.com
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/calculadora"
                className="inline-flex items-center justify-between gap-3 rounded-pill border border-bg/20 bg-bg/5 px-5 py-4 text-sm font-semibold text-bg hover:bg-bg/15 transition"
              >
                Estimar investimento
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
