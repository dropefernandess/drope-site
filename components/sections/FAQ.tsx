"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, Mail } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { ButtonPrimary } from "@/components/ui/Buttons";
import { Reveal } from "@/components/ui/Motion";
import { useLocale } from "@/components/i18n/LocaleProvider";
import type { DictionaryKey } from "@/lib/i18n/dictionaries";

type FaqItem = { catKey: DictionaryKey; qKey: DictionaryKey; aKey: DictionaryKey };

const items: FaqItem[] = [
  { catKey: "faq.q1_cat", qKey: "faq.q1_q", aKey: "faq.q1_a" },
  { catKey: "faq.q2_cat", qKey: "faq.q2_q", aKey: "faq.q2_a" },
  { catKey: "faq.q3_cat", qKey: "faq.q3_q", aKey: "faq.q3_a" },
  { catKey: "faq.q4_cat", qKey: "faq.q4_q", aKey: "faq.q4_a" },
  { catKey: "faq.q5_cat", qKey: "faq.q5_q", aKey: "faq.q5_a" },
  { catKey: "faq.q6_cat", qKey: "faq.q6_q", aKey: "faq.q6_a" },
  { catKey: "faq.q7_cat", qKey: "faq.q7_q", aKey: "faq.q7_a" },
  { catKey: "faq.q8_cat", qKey: "faq.q8_q", aKey: "faq.q8_a" },
];

export function FAQ() {
  const { t } = useLocale();
  const [open, setOpen] = useState<number | null>(0);

  // JSON-LD FAQPage — Google pode mostrar rich snippet com Q&A direto na SERP
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: t(it.qKey),
      acceptedAnswer: {
        "@type": "Answer",
        text: t(it.aKey),
      },
    })),
  };

  return (
    <section id="faq" className="bg-bg section-padding">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Container className="flex flex-col gap-14">

        <Reveal>
          <div className="grid gap-6 lg:grid-cols-12 lg:gap-12 items-end">
            <div className="lg:col-span-7 flex flex-col gap-4">
              <p className="label-mono">
                <span className="text-fg-strong">06</span>
                <span className="mx-3 text-fg-faint">──</span>
                <span>{t("faq.eyebrow")}</span>
              </p>
              <h2 className="text-h-1 text-fg-strong text-balance">
                {t("faq.title")}
              </h2>
            </div>
            <p className="lg:col-span-5 text-body max-w-prose">
              {t("faq.desc")}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="grid gap-3 lg:grid-cols-12 lg:gap-6">
          {/* Lista accordion */}
          <ul className="lg:col-span-8 flex flex-col gap-2">
            {items.map((it, idx) => {
              const isOpen = open === idx;
              return (
                <li
                  key={it.qKey}
                  className={`rounded-card border transition ${
                    isOpen ? "border-fg-strong bg-bg-soft" : "border-line bg-bg-soft hover:border-fg-mute"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : idx)}
                    aria-expanded={isOpen}
                    className="flex w-full items-start gap-4 md:gap-6 p-5 md:p-6 text-left"
                  >
                    <span className="hidden md:inline shrink-0 mt-1 label-mono w-24">
                      {t(it.catKey).toUpperCase()}
                    </span>
                    <span className="flex-1 text-base md:text-lg font-semibold text-fg-strong leading-snug">
                      {t(it.qKey)}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                      className="shrink-0 mt-1"
                      aria-hidden
                    >
                      <Plus className="size-5 text-fg-strong" strokeWidth={2} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-6 pt-0 md:pl-[8.5rem]">
                          <p className="text-body max-w-prose">{t(it.aKey)}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>

          {/* Aside CTA */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 rounded-section bg-fg-strong p-7 md:p-8 flex flex-col gap-5">
              <Mail className="size-6 text-bg" strokeWidth={1.5} />
              <div className="flex flex-col gap-2">
                <p className="text-h-3 text-bg">{t("faq.cta_title")}</p>
                <p className="text-sm text-bg/70 leading-relaxed">
                  {t("faq.cta_desc")}
                </p>
              </div>
              <ButtonPrimary
                href="mailto:contato@dropefernandes.com?subject=Pergunta%20sobre%20projeto"
                className="justify-between px-5 py-3"
              >
                {t("faq.cta_button")}
              </ButtonPrimary>
            </div>
          </aside>
        </Reveal>
      </Container>
    </section>
  );
}
