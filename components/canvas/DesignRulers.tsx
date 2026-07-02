"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * DesignRulers — camada "prancheta de design" (Figma/Photoshop) FUNCIONAL.
 *
 * Recursos:
 *  - Régua horizontal (topo) + vertical (esquerda) graduadas em px.
 *    Ticks a cada 10px, número a cada 100px. Desenhadas em <canvas>
 *    (crisp em retina, zero jank ao rolar).
 *  - Vertical reflete o scroll real (Y = scrollY + posição na viewport),
 *    como no Figma.
 *  - Linhas que seguem o cursor + HUD "X / Y" em tempo real (rAF, transform).
 *  - Guias arrastáveis: arrasta a partir da régua pra criar; arrasta a guia
 *    pra mover; double-click remove. Persistem na sessão.
 *  - Marcadores de seção clicáveis na régua vertical (auto-detecta <section>).
 *  - Toggle: tecla "R" ou botão flutuante (toolbar estilo Figma).
 *    Estado salvo em localStorage.
 *  - < 768px: oculto (sem CLS, sem scroll horizontal).
 *  - prefers-reduced-motion: sem linhas de cursor.
 *  - Réguas aria-hidden (decorativas); toggle é focável e rotulado.
 *
 * Default OFF — não interfere na experiência até o usuário ligar.
 */

const STORAGE_KEY = "drope-rulers";
const RULER = 22; // espessura das réguas em px
const BRAND = "#DE2828";

type Axis = "x" | "y";
type Guide = { id: number; axis: Axis; pos: number }; // pos em coords de documento

function cssVar(name: string, fallback: string) {
  if (typeof window === "undefined") return fallback;
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return v || fallback;
}

