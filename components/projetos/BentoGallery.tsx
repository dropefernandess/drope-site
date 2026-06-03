"use client";

import { useEffect, useState } from "react";
import { ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * BentoGallery — galeria bento de 6 imagens com layout dense.
 *
 * Estratégia anti-buraco:
 *  - CSS Grid 3 cols com `grid-auto-flow: dense` (preenche gaps menores
 *    com items menores automaticamente)
 *  - Cada imagem é probada client-side (new Image()) pra detectar se é
 *    wide / portrait / square via aspect-ratio natural
 *  - Wide → col-span-2 (slot horizontal)
 *  - Portrait → row-span-2 (slot vertical)
 *  - Square → 1x1
 *  - Mobile: 1 col, sem spans
 *
 * Object-cover preenche o slot. Como o slot ESPELHA a orientação da
 * imagem, o corte é mínimo (a cropping ratio é próxima da natural).
 */
type GalleryItem = { src: string; alt: string };

type Orientation = "wide" | "portrait" | "square";

function classifyRatio(w: number, h: number): Orientation {
  const r = w / h;
  if (r > 1.3) return "wide";
  if (r < 0.85) return "portrait";
  return "square";
}

function spanClasses(o: Orientation): string {
  switch (o) {
    case "wide":     return "lg:col-span-2";
    case "portrait": return "lg:row-span-2";
    case "square":   return "";
  }
}

export function BentoGallery({ images }: { images: GalleryItem[] }) {
  // Pega só as primeiras 6 imagens
  const items = images.slice(0, 6);
  const [orientations, setOrientations] = useState<Record<number, Orientation>>({});
  const [errored, setErrored] = useState<Record<number, boolean>>({});

  useEffect(() => {
    items.forEach((item, i) => {
      const probe = new Image();
      probe.onload = () => {
        const o = classifyRatio(probe.naturalWidth, probe.naturalHeight);
        setOrientations((prev) => ({ ...prev, [i]: o }));
      };
      probe.onerror = () => {
        setErrored((prev) => ({ ...prev, [i]: true }));
      };
      probe.src = item.src;
    });
  }, [items]);

  return (
    <div
      className="grid grid-cols-1 lg:grid-cols-3 gap-3 auto-rows-[280px] md:auto-rows-[320px]"
      style={{ gridAutoFlow: "dense" }}
    >
      {items.map((img, i) => {
        const orientation = orientations[i] ?? "square";
        const isErrored = errored[i];

        return (
          <div
            key={i}
            className={cn(
              "relative overflow-hidden rounded-section bg-surface",
              spanClasses(orientation)
            )}
          >
            {isErrored ? (
              <FallbackPlaceholder src={img.src} index={i} total={items.length} />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                src={img.src}
                alt={img.alt}
                loading={i < 2 ? "eager" : "lazy"}
                decoding="async"
                onError={() => setErrored((p) => ({ ...p, [i]: true }))}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

function FallbackPlaceholder({ src, index, total }: { src: string; index: number; total: number }) {
  const segments = src.split("/").filter(Boolean);
  const slugProjeto = segments[1] ?? "projeto";
  const fileName = segments[segments.length - 1]?.replace(/\.\w+$/, "") ?? "?";
  const numero = `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`;

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface to-surface-2">
      <ImageIcon className="size-7 text-fg-mute" strokeWidth={1.5} />
      <div className="flex flex-col items-center gap-0.5 text-center px-4">
        <p className="text-[10px] uppercase tracking-wider font-medium text-fg-mute">
          Imagem em produção
        </p>
        <p className="text-[11px] text-fg-faint tabular-nums">
          {slugProjeto} · {numero} · {fileName}
        </p>
      </div>
    </div>
  );
}
