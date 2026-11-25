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
    locale: "en_US",
    title: "Drope Fernandes · Multidisciplinary designer",
    description:
      "Branding, web design, UI/UX, art direction, motion and social media. From concept to launch, without getting lost on the way.",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
