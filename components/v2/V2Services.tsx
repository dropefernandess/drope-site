"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { V2Art } from "./V2Art";
import { cn } from "@/lib/utils";

/**
 * V2Services — bento na estrutura da ref azul (2 cards grandes + 3 menores),
 * recolorido no manual. Interações Framer Motion: tilt 3D sutil no hover
 * (mouse-tracking com springs) + a arte flutua no eixo oposto (parallax).
 * Reveal de entrada via [data-v2-reveal] (GSAP batch no V2Client).
 */

type Service = {
  kind: "branding" | "uiux" | "web" | "grafico" | "motion";
  title: string;
  desc: string;
  chips: string[];
  span: string;
  tone: "brand" | "soft" | "dark";
};

const services: Service[] = [
  {
    kind: "branding",
    title: "Branding & Identidade",
    desc: "Marcas construídas de dentro pra fora: conceito, símbolo, sistema visual e manual pra tudo sair coerente.",
    chips: ["Identidade visual", "Brand system", "Naming", "Direção de arte"],
    span: "md:col-span-7",
    tone: "brand",
  },
  {
    kind: "uiux",
    title: "UI/UX & Product Design",
    desc: "Interfaces que resolvem: pesquisa, fluxo, protótipo e handoff limpo pro time de dev.",
    chips: ["Product design", "Design tokens", "Protótipos"],
    span: "md:col-span-5",
    tone: "soft",
  },
  {
    kind: "web",
    title: "Web & Landing Pages",
    desc: "Do design ao deploy — sites e LPs rápidos, responsivos e pensados pra converter.",
    chips: ["Next.js", "Landing pages", "SEO técnico"],
    span: "md:col-span-4",
    tone: "soft",
  },
  {
    kind: "grafico",
    title: "Design Gráfico",
    desc: "A base de tudo: impressos, embalagens, capas e materiais que seguram a marca no mundo físico.",
    chips: ["Impressos", "Embalagem", "Capas de álbum"],
    span: "md:col-span-4",
    tone: "dark",
  },
  {
    kind: "motion",
    title: "Motion & Vídeo",
    desc: "Movimento com intenção: logo motion, animações de interface e vídeos curtos pra redes.",
    chips: ["Logo motion", "Motion UI", "Edição"],
    span: "md:col-span-4",
    tone: "soft",
  },
];

const tones = {
  brand: {
    card: "bg-brand text-brand-fg",
    desc: "text-brand-fg/80",
    chip: "border-brand-fg/25 text-brand-fg/90",
    art: "text-brand-fg/90",
  },
  soft: {
    card: "border border-line bg-bg-soft text-fg-strong",
    desc: "text-fg-mute",
    chip: "border-line text-fg-mute",
    art: "text-fg-strong/80",
  },
  dark: {
    card: "bg-fg-strong text-bg",
    desc: "text-bg/75",
    chip: "border-bg/25 text-bg/85",
    art: "text-bg/85",
  },
};

/** Card com tilt 3D no hover — springs pra suavidade, arte em parallax. */
function TiltCard({ s }: { s: Service }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sx = useSpring(mx, { stiffness: 180, damping: 22 });
  const sy = useSpring(my, { stiffness: 180, damping: 22 });
  const rotateX = useTransform(sy, [0, 1], [4.5, -4.5]);
  const rotateY = useTransform(sx, [0, 1], [-5, 5]);
  const artX = useTransform(sx, [0, 1], [8, -8]);
  const artY = useTransform(sy, [0, 1], [6, -6]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => {
    mx.set(0.5);
    my.set(0.5);
  };

  const t = tones[s.tone];

  return (
    <motion.div
      ref={ref}
      data-v2-reveal
      onMouseMove={reduced ? undefined : onMove}
      onMouseLeave={reduced ? undefined : onLeave}
      style={reduced ? undefined : { rotateX, rotateY, transformPerspective: 900 }}
      whileHover={reduced ? undefined : { y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "group relative flex min-h-[300px] flex-col justify-between gap-8 overflow-hidden rounded-section p-7 md:p-9",
        s.span,
        t.card
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <div className="flex max-w-[26rem] flex-col gap-2.5">
          <h3 className="text-h-2">{s.title}</h3>
          <p className={cn("text-[15px] leading-relaxed", t.desc)}>{s.desc}</p>
        </div>
        <motion.div
          style={reduced ? undefined : { x: artX, y: artY }}
          className="hidden shrink-0 sm:block"
        >
          <V2Art kind={s.kind} className={cn("w-24 md:w-28 opacity-90", t.art)} />
        </motion.div>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {s.chips.map((c) => (
          <li
            key={c}
            className={cn("rounded-full border px-3 py-1.5 text-[11px] font-medium", t.chip)}
          >
            {c}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function V2Services() {
  return (
    <section id="servicos" className="section-padding bg-bg">
      <div className="mx-auto flex max-w-container flex-col gap-12">
        {/* Header — headline esquerda + CTA direita (estrutura da ref) */}
        <div className="grid items-end gap-6 md:grid-cols-12" data-v2-reveal>
          <div className="flex flex-col gap-4 md:col-span-8">
            <p className="label-mono">
              <span className="text-fg-strong">02</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>O que eu faço</span>
            </p>
            <h2 className="text-h-1 max-w-3xl text-balance text-fg-strong">
              Não é agência genérica. É um estúdio com{" "}
              <span className="text-brand">dono na execução</span>.
            </h2>
          </div>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              href="/calculadora"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-pill bg-fg-strong px-6 py-3.5 text-sm font-semibold text-bg"
            >
              <span
                aria-hidden
                className="absolute inset-0 translate-y-full rounded-pill bg-brand transition-transform duration-300 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0"
              />
              <span className="relative">Estimar projeto</span>
              <ArrowUpRight className="relative size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
          </div>
        </div>

        {/* Bento: 2 grandes + 3 menores */}
        <div className="grid gap-3 md:grid-cols-12">
          {services.map((s) => (
            <TiltCard key={s.kind} s={s} />
          ))}
        </div>
      </div>
    </section>
  );
}
