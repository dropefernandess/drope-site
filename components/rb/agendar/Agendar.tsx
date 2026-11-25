"use client";

import { useEffect } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink } from "@/components/i18n/LocalLink";
import { Chip, Icon, ICONS, Label, SOCIAL } from "@/components/rb/ui";
import type { Locale } from "@/lib/i18n/dictionaries";
import { waLink } from "@/lib/config";

/**
 * /agendar — Contato e agendamento (rebrand 2026).
 *
 * Cal.com embed inline (handle "drope/30min"), contato direto (e-mail,
 * WhatsApp e redes) e o que acontece depois de agendar.
 *
 * Como o embed funciona:
 *  - Carrega o script oficial do Cal.com via CDN
 *  - Inicializa o namespace "30min"
 *  - Renderiza o widget inline dentro do <div id="cal-inline">
 */

// Handle real do Cal.com — Pedro Fernandes (Drope)
// Event types disponíveis: drope/30min · drope/15min
const CAL_LINK = "drope/30min";

const ICON_MAIL = '<rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>';
const ICON_CHAT = '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>';
const ICON_VIDEO = '<path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>';
const ICON_FREE = '<path d="M20 6 9 17l-5-5"/>';

const COPY: Record<Locale, {
  label: string; titleA: string; titleB: string; lead: string;
  chips: [string, string, string];
  jumpA: string; jumpB: string;
  agenda: string; fallbackA: string; fallbackB: string;
  direto: string; resposta: string; email: string; whatsapp: string; phone: string; waMsg: string;
  redes: string;
  calcQ: string; calcP: string; calcLink: string;
  depoisLabel: string; depoisTitle: string;
  steps: { t: string; d: string }[];
}> = {
  pt: {
    label: "Contato",
    titleA: "Vamos",
    titleB: "conversar.",
    lead: "Escolha um horário na agenda. São 30 minutos, sem custo, para entender o seu projeto e ver se faz sentido trabalharmos juntos. Se preferir, me chama direto no e-mail ou no WhatsApp.",
    chips: ["30 minutos", "Google Meet", "Sem custo"],
    jumpA: "Prefere falar direto?",
    jumpB: "Ver e-mail e WhatsApp",
    agenda: "Escolha um horário",
    fallbackA: "A agenda não carregou?",
    fallbackB: "Abrir no Cal.com",
    direto: "Fale direto comigo",
    resposta: "Respondo em até 24 horas.",
    email: "E-mail",
    whatsapp: "WhatsApp",
    phone: SOCIAL.phone,
    waMsg: "Oi, Drope! Vim pelo site e quero conversar sobre um projeto.",
    redes: "Redes",
    calcQ: "Quer uma ideia de investimento antes?",
    calcP: "A calculadora dá uma estimativa em dois minutos.",
    calcLink: "Calcular meu projeto",
    depoisLabel: "Depois de agendar",
    depoisTitle: "O que acontece depois",
    steps: [
      { t: "Você escolhe o horário", d: "Eu confirmo o agendamento e o link do Google Meet chega no seu e-mail." },
      { t: "A gente conversa por 30 minutos", d: "Você me conta sobre o projeto, o momento da marca e o prazo. Eu pergunto, escuto e explico como trabalho." },
      { t: "Você recebe uma proposta", d: "Se fizer sentido seguir, mando uma proposta com escopo, etapas, prazo e investimento." },
    ],
  },
  en: {
    label: "Contact",
    titleA: "Let's",
    titleB: "talk.",
    lead: "Pick a time on the calendar. It's 30 minutes, free, to understand your project and see if we're a good fit. If you prefer, reach me directly by email or WhatsApp.",
    chips: ["30 minutes", "Google Meet", "Free"],
    jumpA: "Rather reach me directly?",
    jumpB: "See email and WhatsApp",
    agenda: "Pick a time",
    fallbackA: "Calendar didn't load?",
    fallbackB: "Open it on Cal.com",
    direto: "Reach me directly",
    resposta: "I reply within 24 hours.",
    email: "Email",
    whatsapp: "WhatsApp",
    phone: "+55 32 9 9805-7750",
    waMsg: "Hi Drope! I found you through your website and I'd like to talk about a project.",
    redes: "Social",
    calcQ: "Want a sense of the budget first?",
    calcP: "The calculator gives you an estimate in two minutes.",
    calcLink: "Estimate my project",
    depoisLabel: "After booking",
    depoisTitle: "What happens next",
    steps: [
      { t: "You pick a time", d: "I confirm the booking and the Google Meet link lands in your inbox." },
      { t: "We talk for 30 minutes", d: "You tell me about the project, where the brand stands and the timeline. I ask, listen and explain how I work." },
      { t: "You get a proposal", d: "If it makes sense to move forward, I send a proposal with scope, steps, timeline and investment." },
    ],
  },
};

