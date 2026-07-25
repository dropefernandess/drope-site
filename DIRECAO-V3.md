# V3 — "AFLUENTE"
## Direção criativa · dark-first

> Curto de propósito. A V2 falhou porque eu escrevi 600 linhas de proibições
> e zero linhas de ofício. Aqui o documento é a régua; o código é a entrega.

---

## 0. O que deu errado na V2 (para não repetir)

Confundi **contenção** com **ausência**. Mercury, Linear e Mintlify são contidos
em tipografia e cor — mas os três têm um objeto visual pesado e caro no hero:
cena renderizada, geometria generativa, UI em profundidade. Removi o leque e
não coloquei nada no lugar.

E escrevi o sistema em negativas — não passe de 72px, sem sombra, sem 800, sem
quique. **Regra que só proíbe produz a mediana, e a mediana é a cara de template.**

A V3 inverte: cada regra abaixo diz o que **fazer**, e o hero tem um objeto
próprio, autoral, que ninguém pode copiar sem reescrever o shader.

---

## 1. O conceito

**AFLUENTE.** Três correntes que descem em velocidades diferentes e se fundem
numa só.

Branding, UI/UX e desenvolvimento convergindo numa entrega. É o argumento
central do Dropê — *"na mesma cabeça, sem ping-pong entre fornecedores"* —
virando imagem em vez de virar frase.

O hero não ilustra o conceito: ele **é** o conceito, rodando em tempo real.
Conforme o scroll desce, as correntes convergem e a luz se concentra — a
página inteira é a metáfora se resolvendo.

---

## 2. Tipografia

| Papel | Fonte | Uso |
|---|---|---|
| Display / ênfase | **Instrument Serif** (400, itálico) | Headlines, números de seção, citação do manifesto |
| Corpo / UI | **Inter** (400/500/600) | Tudo o mais |

O par é o motor do site. Inter sozinha em dark é o clichê de SaaS 2026 —
o serif de alto contraste é o que dá voz autoral. A regra é: **a palavra
que carrega a emoção vai em Instrument Serif itálico; o resto é Inter.**

Escala (`clamp`, fluida):

```
display   clamp(52px, 7vw, 104px)   400   -0.03em   0.94
h1        clamp(38px, 4.4vw, 64px)  400   -0.02em   1.02
h2        clamp(28px, 3vw, 40px)    500   -0.015em  1.12
h3        20px                      500   -0.01em   1.35
lead      clamp(17px, 1.5vw, 21px)  400   -0.01em   1.55
body      16px                      400    0        1.65
small     14px                      400    0        1.5
mono      12px                      500    0.14em   1.2  (caixa alta, tabular)
```

Display **pode** passar de 100px aqui — em dark, com shader atrás, tipo grande
funciona porque tem contexto visual. Era a falta de contexto que quebrava na V2.

---

## 3. Cor

Base near-black, correntes em azul profundo derivando para violeta, sage como
o brilho onde as correntes se encontram.

```
--azul-950  #08080B   base da página
--azul-900  #0C0E14   superfície elevada
--azul-800  #131722   card
--azul-600  #16309B   corrente 1
--roxo-500  #5B25BD   corrente 2
--sage-400  #A3B8A5   convergência / acento frio
--neutro-0   #FAFAFA  texto primário     (19.16:1 sobre a base)
--neutro-300 #A8ADB8  texto secundário   ( 8.89:1)
--neutro-500 #767C87  texto terciário    ( 4.77:1 — piso)
--roxo-400   #7C4DDB  ênfase gradiente   ( 3.75:1 — só display ≥24px)
```

Todos medidos, não estimados. O `#6E747F` que eu havia escrito dava
**4.26:1 e reprovava AA** — corrigido para `#767C87` depois de calcular.
O roxo passa só em texto grande; nunca em corpo.

**A logo entra em branco mono.** O vermelho da identidade sairia brigando com
as correntes; em branco ela vira assinatura e para de competir. O `#DE2828`
fica guardado para um único ponto do site, se você quiser.

---

## 4. Sistema

```
Raio        8 (sm) · 16 (md) · 24 (lg) · 40 (card) · full (pills)
Espaçamento 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128
Elevação    sombras baixas e suaves — em dark, elevação é sobretudo
            superfície + borda 1px rgba(255,255,255,.06); a sombra
            reforça, não sustenta
Grade       12 col · gutter 24 · margem clamp(20px, 4vw, 80px) · max 1440
```

---

## 5. Motion

**Um vocabulário, repetido.** Easing único: `cubic-bezier(0.16, 1, 0.3, 1)`.

| Gesto | Especificação |
|---|---|
| Reveal | fade-up 24px + scale 0.98→1 · 620ms · stagger **70ms** |
| Hover | scale 1.03 + elevação · 240ms · **nunca bounce** |
| Afluente | fluxo contínuo, ciclo visual ~20s |
| Trava | um pin com scrub, na seção Trabalhos — **só um no site** |
| Fecho | gradiente respirando na última dobra (Immersive Garden) |

Tudo abaixo de 400ms exceto o reveal. Nada de overshoot elástico.

**Divisão de stack:**
- **Lenis** — smooth scroll, e só
- **GSAP + ScrollTrigger** — posição do scroll: reveals, pin, scrub, progresso
- **Framer Motion** — estado: hover, tap, presença
- **WebGL2 puro** — o afluente

Nunca duas bibliotecas animando a mesma propriedade do mesmo elemento.

---

## 6. O afluente — decisões de engenharia

Escrito em WebGL2 cru, sem Three.js. Para um plano fullscreen, Three + R3F
custa ~150KB gzipped para fazer o que um fragment shader faz em ~3KB. Com
performance como prioridade declarada, a conta não fecha.

- Triângulo de cobertura via `gl_VertexID` — **zero buffers, zero atributos**
- Domain warping em dois níveis sobre fbm de 5 oitavas
- Grain de 1.2% no shader — **mata o banding**, que é o defeito nº1 de
  gradiente escuro em tela de 8 bits
- DPR limitado a 1.5 e render a 0.75× em telas grandes
- `IntersectionObserver` pausa o rAF quando o hero sai da tela
- `prefers-reduced-motion` → renderiza **um** frame e para
- Sem WebGL2 → gradiente CSS estático equivalente
- Canvas é `aria-hidden`; nenhum conteúdo vive nele

---

## 7. Arquitetura da home

| # | Seção | O que faz |
|---|---|---|
| 01 | **Hero** | Afluente + declaração. Composição ancorada embaixo, não centralizada — o shader ocupa o alto |
| 02 | **Prova** | 13 logos em fileira hairline, baixa opacidade |
| 03 | **Serviços** | Lista tipográfica; hover eleva a linha e revela thumb do trabalho relacionado |
| 04 | **Trabalhos** | A trava. Pin com scrub: metadados crossfade à esquerda, cases avançam à direita |
| 05 | **Processo** | 4 etapas sobre uma régua que preenche em sage conforme o scroll |
| 06 | **Manifesto** | Citação em Instrument Serif, palavra a palavra acendendo por scroll |
| 07 | **Fecho** | Gradiente respirando + CTA + footer denso |

---

## 8. As cinco leis

1. **Toda tela tem um objeto visual com peso** — imagem, shader, UI, geometria.
   Tipo sobre fundo não é composição.
2. **A palavra da emoção vai em serif itálico.** Uma por seção, no máximo.
3. **Densidade é permitida onde há função** — footer, metadados, números.
   Vazio só onde ele emoldura algo.
4. **Um easing, um vocabulário de motion.** Repetição é autoria.
5. **Performance é feature.** Se o afluente custar o LCP, o afluente muda.
