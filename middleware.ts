import { NextResponse } from "next/server";

/**
 * Middleware de segurança — adiciona headers HTTP em todas as respostas.
 *
 * Não usa env vars, não acessa DB, não bloqueia nada. Só seta headers
 * defensivos pra dar nota A+ no securityheaders.com.
 *
 * Bloqueia:
 *  - XSS via script/style/img/etc não autorizados (CSP)
 *  - Clickjacking de fora (frame-ancestors none)
 *  - MIME sniffing (X-Content-Type-Options nosniff)
 *  - Vazamento de Referer pra terceiros (Referrer-Policy strict-origin-when-cross-origin)
 *  - Acesso a APIs sensíveis do browser sem motivo (Permissions-Policy)
 *
 * Permite intencionalmente:
 *  - Inline scripts/styles (Next inlines, Framer Motion, theme script anti-FOUC)
 *  - Cal.com iframe + script (página /agendar)
 *  - Spotify iframes (home Sobre)
 *  - Imagens do Unsplash (CTA Final, etc)
 */
export function middleware() {
  const res = NextResponse.next();

  const csp = [
    "default-src 'self'",
    // Next inlina scripts no build, Framer Motion usa inline tb, Cal.com loader.
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.cal.com https://*.cal.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https://images.unsplash.com https://*.cal.com https://i.scdn.co",
    "font-src 'self' data: https://fonts.gstatic.com",
    "connect-src 'self' https://app.cal.com https://api.cal.com https://*.cal.com https://vitals.vercel-insights.com",
    "frame-src 'self' https://open.spotify.com https://app.cal.com https://*.cal.com",
    "media-src 'self' https://p.scdn.co",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");

  res.headers.set("Content-Security-Policy", csp);
  res.headers.set("X-Content-Type-Options", "nosniff");
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  res.headers.set(
    "Permissions-Policy",
    [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "payment=()",
      "usb=()",
      "interest-cohort=()",
    ].join(", ")
  );
  // X-Frame-Options já vem do Vercel (DENY), mas reforço.
  res.headers.set("X-Frame-Options", "DENY");

  return res;
}

// Roda em tudo exceto assets estáticos + /api (Next escolhe rotas via matcher).
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|brand/|logos/|projetos/|.*\\.svg$|.*\\.png$|.*\\.jpg$|.*\\.webp$|.*\\.avif$).*)",
  ],
};
