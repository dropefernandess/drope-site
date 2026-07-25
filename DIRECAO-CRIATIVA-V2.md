# DIREÇÃO CRIATIVA — dropefernandes.com V2
## "O Ponto de Silêncio"

> Documento normativo. Ele governa o `/v2`. Onde ele conflitar com uma referência
> externa, **ele vence**. Onde ele for omisso, a regra é: não invente — pergunte.
>
> Julho 2026 · substitui a implementação atual de `app/v2` e `components/v2`

---

## 0. Por que a V1 do V2 falhou

Não foi falta de capricho. Foi um erro de método, e ele está confessado no seu próprio código:

```
V2Hero.tsx      → "hero da ref Pallet Ross, fiel ao prompt... Header Kubric"
V2Services.tsx  → "os 3 cards do prompt GroundAI, fiéis à estrutura
                   (585px, raio 24, layouts internos) e recoloridos no manual"
```

Três sistemas de design de três produtos não relacionados — uma agência de vídeo dark,
um marketplace de arte, uma IA de interiores — empilhados e repintados de `#DE2828` +
`#F2F2EB`. **Colagem não é direção.** Nenhuma lógica única governa a página, e o olho
percebe isso antes da consciência. É essa a "cara de IA".

A IA não fugiu dos prompts. Ela obedeceu literalmente demais — e os prompts eram
descrições minuciosas de sites alheios. Você pediu transcrição e recebeu transcrição.

**A causa raiz é mais funda.** O BRAND SYSTEM promete no sumário: *Direção de Arte,
Ilustrações, Expressões, Componentes, Motion Design*. A p.38 é "TIPOGRAFIA", a p.39 é
"Inter.", e o documento acaba. Você tem **logo, cor e fonte**. Você não tem regra de
como uma superfície Dropê se comporta: grid, densidade, escala, estados, ritmo de motion.

A IA não tinha nada seu para obedecer. Então obedeceu Kubric, Pallet Ross e GroundAI.

**Este documento é a camada que faltava.** Ele é a Direção de Arte + Componentes +
Motion Design do seu manual, escrita para ser obedecida por você e por qualquer IA que
você use daqui pra frente.

---

## 1. O conceito

Está no seu próprio manifesto, p.13 e p.24:

> *"Entre o plano e a criação, existe um ponto de silêncio onde tudo se alinha,
> é ali que eu atuo."*

Isso não é uma frase bonita. É um briefing de design completo, e ele estava lá o tempo
todo. Traduzindo para decisões:

| Palavra do manifesto | Decisão de design |
|---|---|
| **silêncio** | Vazio generoso. Poucos elementos por tela. Quase monocromático. Tipografia pequena e contida. |
| **tudo se alinha** | A grade é o protagonista visível. Alinhamento é o produto, não o meio. |
| **é ali que eu atuo** | Você é a operação de alinhamento. O motion primário do site é o **encaixe**. |

E a régua do vermelho, também dele (p.24):

> *"o design que transforma não é aquele que grita... É o que fala na hora certa,
> da forma certa, com a intensidade exata."*

Logo: **`#DE2828` é o momento de decisão, nunca decoração.** Máximo uma ocorrência
significativa por viewport.

**A assinatura do site é o encaixe.** Elementos chegam levemente fora de alinhamento
e assentam na grade. Uma linha de 1px se desenha marcando o limite. Nada quica, nada
brilha, nada flutua. Tudo se resolve.

---

## 2. As sete leis

Se uma decisão violar uma delas, ela está errada — independente de parecer bonita.

**1 · Uma ideia por tela.**
Se dois elementos disputam o olho, um deles está errado. O hero atual tem três
(headline gigante + leque de 7 cards + pills flutuantes). Nenhum vence.

**2 · O drama vem do espaço, não do corpo.**
A hero da Mercury tem ~56px. A da Linear, ~64px. A sua tem 96px em ExtraBold
centralizado — que é, sozinho, o gesto mais reconhecível de landing gerada por IA.
Teto de display: **72px**. O peso vem do vazio ao redor.

