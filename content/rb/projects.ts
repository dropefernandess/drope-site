/**
 * Lista de trabalhos do rebrand 2026 — mesma ordem e categorias da
 * página Trabalhos no Figma. Categorias = os seis serviços (UI/UX e Social
 * media entraram em 25/11, pedido do Pedro).
 * O texto longo de cada case continua em content/projetos.ts.
 */

export type ServiceKey = "branding" | "web" | "ui" | "arte" | "motion" | "social";

export const SERVICES: Record<ServiceKey, { pt: string; en: string }> = {
  branding: { pt: "Branding", en: "Branding" },
  web: { pt: "Web design", en: "Web design" },
  ui: { pt: "UI/UX design", en: "UI/UX design" },
  arte: { pt: "Direção de arte", en: "Art direction" },
  motion: { pt: "Motion design", en: "Motion & graphics" },
  social: { pt: "Social media", en: "Social media" },
};

export type RBProject = {
  slug: string;
  name: string;
  year: string;
  cats: ServiceKey[];
  desc: { pt: string; en: string };
  cover: string;
};

export const RB_PROJECTS: RBProject[] = [
  { slug: "go-trace", name: "GO Trace", year: "2025", cats: ["branding", "web", "ui"], cover: "/rb/covers/go-trace.jpg",
    desc: { pt: "Plataforma de rastreamento com marca, design system e um onboarding cerca de 42% mais rápido.", en: "Tracking platform with brand, design system and an onboarding about 42% faster." } },
  { slug: "sirius", name: "Sirius", year: "2023", cats: ["branding", "motion"], cover: "/rb/covers/sirius.jpg",
    desc: { pt: "Agência criativa renovada sem apagar um nome que a região já reconhece.", en: "A creative agency renewed without erasing a name the region already knows." } },
  { slug: "espaco-equilibrio", name: "Espaço Equilíbrio", year: "2026", cats: ["branding"], cover: "/rb/covers/espaco-equilibrio.jpg",
    desc: { pt: "Fisioterapia e psicologia sob a mesma marca, da fachada ao celular.", en: "Physiotherapy and psychology under one brand, from storefront to phone." } },
  { slug: "aroeira", name: "Aroeira", year: "2026", cats: ["branding"], cover: "/rb/covers/aroeira.jpg",
    desc: { pt: "Uma marca feita do próprio material: kraft, tecido, carimbo e linha.", en: "A brand made of its own material: kraft, fabric, stamp and thread." } },
  { slug: "use-duali", name: "Use Dualí", year: "2024", cats: ["branding", "arte", "social"], cover: "/rb/covers/use-duali.jpg",
    desc: { pt: "Moda que vive entre o íntimo e o fitness, sem parecer dividida.", en: "Fashion that lives between intimate and fitness without looking split." } },
  { slug: "marisco-filmes", name: "Marisco Filmes", year: "2026", cats: ["branding", "arte"], cover: "/rb/covers/marisco-filmes.jpg",
    desc: { pt: "Produtora audiovisual da Bahia com um sistema quente, direto e com sotaque.", en: "A film studio from Bahia with a warm, direct system that keeps its accent." } },
  { slug: "moneyfy", name: "MoneyFy", year: "2026", cats: ["branding", "web", "ui"], cover: "/rb/covers/moneyfy.jpg",
    desc: { pt: "Finanças dentro do WhatsApp, com uma marca que respira no espaço que tem.", en: "Finance inside WhatsApp, with a brand that breathes in the space it has." } },
  { slug: "bosque-do-sol", name: "Bosque do Sol", year: "2025", cats: ["branding"], cover: "/rb/covers/bosque-do-sol.jpg",
    desc: { pt: "Loteamento rural que fugiu dos clichês do mercado imobiliário. 80% vendido em 4 meses.", en: "A rural development that escaped real estate clichés. 80% sold in 4 months." } },
  { slug: "gisto-xavier", name: "Gisto & Xavier", year: "2026", cats: ["branding"], cover: "/rb/covers/gisto-xavier.jpg",
    desc: { pt: "Advocacia previdenciária liderada por mulheres, firme sem ser fria.", en: "A social security law firm led by women, firm without being cold." } },
  { slug: "myko", name: "MYKO", year: "2024", cats: ["branding", "arte", "social"], cover: "/rb/covers/myko.jpg",
    desc: { pt: "Moda praia com o mar Egeu como referência, não como tema.", en: "Swimwear with the Aegean as a reference, not a theme." } },
  { slug: "financas-ja", name: "Finanças Já!", year: "2025", cats: ["branding", "web", "motion"], cover: "/rb/covers/financas-ja.jpg",
    desc: { pt: "Finanças pessoais sem jargão, para quem nunca usou um app do tipo.", en: "Personal finance without jargon, for people who never used an app like it." } },
  { slug: "bada-bing", name: "Bada Bing", year: "2026", cats: ["branding", "web"], cover: "/rb/covers/bada-bing.jpg",
    desc: { pt: "Pizzaria romana em Dubai com identidade e e-commerce completos.", en: "A Roman pizzeria in Dubai with full identity and e-commerce." } },
  { slug: "katia-assis", name: "Kátia Assis", year: "2026", cats: ["branding", "social"], cover: "/rb/covers/katia-assis.jpg",
    desc: { pt: "Marca pessoal de psicóloga que acolhe sem cair nos clichês da área.", en: "A psychologist's personal brand that welcomes without the field's clichés." } },
  { slug: "vizir", name: "Vizir Contabilidade", year: "2025", cats: ["web", "social"], cover: "/rb/covers/vizir.jpg",
    desc: { pt: "Contabilidade tradicional com presença digital moderna e sóbria.", en: "A traditional accounting firm with a modern, sober digital presence." } },
];

export function rbProject(slug: string) {
  return RB_PROJECTS.find((p) => p.slug === slug);
}

/** Próximo case na ordem da página Trabalhos (volta ao primeiro no fim). */
export function nextRbProject(slug: string) {
  const i = RB_PROJECTS.findIndex((p) => p.slug === slug);
  return RB_PROJECTS[(i + 1) % RB_PROJECTS.length];
}
