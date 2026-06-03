"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

/**
 * LocaleToggle — seletor dropdown com bandeiras SVG (BR/US).
 *
 * UX:
 *  - Trigger: bandeira ativa + chevron (~32px alto)
 *  - Dropdown: lista vertical com bandeira + nome do idioma
 *  - Fecha ao clicar fora ou apertar ESC
 *  - Animação suave de fade+scale
 *
 * SVGs em /public/flags/{br,us}.svg — sem dependência de emoji.
 */

const FLAGS: Record<Locale, { src: string; label: string; shortLabel: string }> = {
  pt: { src: "/flags/br.svg", label: "Português", shortLabel: "PT" },
  en: { src: "/flags/us.svg", label: "English",   shortLabel: "EN" },
};

export function LocaleToggle({ className }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Fecha clicando fora
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const active = FLAGS[locale];

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t("nav.toggle_lang_aria")}
        className={cn(
          "inline-flex items-center gap-1.5 rounded-pill border border-line bg-bg-soft pl-1 pr-2 py-1 transition hover:bg-surface",
          open && "bg-surface"
        )}
      >
        <span className="relative inline-block w-6 h-[18px] overflow-hidden rounded-[3px] shadow-sm ring-1 ring-ink-900/10">
          <Image src={active.src} alt="" fill sizes="24px" />
        </span>
        <ChevronDown
          className={cn(
            "size-3 text-fg-mute transition-transform",
            open && "rotate-180"
          )}
          strokeWidth={2.5}
        />
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          aria-label={t("nav.toggle_lang_aria")}
          className="absolute right-0 top-full mt-2 z-50 min-w-[160px] rounded-card border border-line bg-bg shadow-xl overflow-hidden"
          style={{
            animation: "drope-fade-down 160ms cubic-bezier(0.22, 1, 0.36, 1) both",
          }}
        >
          {(Object.keys(FLAGS) as Locale[]).map((loc) => {
            const f = FLAGS[loc];
            const isActive = loc === locale;
            return (
              <li key={loc}>
                <button
                  type="button"
                  role="option"
                  aria-selected={isActive}
                  onClick={() => {
                    setLocale(loc);
                    setOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-colors text-left",
                    isActive
                      ? "bg-surface-2 text-fg-strong"
                      : "text-fg-body hover:bg-surface hover:text-fg-strong"
                  )}
                >
                  <span className="relative inline-block w-6 h-[18px] overflow-hidden rounded-[3px] shadow-sm ring-1 ring-ink-900/10 shrink-0">
                    <Image src={f.src} alt="" fill sizes="24px" />
                  </span>
                  <span className="flex-1">{f.label}</span>
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-fg-mute tabular-nums">
                    {f.shortLabel}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
