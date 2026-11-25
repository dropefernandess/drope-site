import type { MetadataRoute } from "next";
import { SITE } from "@/lib/config";

/**
 * robots.txt dinâmico.
 *
 * Permite que crawlers (Google, Bing, etc) indexem o site público
 * mas bloqueia rotas que não fazem sentido no índice (API/_next/etc).
 *
 * O host vem de SITE.url (www, o domínio principal).
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE.url;

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/_vercel/"],
      },
      // Bloqueio explícito de bots agressivos de scraping LLM
      // (você decide se quer permitir ou bloquear nos casos abaixo)
      {
        userAgent: ["GPTBot", "ClaudeBot", "CCBot", "Google-Extended"],
        disallow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
