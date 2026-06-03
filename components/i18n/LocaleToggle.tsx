"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { cn } from "@/lib/utils";

/**
 * LocaleToggle — bandeiras BR / US.
 *
 * Aparência: pill com 2 bandeiras emoji. A bandeira do idioma ATIVO
 * fica destacada; clicar na outra alterna. Usa emoji 🇧🇷 / 🇺🇸
 * porque renderiza nativo em todos os browsers modernos.
 */
export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      role="group"
      aria-label={t("nav.toggle_lang_aria")}
      className={cn(
        "inline-flex items-center gap-0.5 rounded-pill border border-line bg-bg-soft p-0.5",
        className
      )}
    >
      <button
        type="button"
        onClick={() => setLocale("pt")}
        aria-pressed={locale === "pt"}
        aria-label="Português"
        title="Português"
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-full text-base leading-none transition-all",
          locale === "pt"
            ? "bg-fg-strong shadow-sm scale-100"
            : "opacity-50 hover:opacity-100 scale-90 hover:scale-100"
        )}
      >
        <span aria-hidden>🇧🇷</span>
      </button>
      <button
        type="button"
        onClick={() => setLocale("en")}
        aria-pressed={locale === "en"}
        aria-label="English"
        title="English"
        className={cn(
          "inline-flex size-7 items-center justify-center rounded-full text-base leading-none transition-all",
          locale === "en"
            ? "bg-fg-strong shadow-sm scale-100"
            : "opacity-50 hover:opacity-100 scale-90 hover:scale-100"
        )}
      >
        <span aria-hidden>🇺🇸</span>
      </button>
    </div>
  );
}
