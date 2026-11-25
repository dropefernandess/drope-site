// Mirror EN — re-exporta a página PT. O locale é derivado do pathname
// (/en/* → en) pelo LocaleProvider, então a página renderiza em inglês.
import type { Metadata } from "next";
export { default } from "../../agendar/page";

export const metadata: Metadata = {
  title: "Contact and booking",
  description:
    "Book a free 30-minute call on Google Meet. Or reach me directly by email, WhatsApp, Instagram, Behance or LinkedIn.",
  alternates: {
    canonical: "/en/agendar",
    languages: { "pt-BR": "/agendar", en: "/en/agendar" },
  },
};
