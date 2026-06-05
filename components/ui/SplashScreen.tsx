"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

/**
 * SplashScreen — estilo Apple/Netflix.
 *
 * Sequência cinematográfica:
 *
 *  1. ENTER (0–500ms)
 *     Logo aparece com scale 0.7 → 1 + opacity 0 → 1 (easeOut spring)
 *     Glow vermelho difuso entra simultâneo
 *
 *  2. LOADING (500–2000ms = 1.5s)
 *     Logo permanece com pulse sutil (scale 1 → 1.04 → 1 loop)
 *     Progress bar enche embaixo (0 → 100% easeInOut)
 *     Contador % sincronizado
 *
 *  3. EXIT (2000–2800ms = 800ms)
 *     Logo voa pro top-center (posição do Nav fixed)
 *     Escala 1 → 0.32 (matching tamanho do Nav pill ~28px)
 *     Y translate -45vh
 *     Bg + progress + glow fazem fade-out
 *     Tipo magic-move: cria continuidade visual com o Nav
 *
 * Tempo TOTAL: ~2.8s no primeiro acesso da sessão.
 * Próximos acessos da mesma sessão pulam direto.
 */

const SESSION_KEY = "drope-splash-shown";
const ENTER_MS = 500;
const LOADING_MS = 1500;
const EXIT_MS = 800;

type Phase = "hidden" | "enter" | "loading" | "exit";

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Pula se já viu nesta sessão
    if (sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    // Respeita prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    setPhase("enter");
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("loading"), ENTER_MS);

    // Anima contador % durante a fase LOADING
    const startLoading = Date.now() + ENTER_MS;
    const interval = setInterval(() => {
      const now = Date.now();
      if (now < startLoading) return;
      const elapsed = now - startLoading;
      const t = Math.min(1, elapsed / LOADING_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));
    }, 16);

    const t2 = setTimeout(() => setPhase("exit"), ENTER_MS + LOADING_MS);
    const t3 = setTimeout(() => {
      setPhase("hidden");
      sessionStorage.setItem(SESSION_KEY, "1");
      document.body.style.overflow = "";
    }, ENTER_MS + LOADING_MS + EXIT_MS);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== "hidden" && (
        <motion.div
          key="splash"
          className="fixed inset-0 z-[100] bg-bg flex flex-col items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          animate={{ opacity: phase === "exit" ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: (EXIT_MS - 200) / 1000, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Glow vermelho difuso top-right */}
          <motion.div
            aria-hidden
            className="absolute -top-32 -right-32 size-96 rounded-full bg-brand/15 blur-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          {/* Glow coral bottom-left */}
          <motion.div
            aria-hidden
            className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-coral/12 blur-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "exit" ? 0 : 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          />

          {/* === LOGO — escala + voa pro menu === */}
          <motion.div
            className="relative flex items-center justify-center"
            initial={{ scale: 0.7, opacity: 0, y: 0 }}
            animate={
              phase === "enter"
                ? { scale: 1, opacity: 1, y: 0 }
                : phase === "loading"
                ? { scale: [1, 1.04, 1], opacity: 1, y: 0 }
                : /* exit */
                  {
                    scale: 0.32,
                    opacity: 0,
                    y: "-44vh",
                  }
            }
            transition={
              phase === "enter"
                ? { duration: ENTER_MS / 1000, ease: [0.22, 1, 0.36, 1] }
                : phase === "loading"
                ? {
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                    opacity: { duration: 0.3 },
                  }
                : /* exit */
                  {
                    duration: EXIT_MS / 1000,
                    ease: [0.65, 0, 0.35, 1],
                  }
            }
          >
            {/* Pulse ring atrás do logo (visível só em loading) */}
            <motion.span
              aria-hidden
              className="absolute size-32 rounded-full bg-brand/15"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={
                phase === "loading"
                  ? { scale: [0.5, 1.5, 0.5], opacity: [0, 0.5, 0] }
                  : { scale: 0.5, opacity: 0 }
              }
              transition={{
                duration: 2,
                repeat: phase === "loading" ? Infinity : 0,
                ease: "easeInOut",
              }}
            />

            {/* Logo Drope */}
            <Image
              src="/brand/icone-light.svg"
              alt="Drope"
              width={88}
              height={88}
              priority
              className="relative z-10 dark:hidden"
            />
            <Image
              src="/brand/icone-dark.svg"
              alt="Drope"
              width={88}
              height={88}
              priority
              className="relative z-10 hidden dark:block"
            />
          </motion.div>

          {/* === Progress bar + contador (some no exit) === */}
          <motion.div
            className="mt-10 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: phase === "loading" ? 1 : 0,
              y: phase === "loading" ? 0 : 12,
            }}
            transition={{ duration: 0.4, delay: phase === "loading" ? 0.1 : 0 }}
          >
            {/* Bar pill */}
            <div className="relative h-1.5 w-56 overflow-hidden rounded-pill bg-fg-strong/8 ring-1 ring-fg-strong/5">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-pill bg-gradient-to-r from-brand-coral via-brand to-brand-deep"
                initial={{ width: "0%" }}
                animate={{ width: phase === "loading" ? "100%" : "0%" }}
                transition={{
                  duration: phase === "loading" ? LOADING_MS / 1000 : 0,
                  ease: [0.45, 0, 0.55, 1],
                }}
              />
              {/* Shine percorrendo */}
              <motion.div
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ left: "-3rem" }}
                animate={{ left: phase === "loading" ? "100%" : "-3rem" }}
                transition={{
                  duration: 1.2,
                  repeat: phase === "loading" ? Infinity : 0,
                  ease: "easeInOut",
                  repeatDelay: 0.3,
                }}
              />
            </div>

            {/* Contador % */}
            <div className="flex items-baseline gap-3">
              <span className="text-sm font-semibold font-mono tabular-nums text-fg-strong tracking-tight">
                {progress.toString().padStart(2, "0")}
                <span className="text-fg-mute">%</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-fg-faint font-medium">
                Carregando
              </span>
            </div>
          </motion.div>

          {/* Rodapé Drope (some no exit) */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 label-mono text-fg-faint tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: phase === "loading" ? 1 : 0 }}
            transition={{ duration: 0.5, delay: phase === "loading" ? 0.2 : 0 }}
          >
            DROPÊ · 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