**3 · A grade é visível e é o argumento.**
"Design não é enfeite, é função" (p.24). Então mostre a função. A régua de 1px é
elemento de marca, não separador genérico.

**4 · Vermelho é decisão.**
CTA, estado ativo, uma palavra da headline, o progresso. Nunca fundo de card, nunca
ícone decorativo, nunca "porque a seção precisava de cor".

**5 · Motion explica ou não existe.**
Toda animação responde: *o que isso comunica?* Se a resposta for "que é bonito", corta.

**6 · Superfície é plana.**
Zero sombra decorativa. Zero gradiente. Zero glass — com **uma** exceção declarada
(a nav pill). O manual já proíbe gradiente no logotipo (p.37); estendemos o espírito
à interface inteira.

**7 · Nenhum número mágico.**
Todo valor sai de um token. `HERO_ROW_Y = 522` é coordenada calibrada para o viewport
de outro site. É a causa literal dos "cards mal posicionados".

---

## 3. Fundação — a camada que faltava no manual

### 3.1 Grade

```
Container         max-width 1440px
Margens laterais  clamp(24px, 5vw, 96px)
Colunas           12
Gutter            24px
Baseline vertical 8px
Ritmo de seção    --space-section: clamp(96px, 12vw, 160px)
```

**Regra de composição — a assinatura:**

> **Conteúdo nunca ocupa as 12 colunas.** Texto vive em 5–7 colunas.
> O restante é o silêncio, e o silêncio é intencional.

É exatamente isso que separa a Mercury de um template. A tentação de preencher a
largura é o instinto errado. Resista a ela em todas as seções.

**Composição padrão:** conteúdo alinhado à **esquerda** na col 1–7, respiro na 8–12.
Centralização é exceção reservada ao CTA final.

### 3.2 Escala tipográfica

Inter, apenas. O problema nunca foi a fonte — foi a ausência de degraus. Hoje o `/v2`
salta de 96px/800 direto para 16px/400. Faltam os degraus do meio, e é neles que mora
a hierarquia.

| Token | Tamanho | Peso | Tracking | Leading | Uso |
|---|---|---|---|---|---|
| `display` | clamp(48px, 6vw, 72px) | 600 | -0.035em | 0.98 | Hero. **Só o hero.** |
| `h1` | clamp(36px, 4vw, 52px) | 600 | -0.03em | 1.05 | Título de seção |
| `h2` | clamp(28px, 3vw, 36px) | 600 | -0.02em | 1.15 | Subseção |
| `h3` | 22px | 600 | -0.015em | 1.3 | Card, item de lista |
| `lead` | clamp(17px, 1.4vw, 20px) | 400 | -0.01em | 1.5 | Parágrafo de abertura |
| `body` | 16px | 400 | 0 | 1.6 | Corpo |
| `small` | 14px | 400 | 0 | 1.5 | Secundário |
| `caption` | 13px | 500 | 0.01em | 1.4 | Legenda, meta |
| `eyebrow` | 12px | 600 | **0.14em** | 1.2 | **Caixa alta. O degrau que falta.** |
| `numeric` | herda | 500 | 0 | 1 | `font-variant-numeric: tabular-nums` |

**Regras:**
- **Máximo 3 níveis por seção.** Tipicamente: `eyebrow` → `h1` → `body`.
- `display` aparece **uma vez no site inteiro**.
- Peso 800 está **proibido**. 600 é o teto — em Inter, 800 em corpo grande vira ruído.
- `text-wrap: balance` em todo heading (mata viúvas sem intervenção manual).
- Medida de linha: 60–70 caracteres. Nunca mais que 75.
- `tabular-nums` obrigatório em qualquer número comparável (anos, métricas, índices
  de lista). É micro-detalhe caríssimo — é metade do que faz a Mercury parecer precisa.

### 3.3 Espaçamento

Escala fechada. **Só estes valores existem:**

```
4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 160 · 200
```

Qualquer valor fora da escala é bug. Sem `clamp()` improvisado no meio do componente —
`clamp()` só nos tokens.

### 3.4 Cor — tokens semânticos e contraste medido

