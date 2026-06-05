"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSVG } from "@/components/ui/AnimatedSVG";

/**
 * SplashScreen — splash com motion oficial da logo Drope.
 *
 * Sequência:
 *  1. ENTER (0–400ms)
 *     Container do logo entra com scale 0.92 → 1 + opacity 0 → 1.
 *     Logo é AnimatedSVG inline (CSS animations nativas) — começa
 *     a animação automática (DROPE marca → letras → FERNANDES).
 *
 *  2. LOADING (400–2200ms = 1.8s)
 *     - Motion da logo dura ~1.63s (DROPE+FERNANDES completa)
 *     - Progress bar enche 0 → 100% sincronizado
 *     - Contador % rola junto
 *     SEM pulse vermelho atrás (removido — tava feio)
 *
 *  3. EXIT (2200–3000ms = 800ms)
 *     Logo voa pro topo + escala (magic-move)
 *     Tudo faz fade-out
 *
 * Total: ~3s — motion da logo roda 100% antes do site abrir.
 */

const SESSION_KEY = "drope-splash-shown";
const ENTER_MS = 400;
const LOADING_MS = 1800;
const EXIT_MS = 800;

type Phase = "hidden" | "enter" | "loading" | "exit";

export function SplashScreen() {
  const [phase, setPhase] = useState<Phase>("hidden");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    if (sessionStorage.getItem(SESSION_KEY)) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      sessionStorage.setItem(SESSION_KEY, "1");
      return;
    }

    setPhase("enter");
    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("loading"), ENTER_MS);

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
          {/* Glow vermelho top-right */}
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

          {/* === LOGO motion oficial (AnimatedSVG inline) === */}
          {/* Forço a cor do texto (--wm) via theme do site, sobrescreve
              a media query prefers-color-scheme nativa do SVG.
              [&_svg.drope-anim]:[--wm:rgb(var(--fg-strong))] aplica no SVG injetado. */}
          <motion.div
            className="relative drope-logo-wrap [&_svg.drope-anim]:!w-full [&_svg.drope-anim]:!h-full [&_svg.drope-anim]:block"
            style={{
              // Força --wm a usar fg-strong (light: dark, dark: cream)
              ["--wm" as string]: "rgb(var(--fg-strong))",
            }}
            initial={{ scale: 0.92, opacity: 0, y: 0 }}
            animate={
              phase === "exit"
                ? { scale: 0.28, opacity: 0, y: "-44vh" }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={
              phase === "exit"
                ? { duration: EXIT_MS / 1000, ease: [0.65, 0, 0.35, 1] }
                : { duration: ENTER_MS / 1000, ease: [0.22, 1, 0.36, 1] }
            }
          >
            <div className="w-[280px] sm:w-[340px] aspect-[291/100] [&_svg]:!w-full [&_svg]:!h-full">
              <AnimatedSVG
                src="/animations/drope-logo-animated.svg"
                alt="Drope Fernandes"
                width={340}
                height={117}
                mode="inline"
              />
            </div>
          </motion.div>

          {/* Helper CSS pra forçar cor do texto do SVG injetado */}
          <style jsx global>{`
            .drope-logo-wrap svg.drope-anim {
              --wm: rgb(var(--fg-strong)) !important;
            }
          `}</style>

          {/* === Progress bar + contador === */}
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

          {/* Rodapé sigla */}
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
