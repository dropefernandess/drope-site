"use client";

import { createContext, useContext, useEffect, useRef, useState, useSyncExternalStore, type CSSProperties, type ReactNode } from "react";
import { motion, type Variants } from "framer-motion";

/**
 * Movimento do rebrand 2026 — peças pequenas e reutilizáveis (framer-motion).
 *
 * - Entrada e saída: o elemento entra quando qualquer parte cruza a faixa
 *   central da tela (8% do topo, 12% da base) e volta ao estado escondido só
 *   quando sai da tela por inteiro. Assim a volta acontece fora de vista e
 *   nada treme na borda, e ao rolar de novo a animação se repete.
 * - Grupos: dentro de RevealGroup as peças não observam a tela sozinhas, o
 *   grupo dispara e escalona (stagger) na ordem do documento. Dentro de um
 *   grupo, `delay` substitui a posição no escalonamento.
 * - Só transform, opacity e clip-path. O estado final é o layout original.
 * - "Reduzir movimento": tudo estático. O servidor e a primeira renderização
 *   do cliente são iguais (sem erro de hidratação); a CSS em app/rb-motion.css
 *   ([data-rb-m]) garante o estado final mesmo antes do JS.
 * - Primeiro acesso da sessão: espera a splash sair antes de animar.
 */

export const EASE = [0.22, 1, 0.36, 1] as const;

/** Máscara de texto: corta embaixo, mas deixa folga para acentos, descendentes e itálico. */
export const MASK = "inset(-0.25em -0.35em -0.18em -0.35em)";

const RM = "(prefers-reduced-motion: reduce)";

function subscribeRM(cb: () => void) {
  const mq = window.matchMedia(RM);
  if (mq.addEventListener) mq.addEventListener("change", cb);
  else mq.addListener(cb);
  return () => {
    if (mq.removeEventListener) mq.removeEventListener("change", cb);
    else mq.removeListener(cb);
  };
}

/** Igual ao useReducedMotion, mas devolve false na hidratação (o servidor não sabe). */
export function useReducedMotionSafe() {
  return useSyncExternalStore(subscribeRM, () => window.matchMedia(RM).matches, () => false);
}

/* ---------- Splash: no primeiro acesso as entradas esperam a splash sair ---------- */

const SPLASH_KEY = "drope-splash-shown";
const SPLASH_OPEN_MS = 2300; // SplashScreen: 400 entrada + 1800 carregando, a saída começa aqui
let gateAt: number | null = null;

function gateDelay(): number {
  if (gateAt === null) {
    gateAt = 0;
    try {
      if (!window.matchMedia(RM).matches && !window.sessionStorage.getItem(SPLASH_KEY)) {
        gateAt = performance.now() + SPLASH_OPEN_MS;
      }
    } catch {
      /* storage bloqueado: segue sem esperar */
    }
  }
  return Math.max(0, gateAt - performance.now());
}

/** true depois da montagem (e depois da splash, no primeiro acesso). Para entradas no carregamento. */
export function useIntroReady() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), gateDelay() + 40);
    return () => window.clearTimeout(t);
  }, []);
  return ready;
}

/* ---------- Observadores compartilhados (dois para a página inteira) ---------- */

type Sub = (inView: boolean) => void;
const subs = new Map<Element, Sub>();
let enterIO: IntersectionObserver | null = null;
let exitIO: IntersectionObserver | null = null;

function observers() {
  if (!enterIO || !exitIO) {
    enterIO = new IntersectionObserver(
      (entries) => { for (const e of entries) if (e.isIntersecting) subs.get(e.target)?.(true); },
      { rootMargin: "-8% 0px -12% 0px" },
    );
    exitIO = new IntersectionObserver((entries) => {
      for (const e of entries) if (!e.isIntersecting) subs.get(e.target)?.(false);
    });
  }
  return [enterIO, exitIO] as const;
}

