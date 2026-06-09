import type { Metadata } from "next";

/**
 * Layout do tree EN. Só adiciona metadata (idioma, alternates/hreflang).
 * Não envolve provider extra — o LocaleProvider do root deriva o locale
 * do pathname (/en/* → en), então as páginas re-exportadas renderizam EN.
 */
export const metadata: Metadata = {
  title: {
    default:
      "Multidisciplinary Designer · Pedro Fernandes (Drope) — Brazil & International",
    template: "%s · Drope Fernandes",
  },
  description:
    "Pedro Fernandes (Drope) — Multidisciplinary Designer with 7 years of craft. Branding, UI/UX and front-end for brands in Brazil and abroad. From concept to launch.",
  alternates: {
    canonical: "/en",
    languages: {
      "pt-BR": "/",
      en: "/en",
    },
  },
  openGraph: {
    locale: "en_US",
    title: "Multidisciplinary Designer · Pedro Fernandes (Drope)",
    description:
      "Branding, UI/UX and front-end for brands in Brazil and abroad. From concept to launch.",
  },
};

export default function EnLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
