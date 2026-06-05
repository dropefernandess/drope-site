"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import type { LottieRefCurrentProps } from "lottie-react";

/**
 * LottieIcon — wrapper pra Lottie animations (JSON).
 *
 * Importação dinâmica (SSR off) pra não pesar build inicial. O lottie-react
 * só carrega quando o componente renderiza no client.
 *
 * USO:
 *   import animationData from "@/lottie/heart.json";
 *   <LottieIcon animationData={animationData} size={48} />
 *
 * COMO BAIXAR JSONs:
 *   - lottiefiles.com/free-animations (gratuito)
 *   - Filtrar por "Free for personal & commercial use"
 *   - Download "Lottie JSON" (não dotLottie)
 *   - Salvar em /lottie/{name}.json
 *
 * PROPS:
 *   - playOnHover: anima só no hover (true) ou em loop (false)
 *   - playOnce: anima 1× no mount e para
 */
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animationData: any;
  size?: number;
  loop?: boolean;
  autoplay?: boolean;
  playOnHover?: boolean;
  playOnce?: boolean;
  className?: string;
};

export function LottieIcon({
  animationData,
  size = 32,
  loop = true,
  autoplay = true,
  playOnHover = false,
  playOnce = false,
  className,
}: Props) {
  const ref = useRef<LottieRefCurrentProps>(null);

  const handleEnter = () => {
    if (playOnHover && ref.current) {
      ref.current.goToAndPlay(0, true);
    }
  };

  const handleLeave = () => {
    if (playOnHover && ref.current) {
      ref.current.stop();
    }
  };

  return (
    <div
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      style={{ width: size, height: size }}
      className={className}
    >
      <Lottie
        lottieRef={ref}
        animationData={animationData}
        loop={playOnce ? false : loop}
        autoplay={playOnHover ? false : autoplay}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
