# CONTEXT.md — dropefernandes.com

> Documento de contexto vivo. Leia ANTES de qualquer trabalho no projeto.
> Última atualização: Junho 2026 · commit `d83b0db`

---

## 1. QUEM / O QUÊ

**Pedro Henrique Fernandes e Silva ("Drope")** — Designer Multidisciplinar freelance.
7 anos de ofício. Base: design gráfico → ampliou pra branding, UI/UX, motion e front-end básico.
Senador Firmino, MG. Atende Brasil e exterior (Dubai, Portugal).

**Posicionamento (definido pelo Pedro, não mudar):** "Designer Multidisciplinar" —
NÃO usar "Product Designer & Front-end" (foi testado e rejeitado; ele nasceu no
gráfico e não quer fingir especialização exclusiva em product).

**Resumo oficial (usado no /cv e PDF):**
"Sou um Designer Multidisciplinar com 7 anos de ofício construindo marcas,
interfaces e sistemas visuais. Tenho o design gráfico como base e a tecnologia
como extensão. Atendo clientes no Brasil e no exterior com projetos que vão do
conceito ao ar, com consistência visual em cada etapa."

**Objetivo do site:** gerar LEADS → agendamento (Cal.com "drope/30min") ou
estimativa (/calculadora). Toda decisão deve reduzir fricção até a conversão.

---

## 2. STACK & INFRA

- **Next.js 15 App Router** + Tailwind v3 (config TS) + Framer Motion
- Deploy: **Vercel** (push em `main` = deploy). Repo: `dropefernandess/drope-site`
- Domínio: **dropefernandes.com** (Hostinger DNS, apex + www funcionais)
- Email: **Resend** (domain verified, `noreply@dropefernandes.com`,
  RESEND_API_KEY no Vercel) — NUNCA pedir token no chat
- Agendamento: **Cal.com** embed inline, handle `drope/30min` (hardened:
  email verification, booking limits, confirmação manual)
- WhatsApp: 5532998057750 (fallback da calculadora)
- Tema: light cream default (`#F2F2EB`) + dark toggle. CSS vars triplet RGB
  em globals.css. Brand: **#DE2828** (vermelho), coral #F25041, wine #73160E
- Fonte: **Inter ONLY** (todos os pesos 100-900). Sem serif — peso radical
  no lugar de família diferente
- i18n: **URL-based**. PT na raiz, EN em `/en/*`. Locale derivado do PATHNAME
  (não cookie). `LocaleProvider` + `LocalLink` + `lhref()`. Mirror routes em
  `app/en/**` re-exportam páginas PT. Hreflang no sitemap
- Build atual: **60 páginas estáticas**, 0 erros

---

## 3. MAPA DE ARQUIVOS-CHAVE

