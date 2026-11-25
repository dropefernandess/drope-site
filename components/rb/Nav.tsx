"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { Locale } from "@/lib/i18n/dictionaries";
import { Icon, ICONS, RollText } from "@/components/rb/ui";
import { DotWave } from "@/components/rb/DotWave";

/** Seta do CTA: sai pela diagonal e uma cópia entra por baixo (.rb-cta__icon). */
function CtaArrow({ size }: { size: number }) {
  return (
    <span className="rb-cta__icon">
      <Icon d={ICONS.arrowUpRight} size={size} />
      <Icon d={ICONS.arrowUpRight} size={size} />
    </span>
  );
}

/**
 * Menu do rebrand 2026 — pílula escura flutuante (como o site atual),
 * Figma "Menu (como o do site atual)". No celular: barra com símbolo,
 * idioma, tema e botão de menu; o menu abre em tela cheia.
 */

const LINKS: { href: string; pt: string; en: string }[] = [
  { href: "/", pt: "Início", en: "Home" },
  { href: "/sobre", pt: "Sobre", en: "About" },
  { href: "/projetos", pt: "Trabalhos", en: "Work" },
  { href: "/metodo", pt: "Método", en: "Method" },
  { href: "/orcamento", pt: "Orçamento", en: "Quote" },
  { href: "/blog", pt: "Blog", en: "Blog" },
];

const CTA = { pt: "Agendar", en: "Book a call" };
const CTA_LONG = { pt: "Agendar uma conversa", en: "Book a call" };

function pathForLocale(pathname: string, target: Locale): string {
  const isEn = pathname === "/en" || pathname.startsWith("/en/");
  const ptPath = isEn ? pathname.replace(/^\/en/, "") || "/" : pathname;
  if (target === "pt") return ptPath;
  return ptPath === "/" ? "/en" : `/en${ptPath}`;
}

const FLAGS: Record<Locale, { src: string; label: string }> = {
  pt: { src: "/flags/br.svg", label: "Português" },
  en: { src: "/flags/us.svg", label: "English" },
};

