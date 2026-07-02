import type { Metadata } from "next";
import { Fraunces, Space_Grotesk, JetBrains_Mono, IBM_Plex_Mono } from "next/font/google";

/**
 * /styleguide — rota INTERNA de decisão da Fase 0 (Design System).
 *
 * Apresenta 3 direções de paleta + tipografia lado a lado, renderizadas
 * de verdade (fontes carregadas, componentes de exemplo), pro Pedro
 * escolher ANTES de aplicar qualquer token globalmente.
 *
 * noindex — não entra no sitemap nem nas SERPs.
 * As fontes abaixo são carregadas SÓ nesta rota (chunk da página).
 */

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-space",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex",
});

export const metadata: Metadata = {
  title: "Styleguide interno — 3 direções",
  robots: { index: false, follow: false },
};

// ============ DADOS DAS 3 DIREÇÕES ============

type Direction = {
  id: "A" | "B" | "C";
  name: string;
  tagline: string;
  racional: string;
  risco: string;
  displayFont: string; // css font-family pro display
  displayWeight: number;
  displayTracking: string;
  monoFont: string;
  brand: string;
  brandDeep: string;
  scale: { tone: string; hex: string }[];
  paper: string;   // bg claro
  ink: string;     // texto forte
  inkSoft: string; // texto corpo
  surface: string; // card
  line: string;    // borda
  radius: string;  // raio dos cards
  radiusBtn: string;
};

const directions: Direction[] = [
  {
    id: "A",
    name: "Assinatura",
    tagline: "Evolução do atual — Inter em peso radical + mono verdadeiro",
    racional:
      "Mantém tudo que já é reconhecível (Inter, vermelho #DE2828, cream). O upgrade vem da ESCALA completa do vermelho (50–900), surfaces em camadas, raios mais editoriais e um mono DE VERDADE (IBM Plex Mono) nos labels — hoje o \"label-mono\" usa Inter, o que é meio mentira tipográfica.",
    risco: "Risco mínimo. É refino, não pivô. Quem já viu o site continua reconhecendo.",
    displayFont: "var(--font-inter), Inter, sans-serif",
    displayWeight: 650,
    displayTracking: "-0.03em",
    monoFont: "var(--font-plex), monospace",
    brand: "#DE2828",
    brandDeep: "#A31B1B",
    scale: [
      { tone: "50", hex: "#FDF2F2" },
      { tone: "100", hex: "#FBE0E0" },
      { tone: "300", hex: "#EE9292" },
      { tone: "500", hex: "#DE2828" },
      { tone: "700", hex: "#A31B1B" },
      { tone: "900", hex: "#5C1212" },
    ],
    paper: "#F2F2EB",
    ink: "#101010",
    inkSoft: "#3D3D3D",
    surface: "#FFFFFF",
    line: "#E3E3DA",
    radius: "16px",
    radiusBtn: "999px",
  },
  {
    id: "B",
    name: "Editorial",
    tagline: "Fraunces display serif + carmim profundo — estúdio premium",
    racional:
      "Quebra o \"look template\" com uma display serif de personalidade (Fraunces, variable, ótima em pesos altos) SÓ em títulos — corpo continua Inter. Carmim mais profundo (#B92B27) e papel mais quente. Vibe editorial tipo estúdio de branding europeu. É a direção que mais se afasta de 'site de dev' e mais se aproxima de 'estúdio de marca'.",
    risco:
      "Risco médio: contraria a tua decisão antiga de 'Inter only, sem serif'. Mas redesign agressivo é a hora de re-testar isso — e serif só em display é bem diferente de serif no corpo.",
    displayFont: "var(--font-fraunces), Georgia, serif",
    displayWeight: 600,
    displayTracking: "-0.015em",
    monoFont: "var(--font-plex), monospace",
    brand: "#B92B27",
    brandDeep: "#8C1F1C",
    scale: [
      { tone: "50", hex: "#FBF1F0" },
      { tone: "100", hex: "#F6DBDA" },
      { tone: "300", hex: "#DE8B88" },
      { tone: "500", hex: "#B92B27" },
      { tone: "700", hex: "#8C1F1C" },
      { tone: "900", hex: "#521211" },
    ],
    paper: "#F5F1E8",
    ink: "#17130F",
    inkSoft: "#453E36",
    surface: "#FFFDF8",
    line: "#E6DFD2",
    radius: "12px",
    radiusBtn: "999px",
  },
  {
    id: "C",
    name: "Canvas Técnico",
    tagline: "Space Grotesk + JetBrains Mono — a cara das réguas",
    racional:
      "A direção que abraça 100% o conceito Design Canvas: Space Grotesk no display (geométrica, técnica, com personalidade nos terminais), JetBrains Mono em labels/números/coordenadas — a MESMA família que as réguas usariam. Vermelho puxado pro laranja (#E23A1F) que vibra mais em tela. É a que mais grita \"feito por quem vive dentro da ferramenta\".",
    risco:
      "Risco médio-alto: muda a temperatura da marca (vermelho→vermelho-laranja) e a voz tipográfica inteira. Ganha personalidade técnica, perde um pouco da sobriedade atual.",
    displayFont: "var(--font-space), sans-serif",
    displayWeight: 700,
    displayTracking: "-0.025em",
    monoFont: "var(--font-jetbrains), monospace",
    brand: "#E23A1F",
    brandDeep: "#B02A14",
    scale: [
      { tone: "50", hex: "#FEF3F0" },
      { tone: "100", hex: "#FCE1DB" },
      { tone: "300", hex: "#F49B87" },
      { tone: "500", hex: "#E23A1F" },
      { tone: "700", hex: "#B02A14" },
      { tone: "900", hex: "#63180C" },
    ],
    paper: "#F4F2EF",
    ink: "#121212",
    inkSoft: "#3A3A38",
    surface: "#FFFFFF",
    line: "#E2E0DB",
    radius: "10px",
    radiusBtn: "10px",
  },
];