Paleta oficial mantida (p.34). O que faltava eram os **tokens semânticos** e os limites
de contraste. Todos os ratios abaixo foram calculados, não estimados:

```
--surface-base      #F2F2EB   cream, base do site
--surface-raised    #FFFFFF   card sobre cream (diferenciado por borda, não por sombra)
--surface-inverse   #101010   seção-âncora escura
--surface-accent    #DE2828   superfície de ação

--text-primary      #101010   16.92:1 sobre cream ✓
--text-secondary    #545452   (ink 70%)  6.75:1 ✓
--text-tertiary     #6A6A68   (ink 60%)  4.82:1 ✓  ← PISO ABSOLUTO
--text-on-inverse   #F2F2EB   16.92:1 sobre ink ✓
--text-on-inv-sec   #989893   (cream 60%) 6.57:1 ✓
--text-accent       #73160E   10.09:1 ✓  ← o vermelho DE TEXTO

--accent            #DE2828   4.21:1 sobre cream — só ≥24px ou superfície
--accent-hover      #BF2C2C
--border-subtle     rgba(16,16,16,0.08)
--border-strong     rgba(16,16,16,0.16)
```

**Duas regras não-negociáveis, ambas derivadas de medição:**

> **`#DE2828` não é cor de texto corrido.** 4.21:1 falha AA (mínimo 4.5). Ele passa
> apenas em texto grande (≥24px, ou ≥19px bold), onde o mínimo é 3:1. Para texto em
> corpo na família vermelha, use `#73160E` (10.09:1).

> **O piso de opacidade sobre cream é 60%.** O `/v2` hoje usa `text-fg-strong/55` no
> lead do hero e nos parágrafos: **4.05:1, reprovado.** Não é preciosismo — é parte de
> por que o texto "some" e a página parece rasa.

`#F25041` (coral) sobre cream dá 3.11:1 — display apenas, nunca corpo.

### 3.5 Ritmo de superfície

O site inteiro claro é parte do porquê ele parece raso. Duas âncoras escuras criam
respiração e dão ao vermelho um lugar para brilhar:

```
Hero            cream
Prova/logos     cream
Serviços        cream
Trabalhos       cream
Processo        cream
Manifesto ▓     INK ← âncora 1
CTA ▓           INK ← âncora 2
Footer ▓        INK
```

Transição entre superfícies: **corte seco**, sem gradiente de fade. O corte é o
alinhamento.

Sobre `#101010` adicione `color-scheme: dark` no container e ajuste `<meta name="theme-color">`
dinamicamente — senão a scrollbar e os inputs nativos entregam o truque.

### 3.6 Forma

```
Radius   0     seções, divisores, faixas full-bleed
         8px   botões, inputs, controles
         12px  cards, thumbs de projeto  ← TETO
         999px APENAS nav pill e status badge

Borda    1px sólida, --border-subtle       ← o cavalo de batalha
Sombra   PROIBIDA
```

Elevação se expressa por **mudança de superfície + borda**, nunca por sombra.
`box-shadow: 0 20px 60px rgba(0,0,0,0.2)` — que está nos três prompts de referência e
no seu `/v2` — é, sobre fundo cream, um dos tells mais imediatos de template. Sombra
difusa grande em superfície clara não existe no mundo físico nem no bom design digital.

Os raios `18px` (cards do leque), `24px`/`3xl` (cards de serviço) vieram direto das
referências. Vão para 12px.

---

## 4. Linguagem de motion

### 4.1 O léxico — três gestos, apenas três

Um vocabulário pequeno e repetido é o que faz motion parecer *autoral*. Vocabulário
grande e variado é o que faz parecer gerado.

**① SNAP — o gesto primário (80% dos casos)**
Elemento entra deslocado 8–16px no eixo, opacity 0 → 1, e **assenta**.
`--ease-snap` · 480ms. Não quica. Não estica. Encaixa.
*É a tradução literal de "onde tudo se alinha".*

