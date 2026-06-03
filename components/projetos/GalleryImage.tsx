"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";

/**
 * GalleryImage — wrapper de <img> regular pra masonry (CSS columns).
 *
 * Por que <img> em vez de next/image:
 *  - Masonry com aspect natural NÃO funciona com fill (precisa aspect-ratio
 *    pré-definido)
 *  - next/image com width+height obriga conhecer dimensões reais
 *  - <img> regular respeita aspect intrinsic da imagem sem cortar nem deixar
 *    buracos. Performance hit é mínimo em página de case (não é LCP).
 *
 * Fallback elegante quando o arquivo não existe — mostra placeholder
 * com slug + número, igual ao CaseImage.
 */
type Props = {
  src: string;
  alt: string;
  index?: number;
  total?: number;
  loading?: "lazy" | "eager";
};

export function GalleryImage({ src, alt, index, total, loading = "lazy" }: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    const segments = src.split("/").filter(Boolean);
    const slugProjeto = segments[1] ?? "projeto";
    const fileName = segments[segments.length - 1]?.replace(/\.\w+$/, "") ?? "?";
    const numero =
      index != null && total != null
        ? `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}`
        : fileName;

    return (
      <div className="aspect-[4/3] w-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface to-surface-2 rounded-section">
        <ImageIcon className="size-7 text-fg-mute" strokeWidth={1.5} />
        <div className="flex flex-col items-center gap-0.5 text-center px-4">
          <p className="text-[10px] uppercase tracking-wider font-medium text-fg-mute">
            Imagem em produção
          </p>
          <p className="text-[11px] text-fg-faint tabular-nums">
            {slugProjeto} · {numero}
          </p>
        </div>
      </div>
    );
  }

  return (
    /* eslint-disable-next-line @next/next/no-img-element */
    <img
      src={src}
      alt={alt}
      loading={loading}
      decoding="async"
      onError={() => setErrored(true)}
      className="block w-full h-auto rounded-section bg-surface"
    />
  );
}
