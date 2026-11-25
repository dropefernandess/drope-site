"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { Icon, ICONS, SOCIAL } from "@/components/rb/ui";
import { LinkedinFilled } from "@/components/rb/icons";
import { useReducedMotionSafe } from "@/components/rb/motion";
import { cn } from "@/lib/utils";
import { DitherField } from "@/components/rb/Dither";

/**
 * Rodapé — Figma "10 Rodapé" (referência 10x Designers): textura vermelha
 * do Pedro ao fundo, cartão de links, cartão "Vamos trabalhar juntos?",
 * três redes como ícones e as etiquetas em balão.
 */
const COPY = {
  pt: {
    title: "Antes de ir, veja estes links",
    nav: "Navegar", tools: "Ferramentas", contact: "Contato",
    navLinks: [["/projetos", "Trabalhos"], ["/sobre", "Sobre"], ["/metodo", "Método"], ["/blog", "Blog"]],
    toolLinks: [["/orcamento", "Orçamento"], ["/metodo#sua-parte", "Briefing"], ["/glossario", "Glossário"]],
    work: "Vamos trabalhar juntos?",
    workLinks: [["/agendar", "Agendar uma conversa"], ["/orcamento", "Fazer meu orçamento"], ["/metodo", "Ver o processo"]],
    bye: "Até já!", follow: "Me segue",
    rights: "© 2026 Drope Fernandes · Todos direitos reservados.",
  },
  en: {
    title: "Before you go, check these links",
    nav: "Explore", tools: "Tools", contact: "Contact",
    navLinks: [["/projetos", "Work"], ["/sobre", "About"], ["/metodo", "Method"], ["/blog", "Blog"]],
    toolLinks: [["/orcamento", "Quote"], ["/metodo#sua-parte", "Briefing"], ["/glossario", "Glossary"]],
    work: "Shall we work together?",
    workLinks: [["/agendar", "Book a call"], ["/orcamento", "Get a quote"], ["/metodo", "See the process"]],
    bye: "See you!", follow: "Follow me",
    rights: "© 2026 Drope Fernandes · All rights reserved.",
  },
};

/**
 * Balão com cursor. Flutua num caminho curto em loop, como os cursores do
 * projeto antigo (components/ui/AnimatedCursor). Só anda quando o rodapé
 * está na tela; parado em "reduzir movimento".
 */
function Bubble({ children, className, path, duration, delay = 0 }: {
  children: React.ReactNode;
  className?: string;
  path: { x: number[]; y: number[] };
  duration: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { margin: "120px 0px" });
  const reduced = useReducedMotionSafe();
  const loop = inView && !reduced;
  return (
    <motion.span
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none absolute z-10 select-none", className)}
      animate={loop ? path : { x: 0, y: 0 }}
      transition={loop ? { duration, delay, repeat: Infinity, ease: [0.45, 0, 0.55, 1], times: [0, 0.25, 0.5, 0.75, 1] } : { duration: reduced ? 0 : 0.6 }}
    >
      <svg width="16" height="16" viewBox="0 0 16 16" className="absolute -left-2.5 -top-2.5 text-brand" fill="currentColor"><path d="M0 0 16 6 6 16Z" /></svg>
      <span className="inline-block rounded-[10px] bg-brand px-[18px] py-2.5 text-lg font-medium leading-none text-ink-50 lg:text-xl">{children}</span>
    </motion.span>
  );
}

// Caminhos curtos (px) e ritmos diferentes para os dois balões não andarem juntos.
const PATH_BYE = { x: [0, 16, 6, 22, 0], y: [0, 8, 16, 4, 0] };
const PATH_FOLLOW = { x: [0, -14, -24, -8, 0], y: [0, -10, 2, 10, 0] };

const card = "rounded-[24px] border border-ink-700/70 bg-ink-900";
const linkCls = "text-ink-200 transition-colors hover:text-ink-50";

export function Footer() {
  const { locale } = useLocale();
  const c = COPY[locale];
  return (
    <footer className="relative overflow-hidden bg-ink-900 text-ink-50">
      <Image src="/rb/footer-texture.jpg" alt="" fill sizes="100vw" className="object-cover" />
      {/* Dither vermelho em movimento lento sobre a textura (pedido do Pedro, 25/11) */}
      <DitherField pixel={3} className="mix-blend-screen opacity-60" />
      <div className="relative mx-auto max-w-[1248px] px-6 pb-12 pt-16 lg:px-6 lg:pb-[72px] lg:pt-[120px]">
        <div className="grid gap-3 lg:grid-cols-[1fr_380px] lg:gap-5">
          {/* Cartão de links */}
          <div className={cn(card, "relative flex flex-col gap-10 p-6 lg:min-h-[520px] lg:justify-between lg:p-12")}>
            <h2 className="t-h2 max-w-[440px]">{c.title}</h2>
            <Bubble path={PATH_BYE} duration={5.2} className="right-5 top-[-18px] lg:left-[480px] lg:right-auto lg:top-[130px]">{c.bye}</Bubble>
            <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-[1fr_1fr_1.7fr] lg:gap-x-10">
              <div>
                <h3 className="t-small text-ink-50">{c.nav}</h3>
                <ul className="mt-3 space-y-2 t-small">
                  {c.navLinks.map(([h, l]) => <li key={h}><Link href={h} className={linkCls}>{l}</Link></li>)}
                </ul>
              </div>
              <div>
                <h3 className="t-small text-ink-50">{c.tools}</h3>
                <ul className="mt-3 space-y-2 t-small">
                  {c.toolLinks.map(([h, l]) => <li key={h}><Link href={h} className={linkCls}>{l}</Link></li>)}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <h3 className="t-small text-ink-50">{c.contact}</h3>
                <ul className="mt-3 space-y-2 t-small">
                  <li><a href={`mailto:${SOCIAL.email}`} className={linkCls}>{SOCIAL.email}</a></li>
                  <li><a href={SOCIAL.whatsapp} target="_blank" rel="noreferrer" className={linkCls}>{SOCIAL.phone}</a></li>
                </ul>
              </div>
            </div>
          </div>
          {/* Coluna da direita */}
          <div className="grid gap-3 lg:grid-rows-[360px_144px] lg:gap-4">
            <div className={cn(card, "flex flex-col gap-6 p-6 lg:p-10")}>
              <h2 className="t-h2">{c.work}</h2>
              <ul className="space-y-2 t-small">
                {c.workLinks.map(([h, l]) => <li key={l}><Link href={h} className={linkCls}>{l}</Link></li>)}
              </ul>
            </div>
            <div className="relative grid grid-cols-3 gap-[9px] lg:gap-2.5">
              {[
                { href: SOCIAL.instagram, label: "Instagram", el: <Icon d={ICONS.instagram} size={32} /> },
                { href: SOCIAL.linkedin, label: "LinkedIn", el: <LinkedinFilled size={32} /> },
                { href: SOCIAL.behance, label: "Behance", el: <span className="text-[30px] font-extrabold leading-none tracking-[-0.02em]">Bē</span> },
              ].map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label} className={cn(card, "grid h-[88px] place-items-center transition-colors hover:bg-ink-700 lg:h-[144px]")}>
                  {s.el}
                </a>
              ))}
              <Bubble path={PATH_FOLLOW} duration={6.4} delay={0.9} className="right-2 top-[66px] lg:right-10 lg:top-[114px]">{c.follow}</Bubble>
            </div>
          </div>
        </div>
        <p className="t-small mt-14 text-center text-ink-50 lg:mt-[72px]">{c.rights}</p>
      </div>
    </footer>
  );
}