**② RÉGUA — a assinatura**
Linha de 1px que se desenha: `scaleX: 0 → 1`, `transform-origin: left`. 600ms.
Divisores de seção, underline ativo, indicador de progresso.
*É o alinhamento se tornando visível.*

**③ TRAVA — o espetáculo, uma vez só**
Sticky/pin com scrub. **Existe em exatamente uma seção do site** (Trabalhos).
Por ser única, tem peso. Se estivesse em três seções, não teria nenhum.

Qualquer gesto fora desses três precisa de justificativa escrita.

### 4.2 Tokens

```css
--ease-snap:  cubic-bezier(0.16, 1, 0.3, 1);   /* expo-out — o padrão */
--ease-out:   cubic-bezier(0.33, 1, 0.68, 1);  /* micro-interação */
--dur-micro:  180ms;   /* hover, estados */
--dur-base:   320ms;   /* transições de conteúdo */
--dur-enter:  480ms;   /* snap */
--dur-rule:   600ms;   /* régua */
--stagger:    40ms;
```

**`cubic-bezier(0.34, 1.56, 0.64, 1)` está banido.** Esse é o easing de overshoot
elástico que aparece nos três prompts de referência (`buttonBounce`, `hoverEase`) e no
seu `/v2`. O quique é o tell nº1 de interface gerada — é "fofo" e o Dropê não é fofo.
O arquétipo é Sábio/Criador/Explorador, não Bobo da Corte.

### 4.3 A correção mais importante do hero

O `/v2` anima a headline **palavra por palavra** com delay acumulado de 0.08s. Em 7
palavras isso são 560ms só de stagger; o lead entra em 2.2s e os botões em 2.4s. A hero
inteira leva **mais de 3 segundos** para se montar.

Isso é, simultaneamente: (a) a assinatura mais batida de landing gerada por IA, e
(b) uma penalidade real de percepção de qualidade — o usuário lê "carregando", não
"caprichado".

**Substituir por reveal linha a linha com máscara:**

```
Cada linha da headline vive em um <span> com overflow:hidden.
O conteúdo interno entra de translateY(100%) → 0.
2 linhas, stagger 80ms, --ease-snap, 480ms.
```

Mais rápido, mais editorial, e não parece efeito — parece tipografia.

**Timeline completa do hero — termina em 1.16s:**

| t | elemento | gesto |
|---|---|---|
| 0ms | eyebrow | snap |
| 120ms | headline linha 1 | máscara |
| 200ms | headline linha 2 | máscara |
| 320ms | lead | snap |
| 400ms | ações | snap |
| 480ms | bloco de dados | snap |
| 560ms | régua do rodapé | régua (600ms) |

### 4.4 Stack — divisão de responsabilidade

A bagunça atual vem de não ter essa fronteira definida.

| Ferramenta | Domínio | Regra |
|---|---|---|
| **Lenis** | Smooth scroll global | Só isso. Nada mais. |
| **GSAP + ScrollTrigger** | Tudo ligado à **posição do scroll** | Pin/trava, scrub, parallax, progresso |
| **Framer Motion** | Tudo ligado a **estado** | Hover, tap, `AnimatePresence`, `layout`, `whileInView` simples |

> **Regra de não-sobreposição:** nunca anime a mesma propriedade do mesmo elemento nas
> duas bibliotecas. GSAP é dono do scroll-linked; Framer é dono do state-linked.
> Violar isso produz jitter que parece "bug de performance" e não é.

**Integração Lenis ↔ ScrollTrigger — obrigatória**, senão o pin briga com o smooth scroll:

```js
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

**Performance:** animar **apenas** `transform` e `opacity`. Nunca `width`, `height`,
`top`, `left`. Para altura animável (accordion de serviços), usar
`grid-template-rows: 0fr → 1fr` — anima sem reflow.

### 4.5 Reduced motion

`prefers-reduced-motion: reduce` desliga snap, régua e trava. Conteúdo aparece em estado
final, sem transform. A seção Trabalhos degrada de pin para grade vertical simples.
Isso não é acessório — é regra das Web Interface Guidelines e a implementação atual só
cobre parcialmente.

---

## 5. A home, seção por seção

### 01 · Hero — declaração

Colunas **1–7**. Colunas 8–12 são silêncio deliberado.
**Sem leque de cards.** O hero não mostra trabalho — ele declara. O trabalho vem
depois, com peso próprio.

```
[eyebrow]   DESIGNER MULTIDISCIPLINAR · 7 ANOS

