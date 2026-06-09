import type { Metadata } from "next";

/**
 * /cv/print — Página dedicada APENAS pra geração de PDF A4.
 *
 * Layout 2 colunas (estilo CV profissional):
 *  - SIDEBAR esquerda (~65mm): bg dark, foto, contato, idiomas, skills
 *  - MAIN direita (~145mm): bg branco, nome, sobre, experiência, formação
 *
 * Diferente do /cv (público):
 *  - Sem menu, sem footer, sem CTAs, sem badges decorativos
 *  - Sem splash screen (server component puro + CSS guards)
 *  - HTML semântico + ATS keywords pra IAs de RH
 */

export const metadata: Metadata = {
  title: "Pedro Henrique Fernandes e Silva — Designer Multidisciplinar · CV",
  description:
    "Pedro Henrique Fernandes e Silva. Designer Multidisciplinar com 7 anos de experiência em Branding, UI/UX Design, Web Design, Motion Design e Front-end básico. Photoshop, Illustrator, InDesign, Figma, Framer, After Effects, Next.js, Tailwind CSS, React.",
  keywords: [
    "Designer Multidisciplinar",
    "Designer Gráfico",
    "Diretor de Arte",
    "UI/UX Designer",
    "Product Designer",
    "Brand Designer",
    "Motion Designer",
    "Front-end Developer",
    "Web Designer",
    "Branding",
    "Identidade Visual",
    "Brand System",
    "Design System",
    "Photoshop",
    "Illustrator",
    "InDesign",
    "Figma",
    "Framer",
    "After Effects",
    "Adobe Creative Cloud",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "React",
    "Next.js",
    "Framer Motion",
    "Pedro Henrique Fernandes",
    "Drope",
    "Drope Fernandes",
    "Senador Firmino",
    "Minas Gerais",
    "Brasil",
    "Freelancer",
    "7 anos experiência",
  ],
  robots: { index: false, follow: false },
};

const skills = {
  "Gráfico & Branding": ["Photoshop", "Illustrator", "InDesign", "Branding", "Identidade Visual", "Print"],
  "Digital & UI/UX": ["Figma", "Framer", "Design Tokens", "Prototipagem", "Design System"],
  Motion: ["After Effects", "Logo Reveal", "Web Animation", "Motion Design"],
  "Front-end básico": ["HTML", "CSS", "Tailwind CSS", "Next.js (intermediário)"],
};

const languages = [
  { name: "Português", level: "Nativo" },
  { name: "Inglês", level: "Leitura técnica fluente · Conversação em evolução" },
  { name: "Espanhol", level: "Intermediário" },
];

type Job = {
  period: string;
  role: string;
  company: string;
  location: string;
  bullets: string[];
};

const experience: Job[] = [
  {
    period: "02/2025 — 08/2025",
    role: "Diretor de Arte e Consultor",
    company: "Be Done",
    location: "Juiz de Fora, MG",
    bullets: [
      "Atuei como consultor estratégico em decisões de design, identificando ineficiências no fluxo de entrega.",
      "Estruturei relatórios de Marketing transformando dados brutos em estratégias acionáveis para empresas parceiras.",
      "Desenvolvi identidades visuais alinhando elementos gráficos aos valores das marcas.",
    ],
  },
  {
    period: "11/2021 — 07/2023",
    role: "Diretor de Arte",
    company: "Novus Soluções Criativas",
    location: "Juiz de Fora, MG",
    bullets: [
      "Liderei comunicação direta com clientes em 10+ projetos, definindo conceito, escopo e cronograma de identidade visual.",
      "Criei identidades visuais para redes sociais, anúncios e conteúdos, conectando direção de arte e motion design.",
      "Elaborei pacotes completos de identidade para novas linhas de produtos, incluindo PDV, marketing e papelaria.",
    ],
  },
  {
    period: "06/2022 — 07/2022",
    role: "Designer Freelance",
    company: "KOJIO",
    location: "Juiz de Fora, MG",
    bullets: [
      "Criei logotipos com pesquisa de mercado, alinhando design aos produtos comercializados.",
      "Finalizei imagens gráficas e identidades visuais adequando arquivos às especificações do briefing.",
    ],
  },
  {
    period: "11/2019 — 12/2020",
    role: "Designer Gráfico",
    company: "DGL Engenharia",
    location: "Senador Firmino, MG",
    bullets: [
      "Estruturei relatórios mensais de Marketing que viraram referência interna em apresentações de estratégia.",
      "Criei identidades visuais corporativas e formatei arquivos prontos para produção impressa e digital.",
    ],
  },
];

