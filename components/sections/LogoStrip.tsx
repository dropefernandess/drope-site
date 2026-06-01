/* eslint-disable @next/next/no-img-element */
// Logos SVG são leves (<5KB cada). Usando <img> nativo dentro do marquee
// pra evitar lazy-loading do next/image em conteúdo duplicado off-viewport
// (o segundo Row sempre nasce fora da tela, então lazy=false não basta).

/**
 * Logos reais dos clientes em /public/logos/*.svg
 * Fontes são todos #3D3D3D → brightness-0 invert pra virar branco.
 *
 * Marquee infinito: 2 trilhas com `aria-hidden` no clone. CSS animation
 * em translateX(-50%) — funciona porque a flex track tem width:max-content
 * e o conteúdo é EXATAMENTE duplicado.
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

function Row() {
  return (
    <ul className="flex shrink-0 items-center gap-16 pr-16">
      {clients.map((c) => (
        <li key={c.name} className="shrink-0">
          <img
            src={c.src}
            alt={c.name}
            loading="eager"
            decoding="async"
            className="h-8 w-auto object-contain opacity-60 transition duration-300 hover:opacity-100 dark:brightness-0 dark:invert"
          />
        </li>
      ))}
    </ul>
  );
}

export function LogoStrip() {
  return (
    <section className="relative border-y border-line py-14">
      <p className="label-mono text-fg-faint text-center mb-10">
        Marcas que confiaram no processo
      </p>

      {/* Fade nas bordas pro infinito parecer natural */}
      <div className="relative overflow-hidden">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-bg to-transparent"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-bg to-transparent"
          aria-hidden
        />

        <div className="marquee-track">
          <Row />
          <Row aria-hidden />
        </div>
      </div>
    </section>
  );
}
