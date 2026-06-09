"use client";

import Image from "next/image";
import { ArrowUpRight, Mail, Instagram, Linkedin } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";

const nav: { href: string; key: DictionaryKey }[] = [
  { href: "/",            key: "nav.inicio"      },
  { href: "/sobre",       key: "nav.sobre"       },
  { href: "/projetos",    key: "nav.trabalhos"   },
  { href: "/proposta",    key: "nav.metodo"      },
  { href: "/calculadora", key: "nav.calculadora" },
  { href: "/agendar",     key: "nav.cta"         },
  { href: "/blog",        key: "nav.blog"        },
];

const social = [
  { href: "https://instagram.com/drope.fernandes", label: "Instagram", Icon: Instagram },
  { href: "https://linkedin.com/in/dropefernandes", label: "LinkedIn", Icon: Linkedin },
  { href: "https://behance.net/dropefernandes", label: "Behance" },
  { href: "https://dribbble.com/drope-fernandes", label: "Dribbble" },
];

export function Footer() {
  const { t } = useLocale();
  const cidades = [
    { city: "Senador Firmino, MG", time: t("footer.cidade_aqui") },
    { city: t("footer.cidade_remoto"),     time: t("footer.fuso") },
  ];
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
          <Link href="/" aria-label="Dropê — home" className="inline-flex">
            <Image
              src="/brand/drope-dark.svg"
              alt="Dropê"
              width={160}
              height={56}
              className="h-12 w-auto"
            />
          </Link>
          <p className="text-sm text-bg/70 max-w-xs leading-relaxed">
            {t("footer.bio")}
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
            {t("footer.nav_label")}
          </p>
          <ul className="flex flex-col gap-2.5">
            {nav.map((l) => (
              <li key={l.href}>
                <FooterLink href={l.href}>{t(l.key)}</FooterLink>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Social */}
        <Reveal delay={0.2} className="md:col-span-3 flex flex-col gap-4">
          <p className="text-[11px] uppercase tracking-wider font-medium text-bg/40">
            {t("footer.social_label")}
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
            {t("footer.horarios_label")}
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
            <span className="text-[11px] font-medium text-bg/80">{t("footer.status")}</span>
          </div>
        </Reveal>
      </Container>

      {/* === FOOTER BOTTOM === */}
      <Container className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-6 border-t border-bg/10 text-xs text-bg/55">
        <p>
          © {new Date().getFullYear()} Dropê {t("footer.copyright_suffix")}
        </p>
        <div className="flex gap-5">
          <Link href="/legal/privacy" className="hover:text-bg transition">
            {t("footer.privacy")}
          </Link>
          <Link href="/legal/terms" className="hover:text-bg transition">
            {t("footer.terms")}
          </Link>
          <span className="hidden md:inline">
            {t("footer.made_in")}
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
