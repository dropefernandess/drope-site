"use client";

import { useRef } from "react";
import Image from "next/image";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import {
  Action,
  DataBlock,
  Eyebrow,
  Grid,
  MaskedHeading,
  Rule,
  Snap,
} from "./system";
import { useEnterTimeline } from "./system/useEnterTimeline";

/**
 * V2Hero — "O Ponto de Silêncio".
 *
 * O hero DECLARA. Ele não mostra trabalho: sete miniaturas de 220px
 * rotacionadas não deixam ninguém ler nada. O portfólio vem na seção
 * Trabalhos, com meia tela por case.
 *
 * Composição: conteúdo nas col 1–8, dados nas col 10–12, col 9 vazia.
 * O silêncio é deliberado — é a lei nº 1 da direção.
 *
 * Morreu aqui: leque de 7 covers, balões de chat, side-nav vertical,
 * headline centralizada, peso 800, stagger palavra-por-palavra.
 */

const NAV = [
  { href: "#servicos", label: "Serviços" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#contato", label: "Contato" },
];

/* Dados reais — content/projetos.ts e CONTEXT.md. Nada inventado. */
const DADOS = [
  { value: "13", label: "projetos entregues" },
  { value: "07", label: "anos de ofício" },
  { value: "03", label: "países atendidos" },
];

export function V2Hero() {
  const root = useRef<HTMLElement>(null);
  useEnterTimeline(root);

  return (
    <section
      id="hero"
      ref={root}
      className="relative flex min-h-svh flex-col"
      style={{ scrollMarginTop: "var(--v2-16)" }}
    >
      {/* ===== HEADER ===== */}
      <Snap step={0}>
        <Grid as="header" className="items-center py-6">
          <div className="col-span-2 md:col-span-3">
            <Link href="/" aria-label="Dropê — início" className="inline-block">
              <Image
                src="/brand/drope-light.svg"
                alt="Dropê"
                width={104}
                height={36}
                priority
                className="h-8 w-auto"
              />
            </Link>
          </div>

          <nav
            aria-label="Seções"
            className="col-span-6 hidden justify-center gap-8 md:flex"
          >
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="v2-nav-link"
                style={{ fontSize: "var(--v2-small)", color: "var(--v2-text-secondary)" }}
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="col-span-2 flex justify-end md:col-span-3">
            <Action href="/agendar" variant="solid">
              Agendar
            </Action>
          </div>
        </Grid>
      </Snap>

      {/* ===== CONTEÚDO ===== */}
      <Grid className="flex-1 content-center py-16 md:py-24">
        <div className="col-span-4 md:col-span-8">
          <Snap step={0}>
            <Eyebrow>Designer Multidisciplinar · 7&nbsp;anos</Eyebrow>
          </Snap>

          <MaskedHeading
            step={1}
            className="v2-display mt-6"
            lines={[
              <>Crio marcas pra durar</>,
              <>
                e entrego{" "}
                <span style={{ color: "var(--v2-accent)" }}>funcionando.</span>
              </>,
            ]}
          />

          <Snap step={3}>
            <p className="v2-lead mt-8">
              Branding, UI/UX e desenvolvimento na mesma cabeça, do briefing ao
              ar. Sem ping-pong entre fornecedores.
            </p>
          </Snap>

          <Snap step={4} className="mt-10 flex flex-wrap items-center gap-6">
            <Action href="#trabalhos" variant="solid">
              Ver trabalhos
            </Action>
            <Action href="/agendar" variant="quiet">
              ou agenda 30&nbsp;min
            </Action>
          </Snap>
        </div>

        {/* col 9 vazia — o silêncio */}
        <Snap
          step={5}
          className="col-span-4 mt-16 md:col-span-3 md:col-start-10 md:mt-0 md:self-end"
        >
          <DataBlock items={DADOS} />
        </Snap>
      </Grid>

      {/* ===== RÉGUA — marca o baseline do site ===== */}
      <div style={{ paddingInline: "var(--v2-margin)" }}>
        <div style={{ maxWidth: "var(--v2-container)", margin: "0 auto" }}>
          <Rule step={6} tone="strong" />
        </div>
      </div>
    </section>
  );
}
