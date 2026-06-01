import { cn } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  tone?: "subtle" | "medium" | "panel";
};

const tones = {
  subtle: "bg-surface",
  medium: "bg-surface-2",
  panel: "bg-bg-soft",
} as const;

export function Card({ className, tone = "subtle", ...rest }: Props) {
  return (
    <div
      className={cn(
        "rounded-card p-8 md:p-9 flex flex-col gap-4",
        tones[tone],
        className
      )}
      {...rest}
    />
  );
}
