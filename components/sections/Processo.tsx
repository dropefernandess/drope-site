"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";

const steps = [
  {
    num: "01",
    title: "Brief & Discovery",
    duration: "Semana 01",
    desc: "Conversa inicial pra entender o problema, o público e o objetivo. Reunião sem PowerPoint.",
    deliverables: ["Brief consolidado", "Análise de referências", "Definição de KPIs"],
  },
  {
    num: "02",
    title: "Conceito & Direção",
    duration: "Semanas 02-03",
    desc: "Exploração de referências, definição de direção visual e validação dos primeiros conceitos.",
    deliverables: ["Moodboards", "Princípios de design", "1 direção + 1 alternativa"],
  },
  {
    num: "03",
    title: "Execução",
    duration: "Semanas 03-06",
    desc: "Design, código e motion sendo construídos em iterações curtas com feedback contínuo.",
    deliverables: ["Sistema completo", "Iterações ao vivo", "2 rodadas de revisão"],
  },
  {
    num: "04",
    title: "Entrega & Refinamento",
    duration: "Semana 06+",
    desc: "Refinos finais, deploy, documentação e suporte pra próximos passos.",
    deliverables: ["Arquivos fonte", "Manual em PDF", "30 dias de suporte"],
  },
];

/**
 * Processo — UMA linha vertical única. Altura calculada com useEffect baseado
 * no meio do último marker, evitando a "perninha" que sobrava. Linha vermelha
 * cresce com scrollYProgress da seção.
 */
export function Processo() {
  const timelineRef = useRef<HTMLOListElement>(null);
  const [lineHeight, setLineHeight] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Calcula altura exata: do meio do primeiro marker ao meio do último.
  useEffect(() => {
    const ol = timelineRef.current;
    if (!ol) return;

    const recalc = () => {
      const items = ol.querySelectorAll<HTMLElement>(":scope > li");
      if (items.length === 0) return;
      const first = items[0].querySelector<HTMLElement>(":scope > span:first-child");
      const last  = items[items.length - 1].querySelector<HTMLElement>(":scope > span:first-child");
      if (!first || !last) return;
      const firstMid = first.offsetTop + first.offsetHeight / 2;
      const lastMid  = last.parentElement!.offsetTop + last.offsetTop + last.offsetHeight / 2;
      setLineHeight(lastMid - firstMid);
    };

    recalc();
    const ro = new ResizeObserver(recalc);
    ro.observe(ol);
    window.addEventListener("resize", recalc);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, []);

  return (
    <section id="processo" className="bg-bg section-padding overflow-hidden">
      <Container className="flex flex-col gap-14">

        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">03</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>Como conduzo</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                Quatro etapas. Sempre nessa ordem.
              </h2>
            </div>
            <p className="lg:col-span-5 text-body max-w-prose">
              Da primeira conversa à entrega final. Sem suspense, sem desvio.
              Você recebe o cronograma na primeira reunião.
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Sticky aside com CTA forte */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="label-mono">PROCESSO ATUAL</p>
                <p className="text-h-2 text-fg-strong">
                  Cronograma médio
                  <br />
                  <span className="text-brand tabular-nums">6 semanas</span>
                </p>
                <p className="text-body max-w-prose">
                  Vai mais rápido se for escopo enxuto. Vai mais devagar se
                  envolver dev complexo ou rodada extra de pesquisa.
                </p>
              </div>

              {/* CTA FORTE — card dark com 3 mini-pontos + botão */}
              <div className="rounded-section bg-fg-strong text-bg p-6 flex flex-col gap-4">
                <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">
                  Pronto pra começar?
                </p>
                <p className="text-h-3 text-bg leading-snug">
                  Aplico esse processo no seu projeto. Resposta em até 24h.
                </p>
                <ul className="flex flex-col gap-1.5 text-sm text-bg/75">
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-brand" />
                    Primeira reunião sem custo
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-brand" />
                    Brief consolidado por escrito
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-brand" />
                    Cronograma combinado antes
                  </li>
                </ul>
                <Link
                  href="mailto:contato@dropefernandes.com?subject=Quero%20aplicar%20esse%20processo%20no%20meu%20projeto"
                  className="group inline-flex items-center justify-between gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition mt-1"
                >
                  Aplicar no meu projeto
                  <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
              </div>
            </div>
          </aside>

          {/* Timeline */}
          <ol
            ref={timelineRef}
            className="lg:col-span-8 relative flex flex-col gap-10 md:gap-14"
          >
            {/* TRILHO — altura calculada dinamicamente */}
            {lineHeight !== null && (
              <>
                <span
                  className="absolute left-4 md:left-7 w-px bg-line top-[18px] md:top-[28px]"
                  style={{ height: lineHeight }}
                  aria-hidden
                />
                <motion.span
                  aria-hidden
                  style={{ scaleY: lineScale, transformOrigin: "top", height: lineHeight }}
                  className="absolute left-4 md:left-7 w-px bg-brand top-[18px] md:top-[28px]"
                />
              </>
            )}

            {steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.num}
                delay={i * 0.08}
                className="relative grid grid-cols-[auto_1fr] gap-5 md:gap-8 group"
              >
                {/* Marker */}
                <span className="relative shrink-0 size-9 md:size-14 rounded-full bg-bg border border-line flex items-center justify-center group-hover:border-brand transition z-10">
                  <span className="text-xs md:text-base font-semibold tabular-nums text-fg-strong">
                    {s.num}
                  </span>
                </span>

                <div className="flex flex-col gap-3 pt-1.5">
                  <div className="flex items-baseline justify-between gap-3 flex-wrap">
                    <h3 className="text-h-2 text-fg-strong">{s.title}</h3>
                    <span className="label-mono">{s.duration}</span>
                  </div>
                  <p className="text-body max-w-prose">{s.desc}</p>
                  <ul className="flex flex-wrap gap-1.5 mt-1">
                    {s.deliverables.map((d) => (
                      <li
                        key={d}
                        className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-line bg-bg-soft text-fg-mute"
                      >
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
