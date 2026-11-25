import type { Metadata } from "next";
import { PrivacyPage } from "@/components/rb/legal/PrivacyPage";

/** /privacidade — Política de privacidade (LGPD). Conteúdo em components/rb/legal/PrivacyPage.tsx. */
export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "O que acontece com os dados que você passa pelo site: o que eu recebo, para que uso, com quem compartilho e como pedir para corrigir ou apagar.",
  alternates: {
    canonical: "/privacidade",
    languages: { "pt-BR": "/privacidade", en: "/en/privacidade" },
  },
};

export default function PrivacidadePage() {
  return <PrivacyPage />;
}
