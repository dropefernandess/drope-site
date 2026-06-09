"use client";

import { useRef } from "react";
import Image from "next/image";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { ArrowUpRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { categorias, type CategoriaSlug, type Projeto } from "@/content/projetos";
import { cn } from "@/lib/utils";

const catColor: Record<CategoriaSlug, string> = {
  "branding":      "bg-brand text-brand-fg",
  "ui-ux-design":  "bg-ink-50 text-ink-900",
  "web-design":    "bg-brand-coral text-ink-900",
  "graphic-design":"bg-brand-wine text-ink-50",
  "motion-design": "bg-ink-700 text-ink-50",
};

/**
 * ProjectCard — card de projeto com micro-tilt 3D + glow vermelho.
 *
 * Move o mouse sobre o card, ele rotaciona suavemente em perspectiva
 * (max ±5° X e Y). No hover, adiciona glow vermelho sutil + cresce.
 * Em mobile (touch) o tilt fica desativado naturalmente (sem mousemove).
 *
 * Respeita prefers-reduced-motion (motion config global cuida).
 */
export function ProjectCard({ project }: { project: Projeto }) {
  const ref = useRef<HTMLAnchorElement>(null);

  // Posição do mouse normalizada (-0.5 a 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Suaviza pra evitar jitter
  const xSpring = useSpring(x, { stiffness: 180, damping: 18, mass: 0.4 });
  const ySpring = useSpring(y, { stiffness: 180, damping: 18, mass: 0.4 });

  // Mapeia pra rotação (5° max — sutil, premium)
  const rotateX = useTransform(ySpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const primaryCat = project.categorias[0];
  const catLabel = categorias.find((c) => c.slug === primaryCat)?.label;

  return (
    <motion.div
      style={{ perspective: 1000 }}
      className="contents"
    >
      <Link
        ref={ref}
        href={`/projetos/${project.slug}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative block aspect-[4/5] overflow-hidden rounded-section bg-surface will-change-transform"
      >
        <motion.div
          className="relative h-full w-full"
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        >
          {/* Imagem cover */}
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
            quality={90}
            className="object-cover transition duration-700 group-hover:scale-105 group-hover:blur-sm"
          />

          {/* Glow vermelho radial sutil no hover */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-70 transition-opacity duration-500 mix-blend-overlay bg-[radial-gradient(circle_at_50%_50%,rgba(222,40,40,0.55),transparent_55%)]"
          />

          {/* Badge sempre visível (top-left) */}
          <div className="absolute top-4 left-4 z-10">
            <span className={cn(
              "inline-block rounded-pill px-3 py-1 text-[11px] font-semibold uppercase tracking-wider",
              catColor[primaryCat]
            )}>
              {catLabel}
            </span>
          </div>

          {/* Ano sempre visível (top-right) */}
          {project.year && (
            <span className="absolute top-4 right-4 z-10 rounded-pill bg-ink-900/40 backdrop-blur-sm border border-ink-50/15 px-2.5 py-1 text-[11px] font-medium text-ink-50 tabular-nums">
              © {project.year}
            </span>
          )}

          {/* Overlay hover */}
          <div className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[2]">
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/85 to-transparent" />
            <div className="relative p-6 flex flex-col gap-2 translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <h3 className="text-xl md:text-2xl font-semibold text-ink-50 leading-tight">
                {project.title}
              </h3>
              <p className="text-sm text-ink-50/80 leading-snug line-clamp-3">
                {project.description}
              </p>
              <div className="flex items-center justify-between mt-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-50">
                  Ver case completo
                  <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
                </span>
                <div className="size-9 rounded-full bg-brand flex items-center justify-center shadow-lg shadow-brand/40">
                  <ArrowUpRight className="size-4 text-brand-fg" strokeWidth={2.5} />
                </div>
              </div>
            </div>
          </div>

          {/* Pill com título — idle */}
          <div className="absolute bottom-4 left-4 right-4 z-[1] opacity-100 group-hover:opacity-0 transition-opacity duration-200">
            <div className="inline-block rounded-pill bg-bg/95 backdrop-blur-sm border border-line px-3 py-1.5">
              <p className="text-xs font-semibold text-fg-strong">
                {project.title}
              </p>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
