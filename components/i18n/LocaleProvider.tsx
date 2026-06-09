"use client";

import { createContext, useCallback, useContext, useMemo } from "react";
import { usePathname } from "next/navigation";
import {
  DEFAULT_LOCALE,
  dictionaries,
  type DictionaryKey,
  type Locale,
} from "@/lib/i18n/dictionaries";

/**
 * i18n URL-based: o locale é DERIVADO do pathname.
 *  - /en, /en/sobre, /en/projetos/...  → "en"
 *  - tudo o mais (raiz)                 → "pt"
 *
 * Vantagens vs cookie:
 *  - Sem flash de hidratação (usePathname resolve no SSR e no client)
 *  - URL é a fonte da verdade → compartilhável, indexável, com hreflang
 *  - Voltar/avançar do browser respeita o idioma
 */

type LocaleContextValue = {
  locale: Locale;
  t: (key: DictionaryKey) => string;
  /** Prefixa um path canônico (PT) com /en quando o locale é "en". */
  lhref: (path: string) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

/** Deriva o locale a partir do pathname. */
export function localeFromPath(pathname: string | null): Locale {
  if (!pathname) return DEFAULT_LOCALE;
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pt";
}

/** Prefixa path canônico com /en quando necessário (puro, testável). */
export function localizeHref(path: string, locale: Locale): string {
  // Âncoras, URLs externas, mailto/tel: retorna como veio
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.startsWith("/#")
  ) {
    return path;
  }
  if (locale === "pt") return path;
  // en: prefixa /en
  if (path === "/") return "/en";
  return `/en${path}`;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const locale = localeFromPath(pathname);

  const t = useCallback(
    (key: DictionaryKey) =>
      dictionaries[locale][key] ?? dictionaries[DEFAULT_LOCALE][key] ?? key,
    [locale]
  );

  const lhref = useCallback((path: string) => localizeHref(path, locale), [locale]);

  const value = useMemo(
    () => ({ locale, t, lhref }),
    [locale, t, lhref]
  );

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

/** Hook pra usar a tradução em qualquer componente client. */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    return {
      locale: DEFAULT_LOCALE,
      t: (key) => dictionaries[DEFAULT_LOCALE][key] ?? key,
      lhref: (path) => path,
    };
  }
  return ctx;
}
