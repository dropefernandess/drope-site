import type { MetadataRoute } from "next";
import { projetos } from "@/content/projetos";

/**
 * sitemap.xml dinâmico.
 *
 * Lista todas as rotas estáticas + 1 entrada por case study.
 * Atualiza changeFrequency e priority conforme criticidade.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://dropefernandes.com";
  const lastModified = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`,            lastModified, changeFrequency: "monthly", priority: 1.0 },
    { url: `${baseUrl}/sobre`,       lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/projetos`,    lastModified, changeFrequency: "monthly", priority: 0.95 },
    { url: `${baseUrl}/proposta`,    lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${baseUrl}/calculadora`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/agendar`,     lastModified, changeFrequency: "yearly",  priority: 0.7 },
    { url: `${baseUrl}/blog`,        lastModified, changeFrequency: "weekly",  priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projetos.map((p) => ({
    url: `${baseUrl}/projetos/${p.slug}`,
    lastModified,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes];
}
