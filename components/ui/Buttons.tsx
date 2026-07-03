"use client";

import { ArrowUpRight } from "lucide-react";
import { LocalLink } from "@/components/i18n/LocalLink";
import { cn } from "@/lib/utils";

/**
 * Botões modernos do DS — Fase 0 (revisada).
 *
 * Identidade INTOCADA (brand #DE2828, Inter, pill) — o upgrade é de
 * INTERAÇÃO, no vocabulário das referências (unkern/Framer):
 *
 *  - fill-up: camada de cor que sobe de baixo no hover (translate-y, GPU)
 *  - text-slide: o label desliza pra cima e a cópia entra por baixo
 *  - seta com micro-translação diagonal (padrão já usado no site)
 *
 * Tudo CSS puro via group-hover → zero JS por interação, zero jank.
 * Respeita prefers-reduced-motion (transições viram instantâneas via
 * global do globals.css).
 */

type ButtonBaseProps = {
  href: string;
  children: React.ReactNode;
  /** Mostra a seta ↗ com micro-translação no hover. */
  arrow?: boolean;
  className?: string;
  /** target/rel pra links externos. */
  external?: boolean;
};

/** Label com efeito text-slide (duas cópias empilhadas). */
function SlideLabel({ children }: { children: React.ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden
        className="absolute inset-0 block translate-y-full transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

/** Primário — pill brand com fill escuro subindo no hover. */
export function ButtonPrimary({ href, children, arrow = true, className, external }: ButtonBaseProps) {
  return (
    <LocalLink
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-brand px-6 py-3.5 text-sm font-semibold text-brand-fg shadow-sm shadow-brand/20",
        className
      )}
    >
      {/* fill que sobe */}
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-pill bg-brand-deep transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      />
      <span className="relative"><SlideLabel>{children}</SlideLabel></span>
      {arrow && (
        <ArrowUpRight
          className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      )}
    </LocalLink>
  );
}

/** Secundário — outline com fill de surface subindo no hover. */
export function ButtonSecondary({ href, children, arrow = false, className, external }: ButtonBaseProps) {
  return (
    <LocalLink
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-pill border border-line bg-bg-soft px-6 py-3.5 text-sm font-semibold text-fg-strong",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-pill bg-surface-2 transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      />
      <span className="relative"><SlideLabel>{children}</SlideLabel></span>
      {arrow && (
        <ArrowUpRight
          className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      )}
    </LocalLink>
  );
}

/** Ghost — link textual com underline brand que cresce da esquerda. */
export function ButtonGhost({ href, children, arrow = true, className, external }: ButtonBaseProps) {
  return (
    <LocalLink
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex items-center gap-1.5 text-sm font-medium text-fg-strong transition-colors hover:text-brand",
        className
      )}
    >
      <span className="relative">
        {children}
        <span
          aria-hidden
          className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"
        />
      </span>
      {arrow && (
        <ArrowUpRight
          className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      )}
    </LocalLink>
  );
}

/** Dark — pill escura (usado em CTAs sobre fundo claro), fill brand sobe. */
export function ButtonDark({ href, children, arrow = true, className, external }: ButtonBaseProps) {
  return (
    <LocalLink
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-fg-strong px-6 py-3.5 text-sm font-semibold text-bg",
        className
      )}
    >
      <span
        aria-hidden
        className="absolute inset-0 translate-y-full rounded-pill bg-brand transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
      />
      <span className="relative"><SlideLabel>{children}</SlideLabel></span>
      {arrow && (
        <ArrowUpRight
          className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          strokeWidth={2.5}
        />
      )}
    </LocalLink>
  );
}
