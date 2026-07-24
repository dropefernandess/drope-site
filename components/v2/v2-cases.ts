/**
 * v2-cases — covers + geometria do leque, compartilhados entre
 * V2Hero (entrada coreografada) e V2Projects (leque → pilha → escada).
 * Slots do leque = valores do prompt Pallet Ross (offsets do centro).
 */

export const CASES = [
  { slug: "bada-bing",    title: "Bada Bing",      img: "/projetos/bada-bing.png" },
  { slug: "use-duali",    title: "Use Dualí",      img: "/projetos/use-duali.png" },
  { slug: "myko",         title: "MYKO",           img: "/projetos/myko.png" },
  { slug: "sirius",       title: "Sirius",         img: "/projetos/sirius.png" },
  { slug: "go-trace",     title: "GO Trace",       img: "/projetos/go-trace.jpg" },
  { slug: "moneyfy",      title: "MoneyFy",        img: "/projetos/moneyfy.jpg" },
  { slug: "gisto-xavier", title: "Gisto & Xavier", img: "/projetos/gisto-xavier.png" },
];

export const FAN_SLOTS = [
  { x: -480, y: 18, r: -18, s: 0.88, z: 1 },
  { x: -310, y: 6,  r: -10, s: 0.92, z: 2 },
  { x: -155, y: -2, r: -4,  s: 0.96, z: 3 },
  { x: 0,    y: -8, r: 0,   s: 1,    z: 4 },
  { x: 160,  y: -2, r: 5,   s: 0.96, z: 3 },
  { x: 320,  y: 6,  r: 12,  s: 0.92, z: 2 },
  { x: 480,  y: 18, r: 20,  s: 0.88, z: 1 },
];
