"use client";

import { LocalLink } from "@/components/i18n/LocalLink";
import { cn } from "@/lib/utils";

/**
 * Peças básicas do rebrand 2026 (Figma: página SITE).
 * Tipografia em globals.css (.t-*), botão da marca em .rb-btn.
 */

/** Seta da marca (ASSETS do brandbook), 20×16. */
export function BrandArrow({ className }: { className?: string }) {
  return (
    <svg width="20" height="16" viewBox="0 0 20 16" fill="currentColor" aria-hidden className={className}>
      <path d="M12 0 10.6 1.4 16.2 7H0v2h16.2l-5.6 5.6L12 16l8-8Z" />
    </svg>
  );
}

type BtnVariant = "escuro" | "contorno" | "contorno-vermelho" | "principal";

// Nomes literais para o Tailwind não descartar as classes no build.
const VARIANT_CLS: Record<BtnVariant, string> = {
  escuro: "rb-btn--escuro",
  contorno: "rb-btn--contorno",
  "contorno-vermelho": "rb-btn--contorno-vermelho",
  principal: "rb-btn--principal",
};

/** Botão da marca: corpo com canto cortado + bloco da seta. A largura acompanha o texto. */
export function BrandButton({
  href,
  children,
  variant = "escuro",
  full,
  className,
  external,
}: {
  href: string;
  children: React.ReactNode;
  variant?: BtnVariant;
  full?: boolean;
  className?: string;
  external?: boolean;
}) {
  const cls = cn("rb-btn", VARIANT_CLS[variant], full && "rb-btn--full", className);
  const inner = (
    <>
      <span>{children}</span>
      <span className="rb-btn__block">
        <BrandArrow />
      </span>
    </>
  );
  if (external || href.startsWith("http") || href.startsWith("mailto:")) {
    return (
      <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
        {inner}
      </a>
    );
  }
  return (
    <LocalLink href={href} className={cls}>
      {inner}
    </LocalLink>
  );
}

/** Rótulo em caixa alta (Drope/Rótulo). */
export function Label({ children, className, as: Tag = "p" }: { children: React.ReactNode; className?: string; as?: "p" | "span" | "h2" | "h3" }) {
  return <Tag className={cn("t-label text-ink-400", className)}>{children}</Tag>;
}

/** Etiqueta de categoria com contorno (cards dos trabalhos). */
export function Chip({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("inline-flex items-center rounded-pill border border-ink-200 px-3 py-1.5 text-sm font-medium tracking-[-0.01em] text-ink-700 dark:text-ink-100", className)}>
      {children}
    </span>
  );
}

/** Ícone Lucide inline (stroke), para não depender do pacote nos pontos fixos. */
export function Icon({ d, size = 16, className }: { d: string; size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} dangerouslySetInnerHTML={{ __html: d }} />
  );
}

export const ICONS = {
  arrowUpRight: '<path d="M7 7h10v10"/><path d="M7 17 17 7"/>',
  arrowDown: '<path d="M12 5v14"/><path d="m19 12-7 7-7-7"/>',
  arrowRight: '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  menu: '<line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="18" y2="18"/>',
  close: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  grid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
  scan: '<path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/>',
  instagram: '<rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>',
  linkedin: '<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/>',
};

/** Links externos da marca. */
export const SOCIAL = {
  instagram: "https://instagram.com/drope.fernandes",
  behance: "https://behance.net/dropefernandes",
  linkedin: "https://linkedin.com/in/dropefernandes",
  email: "contato@dropefernandes.com",
  whatsapp: "https://wa.me/5532998057750",
  phone: "(32) 9 9805-7750",
};
