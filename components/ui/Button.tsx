import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

type BaseProps = {
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
};

type LinkProps = BaseProps & { href: string };
type ButtonProps = BaseProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };

const styles: Record<Variant, string> = {
  primary:
    "bg-ink-50 text-base hover:bg-white",
  secondary:
    "bg-surface text-fg-strong hover:bg-surface-2 border border-line",
  ghost:
    "text-fg-strong hover:text-fg-body underline-offset-4 hover:underline",
};

function classes(variant: Variant = "primary", className?: string) {
  return cn(
    "inline-flex items-center gap-2 rounded-pill px-5 py-3 text-value transition",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream",
    styles[variant],
    className
  );
}

export function Button(props: LinkProps | ButtonProps) {
  const { variant = "primary", className, children } = props;

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes(variant, className)}>
        {children}
      </Link>
    );
  }

  const { href: _omit, ...rest } = props as ButtonProps;
  return (
    <button className={classes(variant, className)} {...rest}>
      {children}
    </button>
  );
}
