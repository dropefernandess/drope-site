"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * V3Manifesto — a citação acendendo palavra a palavra por SCROLL.
 *
 * Nota importante: isto NÃO é o stagger palavra-a-palavra de entrada que
 * eu bani no hero. Lá o efeito atrasava a leitura de conteúdo crítico em
 * 3 segundos. Aqui ele é scroll-linked — o leitor controla o ritmo, e o
 * texto já está no DOM legível desde o primeiro frame. O gesto serve à
 * leitura em vez de disputar com ela.
 */

const FRASE =
  "Entre o plano e a criação existe um ponto de silêncio onde tudo se alinha. É ali que eu atuo.";

export function V3Manifesto() {
  const wrap = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;

    gsap.registerPlugin(ScrollTrigger);
    const words = Array.from(el.querySelectorAll<HTMLElement>("[data-word]"));
    if (!words.length) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      gsap.set(words, { opacity: 1 });
      return;
    }

    gsap.set(words, { opacity: 0.16 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      end: "bottom 62%",
      scrub: true,
      onUpdate: (self) => {
        const head = self.progress * words.length;
        words.forEach((w, i) => {
          const o = gsap.utils.clamp(0.16, 1, 0.16 + (head - i) * 0.84);
          w.style.opacity = String(o);
        });
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section ref={wrap} className="v3-section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2 opacity-60"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 50%, rgb(91 37 189 / 0.30) 0%, transparent 72%)",
          filter: "blur(60px)",
        }}
      />
      <div className="v3-wrap">
        <div className="v3-grid">
          <div className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-2">
            <p className="v3-mono mb-8" data-reveal>
              05 — No que eu acredito
            </p>
            <blockquote>
              <p className="v3-h1 v3-em">
                {FRASE.split(" ").map((w, i) => (
                  <span key={i} data-word className="inline-block">
                    {w}
                    {i < FRASE.split(" ").length - 1 ? " " : ""}
                  </span>
                ))}
              </p>
              <footer className="v3-small mt-10 text-[var(--n-500)]" data-reveal>
                Pedro Fernandes — do manifesto da marca
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