[display]   Crio marcas pra durar
            e entrego funcionando.        ← "funcionando" em #DE2828
                                            (display size, passa AA ✓)

[lead]      Branding, UI/UX e desenvolvimento na mesma cabeça,
            do briefing ao ar. Sem ping-pong entre fornecedores.

[ações]     ▪ Ver trabalhos        ou agenda 30 min ─────
              (sólido ink)          (link com régua no hover)
```

Canto inferior direito, col 9–12, alinhado tabular:

```
13   projetos entregues
03   países atendidos
AGO  próxima janela
```

Densidade precisa como decoração legítima — a lição correta da Mercury. Nada aqui é
inventado; tudo é dado real. É o oposto exato das pills "Vi teu trabalho no Insta!",
que não representam nada.

Régua de 1px full-bleed no rodapé do hero, desenhando da esquerda. Marca o baseline
do site inteiro.

**O que morre:** leque de 7 covers, os dois balões de chat, side-nav vertical (é do
Kubric e compete com a nav principal), headline centralizada, peso 800.

---

### 02 · Prova — logos

Uma linha, grade de 12 colunas, logos em `--text-tertiary`, altura normalizada.
À esquerda, `caption`: *"Marcas que confiaram."*

**Se ≤8 logos: grade estática.** Marquee infinito com 6 itens é ansiedade visual e
sinaliza que não há o suficiente para mostrar — sempre lê como enchimento. Estático
é mais confiante. Marquee só acima de 10, com máscara nas bordas e pausa no hover.

---

### 03 · Serviços — lista tipográfica

**Os três cards do GroundAI morrem aqui.** Eles usavam três metáforas desconexas
(carrossel de pills sobre foto, chat falso, acordeão vermelho) porque no site original
demonstravam um *produto*. Você não tem produto para demonstrar — tem serviços.

Substituto: **lista tipográfica full-width**, separada por réguas.

```
01   Branding & Identidade         · · · · · · · · · · ·   Ver ↗
─────────────────────────────────────────────────────────────────
02   UI/UX & Product               · · · · · · · · · · ·   Ver ↗
─────────────────────────────────────────────────────────────────
03   Web & Landing Pages           · · · · · · · · · · ·   Ver ↗
─────────────────────────────────────────────────────────────────
```

- Número em `numeric` tabular, `--text-tertiary`
- Título em `h3`
- Hover: linha expande revelando 2 linhas de descrição (`grid-template-rows 0fr→1fr`)
  + thumb do trabalho relacionado entra por snap na direita
- Entrada: régua desenha por item, stagger 40ms

**Por que é melhor:** escala para 7 serviços sem quebrar (os cards não escalavam),
tipografia carrega o peso — coerente com o conceito, e zero cards = zero cara de
template. É o padrão de densidade que Linear e Paraform usam.

---

### 04 · Trabalhos — a TRAVA

O momento de espetáculo. **O único.** Substitui o leque.

**Conceito: o contato-folha que se resolve.** Pin de ~300vh:

```
col 1–4 (sticky)          col 5      col 6–12
┌──────────────────┐      │          ┌────────────────────────┐
│ SIRIUS           │      █          │                        │
│ Branding · 2025  │      │          │      [case atual]      │
│                  │      │          │                        │
│ +40% recall      │      │          │                        │
│ de marca         │      │          └────────────────────────┘
└──────────────────┘      │
   crossfade            régua de
   ao avançar           progresso
```

- Esquerda sticky: nome, serviço, ano, métrica — trocam com crossfade
- Direita: cases avançam verticalmente, um por vez, entrando com snap; o anterior sai
  com scale-down sutil + fade
- Col 5: régua vertical de progresso, preenchendo em `#DE2828`
- Ao fim do pin, libera e o scroll continua normal

