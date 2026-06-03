"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { DEFAULT_LOCALE, dictionaries, type DictionaryKey, type Locale } from "@/lib/i18n/dictionaries";

const COOKIE_NAME = "drope-locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 ano

type LocaleContextValue = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: DictionaryKey) => string;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(DEFAULT_LOCALE);

  // Lê cookie no mount
  useEffect(() => {
    if (typeof document === "undefined") return;
    const cookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE_NAME}=`));
    if (cookie) {
      const val = cookie.split("=")[1] as Locale;
      if (val === "pt" || val === "en") {
        setLocaleState(val);
        document.documentElement.lang = val === "pt" ? "pt-BR" : "en";
      }
    }
  }, []);

  const setLocale = useCallback((l: Locale) => {
    setLocaleState(l);
    document.cookie = `${COOKIE_NAME}=${l}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
    document.documentElement.lang = l === "pt" ? "pt-BR" : "en";
  }, []);

  const t = useCallback(
    (key: DictionaryKey) => {
      return dictionaries[locale][key] ?? dictionaries[DEFAULT_LOCALE][key] ?? key;
    },
    [locale]
  );

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LocaleContext.Provider>
  );
}

/** Hook pra usar a tradução em qualquer componente client. */
export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Fallback graceful — retorna PT sem provider (server components,
    // testes, ou componentes fora do tree).
    return {
      locale: DEFAULT_LOCALE,
      setLocale: () => {},
      t: (key) => dictionaries[DEFAULT_LOCALE][key] ?? key,
    };
  }
  return ctx;
}
