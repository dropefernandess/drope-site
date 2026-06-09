import type { MetadataRoute } from "next";
import { projetos } from "@/content/projetos";
import { posts } from "@/content/posts";

/**
 * sitemap.xml dinâmico com i18n (hreflang alternates).
 *
 * Cada rota canônica PT declara seus alternates (pt-BR + en) via
 * `alternates.languages` — Google usa isso como sinal hreflang
 * autoritativo, pareando /sobre ↔ /en/sobre, etc.
 *
 * Páginas EN entram automaticamente como entradas próprias também.
 */
const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dropefernandes.com";

/** Gera par de entradas (PT + EN) pra uma rota, com alternates cruzados. */
function bilingual(
  path: string,
  opts: { changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number },
  lastModified: Date
): MetadataRoute.Sitemap {
  const ptUrl = path === "/" ? `${BASE}/` : `${BASE}${path}`;
  const enUrl = path === "/" ? `${BASE}/en` : `${BASE}/en${path}`;
  const languages = {
    "pt-BR": ptUrl,
    en: enUrl,
  };
  return [
    { url: ptUrl, lastModified, alternates: { languages }, ...opts },
    { url: enUrl, lastModified, alternates: { languages }, priority: Math.max(0, opts.priority - 0.05), changeFrequency: opts.changeFrequency },
  ];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticRoutes = [
    ...bilingual("/",            { changeFrequency: "monthly", priority: 1.0 },  lastModified),
    ...bilingual("/sobre",       { changeFrequency: "monthly", priority: 0.9 },  lastModified),
    ...bilingual("/projetos",    { changeFrequency: "monthly", priority: 0.95 }, lastModified),
    ...bilingual("/proposta",    { changeFrequency: "monthly", priority: 0.9 },  lastModified),
    ...bilingual("/calculadora", { changeFrequency: "monthly", priority: 0.8 },  lastModified),
    ...bilingual("/agendar",     { changeFrequency: "yearly",  priority: 0.7 },  lastModified),
    ...bilingual("/blog",        { changeFrequency: "weekly",  priority: 0.6 },  lastModified),
  ];

  const projectRoutes = projetos.flatMap((p) =>
    bilingual(`/projetos/${p.slug}`, { changeFrequency: "monthly", priority: 0.7 }, lastModified)
  );

  const blogRoutes = posts.flatMap((p) =>
    bilingual(`/blog/${p.slug}`, { changeFrequency: "monthly", priority: 0.55 }, lastModified)
  );

  // /cv fica fora do sitemap (acesso direto, noindex no /cv/print)
  return [...staticRoutes, ...projectRoutes, ...blogRoutes];
}
