"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SplashScreen — tela de loading bonita do primeiro acesso.
 *
 * Comportamento:
 *  - Aparece SOMENTE no primeiro acesso da sessão (sessionStorage flag).
 *  - Navegações internas (Next.js Link) NÃO mostram de novo.
 *  - Duração: 1.4s total + 0.5s fade out = 1.9s max no primeiro hit.
 *  - Se prefers-reduced-motion estiver ON, pula direto.
 *
 * Visual:
 *  - Background: bg cream (mesma cor do site, sem flash branco)
 *  - Logo Drope centralizado com scale-in (0.7 → 1, easeOut)
 *  - Progress bar fina vermelha abaixo (0 → 100% em 1s)
 *  - Sigla "DROPÊ" em label-mono embaixo
 *  - Cantos com gradient blur sutil de brand
 *
 * Pra TROCAR por animação Lottie no futuro:
 *  - Substituir o bloco do logo por <LottieIcon animationData={splashAnim} size={120} />
 *  - Manter a progress bar e o fade-out wrapper
 */

const SESSION_KEY = "drope-splash-shown";
const HOLD_DURATION_MS = 1400;
const FADE_OUT_MS = 500;

export function SplashScreen() {
  // null = checking, true = mostrar, false = oculto
  const [show, setShow] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Pula se já viu nesta sessão
    if (sessionStorage.getItem(SESSION_KEY)) {
      setShow(false);
      return;
    }

    // Respeita prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setShow(false);
      return;
    }

    setShow(true);
    document.body.style.overflow = "hidden";

    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
      // Restaura scroll após fade
      setTimeout(() => {
        document.body.style.overflow = "";
      }, FADE_OUT_MS);
    }, HOLD_DURATION_MS);

    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  // Server e checking → não renderiza nada
  if (show === null || show === false) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: FADE_OUT_MS / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow vermelho sutil top-right + bottom-left */}
          <motion.div
            aria-hidden
            className="absolute -top-32 -right-32 size-96 rounded-full bg-brand/15 blur-3xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand/10 blur-3xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          />

          {/* === Logo central com animação de entrada === */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Pulse ring atrás do logo */}
            <motion.span
              aria-hidden
              className="absolute size-24 rounded-full bg-brand/20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 1.4, 0.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
            <Image
              src="/brand/icone-light.svg"
              alt="Drope"
              width={56}
              height={56}
              priority
              className="relative z-10 dark:hidden"
            />
            <Image
              src="/brand/icone-dark.svg"
              alt="Drope"
              width={56}
              height={56}
              priority
              className="relative z-10 hidden dark:block"
            />
          </motion.div>

          {/* === Progress bar fina === */}
          <div className="mt-10 h-px w-40 overflow-hidden rounded-full bg-line">
            <motion.div
              className="h-full origin-left bg-brand"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: [0.45, 0, 0.55, 1], delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </div>

          {/* === Label === */}
          <motion.p
            className="mt-4 label-mono text-fg-faint tracking-[0.2em]"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            DROPÊ · 2026
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