// ============ PAGE ============

export default function StyleguidePage() {
  return (
    <div
      className={`${fraunces.variable} ${spaceGrotesk.variable} ${jetbrains.variable} ${plexMono.variable} min-h-screen bg-bg`}
    >
      <main className="mx-auto max-w-[1100px] px-6 pt-32 pb-24 flex flex-col gap-16">

        {/* HEADER */}
        <header className="flex flex-col gap-4">
          <p className="label-mono flex items-center gap-2">
            <span className="size-1 rounded-full bg-brand" />
            Fase 0 · Rota interna (noindex)
          </p>
          <h1 className="text-display text-fg-strong">Styleguide — 3 direções</h1>
          <p className="text-lead max-w-prose">
            Compara as três abaixo e me diz no chat: <strong>A</strong>,{" "}
            <strong>B</strong> ou <strong>C</strong> (ou uma mistura, tipo
            &quot;paleta da C com tipografia da A&quot;). Nada é aplicado no site
            até você escolher.
          </p>
        </header>

        {/* AS 3 DIREÇÕES */}
        {directions.map((d) => (
          <section
            key={d.id}
            className="flex flex-col overflow-hidden rounded-section border border-line"
            style={{ background: d.paper }}
          >
            {/* Barra título da direção */}
            <div
              className="flex flex-wrap items-baseline justify-between gap-3 px-7 py-5 border-b"
              style={{ borderColor: d.line }}
            >
              <div className="flex items-baseline gap-4">
                <span
                  className="text-3xl font-bold"
                  style={{ color: d.brand, fontFamily: d.monoFont }}
                >
                  {d.id}
                </span>
                <h2 className="text-2xl font-semibold" style={{ color: d.ink }}>
                  {d.name}
                </h2>
              </div>
              <p className="text-sm" style={{ color: d.inkSoft }}>
                {d.tagline}
              </p>
            </div>

            <div className="grid gap-0 lg:grid-cols-[1.4fr_1fr]">
              {/* ESQUERDA — type specimen + componentes */}
              <div className="flex flex-col gap-8 p-7 md:p-10">
                {/* Specimen */}
                <div className="flex flex-col gap-3">
                  <p
                    className="text-[11px] uppercase tracking-[0.15em]"
                    style={{ color: d.brand, fontFamily: d.monoFont }}
                  >
                    01 — Hero specimen
                  </p>
                  <p
                    style={{
                      fontFamily: d.displayFont,
                      fontWeight: d.displayWeight,
                      letterSpacing: d.displayTracking,
                      fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                      lineHeight: 1.04,
                      color: d.ink,
                    }}
                  >
                    Crio marcas pra durar{" "}
                    <span style={{ color: d.brand }}>e entrego elas funcionando.</span>
                  </p>
                  <p
                    className="max-w-[52ch]"
                    style={{
                      fontFamily: "var(--font-inter), Inter, sans-serif",
                      fontSize: "1.03rem",
                      lineHeight: 1.6,
                      color: d.inkSoft,
                    }}
                  >
                    Branding, UI/UX e desenvolvimento na mesma cabeça, do briefing
                    à launch. Corpo de texto continua Inter em todas as direções —
                    o que muda é a voz do display e dos labels.
                  </p>
                  <p
                    style={{
                      fontFamily: d.monoFont,
                      fontSize: "0.75rem",
                      letterSpacing: "0.08em",
                      color: d.inkSoft,
                    }}
                  >
                    X: 1204 · Y: 384 — label mono de verdade ({d.id === "C" ? "JetBrains Mono" : "IBM Plex Mono"})
                  </p>
                </div>

                {/* Componentes */}
                <div className="flex flex-col gap-3">
                  <p
                    className="text-[11px] uppercase tracking-[0.15em]"
                    style={{ color: d.brand, fontFamily: d.monoFont }}
                  >
                    02 — Componentes
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="px-6 py-3 text-sm font-semibold transition"
                      style={{
                        background: d.brand,
                        color: "#FFF8F0",
                        borderRadius: d.radiusBtn,
                        fontFamily: "var(--font-inter), Inter, sans-serif",
                      }}
                    >
                      Ver trabalhos
                    </button>
                    <button
                      className="px-6 py-3 text-sm font-semibold"
                      style={{
                        background: "transparent",
                        color: d.ink,
                        border: `1px solid ${d.line}`,
                        borderRadius: d.radiusBtn,
                      }}
                    >
                      Agendar conversa
                    </button>
                    <span
                      className="px-3 py-1.5 text-[11px] font-medium"
                      style={{
                        border: `1px solid ${d.line}`,
                        background: d.surface,
                        color: d.inkSoft,
                        borderRadius: "999px",
                      }}
                    >
                      Aceitando projetos · Q3 2026
                    </span>
                  </div>

                  {/* Card exemplo */}
                  <div
                    className="mt-2 flex flex-col gap-2 p-6 max-w-md"
                    style={{
                      background: d.surface,
                      border: `1px solid ${d.line}`,
                      borderRadius: d.radius,
                    }}
                  >
                    <p
                      className="text-[10px] uppercase tracking-[0.14em]"
                      style={{ color: d.brand, fontFamily: d.monoFont }}
                    >
                      Branding
                    </p>
                    <p
                      style={{
                        fontFamily: d.displayFont,
                        fontWeight: Math.min(d.displayWeight, 600),
                        fontSize: "1.35rem",
                        color: d.ink,
                        letterSpacing: d.displayTracking,
                      }}
                    >
                      Marcas que respiram propósito.
                    </p>
                    <p className="text-sm" style={{ color: d.inkSoft, lineHeight: 1.55 }}>
                      Da estratégia ao manual final — card com raio {d.radius} e
                      surface em camada sobre o papel.
                    </p>
                  </div>
                </div>
              </div>

              {/* DIREITA — paleta + racional */}
              <div
                className="flex flex-col gap-6 p-7 md:p-10 border-t lg:border-t-0 lg:border-l"
                style={{ borderColor: d.line }}
              >
                <div className="flex flex-col gap-3">
                  <p
                    className="text-[11px] uppercase tracking-[0.15em]"
                    style={{ color: d.brand, fontFamily: d.monoFont }}
                  >
                    03 — Paleta
                  </p>
                  <div className="grid grid-cols-6 gap-1.5">
                    {d.scale.map((s) => (
                      <div key={s.tone} className="flex flex-col gap-1">
                        <div
                          className="h-14 rounded-md border"
                          style={{ background: s.hex, borderColor: d.line }}
                        />
                        <span
                          className="text-[9px] text-center"
                          style={{ color: d.inkSoft, fontFamily: d.monoFont }}
                        >
                          {s.tone}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-4 gap-1.5">
                    {[
                      { l: "paper", hex: d.paper },
                      { l: "surface", hex: d.surface },
                      { l: "ink", hex: d.ink },
                      { l: "line", hex: d.line },
                    ].map((n) => (
                      <div key={n.l} className="flex flex-col gap-1">
                        <div
                          className="h-10 rounded-md border"
                          style={{ background: n.hex, borderColor: d.line }}
                        />
                        <span
                          className="text-[9px] text-center"
                          style={{ color: d.inkSoft, fontFamily: d.monoFont }}
                        >
                          {n.l}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <p
                    className="text-[11px] uppercase tracking-[0.15em]"
                    style={{ color: d.brand, fontFamily: d.monoFont }}
                  >
                    04 — Racional
                  </p>
                  <p className="text-sm" style={{ color: d.inkSoft, lineHeight: 1.6 }}>
                    {d.racional}
                  </p>
                  <p
                    className="text-sm font-medium mt-1"
                    style={{ color: d.ink, lineHeight: 1.55 }}
                  >
                    ⚖️ {d.risco}
                  </p>
                </div>
              </div>
            </div>
          </section>
        ))}

        {/* RODAPÉ DECISÃO */}
        <footer className="rounded-section bg-[#101010] text-[#F2F2EB] p-8 md:p-10 flex flex-col gap-3">
          <p className="text-[11px] uppercase tracking-[0.18em] text-[#F2F2EB]/60">
            Como decidir
          </p>
          <p className="text-xl font-semibold">
            Responde no chat: A, B, C — ou mistura (&quot;paleta C + tipo A&quot;).
          </p>
          <p className="text-sm text-[#F2F2EB]/70 max-w-prose leading-relaxed">
            Só depois da tua escolha eu aplico os tokens globalmente (Fase 0),
            crio a escala completa em tailwind.config + CSS vars com dark mode,
            e sigo pra Fase 2 (redesign da home seção a seção). O que está nesta
            página é preview isolado — nada disso vazou pro site.
          </p>
        </footer>
      </main>
    </div>
  );
}
