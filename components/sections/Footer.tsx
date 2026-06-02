"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Mail, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";

const nav = [
  { href: "/",            label: "Início" },
  { href: "/sobre",       label: "Sobre" },
  { href: "/#projetos",   label: "Trabalhos" },
  { href: "/proposta",    label: "Método" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/agendar",     label: "Agendar" },
  { href: "/blog",        label: "Blog" },
];

const social = [
  { href: "https://instagram.com/dropefernandes", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com/in/dropefernandes", label: "LinkedIn", Icon: Linkedin },
  { href: "https://behance.net/dropefernandes", label: "Behance" },
  { href: "https://dribbble.com/dropefernandes", label: "Dribbble" },
];

const cidades = [
  { city: "Senador Firmino, MG", time: "Onde eu moro" },
  { city: "Atendo o mundo", time: "Remoto · BRT" },
];

export function Footer() {
  return (
    <footer className="relative bg-fg-strong text-bg overflow-hidden">

      {/* === BIG WORDMARK MARQUEE — Drope Drope Drope === */}
      <div className="border-y border-bg/10 py-8 md:py-10 overflow-hidden">
        <div className="marquee-track" style={{ animationDuration: "40s" }}>
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="shrink-0 inline-flex items-center gap-8 pr-8 text-[12vw] md:text-[10vw] lg:text-[9vw] font-semibold leading-none tracking-[-0.05em] text-bg/95"
              aria-hidden={i > 0}
            >
              <span>DROPÊ</span>
              <span className="size-3 md:size-4 rounded-full bg-brand inline-block shrink-0" />
            </span>
          ))}
        </div>
      </div>

      {/* === GRID PRINCIPAL === */}
      <Container className="grid gap-12 md:grid-cols-12 py-16 md:py-20">

        {/* Brand block */}
        <Reveal className="md:col-span-4 flex flex-col gap-5">
          <Link href="/" aria-label="Dropê — home" className="flex items-center gap-3">
            <Image
              src="/brand/icone-dark.svg"
              alt="Dropê"
              width={40}
              height={40}
              className="size-10"
            />
            <Image
              src="/brand/drope-dark.svg"
              alt="Dropê"
              width={120}
              height={42}
              className="h-9 w-auto"
            />
          </Link>
          <p className="text-sm text-bg/70 max-w-xs leading-relaxed">
            Pedro Fernandes. Designer multidisciplinar, atendendo marcas no
            Brasil e internacionalmente desde 2018. Identidade visual,
            interface, motion e código com time pontual de confiança.
          </p>

          {/* Email CTA */}
          <Link
            href="mailto:contato@dropefernandes.com"
            className="group inline-flex items-center gap-2 self-start rounded-pill bg-brand px-4 py-2.5 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
          >
            <Mail className="size-4" strokeWidth={2.5} />
            contato@dropefernandes.com
            <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>
        </Reveal>

        {/* Navegação */}
        <Reveal delay={0.1} className="md:col-span-3 flex flex-col gap-4">
          <p className="text-[11px] uppercase tracking-wider font-medium text-bg/40">
            Navegação
          </p>
          <ul className="flex flex-col gap-2.5">
            {nav.map((l) => (
              <li key={l.href}>
                <FooterLink href={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Social */}
        <Reveal delay={0.2} className="md:col-span-3 flex flex-col gap-4">
          <p className="text-[11px] uppercase tracking-wider font-medium text-bg/40">
            Em outros lugares
          </p>
          <ul className="flex flex-col gap-2.5">
            {social.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 text-sm font-medium text-bg/75 hover:text-bg transition"
                >
                  {s.label}
                  <ArrowUpRight className="size-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" strokeWidth={2.5} />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Clock / status */}
        <Reveal delay={0.3} className="md:col-span-2 flex flex-col gap-4">
          <p className="text-[11px] uppercase tracking-wider font-medium text-bg/40">
            Horários
          </p>
          <ul className="flex flex-col gap-3">
            {cidades.map((c) => (
              <li key={c.city} className="flex flex-col gap-0.5">
                <p className="text-sm font-semibold text-bg">{c.city}</p>
                <p className="text-xs text-bg/55 tabular-nums">{c.time}</p>
              </li>
            ))}
          </ul>
          <div className="mt-2 inline-flex items-center gap-2 self-start rounded-pill border border-bg/20 px-3 py-1.5">
            <span className="size-1.5 rounded-full bg-status animate-pulse" />
            <span className="text-[11px] font-medium text-bg/80">Aceitando Q3 2026</span>
          </div>
        </Reveal>
      </Container>

      {/* === FOOTER BOTTOM === */}
      <Container className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-6 border-t border-bg/10 text-xs text-bg/55">
        <p>
          © {new Date().getFullYear()} Dropê · Pedro Fernandes ·
          Todos os direitos reservados
        </p>
        <div className="flex gap-5">
          <Link href="/legal/privacy" className="hover:text-bg transition">
            Privacidade
          </Link>
          <Link href="/legal/terms" className="hover:text-bg transition">
            Termos
          </Link>
          <span className="hidden md:inline">
            Feito com cuidado em MG
          </span>
        </div>
      </Container>

      {/* Decoração — vermelho gradient sutil nos cantos */}
      <div
        aria-hidden
        className="absolute -bottom-32 -right-32 size-96 rounded-full bg-brand/15 blur-3xl pointer-events-none"
      />
    </footer>
  );
}

/** Link com underline animado da esquerda pra direita */
function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href} className="group relative inline-block text-sm font-medium text-bg/75 hover:text-bg transition">
      <span>{children}</span>
      <motion.span
        className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      />
    </Link>
  );
}