```
app/
  layout.tsx          → metadata SEO (title keywords), JSON-LD @graph
                        (Person #pedro + ProfessionalService #studio, Local SEO),
                        GSC verification hook (NEXT_PUBLIC_GSC_VERIFICATION),
                        SplashScreen + DesignRulers + LocaleProvider
  not-found.tsx       → 404 global bilíngue "Esse frame foi deletado"
  page.tsx            → home (Hero→LogoStrip→Servicos→Projetos→Processo→
                        Sobre→Depoimentos→FAQ→CTA)
  en/**               → mirror routes EN (re-export + metadata EN própria)
  projetos/[slug]/    → template case Wegrow-style (hero media topo → header →
                        stats → sections c/ imagem full → galeria 9 slots
                        full/pair/full/pair/pair/full → CTA → next/prev)
                        + JSON-LD CreativeWork + BreadcrumbList
  blog/[slug]/        → posts com TOC sticky (PostTOC), BlogPosting + Breadcrumb
  cv/                 → CV público (badge Available, foto, assinatura, sociais)
  cv/print/           → página DEDICADA pro PDF (2 colunas: sidebar dark 70mm +
                        main branco; A4; ATS keywords; noindex)
  glossario/          → 24 termos bilíngues + schema DefinedTermSet + busca
  calculadora/        → lógica real de estimativa + EstimativaForm (Resend+WhatsApp)
  sitemap.ts          → bilíngue com alternates hreflang (PT+EN por rota)
  robots.ts           → allow SE, bloqueia GPTBot/ClaudeBot/CCBot

components/
  canvas/DesignRulers.tsx  → réguas Figma-like funcionais (ver §6 Fase 1)
  i18n/ (LocaleProvider, LocalLink, LocaleToggle c/ bandeiras SVG dropdown)
  sections/ (Hero, LogoStrip, Servicos, Projetos, Processo, Sobre,
             Depoimentos, FAQ c/ FAQPage schema, CTA c/ cursores animados, Footer)
  projetos/ (ProjectCard tilt 3D + glow, CaseImage, VideoPlaceholder,
             GalleryImage, BentoGallery [não usado])
  ui/ (Motion.tsx c/ Reveal direcional up/down/left/right/scale/fade,
       Effects, AnimatedIcons [Mail/StarRow/Clock/Pin/ThemeIcon],
       AnimatedCursor, AnimatedSVG, DropeLogoMotion, Signature,
       SplashScreen, LottieIcon, ThemeToggle)

content/
  projetos.ts   → 13 projetos. 5 cases-bandeira EXPANDIDOS (~500 palavras,
                  números com hedges honestos): bada-bing, use-duali, sirius,
                  go-trace, gisto-xavier. Vitta Clube + Gama Brasil =
                  PLACEHOLDERS "Em produção" (aguardando infos do Pedro)
  posts.ts      → 3 posts PT (design-como-linguagem, profundidade-no-processo,
                  tokens-vivos)
  glossario.ts  → 24 termos bilíngues em 5 categorias

lib/i18n/dictionaries.ts → TODAS as strings de UI PT+EN (~500 keys).
                  Prosa longa (cases/posts) fica em content/ e segue PT em /en

scripts/
  generate-cv-pdf.mjs      → Playwright headless → public/cv/curriculo-*.pdf
  generate-og.mjs          → gera og (não usado; OG atual é arte do Pedro)
  optimize-images.mjs      → 4 fotos principais
  optimize-case-images.mjs → todas de /public/projetos (resize 1600px q82)
```

---

## 4. ESTADO ATUAL — O QUE JÁ FOI FEITO (não refazer!)

### Design/UX
- Splash cinematográfico: logo motion oficial (DropeLogoMotion, CSS anims em
  globals) roda 100% (~1.63s) + progress bar + contador → magic-move pro topo.
  Só 1x por sessão (sessionStorage `drope-splash-shown`)
- Headline hero: "Crio marcas pra / durar e entrego elas funcionando." (sem travessão)
- Hero: 1 CTA primário ("Ver trabalhos") + 1 link ("ou agenda 30 min direto")
- Depoimentos: 4 cards estáticos (Isabela/Aroeira, Marcelo/MoneyFy,
  Rafael/Sirius, Poliana/Vizir) com INICIAIS (fotos pendentes em
  /public/depoimentos/{slug}.jpg — quando subir, reverter Avatar pra <img>)
