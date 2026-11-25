import type { Metadata } from "next";

/**
 * Layout do tree EN. Só adiciona metadata (idioma, alternates/hreflang).
 * Não envolve provider extra — o LocaleProvider do root deriva o locale
 * do pathname (/en/* → en), então as páginas re-exportadas renderizam EN.
 */
export const metadata: Metadata = {
  title: {
    default: "Drope Fernandes · Multidisciplinary designer",
    template: "%s · Drope Fernandes",
  },
  description:
    "Drope Fernandes, a multidisciplinary designer for 7 years. Branding, web design, UI/UX, art direction, motion and social media, from concept to launch.",
  // Canonical fica em cada página (ver app/layout.tsx).
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Drope Fernandes",
    title: "Drope Fernandes · Multidisciplinary designer",
    description:
      "Branding, web design, UI/UX, art direction, motion and social media. From concept to launch, without getting lost on the way.",
    // O openGraph daqui substitui o do layout raiz inteiro, então a imagem vem repetida.
    images: [{ url: "/og-2026.jpg", width: 1200, height: 630, alt: "Drope Fernandes · Multidisciplinary designer" }],
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
