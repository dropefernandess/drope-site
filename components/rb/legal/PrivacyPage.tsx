"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { Label, SOCIAL } from "@/components/rb/ui";
import { LineReveal, Reveal } from "@/components/rb/motion";

/**
 * /privacidade — Política de privacidade (LGPD). Criada em 25/11/2026 porque
 * o Google exige uma para publicar o app da agenda, e o site já recebia dados
 * nos formulários. Descreve só o que o site faz de fato: Orçamento, Agenda,
 * Briefing e contato direto; sem análise de navegação nem cookies de rastreio.
 */
type Secao = { t: string; p?: string[]; li?: string[] };

const COPY: Record<"pt" | "en", { label: string; title: string; updated: string; lead: string; secoes: Secao[] }> = {
  pt: {
    label: "Privacidade",
    title: "Política de privacidade",
    updated: "Atualizada em 25 de novembro de 2026",
    lead: "Aqui está o que acontece com os dados que você me passa pelo site: o que eu recebo, para que uso, com quem compartilho e como você pede para corrigir ou apagar.",
    secoes: [
      {
        t: "Quem cuida dos seus dados",
        p: [`Drope Fernandes, designer, responsável por este site. Qualquer pedido sobre os seus dados vai para ${SOCIAL.email}.`],
      },
      {
        t: "O que eu recebo",
        li: [
          "No Orçamento: nome, e-mail, mensagem e as opções que você marcou.",
          "Na Agenda: nome, e-mail, o horário escolhido e o que você escrever sobre o projeto.",
          "Nos formulários de briefing: as respostas que você enviar.",
          "Por e-mail ou WhatsApp: o que você mandar na conversa.",
          "Ao navegar: a hospedagem registra dados técnicos, como endereço IP, navegador e páginas acessadas, por segurança. O site não usa ferramentas de análise nem cookies de rastreamento. A escolha de tema claro ou escuro fica salva só no seu navegador.",
        ],
      },
      {
        t: "Para que eu uso",
        p: [
          "Para responder você, preparar a estimativa e a proposta, marcar e fazer a nossa conversa e conduzir o projeto, se ele acontecer. Não vendo, não alugo e não uso os seus dados para anúncios.",
          "A base legal é a execução de procedimentos preliminares a um contrato, a seu pedido (LGPD, art. 7º, V), e o legítimo interesse para manter o site seguro (art. 7º, IX).",
        ],
      },
      {
        t: "Com quem eu compartilho",
        p: ["Só com os serviços que fazem o site funcionar, cada um com a própria política:"],
        li: [
          "Google (Agenda e Meet): o agendamento vira um evento na minha agenda, com link do Meet, e o Google envia o convite para o seu e-mail. A integração acessa só a minha agenda, para ver os horários livres e criar o evento. O site não pede acesso à sua conta Google.",
          "Cal.com: quando a agenda exibida for a do Cal.com.",
          "Resend: envio dos e-mails dos formulários.",
          "Vercel: hospedagem do site.",
          "Spotify: o player da página inicial é carregado pelo Spotify.",
          "WhatsApp (Meta): quando você escolhe falar por lá.",
        ],
      },
      {
        t: "Por quanto tempo",
        p: ["Pelo tempo necessário para responder e conduzir o projeto. Depois, guardo só o que a lei exigir, como registros fiscais. Se você pedir, apago antes."],
      },
      {
        t: "Seus direitos",
        p: [`Pela LGPD (art. 18), você pode confirmar se eu tenho dados seus, acessar, corrigir, pedir que eu apague, pedir a portabilidade e saber com quem compartilhei. É só escrever para ${SOCIAL.email}. Eu respondo em até 15 dias. Você também pode procurar a ANPD, a Autoridade Nacional de Proteção de Dados.`],
      },
      {
        t: "Segurança",
        p: ["O site usa conexão criptografada (HTTPS), e o acesso às contas que guardam os seus dados é só meu."],
      },
      {
        t: "Mudanças nesta política",
        p: ["Se algo mudar, eu atualizo esta página e a data lá em cima."],
      },
    ],
  },
  en: {
    label: "Privacy",
    title: "Privacy policy",
    updated: "Updated on November 25, 2026",
    lead: "Here is what happens to the information you share through this website: what I receive, what I use it for, who I share it with and how you can ask me to correct or delete it.",
    secoes: [
      {
        t: "Who looks after your data",
        p: [`Drope Fernandes, designer, responsible for this website. Any request about your data goes to ${SOCIAL.email}.`],
      },
      {
        t: "What I receive",
        li: [
          "On the Quote page: name, email, message and the options you selected.",
          "On the booking calendar: name, email, the time you chose and anything you write about the project.",
          "On briefing forms: the answers you send.",
          "By email or WhatsApp: whatever you send in the conversation.",
          "While browsing: the hosting provider logs technical data, such as IP address, browser and pages visited, for security. The site does not use analytics tools or tracking cookies. Your light or dark theme choice is saved only in your browser.",
        ],
      },
      {
        t: "What I use it for",
        p: [
          "To reply to you, prepare the estimate and the proposal, schedule and hold our call, and run the project if it goes ahead. I don't sell or rent your data, and I don't use it for ads.",
          "The legal basis is taking pre-contractual steps at your request (Brazil's LGPD, art. 7, V) and legitimate interest in keeping the site secure (art. 7, IX).",
        ],
      },
      {
        t: "Who I share it with",
        p: ["Only with the services that make the site work, each under its own policy:"],
        li: [
          "Google (Calendar and Meet): a booking becomes an event in my calendar with a Meet link, and Google sends the invite to your email. The integration only accesses my calendar, to check open times and create the event. The site never asks for access to your Google account.",
          "Cal.com: when the calendar shown is the Cal.com one.",
          "Resend: delivery of the form emails.",
          "Vercel: website hosting.",
          "Spotify: the player on the home page is loaded by Spotify.",
          "WhatsApp (Meta): when you choose to talk there.",
        ],
      },
      {
        t: "How long I keep it",
        p: ["For as long as needed to reply and run the project. After that, I keep only what the law requires, such as tax records. If you ask, I delete it sooner."],
      },
      {
        t: "Your rights",
        p: [`Under the LGPD (art. 18), you can confirm whether I hold your data, access it, correct it, ask me to delete it, request portability and know who I shared it with. Just write to ${SOCIAL.email}. I reply within 15 days. You can also contact Brazil's data protection authority (ANPD).`],
      },
      {
        t: "Security",
        p: ["The site uses an encrypted connection (HTTPS), and only I have access to the accounts that hold your data."],
      },
      {
        t: "Changes to this policy",
        p: ["If anything changes, I update this page and the date at the top."],
      },
    ],
  },
};