/** Seletor de idioma no estilo da pílula escura. */
function LocaleSwitch() {
  const { locale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => { if (!ref.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => { document.removeEventListener("mousedown", onClick); document.removeEventListener("keydown", onKey); };
  }, [open]);
  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={locale === "pt" ? "Mudar idioma" : "Switch language"}
        className="inline-flex h-10 items-center gap-2 rounded-pill border border-ink-700 px-3 text-ink-200 transition-colors hover:bg-ink-700 hover:text-ink-50"
      >
        <span className="relative inline-block h-[17px] w-6 overflow-hidden rounded-[3px]">
          <Image src={FLAGS[locale].src} alt="" fill sizes="24px" />
        </span>
        <Icon d={ICONS.chevronDown} size={14} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <ul role="listbox" className="absolute right-0 top-full z-50 mt-2 min-w-[168px] overflow-hidden rounded-card border border-ink-700 bg-ink-900 p-1 shadow-xl">
          {(Object.keys(FLAGS) as Locale[]).map((loc) => (
            <li key={loc}>
              <button
                type="button"
                role="option"
                aria-selected={loc === locale}
                onClick={() => { setOpen(false); if (loc !== locale) router.push(pathForLocale(pathname ?? "/", loc)); }}
                className={cn("flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-sm font-medium transition-colors", loc === locale ? "bg-ink-700 text-ink-50" : "text-ink-200 hover:bg-ink-700/60 hover:text-ink-50")}
              >
                <span className="relative inline-block h-[17px] w-6 shrink-0 overflow-hidden rounded-[3px]">
                  <Image src={FLAGS[loc].src} alt="" fill sizes="24px" />
                </span>
                {FLAGS[loc].label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const themeCls = "size-10 border-ink-700 bg-transparent text-ink-50 hover:bg-ink-700";

export function Nav() {
  const { locale } = useLocale();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const canonical = pathname === "/en" || pathname?.startsWith("/en/") ? pathname.replace(/^\/en/, "") || "/" : pathname ?? "/";
  const isActive = (href: string) => (href === "/" ? canonical === "/" : canonical === href || canonical.startsWith(href + "/"));

  return (
    <>
      <a href="#conteudo" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-pill focus:bg-ink-900 focus:px-4 focus:py-2 focus:text-ink-50">
        {locale === "pt" ? "Pular para o conteúdo" : "Skip to content"}
      </a>

      {/* Desktop: pílula escura centralizada */}
      <header className="pointer-events-none fixed inset-x-0 top-6 z-50 hidden justify-center px-6 lg:flex">
        <div className="pointer-events-auto flex items-center gap-1 rounded-pill border border-ink-700 bg-ink-900 py-2 pl-2.5 pr-2 shadow-[0_10px_30px_-12px_rgb(16_16_16/0.5)]">
          <Link href="/" aria-label={locale === "pt" ? "Drope Fernandes, início" : "Drope Fernandes, home"} className="grid h-10 w-12 place-items-center">
            <Image src="/brand/icone-dark.svg" alt="" width={27} height={26} priority />
          </Link>
          <nav aria-label={locale === "pt" ? "Principal" : "Main"} className="flex items-center gap-1">
            {LINKS.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-pill px-3.5 py-2.5 text-base leading-none tracking-[-0.01em] transition-colors",
                    active ? "bg-ink-700 font-semibold text-ink-50" : "font-medium text-ink-200 hover:text-ink-50"
                  )}
                >
                  {l[locale]}
                </Link>
              );
            })}
          </nav>
          <div className="ml-1 flex items-center gap-1">
            <LocaleSwitch />
            <ThemeToggle className={themeCls} />
            <Link href="/agendar" className="rb-cta ml-1 inline-flex h-10 items-center gap-2 rounded-pill bg-ink-50 px-5 text-base font-semibold tracking-[-0.01em] text-ink-900 transition-[background-color,transform] duration-200 hover:bg-white focus-visible:rounded-pill">
              <DotWave pitch={5} size={1.5} />
              <RollText>{CTA[locale]}</RollText>
              <CtaArrow size={16} />
            </Link>
          </div>
        </div>
      </header>

      {/* Celular e tablet: barra + menu em tela cheia */}
      <header className="fixed inset-x-4 top-4 z-50 lg:hidden">
        <div className="flex h-14 items-center justify-between rounded-pill border border-ink-700 bg-ink-900 py-2 pl-2 pr-2">
          <Link href="/" aria-label="Drope Fernandes" className="grid h-10 w-12 place-items-center">
            <Image src="/brand/icone-dark.svg" alt="" width={27} height={26} priority />
          </Link>
          <div className="flex items-center gap-2">
            <LocaleSwitch />
            <ThemeToggle className={themeCls} />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="menu-celular"
              aria-label={open ? (locale === "pt" ? "Fechar menu" : "Close menu") : locale === "pt" ? "Abrir menu" : "Open menu"}
              className="grid size-10 place-items-center rounded-full bg-ink-700 text-ink-50"
            >
              <Icon d={open ? ICONS.close : ICONS.menu} size={20} />
            </button>
          </div>
        </div>
      </header>
      <div
        id="menu-celular"
        className={cn("fixed inset-0 z-40 bg-ink-900 transition-opacity duration-300 lg:hidden", open ? "opacity-100" : "pointer-events-none opacity-0")}
        aria-hidden={!open}
      >
        <div className="flex h-full flex-col px-6 pb-8 pt-[104px]">
          <nav aria-label={locale === "pt" ? "Principal" : "Main"} className="flex flex-1 flex-col">
            {LINKS.map((l, i) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  tabIndex={open ? 0 : -1}
                  style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                  className={cn(
                    "t-h1 flex items-center justify-between border-b border-ink-700 py-[18px] transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    active ? "text-ink-50" : "text-ink-200"
                  )}
                >
                  {l[locale]}
                  <Icon d={ICONS.arrowUpRight} size={20} className="text-ink-400" />
                </Link>
              );
            })}
          </nav>
          <Link href="/agendar" tabIndex={open ? 0 : -1} className="rb-cta mt-6 inline-flex h-14 items-center justify-center gap-2 rounded-pill bg-ink-50 text-lg font-semibold text-ink-900 transition-transform duration-200 focus-visible:rounded-pill">
            <DotWave pitch={6} size={2} />
            <RollText>{CTA_LONG[locale]}</RollText>
            <CtaArrow size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
