"use client";

import { usePathname } from "next/navigation";

/**
 * SiteChrome — esconde o "cromo" do portfólio (Nav, Footer, Splash,
 * ScrollProgressBar, DesignRulers) em rotas standalone que têm
 * identidade própria e não fazem parte da navegação do site.
 *
 * Hoje: /briefing (formulário da marca de biscoitos da mãe do Pedro).
 * O /cv/print continua com os guards CSS próprios (Playwright).
 */
const STANDALONE_ROUTES = ["/briefing"];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const standalone = STANDALONE_ROUTES.some(
    (r) => pathname === r || pathname?.startsWith(r + "/")
  );
  if (standalone) return null;
  return <>{children}</>;
}