export function useInOut(ref: React.RefObject<Element | null>, enabled = true) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!enabled || !el) return;
    if (typeof IntersectionObserver === "undefined") { setInView(true); return; }
    let t = 0;
    subs.set(el, (v) => {
      window.clearTimeout(t);
      if (!v) { setInView(false); return; }
      const wait = gateDelay();
      if (wait > 0) t = window.setTimeout(() => setInView(true), wait);
      else setInView(true);
    });
    const [a, b] = observers();
    a.observe(el);
    b.observe(el);
    return () => {
      a.unobserve(el);
      b.unobserve(el);
      subs.delete(el);
      window.clearTimeout(t);
    };
  }, [ref, enabled]);
  return inView;
}

/* ---------- Tipos ---------- */

type Tag =
  | "div" | "section" | "article" | "header" | "aside" | "figure" | "figcaption"
  | "ul" | "ol" | "li" | "dl" | "dt" | "dd"
  | "p" | "span" | "a" | "blockquote"
  | "h1" | "h2" | "h3" | "h4";

type MotionConflicts =
  | "children" | "className" | "style"
  | "onAnimationStart" | "onAnimationEnd" | "onAnimationIteration"
  | "onDrag" | "onDragEnd" | "onDragEnter" | "onDragExit" | "onDragLeave" | "onDragOver" | "onDragStart" | "onDrop"
  | "onTransitionEnd";

type Rest = Omit<React.AllHTMLAttributes<HTMLElement>, MotionConflicts | "as">;

type Base = Rest & {
  as?: Tag;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  /** Atraso em segundos. Dentro de um grupo, substitui a posição no escalonamento. */
  delay?: number;
};

// motion.* com o tipo de div (as props usadas aqui são comuns a todas as tags).
const M = (as: Tag) => motion[as] as unknown as typeof motion.div;

const GroupCtx = createContext(false);

/** Liga a observação da tela quando a peça não está num grupo. */
function useControl(inGroup: boolean, reduced: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInOut(ref, !inGroup);
  const ctrl = inGroup ? {} : { initial: "hidden", animate: reduced || inView ? "show" : "hidden" };
  return { ref, ctrl };
}

const withDelay = (delay?: number) => (delay === undefined ? {} : { delay });
const OUT = { duration: 0.3, ease: EASE };
const INSTANT = { duration: 0 };

/* ---------- Reveal: aparece subindo ---------- */

export function Reveal({ as = "div", className, style, children, delay, y = 32, ...rest }: Base & { y?: number }) {
  const inGroup = useContext(GroupCtx);
  const reduced = useReducedMotionSafe();
  const { ref, ctrl } = useControl(inGroup, reduced);
  const variants: Variants = reduced
    ? { hidden: { opacity: 1, y: 0 }, show: { opacity: 1, y: 0, transition: INSTANT } }
    : {
        hidden: { opacity: 0, y, transition: OUT },
        show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE, ...withDelay(delay) } },
      };
  const Comp = M(as);
  return (
    <Comp ref={ref} data-rb-m="" className={className} style={style} variants={variants} {...ctrl} {...rest}>
      {children}
    </Comp>
  );
}

/** Item de lista dentro de um RevealGroup (mesmo que Reveal; o nome deixa a intenção clara). */
export const RevealItem = Reveal;

/* ---------- RevealGroup / RevealStagger: dispara os filhos em sequência ---------- */

export function RevealGroup({
  as = "div",
  className,
  style,
  children,
  stagger = 0.075,
  delayChildren = 0,
  delay: _delay,
  ...rest
}: Base & { stagger?: number; delayChildren?: number }) {
  const inGroup = useContext(GroupCtx);
  const reduced = useReducedMotionSafe();
  const { ref, ctrl } = useControl(inGroup, reduced);
  const variants: Variants = {
    hidden: {},
    show: { transition: reduced ? INSTANT : { staggerChildren: stagger, delayChildren } },
  };
  const Comp = M(as);
  return (
    <GroupCtx.Provider value={true}>
      <Comp ref={ref} className={className} style={style} variants={variants} {...ctrl} {...rest}>
        {children}
      </Comp>
    </GroupCtx.Provider>
  );
}

export const RevealStagger = RevealGroup;

