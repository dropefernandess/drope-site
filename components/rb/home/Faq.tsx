"use client";

import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Label, SOCIAL } from "@/components/rb/ui";

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
  const pt = locale === "pt";
  return (
    <section aria-labelledby="faq" className="bg-bg">
      <div className="rb-container grid gap-10 py-16 lg:grid-cols-[500px_1fr] lg:gap-[60px] lg:py-40">
        <div>
          <Label className="text-ink-700 dark:text-ink-200">{pt ? "Perguntas frequentes" : "FAQ"}</Label>
          <h2 id="faq" className="t-h1 mt-3 text-fg-strong">{pt ? "O que costumam perguntar antes do primeiro briefing." : "What people usually ask before the first brief."}</h2>
          <p className="t-small mt-4 max-w-[440px] text-ink-700 dark:text-ink-200 lg:mt-8">
            {pt ? "Se a sua dúvida não estiver aqui, " : "If your question isn't here, "}
            <a href={`mailto:${SOCIAL.email}`} className="underline decoration-ink-200 underline-offset-4 hover:text-fg-strong">{pt ? "manda no e-mail" : "send it by email"}</a>
            {pt ? ". A resposta chega em até 24 horas." : ". You'll hear back within 24 hours."}
          </p>
        </div>
        <ul className="border-t border-ink-100 dark:border-ink-700">
          {FAQS[locale].map(([q, a], i) => {
            const isOpen = open === i;
            return (
              <li key={q} className="border-b border-ink-100 dark:border-ink-700">
                <h3>
                  <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)} className="t-lead flex w-full items-start justify-between gap-6 py-5 text-left text-fg-strong lg:py-7">
                    {q}
                    <span aria-hidden className="mt-0.5 w-5 shrink-0 text-center">{isOpen ? "−" : "+"}</span>
                  </button>
                </h3>
                <div id={`faq-${i}`} role="region" hidden={!isOpen} className="t-small -mt-1 max-w-[620px] pb-6 pr-10 text-ink-700 dark:text-ink-200 lg:pb-7">
                  {a}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
