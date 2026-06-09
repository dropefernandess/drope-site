"use client";

import Image from "next/image";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { ArrowUpRight, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { Container } from "@/components/ui/Container";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";

/**
 * /sobre — agency clean (sem editorial). Hero 2-col + sections com
 * Reveal motion, Inter Medium/SemiBold. i18n via useLocale().
 */

type Valor = { n: string; titleKey: DictionaryKey; descKey: DictionaryKey };
const valores: Valor[] = [
  { n: "01", titleKey: "about.v1_title", descKey: "about.v1_desc" },
  { n: "02", titleKey: "about.v2_title", descKey: "about.v2_desc" },
  { n: "03", titleKey: "about.v3_title", descKey: "about.v3_desc" },
  { n: "04", titleKey: "about.v4_title", descKey: "about.v4_desc" },
];

type SkillGroup = { eyebrowKey: DictionaryKey; items: string[] };
const skillGroups: SkillGroup[] = [
  { eyebrowKey: "about.skills_design",  items: ["Brand systems", "Visual identity", "Art direction", "Album covers"] },
  { eyebrowKey: "about.skills_product", items: ["UI/UX Design", "Product design", "Design tokens", "Web design"] },
  { eyebrowKey: "about.skills_tech",    items: ["Front-end (Next.js)", "Motion design", "Matte painting", "Copywriting"] },
];

type Marco = { ano: string; eventKey: DictionaryKey; ctxKey: DictionaryKey };
const timeline: Marco[] = [
  { ano: "2018", eventKey: "about.t1_event", ctxKey: "about.t1_ctx" },
  { ano: "2020", eventKey: "about.t2_event", ctxKey: "about.t2_ctx" },
  { ano: "2022", eventKey: "about.t3_event", ctxKey: "about.t3_ctx" },
  { ano: "2024", eventKey: "about.t4_event", ctxKey: "about.t4_ctx" },
];

export default function SobrePage() {
  const { t } = useLocale();
  return (
    <div className="pt-24 md:pt-28 pb-24">
      <Container as="div" className="flex flex-col gap-20 md:gap-28">

        {/* ===== HERO ===== */}
        <section className="flex flex-col gap-10">
          <Reveal className="flex items-center justify-between gap-4 flex-wrap">
            <p className="label-mono flex items-center gap-2">
              <span className="size-1 rounded-full bg-brand" />
              {t("about.eyebrow")}
            </p>
            <span className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-3 py-1.5 text-xs font-medium text-fg-strong">
              <Clock className="size-3 text-fg-mute" strokeWidth={2.5} />
              {t("about.status")}
            </span>
          </Reveal>

          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-end">
            <Reveal delay={0.1} className="lg:col-span-8 flex flex-col gap-6">
              <h1 className="text-display text-fg-strong text-balance">
                {t("about.title")}
              </h1>
              <p className="text-lead max-w-prose">
                {t("about.lead")}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="mailto:contato@dropefernandes.com"
                  className="group inline-flex items-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
                >
                  {t("about.cta_chat")}
                  <ArrowUpRight className="size-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
                </Link>
                <Link
                  href="/proposta"
                  className="inline-flex items-center gap-2 rounded-pill border border-line bg-bg-soft px-5 py-3 text-sm font-semibold text-fg-strong hover:bg-surface transition"
                >
                  {t("about.cta_method")}
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.2} className="lg:col-span-4">
              <motion.div
                className="relative aspect-[4/5] overflow-hidden rounded-section bg-surface"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Image
                  src="/sobre-fullbody.png"
                  alt="Pedro Fernandes (Drope) — retrato editorial"
                  fill
                  priority
                  sizes="(min-width:1024px) 33vw, 100vw"
                  className="object-cover"
                />
                <span className="absolute top-4 left-4 rounded-pill bg-bg/90 backdrop-blur border border-line px-3 py-1.5 text-xs font-semibold text-fg-strong">
                  {t("about.pill")}
                </span>
              </motion.div>
            </Reveal>
          </div>
        </section>

        {/* ===== MANIFESTO TEXT ===== */}
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="label-mono mb-3">
              <span className="text-fg-strong">01</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>{t("about.manifesto_eyebrow")}</span>
            </p>
            <h2 className="text-h-1 text-fg-strong text-balance">
              {t("about.manifesto_title")}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-8 flex flex-col gap-5 text-body max-w-prose">
            <p>{t("about.manifesto_p1")}</p>
            <p>{t("about.manifesto_p2")}</p>
            <p className="text-fg-strong">{t("about.manifesto_p3")}</p>
          </Reveal>
        </section>

        {/* ===== TIMELINE — cards iguais grid ===== */}
        <section className="flex flex-col gap-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="label-mono">
                  <span className="text-fg-strong">02</span>
                  <span className="mx-3 text-fg-faint">──</span>
                  <span>{t("about.timeline_eyebrow")}</span>
                </p>
                <h2 className="text-h-1 text-fg-strong text-balance">
                  {t("about.timeline_title")}
                </h2>
              </div>
              <p className="lg:col-span-5 text-body max-w-prose">
                {t("about.timeline_desc")}
              </p>
            </div>
          </Reveal>

          <Stagger as="ol" className="grid gap-3 md:grid-cols-4">
            {timeline.map((m) => (
              <StaggerItem
                as="li"
                key={m.ano}
                className="rounded-section border border-line bg-bg-soft p-6 flex flex-col gap-3 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-3xl md:text-4xl font-semibold tabular-nums text-brand">
                  {m.ano}
                </p>
                <p className="text-body text-fg-strong font-medium leading-snug">{t(m.eventKey)}</p>
                <p className="label-mono mt-auto">{t(m.ctxKey)}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== VALORES — lista grande ===== */}
        <section className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-4">
            <p className="label-mono mb-3">
              <span className="text-fg-strong">03</span>
              <span className="mx-3 text-fg-faint">──</span>
              <span>{t("about.values_eyebrow")}</span>
            </p>
            <h2 className="text-h-1 text-fg-strong text-balance">
              {t("about.values_title")}
            </h2>
            <p className="text-body mt-5 max-w-prose">
              {t("about.values_desc")}
            </p>
          </Reveal>

          <Stagger as="ol" className="lg:col-span-8 flex flex-col">
            {valores.map((v, i) => (
              <StaggerItem
                key={v.n}
                as="li"
                className={`grid grid-cols-[auto_1fr] gap-6 md:gap-10 py-7 ${
                  i < valores.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <span className="text-2xl md:text-3xl font-semibold tabular-nums text-brand min-w-[3ch]">
                  {v.n}
                </span>
                <div className="flex flex-col gap-2">
                  <h3 className="text-h-3 text-fg-strong">{t(v.titleKey)}</h3>
                  <p className="text-body max-w-prose">{t(v.descKey)}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </section>

        {/* ===== SKILLS — agrupadas ===== */}
        <section className="flex flex-col gap-8">
          <Reveal>
            <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
              <div className="lg:col-span-7 flex flex-col gap-4">
                <p className="label-mono">
                  <span className="text-fg-strong">04</span>
                  <span className="mx-3 text-fg-faint">──</span>
                  <span>{t("about.skills_eyebrow")}</span>
                </p>
                <h2 className="text-h-1 text-fg-strong text-balance">
                  {t("about.skills_title")}
                </h2>
              </div>
              <p className="lg:col-span-5 text-body max-w-prose">
                {t("about.skills_desc")}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 md:grid-cols-3">
            {skillGroups.map((g) => (
              <Reveal key={g.eyebrowKey} className="rounded-section border border-line bg-bg-soft p-6 md:p-7 flex flex-col gap-4">
                <p className="label-mono text-brand">{t(g.eyebrowKey)}</p>
                <ul className="flex flex-col gap-2 flex-1">
                  {g.items.map((s) => (
                    <li key={s} className="text-body text-fg-strong border-b border-line pb-2">
                      {s}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ===== CTA FINAL ===== */}
        <Reveal>
          <div className="rounded-section bg-fg-strong text-bg p-8 md:p-12 grid gap-8 md:grid-cols-12">
            <div className="md:col-span-7 flex flex-col gap-4">
              <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">{t("about.cta_next")}</p>
              <h2 className="text-h-1 text-bg text-balance">
                {t("about.cta_title")}
              </h2>
              <p className="text-body text-bg/75 max-w-prose">
                {t("about.cta_desc")}
              </p>
            </div>
            <div className="md:col-span-5 flex flex-col gap-3 justify-end">
              <Link
                href="mailto:contato@dropefernandes.com"
                className="group inline-flex items-center justify-between gap-3 rounded-pill bg-brand px-5 py-4 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition"
              >
                contato@dropefernandes.com
                <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
              </Link>
              <Link
                href="/calculadora"
                className="inline-flex items-center justify-between gap-3 rounded-pill border border-bg/20 bg-bg/5 px-5 py-4 text-sm font-semibold text-bg hover:bg-bg/15 transition"
              >
                {t("about.cta_estimate")}
                <ArrowUpRight className="size-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </Reveal>
      </Container>
    </div>
  );
}
