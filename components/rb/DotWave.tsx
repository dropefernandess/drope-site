"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Campo de pontos dentro do botão. Referência: o "Dot wave" do BoardUI
 * (Agent Thinking): grade de pontos quadrados apagados, cortada por uma frente
 * diagonal que entra pela esquerda, atravessa com um rastro que se apaga e
 * volta depois de uma pausa. Aqui ela roda no hover/foco do botão; no clique,
 * uma onda circular sai do ponto tocado e se apaga.
 *
 * - Fica no fundo do botão (z-index 0), abaixo do texto e do bloco da seta,
 *   sem receber clique (pointer-events: none).
 * - Cor e força vêm do botão: --dot-color e --dot-alpha (ver .rb-btn / .rb-cta).
 * - Só anima enquanto há algo para mostrar: o requestAnimationFrame para sozinho
 *   quando o campo apaga. Nada roda parado.
 * - Movimento reduzido: não desenha nada (o botão fica só com a troca de cor).
 */

const PAD = 4; // respiro entre a grade e a borda
const SLANT = 1.1; // inclinação da frente (peso do eixo y)
const SWEEP = 950; // ms para a frente atravessar o botão
const PAUSE = 450; // ms de pausa antes da próxima passada
const HEAD = 6; // px: borda de ataque da frente (curta, nítida)
const TRAIL = 46; // px: rastro que se apaga atrás da frente
const BASE = 0.2; // brilho da grade parada, em fração do pico
const FADE_IN = 220; // ms
const FADE_OUT = 380; // ms
const RIPPLE_MS = 760; // vida da onda do clique
const RIPPLE_SPEED = 0.62; // px/ms
const RIPPLE_W = 9; // px: espessura do anel
const LEVELS = 7; // brilho em degraus, como os pontos do BoardUI

type Ripple = { x: number; y: number; t0: number };