const education = [
  {
    period: "01/2021 — 07/2024",
    course: "Design Gráfico",
    degree: "Tecnólogo em Design Gráfico",
    school: "Estácio",
    location: "Juiz de Fora, MG",
  },
];

// Cores (não usa CSS vars do tema — PDF sempre claro)
const C = {
  bg: "#FFFFFF",
  ink: "#0A0A0A",
  inkSoft: "#333",
  inkMute: "#666",
  inkFaint: "#999",
  line: "#E5E5E5",
  brand: "#DE2828",
  sidebar: "#101010",
  sidebarText: "#E8E8E5",
  sidebarMute: "#A0A0A0",
};

export default function CVPrintPage() {
  return (
    <>
      {/* === GUARDS — esconde tudo que NÃO é parte do CV print === */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html, body {
              background: #FFFFFF !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: hidden !important;
            }
            body > header,
            body > footer,
            body > nav,
            body > div[class*="fixed"],
            body > div[class*="z-[100]"],
            body > div[class*="z-50"],
            body > main > header,
            footer,
            .marquee-track { display: none !important; }
            /* Zera padding/margin do <main> do layout root (direto filho de body)
               sem afetar o <main> interno do CV (dentro de .cv-print) */
            body > main { padding: 0 !important; margin: 0 !important; }
          `,
        }}
      />

      <div
        className="cv-print"
        style={{
          display: "grid",
          gridTemplateColumns: "70mm 1fr",
          width: "210mm",
          minHeight: "297mm",
          background: C.bg,
          color: C.ink,
          fontFamily: "Inter, system-ui, sans-serif",
          fontSize: "11px",
          lineHeight: 1.55,
          boxSizing: "border-box",
        }}
      >
        {/* ============================================================
           SIDEBAR ESQUERDA (dark) — foto + contato + idiomas + skills
           ============================================================ */}
        <aside
          style={{
            background: C.sidebar,
            color: C.sidebarText,
            padding: "14mm 10mm",
            display: "flex",
            flexDirection: "column",
            gap: "10mm",
          }}
        >
          {/* === FOTO === */}
          <div
            style={{
              width: "50mm",
              height: "50mm",
              borderRadius: "50%",
              overflow: "hidden",
              alignSelf: "center",
              border: `2.5px solid ${C.brand}`,
              boxShadow: "0 6px 16px rgba(0,0,0,0.45)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/cv/photo.jpg"
              alt="Pedro Henrique Fernandes e Silva"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "top",
              }}
            />
          </div>

          {/* === CONTATO === */}
          <div>
            <SidebarLabel>Contato</SidebarLabel>
            <div style={{ marginTop: "3mm", display: "flex", flexDirection: "column", gap: "2.5mm", fontSize: "10px" }}>
              <ContactRow label="Email" value="contato@dropefernandes.com" />
              <ContactRow label="Telefone" value="+55 (32) 9 9805-7750" />
              <ContactRow label="Localização" value="Senador Firmino, MG · Brasil" />
              <ContactRow label="Portfólio" value="dropefernandes.com" />
            </div>
          </div>

          {/* === IDIOMAS === */}
          <div>
            <SidebarLabel>Idiomas</SidebarLabel>
            <div style={{ marginTop: "3mm", display: "flex", flexDirection: "column", gap: "3mm", fontSize: "10px" }}>
              {languages.map((l) => (
                <div key={l.name} style={{ display: "flex", flexDirection: "column" }}>
                  <span style={{ fontWeight: 600, color: C.sidebarText, fontSize: "10.5px" }}>{l.name}</span>
                  <span style={{ color: C.sidebarMute, fontSize: "9px", lineHeight: 1.4, marginTop: "0.5mm" }}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>

          {/* === HABILIDADES === */}
          <div>
            <SidebarLabel>Habilidades</SidebarLabel>
            <div style={{ marginTop: "3mm", display: "flex", flexDirection: "column", gap: "3.5mm" }}>
              {Object.entries(skills).map(([group, items]) => (
                <div key={group}>
                  <p style={{ fontSize: "9px", fontWeight: 700, color: C.brand, margin: "0 0 1.5mm 0", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    {group}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2mm" }}>
                    {items.map((item) => (
                      <span
                        key={item}
                        style={{
                          fontSize: "8.5px",
                          padding: "1mm 2.5mm",
                          borderRadius: "12px",
                          border: `0.5px solid ${C.sidebarMute}`,
                          color: C.sidebarText,
                          background: "rgba(255,255,255,0.05)",
                          lineHeight: 1.3,
                        }}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* ============================================================
           MAIN DIREITA (branco) — nome + sobre + experiência + formação
           ============================================================ */}
        <main
          style={{
            padding: "14mm 16mm 14mm 15mm",
            display: "flex",
            flexDirection: "column",
            gap: "6mm",
          }}
        >
          {/* === HEADER NOME + CARGO === */}
          <header style={{ paddingBottom: "5mm", borderBottom: `1px solid ${C.line}` }}>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: 600,
                letterSpacing: "-0.025em",
                lineHeight: 1.05,
                margin: 0,
                color: C.ink,
              }}
            >
              Pedro Henrique
              <br />
              <span style={{ color: C.brand }}>Fernandes e Silva</span>
            </h1>
            <p
              style={{
                fontSize: "13px",
                fontWeight: 500,
                color: C.inkSoft,
                margin: "3mm 0 0 0",
                letterSpacing: "0.01em",
              }}
            >
              Designer Multidisciplinar · 7 anos de experiência
            </p>
          </header>

          {/* === SOBRE === */}
          <section>
            <MainLabel>Sobre</MainLabel>
            <p style={{ margin: "3mm 0 0 0", color: C.inkSoft, fontSize: "11px", lineHeight: 1.65 }}>
              Sou um Designer Multidisciplinar com 7 anos de ofício construindo
              marcas, interfaces e sistemas visuais. Tenho o design gráfico
              como base e a tecnologia como extensão. Atendo clientes no Brasil
              e no exterior com projetos que vão do conceito ao ar, com
              consistência visual em cada etapa.
            </p>
          </section>

          {/* === EXPERIÊNCIA === */}
          <section>
            <MainLabel>Experiência Profissional</MainLabel>
            <ol
              style={{
                listStyle: "none",
                padding: 0,
                margin: "3mm 0 0 0",
                display: "flex",
                flexDirection: "column",
                gap: "4.5mm",
              }}
            >
              {experience.map((job) => (
                <li
                  key={`${job.company}-${job.period}`}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "36mm 1fr",
                    gap: "4mm",
                    pageBreakInside: "avoid",
                  }}
                >
                  <div style={{ color: C.inkMute, fontSize: "10px", lineHeight: 1.45 }}>
                    <div style={{ fontWeight: 700, color: C.brand, fontSize: "10.5px" }}>{job.period}</div>
                    <div style={{ marginTop: "1mm" }}>{job.location}</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2.5mm", flexWrap: "wrap" }}>
                      <strong style={{ fontSize: "13px", color: C.ink, fontWeight: 600 }}>{job.role}</strong>
                      <span style={{ color: C.inkFaint }}>·</span>
                      <span style={{ color: C.ink, fontWeight: 500, fontSize: "12px" }}>{job.company}</span>
                    </div>
                    <ul
                      style={{
                        listStyle: "none",
                        padding: 0,
                        margin: "2mm 0 0 0",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1.5mm",
                      }}
                    >
                      {job.bullets.map((b, j) => (
                        <li key={j} style={{ display: "flex", gap: "2.5mm", color: C.inkSoft, fontSize: "10.5px", lineHeight: 1.55 }}>
                          <span style={{ color: C.brand, flexShrink: 0, fontWeight: 700 }}>·</span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* === FORMAÇÃO === */}
          <section>
            <MainLabel>Formação Acadêmica</MainLabel>
            <ol style={{ listStyle: "none", padding: 0, margin: "4mm 0 0 0" }}>
              {education.map((ed) => (
                <li
                  key={ed.course}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "36mm 1fr",
                    gap: "4mm",
                  }}
                >
                  <div style={{ color: C.inkMute, fontSize: "10px" }}>
                    <div style={{ fontWeight: 700, color: C.brand, fontSize: "10.5px" }}>{ed.period}</div>
                    <div style={{ marginTop: "1mm" }}>{ed.location}</div>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "baseline", gap: "2.5mm", flexWrap: "wrap" }}>
                      <strong style={{ fontSize: "13px", color: C.ink, fontWeight: 600 }}>{ed.course}</strong>
                      <span style={{ color: C.inkFaint }}>·</span>
                      <span style={{ color: C.ink, fontWeight: 500, fontSize: "12px" }}>{ed.school}</span>
                    </div>
                    <p style={{ margin: "1.5mm 0 0 0", color: C.inkMute, fontSize: "10.5px" }}>{ed.degree}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        </main>

        {/* ============ ATS / IA Keywords invisíveis ============ */}
        <div
          aria-hidden="false"
          style={{
            position: "absolute",
            left: "-9999px",
            width: "1px",
            height: "1px",
            overflow: "hidden",
            color: "#FFFFFF",
            fontSize: "1px",
          }}
        >
          Pedro Henrique Fernandes e Silva, also known as Drope Fernandes,
          Designer Multidisciplinar with 7 years of experience. Skills: Graphic
          Designer, UI/UX Designer, Brand Designer, Motion Designer, Front-end
          Developer, Web Designer, Product Designer, Visual Identity, Brand
          System, Design System, Design Tokens, Photoshop, Illustrator, InDesign,
          Figma, Framer, After Effects, Adobe Creative Cloud, HTML, CSS, Tailwind
          CSS, React, Next.js, Framer Motion. Languages: Portuguese (Native),
          English (Intermediate), Spanish (Intermediate). Location: Senador
          Firmino, Minas Gerais, Brazil. International experience: Brazil,
          Dubai, Portugal. Senior designer, creative director, art director.
        </div>
      </div>
    </>
  );
}

// ===== HELPERS =====
function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "10.5px",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#DE2828",
        margin: 0,
        paddingBottom: "2mm",
        borderBottom: "0.5px solid rgba(255,255,255,0.15)",
      }}
    >
      {children}
    </h2>
  );
}

function MainLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
        color: "#DE2828",
        margin: 0,
        paddingBottom: "1.5mm",
        borderBottom: "0.5px solid #E5E5E5",
      }}
    >
      {children}
    </h2>
  );
}

function ContactRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: "8.5px", fontWeight: 700, color: "#DE2828", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {label}
      </span>
      <span style={{ color: "#E8E8E5", fontSize: "10px", lineHeight: 1.4, wordBreak: "break-word", marginTop: "0.5mm" }}>
        {value}
      </span>
    </div>
  );
}
