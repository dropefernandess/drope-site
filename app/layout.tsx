import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgressBar } from "@/components/ui/Effects";
import { SplashScreen } from "@/components/ui/SplashScreen";
import { LocaleProvider } from "@/components/i18n/LocaleProvider";
import "./globals.css";

// Inter em TODOS os pesos — Thin 100 ao Black 900.
// Contraste tipográfico (radical weight pairing) substitui necessidade
// de família serif e mantém coerência com identidade Dropê.
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dropefernandes.com"),
  title: {
    default:
      "Designer Multidisciplinar Freelance · Pedro Fernandes (Drope) — Brasil & Internacional",
    template: "%s · Drope Fernandes",
  },
  description:
    "Pedro Fernandes (Drope) — Designer Multidisciplinar com 7 anos no ofício. Branding, UI/UX e front-end pra marcas no Brasil e no exterior. Do conceito ao ar.",
  keywords: [
    "Designer Multidisciplinar",
    "Designer Freelance Brasil",
    "Designer Multidisciplinar Brasil",
    "Branding Designer",
    "UI/UX Designer Brasil",
    "Diretor de Arte Freelance",
    "Pedro Henrique Fernandes",
    "Drope Fernandes",
    "Freelance Branding Brasil",
    "Designer Brasileiro Remoto",
    "Identidade Visual",
    "Motion Designer",
    "Front-end Designer",
  ],
  authors: [{ name: "Pedro Fernandes", url: "https://dropefernandes.com" }],
  creator: "Pedro Fernandes (Drope)",
  publisher: "Drope Fernandes",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Drope Fernandes",
    title:
      "Designer Multidisciplinar Freelance · Pedro Fernandes (Drope)",
    description:
      "Branding, UI/UX e front-end pra marcas no Brasil e no exterior. Do conceito ao ar, com consistência visual em cada etapa.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Drope Fernandes — Designer Multidisciplinar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Designer Multidisciplinar Freelance · Pedro Fernandes (Drope)",
    description:
      "Branding, UI/UX e front-end pra marcas no Brasil e no exterior.",
    images: ["/og.png"],
    creator: "@dropefernandes",
  },
  // Next 15 App Router detecta automaticamente:
  //   app/icon.svg       → favicon vetorial em todas as resoluções
  //   app/apple-icon.png → apple-touch-icon 180×180
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Script inline pra setar tema ANTES do paint (evita FOUC).
// Light é o DEFAULT da marca. Dark só se o usuário escolheu manualmente
// (system preference é ignorada deliberadamente — decisão de identidade).
const themeScript = `
(function() {
  try {
    var saved = localStorage.getItem('drope-theme');
    if (saved === 'dark') document.documentElement.classList.add('dark');
  } catch (e) {}
})();
`;

// JSON-LD Person schema — Google enriquece resultados com nome,
// alternateName (Drope), profissão, sameAs links sociais.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Pedro Fernandes",
  alternateName: "Drope",
  url: "https://dropefernandes.com",
  image: "https://dropefernandes.com/sobre-fullbody.png",
  jobTitle: "Designer multidisciplinar",
  description:
    "Designer multidisciplinar atuando entre identidade visual, interface, motion e código. Atende marcas no Brasil e internacionalmente desde 2018.",
  email: "contato@dropefernandes.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Senador Firmino",
    addressRegion: "MG",
    addressCountry: "BR",
  },
  sameAs: [
    "https://instagram.com/drope.fernandes",
    "https://linkedin.com/in/dropefernandes",
    "https://behance.net/dropefernandes",
    "https://dribbble.com/drope-fernandes",
  ],
  knowsAbout: [
    "Branding",
    "Identidade visual",
    "UI/UX Design",
    "Web Design",
    "Motion Design",
    "Front-end development",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body>
        {/* Splash de boas-vindas (1.4s + fade) — só no primeiro acesso da sessão */}
        <SplashScreen />
        <LocaleProvider>
          <ScrollProgressBar />
          <Nav />
          <main>{children}</main>
          <Footer />
        </LocaleProvider>
      </body>
    </html>
  );
}
