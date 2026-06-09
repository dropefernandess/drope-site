"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, Mail, Phone, MapPin, Linkedin, Instagram, Globe } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { Signature } from "@/components/ui/Signature";

/**
 * /cv — Currículo Vitae do Pedro Fernandes (Drope).
 *
 * Refatorado pra senioridade internacional: cargo "Product Designer &
 * Front-end", resumo punchy, skills em chips, idiomas honestos, links
 * sociais completos, badge "Available", print mode, timestamp.
 */

// ===== DATA =====

// Habilidades agrupadas por categoria — ordem reflete a trajetória:
// design gráfico como base, design digital construído em cima, código básico
// como ferramenta complementar pra entregar projetos próprios.
const skillGroups: { label: string; items: string[] }[] = [
  {
    label: "Gráfico & Branding",
    items: ["Photoshop", "Illustrator", "InDesign", "Branding", "Identidade Visual", "Print"],
  },
  {
    label: "Digital & UI/UX",
    items: ["Figma", "Framer", "Design Tokens", "Prototipagem", "Design System"],
  },
  {
    label: "Motion",
    items: ["After Effects", "Logo Reveal", "Web Animation", "Motion Design"],
  },
  {
    label: "Front-end básico",
    items: ["HTML", "CSS", "Tailwind CSS", "Next.js (intermediário)"],
  },
];

