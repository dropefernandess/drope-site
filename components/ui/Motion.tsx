"use client";

import { motion, useInView, type Variants, type HTMLMotionProps } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Reveal — fade-up + blur que se dissipa quando entra na viewport.
 * Usa `useInView` hook (mais robusto que `whileInView` em SSR/scroll programático).
 */
const baseVariants: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Reveal({
  children,
  delay = 0,
  y,
  className,
  as = "div",
  ...rest
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span" | "p" | "h2" | "h3";
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "animate" | "ref">) {
  const Tag = motion[as] as typeof motion.div;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05, margin: "0px 0px -50px 0px" });
  const variants =
    typeof y === "number"
      ? { ...baseVariants, hidden: { ...baseVariants.hidden, y } }
      : baseVariants;
  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={className}
      {...rest}
    >
      {children}
    </Tag>
  );
}

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export function Stagger({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "ul" | "ol";
}) {
  const Tag = motion[as] as typeof motion.div;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05, margin: "0px 0px -50px 0px" });
  return (
    <Tag
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </Tag>
  );
}

export function StaggerItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section" | "article";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag variants={baseVariants} className={className}>
      {children}
    </Tag>
  );
}

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 12, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function TextReveal({
  text,
  className,
  delayChildren = 0,
  staggerChildren = 0.04,
  as = "span",
}: {
  text: string;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
  as?: "span" | "h1" | "h2" | "p";
}) {
  const words = text.split(" ");
  const Tag = motion[as] as typeof motion.span;
  return (
    <Tag
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren, delayChildren } },
      }}
      className={className}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block whitespace-nowrap" aria-hidden>
          <motion.span variants={wordVariants} className="inline-block">
            {w}
          </motion.span>
          {i < words.length - 1 ? <span>&nbsp;</span> : null}
        </span>
      ))}
    </Tag>
  );
}
