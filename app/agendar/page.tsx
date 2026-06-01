"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, Mail, Video } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";

/**
 * /agendar — Cal.com embed inline.
 *
 * Placeholder handle = "dropefernandes/30min". Quando o Drope criar a conta
 * Cal.com, basta trocar o `CAL_LINK` abaixo.
 *
 * Como funciona:
 *  - Carrega o script @calcom/embed-snippet via CDN
 *  - Inicializa namespace "30min"
 *  - Renderiza o widget inline dentro do <div data-cal-link>
 */

// Handle real do Cal.com — Pedro Fernandes (Drope)
// Event types disponíveis: drope/30min · drope/15min
const CAL_LINK = "drope/30min";

export default function AgendarPage() {
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

    const Cal = (window as any).Cal;
    Cal("init", "30min", { origin: "https://cal.com" });
    Cal.ns["30min"]("inline", {
      elementOrSelector: "#cal-inline",
      config: { layout: "month_view", theme: "auto" },
      calLink: CAL_LINK,
    });
    Cal.ns["30min"]("ui", {
      hideEventTypeDetails: false,
      layout: "month_view",
    });
  }, []);

  return (
    <div className="pt-24 md:pt-28 pb-24">
      <Container as="div" className="flex flex-col gap-12">

        {/* HEADER */}
        <section className="flex flex-col gap-10">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Agendar uma conversa
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <Clock className="size-3 text-fg-mute" strokeWidth={2.5} />
              30 minutos · Sem custo
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8">
              <h1 className="text-display text-fg-strong text-balance">
                Vamos conversar.
              </h1>
            </Reveal>
            <Reveal delay={0.2} className="lg:col-span-4">
              <p className="text-body max-w-prose">
                Escolha um horário que funciona pra você. Conversa de
                30 minutos pra entender seu projeto e ver se faz sentido
                a gente trabalhar junto.
              </p>
            </Reveal>
          </div>
        </section>

        {/* CALENDÁRIO INLINE + ASIDE COM INFOS */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">

          {/* Aside com infos */}
          <Reveal className="lg:col-span-4 lg:order-2 flex flex-col gap-3">
            <div className="rounded-section border border-line bg-bg-soft p-6 flex flex-col gap-3">
              <Video className="size-5 text-brand" strokeWidth={2} />
              <p className="text-h-3 text-fg-strong">Reunião por vídeo</p>
              <p className="text-body-sm">
                Google Meet ou Zoom (sua escolha). Link enviado por email
                após a confirmação.
              </p>
            </div>
            <div className="rounded-section border border-line bg-bg-soft p-6 flex flex-col gap-3">
              <Clock className="size-5 text-brand" strokeWidth={2} />
              <p className="text-h-3 text-fg-strong">30 minutos</p>
              <p className="text-body-sm">
                Tempo suficiente pra entender seu contexto, alinhar
                expectativas e ver se faz sentido continuar.
              </p>
            </div>
            <div className="rounded-section bg-fg-strong text-bg p-6 flex flex-col gap-3">
              <Mail className="size-5 text-brand" strokeWidth={2} />
              <p className="text-h-3 text-bg">Prefere por escrito?</p>
              <p className="text-sm text-bg/70">
                Manda os detalhes no email. Respondo em até 24h.
              </p>
              <Link
                href="mailto:contato@dropefernandes.com"
                className="group inline-flex items-center justify-between gap-2 rounded-pill bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition mt-1"
              >
                contato@dropefernandes.com
                <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
            </div>
          </Reveal>

          {/* Cal.com embed inline */}
          <Reveal delay={0.1} className="lg:col-span-8 lg:order-1 rounded-section border border-line bg-bg-soft p-3 overflow-hidden">
            <div
              id="cal-inline"
              className="min-h-[640px] w-full"
              style={{ overflow: "hidden", borderRadius: "16px" }}
            />
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