// Idiomas com descrição honesta de fluência (sem rating arbitrário)
const languages: { name: string; level: string }[] = [
  { name: "Português",  level: "Nativo" },
  { name: "Inglês",     level: "Leitura técnica fluente · Conversação em evolução" },
  { name: "Espanhol",   level: "Intermediário" },
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

// Links sociais — completos pra recrutador validar presença
const socials = [
  { href: "https://www.linkedin.com/in/dropefernandes",  label: "LinkedIn",  Icon: Linkedin },
  { href: "https://instagram.com/drope.fernandes",       label: "Instagram", Icon: Instagram },
  { href: "https://behance.net/dropefernandes",          label: "Behance",   Icon: Globe },
  { href: "https://dribbble.com/drope-fernandes",        label: "Dribbble",  Icon: Globe },
];

// ===== PAGE =====
export default function CVPage() {
  return (
    <div className="min-h-screen bg-bg">

      {/* === Print mode CSS — otimiza pra impressão direta do navegador === */}
      <style jsx global>{`
        @media print {
          header[data-cv-topbar] { display: none !important; }
          [data-cv-cta-final], [data-cv-photo] { display: none !important; }
          main { padding-top: 1.5rem !important; }
          .print-break-inside-avoid { break-inside: avoid; }
          a { color: inherit !important; text-decoration: none !important; }
          .label-mono { color: #555 !important; }
          body { background: white !important; }
        }
      `}</style>

      {/* === TOP BAR — voltar + download === */}
      <header data-cv-topbar className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-bg/85 border-b border-line">
        <div className="mx-auto max-w-[860px] flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-fg-mute hover:text-fg-strong transition"
          >
            <ArrowLeft className="size-3.5" strokeWidth={2.5} />
            Voltar pro site
          </Link>
          <a
            href="/cv/curriculo-drope-fernandes.pdf"
            download="Curriculo-Pedro-Fernandes-Drope.pdf"
            className="group inline-flex items-center gap-2 rounded-pill bg-fg-strong px-4 py-2 text-xs font-semibold text-bg hover:opacity-90 transition"
          >
            <Download className="size-3.5" strokeWidth={2.5} />
            <span className="hidden sm:inline">Baixar PDF</span>
            <span className="sm:hidden">PDF</span>
          </a>
        </div>
      </header>

      {/* === CONTEÚDO === */}
      <main className="mx-auto max-w-[860px] px-6 pt-32 pb-20 md:pt-40 md:pb-28">

        {/* ===== HERO ===== */}
        <section className="grid gap-10 md:grid-cols-[1fr_180px] items-end mb-20 md:mb-24">
          <div className="flex flex-col gap-6">
            {/* Badge availability + status */}
            <Reveal direction="up" className="inline-flex items-center gap-2 self-start rounded-pill border border-status/30 bg-status/8 px-3 py-1.5 text-[11px] font-medium text-fg-strong">
              <span className="size-1.5 rounded-full bg-status animate-pulse" />
              Available · Remote · Brazil (UTC-3)
            </Reveal>

            <Reveal direction="up" delay={0.05} className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              Curriculum Vitae · 2026
            </Reveal>

            <Reveal direction="up" delay={0.1}>
              <h1 className="text-display text-fg-strong text-balance">
                Pedro Henrique
                <br />
                <span className="text-fg-mute">Fernandes e Silva</span>
              </h1>
            </Reveal>

            <Reveal direction="up" delay={0.2} className="flex flex-col gap-1">
              <p className="text-h-3 text-brand font-semibold">
                Designer Multidisciplinar
              </p>
              <p className="text-body text-fg-mute italic">
                — Drope pra quem trabalha comigo.
              </p>
            </Reveal>

            {/* Assinatura — autoral, cor brand */}
            <div className="pt-1">
              <Signature color="rgb(var(--brand))" height={52} />
            </div>

            {/* Pills de contato — email, telefone, location + sociais */}
            <Reveal direction="up" delay={0.3} className="flex flex-wrap gap-2 pt-3">
              <a href="mailto:contato@dropefernandes.com" className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3.5 py-2 text-xs font-medium text-fg-strong hover:bg-surface transition">
                <Mail className="size-3.5 text-brand" strokeWidth={2.5} />
                contato@dropefernandes.com
              </a>
              <a href="tel:+5532998057750" className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3.5 py-2 text-xs font-medium text-fg-strong hover:bg-surface transition">
                <Phone className="size-3.5 text-brand" strokeWidth={2.5} />
                (32) 9 9805-7750
              </a>
              <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3.5 py-2 text-xs font-medium text-fg-strong">
                <MapPin className="size-3.5 text-brand" strokeWidth={2.5} />
                Brazil · Remote
              </span>
              <a href="https://dropefernandes.com" target="_blank" rel="noopener" className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3.5 py-2 text-xs font-medium text-fg-strong hover:bg-surface transition">
                <Globe className="size-3.5 text-brand" strokeWidth={2.5} />
                dropefernandes.com
              </a>
            </Reveal>

            {/* Links sociais */}
            <Reveal direction="up" delay={0.35} className="flex flex-wrap gap-2">
              {socials.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-[11px] font-medium text-fg-mute hover:text-fg-strong hover:bg-surface transition"
                >
                  <s.Icon className="size-3" strokeWidth={2.5} />
                  {s.label}
                </a>
              ))}
            </Reveal>
          </div>

          {/* Foto */}
          <Reveal direction="left" delay={0.15} className="md:justify-self-end" data-cv-photo>
            <div className="relative w-32 h-32 md:w-44 md:h-44 overflow-hidden rounded-full bg-surface ring-4 ring-bg-soft shadow-lg">
              <Image
                src="/sobre-fullbody.png"
                alt="Pedro Fernandes (Drope)"
                fill
                priority
                sizes="180px"
                className="object-cover scale-125 object-top"
              />
            </div>
          </Reveal>
        </section>

        {/* ===== RESUMO ===== */}
        <Section number="01" title="Sobre">
          <Reveal direction="up" className="flex flex-col gap-4 max-w-[640px]">
            <p className="text-lead text-fg-body">
              Sou um Designer Multidisciplinar com 7 anos de ofício
              construindo marcas, interfaces e sistemas visuais. Tenho
              o design gráfico como base e a tecnologia como extensão.
            </p>
            <p className="text-body text-fg-mute">
              Atendo clientes no Brasil e no exterior com projetos que
              vão do conceito ao ar, com consistência visual em cada etapa.
            </p>
          </Reveal>
        </Section>

        {/* ===== SKILLS + IDIOMAS ===== */}
        <Section number="02" title="Habilidades & idiomas">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Skills agrupados por categoria */}
            <div className="flex flex-col gap-6">
              <p className="label-mono text-fg-faint">FERRAMENTAS &amp; STACK</p>
              <div className="flex flex-col gap-4">
                {skillGroups.map((g, i) => (
                  <Reveal
                    key={g.label}
                    direction="up"
                    delay={i * 0.06}
                    className="flex flex-col gap-2"
                  >
                    <p className="text-[11px] uppercase tracking-wider font-medium text-fg-mute">
                      {g.label}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {g.items.map((item) => (
                        <span
                          key={item}
                          className="inline-flex items-center rounded-pill border border-line bg-bg-soft px-2.5 py-1 text-xs font-medium text-fg-strong"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Idiomas com descrição honesta */}
            <div className="flex flex-col gap-6">
              <p className="label-mono text-fg-faint">IDIOMAS</p>
              <div className="flex flex-col gap-4">
                {languages.map((l, i) => (
                  <Reveal
                    key={l.name}
                    direction="up"
                    delay={i * 0.06}
                    className="flex flex-col gap-1 border-b border-line pb-3 last:border-0 last:pb-0"
                  >
                    <p className="text-sm font-semibold text-fg-strong">
                      {l.name}
                    </p>
                    <p className="text-xs text-fg-mute leading-snug">
                      {l.level}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* ===== EXPERIÊNCIA ===== */}
        <Section number="03" title="Experiência laboral">
          <ol className="flex flex-col gap-12">
            {experience.map((job, i) => (
              <Reveal
                as="li"
                key={`${job.company}-${job.period}`}
                direction={i % 2 === 0 ? "right" : "left"}
                delay={i * 0.05}
                className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-10 pb-12 border-b border-line last:border-0 print-break-inside-avoid"
              >
                {/* Período */}
                <div className="flex flex-col gap-1">
                  <p className="label-mono text-brand font-mono tabular-nums">
                    {job.period}
                  </p>
                  <p className="text-[11px] text-fg-faint">{job.location}</p>
                </div>

                {/* Cargo + empresa + bullets */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <h3 className="text-h-3 text-fg-strong">
                      {job.role}
                    </h3>
                    <p className="text-sm font-medium text-brand">
                      {job.company}
                    </p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {job.bullets.map((b, j) => (
                      <li key={j} className="text-body text-fg-body flex gap-3 leading-relaxed">
                        <span className="text-brand mt-2 shrink-0">·</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ===== EDUCAÇÃO ===== */}
        <Section number="04" title="Formação acadêmica">
          <ol className="flex flex-col gap-8">
            {education.map((ed) => (
              <Reveal
                as="li"
                key={ed.course}
                direction="up"
                className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-10"
              >
                <div className="flex flex-col gap-1">
                  <p className="label-mono text-brand font-mono tabular-nums">
                    {ed.period}
                  </p>
                  <p className="text-[11px] text-fg-faint">{ed.location}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-h-3 text-fg-strong">{ed.course}</h3>
                  <p className="text-sm font-medium text-brand">{ed.school}</p>
                  <p className="text-body-sm text-fg-mute">{ed.degree}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Section>

        {/* ===== CTA FINAL (oculto no print) ===== */}
        <Reveal
          direction="up"
          delay={0.1}
          data-cv-cta-final
          className="mt-20 rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-6 md:grid-cols-[1fr_auto] items-center"
        >
          <div className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">
              PROCURANDO UM DESIGNER MULTIDISCIPLINAR?
            </p>
            <h2 className="text-h-1 text-bg text-balance">
              Vamos conversar sobre o seu projeto.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/cv/curriculo-drope-fernandes.pdf"
              download="Curriculo-Pedro-Fernandes-Drope.pdf"
              className="group inline-flex items-center justify-center gap-2 rounded-pill border border-bg/20 bg-bg/5 px-5 py-3.5 text-sm font-semibold text-bg hover:bg-bg/15 transition whitespace-nowrap"
            >
              <Download className="size-4" strokeWidth={2.5} />
              Baixar PDF
            </a>
            <Link
              href="/agendar"
              className="group inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-5 py-3.5 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition whitespace-nowrap"
            >
              Agendar conversa
              <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
            </Link>
          </div>
        </Reveal>

        {/* ===== TIMESTAMP — última atualização ===== */}
        <p className="mt-10 text-center text-[11px] text-fg-faint tracking-wider uppercase">
          Última atualização: Junho · 2026
        </p>
      </main>
    </div>
  );
}

// ===== HELPERS =====
function Section({
  number, title, children,
}: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20 md:mb-24 print-break-inside-avoid">
      <Reveal direction="right" className="flex items-baseline gap-4 mb-8 md:mb-10">
        <span className="text-2xl md:text-3xl font-semibold tabular-nums text-brand">
          {number}
        </span>
        <span className="text-fg-faint">──</span>
        <h2 className="text-h-2 text-fg-strong">{title}</h2>
      </Reveal>
      {children}
    </section>
  );
}
