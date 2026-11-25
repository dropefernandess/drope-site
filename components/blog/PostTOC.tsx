"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Bloco } from "@/content/posts";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slugify";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Icon, ICONS, Label } from "@/components/rb/ui";
import { BLOG_COPY } from "@/components/rb/blog/copy";

type Heading = { id: string; text: string; level: 2 | 3 };

function extract(blocos: Bloco[]): Heading[] {
  return blocos
    .filter((b): b is { tipo: "h2"; texto: string } | { tipo: "h3"; texto: string } =>
      b.tipo === "h2" || b.tipo === "h3"
    )
    .map((b) => ({
      id: slugify(b.texto),
      text: b.texto,
      level: b.tipo === "h2" ? 2 : 3,
    }));
}

/**
 * PostTOC — sumário do post (rebrand 2026).
 *  - Desktop (lg+): coluna lateral fixa (sticky), seção ativa marcada
 *    via IntersectionObserver.
 *  - Celular: bloco recolhível acima do texto (<details>), fecha ao
 *    escolher uma seção.
 */
export function PostTOC({ blocos }: { blocos: Bloco[] }) {
  const { locale } = useLocale();
  const c = BLOG_COPY[locale];
  const headings = useMemo(() => extract(blocos), [blocos]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const details = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // pega a seção mais alta visível
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      {
        rootMargin: "-100px 0px -60% 0px",
        threshold: 0.1,
      }
    );

    headings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Celular: recolhível */}
      <nav aria-label={c.tocAria} className="mb-10 lg:hidden">
        <details ref={details} className="group/toc rounded-2xl border border-ink-100 dark:border-ink-700">
          <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 px-5 py-3 [&::-webkit-details-marker]:hidden">
            <span className="flex items-baseline gap-3">
              <span className="t-label text-fg-strong">{c.toc}</span>
              <span className="t-small text-ink-700 dark:text-ink-200">{c.tocCount(headings.length)}</span>
            </span>
            <Icon d={ICONS.chevronDown} size={20} className="shrink-0 text-fg-strong transition-transform group-open/toc:rotate-180 motion-reduce:transition-none" />
          </summary>
          <ol className="flex flex-col border-t border-ink-100 px-5 py-3 dark:border-ink-700">
            {headings.map((h) => (
              <li key={h.id} className={cn(h.level === 3 && "pl-4")}>
                <a
                  href={`#${h.id}`}
                  onClick={() => details.current?.removeAttribute("open")}
                  lang="pt-BR"
                  className="block py-2.5 text-base leading-snug text-ink-700 hover:text-fg-strong dark:text-ink-200 dark:hover:text-ink-50"
                >
                  {h.text}
                </a>
              </li>
            ))}
          </ol>
        </details>
      </nav>

      {/* Desktop: lateral fixa */}
      <nav aria-label={c.tocAria} className="sticky top-28 hidden self-start lg:block">
        <Label className="text-ink-700 dark:text-ink-200">{c.toc}</Label>
        <ol className="mt-5 flex flex-col border-l border-ink-100 dark:border-ink-700">
          {headings.map((h) => {
            const isActive = activeId === h.id;
            return (
              <li key={h.id}>
                <a
                  href={`#${h.id}`}
                  aria-current={isActive ? "location" : undefined}
                  lang="pt-BR"
                  className={cn(
                    "-ml-px block border-l-2 py-2 pr-2 text-base leading-snug tracking-[-0.01em] transition-colors motion-reduce:transition-none",
                    h.level === 3 ? "pl-8" : "pl-4",
                    isActive
                      ? "border-brand font-medium text-fg-strong"
                      : "border-transparent text-ink-700 hover:text-fg-strong dark:text-ink-200 dark:hover:text-ink-50"
                  )}
                >
                  {h.text}
                </a>
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
