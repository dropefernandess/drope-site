"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Instagram, Linkedin, Mail } from "lucide-react";
import { LocalLink as Link } from "@/components/i18n/LocalLink";

/**
 * V2Footer — estrutura 10×Designers: bento de cards flutuando no escuro
 * (card grande de links + card "vamos trabalhar juntos" + tiles sociais),
 * balãozinho de chat como easter egg, créditos centrais e marquee DROPÊ.
 */

const NAV = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/projetos", label: "Trabalhos" },
  { href: "/proposta", label: "Método" },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/blog", label: "Blog" },
];

const LEGAL = [
  { href: "/legal/privacy", label: "Privacidade" },
  { href: "/legal/terms", label: "Termos" },
  { href: "/glossario", label: "Glossário" },
];

const WORK = [
  { href: "/agendar", label: "Agendar conversa" },
  { href: "/calculadora", label: "Estimar projeto" },
  { href: "/proposta", label: "Ver o método" },
  { href: "/cv", label: "Currículo" },
];

const SOCIALS = [
  { href: "https://www.instagram.com/dropefernandes", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/in/pedrofernandesdg", label: "LinkedIn", Icon: Linkedin },
  { href: "mailto:contato@dropefernandes.com", label: "E-mail", Icon: Mail },
];

const tile =
  "flex items-center justify-center rounded-[22px] bg-[#1A1A1A] border border-ink-50/8 text-ink-50 transition-colors hover:bg-[#222] hover:border-ink-50/15";

export function V2Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#0C0C0B] pb-10 pt-20 text-ink-50">
      <div className="mx-auto grid max-w-container gap-4 px-6 md:grid-cols-12 md:px-12">
        {/* ===== CARD GRANDE — "antes de ir, dá uma olhada" ===== */}
        <div
          className="relative flex min-h-[380px] flex-col justify-between gap-12 rounded-[28px] border border-ink-50/8 bg-[#161615] p-8 md:col-span-7 md:p-10"
          data-v2-reveal
        >
          <div className="flex items-start justify-between gap-6">
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-tight">
              Antes de ir,
              <br />
              dá uma olhada aqui
            </h2>
            {/* balãozinho easter egg */}
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              whileInView={{
                opacity: 1,
                scale: [0.6, 1.15, 0.92, 1.04, 1],
              }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="relative hidden rounded-pill bg-brand px-4 py-2 text-sm font-semibold text-brand-fg sm:inline-block"
            >
              <span
                aria-hidden
                className="absolute -top-2 left-4 size-0 border-x-8 border-b-[10px] border-x-transparent border-b-brand"
              />
              Te vejo no próximo case!
            </motion.span>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            <div>
              <p className="mb-3 text-sm font-bold">Navegação</p>
              <ul className="flex flex-col gap-2">
                {NAV.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-50/55 transition-colors hover:text-ink-50">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-bold">Legal</p>
              <ul className="flex flex-col gap-2">
                {LEGAL.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-ink-50/55 transition-colors hover:text-ink-50">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 text-sm font-bold">Horários</p>
              <p className="text-sm leading-relaxed text-ink-50/55">
                Seg–Sex · 9h às 18h
                <br />
                Senador Firmino · MG
                <br />
                Resposta em até 24h
              </p>
            </div>
          </div>
        </div>

        {/* ===== COLUNA DIREITA ===== */}
        <div className="flex flex-col gap-4 md:col-span-5">
          <div
            className="flex flex-1 flex-col justify-between gap-10 rounded-[28px] border border-ink-50/8 bg-[#161615] p-8 md:p-10"
            data-v2-reveal
          >
            <h2 className="text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-tight">
              Vamos trabalhar
              <br />
              juntos
            </h2>
            <ul className="flex flex-col gap-3">
              {WORK.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="group inline-flex items-center gap-2 text-[15px] text-ink-50/55 transition-colors hover:text-ink-50"
                  >
                    {l.label}
                    <ArrowUpRight className="size-3.5 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" strokeWidth={2.5} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* tiles sociais (quadrados, padrão 10x) */}
          <div className="grid grid-cols-3 gap-4" data-v2-reveal>
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className={`${tile} aspect-[4/3]`}
              >
                <Icon className="size-6" strokeWidth={1.75} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* créditos centrais */}
      <p className="mt-10 text-center text-sm text-ink-50/40">
        Dropê © 2026 · Pedro Fernandes ·{" "}
        <span className="text-ink-50/60">Feito com cuidado em MG</span>
      </p>

      {/* marquee DROPÊ no rodapé absoluto */}
      <div className="mt-10 overflow-hidden opacity-[0.07]" aria-hidden>
        <div className="marquee-track">
          {[0, 1].map((n) => (
            <span key={n} className="flex shrink-0 items-center gap-10 pr-10">
              {Array.from({ length: 4 }).map((_, i) => (
                <span key={i} className="flex items-center gap-10">
                  <span className="text-[clamp(5rem,12vw,10rem)] font-extrabold leading-none tracking-tight text-ink-50">
                    DROPÊ
                  </span>
                  <span className="size-4 rounded-full bg-brand" />
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* logo mínima no canto */}
      <div className="pointer-events-none absolute right-8 top-8 opacity-40">
        <Image src="/brand/drope-dark.svg" alt="" width={80} height={28} className="h-6 w-auto" />
      </div>
    </footer>
  );
}
