"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Label, SOCIAL } from "@/components/rb/ui";
import { EASE, LineReveal, Reveal, RevealGroup, useReducedMotionSafe } from "@/components/rb/motion";

/** "+" que gira e vira "−" ao abrir (a barra vertical recolhe). */
function PlusMinus({ open, reduced }: { open: boolean; reduced: boolean }) {
  const t = reduced ? { duration: 0 } : { duration: 0.45, ease: EASE };
  return (
    <motion.svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="inline-block align-middle" initial={false} animate={{ rotate: open ? 180 : 0 }} transition={t}>
      <line x1="3" y1="9" x2="15" y2="9" />
      <motion.line x1="9" y1="3" x2="9" y2="15" initial={false} animate={{ scaleY: open ? 0 : 1 }} transition={t} style={{ transformBox: "fill-box", transformOrigin: "50% 50%" }} />
    </motion.svg>
  );
}

/** Perguntas frequentes — Figma "08 Perguntas frequentes". Uma aberta por vez. */
export const FAQS = {
  pt: [
    ["Como funciona, do briefing à entrega?", "Briefing, direção, execução e entrega, com conversa a cada etapa. As reuniões ficam marcadas desde o início, e você acompanha tudo sem mistério."],
    ["Quanto tempo leva um projeto?", "Identidade visual leva de 3 a 5 semanas. Site institucional, de 6 a 10. O pacote completo, com marca, site e motion, de 8 a 12 semanas. Tudo combinado antes de começar."],
    ["Posso pedir alterações?", "Pode. Cada fase tem rodadas de revisão combinadas antes, e cada rodada reúne todas as mudanças daquela etapa, para o projeto não virar pingue-pongue."],
    ["Como funciona o pagamento?", "Metade no início, para reservar a agenda, e metade na entrega. Projetos longos são divididos em etapas combinadas antes. Contrato e recibos sempre formalizados."],
    ["Faz projetos fora do Brasil?", "Faço. Já atendi marcas no Brasil, nos Emirados Árabes e em Portugal. Crio de Senador Firmino, MG, e o fuso se ajusta ao projeto."],
    ["O que acontece depois da entrega?", "São 30 dias de acompanhamento depois da entrega, com documentação completa. Ajustes futuros e manutenção são combinados à parte."],
  ],
  en: [
    ["How does it work, from brief to delivery?", "Brief, direction, execution and delivery, with a conversation at every step. Meetings are scheduled from the start, and you follow everything with no mystery."],
    ["How long does a project take?", "A visual identity takes 3 to 5 weeks. A company website, 6 to 10. The full package, with brand, website and motion, 8 to 12 weeks. Everything agreed before we start."],
    ["Can I ask for changes?", "Yes. Each phase has review rounds agreed beforehand, and each round gathers every change for that step, so the project doesn't turn into ping-pong."],
    ["How does payment work?", "Half up front to book the schedule, half on delivery. Longer projects are split into milestones agreed in advance. Contract and receipts, always."],
    ["Do you work outside Brazil?", "I do. I've worked with brands in Brazil, the United Arab Emirates and Portugal. I create from Senador Firmino, Brazil, and adjust to your time zone."],
    ["What happens after delivery?", "30 days of follow-up after delivery, with complete documentation. Future changes and maintenance are agreed separately."],
  ],
};

export function Faq() {
  const { locale } = useLocale();
  const [open, setOpen] = useState(0);
  const reduced = useReducedMotionSafe();
  const pt = locale === "pt";
  const panel = reduced ? { duration: 0 } : { duration: 0.5, ease: EASE };
  return (
    <section aria-labelledby="faq" className="bg-bg">
      <div className="rb-container grid gap-10 py-16 lg:grid-cols-[500px_1fr] lg:gap-[60px] lg:py-40">
        <div>
          <LineReveal>
            <Label className="text-ink-700 dark:text-ink-200">{pt ? "Perguntas frequentes" : "FAQ"}</Label>
          </LineReveal>
          <Reveal as="h2" id="faq" delay={0.08} className="t-h1 mt-3 text-fg-strong">{pt ? "O que costumam perguntar antes do primeiro briefing." : "What people usually ask before the first brief."}</Reveal>
          <Reveal as="p" delay={0.16} className="t-small mt-4 max-w-[440px] text-ink-700 dark:text-ink-200 lg:mt-8">
            {pt ? "Se a sua dúvida não estiver aqui, " : "If your question isn't here, "}
            <a href={`mailto:${SOCIAL.email}`} className="underline decoration-ink-200 underline-offset-4 hover:text-fg-strong">{pt ? "manda no e-mail" : "send it by email"}</a>
            {pt ? ". A resposta chega em até 24 horas." : ". You'll hear back within 24 hours."}
          </Reveal>
        </div>
        <RevealGroup as="ul" stagger={0.07} className="border-t border-ink-100 dark:border-ink-700">
          {FAQS[locale].map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <Reveal as="li" key={q} y={20} className="border-b border-ink-100 dark:border-ink-700">
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)} className="t-lead flex w-full items-start justify-between gap-6 py-5 text-left text-fg-strong lg:py-7">
                    {q}
                    <span aria-hidden className="mt-0.5 w-5 shrink-0 text-center"><PlusMinus open={isOpen} reduced={reduced} /></span>
                  </button>
                </h3>
                {/* Altura e opacidade suaves; fechada, fica fora da leitura (inert) como o antigo `hidden` */}
                <motion.div
                  id={`faq-${i}`}
                  role="region"
                  aria-hidden={!isOpen}
                  inert={!isOpen}
                  initial={false}
                  animate={isOpen ? { height: "auto", opacity: 1, marginTop: -4 } : { height: 0, opacity: 0, marginTop: 0 }}
                  transition={panel}
                  className="overflow-hidden"
                >
                  <div className="t-small max-w-[620px] pb-6 pr-10 text-ink-700 dark:text-ink-200 lg:pb-7">
                    {a}
                  </div>
                </motion.div>
              </Reveal>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