export function DesignRulers() {
  const [enabled, setEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [reduced, setReduced] = useState(false);

  const [guides, setGuides] = useState<Guide[]>([]);
  const [sections, setSections] = useState<{ label: string; top: number }[]>([]);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef(0);
  const guideIdRef = useRef(1);
  const dragRef = useRef<{ mode: "create" | "move"; axis: Axis; id?: number } | null>(null);

  // ---------- mount / prefs ----------
  useEffect(() => {
    setMounted(true);
    try {
      setEnabled(localStorage.getItem(STORAGE_KEY) === "1");
    } catch {}
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqReduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const upd = () => {
      setIsMobile(mqMobile.matches);
      setReduced(mqReduced.matches);
    };
    upd();
    mqMobile.addEventListener("change", upd);
    mqReduced.addEventListener("change", upd);
    return () => {
      mqMobile.removeEventListener("change", upd);
      mqReduced.removeEventListener("change", upd);
    };
  }, []);

  // ---------- toggle via tecla R ----------
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "r") return;
      const el = document.activeElement;
      if (el && (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || (el as HTMLElement).isContentEditable)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      setEnabled((v) => {
        const next = !v;
        try { localStorage.setItem(STORAGE_KEY, next ? "1" : "0"); } catch {}
        return next;
      });
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const toggle = useCallback(() => {
    setEnabled((v) => {
      const next = !v;
      try { localStorage.setItem(STORAGE_KEY, next ? "1" : "0"); } catch {}
      return next;
    });
  }, []);

  const active = mounted && enabled && !isMobile;

  // ---------- desenho das réguas (canvas) ----------
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    if (canvas.width !== w * dpr || canvas.height !== h * dpr) {
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const bg = cssVar("--bg", "242 242 235");
    const fg = cssVar("--fg-strong", "16 16 16");
    const fgRGB = `rgb(${fg})`;
    ctx.fillStyle = `rgb(${bg})`;
    // faixas das réguas
    ctx.fillRect(0, 0, w, RULER);
    ctx.fillRect(0, 0, RULER, h);
    ctx.strokeStyle = `rgb(${fg} / 0.12)`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, RULER + 0.5); ctx.lineTo(w, RULER + 0.5);
    ctx.moveTo(RULER + 0.5, 0); ctx.lineTo(RULER + 0.5, h);
    ctx.stroke();

    ctx.font = "9px ui-monospace, monospace";
    ctx.fillStyle = `rgb(${fg} / 0.55)`;

    const scrollY = scrollYRef.current;

    // régua horizontal (X = posição na viewport)
    ctx.strokeStyle = `rgb(${fg} / 0.28)`;
    ctx.beginPath();
    for (let x = RULER; x < w; x += 10) {
      const major = Math.round(x) % 100 === 0;
      const len = major ? 8 : 4;
      ctx.moveTo(x + 0.5, RULER);
      ctx.lineTo(x + 0.5, RULER - len);
      if (major) ctx.fillText(String(x), x + 2, 9);
    }
    ctx.stroke();

    // régua vertical (Y = documento = scroll + viewport)
    ctx.beginPath();
    const startDoc = Math.floor(scrollY / 10) * 10;
    for (let d = startDoc; d < scrollY + h; d += 10) {
      const y = d - scrollY;
      if (y < RULER) continue;
      const major = d % 100 === 0;
      const len = major ? 8 : 4;
      ctx.moveTo(RULER, y + 0.5);
      ctx.lineTo(RULER - len, y + 0.5);
      if (major) {
        ctx.save();
        ctx.translate(9, y - 2);
        ctx.rotate(-Math.PI / 2);
        ctx.fillText(String(d), 0, 0);
        ctx.restore();
      }
    }
    ctx.stroke();

    // marcador de origem
    ctx.fillStyle = fgRGB;
    ctx.globalAlpha = 0.4;
    ctx.fillRect(0, 0, RULER, RULER);
    ctx.globalAlpha = 1;
  }, []);

  // ---------- loop de scroll/resize ----------
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const onScroll = () => {
      scrollYRef.current = window.scrollY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(draw);
    };
    const onResize = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => { draw(); measureSections(); });
    };
    scrollYRef.current = window.scrollY;
    draw();
    measureSections();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, draw]);

  // ---------- seções ----------
  const measureSections = useCallback(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("main section, main > div > section"));
    const list = els.slice(0, 12).map((el, i) => ({
      label: String(i + 1).padStart(2, "0"),
      top: el.getBoundingClientRect().top + window.scrollY,
    }));
    setSections(list);
  }, []);

  // ---------- cursor ----------
  useEffect(() => {
    if (!active || reduced) return;
    let raf = 0;
    let mx = 0, my = 0;
    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        if (vLineRef.current) vLineRef.current.style.transform = `translateX(${mx}px)`;
        if (hLineRef.current) hLineRef.current.style.transform = `translateY(${my}px)`;
        if (hudRef.current) {
          hudRef.current.textContent = `X ${Math.round(mx)}  ·  Y ${Math.round(my + scrollYRef.current)}`;
        }
        // arrasto de guia em andamento
        const drag = dragRef.current;
        if (drag) {
          const pos = drag.axis === "x" ? mx : my + scrollYRef.current;
          setGuides((gs) => {
            if (drag.mode === "create" && drag.id == null) {
              const id = guideIdRef.current++;
              drag.id = id;
              return [...gs, { id, axis: drag.axis, pos }];
            }
            return gs.map((g) => (g.id === drag.id ? { ...g, pos } : g));
          });
        }
      });
    };
    const onUp = () => { dragRef.current = null; };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseup", onUp);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [active, reduced]);

  if (!active) {
    // Só o toolbar de toggle fica montado (discreto), pra poder ligar
    return mounted && !isMobile ? (
      <RulerToggle enabled={enabled} onToggle={toggle} />
    ) : null;
  }

  return (
    <>
      {/* Canvas das réguas — não bloqueia cliques */}
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 z-[45]"
      />

      {/* Faixas interativas pra CRIAR guias (arrasta a partir da régua) */}
      <div
        aria-hidden
        onMouseDown={() => { dragRef.current = { mode: "create", axis: "x" }; }}
        className="fixed left-0 top-0 z-[46] h-[22px] cursor-ew-resize"
        style={{ right: 0 }}
      />
      <div
        aria-hidden
        onMouseDown={() => { dragRef.current = { mode: "create", axis: "y" }; }}
        className="fixed left-0 top-0 z-[46] w-[22px] cursor-ns-resize"
        style={{ bottom: 0 }}
      />

      {/* Linhas do cursor */}
      {!reduced && (
        <>
          <div
            ref={vLineRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[47] h-full w-px"
            style={{ background: `${BRAND}80` }}
          />
          <div
            ref={hLineRef}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[47] h-px w-full"
            style={{ background: `${BRAND}80` }}
          />
        </>
      )}

      {/* Guias */}
      {guides.map((g) =>
        g.axis === "x" ? (
          <div
            key={g.id}
            className="fixed top-0 z-[46] h-full w-px cursor-ew-resize"
            style={{ left: g.pos, background: `${BRAND}`, opacity: 0.5 }}
            onMouseDown={(e) => { e.stopPropagation(); dragRef.current = { mode: "move", axis: "x", id: g.id }; }}
            onDoubleClick={() => setGuides((gs) => gs.filter((x) => x.id !== g.id))}
          />
        ) : (
          <div
            key={g.id}
            className="fixed left-0 z-[46] h-px w-full cursor-ns-resize"
            style={{ top: g.pos - scrollYRef.current, background: `${BRAND}`, opacity: 0.5 }}
            onMouseDown={(e) => { e.stopPropagation(); dragRef.current = { mode: "move", axis: "y", id: g.id }; }}
            onDoubleClick={() => setGuides((gs) => gs.filter((x) => x.id !== g.id))}
          />
        )
      )}

      {/* Marcadores de seção na régua vertical */}
      {sections.map((s) => {
        const y = s.top - scrollYRef.current;
        if (y < RULER || y > window.innerHeight) return null;
        return (
          <button
            key={s.label + s.top}
            onClick={() => window.scrollTo({ top: s.top - 100, behavior: "smooth" })}
            className="fixed z-[46] left-[22px] -translate-y-1/2 text-[9px] font-mono font-semibold px-1 rounded-sm bg-brand text-brand-fg hover:opacity-80 transition"
            style={{ top: y }}
            aria-label={`Ir para seção ${s.label}`}
          >
            {s.label}
          </button>
        );
      })}

      {/* HUD X/Y */}
      {!reduced && (
        <div
          ref={hudRef}
          aria-hidden
          className="pointer-events-none fixed bottom-4 left-4 z-[48] rounded-md bg-fg-strong/90 px-2.5 py-1 text-[10px] font-mono tabular-nums text-bg backdrop-blur"
        >
          X 0 · Y 0
        </div>
      )}

      <RulerToggle enabled={enabled} onToggle={toggle} />
    </>
  );
}

/** Botão de toggle estilo toolbar Figma (bottom-right). */
function RulerToggle({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Desligar réguas de design (R)" : "Ligar réguas de design (R)"}
      title={enabled ? "Réguas ON — tecla R" : "Réguas OFF — tecla R"}
      className={`fixed bottom-4 right-4 z-[49] inline-flex size-9 items-center justify-center rounded-lg border text-[10px] font-mono font-bold transition ${
        enabled
          ? "border-brand bg-brand text-brand-fg"
          : "border-line bg-bg-soft/90 text-fg-mute hover:text-fg-strong backdrop-blur"
      }`}
    >
      R
    </button>
  );
}
