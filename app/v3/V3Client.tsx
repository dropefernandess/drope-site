"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { V3Hero } from "@/components/v3/V3Hero";
import { V3Logos } from "@/components/v3/V3Logos";
import { V3Servicos } from "@/components/v3/V3Servicos";
import { V3Trabalhos } from "@/components/v3/V3Trabalhos";
import { V3Processo } from "@/components/v3/V3Processo";
import { V3Manifesto } from "@/components/v3/V3Manifesto";
import { V3Fecho } from "@/components/v3/V3Fecho";

/**
 * V3Client — orquestra a página.
 *
 * Divisão de stack (DIRECAO-V3.md §5):
 *   Lenis   → smooth scroll, e só
 *   GSAP    → posição do scroll: reveals, scrub, progresso
 *   Framer  → estado (disponível; hover pesado está em CSS por perf)
 *   WebGL2  → o afluente
 *
 * Reveal: fade-up 24px + scale 0.98→1 · 620ms · stagger 70ms · easing
 * cubic-bezier(0.16,1,0.3,1) — um easing só em todo o site.
 *
 * O hero anima por TIMELINE de load; o resto por ScrollTrigger. Os nós
 * do #hero são excluídos do batch pra não serem dirigidos duas vezes.
 */
export function V3Client() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    const EASE = "power4.out"; // ≈ cubic-bezier(0.16,1,0.3,1)
    const FROM = { opacity: 0, y: 24, scale: 0.98 };
    const TO = { opacity: 1, y: 0, scale: 1, duration: 0.62, ease: EASE };

    let lenis: Lenis | undefined;
    let raf: ((t: number) => void) | undefined;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.1 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (t: number) => lenis!.raf(t * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    const ctx = gsap.context(() => {
      const hero = document.getElementById("hero");
      const heroNodes = hero
        ? Array.from(hero.querySelectorAll<HTMLElement>("[data-reveal]"))
        : [];
      const rest = gsap.utils
        .toArray<HTMLElement>("[data-reveal]")
        .filter((el) => !hero?.contains(el));

      if (reduced) {
        gsap.set([...heroNodes, ...rest], { opacity: 1, y: 0, scale: 1 });
        return;
      }

      // Hero: timeline de load
      if (heroNodes.length) {
        gsap.fromTo(heroNodes, FROM, { ...TO, stagger: 0.07, delay: 0.15 });
      }

      // Resto: por batch, na entrada em viewport
      if (rest.length) {
        ScrollTrigger.batch(rest, {
          start: "top 88%",
          once: true,
          onEnter: (batch) => gsap.fromTo(batch, FROM, { ...TO, stagger: 0.07 }),
        });
      }
    });

    // Âncoras via Lenis, preservando Cmd/Ctrl+click
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(target as HTMLElement, { offset: 0 });
      else target.scrollIntoView({ block: "start" });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      ctx.revert();
      ScrollTrigger.getAll().forEach((s) => s.kill());
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="v3 v3-ready">
      <V3Hero />
      <V3Logos />
      <V3Servicos />
      <V3Trabalhos />
      <V3Processo />
      <V3Manifesto />
      <V3Fecho />
    </div>
  );
}
