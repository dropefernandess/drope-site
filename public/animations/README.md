# Animated SVGs

Pasta pra SVGs animados (SMIL ou com CSS embutido).

## Onde encontrar SVG animado grátis

- **SVGator** (svgator.com) — editor online, exporta SVG animado
- **Animista** (animista.net) — biblioteca de animações CSS prontas
- **CodePen** — buscar `animated svg` (atribuir autor se usar)
- **GitHub** — repos tipo `awesome-animated-svg`
- **Iconly** / **Lordicon** — alguns ícones têm SVG animado grátis
- **Framer Motion playgrounds** — copiar e exportar

## Onde encontrar Lottie grátis (alternativa)

- **lottiefiles.com/free-animations** → **filtrar "Free for personal & commercial use"**
- TEM bastante grátis (apesar de muitas premium serem destaque)

## Como usar no projeto

```tsx
import { AnimatedSVG } from "@/components/ui/AnimatedSVG";

// Modo padrão (object) — melhor pra SMIL + CSS embutido
<AnimatedSVG src="/animations/loader.svg" alt="Loading" width={64} height={64} />

// Modo img — mais leve, browsers modernos preservam SMIL/CSS
<AnimatedSVG src="/animations/spinner.svg" alt="Spinner" mode="img" />

// Modo inline — pra manipular via Framer Motion ou CSS de fora
<AnimatedSVG src="/animations/wave.svg" alt="Wave" mode="inline" className="text-brand" />

// Loop forçado (resetting a cada N ms — útil pra SMIL que toca só 1×)
<AnimatedSVG src="/animations/draw.svg" alt="Draw" loopMs={2500} />
```

## Recomendações pelo formato do SVG

| Tem | Use modo |
|---|---|
| `<animate>` ou `<animateTransform>` (SMIL) | `object` ou `img` |
| `<style>` interno com `@keyframes` | `object` (mais confiável) |
| Quer controlar via Framer/refs | `inline` |
| Sem animação (só ícone) | usar next/image em vez disso |

## Cores do projeto

Pra alinhar com a paleta:
- Brand vermelho: `#DE2828`
- Brand-fg cream: `#F2F2EB`
- Dark: `#101010`
- Cinza: `#3D3D3D`

Se o SVG usa `currentColor`, basta passar `className="text-brand"` (modo inline) que ele pega a cor.
