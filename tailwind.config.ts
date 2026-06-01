import type { Config } from "tailwindcss";

/**
 * Dropê design tokens — Inter ONLY, dual-mode (light cream / dark ink).
 * Cores semânticas vêm de CSS vars (vide globals.css) pra suportar tema.
 * Brand vermelha permanente (não muda entre modos).
 */
const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
      // ---- COLORS (todas semânticas via CSS vars, exceto brand fixa) ----
      colors: {
        // Backgrounds & surfaces
        bg:          "rgb(var(--bg) / <alpha-value>)",
        "bg-soft":   "rgb(var(--bg-soft) / <alpha-value>)",
        surface:     "rgb(var(--surface) / var(--surface-a))",
        "surface-2": "rgb(var(--surface) / var(--surface-b))",
        line:        "rgb(var(--border) / var(--border-a))",

        // Foreground
        "fg-strong": "rgb(var(--fg-strong) / <alpha-value>)",
        "fg-body":   "rgb(var(--fg-body) / var(--fg-body-a))",
        "fg-mute":   "rgb(var(--fg-mute) / var(--fg-mute-a))",
        "fg-faint":  "rgb(var(--fg-faint) / var(--fg-faint-a))",

        // Brand (fixa em ambos os temas)
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          fg:      "rgb(var(--brand-fg) / <alpha-value>)",
          coral:   "#F25041",
          deep:    "#BF2C2C",
          burnt:   "#A61F12",
          wine:    "#73160E",
          dark:    "#400C08",
        },

        // Escala neutra oficial do brand book (fixa, não muda com tema —
        // usar com cuidado, prefira tokens semânticos acima)
        ink: {
          50:  "#F2F2EB",
          100: "#D1D1D1",
          200: "#A6A6A6",
          400: "#7D7D7D",
          700: "#3D3D3D",
          900: "#101010",
        },

        // Status
        status: "rgb(var(--status) / <alpha-value>)",
      },

      // ---- TYPOGRAPHY (Inter only, todos os pesos) ----
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },

      // ---- LAYOUT ----
      maxWidth: {
        container: "1400px",
        reading: "640px",
        prose: "700px",
        narrow: "440px",
      },
      borderRadius: {
        card: "16px",
        pill: "100px",
        section: "24px",
      },

      // ---- MOTION ----
      transitionDuration: {
        DEFAULT: "200ms",
        fast: "120ms",
        slow: "400ms",
      },
      keyframes: {
        "fade-up": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 400ms ease-out",
      },
    },
  },
  plugins: [],
};

export default config;
