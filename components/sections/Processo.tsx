"use client";

import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Motion";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { StickyStack, StickyCard } from "@/components/ui/ScrollFX";
import { ProcessArt } from "@/components/ui/ProcessArt";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";
import { cn } from "@/lib/utils";

type Step = {
  num: string;
  titleKey: DictionaryKey;
  durationKey: DictionaryKey;
  descKey: DictionaryKey;
  deliverableKeys: DictionaryKey[];
};

const steps: Step[] = [
  {
    num: "01",
    titleKey: "processo.step1_title",
    durationKey: "processo.step1_duration",
    descKey: "processo.step1_desc",
    deliverableKeys: ["processo.step1_d1", "processo.step1_d2", "processo.step1_d3"],
  },
  {
    num: "02",
    titleKey: "processo.step2_title",
    durationKey: "processo.step2_duration",
    descKey: "processo.step2_desc",
    deliverableKeys: ["processo.step2_d1", "processo.step2_d2", "processo.step2_d3"],
  },
  {
    num: "03",
    titleKey: "processo.step3_title",
    durationKey: "processo.step3_duration",
    descKey: "processo.step3_desc",
    deliverableKeys: ["processo.step3_d1", "processo.step3_d2", "processo.step3_d3"],
  },
  {
    num: "04",
    titleKey: "processo.step4_title",
    durationKey: "processo.step4_duration",
    descKey: "processo.step4_desc",
    deliverableKeys: ["processo.step4_d1", "processo.step4_d2", "processo.step4_d3"],
  },
];

/* Tom de cada card do stack (soft → brand → dark → soft) com classes
   tone-aware pra texto de apoio e pills. */
const tones = [
  {
    card: "bg-bg-soft border border-line text-fg-strong",
    body: "text-fg-mute",
    muted: "text-fg-faint",
    pill: "border-line bg-bg text-fg-mute",
  },
  {
    card: "bg-brand text-brand-fg",
    body: "text-brand-fg/85",
    muted: "text-brand-fg/70",
    pill: "border-brand-fg/25 bg-brand-fg/10 text-brand-fg/90",
  },
  {
    card: "bg-fg-strong text-bg",
    body: "text-bg/80",
    muted: "text-bg/60",
    pill: "border-bg/20 bg-bg/10 text-bg/80",
  },
  {
    card: "bg-bg-soft border border-line text-fg-strong",
    body: "text-fg-mute",
    muted: "text-fg-faint",
    pill: "border-line bg-bg text-fg-mute",
  },
];

/**
 * Processo — StickyStack (Fase 2): cards empilham no scroll com
 * ProcessArt animado por etapa. Aside sticky com CTA preservado.
 */
export function Processo() {
  const { t } = useLocale();

  return (
    <section id="processo" className="bg-bg section-padding overflow-hidden">
      <Container className="flex flex-col gap-14">

        <Reveal direction="right">
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">03</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>{t("processo.eyebrow")}</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                {t("processo.title")}
              </h2>
            </div>
            <p className="lg:col-span-5 text-body max-w-prose">
              {t("processo.desc")}
            </p>
          </div>
        </Reveal>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 items-start">
          {/* Sticky aside com CTA forte */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="label-mono">{t("processo.cronograma_label")}</p>
                <p className="text-h-2 text-fg-strong">
                  {t("processo.cronograma_title")}
                  <br />
                  <span className="text-brand tabular-nums">{t("processo.cronograma_weeks")}</span>
                </p>
                <p className="text-body max-w-prose">
                  {t("processo.cronograma_desc")}
                </p>
              </div>

              {/* CTA FORTE — card dark com 3 mini-pontos + botão */}
              <div className="rounded-section bg-fg-strong text-bg p-6 flex flex-col gap-4">
                <p className="text-[11px] uppercase tracking-wider font-medium text-bg/60">
                  {t("processo.cta_eyebrow")}
                </p>
                <p className="text-h-3 text-bg leading-snug">
                  {t("processo.cta_title")}
                </p>
                <ul className="flex flex-col gap-1.5 text-sm text-bg/75">
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-brand" />
                    {t("processo.cta_b1")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-brand" />
                    {t("processo.cta_b2")}
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1 rounded-full bg-brand" />
                    {t("processo.cta_b3")}
                  </li>
                </ul>
                <ButtonPrimary
                  href="mailto:contato@dropefernandes.com?subject=Quero%20aplicar%20esse%20processo%20no%20meu%20projeto"
                  className="w-full justify-between mt-1 px-5 py-3"
                >
                  {t("processo.cta_button")}
                </ButtonPrimary>
              </div>
            </div>
          </aside>

          {/* Stack de etapas — cards empilham no scroll */}
          <div className="lg:col-span-8">
            <StickyStack>
              {steps.map((s, i) => {
                const tone = tones[i];
                return (
                  <StickyCard key={s.num} index={i} total={steps.length} topOffset={104} step={12}>
                    <div
                      className={cn(
                        "rounded-section p-7 md:p-10 min-h-[320px] grid gap-8 md:grid-cols-[1fr_auto] items-center shadow-lg",
                        tone.card
                      )}
                    >
                      <div className="flex flex-col gap-5">
                        <div className="flex items-baseline justify-between gap-3 flex-wrap">
                          <p className="text-4xl md:text-5xl font-semibold tabular-nums opacity-50">
                            {s.num}
                          </p>
                          <span className={cn("text-[11px] uppercase tracking-wider font-medium", tone.muted)}>
                            {t(s.durationKey)}
                          </span>
                        </div>
                        <div className="flex flex-col gap-2.5">
                          <h3 className="text-h-2">{t(s.titleKey)}</h3>
                          <p className={cn("text-[15px] leading-relaxed max-w-prose", tone.body)}>
                            {t(s.descKey)}
                          </p>
                        </div>
                        <ul className="flex flex-wrap gap-1.5">
                          {s.deliverableKeys.map((dKey) => (
                            <li
                              key={dKey}
                              className={cn("text-[11px] font-medium px-3 py-1.5 rounded-full border", tone.pill)}
                            >
                              {t(dKey)}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <ProcessArt
                        step={(i + 1) as 1 | 2 | 3 | 4}
                        className="w-28 md:w-40 shrink-0 justify-self-center md:justify-self-end opacity-90"
                      />
                    </div>
                  </StickyCard>
                );
              })}
            </StickyStack>
          </div>
        </div>
      </Container>
    </section>
  );
}
