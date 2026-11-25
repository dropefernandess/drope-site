"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Dither animado (pedido do Pedro em 25/11: "animações de ASCII ou dither,
 * não efeitos estáticos"). Dither ordenado (Bayer 4×4) em vermelho da marca
 * sobre preto, desenhado num canvas de baixa resolução e ampliado pixelado.
 * - DitherPortrait: a foto vira dither com uma onda passando; o mouse (ou um
 *   toque, no celular) revela a foto real.
 * - DitherField: campo de dither vermelho em movimento lento (rodapé).
 * Para quando sai da tela; com "reduzir movimento", fica parado.
 */

const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5].map((v) => (v + 0.5) / 16);
const RED: [number, number, number] = [222, 40, 40];
const INK: [number, number, number] = [16, 16, 16];

function useVisible(ref: React.RefObject<Element | null>, onChange: (v: boolean) => void) {
  // callback guardado num ref: o observador nasce uma vez só, não a cada render
  const cb = useRef(onChange);
  cb.current = onChange;
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => cb.current(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
}

export function DitherPortrait({ src, alt, sizes, className, pixel = 4 }: { src: string; alt: string; sizes?: string; className?: string; pixel?: number }) {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ setVisible: (v: boolean) => void } | null>(null);

  useEffect(() => {
    const el = wrap.current, cv = canvas.current;
    if (!el || !cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, lum: Float32Array | null = null, buf: ImageData | null = null;
    let raf = 0, last = 0, visible = true, alive = true;
    const t0 = performance.now();
    const m = { x: -1e4, y: -1e4, r: 0, target: 0, pinned: false };
    const img = new window.Image();
    img.decoding = "async";
    img.src = src;

    const build = () => {
      if (!img.complete || !img.naturalWidth) return;
      const r = el.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width / pixel));
      H = Math.max(1, Math.round(r.height / pixel));
      cv.width = W; cv.height = H;
      const tmp = document.createElement("canvas");
      tmp.width = W; tmp.height = H;
      const tc = tmp.getContext("2d");
      if (!tc) return;
      const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
      const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
      tc.drawImage(img, (W - dw) / 2, (H - dh) / 2, dw, dh);
      const d = tc.getImageData(0, 0, W, H).data;
      lum = new Float32Array(W * H);
      // Tom: abre os meios-tons (rosto) e segura as altas (camisa branca) para não virar mancha sólida.
      for (let i = 0; i < W * H; i++) {
        const l = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
        lum[i] = 0.03 + 0.84 * Math.pow(l, 0.75);
      }
      buf = ctx.createImageData(W, H);
    };

    const draw = (now: number) => {
      if (!lum || !buf) return;
      const t = reduce ? 0 : (now - t0) / 1000;
      m.r += (m.target - m.r) * 0.14;
      const data = buf.data, R = m.r, R2 = R * R;
      for (let y = 0; y < H; y++) {
        const wy = 0.035 * Math.sin(y * 0.13 + t * 0.9);
        for (let x = 0; x < W; x++) {
          const i = y * W + x, o = i * 4;
          const wave = 0.07 * Math.sin(x * 0.09 + y * 0.05 - t * 1.6) + wy;
          const on = lum[i] + wave > BAYER[(y & 3) * 4 + (x & 3)];
          const c = on ? RED : INK;
          data[o] = c[0]; data[o + 1] = c[1]; data[o + 2] = c[2];
          let a = 255;
          if (R > 0.5) {
            const dx = x - m.x, dy = y - m.y, d2 = dx * dx + dy * dy;
            if (d2 < R2) { const k = Math.sqrt(d2) / R; a = k < 0.65 ? 0 : Math.round(255 * ((k - 0.65) / 0.35)); }
          }
          data[o + 3] = a;
        }
      }
      ctx.putImageData(buf, 0, 0);
    };

    const loop = (now: number) => {
      if (!alive) return;
      if (visible && now - last > 33) { last = now; draw(now); }
      raf = requestAnimationFrame(loop);
    };

    const start = () => { build(); draw(performance.now()); if (!reduce) raf = requestAnimationFrame(loop); };
    if (img.complete) start(); else img.onload = start;

    const ro = new ResizeObserver(() => { build(); draw(performance.now()); });
    ro.observe(el);

    const pos = (e: PointerEvent) => { const r = el.getBoundingClientRect(); m.x = (e.clientX - r.left) / pixel; m.y = (e.clientY - r.top) / pixel; };
    const onMove = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; pos(e); m.target = Math.max(W, H) * 0.22; if (reduce) draw(performance.now()); };
    const onLeave = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; m.target = 0; if (reduce) { m.r = 0; draw(performance.now()); } };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === "mouse") return;
      m.pinned = !m.pinned; m.x = W / 2; m.y = H / 2; m.target = m.pinned ? Math.max(W, H) * 1.2 : 0;
      if (reduce) { m.r = m.target; draw(performance.now()); }
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    api.current = { setVisible: (v) => { visible = v; } };
    return () => {
      alive = false; cancelAnimationFrame(raf); ro.disconnect();
      el.removeEventListener("pointermove", onMove); el.removeEventListener("pointerleave", onLeave); el.removeEventListener("pointerdown", onDown);
    };
  }, [src, pixel]);

  useVisible(wrap, (v) => api.current?.setVisible(v));

  return (
    <div ref={wrap} className={cn("relative overflow-hidden", className)}>
      <Image quality={90} src={src} alt={alt} fill sizes={sizes} className="object-cover" />
      <canvas ref={canvas} aria-hidden className="absolute inset-0 h-full w-full [image-rendering:pixelated]" />
    </div>
  );
}

