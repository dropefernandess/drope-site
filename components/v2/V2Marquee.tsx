"use client";

/* eslint-disable @next/next/no-img-element */
// Logos SVG leves em marquee — mesmo racional do LogoStrip atual.

/**
 * V2Marquee — faixa de clientes, versão slim do redesign.
 * Usa a .marquee-track global (pausa no hover, reduced-motion off).
 */
const clients = [
  { name: "Aroeira",        src: "/logos/aroeira.svg" },
  { name: "Use Dualí",      src: "/logos/use-duali.svg" },
  { name: "Sirius",         src: "/logos/sirius.svg" },
  { name: "Go Trace",       src: "/logos/go-trace.svg" },
  { name: "MoneyFy",        src: "/logos/moneyfy.svg" },
  { name: "Finanças Já",    src: "/logos/financas-ja.svg" },
  { name: "Gisto & Xavier", src: "/logos/gisto-xavier.svg" },
  { name: "Kátia Assis",    src: "/logos/katia-assis.svg" },
  { name: "Bosque do Sol",  src: "/logos/bosque-do-sol.svg" },
  { name: "Mykos",          src: "/logos/mykos.svg" },
  { name: "Yumo",           src: "/logos/yumo.svg" },
  { name: "Five Pay",       src: "/logos/five-pay.svg" },
  { name: "Gumbox",         src: "/logos/gumbox.svg" },
];

function Row({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-14 pr-14" aria-hidden={hidden}>
      {clients.map((c) => (
        <li key={c.name} className="shrink-0">
          <img
            src={c.src}
            alt={hidden ? "" : c.name}
            loading="eager"
            decoding="async"
            className="h-7 w-auto object-contain opacity-50 transition duration-300 hover:opacity-100"
          />
        </li>
      ))}
    </ul>
  );
}

export function V2Marquee() {
  return (
    <section className="relative border-y border-line py-10">
      <div className="mb-8 flex items-center justify-center gap-3 px-6">
        <span className="h-px w-10 bg-line" aria-hidden />
        <p className="label-mono text-fg-faint">30+ marcas já passaram por aqui</p>
        <span className="h-px w-10 bg-line" aria-hidden />
      </div>
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-28 bg-gradient-to-r from-bg to-transparent" aria-hidden />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-28 bg-gradient-to-l from-bg to-transparent" aria-hidden />
        <div className="marquee-track">
          <Row />
          <Row hidden />
        </div>
      </div>
    </section>
  );
}
