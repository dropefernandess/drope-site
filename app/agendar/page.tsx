import type { Metadata } from "next";
import { Agendar } from "@/components/rb/agendar/Agendar";
import { agendaConfigurada } from "@/lib/agenda/google";

/**
 * /agendar — Contato e agendamento (rebrand 2026).
 * Agenda própria (Google Agenda) quando as credenciais existem; senão o
 * Cal.com inline. Conteúdo em components/rb/agendar/Agendar.tsx.
 */
export const metadata: Metadata = {
  title: "Contato e agendamento",
  description:
    "Agende 30 minutos de conversa, sem custo, pelo Google Meet. Ou fale direto comigo por e-mail, WhatsApp, Instagram, Behance ou LinkedIn.",
  alternates: {
    canonical: "/agendar",
    languages: { "pt-BR": "/agendar", en: "/en/agendar" },
  },
};

export default function AgendarPage() {
  return <Agendar propria={agendaConfigurada()} />;
}
