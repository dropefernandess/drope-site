import type { Metadata } from "next";
import { BlogIndex } from "@/components/rb/blog/BlogIndex";
import { porData, toCard } from "@/components/rb/blog/copy";
import { posts } from "@/content/posts";

export const metadata: Metadata = {
  title: "Blog",
  alternates: { canonical: "/blog", languages: { "pt-BR": "/blog", en: "/en/blog" } },
  description: "Textos sobre marca, processo e ofício, escritos no caminho entre um projeto e outro.",
};

/**
 * /blog — rebrand 2026. A página é montada em components/rb/blog/BlogIndex
 * (client, por causa do idioma); aqui só vão os resumos, sem o corpo dos
 * posts. /en/blog re-exporta este arquivo.
 */
export default function BlogPage() {
  return <BlogIndex posts={porData(posts).map(toCard)} />;
}
