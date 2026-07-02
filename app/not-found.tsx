"use client";

import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * 404 global — captura qualquer URL não encontrada (PT e EN).
 * Personalidade de designer ("esse frame foi deletado") + CTAs de retorno.
 * Bilíngue via locale derivado do pathname.
 */
export default function NotFound() {
  const { locale } = useLocale();
  const pt = locale === "pt";

  const copy = pt
    ? {
        tag: "Erro 404 · frame não encontrado",
        title: "Esse frame foi deletado.",
        body: "A página que você procurou não existe, mudou de lugar ou o link veio quebrado. Acontece — nem toda layer sobrevive ao processo.",
        home: "Voltar ao início",
        book: "Agendar conversa",
      }
    : {
        tag: "Error 404 · frame not found",
        title: "This frame was deleted.",
        body: "The page you were looking for doesn't exist, moved, or the link came broken. It happens — not every layer survives the process.",
        home: "Back to home",
        book: "Book a call",
      };

  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden">
      {/* Régua decorativa no topo — nod ao ofício, aria-hidden */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-24 h-6 opacity-[0.35]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, rgb(var(--border)) 0 1px, transparent 1px 10px), repeating-linear-gradient(90deg, rgb(var(--border)) 0 1px, transparent 1px 100px)",
          backgroundSize: "10px 8px, 100px 24px",
          backgroundPosition: "0 bottom, 0 top",
          backgroundRepeat: "repeat-x",
          maskImage: "linear-gradient(90deg, transparent, #000 20%, #000 80%, transparent)",
        }}
      />
      {/* glow vermelho difuso */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 size-96 rounded-full bg-brand/10 blur-3xl"
      />

      <Container className="relative flex flex-col gap-7 max-w-3xl">
        <p className="label-mono flex items-center gap-2">
          <span className="size-1 rounded-full bg-brand" />
          {copy.tag}
        </p>

        {/* 404 gigante em outline atrás */}
        <div className="relative">
          <span
            aria-hidden
            className="block text-[clamp(6rem,22vw,16rem)] font-semibold leading-none tracking-[-0.04em] text-fg-strong/[0.06] select-none"
          >
            404
          </span>
          <h1 className="text-display text-fg-strong text-balance -mt-4 md:-mt-8">
            {copy.title}
          </h1>
        </div>

        <p className="text-lead text-fg-body max-w-prose">{copy.body}</p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-pill bg-brand px-6 py-3.5 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition shadow-sm shadow-brand/20"
          >
            <ArrowLeft className="size-3.5 transition group-hover:-translate-x-0.5" strokeWidth={2.5} />
            {copy.home}
          </Link>
          <Link
            href="/agendar"
            className="group inline-flex items-center gap-1.5 text-sm font-medium text-fg-strong hover:text-brand transition"
          >
            {copy.book}
            <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
