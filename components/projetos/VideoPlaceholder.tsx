"use client";

import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";

/**
 * VideoPlaceholder — primeira mídia em cases UI/UX e Web.
 *
 * Tenta carregar /projetos/{slug}/video.mp4 (ou .webm). Se não existir,
 * mostra placeholder elegante com play icon + label "Vídeo em produção".
 *
 * Quando o Drope subir o vídeo, é só dropar o file em
 *   /public/projetos/{slug}/video.mp4
 * e o componente carrega sozinho.
 */
export function VideoPlaceholder({
  slug,
  poster,
  alt,
}: {
  slug: string;
  poster?: string;        // image opcional pra mostrar enquanto carrega
  alt: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideo, setHasVideo] = useState<boolean | null>(null); // null = checking, false = no file, true = exists

  useEffect(() => {
    // HEAD request pra checar se o arquivo existe sem baixar
    const url = `/projetos/${slug}/video.mp4`;
    fetch(url, { method: "HEAD" })
      .then((r) => setHasVideo(r.ok))
      .catch(() => setHasVideo(false));
  }, [slug]);

  if (hasVideo === true) {
    return (
      <video
        ref={videoRef}
        src={`/projetos/${slug}/video.mp4`}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        aria-label={alt}
        className="absolute inset-0 size-full object-cover"
      />
    );
  }

  // Placeholder (hasVideo === null OR === false)
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-gradient-to-br from-fg-strong to-ink-700 text-bg">
      <div className="size-16 rounded-full bg-brand/95 flex items-center justify-center shadow-lg shadow-brand/40">
        <Play className="size-6 ml-1" fill="currentColor" strokeWidth={0} />
      </div>
      <div className="flex flex-col items-center gap-1 text-center px-4">
        <p className="text-[10px] uppercase tracking-wider font-medium text-bg/60">
          Vídeo em produção
        </p>
        <p className="text-sm font-medium text-bg/85">
          {slug} · será adicionado em breve
        </p>
      </div>
    </div>
  );
}
