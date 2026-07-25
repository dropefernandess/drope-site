"use client";

import { useEffect, useRef, useState } from "react";

/**
 * AFLUENTE — o objeto visual do hero da V3.
 *
 * Três correntes que descem em velocidades diferentes e convergem numa só.
 * Branding + UI/UX + desenvolvimento virando uma entrega — o conceito roda
 * em tempo real em vez de ser descrito numa frase.
 *
 * WebGL2 cru, sem Three.js: para um plano fullscreen, Three + R3F custa
 * ~150KB gzipped pra fazer o que este fragment shader faz em ~3KB.
 *
 * Perf (ver DIRECAO-V3.md §6):
 *  - triângulo de cobertura via gl_VertexID → zero buffers, zero atributos
 *  - DPR limitado a 1.5, render a 0.75× acima de 1600px
 *  - IntersectionObserver pausa o rAF quando o hero sai da tela
 *  - prefers-reduced-motion → um frame e para
 *  - sem WebGL2 → gradiente CSS equivalente
 *  - grain de 1.4% no shader mata o banding (defeito nº1 de gradiente
 *    escuro em painel de 8 bits)
 */

const VERT = `#version 300 es
void main() {
  int id = gl_VertexID;
  vec2 p = vec2(float((id << 1) & 2), float(id & 2));
  gl_Position = vec4(p * 2.0 - 1.0, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;

uniform vec2  uRes;
uniform float uTime;
uniform float uScroll;

out vec4 fragColor;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(1.7, 9.2);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uRes) / uRes.y;
  float t = uTime * 0.055;

  // Ponto de convergência — desce conforme o scroll avança no hero
  vec2 cp = vec2(0.0, -0.55 - uScroll * 0.38);
  float d = length((uv - cp) * vec2(0.72, 1.0));
  float focus = smoothstep(1.9, 0.05, d);

  // Domain warping em dois níveis — o que dá a leitura de fluido
  vec2 w1 = vec2(
    fbm(uv * 1.25 + vec2(0.0, t)),
    fbm(uv * 1.25 + vec2(5.2, -t * 0.85))
  );
  vec2 w2 = vec2(
    fbm(uv * 2.0 + w1 * 1.45 + vec2(1.7, t * 1.25)),
    fbm(uv * 2.0 + w1 * 1.45 + vec2(9.2, -t * 1.05))
  );
  float f = fbm(uv * 1.7 + w2 * 2.0);

  // As correntes comprimem horizontalmente rumo à convergência
  float squeeze = mix(1.0, 0.22, focus);
  float bands = fbm(vec2((uv.x / squeeze) * 2.6, uv.y * 1.15 - t * 1.9) + w2 * 1.2);
  float streak = smoothstep(0.62, 0.98, bands);

  vec3 base = vec3(0.031, 0.031, 0.043);
  vec3 azul = vec3(0.086, 0.188, 0.608);
  vec3 roxo = vec3(0.357, 0.145, 0.741);
  vec3 sage = vec3(0.639, 0.722, 0.647);

  vec3 col = base;
  col = mix(col, azul, smoothstep(0.30, 0.86, f) * (0.30 + 0.65 * focus));
  col = mix(col, roxo, smoothstep(0.52, 0.99, f + 0.16 * focus) * (0.20 + 0.55 * focus));
  col += mix(azul, sage, focus) * streak * focus * 0.30;
  col += sage * pow(focus, 4.0) * smoothstep(0.70, 1.0, f) * 0.22;

  float vig = smoothstep(2.1, 0.30, length(uv * vec2(0.80, 1.0)));
  col *= 0.30 + 0.70 * vig;

  col += (hash(gl_FragCoord.xy + fract(uTime) * 91.7) - 0.5) * 0.014;

  fragColor = vec4(max(col, 0.0), 1.0);
}`;

function compile(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type);
  if (!sh) return null;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[afluente] shader:", gl.getShaderInfoLog(sh));
    }
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export function Afluente({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
      failIfMajorPerformanceCaveat: false,
    } as WebGLContextAttributes);

    if (!gl) {
      setFailed(true);
      return;
    }

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) {
      setFailed(true);
      return;
    }

    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[afluente] link:", gl.getProgramInfoLog(prog));
      }
      setFailed(true);
      return;
    }
    gl.useProgram(prog);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uScroll = gl.getUniformLocation(prog, "uScroll");

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let heroH = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      heroH = Math.max(1, rect.height);
      // DPR limitado; acima de 1600px de largura renderiza a 0.75×
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const scale = rect.width > 1600 ? 0.75 : 1;
      w = Math.max(1, Math.round(rect.width * dpr * scale));
      h = Math.max(1, Math.round(rect.height * dpr * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = (timeSec: number) => {
      const progress = Math.min(1, Math.max(0, window.scrollY / heroH));
      gl.uniform1f(uTime, timeSec);
      gl.uniform1f(uScroll, progress);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    let raf = 0;
    let visible = true;
    const t0 = performance.now();

    const loop = (now: number) => {
      draw((now - t0) / 1000);
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      draw(12); // um frame, num ponto bonito do fluxo
    } else {
      raf = requestAnimationFrame(loop);
    }

    // Pausa quando o hero sai da tela — não queima GPU no resto da página
    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible === visible) return;
        visible = nowVisible;
        if (reduced) return;
        if (visible) {
          raf = requestAnimationFrame(loop);
        } else {
          cancelAnimationFrame(raf);
          raf = 0;
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      gl.deleteProgram(prog);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  if (failed) {
    return (
      <div
        aria-hidden="true"
        className={className}
        style={{
          background:
            "radial-gradient(120% 90% at 50% 118%, #5B25BD 0%, #16309B 26%, #0C0E14 62%, #08080B 100%)",
        }}
      />
    );
  }

  return <canvas ref={canvasRef} aria-hidden="true" className={className} />;
}
