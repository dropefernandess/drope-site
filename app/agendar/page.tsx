import type { Metadata } from "next";
import { Agendar } from "@/components/rb/agendar/Agendar";

/**
 * /agendar — Contato e agendamento (rebrand 2026).
 * Cal.com inline (drope/30min), contato direto e o que acontece depois.
 * O embed e o conteúdo ficam em components/rb/agendar/Agendar.tsx.
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
  return <Agendar />;
}