- CTA final: bg #101010 (dark:#1A1A1A) + glow radial + 2 cursores animados
  ("Branding" #DE2828, "Visão" #F2F2EB) sem borda branca
- Galeria case: 9 slots (full 16:9 → pair 4:3 → full → pair → pair → full)
- Micro-animações: AnimatedClock (badges), AnimatedMail (CTA), AnimatedStarRow
  (depoimentos), AnimatedThemeIcon (toggle sol/lua)
- Card cream dos depoimentos = bg-bg-soft (branco), site mantém cream #F2F2EB
- 404 global custom bilíngue

### SEO (auditoria completa executada)
- Imagens: 4 fotos principais 23MB→2MB; cases 430MB→29MB (-93%)
- Title home: "Designer Multidisciplinar Freelance · Pedro Fernandes (Drope)..."
- keywords[], authors, robots googleBot max-image-preview large
- JSON-LD: @graph Person+ProfessionalService (geo, priceRange R$3.500+,
  areaServed, OfferCatalog) / CreativeWork+Breadcrumb (13 cases) /
  BlogPosting+Breadcrumb (posts) / FAQPage (8 Q&A home) / DefinedTermSet (glossário)
- OG: /og.jpg — ARTE OFICIAL do Pedro (1200×630, 60KB). Não regenerar
- Favicon: app/icon.svg + app/apple-icon.png (auto-detect Next 15)
- i18n URL-based completo + hreflang

### CV
- /cv: "Designer Multidisciplinar", chips de skills (Gráfico&Branding /
  Digital&UI-UX / Motion / Front-end básico), idiomas honestos
  ("Inglês — leitura técnica fluente · conversação em evolução"),
  badge Available·Remote·Brazil, sociais, assinatura SVG stroke-draw
- PDF: /cv/print → 1 página A4, 2 colunas, foto otimizada (8KB),
  padding 12mm, "Senador Firmino, MG" no PDF (vs "Brazil·Remote" no site)
- Workflow refresh: `npm run build && npm run start` + em outro terminal
  `CV_URL=http://localhost:3000/cv/print npm run cv:pdf` → commit public/cv/

### Conteúdo
- 5 cases expandidos com hedges honestos (ex: "+112% mas base pequena e
  tráfego pago em paralelo — não dá pra creditar tudo à marca")
- Glossário 24 termos
- 6 blog briefs ENTREGUES no chat (prontos pra escrever — ver §7)

---

## 5. CATEGORIAS DOS PROJETOS (definidas pelo Pedro)

| Projeto | Categorias |
|---|---|
| Bada Bing | Web |
| Use Dualí | Branding · Gráfico |
| MYKO | Branding · Gráfico |
| Vizir | Web · Gráfico |
| Sirius | Branding · Web · Motion |
| GO Trace | Branding · UI/UX · Web |
| Finanças Já! | Branding · Web · Motion |
| MoneyFy | Web · UI/UX · Branding |
| Bosque do Sol / Kátia Assis / Gisto & Xavier | Branding |
| Vitta Clube / Gama Brasil | Web (placeholders) |

Anos: Bada Bing/MoneyFy/Kátia/Gisto=2026 · Vizir/GoTrace/Finanças/Bosque=2025 ·
Use Dualí/MYKO=2024 · Sirius=2023

---

## 6. EM ANDAMENTO — REDESIGN "DESIGN CANVAS" (decisão do Pedro)

Pedro aprovou via AskUserQuestion: **redesign agressivo completo (Fases 0-4)**
+ **réguas funcionais completas (guias arrastáveis)**.
Referência-mãe: unkern.design/pt. Secundárias: venitbank (hero H1 dominante),
quintalestudio (prazos explícitos).

### ✅ Fase 1 — FEITA (commit d83b0db)
`components/canvas/DesignRulers.tsx` montado no root layout:
- Réguas H/V graduadas px em <canvas> (DPR-aware); vertical segue scroll real
- Linhas de cursor + HUD X/Y (rAF + transform)
- Guias arrastáveis (criar da régua, mover, dblclick remove; sessão)
- Marcadores de seção clicáveis; toggle tecla R + botão flutuante;
  localStorage `drope-rulers`; **default OFF**; oculto <768px;
  reduced-motion safe; aria-hidden nas réguas

### ✅ Fase 0 — FECHADA (decisão do Pedro)
**IDENTIDADE INTOCADA**: seguir o BRAND SYSTEM — DROPE
(D:\Logo\Drope Logo\BRAND SYSTEM - DROPE.pdf; rasterizado, ilegível por
ferramenta — mas os tokens do site JÁ vieram dele: #DE2828 + coral/deep/
burnt/wine/dark, ink 50-900, cream #F2F2EB, Inter todos os pesos).
O redesign é 100% de INTERAÇÃO/LAYOUT, não de identidade.
Entregue:
- components/ui/Buttons.tsx — ButtonPrimary/Secondary/Dark/Ghost com
  fill-up + text-slide (CSS puro group-hover, zero JS)
- components/ui/ScrollFX.tsx — TextScrollReveal (palavra a palavra,
  scroll-linked) + StickyStack/StickyCard (empilhamento Framer-style)
- Contraste AA: fg-mute-a 0.60→0.66 / fg-faint-a 0.42→0.52 (light);
  0.58→0.64 / 0.40→0.50 (dark); fg-body-a +0.02
- :focus-visible ring brand global
- /styleguide reescrito como doc viva do DS (3 direções removidas)
Referências de interação: unkern.design, quintalestudio.com.br,
unkern.com, hoxtrade.framer.website, wapfy.framer.website

### ⏳ Fase 2 — Home seção a seção
Labels de frame ("01 — Hero"), hero com foto mais clara + H1 respirando,
Serviços em bento assimétrico com hierarquia (2 frentes carro-chefe destacadas),
portfólio editorial, método com prazos explícitos, revisar badge "Q3 2026".
NÃO REMOVER conteúdo/copy PT — só elevar visual.

### ⏳ Fase 3 — Internas com DS novo
/projetos, /[slug], /proposta, /sobre, /blog, /agendar, /calculadora
(MANTER lógica da calculadora — é diferencial; só reskin).

### ⏳ Fase 4 — Polimento
Microinterações, a11y teclado completa, performance/CLS, console limpo,
zero placeholder, testar 375/768/1440 dark+light.

Regras inegociáveis: cada fase = 1 commit atômico + build limpo; sem scroll
horizontal/CLS/jank; réguas funcionais (não enfeite); WCAG AA; dark/light +
PT/EN em tudo que for criado. Se descaracterizar, PARAR e reverter a fase.

---

## 7. BACKLOG (fora do redesign)

1. **Google Search Console** — ADIADO (Pedro sem acesso Hostinger agora).
   Código pronto: hook NEXT_PUBLIC_GSC_VERIFICATION + robots + sitemap.
   Guia completo já entregue no chat (propriedade Domínio → TXT no Hostinger
   SEM apagar TXT do Resend → submeter sitemap.xml → recrawl 5-6 páginas)
2. **Analytics** LGPD-safe (Plausible ou Umami) — não iniciado
3. **6 blog posts** — briefs prontos: (1) Agência ou freelancer,
   (2) Quanto custa branding 2026, (3) Como contratar designer freelancer,
   (4) Identidade que dura, (5) Processo do briefing à launch,
   (6) "Designer multidisciplinar" ← keyword #1, escrever primeiro
4. **Fotos dos depoimentos** — Pedro vai subir em /public/depoimentos/
5. **Vídeos dos cases UI/UX-Web** — /public/projetos/{slug}/video.mp4
   (VideoPlaceholder já espera; HEAD-check automático)
6. **Vitta Clube + Gama Brasil** — aguardando infos reais + imagens do Pedro
7. **Bada Bing/Vizir galleries** — só 2 e 1 imagens subidas; resto placeholder
8. **Prosa EN** — cases/posts seguem PT em /en (tradução = passo separado)
9. **PDF EN do CV** — quando Pedro quiser

---

## 8. PREFERÊNCIAS DO PEDRO (aprendidas — respeitar)

- Voz: direta, sem enrolação, PT-BR informal ("pra"), sem clichê de IA
- NUNCA mencionar "trabalho solo" NEM "equipe" — nem um nem outro
- Números de resultado: realistas com hedges, "não perfeitos demais"
- Gosta de decidir visual: mostrar opções ANTES de aplicar mudanças de identidade
- Segurança: nunca colar tokens no chat (Resend/Cal.com via Vercel env)
- Cream #F2F2EB é a cor autoral do light mode (já foi trocada e revertida — manter)
- Pills/margens: reclama de espaçamento ruim — caprichar em padding simétrico
- Gosta do /proposta (manter página)
- Commits: detalhados, em PT, Co-Authored-By Claude

## 9. COMANDOS ÚTEIS

```bash
npm run dev / build / start
npm run cv:pdf                      # regenera PDF do CV (site live)
node scripts/optimize-case-images.mjs  # comprime imagens novas de cases
# teste local prod: npx next start -p 30XX + curl
```
