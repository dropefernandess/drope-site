export function StatusBadge({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-pill bg-[rgba(34,197,94,0.08)] px-3 py-1.5">
      <span className="size-2 rounded-full bg-[rgb(34,197,94)]" />
      <span className="text-[13px] text-status">{children}</span>
    </div>
  );
}
