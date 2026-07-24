"use client";

import { LocalLink } from "@/components/i18n/LocalLink";
import { cn } from "@/lib/utils";

/**
 * V2Btn — botão no vocabulário dos prompts de referência (Kubric/Pallet):
 * superfície SÓLIDA, raio 12px, seta ↗ de 8px, hover só de cor
 * (sem fill-up, sem scale, sem sombra). Nada do DS antigo aqui.
 */

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "brand" | "light" | "ghost";
  arrow?: boolean;
  className?: string;
  external?: boolean;
};

const variants = {
  dark: "bg-fg-strong text-bg hover:bg-ink-700",
  brand: "bg-brand text-brand-fg hover:bg-brand-deep",
  light: "bg-white text-ink-900 hover:bg-ink-50",
  ghost: "bg-transparent text-fg-strong hover:bg-fg-strong/5",
};

export function V2Btn({
  href,
  children,
  variant = "dark",
  arrow = true,
  className,
  external,
}: Props) {
  return (
    <LocalLink
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center gap-2.5 rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors duration-200",
        variants[variant],
        className
      )}
    >
      {children}
      {arrow && (
        <svg viewBox="0 0 8 8" className="size-2" fill="none" aria-hidden>
          <path
            d="M1 7L7 1M7 1H2M7 1V6"
            stroke="currentColor"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </LocalLink>
  );
}
