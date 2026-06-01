"use client";

/**
 * Elementos futuristas pro Dropê:
 *  - GlitchText: scramble ASCII chars revelando o texto final
 *  - MagneticButton: wrapper que aproxima o filho do cursor no hover
 *  - AnimatedCounter: stat que conta 0 → N quando entra na viewport
 *  - ParallaxImage: foto que se move sutilmente com scroll
 *  - AsciiDivider: linha divisória ASCII estilizada
 */

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";

// ============================================================
// GlitchText — caracteres aleatórios resolvem no texto final
// ============================================================
const GLITCH_CHARS = "!<>-_\\/[]{}—=+*^?#________ABCDEF0123456789▓▒░█";

export function GlitchText({
  text,
  className,
  duration = 1200,
  delay = 0,
  trigger = "view", // "mount" | "view"
  as: Tag = "span",
}: {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  trigger?: "mount" | "view";
  as?: keyof React.JSX.IntrinsicElements;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(text);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const shouldStart = trigger === "mount" || (trigger === "view" && inView);
    if (!shouldStart || started) return;
    setStarted(true);

    let raf = 0;
    const startTime = performance.now() + delay;
    const chars = text.split("");

    const step = (now: number) => {
      const elapsed = now - startTime;
      if (elapsed < 0) {
        raf = requestAnimationFrame(step);
        return;
      }
      const progress = Math.min(elapsed / duration, 1);
      const settled = Math.floor(progress * chars.length);
      const next = chars
        .map((c, i) => {
          if (i < settled) return c;
          if (c === " ") return " ";
          return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
        })
        .join("");
      setDisplay(next);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setDisplay(text);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, started, trigger, text, duration, delay]);

  // @ts-expect-error dynamic tag
  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {display}
    </Tag>
  );
}

// ============================================================
// MagneticButton — efeito de atração do cursor
// ============================================================
export function Magnetic({
  children,
  strength = 0.3,
  className,
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useSpring(useMotionValue(0), { damping: 18, stiffness: 220 });
  const y = useSpring(useMotionValue(0), { damping: 18, stiffness: 220 });

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================
// AnimatedCounter — conta 0 → target em N segundos quando entra na viewport
// ============================================================
export function AnimatedCounter({
  value,
  suffix = "",
  duration = 1.5,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const end = start + duration * 1000;

    let raf = 0;
    const step = (now: number) => {
      const t = Math.min((now - start) / (end - start), 1);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setDisplay(Math.floor(eased * value));
      if (t < 1) raf = requestAnimationFrame(step);
      else setDisplay(value);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display}
      {suffix}
    </span>
  );
}

// ============================================================
// ParallaxImage — foto se move levemente com scroll
// ============================================================
export function Parallax({
  children,
  amount = 60,
  className,
}: {
  children: ReactNode;
  amount?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref as RefObject<HTMLElement>,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [amount, -amount]);

  return (
    <div ref={ref} className={className}>
      <motion.div style={{ y }} className="h-full">
        {children}
      </motion.div>
    </div>
  );
}

// ============================================================
// AsciiDivider — linha ASCII estilizada repetindo padrão
// ============================================================
export function AsciiDivider({
  pattern = "+ · + · + · + · ",
  className,
}: {
  pattern?: string;
  className?: string;
}) {
  // Repete o pattern suficiente pra preencher 100% width
  const repeated = pattern.repeat(40);
  return (
    <div
      className={`overflow-hidden whitespace-nowrap text-[11px] font-mono tracking-[0.05em] text-fg-faint select-none ${className ?? ""}`}
      aria-hidden
    >
      {repeated}
    </div>
  );
}

// ============================================================
// ScrollProgressBar — barra fina no topo da página
// ============================================================
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return (
    <motion.div
      style={{ scaleX, transformOrigin: "left" }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-brand z-[100] pointer-events-none"
      aria-hidden
    />
  );
}