export function Agendar() {
  const { locale } = useLocale();
  const c = COPY[locale];

  useEffect(() => {
    // Cal.com embed snippet (loader oficial)
    (function (C: typeof window, A: string, L: string) {
      const p = function (a: any, ar: any) {
        a.q.push(ar);
      };
      const d = (C as any).document;
      (C as any).Cal =
        (C as any).Cal ||
        function () {
          const cal = (C as any).Cal;
          const ar = arguments;
          if (!cal.loaded) {
            cal.ns = {};
            cal.q = cal.q || [];
            d.head.appendChild(d.createElement("script")).src = A;
            cal.loaded = true;
          }
          if (ar[0] === L) {
            const api = function () {
              p(api, arguments);
            };
            const namespace = ar[1];
            (api as any).q = (api as any).q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else {
              p(cal, ar);
            }
            return;
          }
          p(cal, ar);
        };
    })(window, "https://app.cal.com/embed/embed.js", "init");

    // Segue o tema do site (claro por padrão), não o do sistema.
    const theme = document.documentElement.classList.contains("dark") ? "dark" : "light";

    const Cal = (window as any).Cal;
    Cal("init", "30min", { origin: "https://cal.com" });
    Cal.ns["30min"]("inline", {
      elementOrSelector: "#cal-inline",
      config: { layout: "month_view", theme },
      calLink: CAL_LINK,
    });
    Cal.ns["30min"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  const rowCls =
    "group flex min-h-[64px] items-center justify-between gap-4 border-b border-ink-700 py-4 transition-colors hover:text-ink-50";

  return (
    <div className="bg-bg pb-24 pt-[120px] lg:pb-40 lg:pt-[168px]">
      <div className="rb-container">
        {/* ===== CABEÇALHO ===== */}
        <header className="max-w-[980px]">
          <Label className="text-ink-700 dark:text-ink-200">{c.label}</Label>
          <h1 className="t-hero mt-4 text-fg-strong">
            {c.titleA} <span className="t-serif t-hero-serif text-brand">{c.titleB}</span>
          </h1>
          <p className="t-lead mt-6 max-w-[760px] text-ink-700 dark:text-ink-200 lg:mt-8">{c.lead}</p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {[ICONS.clock, ICON_VIDEO, ICON_FREE].map((d, i) => (
              <li key={c.chips[i]}>
                <Chip className="gap-2 text-base">
                  <Icon d={d} size={16} /> {c.chips[i]}
                </Chip>
              </li>
            ))}
          </ul>
          <p className="t-small mt-6 text-ink-700 dark:text-ink-200 lg:hidden">
            {c.jumpA}{" "}
            <a href="#contato-direto" className="inline-flex min-h-[44px] items-center font-semibold text-fg-strong underline decoration-ink-200 underline-offset-4">
              {c.jumpB}
            </a>
          </p>
        </header>

        <div className="mt-14 grid gap-12 lg:mt-24 grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-12 xl:grid-cols-[minmax(0,1fr)_440px] xl:gap-16">
          {/* ===== AGENDA ===== */}
          <section aria-labelledby="agenda-titulo" className="min-w-0">
            <h2 id="agenda-titulo" className="t-label text-ink-700 dark:text-ink-200">{c.agenda}</h2>
            <div id="cal-inline" className="mt-4 min-h-[560px] w-full overflow-hidden rounded-2xl" />
            <p className="t-small mt-4 text-ink-700 dark:text-ink-200">
              {c.fallbackA}{" "}
              <a
                href={`https://cal.com/${CAL_LINK}`}
                target="_blank"
                rel="noreferrer"
                className="font-semibold text-fg-strong underline decoration-ink-200 underline-offset-4 hover:decoration-fg-strong"
              >
                {c.fallbackB}
              </a>
            </p>
          </section>

          {/* ===== CONTATO DIRETO ===== */}
          <aside aria-labelledby="direto-titulo" id="contato-direto" className="flex min-w-0 scroll-mt-28 flex-col gap-4">
            <div className="rounded-2xl bg-ink-900 p-6 text-ink-50 dark:border dark:border-ink-700 lg:p-8">
              <h2 id="direto-titulo" className="t-h3">{c.direto}</h2>
              <p className="t-small mt-3 text-ink-200">{c.resposta}</p>

              <ul className="mt-6 border-t border-ink-700">
                <li>
                  <a href={`mailto:${SOCIAL.email}`} className={rowCls}>
                    <span className="min-w-0">
                      <span className="t-label flex items-center gap-2 text-ink-200">
                        <Icon d={ICON_MAIL} size={16} className="shrink-0 text-brand" />
                        {c.email}
                      </span>
                      <span className="t-small mt-1 block [overflow-wrap:anywhere]">{SOCIAL.email}</span>
                    </span>
                    <Icon d={ICONS.arrowUpRight} size={20} className="shrink-0 text-ink-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
                <li>
                  <a href={waLink(c.waMsg)} target="_blank" rel="noreferrer" className={rowCls}>
                    <span className="min-w-0">
                      <span className="t-label flex items-center gap-2 text-ink-200">
                        <Icon d={ICON_CHAT} size={16} className="shrink-0 text-brand" />
                        {c.whatsapp}
                      </span>
                      <span className="t-small mt-1 block [overflow-wrap:anywhere]">{c.phone}</span>
                    </span>
                    <Icon d={ICONS.arrowUpRight} size={20} className="shrink-0 text-ink-200 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                </li>
              </ul>

              <p className="t-label mt-8 text-ink-200">{c.redes}</p>
              <ul className="mt-3 grid grid-cols-3 gap-2">
                {[
                  { href: SOCIAL.instagram, label: "Instagram", el: <Icon d={ICONS.instagram} size={24} /> },
                  { href: SOCIAL.behance, label: "Behance", el: <span aria-hidden className="text-[22px] font-extrabold leading-6 tracking-[-0.02em]">Bē</span> },
                  { href: SOCIAL.linkedin, label: "LinkedIn", el: <Icon d={ICONS.linkedin} size={24} /> },
                ].map((s) => (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="flex min-h-[88px] flex-col items-center justify-center gap-2 rounded-xl border border-ink-700 px-2 py-3 text-ink-50 transition-colors hover:bg-ink-700"
                    >
                      {s.el}
                      <span className="text-base font-medium">{s.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-ink-100 p-6 dark:border-ink-700 lg:p-8">
              <p className="t-small font-semibold text-fg-strong">{c.calcQ}</p>
              <p className="t-small mt-2 text-ink-700 dark:text-ink-200">{c.calcP}</p>
              <LocalLink
                href="/calculadora"
                className="t-small mt-4 inline-flex min-h-[44px] items-center gap-2 font-semibold text-fg-strong underline decoration-ink-200 underline-offset-4 hover:decoration-fg-strong"
              >
                {c.calcLink}
                <Icon d={ICONS.arrowRight} size={18} />
              </LocalLink>
            </div>
          </aside>
        </div>

        {/* ===== O QUE ACONTECE DEPOIS ===== */}
        <section aria-labelledby="depois-titulo" className="mt-20 border-t border-ink-100 pt-14 dark:border-ink-700 lg:mt-32 lg:pt-20">
          <Label className="text-ink-700 dark:text-ink-200">{c.depoisLabel}</Label>
          <h2 id="depois-titulo" className="t-h1 mt-3 text-fg-strong">{c.depoisTitle}</h2>
          <ol className="mt-10 grid gap-4 md:grid-cols-3 lg:mt-14 lg:gap-6">
            {c.steps.map((s, i) => (
              <li key={s.t} className="flex flex-col rounded-2xl border border-ink-100 p-6 dark:border-ink-700 lg:p-8">
                <span aria-hidden className="w-fit rounded-pill bg-brand px-3 py-1 text-lg font-semibold leading-[22px] text-ink-50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="t-lead mt-6 font-semibold text-fg-strong">{s.t}</h3>
                <p className="t-small mt-3 text-ink-700 dark:text-ink-200">{s.d}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </div>
  );
}
