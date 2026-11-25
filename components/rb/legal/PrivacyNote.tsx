"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink } from "@/components/i18n/LocalLink";

/** Aviso curto embaixo dos formulários, com link para a política de privacidade. */
const COPY = {
  pt: { agenda: "Seus dados servem só para marcar a conversa.", orcamento: "Seus dados servem só para responder o seu pedido.", link: "Ver a política de privacidade" },
  en: { agenda: "Your details are only used to book the call.", orcamento: "Your details are only used to reply to your request.", link: "See the privacy policy" },
};

export function PrivacyNote({ uso }: { uso: "agenda" | "orcamento" }) {
  const { locale } = useLocale();
  const c = COPY[locale];
  return (
    <p className="t-small mt-4 text-ink-700 dark:text-ink-200">
      {c[uso]}{" "}
      <LocalLink href="/privacidade" className="font-semibold text-fg-strong underline decoration-ink-200 underline-offset-4 hover:decoration-fg-strong">
        {c.link}
      </LocalLink>
    </p>
  );
}
