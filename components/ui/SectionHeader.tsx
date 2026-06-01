import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * SectionHeader — cabeçalho editorial padronizado, anti-IA.
 *
 * SEM itálico-em-palavra-chave, SEM serif. Hierarquia vem de:
 *  - rótulo mono N. 0X
 *  - hair-line tipográfica
 *  - peso radical (Inter Black) no título
 *  - aside opcional separado por column-rule
 *
 * API legada (overline + title + subtitle) ainda funciona; novo formato
 * usa chapter + eyebrow + title (ReactNode) + aside.
 */
type LegacyProps = {
  overline?: string;
  title: string;
  subtitle?: string;
  className?: string;
  align?: "left" | "center";
};

type EditorialProps = {
  chapter: string;             // "N. 02"
  eyebrow: string;             // "SERVIÇOS"
  title: ReactNode;            // pode misturar Inter Black + Thin
  aside?: ReactNode;
  className?: string;
};

type Props = LegacyProps | EditorialProps;

function isEditorial(p: Props): p is EditorialProps {
  return (p as EditorialProps).chapter !== undefined;
}

export function SectionHeader(props: Props) {
  // —— Editorial mode (novo padrão) ——
  if (isEditorial(props)) {
    const { chapter, eyebrow, title, aside, className } = props;
    return (
      <header className={cn("flex flex-col gap-8", className)}>
        <div className="hair pb-3 flex items-center justify-between gap-4">
          <p className="label-mono">
            <span className="text-fg-strong mr-3">{chapter}</span>
            <span>{eyebrow}</span>
          </p>
          <p className="label-mono hidden md:block">Drope · Vol. 03</p>
        </div>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12 items-start">
          <h2 className="lg:col-span-8 text-h-1 text-fg-strong text-balance">
            {title}
          </h2>
          {aside && (
            <div className="lg:col-span-4 text-body max-w-prose lg:pt-3 lg:col-rule lg:pl-6">
              {aside}
            </div>
          )}
        </div>
      </header>
    );
  }

  // —— Legacy mode (compat) ——
  const { overline, title, subtitle, className, align = "left" } = props;
  return (
    <header
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {overline ? <p className="label-mono">{overline}</p> : null}
      <h2 className="text-h-1 max-w-[800px] text-balance">{title}</h2>
      {subtitle ? <p className="text-body max-w-prose">{subtitle}</p> : null}
    </header>
  );
}
