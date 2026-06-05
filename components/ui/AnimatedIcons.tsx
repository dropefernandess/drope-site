"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Star, Clock, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * AnimatedIcons — wrappers de lucide-react com micro-animações via Framer.
 *
 * Sem dependências extras (Framer Motion + lucide já no projeto).
 * Cada ícone tem uma "personalidade" pra não cair em fade genérico.
 */

// ============== AnimatedMail ==============
/** Envelope balança levemente quando entra em viewport (tilt -10° → 10° → 0°). */
export function AnimatedMail({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.span
      ref={ref}
      className={cn("inline-flex", className)}
      animate={
        inView
          ? { rotate: [0, -12, 10, -6, 0], y: [0, -2, 0, -1, 0] }
          : { rotate: 0, y: 0 }
      }
      transition={{ duration: 1.2, ease: "easeInOut", delay: 0.15 }}
    >
      <Mail className="size-full" strokeWidth={strokeWidth} />
    </motion.span>
  );
}

// ============== AnimatedStarRow ==============
/** Linha de N estrelas que ACENDEM uma a uma (stagger fill + scale). */
export function AnimatedStarRow({
  count = 5,
  className,
  starClassName,
}: {
  count?: number;
  className?: string;
  starClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={cn("inline-flex items-center gap-0.5", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ scale: 0.4, opacity: 0, rotate: -45 }}
          animate={
            inView
              ? { scale: 1, opacity: 1, rotate: 0 }
              : { scale: 0.4, opacity: 0, rotate: -45 }
          }
          transition={{
            duration: 0.35,
            delay: i * 0.08,
            ease: [0.34, 1.56, 0.64, 1], // overshoot bounce
          }}
          className="inline-flex"
        >
          <Star className={cn("size-3.5", starClassName)} fill="currentColor" strokeWidth={0} />
        </motion.span>
      ))}
    </div>
  );
}

// ============== AnimatedClock ==============
/** Relógio com ticking 360° lento e constante (8s por volta). */
export function AnimatedClock({ className, strokeWidth = 2.5 }: { className?: string; strokeWidth?: number }) {
  return (
    <motion.span
      className={cn("inline-flex", className)}
      animate={{ rotate: 360 }}
      transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
    >
      <Clock className="size-full" strokeWidth={strokeWidth} />
    </motion.span>
  );
}

// ============== AnimatedPin ==============
/** MapPin com pulse vermelho sutil ao redor (loop). */
export function AnimatedPin({ className, strokeWidth = 2 }: { className?: string; strokeWidth?: number }) {
  return (
    <span className={cn("relative inline-flex", className)}>
      {/* Pulse ring */}
      <motion.span
        aria-hidden
        className="absolute inset-0 rounded-full bg-brand"
        initial={{ scale: 1, opacity: 0.4 }}
        animate={{ scale: [1, 2, 1], opacity: [0.4, 0, 0.4] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
      />
      <MapPin className="relative size-full text-brand" strokeWidth={strokeWidth} fill="currentColor" />
    </span>
  );
}

// ============== AnimatedThemeIcon (Sun/Moon morfa) ==============
/** Sol / Lua que morfa rotation 180° + scale ao trocar. */
export function AnimatedThemeIcon({
  isDark,
  size = 16,
  strokeWidth = 2,
}: {
  isDark: boolean | null;
  size?: number;
  strokeWidth?: number;
}) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      {/* Sol — visível em dark mode (pra mudar pra light) */}
      <motion.span
        className="absolute inset-0 inline-flex items-center justify-center"
        animate={{
          rotate: isDark ? 0 : 180,
          scale: isDark ? 1 : 0,
          opacity: isDark ? 1 : 0,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
        </svg>
      </motion.span>

      {/* Lua — visível em light mode (pra mudar pra dark) */}
      <motion.span
        className="absolute inset-0 inline-flex items-center justify-center"
        animate={{
          rotate: isDark ? -180 : 0,
          scale: isDark ? 0 : 1,
          opacity: isDark ? 0 : 1,
        }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </motion.span>
    </span>
  );
}