/** Campo de dither vermelho em movimento lento, por cima da textura do rodapé. */
export function DitherField({ className, pixel = 4 }: { className?: string; pixel?: number }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ setVisible: (v: boolean) => void } | null>(null);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0, H = 0, buf: ImageData | null = null, raf = 0, last = 0, visible = true, alive = true;
    const t0 = performance.now();
    let sx1 = new Float32Array(0), sx2 = new Float32Array(0), cy1 = new Float32Array(0), cy2 = new Float32Array(0);

    const build = () => {
      const r = cv.getBoundingClientRect();
      W = Math.max(1, Math.round(r.width / pixel)); H = Math.max(1, Math.round(r.height / pixel));
      cv.width = W; cv.height = H; buf = ctx.createImageData(W, H);
      sx1 = new Float32Array(W); sx2 = new Float32Array(W); cy1 = new Float32Array(H); cy2 = new Float32Array(H);
    };
    const draw = (now: number) => {
      if (!buf) return;
      const t = reduce ? 0 : (now - t0) / 1000;
      // ondas separáveis: barato e com cara de nuvem que gira devagar
      for (let x = 0; x < W; x++) { sx1[x] = Math.sin(x * 0.021 + t * 0.18); sx2[x] = Math.cos(x * 0.047 - t * 0.27); }
      for (let y = 0; y < H; y++) { cy1[y] = Math.cos(y * 0.026 - t * 0.21); cy2[y] = Math.sin(y * 0.055 + t * 0.15); }
      const data = buf.data;
      for (let y = 0; y < H; y++) {
        for (let x = 0; x < W; x++) {
          const v = 0.5 + 0.3 * sx1[x] * cy1[y] + 0.2 * sx2[x] * cy2[y];
          const o = (y * W + x) * 4;
          const on = v * v * 0.95 > BAYER[(y & 3) * 4 + (x & 3)] + 0.18;
          data[o] = RED[0]; data[o + 1] = RED[1]; data[o + 2] = RED[2]; data[o + 3] = on ? 150 : 0;
        }
      }
      ctx.putImageData(buf, 0, 0);
    };
    const loop = (now: number) => { if (!alive) return; if (visible && now - last > 50) { last = now; draw(now); } raf = requestAnimationFrame(loop); };
    build(); draw(performance.now());
    if (!reduce) raf = requestAnimationFrame(loop);
    const ro = new ResizeObserver(() => { build(); draw(performance.now()); });
    ro.observe(cv);
    api.current = { setVisible: (v) => { visible = v; } };
    return () => { alive = false; cancelAnimationFrame(raf); ro.disconnect(); };
  }, [pixel]);

  useVisible(canvas, (v) => api.current?.setVisible(v));

  return <canvas ref={canvas} aria-hidden className={cn("pointer-events-none absolute inset-0 h-full w-full [image-rendering:pixelated]", className)} />;
}
