/**
 * Dicionários PT/EN — i18n leve, sem dependência externa.
 *
 * Estratégia: client-side toggle com cookie persistido. Não rewrite URL
 * (sem prefixo /en/), mas suficiente pra atender visitantes EN sem perder
 * SEO PT-BR canônico. Quando volume EN justificar, migrar pra
 * URL-based i18n com next-intl ou App Router segments.
 *
 * Convenção: prefixo por seção (nav.*, hero.*, etc).
 */

export type Locale = "pt" | "en";

export const DEFAULT_LOCALE: Locale = "pt";
export const LOCALES: Locale[] = ["pt", "en"];

export const dictionaries = {
  pt: {
    // === NAV ===
    "nav.inicio": "Início",
    "nav.sobre": "Sobre",
    "nav.trabalhos": "Trabalhos",
    "nav.metodo": "Método",
    "nav.calculadora": "Calculadora",
    "nav.blog": "Blog",
    "nav.cta": "Agendar",
    "nav.cta_long": "Agendar conversa",
    "nav.toggle_lang_aria": "Mudar idioma",

    // === HERO ===
    "hero.eyebrow": "Pedro Fernandes · Designer multidisciplinar",
    "hero.status_q3": "Aceitando projetos pra Q3 2026",
    "hero.location": "Senador Firmino · MG",
    "hero.headline_1": "Crio marcas pra durar",
    "hero.headline_2": "— e entrego elas funcionando.",
    "hero.subhead_prefix": "Sou ",
    "hero.subhead_suffix":
      ". Branding, UI/UX e desenvolvimento na mesma cabeça, do briefing à launch. Sem ping-pong entre fornecedores, sem perder a direção no caminho.",
    "hero.cta_primary": "Ver trabalhos",
    "hero.cta_secondary": "ou agenda 30 min direto",

    // === STATS HERO ===
    "stats.marcas": "Marcas atendidas\ndesde 2018",
    "stats.retorno": "Voltam pra um\nsegundo projeto",
    "stats.resposta": "Tempo médio\nde resposta",
    "stats.destaque": "Em destaque · 2025",
    "stats.ver_case": "Ver case",

    // === CTAs comuns ===
    "cta.agendar_30": "Agendar 30 min",
    "cta.estimar": "Estimar projeto",
    "cta.ver_metodo": "Ver método",
    "cta.conversar": "Conversar",
    "cta.voltar_projetos": "Voltar pra todos os projetos",
    "cta.voltar_blog": "Voltar pra todos os textos",
  },
  en: {
    // === NAV ===
    "nav.inicio": "Home",
    "nav.sobre": "About",
    "nav.trabalhos": "Work",
    "nav.metodo": "Method",
    "nav.calculadora": "Pricing",
    "nav.blog": "Blog",
    "nav.cta": "Book a call",
    "nav.cta_long": "Book a call",
    "nav.toggle_lang_aria": "Switch language",

    // === HERO ===
    "hero.eyebrow": "Pedro Fernandes · Multidisciplinary designer",
    "hero.status_q3": "Booking projects for Q3 2026",
    "hero.location": "Senador Firmino · Brazil",
    "hero.headline_1": "I build brands that last",
    "hero.headline_2": "— and ship them working.",
    "hero.subhead_prefix": "I'm ",
    "hero.subhead_suffix":
      ". Branding, UI/UX and development in the same head, from brief to launch. No ping-pong between vendors, no direction lost along the way.",
    "hero.cta_primary": "See work",
    "hero.cta_secondary": "or book a 30 min call",

    // === STATS HERO ===
    "stats.marcas": "Brands served\nsince 2018",
    "stats.retorno": "Come back for a\nsecond project",
    "stats.resposta": "Average\nresponse time",
    "stats.destaque": "Featured · 2025",
    "stats.ver_case": "View case",

    // === CTAs comuns ===
    "cta.agendar_30": "Book 30 min",
    "cta.estimar": "Estimate project",
    "cta.ver_metodo": "View method",
    "cta.conversar": "Get in touch",
    "cta.voltar_projetos": "Back to all projects",
    "cta.voltar_blog": "Back to all posts",
  },
} as const;

export type DictionaryKey = keyof typeof dictionaries.pt;
