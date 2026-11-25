"use client";

import Image from "next/image";
import { useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { Label } from "@/components/rb/ui";
import { SERVICES, type ServiceKey } from "@/content/rb/projects";
import { cn } from "@/lib/utils";

/**
 * Serviços — Figma "05 Serviços" (referência Ovlay): lista grande, item
 * ativo escuro, imagem e descrição ao lado. No desktop troca ao passar o
 * mouse; no celular abre ao tocar, embaixo do item.
 */
export const SERVICE_INFO: { key: ServiceKey; img: string; alt: { pt: string; en: string }; desc: { pt: string; en: string } }[] = [
  { key: "branding", img: "/rb/services/branding.jpg", alt: { pt: "Chaveiros bordados da GO Trace", en: "GO Trace embroidered key tags" },
    desc: { pt: "Marcas que nascem ou renascem com sistema: estratégia, identidade visual, tom de voz e manual.", en: "Brands born or reborn with a system: strategy, visual identity, tone of voice and guidelines." } },
  { key: "web", img: "/projetos/bada-bing/01.png", alt: { pt: "Site da Bada Bing aberto num notebook", en: "Bada Bing website on a laptop" },
    desc: { pt: "Sites e produtos digitais do layout ao ar, com UI/UX e código na mesma cabeça.", en: "Websites and digital products from layout to launch, with UI/UX and code in the same head." } },
  { key: "arte", img: "/rb/covers/use-duali.jpg", alt: { pt: "Outdoor da Use Dualí", en: "Use Dualí billboard" },
    desc: { pt: "Campanhas, conteúdo e peças que mantêm a marca coerente em qualquer formato.", en: "Campaigns, content and pieces that keep the brand coherent in any format." } },
  { key: "motion", img: "/rb/covers/sirius.jpg", alt: { pt: "Fachada com a marca da Sirius", en: "Sirius brand on a building facade" },
    desc: { pt: "Movimento com vocabulário próprio: motion de marca, animação de logo e conteúdo para redes.", en: "Motion with its own vocabulary: brand motion, logo animation and social content." } },
];

const nameCls = "text-[clamp(44px,calc(34.86px+2.343vw),72px)] font-semibold leading-[1.17] tracking-[-0.03em]";

export function Services() {
  const { locale } = useLocale();
  const [active, setActive] = useState(0);
  const cur = SERVICE_INFO[active];
  return (
    <section aria-labelledby="servicos" className="bg-bg">
      <div className="rb-container py-16 lg:py-[100px]">
        <div className="flex items-center justify-between">
          <Label as="h2" className="text-ink-700 dark:text-ink-200"><span id="servicos">{locale === "pt" ? "Serviços" : "Services"}</span></Label>
          <span className="t-label text-ink-700 dark:text-ink-200">(04)</span>
        </div>
        <div className="mt-8 grid gap-10 lg:mt-12 lg:grid-cols-[1fr_624px] lg:gap-16">
          <ul>
            {SERVICE_INFO.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={active === i}
                  className={cn(nameCls, "block text-left transition-colors duration-300", active === i ? "text-fg-strong" : "text-ink-400 hover:text-ink-700")}
                >
                  {SERVICES[s.key][locale]}
                </button>
                {/* Celular: imagem e descrição embaixo do item ativo */}
                {active === i && (
                  <div className="mb-6 mt-4 lg:hidden">
                    <div className="relative aspect-[624/400] overflow-hidden rounded-xl">
                      <Image src={s.img} alt={s.alt[locale]} fill sizes="100vw" className="object-cover" />
                    </div>
                    <p className="t-small mt-3 text-ink-700 dark:text-ink-200">{s.desc[locale]}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <div className="hidden lg:block">
            <div className="relative aspect-[624/400] overflow-hidden rounded-xl">
              {SERVICE_INFO.map((s, i) => (
                <Image key={s.key} src={s.img} alt={i === active ? s.alt[locale] : ""} fill sizes="624px" className={cn("object-cover transition-opacity duration-500", i === active ? "opacity-100" : "opacity-0")} />
              ))}
            </div>
            <p className="t-small mt-5 max-w-[624px] text-ink-700 dark:text-ink-200" aria-live="polite">{cur.desc[locale]}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
