/**
 * 11 case studies atuais — migrar pra CMS (Sanity/Payload) quando crescer.
 * Slugs estáveis: usados nas URLs de case study (/projetos/[slug]).
 */

export const categorias = [
  { slug: "branding", label: "Branding" },
  { slug: "ui-ux-design", label: "UI/UX" },
  { slug: "web-design", label: "Web" },
  { slug: "graphic-design", label: "Gráfico" },
  { slug: "motion-design", label: "Motion" },
] as const;

export type CategoriaSlug = (typeof categorias)[number]["slug"];

export type Projeto = {
  slug: string;
  title: string;
  description: string;       // 65-73 chars, garantido 2 linhas
  categorias: CategoriaSlug[];
  image: string;             // cover
  year?: number;
  featured?: boolean;
};

export const projetos: Projeto[] = [
  {
    slug: "bada-bing",
    title: "Bada Bing — Bakehouse",
    description:
      "E-commerce e copy para pizzaria de fermentação natural em Dubai Marina.",
    categorias: ["branding", "web-design", "ui-ux-design"],
    image: "/projetos/bada-bing.png",
    year: 2025,
    featured: true,
  },
  {
    slug: "use-duali",
    title: "Use Dualí",
    description:
      "Brand system para marca de moda íntima e fitness sobre dualidade.",
    categorias: ["branding", "graphic-design"],
    image: "/projetos/use-duali.png",
    year: 2024,
  },
  {
    slug: "myko",
    title: "MYKO — Moda Praia",
    description:
      "Identidade visual para marca de moda praia com conceito lifestyle.",
    categorias: ["branding"],
    image: "/projetos/myko.png",
    year: 2024,
  },
  {
    slug: "vizir",
    title: "Vizir Contabilidade",
    description:
      "Site institucional e social media para escritório contábil em ascensão.",
    categorias: ["web-design", "graphic-design"],
    image: "/projetos/vizir.jpg",
    year: 2023,
  },
  {
    slug: "sirius",
    title: "Sirius Agência",
    description:
      "Identidade visual completa para agência criativa, do conceito ao motion.",
    categorias: ["branding", "motion-design"],
    image: "/projetos/sirius.png",
    year: 2023,
  },
  {
    slug: "go-trace",
    title: "GO Trace",
    description:
      "SaaS de rastreamento de pedidos e gestão pós-venda para e-commerces.",
    categorias: ["ui-ux-design", "web-design"],
    image: "/projetos/go-trace.jpg",
    year: 2024,
  },
  {
    slug: "financas-ja",
    title: "Finanças Já!",
    description:
      "App de gestão financeira pessoal com foco em clareza e usabilidade.",
    categorias: ["ui-ux-design"],
    image: "/projetos/financas-ja.png",
    year: 2023,
  },
  {
    slug: "moneyfy",
    title: "MoneyFy",
    description:
      "Gestão financeira via WhatsApp com categorização automática por IA.",
    categorias: ["ui-ux-design", "branding"],
    image: "/projetos/moneyfy.jpg",
    year: 2024,
  },
  {
    slug: "bosque-do-sol",
    title: "Bosque do Sol",
    description:
      "Identidade visual para loteamento residencial em Senador Firmino, MG.",
    categorias: ["branding"],
    image: "/projetos/bosque-do-sol.png",
    year: 2023,
  },
  {
    slug: "katia-assis",
    title: "Kátia Assis",
    description:
      "Brand system para consultório psicológico com identidade humanista.",
    categorias: ["branding"],
    image: "/projetos/katia-assis.jpg",
    year: 2022,
  },
  {
    slug: "gisto-xavier",
    title: "Gisto & Xavier",
    description:
      "Brand system para escritório de advocacia previdenciária feminino.",
    categorias: ["branding"],
    image: "/projetos/gisto-xavier.png",
    year: 2022,
  },
];

export function getProjeto(slug: string) {
  return projetos.find((p) => p.slug === slug);
}
