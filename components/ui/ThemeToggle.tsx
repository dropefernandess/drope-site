"use client";

import { useEffect, useState } from "react";
import { AnimatedThemeIcon } from "@/components/ui/AnimatedIcons";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "drope-theme";

/**
 * Theme toggle — light/dark. Estado vive no <html> class="dark".
 * O script no <head> (layout.tsx) seta o tema ANTES do paint pra
 * evitar FOUC. Aqui só lê/escreve o state pós-mount.
 */
export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Hidrata estado pós-mount
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    setTheme(isDark ? "dark" : "light");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {}
  }

  // Antes da hidratação, renderiza o ícone "neutro" sem opacity pra evitar
  // hydration mismatch (server não sabe o theme; client decide pós-mount)
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Mudar para modo claro" : "Mudar para modo escuro"}
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className={cn(
        "inline-flex size-9 items-center justify-center rounded-full border border-line bg-surface text-fg-strong transition hover:bg-surface-2",
        className
      )}
    >
      <AnimatedThemeIcon isDark={theme === "dark"} size={16} strokeWidth={2} />
    </button>
  );
}