export function DotWave({ className, pitch = 6, size = 2 }: { className?: string; pitch?: number; size?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const host = canvas?.parentElement;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !host || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let last = 0;
    let field = 0; // 0..1, fade do campo
    let hover = false;
    let focus = false;
    let waveT0 = 0;
    let ripples: Ripple[] = [];
    let pressTimer = 0;

    let w = 0, h = 0, dpr = 1, cols = 0, rows = 0, ox = 0, oy = 0;
    let level = new Uint8Array(0);
    let color = "#F2F2EB";
    let peak = 0.45;

    const measure = () => {
      const cw = host.offsetWidth;
      const ch = host.offsetHeight;
      const d = Math.min(window.devicePixelRatio || 1, 2);
      if (cw !== w || ch !== h || d !== dpr) {
        w = cw; h = ch; dpr = d;
        canvas.width = Math.round(w * dpr);
        canvas.height = Math.round(h * dpr);
        cols = Math.max(0, Math.floor((w - PAD * 2 - size) / pitch) + 1);
        rows = Math.max(0, Math.floor((h - PAD * 2 - size) / pitch) + 1);
        ox = Math.round((w - (cols - 1) * pitch - size) / 2);
        oy = Math.round((h - (rows - 1) * pitch - size) / 2);
        level = new Uint8Array(cols * rows);
      }
      const cs = getComputedStyle(host);
      color = cs.getPropertyValue("--dot-color").trim() || cs.color;
      const a = parseFloat(cs.getPropertyValue("--dot-alpha"));
      peak = Number.isFinite(a) ? a : 0.45;
    };

    const clear = () => {
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    const draw = (now: number) => {
      clear();
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Frente diagonal: entra antes da borda esquerda e sai depois do rastro.
      const span = w + h * SLANT;
      const t = (now - waveT0) % (SWEEP + PAUSE);
      const sweeping = field > 0 && t < SWEEP;
      const front = -HEAD + (t / SWEEP) * (span + TRAIL * 3 + HEAD);

      // A grade parada acende com o hover e também com o clique (toque no celular).
      let env = field;
      const live = ripples.map((r) => {
        const a = (now - r.t0) / RIPPLE_MS;
        const amp = Math.pow(1 - a, 1.6);
        env = Math.max(env, 1 - a);
        return { x: r.x, y: r.y, R: (now - r.t0) * RIPPLE_SPEED, amp };
      });
      const base = BASE * env;

      let k = 0;
      for (let j = 0; j < rows; j++) {
        const y = oy + j * pitch;
        for (let i = 0; i < cols; i++, k++) {
          const x = ox + i * pitch;
          let v = 0;
          if (sweeping) {
            const d = front - (x + y * SLANT);
            v = (d < 0 ? Math.max(0, 1 + d / HEAD) : Math.exp(-d / TRAIL)) * field;
          }
          for (const r of live) {
            const dist = Math.hypot(x + size / 2 - r.x, y + size / 2 - r.y);
            const off = dist - r.R;
            let rv = Math.exp(-(off * off) / (2 * RIPPLE_W * RIPPLE_W));
            if (off < 0) rv = Math.max(rv, 0.3 * Math.exp(off / 26)); // brilho que fica dentro do anel
            v = Math.max(v, rv * r.amp);
          }
          const val = base + (1 - base) * Math.min(1, v);
          level[k] = Math.round(val * LEVELS);
        }
      }

      ctx.fillStyle = color;
      for (let l = 1; l <= LEVELS; l++) {
        ctx.globalAlpha = (peak * l) / LEVELS;
        ctx.beginPath();
        let n = 0;
        k = 0;
        for (let j = 0; j < rows; j++) {
          for (let i = 0; i < cols; i++, k++) {
            if (level[k] === l) { ctx.rect(ox + i * pitch, oy + j * pitch, size, size); n++; }
          }
        }
        if (n) ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const frame = (now: number) => {
      const dt = Math.min(50, now - last);
      last = now;
      const target = hover || focus ? 1 : 0;
      field = target > field ? Math.min(1, field + dt / FADE_IN) : Math.max(0, field - dt / FADE_OUT);
      ripples = ripples.filter((r) => now - r.t0 < RIPPLE_MS);
      if (field === 0 && target === 0 && ripples.length === 0) {
        clear();
        raf = 0;
        return;
      }
      draw(now);
      raf = requestAnimationFrame(frame);
    };

    const kick = () => {
      if (raf) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    };

    const startWave = () => {
      // Recomeça pela esquerda se o campo estava apagado; senão segue a passada.
      if (field < 0.15) waveT0 = performance.now();
    };

    const onEnter = (e: PointerEvent) => {
      if (e.pointerType === "touch" || reduce.matches) return;
      measure();
      startWave();
      hover = true;
      kick();
    };
    const onLeave = () => { hover = false; };

    const addRipple = (x: number, y: number) => {
      ripples.push({ x, y, t0: performance.now() });
      if (ripples.length > 4) ripples.shift();
      kick();
    };

    const onDown = (e: PointerEvent) => {
      // Segura o estado ativo um instante (como o .is-clicked do Kodety): no toque
      // não existe hover, então é isso que faz o texto e a seta rolarem.
      host.dataset.pressed = "";
      window.clearTimeout(pressTimer);
      pressTimer = window.setTimeout(() => { delete host.dataset.pressed; }, 700);
      if (reduce.matches) return;
      measure();
      const rect = host.getBoundingClientRect();
      addRipple((e.clientX - rect.left) * (w / rect.width), (e.clientY - rect.top) * (h / rect.height));
    };

    // Enter/Espaço pelo teclado: a onda sai do centro.
    const onClick = (e: MouseEvent) => {
      if (e.detail !== 0 || reduce.matches) return;
      measure();
      addRipple(w / 2, h / 2);
    };

    const onFocus = () => {
      if (reduce.matches) return;
      let visible = false;
      try { visible = host.matches(":focus-visible"); } catch { visible = false; }
      if (!visible) return;
      measure();
      startWave();
      focus = true;
      kick();
    };
    const onBlur = () => { focus = false; };

    host.addEventListener("pointerenter", onEnter);
    host.addEventListener("pointerleave", onLeave);
    host.addEventListener("pointerdown", onDown);
    host.addEventListener("click", onClick);
    host.addEventListener("focus", onFocus);
    host.addEventListener("blur", onBlur);
    return () => {
      host.removeEventListener("pointerenter", onEnter);
      host.removeEventListener("pointerleave", onLeave);
      host.removeEventListener("pointerdown", onDown);
      host.removeEventListener("click", onClick);
      host.removeEventListener("focus", onFocus);
      host.removeEventListener("blur", onBlur);
      cancelAnimationFrame(raf);
      window.clearTimeout(pressTimer);
      delete host.dataset.pressed;
    };
  }, [pitch, size]);

  return <canvas ref={ref} aria-hidden className={cn("rb-dots", className)} />;
}