**Por que é seu e não de ninguém:** é o gesto de *alinhar*. Cada case se encaixa
enquanto os metadados se resolvem ao lado. É literalmente "o ponto de silêncio onde
tudo se alinha", executado. E funciona muito melhor como portfólio: no leque você não
consegue ler nada — sete miniaturas rotacionadas em 220px são decoração, não prova.

Mantém a pegada que você quer preservar: peso visual grande nos cases, entrada
coreografada, sensação de apresentação.

**Implementação:** GSAP ScrollTrigger `pin: true` + `scrub: 1`. `will-change: transform`
no wrapper. Next/Image `priority` nos dois primeiros, `loading="lazy"` no resto,
`width`/`height` explícitos (evita CLS).
**Reduced-motion:** degrada para grade vertical 2 colunas, sem pin.

---

### 05 · Processo — do brief ao deploy

Quatro etapas ancoradas numa régua horizontal que atravessa a seção e **se preenche de
`#DE2828` conforme o scroll** (scrub).

Aqui o vermelho tem função inequívoca: ele *é* o progresso. É o exemplo canônico da
Lei 4 e da Lei 5 operando juntas — cor com significado, motion com significado.

Cada etapa: número tabular · título `h3` · duas linhas de `small`.

---

### 06 · Manifesto + Depoimentos ▓ INK

Primeira âncora escura. O respiro do site.

Citação grande do manifesto (`h1` sobre `--surface-inverse`), seguida das provas
sociais. **Não quatro cards idênticos** — isso é grade de template. Um depoimento em
destaque + três compactos abaixo, ou rotação com régua de progresso.

Sobre ink, o vermelho ganha o máximo de presença. Use uma vez.

---

### 07 · CTA ▓ INK

Uma pergunta em `h1`. Um botão `--surface-accent`. O embed do Cal.com. Silêncio ao redor.
**Mais nada.**

Os dois cursores animados atuais saem — são decoração sem referente, mesma família das
pills do hero.

---

### 08 · Footer ▓ INK

Denso, alinhado à grade, estilo Linear/Mercury: colunas de links, bloco de dados de
contato, assinatura, seletor de idioma. **Aqui densidade é permitida e desejável** —
é o único lugar do site onde preencher as 12 colunas está correto.

---

## 6. Anti-padrões — a lista do "nunca mais"

Cada item abaixo está presente no `/v2` hoje. Cada um foi rastreado.

1. Copiar estrutura de referência com valores fixos (`HERO_ROW_Y=522`, `585px`, `220px`)
2. Headline acima de 72px
3. Headline centralizada com CTAs centralizados
4. Stagger palavra por palavra em headline
5. Sombra decorativa difusa (`0 20px 60px`)
6. Gradiente de fundo, blobs radiais desfocados
7. Glassmorphism fora da nav pill
8. Pills flutuantes com texto conversacional sobre imagens — **se um elemento não
   representa dado real, ele sai**
9. Grade de 3 cards iguais com altura fixa
10. Texto abaixo de 60% de opacidade sobre cream (falha AA — medido: 4.05:1)
11. `#DE2828` em texto corrido (4.21:1 — falha AA)
12. Repetir o mesmo componente visual em duas seções (o leque no hero *e* na seção 3)
13. Easing com overshoot elástico (`0.34, 1.56, 0.64, 1`)
14. Marquee infinito sem volume que o justifique
15. `border-radius` acima de 12px em card
16. Peso 800 em qualquer contexto
17. `transition: all`
18. Qualquer valor de espaçamento fora da escala fechada

---

## 7. Como usar as referências corretamente

O erro do `/v2` foi extrair a **camada errada**: copiou os efeitos, não os princípios.
Efeito não transfere entre contextos; princípio sim.

