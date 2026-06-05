"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Download, Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { Signature } from "@/components/ui/Signature";

/**
 * /cv — Currículo Vitae do Pedro Fernandes (Drope).
 *
 * Estilo: single column minimal, premium-feel. Sem entrar no menu ou footer.
 * Botão download fixa no top-right pra exportar PDF original.
 *
 * Conteúdo extraído do PDF original (Currículo-Pedro.pdf) com ratings
 * traduzidos de estrelas pra barras percentuais (mais clean).
 */

// ===== DATA =====
type SkillRating = { name: string; pct: number };

const skills: SkillRating[] = [
  { name: "Photoshop",    pct: 100 },
  { name: "Illustrator",  pct: 80 },
  { name: "After Effects", pct: 60 },
  { name: "Figma",        pct: 80 },
  { name: "Framer",       pct: 90 },
];

const languages: SkillRating[] = [
  { name: "Inglês",   pct: 40 },
  { name: "Espanhol", pct: 50 },
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
      "Participação em reuniões com superiores e outros membros da equipe, sugerindo melhorias na área a fim de elevar eficiência e qualidade do serviço.",
      "Produção de relatórios de Marketing para empresas parceiras, apresentando informações do serviço prestado junto a estratégias de melhoria e solução de problemas.",
      "Desenvolvimento de identidades visuais combinando elementos gráficos com os valores das marcas para facilitar o reconhecimento no mercado.",
      "Tratamento de imagens em ferramentas de edição (cor, iluminação, sombras, saturação) pra aprimorar a visualização final.",
    ],
  },
  {
    period: "11/2021 — 07/2023",
    role: "Diretor de Arte",
    company: "Novus Soluções Criativas",
    location: "Juiz de Fora, MG",
    bullets: [
      "Comunicação direta com clientes pra definir conceito, escopo, orçamento e prazos de entrega.",
      "Criação de identidades visuais pra uso em redes sociais, anúncios e conteúdos informativos.",
      "Produção de vídeos pra uso digital e impressão tradicional.",
      "Desenvolvimento de mais de 10 projetos de gerenciamento de rede + identidade visual desde a fase inicial.",
      "Elaboração de pacotes de identidade visual pra novas linhas de produtos e rótulos, incluindo PDV, materiais de marketing e mais.",
      "Apoio à equipe na realização de tarefas diversas conforme demanda, garantindo agilidade e eficiência.",
    ],
  },
  {
    period: "06/2022 — 07/2022",
    role: "Designer Freelance",
    company: "KOJIO",
    location: "Juiz de Fora, MG",
    bullets: [
      "Criação de logotipos pra empresas, definindo design que se relacionasse com produtos e serviços comercializados.",
      "Finalização de imagens gráficas, adequando arquivos às especificações do briefing antes da impressão.",
      "Desenvolvimento de identidades visuais combinando elementos gráficos com valores das marcas pra facilitar reconhecimento.",
      "Tratamento de imagens em edição pra aprimorar visualização do arquivo final.",
    ],
  },
  {
    period: "11/2019 — 12/2020",
    role: "Designer Gráfico",
    company: "DGL Engenharia",
    location: "Senador Firmino, MG",
    bullets: [
      "Produção de relatórios de Marketing, apresentando informações à equipe junto a estratégias de melhoria.",
      "Criação de identidades visuais corporativas com design baseado na coesão entre elementos (logotipos, banners).",
      "Formatação de imagens e objetos pra projetos impressos ou digitais, entregando arquivos prontos pra produção.",
      "Criação de arquivos pra uso com métodos de impressão digitais ou tradicionais.",
      "Comunicação com clientes pra determinar conceito, definir escopos, orçamentos e prazos viáveis.",
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

// ===== COMPONENTES =====

function SkillBar({ name, pct, delay = 0 }: SkillRating & { delay?: number }) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between">
        <p className="text-sm font-medium text-fg-strong">{name}</p>
        <p className="text-[11px] tabular-nums font-mono text-fg-mute">{pct}%</p>
      </div>
      <div className="relative h-[3px] w-full rounded-full bg-surface-2 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 bg-brand rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, margin: "0px 0px -50px 0px" }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  );
}

// ===== PAGE =====
export default function CVPage() {
  return (
    <div className="min-h-screen bg-bg">

      {/* === TOP BAR — voltar + download === */}
      <header className="fixed inset-x-0 top-0 z-50 backdrop-blur-xl bg-bg/85 border-b border-line">
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
            <Reveal direction="up" className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand animate-pulse" />
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
              <p className="text-h-3 text-brand font-semibold">Diretor de Arte</p>
              <p className="text-body text-fg-mute italic">
                — Drope pra quem trabalha comigo.
              </p>
            </Reveal>

            {/* Assinatura — autoral, cor brand */}
            <div className="pt-1">
              <Signature color="rgb(var(--brand))" height={52} />
            </div>

            <Reveal direction="up" delay={0.3} className="flex flex-wrap gap-3 pt-3">
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
                Senador Firmino, MG
              </span>
            </Reveal>
          </div>

          {/* Foto */}
          <Reveal direction="left" delay={0.15} className="md:justify-self-end">
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
          <Reveal direction="up" className="text-lead text-fg-body max-w-[640px]">
            Designer gráfico especialista em gerenciamento de rede, hábil na
            criação de logotipos, materiais de marketing, design de sites,
            direção e edição de vídeo. Profissional dinâmico e criativo,
            com foco na satisfação do cliente.
          </Reveal>
        </Section>

        {/* ===== SKILLS + IDIOMAS ===== */}
        <Section number="02" title="Habilidades & idiomas">
          <div className="grid gap-12 md:grid-cols-2">
            {/* Skills */}
            <div className="flex flex-col gap-5">
              <p className="label-mono text-fg-faint">FERRAMENTAS</p>
              <div className="flex flex-col gap-5">
                {skills.map((s, i) => (
                  <SkillBar key={s.name} {...s} delay={i * 0.08} />
                ))}
              </div>
            </div>

            {/* Idiomas */}
            <div className="flex flex-col gap-5">
              <p className="label-mono text-fg-faint">IDIOMAS</p>
              <div className="flex flex-col gap-5">
                {languages.map((l, i) => (
                  <SkillBar key={l.name} {...l} delay={i * 0.08} />
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
                className="grid gap-4 md:grid-cols-[180px_1fr] md:gap-10 pb-12 border-b border-line last:border-0"
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

        {/* ===== CTA FINAL ===== */}
        <Reveal direction="up" delay={0.1} className="mt-20 rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-6 md:grid-cols-[1fr_auto] items-center">
          <div className="flex flex-col gap-2">
            <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">
              PROCURANDO UM DIRETOR DE ARTE?
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
      </main>
    </div>
  );
}

// ===== HELPERS =====
function Section({
  number, title, children,
}: { number: string; title: string; children: React.ReactNode }) {
  return (
    <section className="mb-20 md:mb-24">
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
