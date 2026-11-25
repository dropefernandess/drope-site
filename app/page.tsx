import type { Metadata } from "next";
import { Hero } from "@/components/rb/home/Hero";
import { Works } from "@/components/rb/home/Works";
import { About } from "@/components/rb/home/About";
import { Manifesto } from "@/components/rb/home/Manifesto";
import { Services } from "@/components/rb/home/Services";
import { Process } from "@/components/rb/home/Process";
import { Testimonials } from "@/components/rb/home/Testimonials";
import { Faq } from "@/components/rb/home/Faq";
import { FinalCTA } from "@/components/rb/FinalCTA";

export const metadata: Metadata = {
  alternates: { canonical: "/", languages: { "pt-BR": "/", en: "/en" } },
};

/**
 * Home — rebrand 2026 (Figma, página SITE, "Home · Desktop 1440" e
 * "Home · Celular 390"). Ordem: hero, trabalhos, quem sou, manifesto,
 * serviços, como funciona, depoimentos, perguntas e chamada final.
 */
export default function HomePage() {
  return (
    <>
      {/* O hero fica preso (sticky) só até o fim dos trabalhos, que deslizam por cima dele */}
      <div>
        <Hero />
        <Works />
      </div>
      <About />
      <Manifesto />
      <Services />
      <Process />
      <Testimonials />
      <Faq />
      <FinalCTA />
    </>
  );
}
