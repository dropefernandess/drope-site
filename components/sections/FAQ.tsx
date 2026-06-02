"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Mail } from "lucide-react";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";

const items = [
  {
    cat: "Processo",
    q: "Como funciona, do briefing à entrega?",
    a: "Briefing → conceito → execução → entrega, com feedback contínuo a cada etapa. Reuniões semanais marcadas no início do projeto. Você acompanha tudo em tempo real, sem mistério.",
  },
  {
    cat: "Prazo",
    q: "Quanto tempo leva um projeto?",
    a: "Identidade visual: 3 a 5 semanas. Site institucional: 6 a 10 semanas. Pacote completo (brand + site + motion): 8 a 12 semanas. Depende do escopo e número de revisões. Tudo combinado antes.",
  },
  {
    cat: "Equipe",
    q: "Você trabalha sozinho mesmo?",
    a: "Conduzo cada projeto pessoalmente do briefing ao deploy. Quando o escopo pede profundidade em frentes específicas (motion complexo, dev avançado, fotografia, produção), trago parceiros de confiança com transparência total. Você sempre tem uma referência clara sobre quem está responsável por cada etapa.",
  },
  {
    cat: "Investimento",
    q: "Como funciona o pagamento?",
    a: "50% no início pra travar a agenda, 50% na entrega. Pra projetos longos, dividimos em milestones combinados antes. Recibos, contratos e NDAs sempre formalizados.",
  },
  {
    cat: "Localização",
    q: "Faz só projetos no Brasil?",
    a: "Não. Já trabalhei com marcas no Brasil, Dubai, Portugal e EUA. Inglês fluente, fuso ajustável. Hoje moro em Senador Firmino, MG e atendo o mundo remoto.",
  },
  {
    cat: "Pós-projeto",
    q: "O que acontece depois da entrega?",
    a: "Suporte pós-entrega de 30 dias incluso + documentação completa em PDF. Iterações futuras e manutenção contínua são combinadas à parte.",
  },
  {
    cat: "Revisões",
    q: "Quantas rodadas de revisão entram no escopo?",
    a: "Plano Lean: 1 rodada. Plano Completo: 2 rodadas. Plano Premium: revisões ilimitadas dentro do prazo. Cada rodada concentra TODAS as mudanças daquela fase, pra evitar ping-pong infinito.",
  },
  {
    cat: "Cancelamento",
    q: "E se eu precisar pausar ou cancelar?",
    a: "Sem pegadinha. Pausa: você guarda o lugar na agenda por até 30 dias com um sinal de 15%. Cancelamento: paga proporcional ao que foi entregue até ali, com arquivos liberados.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-bg section-padding">
      <Container className="flex flex-col gap-14">

        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">06</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>Perguntas frequentes</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                Tudo que costumam perguntar antes do primeiro briefing.
              </h2>
            </div>
            <p className="lg:col-span-5 text-body max-w-prose">
              Se a sua não está aqui, manda no e-mail. Respondo em até 24h —
              prometo.
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-3 lg:grid-cols-12 lg:gap-6">
          {/* Lista accordion */}
          <ul className="lg:col-span-8 flex flex-col gap-2">
            {items.map((it, idx) => {
              const isOpen = open === idx;
              return (
                <li
                  key={it.q}
                  className={`rounded-card border transition ${
                    isOpen ? "border-fg-strong bg-bg-soft" : "border-line bg-bg-soft hover:border-fg-mute"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 md:gap-6 p-5 md:p-6 text-left"
                  >
                    <span className="hidden md:inline shrink-0 mt-1 label-mono w-24">
                      {it.cat.toUpperCase()}
                    </span>
                    <span className="flex-1 text-base md:text-lg font-semibold text-fg-strong leading-snug">
                      {it.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="shrink-0 mt-1"
                      aria-hidden
                    >
                      <Plus className="size-5 text-fg-strong" strokeWidth={2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 pt-0 md:pl-[8.5rem]">
                          <p className="text-body max-w-prose">{it.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Aside CTA */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 rounded-section bg-fg-strong p-7 md:p-8 flex flex-col gap-5">
              <Mail className="size-6 text-bg" strokeWidth={1.5} />
              <div className="flex flex-col gap-2">
                <p className="text-h-3 text-bg">Sua dúvida não está aqui?</p>
                <p className="text-sm text-bg/70 leading-relaxed">
                  Manda direto pelo e-mail. Não tem formulário burocrático, não
                  tem chatbot. Sou eu que respondo.
                </p>
              </div>
              <Link
                href="mailto:contato@dropefernandes.com?subject=Pergunta%20sobre%20projeto"
                className="group inline-flex items-center justify-between gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
              >
                Mandar pergunta
                <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
