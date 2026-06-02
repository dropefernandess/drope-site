"use client";

import { useEffect, useState } from "react";
import type { Bloco } from "@/content/posts";
import { cn } from "@/lib/utils";
import { slugify } from "@/lib/slugify";

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
 * PostTOC — sticky lateral em desktop. Mostra lista de H2/H3 com
 * seção ativa highlighted via IntersectionObserver.
 *
 * Em mobile, fica escondido (texto longo + nav inferior já bastam).
 */
export function PostTOC({ blocos }: { blocos: Bloco[] }) {
  const headings = extract(blocos);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
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
    <nav
      aria-label="Sumário do post"
      className="hidden lg:block sticky top-28 self-start"
    >
      <p className="label-mono mb-4 flex items-center gap-2">
        <span className="size-1 rounded-full bg-brand" />
        Neste texto
      </p>
      <ol className="flex flex-col gap-2 text-sm border-l border-line">
        {headings.map((h) => {
          const isActive = activeId === h.id;
          return (
            <li key={h.id} className={cn(h.level === 3 && "pl-4")}>
              <a
                href={`#${h.id}`}
                className={cn(
                  "block border-l-2 -ml-px pl-4 py-1.5 transition-colors",
                  isActive
                    ? "border-brand text-fg-strong font-medium"
                    : "border-transparent text-fg-mute hover:text-fg-strong"
                )}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
