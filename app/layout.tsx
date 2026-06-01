import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/sections/Footer";
import { ScrollProgressBar } from "@/components/ui/Effects";
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
    default: "Dropê — Design, código e motion em uma mesma cabeça",
    template: "%s — Dropê",
  },
  description:
    "Pedro Fernandes (Drope) — Creative Technologist atendendo marcas no Brasil e internacionalmente. Branding, UI/UX, motion e código.",
  openGraph: {
    type: "website",
    locale: "pt_BR",
    siteName: "Dropê",
    title: "Dropê — Pedro Fernandes",
    description: "Design, código e motion — em uma mesma cabeça.",
    images: ["/og.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dropê — Pedro Fernandes",
    description: "Design, código e motion — em uma mesma cabeça.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={inter.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ScrollProgressBar />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
