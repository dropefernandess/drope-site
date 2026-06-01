# Dropê — Site

Portfolio do Pedro Fernandes (Drope). Next.js 15 + Tailwind v3 + Framer Motion + Cal.com.

## 🚀 Setup local

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 📁 Stack

- **Next.js 15** (App Router, RSC)
- **React 19**
- **Tailwind v3** (config TS, light/dark via CSS vars)
- **Framer Motion** (Reveal, Stagger, Magnetic, Parallax, GlitchText, AnimatedCounter)
- **Cal.com embed** inline em `/agendar`
- **lucide-react** ícones

## 🏗 Estrutura

```
app/
  layout.tsx              ← Inter font, Nav + Footer + ScrollProgressBar
  page.tsx                ← Home (9 seções)
  globals.css             ← CSS vars, theme system
  sobre/                  ← /sobre standalone
  proposta/               ← /proposta (método + 3 planos)
  calculadora/            ← /calculadora funcional
  agendar/                ← Cal.com inline embed
  blog/                   ← /blog index
  projetos/[slug]/        ← Case study dinâmico

components/
  Nav.tsx                 ← Pill desktop + drawer mobile + theme toggle
  sections/               ← 9 seções da home
  ui/
    Motion.tsx            ← Reveal, Stagger, TextReveal
    Effects.tsx           ← GlitchText, Magnetic, AnimatedCounter, Parallax, ScrollProgressBar

content/
  projetos.ts             ← 11 case studies
  projetos/*.mdx          ← Templates

public/
  brand/                  ← Logos Drope (SVG light/dark + icon)
  logos/                  ← 13 logos de clientes
  projetos/               ← 11 covers de case study
  sobre.png               ← Foto do Pedro
```

## 🌐 Deploy

### Vercel (recomendado)

1. Push do repo pro GitHub
2. Em [vercel.com](https://vercel.com) → **Add New → Project** → importar do GitHub
3. Vercel detecta Next.js automaticamente — só clicar **Deploy**
4. Site fica em `seu-projeto.vercel.app` em ~2 min
5. Pra apontar `dropefernandes.com`: **Project Settings → Domains → Add**
   - Vercel te dá os registros DNS (CNAME `cname.vercel-dns.com`) pra adicionar no seu registrador

### Env vars

Nenhuma env var é necessária pra deploy básico. O Cal.com embed usa CDN público (`app.cal.com/embed/embed.js`).

## 🎨 Customizações principais

| Arquivo | O que mexer |
|---|---|
| `tailwind.config.ts` | Tokens de cor/spacing/typography |
| `app/globals.css` | CSS vars do theme (light/dark) |
| `content/projetos.ts` | Adicionar/remover case studies |
| `app/agendar/page.tsx` | `CAL_LINK` (atualmente `drope/30min`) |
| `components/sections/*.tsx` | Copy de cada seção |

## ⚙️ Comandos

```bash
npm run dev        # dev server
npm run build      # build produção
npm run start      # serve build produção local
npm run lint       # eslint
```

## 📝 Próximas iterações sugeridas

- [ ] Plugar carregamento real de MDX em `app/projetos/[slug]/page.tsx`
- [ ] Form de contato com Resend (rota `app/api/contato/route.ts`)
- [ ] Página `/legal/privacy` + `/legal/terms`
- [ ] Sanity CMS quando passar de ~20 case studies
- [ ] Carrossel de imagens nos case studies (estilo Jaxorion)

---

Feito com cuidado em Senador Firmino, MG.
