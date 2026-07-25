/**
 * V2 SYSTEM — primitivos de "O Ponto de Silêncio".
 *
 * Tudo que existe no /v2 é composto destes componentes. Se um layout precisa
 * de um valor que não sai daqui ou de v2-tokens.css, o layout está errado.
 *
 * Os três gestos (DIRECAO-CRIATIVA-V2.md §4.1):
 *   ① Snap    — entra deslocado e assenta
 *   ② Rule    — linha 1px que se desenha; o alinhamento visível
 *   ③ Trava   — pin com scrub, existe em UMA seção (Trabalhos)
 *
 * Motion é dirigido por classe (`.is-in`), aplicada por:
 *   - timeline de entrada, no hero (useEnterTimeline)
 *   - ScrollTrigger.batch, abaixo da dobra (V2Client)
 * Estados iniciais só existem sob `.v2-ready` — sem JS, tudo aparece.
 */

import { Fragment, type ElementType, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* ============================================================
   GRADE
   Lei: conteúdo NUNCA ocupa as 12 colunas. Texto vive em 5–7.
   ============================================================ */

export function Grid({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}) {
  return <Tag className={cn("v2-grid", className)}>{children}</Tag>;
}

/* ============================================================
   SEÇÃO — aplica o ritmo vertical e a superfície
   ============================================================ */

export function Section({
  children,
  id,
  surface = "base",
  className,
}: {
  children: ReactNode;
  id?: string;
  surface?: "base" | "inverse";
  className?: string;
}) {
  return (
    <section
      id={id}
      data-surface={surface === "inverse" ? "inverse" : undefined}
      className={cn("v2-section", className)}
      style={{ scrollMarginTop: "var(--v2-16)" }}
    >
      {children}
    </section>
  );
}

/* ============================================================
   ① SNAP
   `step` é a posição na timeline de entrada (hero) — o V2Client
   revela em ordem. Abaixo da dobra, `step` é ignorado.
   ============================================================ */

export function Snap({
  children,
  step = 0,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  step?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag data-snap="" data-step={step} className={className}>
      {children}
    </Tag>
  );
}

/* ============================================================
   ② RÉGUA
   ============================================================ */

export function Rule({
  step = 0,
  className,
  tone = "subtle",
}: {
  step?: number;
  className?: string;
  tone?: "subtle" | "strong" | "accent";
}) {
  return (
    <div
      aria-hidden="true"
      data-step={step}
      className={cn("v2-rule", className)}
      style={{
        background:
          tone === "accent"
            ? "var(--v2-accent)"
            : tone === "strong"
              ? "var(--v2-border-strong)"
              : "var(--v2-border-subtle)",
      }}
    />
  );
}

/* ============================================================
   HEADLINE COM MÁSCARA
   Reveal por LINHA, não por palavra. O stagger palavra-a-palavra
   é a assinatura nº1 de landing gerada — e leva 3s pra montar.
   ============================================================ */

export function MaskedHeading({
  lines,
  step = 0,
  className,
  as: Tag = "h1",
}: {
  /** Cada item é uma linha. ReactNode permite destacar palavras. */
  lines: ReactNode[];
  step?: number;
  className?: string;
  as?: ElementType;
}) {
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <Fragment key={i}>
          <span className="v2-line" data-step={step + i}>
            <span>{line}</span>
          </span>
          {/* Espaço real entre as linhas: sem ele o nome acessível do
              heading vira "durare entrego" — as linhas são block, então
              o espaço colapsa visualmente e não custa nada. */}
          {i < lines.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/* ============================================================
   EYEBROW — o degrau tipográfico que faltava
   ============================================================ */

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("v2-eyebrow", className)}>{children}</div>;
}

/* ============================================================
   AÇÕES
   <a> para navegação, <button> para ação. Nunca <div onClick>.
   ============================================================ */

export function Action({
  href,
  children,
  variant = "solid",
  className,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: "solid" | "accent" | "quiet";
  className?: string;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className">) {
  return (
    <a href={href} className={cn("v2-action", `v2-action--${variant}`, className)} {...rest}>
      {children}
    </a>
  );
}

/* ============================================================
   BLOCO DE DADOS — densidade precisa como decoração legítima.
   Tudo aqui é dado real. Se não for real, não entra.
   ============================================================ */

export function DataBlock({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  // <ul>, não <dl>: aqui o valor não é "termo" e o rótulo não é "definição".
  // Forçar dt/dd inverteria a semântica só pra ganhar uma tag mais bonita.
  return (
    <ul className={cn("v2-data", className)}>
      {items.map((it) => (
        <li key={it.label} className="v2-data__row">
          <span className="v2-num v2-data__value">{it.value}</span>
          <span className="v2-data__label">{it.label}</span>
        </li>
      ))}
    </ul>
  );
}
