"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { V2Hero } from "@/components/v2/V2Hero";
import { V2Marquee } from "@/components/v2/V2Marquee";
import { V2Services } from "@/components/v2/V2Services";
import { V2Projects } from "@/components/v2/V2Projects";
import { V2CTA } from "@/components/v2/V2CTA";
import { V2Footer } from "@/components/v2/V2Footer";

/**
 * V2Client — orquestra a página do preview.
 *
 * - Lenis (smooth scroll) sincronizado com o ticker do GSAP
 * - ScrollTrigger pra reveals globais ([data-v2-reveal])
 * - Framer Motion vive dentro das seções (bento hover, coreografia)
 * - prefers-reduced-motion: sem Lenis, reveals viram estado final (CSS)
 */
export function V2Client() {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({ lerp: 0.11 });
    lenis.on("scroll", ScrollTrigger.update);
    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // Reveals globais: fade-up + leve blur, stagger por batch
    const reveals = gsap.utils.toArray<HTMLElement>("[data-v2-reveal]");
    ScrollTrigger.batch(reveals, {
      start: "top 86%",
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          overwrite: true,
        }),
    });

    // Âncoras internas navegam via Lenis
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      if (!id || id === "#") return;
      const el = document.querySelector(id);
      if (!el) return;
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -24 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      ScrollTrigger.getAll().forEach((st) => st.kill());
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="v2 relative bg-bg text-fg-strong">
      <V2Hero />
      <V2Marquee />
      <V2Services />
      <V2Projects />
      <V2CTA />
      <V2Footer />
    </div>
  );
}
