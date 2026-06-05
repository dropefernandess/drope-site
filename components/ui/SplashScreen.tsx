"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedSVG } from "@/components/ui/AnimatedSVG";

/**
 * SplashScreen — tela de loading com a mão animada do Drope.
 *
 * Comportamento:
 *  - Aparece SOMENTE no primeiro acesso da sessão (sessionStorage flag).
 *  - Duração: 1.8s hold + 0.5s fade out = ~2.3s max no primeiro hit.
 *  - Respeita prefers-reduced-motion (pula direto).
 *
 * Visual:
 *  - Background bg-bg (cream)
 *  - Glow vermelho difuso em 2 cantos
 *  - SVG da mão animada (SMIL nativo) centralizado, 200px
 *  - Progress bar pill com gradiente brand-coral → brand
 *  - Contador % sincronizado embaixo + label "CARREGANDO" em label-mono
 */

const SESSION_KEY = "drope-splash-shown";
const HOLD_DURATION_MS = 1800;
const FADE_OUT_MS = 500;

export function SplashScreen() {
  const [show, setShow] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0);

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

    // Anima contador progress 0 → 100 sincronizado com a barra
    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      // easeOut cubic pra acompanhar a animação da barra
      const t = Math.min(1, elapsed / HOLD_DURATION_MS);
      const eased = 1 - Math.pow(1 - t, 3);
      const pct = Math.round(eased * 100);
      setProgress(pct);
      if (t >= 1) clearInterval(progressInterval);
    }, 16);

    const t = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(SESSION_KEY, "1");
      setTimeout(() => {
        document.body.style.overflow = "";
      }, FADE_OUT_MS);
    }, HOLD_DURATION_MS);

    return () => {
      clearTimeout(t);
      clearInterval(progressInterval);
      document.body.style.overflow = "";
    };
  }, []);

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
          {/* Glow vermelho sutil nos cantos */}
          <motion.div
            aria-hidden
            className="absolute -top-32 -right-32 size-96 rounded-full bg-brand/15 blur-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          />
          <motion.div
            aria-hidden
            className="absolute -bottom-32 -left-32 size-96 rounded-full bg-brand-coral/12 blur-3xl pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
          />

          {/* === Mão animada (SVG SMIL) === */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.85, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* mode="inline" — necessário porque o CSP do middleware bloqueia
                <object> (object-src 'none'). Inline injeta o SVG direto no DOM
                e o SMIL roda nativamente como parte do documento. */}
            <AnimatedSVG
              src="/animations/loading.svg"
              alt="Carregando"
              width={220}
              height={220}
              mode="inline"
              className="select-none [&>svg]:w-full [&>svg]:h-full [&>svg]:block"
            />
          </motion.div>

          {/* === Progress bar bonito === */}
          <motion.div
            className="mt-2 flex flex-col items-center gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Bar pill com gradiente brand */}
            <div className="relative h-1.5 w-56 overflow-hidden rounded-pill bg-fg-strong/8 ring-1 ring-fg-strong/5">
              <motion.div
                className="absolute inset-y-0 left-0 rounded-pill bg-gradient-to-r from-brand-coral via-brand to-brand-deep"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: HOLD_DURATION_MS / 1000, ease: [0.45, 0, 0.55, 1] }}
              />
              {/* Highlight shine que percorre */}
              <motion.div
                className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                initial={{ left: "-3rem" }}
                animate={{ left: "100%" }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 0.3,
                }}
              />
            </div>

            {/* Contador % + label */}
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

          {/* Drope sigla no rodapé */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 label-mono text-fg-faint tracking-[0.3em]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            DROPÊ · 2026
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
