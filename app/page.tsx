import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { Servicos } from "@/components/sections/Servicos";
import { Projetos } from "@/components/sections/Projetos";
import { Processo } from "@/components/sections/Processo";
import { Sobre } from "@/components/sections/Sobre";
import { Depoimentos } from "@/components/sections/Depoimentos";
import { FAQ } from "@/components/sections/FAQ";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <Servicos />
      <Projetos />
      <Processo />
      <Sobre />
      <Depoimentos />
      <FAQ />
      <CTA />
    </>
  );
}
