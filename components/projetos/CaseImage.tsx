"use client";

import Image from "next/image";
import { useState } from "react";
import { ImageIcon } from "lucide-react";

/**
 * CaseImage — wrapper de next/image com fallback elegante quando o
 * arquivo não existe (placeholder em produção).
 *
 * Uso idêntico ao <Image fill> mas em caso de 404 mostra um card
 * cinza com label do que vai ali, indicando ao Drope qual imagem
 * precisa substituir.
 */
type Props = {
  src: string;
  alt: string;
  sizes?: string;
  quality?: number;
  index?: number;
  total?: number;
  className?: string;
};

export function CaseImage({
  src,
  alt,
  sizes = "(min-width:1024px) 60vw, 100vw",
  quality = 90,
  index,
  total,
  className,
}: Props) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    // Pega o slug do projeto do path pra mostrar como label
    const segments = src.split("/").filter(Boolean);
    const slugProjeto = segments[1] ?? "projeto"; // ex: bada-bing
    const fileName = segments[segments.length - 1]?.replace(/\.\w+$/, "") ?? "?";
    const numero = index != null && total != null ? `${String(index + 1).padStart(2, "0")}/${String(total).padStart(2, "0")}` : fileName;

    return (
      <div className={`flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-surface to-surface-2 ${className ?? ""}`}>
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
    <Image
      src={src}
      alt={alt}
      fill
      quality={quality}
      sizes={sizes}
      className={className ?? "object-cover"}
      onError={() => setErrored(true)}
    />
  );
}
