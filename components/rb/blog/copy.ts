import type { Locale } from "@/lib/i18n/dictionaries";
import type { Bloco, Post } from "@/content/posts";

/**
 * Textos de interface do blog (rebrand 2026). Os textos dos posts ficam em
 * content/posts.ts e só existem em português; aqui mora só a interface.
 */
export const BLOG_COPY = {
  pt: {
    label: "Blog",
    titleA: "Notas sobre o que aprendo",
    titleB: "no caminho.",
    latest: "Mais recente",
    readPost: "Ler o texto",
    earlier: "Textos anteriores",
    notifyLink: "Me avisa por e-mail",
    notifySubject: "Me avisa quando sair um texto novo",
    back: "Todos os textos",
    reading: (t: string) => `${t} de leitura`,
    toc: "Neste texto",
    tocAria: "Sumário do texto",
    tocCount: (n: number) => `${n} ${n === 1 ? "seção" : "seções"}`,
    writtenBy: "Escrito por",
    bio: "Designer multidisciplinar há 7 anos. Construo marcas, interfaces e sites do conceito ao ar.",
    aboutLink: "Mais sobre mim",
    next: "Próximo texto",
    langNote: null as string | null,
  },
  en: {
    label: "Blog",
    titleA: "Notes on what I learn",
    titleB: "along the way.",
    latest: "Latest",
    readPost: "Read the post",
    earlier: "Earlier posts",
    notifyLink: "Let me know by email",
    notifySubject: "Let me know when a new post is out",
    back: "All posts",
    reading: (t: string) => `${t} read`,
    toc: "In this post",
    tocAria: "Table of contents",
    tocCount: (n: number) => `${n} ${n === 1 ? "section" : "sections"}`,
    writtenBy: "Written by",
    bio: "Multidisciplinary designer for 7 years. I build brands, interfaces and websites from concept to launch.",
    aboutLink: "More about me",
    next: "Next post",
    langNote: "The posts are written in Portuguese." as string | null,
  },
};

/** Categorias dos posts (o conteúdo grava em português). */
const CATEGORIAS: Record<string, { pt: string; en: string }> = {
  Ensaio: { pt: "Ensaio", en: "Essay" },
  Processo: { pt: "Processo", en: "Process" },
  Técnica: { pt: "Técnica", en: "Craft" },
};

export const categoria = (c: string, locale: Locale) => CATEGORIAS[c]?.[locale] ?? c;

/**
 * Data ISO (AAAA-MM-DD) por extenso. Em UTC para não voltar um dia
 * no fuso de Brasília (new Date("2026-04-22") é meia-noite UTC).
 */
export const formatDate = (iso: string, locale: Locale) =>
  new Date(iso).toLocaleDateString(locale === "pt" ? "pt-BR" : "en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });

/** Capa opcional. O tipo Post ainda não tem o campo; quando tiver, já aparece. */
export type PostCapa = { capa?: string; capaAlt?: string };
/** Post sem o corpo, para não mandar o texto inteiro aos componentes client. */
export type PostMeta = Omit<Post, "blocos">;
export const capaDe = (p: PostMeta) => (p as PostMeta & PostCapa).capa;
export const capaAltDe = (p: PostMeta) => (p as PostMeta & PostCapa).capaAlt ?? "";

/** Primeira citação do post, usada como destaque tipográfico no card. */
export const citacaoDe = (p: Post) =>
  p.blocos.find((b): b is Extract<Bloco, { tipo: "quote" }> => b.tipo === "quote")?.texto;

/** Mais recentes primeiro. */
export const porData = (list: Post[]) => [...list].sort((a, b) => b.data.localeCompare(a.data));

/** Resumo do post para os cartões do índice (sem o corpo). */
export type PostCard = PostMeta & PostCapa & { citacao?: string };
export const toCard = (p: Post): PostCard => {
  const { blocos: _corpo, ...meta } = p;
  return { ...meta, citacao: citacaoDe(p) };
};

/** Grade do post: coluna do sumário + coluna do texto (cabeçalho, corpo e fim usam a mesma). */
export const POST_GRID =
  "lg:grid lg:grid-cols-[200px_minmax(0,1fr)] lg:gap-x-16 xl:grid-cols-[240px_minmax(0,1fr)] xl:gap-x-[120px]";