export function PrivacyPage() {
  const { locale } = useLocale();
  const c = COPY[locale];
  return (
    <div className="bg-bg pb-24 pt-[120px] lg:pb-40 lg:pt-[168px]">
      <div className="rb-container">
        <header className="max-w-[860px]">
          <LineReveal><Label className="text-ink-700 dark:text-ink-200">{c.label}</Label></LineReveal>
          <LineReveal as="h1" delay={0.08} className="t-hero mt-4 text-fg-strong">{c.title}</LineReveal>
          <Reveal as="p" delay={0.16} className="t-small mt-4 text-ink-700 dark:text-ink-200">{c.updated}</Reveal>
          <Reveal as="p" delay={0.22} className="t-lead mt-8 text-ink-700 dark:text-ink-200">{c.lead}</Reveal>
        </header>
        <div className="mt-14 max-w-[760px] divide-y divide-ink-100 border-t border-ink-100 dark:divide-ink-700 dark:border-ink-700 lg:mt-20">
          {c.secoes.map((s, i) => (
            <Reveal as="section" key={s.t} y={16} className="grid gap-4 py-8 lg:grid-cols-[48px_1fr] lg:gap-6 lg:py-10">
              <span className="t-label pt-1 text-brand">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h2 className="t-h3 text-fg-strong">{s.t}</h2>
                {s.p?.map((p) => <p key={p} className="t-body mt-4 text-ink-700 dark:text-ink-200">{p}</p>)}
                {s.li && (
                  <ul className="mt-4 space-y-3">
                    {s.li.map((li) => (
                      <li key={li} className="t-body flex gap-3 text-ink-700 dark:text-ink-200">
                        <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-brand" />
                        <span>{li}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
