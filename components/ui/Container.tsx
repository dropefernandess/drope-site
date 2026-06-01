import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  as?: "div" | "section" | "header" | "footer";
};

export function Container({ as: Tag = "div", className, ...rest }: Props) {
  return (
    <Tag
      className={cn("mx-auto w-full max-w-container px-6 md:px-16", className)}
      {...rest}
    />
  );
}
