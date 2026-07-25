"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { V2Hero } from "@/components/v2/V2Hero";
import { V2Marquee } from "@/components/v2/V2Marquee";
import { V2Services } from "@/components/v2/V2Services";
import { V2Projects } from "@/components/v2/V2Projects";
import { V2Finale } from "@/components/v2/V2Finale";

/**
 * V2Client — orquestra a página.
 *
 * Divisão de responsabilidade (DIRECAO-CRIATIVA-V2.md §4.4):
 *   Lenis   → smooth scroll global, e só isso
 *   GSAP    → tudo ligado à POSIÇÃO do scroll (batch de reveals, pin, scrub)
 *   Framer  → tudo ligado a ESTADO (hover, tap, presença)
 * Nunca as duas animando a mesma propriedade do mesmo elemento.
 *
 * O hero NÃO passa pelo ScrollTrigger — ele tem timeline de load própria
 * (useEnterTimeline). Por isso os nós de #hero são excluídos do batch.
 */
export function V2Client() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    let lenis: Lenis | undefined;
    let raf: ((time: number) => void) | undefined;

    if (!reduced) {
      lenis = new Lenis({ lerp: 0.11 });
      lenis.on("scroll", ScrollTrigger.update);
      raf = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
    }

    // Gestos abaixo da dobra: aplica .is-in por batch.
    // CSS cuida da transição — GSAP só decide QUANDO.
    const hero = document.getElementById("hero");
    const gestures = gsap.utils
      .toArray<HTMLElement>("[data-snap], .v2-rule, .v2-line")
      .filter((el) => !hero?.contains(el));

    if (gestures.length) {
      ScrollTrigger.batch(gestures, {
        start: "top 88%",
        once: true,
        onEnter: (batch) =>
          batch.forEach((el, i) =>
            window.setTimeout(() => el.classList.add("is-in"), reduced ? 0 : i * 40),
          ),
      });
    }

    // Reveals legados das seções ainda não reescritas (Fases 3–5).
    const legacy = gsap.utils.toArray<HTMLElement>("[data-v2-reveal]");
    if (legacy.length) {
      ScrollTrigger.batch(legacy, {
        start: "top 86%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.04,
            overwrite: true,
          }),
      });
    }

    // Âncoras internas navegam via Lenis (mantém Cmd+click funcionando)
    const onClick = (e: MouseEvent) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      if (lenis) lenis.scrollTo(el as HTMLElement, { offset: -24 });
      else el.scrollIntoView({ behavior: "auto", block: "start" });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
    };
  }, []);

  return (
    <div className="v2 v2-ready relative bg-bg text-fg-strong">
      <V2Hero />
      <V2Marquee />
      <V2Services />
      <V2Projects />
      <V2Finale />
    </div>
  );
}
