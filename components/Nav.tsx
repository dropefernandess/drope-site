"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const links = [
  { href: "/",            label: "Início"      },
  { href: "/sobre",       label: "Sobre"       },
  { href: "/#projetos",   label: "Trabalhos"   },
  { href: "/proposta",    label: "Método"      },
  { href: "/calculadora", label: "Calculadora" },
  { href: "/blog",        label: "Blog"        },
];

/**
 * Nav — pill flutuante desktop + drawer mobile. Adaptado pra dual-theme.
 * Logo troca entre dark/light via prop (CSS handle via mix-blend ou class).
 */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => { setOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    if (path === "/" || path === "") return pathname === "/" && !href.includes("#");
    return pathname === path || pathname.startsWith(path + "/");
  };

  return (
    <>
      {/* ============ DESKTOP — pill flutuante ============ */}
      <header className="hidden md:flex fixed inset-x-0 top-4 z-50 justify-center px-6 pointer-events-none">
        <div
          className={cn(
            "pointer-events-auto flex items-center gap-2 rounded-pill border border-line px-2 py-2 backdrop-blur-xl transition-colors duration-300",
            scrolled ? "bg-bg/85" : "bg-bg/65"
          )}
        >
          {/* Logo: ícone dark sobre light, ícone light sobre dark */}
          <Link href="/" aria-label="Dropê — index" className="pl-3 pr-2">
            {/* light mode → mostra ícone escuro */}
            <Image
              src="/brand/icone-light.svg"
              alt="Dropê"
              width={28}
              height={28}
              priority
              className="dark:hidden"
            />
            <Image
              src="/brand/icone-dark.svg"
              alt="Dropê"
              width={28}
              height={28}
              priority
              className="hidden dark:block"
            />
          </Link>

          {/* Links */}
          <nav className="flex items-center gap-0.5">
            {links.map((l) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "rounded-pill px-3 py-1.5 text-sm font-medium transition-colors",
                    active
                      ? "text-fg-strong bg-surface-2"
                      : "text-fg-mute hover:text-fg-strong hover:bg-surface"
                  )}
                >
                  {l.label}
                </Link>
              );
            })}
          </nav>

          {/* Theme toggle */}
          <ThemeToggle className="ml-1" />

          {/* CTA */}
          <Link
            href="/agendar"
            className="ml-1 inline-flex items-center gap-1.5 rounded-pill bg-fg-strong px-4 py-2 text-sm font-semibold text-bg transition hover:opacity-90"
          >
            Agendar
            <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
          </Link>
        </div>
      </header>

      {/* ============ MOBILE — bar + drawer ============ */}
      <header className="md:hidden fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-bg/85 border-b border-line">
        <div className="flex h-14 items-center justify-between px-5">
          <Link href="/" aria-label="Dropê — index" onClick={() => setOpen(false)}>
            <Image src="/brand/drope-light.svg" alt="Dropê" width={92} height={32} priority className="dark:hidden" />
            <Image src="/brand/drope-dark.svg" alt="Dropê" width={92} height={32} priority className="hidden dark:block" />
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              aria-label={open ? "Fechar menu" : "Abrir menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-fg-strong"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer mobile */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-40 bg-bg transition-opacity duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <div className="flex h-full flex-col pt-20 pb-10 px-5">
          <nav className="flex flex-1 flex-col gap-1">
            {links.map((l, i) => {
              const active = isActive(l.href);
              return (
                <Link
                  key={l.href}
                  href={l.href}
                  style={{ transitionDelay: open ? `${i * 40 + 100}ms` : "0ms" }}
                  className={cn(
                    "flex items-center justify-between border-b border-line py-5 transition-all duration-500",
                    open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
                    active ? "text-fg-strong" : "text-fg-body"
                  )}
                >
                  <span className="text-3xl font-extrabold tracking-tight">{l.label}</span>
                  <ArrowUpRight className="size-5 text-fg-mute" />
                </Link>
              );
            })}
          </nav>

          <Link
            href="/agendar"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-pill bg-fg-strong px-6 py-4 text-base font-semibold text-bg"
          >
            Agendar conversa
            <ArrowUpRight className="size-4" strokeWidth={2.5} />
          </Link>
        </div>
      </div>
    </>
  );
}
