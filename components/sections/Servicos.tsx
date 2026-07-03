"use client";

import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonDark } from "@/components/ui/Buttons";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";

/**
 * Servicos — bento clean. Apenas Branding em vermelho protagonista;
 * resto na escala neutra (bg-soft, surface, ink-700). ASCII pattern
 * decorativo em alguns cards.
 */
const ascii = `· · · · · · · · · · · · · · · · ·
* * * * * * * * * * * * * * * * *
· · · · · · · · · · · · · · · · ·
+ + + + + + + + + + + + + + + + +
· · · · · · · · · · · · · · · · ·`;

type ServiceItem = {
  num: string;
  titleKey: DictionaryKey;
  descKey: DictionaryKey;
  bulletKeys: DictionaryKey[];     // tags traduzidas via i18n
  priceKey: DictionaryKey;
  variant: string;
  span: string;
  big?: boolean;
};

const servicos: ServiceItem[] = [
  {
    num: "01",
    titleKey: "servicos.s1_title",
    descKey: "servicos.s1_desc",
    bulletKeys: ["servicos.s1_b1", "servicos.s1_b2", "servicos.s1_b3", "servicos.s1_b4"],
    priceKey: "servicos.price_branding",
    variant: "brand",
    span: "md:col-span-8 md:row-span-2",
    big: true,
  },
  {
    num: "02",
    titleKey: "servicos.s2_title",
    descKey: "servicos.s2_desc",
    bulletKeys: ["servicos.s2_b1", "servicos.s2_b2", "servicos.s2_b3"],
    priceKey: "servicos.price_other",
    variant: "soft",
    span: "md:col-span-4",
  },
  {
    num: "03",
    titleKey: "servicos.s3_title",
    descKey: "servicos.s3_desc",
    bulletKeys: ["servicos.s3_b1", "servicos.s3_b2", "servicos.s3_b3"],
    priceKey: "servicos.price_other",
    variant: "surface",
    span: "md:col-span-4",
  },
  {
    num: "04",
    titleKey: "servicos.s4_title",
    descKey: "servicos.s4_desc",
    bulletKeys: ["servicos.s4_b1", "servicos.s4_b2", "servicos.s4_b3", "servicos.s4_b4"],
    priceKey: "servicos.price_other",
    variant: "dark",
    span: "md:col-span-6",
  },
  {
    num: "05",
    titleKey: "servicos.s5_title",
    descKey: "servicos.s5_desc",
    bulletKeys: ["servicos.s5_b1", "servicos.s5_b2", "servicos.s5_b3", "servicos.s5_b4"],
    priceKey: "servicos.price_other",
    variant: "soft",
    span: "md:col-span-6",
  },
];

const variantStyles: Record<string, { bg: string; fg: string; muted: string; chip: string }> = {
  brand: {
    bg: "bg-brand",
    fg: "text-brand-fg",
    muted: "text-brand-fg/70",
    chip: "border-brand-fg/25 text-brand-fg/85",
  },
  soft: {
    bg: "bg-bg-soft",
    fg: "text-fg-strong",
    muted: "text-fg-mute",
    chip: "border-line text-fg-mute",
  },
  surface: {
    bg: "bg-surface",
    fg: "text-fg-strong",
    muted: "text-fg-mute",
    chip: "border-line text-fg-mute",
  },
  dark: {
    bg: "bg-fg-strong",
    fg: "text-bg",
    muted: "text-bg/70",
    chip: "border-bg/25 text-bg/85",
  },
};

export function Servicos() {
  const { t } = useLocale();
  return (
    <section id="servicos" className="bg-bg section-padding">
      <Container className="flex flex-col gap-12">
        {/* HEADER + CTA destacado à direita */}
        <Reveal direction="right">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">02</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>{t("servicos.eyebrow")}</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                {t("servicos.title")}
              </h2>
            </div>
            <div className="lg:col-span-5 flex flex-col gap-4 items-start">
              <p className="text-body max-w-prose">
                {t("servicos.desc")}
              </p>
              <ButtonDark href="/proposta" className="px-5 py-3">
                {t("servicos.cta")}
              </ButtonDark>
            </div>
          </div>
        </Reveal>

        {/* BENTO */}
        <Stagger as="ul" className="grid gap-3 md:grid-cols-12 md:auto-rows-[minmax(220px,auto)]">
          {servicos.map((s) => {
            const st = variantStyles[s.variant];
            return (
              <StaggerItem
                as="li"
                key={s.num}
                className={`${s.span} group relative overflow-hidden rounded-section ${st.bg} p-7 md:p-9 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* ASCII pattern decorativo no Branding gigante */}
                {s.big && (
                  <pre
                    aria-hidden
                    className={`absolute top-3 right-4 text-[10px] leading-[1.1] ${st.muted} opacity-30 select-none pointer-events-none font-mono`}
                  >
                    {ascii}
                  </pre>
                )}

                {/* Top: num + price LADO A LADO + arrow */}
                <div className="flex items-center justify-between gap-3 relative">
                  <div className="flex items-center gap-2.5 flex-wrap min-w-0">
                    <span className={`text-sm font-medium ${st.muted} shrink-0`}>
                      {s.num} ── {t("servicos.label_suffix")}
                    </span>
                    {s.priceKey && (
                      <span className={`inline-flex w-fit items-center rounded-pill px-2.5 py-0.5 text-[11px] font-semibold border ${st.chip} ${s.big ? "bg-brand-fg/10" : "bg-bg/40"}`}>
                        {t(s.priceKey)}
                      </span>
                    )}
                  </div>
                  <ArrowUpRight
                    className={`size-5 ${st.fg} opacity-50 transition group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 shrink-0`}
                    strokeWidth={2}
                  />
                </div>

                {/* Bottom: title + desc + chips */}
                <div className="flex flex-col gap-3 relative">
                  <h3 className={`font-semibold tracking-tight leading-[1.05] ${st.fg} ${
                    s.big ? "text-[clamp(2rem,3.5vw,3rem)]" : "text-[clamp(1.5rem,2vw,1.875rem)]"
                  }`}>
                    {t(s.titleKey)}
                  </h3>
                  <p className={`text-sm leading-relaxed ${st.muted} max-w-prose`}>
                    {t(s.descKey)}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {s.bulletKeys.map((bKey) => (
                      <span
                        key={bKey}
                        className={`text-[11px] font-medium px-2.5 py-1 rounded-full border ${st.chip}`}
                      >
                        {t(bKey)}
                      </span>
                    ))}
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>

      </Container>
    </section>
  );
}