| Referência | O que roubar | O que ignorar |
|---|---|---|
| **Mercury** | Densidade de informação como estética. Números tabulares. A confiança de tipografia pequena. | A paleta e os componentes financeiros |
| **Linear** | Ritmo de seção. Contraste de superfície. Economia radical de cor. Motion que nunca chama atenção para si. | O gradient glow (é assinatura *deles*) |
| **Mintlify** | Clareza de hierarquia. Indicador de progresso. | Layout de documentação |
| **Paraform** | Tipografia grande **mas alinhada à esquerda e contida**. Prova social integrada ao fluxo. | Estrutura de marketplace |
| **Mitra** | Sticky/pin bem usado. Um único momento de espetáculo por página. | A composição das seções |
| **framer.university** | **Catálogo de timing e easing.** Abra, cronometre, anote durações e curvas. | Composição, layout, estrutura — sempre |

> **Regra geral: copie princípios, nunca composições.**
> Se você consegue apontar qual site inspirou uma seção olhando para ela, a seção falhou.

---

## 8. Checklist de conformidade

Verificar antes de considerar qualquer seção pronta.

**Acessibilidade**
- [ ] Contraste ≥4.5:1 em corpo, ≥3:1 em texto grande — verificado, não estimado
- [ ] Nenhum texto abaixo de 60% de opacidade sobre cream
- [ ] `#DE2828` nunca em texto <24px
- [ ] Foco visível em todo elemento interativo (`focus-visible:ring`), nunca `outline:none` sem substituto
- [ ] `<button>` para ação, `<a>`/`<Link>` para navegação — nunca `<div onClick>`
- [ ] Botões só de ícone com `aria-label`; ícones decorativos com `aria-hidden="true"`
- [ ] Headings hierárquicos h1→h6, sem pular nível; skip link para o conteúdo
- [ ] `scroll-margin-top` nas âncoras de seção (o header não pode cobrir o alvo)
- [ ] Alvos de toque ≥44×44px, espaçamento ≥8px

**Motion**
- [ ] `prefers-reduced-motion` honrado em todos os três gestos
- [ ] Apenas `transform` e `opacity` animados
- [ ] Zero `transition: all`
- [ ] `transform-origin` explícito na régua (`left`)
- [ ] Animações interrompíveis; input nunca bloqueado

**Tipografia**
- [ ] `text-wrap: balance` em headings
- [ ] `tabular-nums` em números comparáveis
- [ ] `…` em vez de `...`; aspas curvas
- [ ] `&nbsp;` em "30 min", "UI/UX", nomes de marca
- [ ] Máximo 3 níveis tipográficos por seção

**Performance / layout**
- [ ] `width` e `height` explícitos em toda imagem
- [ ] `priority` acima da dobra, `loading="lazy"` abaixo
- [ ] `preconnect` para domínios de fonte e asset
- [ ] Nenhuma leitura de layout em render (`getBoundingClientRect` no corpo do componente)
- [ ] Nenhum valor fora dos tokens

**Tema escuro**
- [ ] `color-scheme: dark` nas seções ink
- [ ] `<meta name="theme-color">` acompanha o fundo

---

## 9. Plano de execução

**Fase 1 — Fundação** *(bloqueia tudo)*
Tokens em CSS custom properties + extensão do `tailwind.config.ts`. Componente de grade.
Componente de régua. Providers de motion (Lenis + ScrollTrigger integrados corretamente).
Nada de seção antes disso — foi pular esta fase que produziu os números mágicos.

**Fase 2 — Hero**
É a prova do conceito. Se a hero funcionar com sete elementos e nenhum card, o sistema
está certo.

**Fase 3 — Serviços + Prova**
Lista tipográfica e grade de logos. Baixo risco, valida a densidade.

**Fase 4 — Trabalhos**
A trava. Maior esforço técnico, maior retorno. Fazer depois que o sistema estiver firme.

**Fase 5 — Processo, Manifesto, CTA, Footer**
Superfícies ink e fechamento.

**Fase 6 — Auditoria**
Checklist da §8 completo + Lighthouse + teste de teclado + reduced-motion + revisão
contra as sete leis.

---

## 10. Regra final

> Se você olhar uma seção e conseguir dizer **de qual site ela veio**, ela falhou.
> Se você olhar e conseguir dizer **qual lei ela obedece**, ela passou.
