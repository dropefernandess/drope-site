"use client";

import Image from "next/image";
import { LOGOS } from "./data";

/**
 * V3Logos — prova imediata. Fileira hairline, opacidade baixa.
 * 13 marcas: volume suficiente pra justificar a fileira, e nenhuma
 * ansiedade de marquee infinito (que sinaliza falta de material).
 */
export function V3Logos() {
  return (
    <section className="v3-wrap py-16 md:py-20">
      <hr className="v3-rule" />
      <div
        className="flex flex-wrap items-center justify-between gap-x-10 gap-y-8 py-12"
        data-reveal
      >
        <p className="v3-mono shrink-0">13 marcas · Brasil, Portugal, Dubai</p>
        <ul className="flex flex-1 flex-wrap items-center justify-end gap-x-9 gap-y-7">
          {LOGOS.map((slug) => (
            <li key={slug}>
              <Image
                src={`/logos/${slug}.svg`}
                alt=""
                width={96}
                height={26}
                loading="lazy"
                className="h-[22px] w-auto opacity-40 brightness-0 invert transition-opacity duration-300 hover:opacity-80"
              />
            </li>
          ))}
        </ul>
      </div>
      <hr className="v3-rule" />
    </section>
  );
}
