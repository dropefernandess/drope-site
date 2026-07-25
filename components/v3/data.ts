/**
 * Conteúdo da V3. Tudo daqui é dado real — content/projetos.ts e CONTEXT.md.
 * Se não for real, não entra (foi a lei que salvou o hero da V2 de inventar
 * "próxima janela AGO").
 */

export const NAV = [
  { href: "#servicos", label: "Serviços" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#processo", label: "Processo" },
] as const;

export const STATS = [
  { value: "13", label: "projetos entregues" },
  { value: "07", label: "anos de ofício" },
  { value: "03", label: "países atendidos" },
] as const;

export const LOGOS = [
  "aroeira",
  "use-duali",
  "sirius",
  "go-trace",
  "moneyfy",
  "financas-ja",
  "gisto-xavier",
  "katia-assis",
  "bosque-do-sol",
  "mykos",
  "yumo",
  "five-pay",
  "gumbox",
] as const;

export const SERVICOS = [
  {
    n: "01",
    title: "Branding & Identidade",
    desc: "Estratégia, naming, sistema visual e manual. A marca sai pronta para ser aplicada por qualquer um sem perder coerência.",
    thumb: "/projetos/sirius.png",
  },
  {
    n: "02",
    title: "UI/UX & Product",
    desc: "Pesquisa, arquitetura de informação, fluxos e design system. Interface que resolve o problema antes de ficar bonita.",
    thumb: "/projetos/moneyfy.jpg",
  },
  {
    n: "03",
    title: "Web & Landing Pages",
    desc: "Do wireframe ao deploy. Next.js, motion e performance — o site vai ao ar funcionando, não em Figma.",
    thumb: "/projetos/bada-bing.png",
  },
  {
    n: "04",
    title: "Direção de Arte",
    desc: "Campanha, social, embalagem e capa. Uma direção que se sustenta em todos os formatos sem virar outra marca.",
    thumb: "/projetos/use-duali.png",
  },
] as const;

export const CASES = [
  {
    slug: "sirius",
    title: "Sirius",
    servico: "Branding · Web",
    ano: "2025",
    metrica: "+45% em contratos fechados",
    hedge: "não dá pra creditar só ao redesign",
    img: "/projetos/sirius.png",
  },
  {
    slug: "bada-bing",
    title: "Bada Bing",
    servico: "Identidade · Site",
    ano: "2025",
    metrica: "+112% de tráfego orgânico",
    hedge: "base inicial pequena, leia com contexto",
    img: "/projetos/bada-bing.png",
  },
  {
    slug: "use-duali",
    title: "Use Dualí",
    servico: "Branding · Direção de arte",
    ano: "2024",
    metrica: "+48% de engajamento",
    hedge: "mesma janela, comparação justa",
    img: "/projetos/use-duali.png",
  },
  {
    slug: "go-trace",
    title: "GO Trace",
    servico: "UI/UX · Product",
    ano: "2024",
    metrica: "Onboarding de 9 para 4 etapas",
    hedge: "medido no fluxo novo",
    img: "/projetos/go-trace.jpg",
  },
  {
    slug: "gisto-xavier",
    title: "Gisto & Xavier",
    servico: "Identidade · Papelaria",
    ano: "2024",
    metrica: "Sistema aplicado em 12 peças",
    hedge: "entrega completa de manual",
    img: "/projetos/gisto-xavier.png",
  },
] as const;

export const PROCESSO = [
  {
    n: "01",
    title: "Escuta",
    desc: "Antes de criar, entender. Briefing, contexto de mercado e o que o cliente realmente precisa — que raramente é o que ele pediu.",
  },
  {
    n: "02",
    title: "Direção",
    desc: "Território, referência e conceito. Uma direção defendida com racional, não três opções para você escolher no escuro.",
  },
  {
    n: "03",
    title: "Execução",
    desc: "Sistema, componentes e aplicação. É aqui que a maioria para — e é aqui que o trabalho passa a valer.",
  },
  {
    n: "04",
    title: "No ar",
    desc: "Deploy, handoff e manual. Você sai com a coisa funcionando e com autonomia para operar sem mim.",
  },
] as const;