/* ---------- ImageReveal: a moldura abre (clip-path) e a imagem assenta (scale) ---------- */

export function ImageReveal({
  as = "div",
  className,
  style,
  children,
  delay,
  radius = 8,
  fill = true,
  ...rest
}: Base & {
  /** Raio do recorte em px: use o menor raio do contêiner (rounded-lg = 8, rounded-xl = 12). */
  radius?: number;
  /** true: imagem com `fill` (camada absoluta). false: imagem no fluxo (largura/altura próprias). */
  fill?: boolean;
}) {
  const inGroup = useContext(GroupCtx);
  const reduced = useReducedMotionSafe();
  const { ref, ctrl } = useControl(inGroup, reduced);
  const open = `inset(0% 0% 0% 0% round ${radius}px)`;
  const box: Variants = reduced
    ? { hidden: { clipPath: open }, show: { clipPath: open, transition: INSTANT } }
    : {
        hidden: { clipPath: `inset(12% 8% 12% 8% round ${radius}px)`, transition: OUT },
        show: { clipPath: open, transition: { duration: 1.05, ease: EASE, ...withDelay(delay) } },
      };
  const img: Variants = reduced
    ? { hidden: { scale: 1 }, show: { scale: 1, transition: INSTANT } }
    : {
        hidden: { scale: 1.08, transition: OUT },
        show: { scale: 1, transition: { duration: 1.3, ease: EASE, ...withDelay(delay) } },
      };
  const Comp = M(as);
  const Inner = as === "span" ? (motion.span as unknown as typeof motion.div) : motion.div;
  return (
    <Comp ref={ref} data-rb-m="" className={className} style={style} variants={box} {...ctrl} {...rest}>
      <Inner data-rb-m="" variants={img} className={fill ? "absolute inset-0 block" : "block"}>
        {children}
      </Inner>
    </Comp>
  );
}

/* ---------- LineReveal: o texto sobe de trás de uma máscara ---------- */

const BLOCK_TAGS = new Set<Tag>(["div", "section", "article", "header", "aside", "figure", "li", "dd", "blockquote"]);

export function LineReveal({
  as = "div",
  className,
  style,
  children,
  delay,
  inline = false,
  ...rest
}: Base & {
  /** true quando o elemento externo fica em linha (dentro de um parágrafo, por exemplo). */
  inline?: boolean;
}) {
  const inGroup = useContext(GroupCtx);
  const reduced = useReducedMotionSafe();
  const { ref, ctrl } = useControl(inGroup, reduced);
  const line: Variants = reduced
    ? { hidden: { y: "0%" }, show: { y: "0%", transition: INSTANT } }
    : {
        hidden: { y: "140%", transition: OUT },
        show: { y: "0%", transition: { duration: 0.9, ease: EASE, ...withDelay(delay) } },
      };
  const Comp = M(as);
  // Dentro de tags de bloco o miolo é div (pode conter <p>); nas de texto, span.
  const Inner = BLOCK_TAGS.has(as) && !inline ? motion.div : (motion.span as unknown as typeof motion.div);
  return (
    <Comp ref={ref} className={className} style={{ clipPath: MASK, ...style }} {...ctrl} {...rest}>
      <Inner data-rb-m="" variants={line} className={inline ? "inline-block" : "block"}>
        {children}
      </Inner>
    </Comp>
  );
}

/* ---------- Palavra mascarada (entradas no carregamento, como o hero) ---------- */

/** Palavra que sobe da máscara. Precisa de um pai motion que controle "hidden" → "show". */
export function MaskWord({ children }: { children: ReactNode }) {
  const reduced = useReducedMotionSafe();
  const v: Variants = reduced
    ? { hidden: { y: "0%" }, show: { y: "0%", transition: INSTANT } }
    : { hidden: { y: "140%" }, show: { y: "0%", transition: { duration: 0.95, ease: EASE } } };
  return (
    <span className="inline-block" style={{ clipPath: MASK }}>
      <motion.span data-rb-m="" className="inline-block" variants={v}>
        {children}
      </motion.span>
    </span>
  );
}
