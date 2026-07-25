"use client";

import Image from "next/image";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { SITE } from "@/lib/config";

/**
 * V3Fecho — CTA + footer. O gradiente respirando (~20s) é a referência
 * Immersive Garden: a última dobra é a única do site com cor viva fora
 * do hero, o que fecha o arco das correntes.
 *
 * Densidade no footer é permitida e desejável — é o único lugar da
 * página onde preencher as 12 colunas está correto.
 */
export function V3Fecho() {
  return (
    <footer id="contato" className="relative overflow-hidden" style={{ scrollMarginTop: "24px" }}>
      <div className="v3-fecho-bg -z-10" aria-hidden="true" />

      {/* ===== CTA ===== */}
      <div className="v3-wrap relative pb-24 pt-32 md:pb-32 md:pt-40">
        <div className="v3-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <p className="v3-mono" data-reveal>
              06 — Próximo projeto
            </p>
            <h2 className="v3-display mt-6" data-reveal>
              Vamos criar algo{" "}
              <em className="v3-em v3-em--glow">que dura.</em>
            </h2>
            <p className="v3-lead mt-8" data-reveal>
              Me conta o que você precisa e eu respondo em até 24h — com
              opinião, não com formulário.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3" data-reveal>
              <Link href="/agendar" className="v3-btn v3-btn--primary">
                Agendar conversa
              </Link>
              <Link href="/calculadora" className="v3-btn v3-btn--ghost">
                Estimar projeto
              </Link>
            </div>
          </div>

          <ul className="col-span-4 mt-14 space-y-4 self-end md:col-span-8 lg:col-span-3 lg:col-start-10 lg:mt-0">
            {["Resposta em até 24h", "Primeira reunião sem custo", "Cronograma na 1ª semana"].map(
              (t) => (
                <li key={t} className="flex items-start gap-3" data-reveal>
                  <span
                    aria-hidden="true"
                    className="mt-[7px] size-1.5 shrink-0 rounded-full bg-[var(--sage-400)]"
                  />
                  <span className="v3-small">{t}</span>
                </li>
              ),
            )}
          </ul>
        </div>
      </div>

      <hr className="v3-rule" />

      {/* ===== FOOTER ===== */}
      <div className="v3-wrap relative py-16">
        <div className="v3-grid gap-y-12">
          <div className="col-span-4 lg:col-span-4">
            <Image
              src="/brand/drope-dark.svg"
              alt="Dropê"
              width={104}
              height={36}
              loading="lazy"
              className="h-8 w-auto brightness-0 invert"
            />
            <p className="v3-small mt-6 max-w-[34ch] text-[var(--n-500)]">
              Designer Multidisciplinar. Marcas, interfaces e sistemas visuais
              do conceito ao ar.
            </p>
          </div>

          <nav className="col-span-2 lg:col-span-2" aria-label="Navegação">
            <p className="v3-mono mb-5">Navegação</p>
            <ul className="space-y-3">
              {[
                { href: "/projetos", label: "Trabalhos" },
                { href: "/sobre", label: "Sobre" },
                { href: "/proposta", label: "Método" },
                { href: "/blog", label: "Blog" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="v3-small transition-colors duration-200 hover:text-[var(--n-0)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="col-span-2 lg:col-span-2" aria-label="Recursos">
            <p className="v3-mono mb-5">Recursos</p>
            <ul className="space-y-3">
              {[
                { href: "/calculadora", label: "Calculadora" },
                { href: "/glossario", label: "Glossário" },
                { href: "/cv", label: "Currículo" },
              ].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="v3-small transition-colors duration-200 hover:text-[var(--n-0)]"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 lg:col-span-3 lg:col-start-10">
            <p className="v3-mono mb-5">Contato</p>
            <ul className="space-y-3">
              <li>
                <a
                  href={`mailto:${SITE.contactEmail}`}
                  className="v3-small transition-colors duration-200 hover:text-[var(--n-0)]"
                >
                  {SITE.contactEmail}
                </a>
              </li>
              <li className="v3-small text-[var(--n-500)]">Senador Firmino · MG</li>
              <li className="v3-small text-[var(--n-500)]">Seg–Sex · 9h às 18h</li>
            </ul>
          </div>
        </div>

        <hr className="v3-rule my-12" />

        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="v3-mono">Dropê © 2026 · Pedro Fernandes</p>
          <p className="v3-mono">Feito com cuidado em MG</p>
        </div>
      </div>
    </footer>
  );
}
