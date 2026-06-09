"use client";

import Link from "next/link";
import { forwardRef } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";

/**
 * LocalLink — drop-in replacement do next/link que prefixa o href
 * com /en automaticamente quando o usuário está na versão inglesa.
 *
 * Uso idêntico ao <Link>. Para hrefs internos ("/sobre", "/projetos/x")
 * o prefixo é aplicado conforme o locale atual (derivado do pathname).
 * Âncoras (#x), mailto:, tel:, e URLs externas passam intactas.
 */
type LinkProps = React.ComponentProps<typeof Link>;

export const LocalLink = forwardRef<HTMLAnchorElement, LinkProps>(
  function LocalLink({ href, ...rest }, ref) {
    const { lhref } = useLocale();
    const localized = typeof href === "string" ? lhref(href) : href;
    return <Link ref={ref} href={localized} {...rest} />;
  }
);
