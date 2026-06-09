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
    languages: {
      "pt-BR": "/",
      en: "/en",
    },
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
        url: "/og.jpg",
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
    images: ["/og.jpg"],
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

// JSON-LD @graph — Person + ProfessionalService (Local SEO).
// O @graph conecta os dois nós via @id, dando ao Google um perfil
// completo: a pessoa (Pedro) E o serviço (estúdio de design) com
// área de atendimento, range de preço e localização — pra ranquear
// em buscas regionais (MG) e por serviço ("designer freelance brasil").
const SITE_URL = "https://dropefernandes.com";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#pedro`,
      name: "Pedro Fernandes",
      alternateName: ["Drope", "Pedro Henrique Fernandes e Silva"],
      url: SITE_URL,
      image: `${SITE_URL}/sobre-fullbody.png`,
      jobTitle: "Designer Multidisciplinar",
      description:
        "Designer Multidisciplinar com 7 anos de ofício construindo marcas, interfaces e sistemas visuais. Design gráfico como base, tecnologia como extensão.",
      email: "contato@dropefernandes.com",
      telephone: "+55-32-99805-7750",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Senador Firmino",
        addressRegion: "MG",
        addressCountry: "BR",
      },
      worksFor: { "@id": `${SITE_URL}/#studio` },
      sameAs: [
        "https://instagram.com/drope.fernandes",
        "https://linkedin.com/in/dropefernandes",
        "https://behance.net/dropefernandes",
        "https://dribbble.com/drope-fernandes",
      ],
      knowsAbout: [
        "Branding",
        "Identidade Visual",
        "UI/UX Design",
        "Web Design",
        "Motion Design",
        "Front-end Development",
        "Design Systems",
        "Design Tokens",
      ],
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#studio`,
      name: "Drope Fernandes — Design Multidisciplinar",
      image: `${SITE_URL}/og.jpg`,
      url: SITE_URL,
      email: "contato@dropefernandes.com",
      telephone: "+55-32-99805-7750",
      priceRange: "R$ 3.500+",
      founder: { "@id": `${SITE_URL}/#pedro` },
      description:
        "Estúdio de design multidisciplinar: branding, UI/UX, web e motion. Atende marcas no Brasil e no exterior, do conceito ao ar.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Senador Firmino",
        addressRegion: "MG",
        postalCode: "36540-000",
        addressCountry: "BR",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: -20.9167,
        longitude: -43.0944,
      },
      areaServed: [
        { "@type": "Country", name: "Brasil" },
        { "@type": "AdministrativeArea", name: "Minas Gerais" },
        { "@type": "Place", name: "Atendimento internacional remoto" },
      ],
      knowsLanguage: ["pt-BR", "en"],
      sameAs: [
        "https://instagram.com/drope.fernandes",
        "https://linkedin.com/in/dropefernandes",
        "https://behance.net/dropefernandes",
        "https://dribbble.com/drope-fernandes",
      ],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Serviços de Design",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Identidade Visual" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "UI/UX Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Desenvolvimento" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Motion Design" } },
        ],
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
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
