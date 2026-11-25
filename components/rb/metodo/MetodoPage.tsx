"use client";

import { useLocale } from "@/components/i18n/LocaleProvider";
import { BrandButton, Icon, ICONS, Label } from "@/components/rb/ui";
import { MOVES, Process } from "@/components/rb/home/Process";
import { FinalCTA } from "@/components/rb/FinalCTA";
import { LineReveal, Reveal, RevealGroup } from "@/components/rb/motion";
import { cn } from "@/lib/utils";

/**
 * Método (/metodo e /en/metodo). Conteúdo da plataforma de marca (04, "O
 * Processo"), do banco de copy (09) e do deck (07, Ponto de Partida).
 * Ordem: cabeçalho com os 4 movimentos, "Como funciona" da Home, as 10
 * etapas agrupadas por movimento (03 Silêncio em destaque), o pacote Ponto
 * de Partida, o que eu preciso do cliente e a chamada final.
 */

type Step = { n: string; name: string; desc: string; get: string; you: string };

const STEPS: Record<"pt" | "en", Step[]> = {
  pt: [
    { n: "01", name: "Escuta", desc: "A primeira conversa. Entendo o negócio antes do projeto: o que dói, o que você sonha e o que já foi tentado.", get: "A proposta, com as etapas que valem para o seu escopo, o prazo e o valor fechado.", you: "Contar o projeto do jeito que ele está na sua cabeça, mesmo que ainda esteja bagunçado." },
    { n: "02", name: "Imersão", desc: "Briefing profundo, pesquisa de mercado e de concorrência, e uma auditoria do que já existe.", get: "Um briefing consolidado por escrito, que guia todas as decisões seguintes.", you: "Responder o briefing e me dar acesso ao que já existe: marca, site, materiais e números." },
    { n: "03", name: "Silêncio", desc: "A síntese. Tudo o que foi ouvido e pesquisado decanta até virar uma direção clara. É aqui que o projeto se alinha. Parece lento, e é o motivo de eu não refazer.", get: "A direção do projeto por escrito, antes de qualquer forma.", you: "Confirmar se a direção traduz o que você me contou." },
    { n: "04", name: "Território", desc: "Direção criativa: moodboard, rotas visuais e referências. Você escolhe com opções na mesa, com contexto e não no escuro.", get: "As rotas visuais e o caminho que eu recomendo, com o porquê.", you: "Escolher a rota. Eu defendo a minha aposta, e a decisão é sua." },
    { n: "05", name: "Forma", desc: "Design da identidade, da interface ou do layout. A direção escolhida vira coisa concreta.", get: "A identidade, a interface ou o layout desenhados e apresentados ao vivo.", you: "Revisar e juntar os ajustes de cada rodada num retorno só." },
    { n: "06", name: "Sistema", desc: "Tokens, componentes, variações e regras. O que era peça vira linguagem replicável.", get: "Um sistema com cores, tipografia, componentes e regras de uso.", you: "Me dizer onde a marca vai aparecer, para o sistema cobrir esses lugares." },
    { n: "07", name: "Prova", desc: "Aplicações reais, testes com conteúdo verdadeiro e refino. Nada é aprovado em mockup ideal.", get: "A marca aplicada nas peças do dia a dia, ajustada até funcionar com o conteúdo de verdade.", you: "Mandar conteúdo real: textos, fotos e produtos." },
    { n: "08", name: "Construção", desc: "Desenvolvimento e implementação: código, arquivos finais e motion. Design e código na mesma cabeça.", get: "O site no ar, os arquivos finais e o motion, quando fazem parte do escopo.", you: "Liberar o acesso ao domínio e à hospedagem, quando o projeto tem site." },
    { n: "09", name: "Entrega", desc: "Handoff completo: manuais, arquivos organizados e treinamento de uso. Entregar é ensinar a usar.", get: "O manual da marca, os arquivos abertos e finais numa pasta organizada e o treinamento de uso.", you: "Reunir quem vai usar a marca no dia a dia para o treinamento." },
    { n: "10", name: "Órbita", desc: "Acompanhamento depois do lançamento: ajustes, evolução e próximos ciclos. Marca boa não é evento, é órbita.", get: "30 dias de acompanhamento depois da entrega. Manutenção e novos ciclos são combinados à parte.", you: "Me contar como a marca está se saindo no mundo." },
  ],
  en: [
    { n: "01", name: "Listening", desc: "The first conversation. I understand the business before the project: what hurts, what you dream of and what has already been tried.", get: "The proposal, with the steps that fit your scope, the timeline and a fixed price.", you: "Tell me about the project the way it is in your head right now, even if it's still messy." },
    { n: "02", name: "Immersion", desc: "An in-depth brief, market and competitor research, and an audit of what already exists.", get: "A written brief that guides every decision that follows.", you: "Answer the brief and give me access to what already exists: brand, website, materials and numbers." },
    { n: "03", name: "Silence", desc: "The synthesis. Everything heard and researched settles until it becomes one clear direction. This is where the project aligns. It looks slow. It's why I don't have to start over.", get: "The project's direction in writing, before any form.", you: "Confirm the direction translates what you told me." },
    { n: "04", name: "Territory", desc: "Creative direction: moodboard, visual routes and references. You choose with options on the table, with context instead of in the dark.", get: "The visual routes and the path I recommend, with the reasoning.", you: "Pick the route. I defend my bet, and the decision is yours." },
    { n: "05", name: "Form", desc: "Designing the identity, the interface or the layout. The chosen direction becomes something concrete.", get: "The identity, interface or layout, designed and presented live.", you: "Review and gather each round's changes into a single reply." },
    { n: "06", name: "System", desc: "Tokens, components, variations and rules. What was a single piece becomes a repeatable language.", get: "A system with colors, typography, components and usage rules.", you: "Tell me where the brand will show up, so the system covers those places." },
    { n: "07", name: "Proof", desc: "Real applications, tests with real content and refinement. Nothing gets approved in an ideal mockup.", get: "The brand applied to everyday pieces, adjusted until it works with real content.", you: "Send real content: copy, photos and products." },
    { n: "08", name: "Build", desc: "Development and implementation: code, final files and motion. Design and code in the same head.", get: "The website live, the final files and motion, when they're part of the scope.", you: "Grant access to the domain and hosting, when the project includes a website." },
    { n: "09", name: "Delivery", desc: "Complete handoff: guidelines, organized files and usage training. Delivering means teaching how to use it.", get: "The brand guidelines, open and final files in an organized folder, and usage training.", you: "Bring together whoever will use the brand day to day for the training." },
    { n: "10", name: "Orbit", desc: "Follow-up after launch: adjustments, evolution and next cycles. A good brand isn't an event, it's an orbit.", get: "30 days of follow-up after delivery. Maintenance and new cycles are agreed separately.", you: "Tell me how the brand is doing out in the world." },
  ],
};

/** Índices das etapas em cada movimento (MOVES, da Home). */
const GROUPS = [[0, 1], [2, 3], [4, 5, 6], [7, 8, 9]];
const SIGNATURE = "03";
/** Etapas que entram no Ponto de Partida: 01 a 05, mais a 09. */
const PACKAGE_STEPS = ["01", "02", "03", "04", "05", "09"];

const CHECK = '<path d="M20 6 9 17l-5-5"/>';
const arrowCls = "text-fg-strong transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none";

const COPY = {
  pt: {
    label: "Método",
    titleA: "Profundidade não atrasa projeto. Ela evita ",
    titleB: "retrabalho",
    lead: "Meu processo tem dez etapas, da primeira conversa ao acompanhamento depois do lançamento. Você participa de cada decisão, escolhe com opções na mesa e sabe em qual etapa estamos o tempo todo.",
    movesLabel: "Quatro movimentos",
    movement: "Movimento",
    stepsLabel: "As dez etapas",
    stepsTitle: "O processo, etapa por etapa.",
    stepsDesc: "Nem todo projeto passa pelas dez. Um branding puro pula a Construção, e um site pode usar só parte do Sistema. Na proposta, eu marco quais etapas valem para o seu escopo, com o prazo de cada uma. Prazo combinado é prazo cumprido.",
    get: "Você recebe",
    you: "Sua parte",
    signature: "A assinatura do processo",
    quote: "“Todo projeto tem um ponto de silêncio. Não é pausa, é alinhamento.”",
    pkgChip: "Pacote fechado",
    pkgTitle: "Ponto de Partida",
    pkgLead: "Para quem precisa de uma marca séria antes de um projeto sob medida.",
    pkgDesc: "Escopo, prazo e valor fechados: estratégia enxuta, identidade visual essencial e um mini manual para a marca sair andando. São as etapas 01 a 05 do processo, mais a entrega completa da 09.",
    facts: [
      ["Prazo", "3 a 4 semanas"],
      ["Etapas", "01 a 05, mais a 09"],
      ["Valor", "Fixo, com estimativa na página de orçamento e valor final na proposta"],
    ],
    includesTitle: "O que entra",
    includes: [
      "Estratégia enxuta da marca",
      "Identidade visual essencial",
      "Mini manual de uso",
      "Arquivos finais organizados e treinamento de uso",
    ],
    pkgStepsTitle: "As etapas do pacote",
    inPkg: "incluída no pacote",
    outPkg: "fora do pacote",
    pkgNote: "Quando o negócio crescer e pedir o caminho completo, tudo o que foi feito aqui é aproveitado. Nada se joga fora.",
    pkgCalc: "Ver a estimativa agora",
    pkgCall: "Agendar 30 minutos",
    needLabel: "Sua parte",
    needTitle: "O que eu preciso de você.",
    needDesc: "O processo anda no ritmo combinado quando cada lado faz a sua parte. A minha está nas dez etapas. A sua cabe em cinco linhas.",
    needs: [
      ["Uma conversa sincera", "Trinta minutos na Escuta, contando o que dói, o que já foi tentado e aonde você quer chegar."],
      ["Acesso ao que já existe", "Marca atual, site, materiais de venda e os números que você puder compartilhar. É com eles que eu faço a Imersão."],
      ["Quem decide, por perto", "Uma pessoa que aprova cada etapa. Decisão sem dono é o caminho mais curto para o retrabalho."],
      ["Conteúdo de verdade", "Textos, fotos e produtos reais, para a Prova acontecer com o que vai existir e não com texto de exemplo."],
      ["Retorno no prazo", "Os ajustes de cada rodada reunidos num retorno só, dentro do prazo combinado. Assim o meu prazo também se cumpre."],
    ],
  },
  en: {
    label: "Method",
    titleA: "Depth doesn't delay a project. It prevents ",
    titleB: "rework",
    lead: "My process has ten steps, from the first conversation to the follow-up after launch. You take part in every decision, choose with options on the table and always know which step we're in.",
    movesLabel: "Four movements",
    movement: "Movement",
    stepsLabel: "The ten steps",
    stepsTitle: "The process, step by step.",
    stepsDesc: "Not every project goes through all ten. A pure branding project skips Build, and a website may use only part of System. In the proposal I mark which steps fit your scope, with the timeline for each one. The timeline I agree to is the timeline I keep.",
    get: "You get",
    you: "Your part",
    signature: "The signature of the process",
    quote: "“Every project has a point of silence. It isn't a pause, it's alignment.”",
    pkgChip: "Fixed package",
    pkgTitle: "Ponto de Partida",
    pkgLead: "My starting point package, for those who need a serious brand before a custom project.",
    pkgDesc: "Fixed scope, timeline and price: lean strategy, an essential visual identity and a mini guide so the brand can start walking. It covers steps 01 to 05 of the process, plus the complete delivery of step 09.",
    facts: [
      ["Timeline", "3 to 4 weeks"],
      ["Steps", "01 to 05, plus 09"],
      ["Price", "Fixed, estimated on the quote page and final in the proposal"],
    ],
    includesTitle: "What's included",
    includes: [
      "Lean brand strategy",
      "Essential visual identity",
      "Mini usage guide",
      "Organized final files and usage training",
    ],
    pkgStepsTitle: "Steps in the package",
    inPkg: "included in the package",
    outPkg: "not in the package",
    pkgNote: "When the business grows and asks for the full path, everything done here carries over. Nothing gets thrown away.",
    pkgCalc: "See the estimate now",
    pkgCall: "Book 30 minutes",
    needLabel: "Your part",
    needTitle: "What I need from you.",
    needDesc: "The process keeps the agreed pace when each side does its part. Mine is in the ten steps. Yours fits in five lines.",
    needs: [
      ["An honest conversation", "Thirty minutes in the Listening step, telling me what hurts, what has been tried and where you want to go."],
      ["Access to what exists", "Current brand, website, sales materials and any numbers you can share. That's what I work with in the Immersion step."],
      ["The decision maker, close by", "One person who approves each step. A decision without an owner is the shortest path to rework."],
      ["Real content", "Real copy, photos and products, so the Proof step happens with what will actually exist, not placeholder text."],
      ["Feedback on time", "Each round's changes gathered into one reply, within the agreed time. That way my timeline holds too."],
    ],
  },
};

const muted = "text-ink-700 dark:text-ink-200";
const stepPill = "shrink-0 rounded-pill border border-ink-200 px-3 py-1 text-lg font-semibold leading-[22px] tabular-nums text-fg-strong dark:border-ink-700";

function StepRow({ s, labels }: { s: Step; labels: { get: string; you: string } }) {
  return (
    <Reveal as="li" className="py-8 first:pt-0 lg:grid lg:grid-cols-[88px_1fr] lg:gap-8 lg:py-10">
      <span className={cn(stepPill, "hidden w-fit self-start lg:block")}>{s.n}</span>
      <div>
        <div className="flex items-center gap-3">
          <span className={cn(stepPill, "lg:hidden")}>{s.n}</span>
          <h4 className="t-h3 text-fg-strong">{s.name}</h4>
        </div>
        <p className={cn("t-small mt-3 max-w-[640px]", muted)}>{s.desc}</p>
        <dl className="mt-6 grid gap-5 sm:grid-cols-2 sm:gap-8">
          <div>
            <dt className={cn("t-label", muted)}>{labels.get}</dt>
            <dd className="t-small mt-1.5 text-fg-strong">{s.get}</dd>
          </div>
          <div>
            <dt className={cn("t-label", muted)}>{labels.you}</dt>
            <dd className="t-small mt-1.5 text-fg-strong">{s.you}</dd>
          </div>
        </dl>
      </div>
    </Reveal>
  );
}

/** Etapa 03, a assinatura: cartão escuro com a aba vermelha da Home. */
function SignatureStep({ s, labels }: { s: Step; labels: { get: string; you: string; signature: string; quote: string } }) {
  return (
    <Reveal as="li" className="pb-8 first:pt-0 lg:pb-10">
      <div className="relative pt-3">
        <svg aria-hidden viewBox="0 0 300 22" className="absolute right-4 top-0 h-[18px] w-[180px] text-brand lg:right-5 lg:h-[22px] lg:w-[300px]" preserveAspectRatio="none" fill="currentColor">
          <path d="M0 22 16 0h284v22Z" />
        </svg>
        <div className="relative rounded-2xl border border-ink-700 bg-ink-900 p-6 text-ink-50 lg:p-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-pill bg-brand px-3 py-1 text-lg font-semibold leading-[22px] tabular-nums text-ink-50">{s.n}</span>
            <span className="inline-flex items-center rounded-pill border border-brand px-3 py-1.5 text-sm font-medium text-ink-50">{labels.signature}</span>
          </div>
          <h4 className="t-h1 mt-5 text-brand">{s.name}</h4>
          <p className="t-body mt-4 max-w-[680px] text-ink-50">{s.desc}</p>
          <p className="t-small mt-6 max-w-[680px] border-l-2 border-brand pl-4 text-ink-200">{labels.quote}</p>
          <dl className="mt-8 grid gap-5 border-t border-ink-700 pt-6 sm:grid-cols-2 sm:gap-8">
            <div>
              <dt className="t-label text-ink-200">{labels.get}</dt>
              <dd className="t-small mt-1.5 text-ink-50">{s.get}</dd>
            </div>
            <div>
              <dt className="t-label text-ink-200">{labels.you}</dt>
              <dd className="t-small mt-1.5 text-ink-50">{s.you}</dd>
            </div>
          </dl>
        </div>
      </div>
    </Reveal>
  );
}

export function MetodoPage() {
  const { locale } = useLocale();
  const c = COPY[locale];
  const steps = STEPS[locale];

  return (
    <>
      {/* ===== Cabeçalho ===== */}
      <section aria-labelledby="metodo-titulo" className="bg-bg">
        <div className="rb-container pb-16 pt-[140px] lg:pb-[120px] lg:pt-[200px]">
          <LineReveal><Label className={muted}>{c.label}</Label></LineReveal>
          <Reveal as="h1" id="metodo-titulo" delay={0.08} className="t-hero mt-4 max-w-[1120px] text-balance text-fg-strong lg:mt-6">
            {c.titleA}
            <span className="t-serif t-hero-serif">{c.titleB}</span>.
          </Reveal>
          <Reveal as="p" delay={0.18} className={cn("t-lead mt-6 max-w-[760px] lg:mt-10", muted)}>{c.lead}</Reveal>

          <Reveal as="p" y={16} className={cn("t-label mt-12 lg:mt-20", muted)}>{c.movesLabel}</Reveal>
          <RevealGroup as="ol" stagger={0.08} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {MOVES.map((m) => {
              const t = m[locale];
              return (
                <Reveal as="li" key={m.n} y={24}>
                  <a
                    href={`#movimento-${m.n}`}
                    className="group grid h-full grid-cols-[auto_1fr_auto] items-center gap-4 rounded-2xl border border-ink-100 p-4 transition-colors hover:border-fg-strong dark:border-ink-700 dark:hover:border-ink-50 sm:flex sm:flex-col sm:items-stretch sm:gap-8 sm:p-5 lg:gap-12 lg:p-6"
                  >
                    <span className="flex items-center justify-between">
                      <span className="rounded-pill bg-brand px-3 py-1 text-lg font-semibold leading-[22px] tabular-nums text-ink-50">{m.n}</span>
                      <Icon d={ICONS.arrowDown} size={20} className={cn(arrowCls, "hidden sm:block")} />
                    </span>
                    <span>
                      <span className="t-lead block text-fg-strong">{t.t}</span>
                      <span className={cn("t-small mt-1 block sm:mt-1.5", muted)}>{t.c}</span>
                    </span>
                    <Icon d={ICONS.arrowDown} size={20} className={cn(arrowCls, "sm:hidden")} />
                  </a>
                </Reveal>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* ===== Como funciona (Home) ===== */}
      <Process id="movimentos" />

      {/* ===== As dez etapas ===== */}
      <section aria-labelledby="etapas" className="bg-bg">
        <div className="rb-container py-16 lg:py-40">
          <div className="grid gap-6 lg:grid-cols-[1fr_620px] lg:items-end lg:gap-16">
            <Reveal>
              <Label className={muted}>{c.stepsLabel}</Label>
              <h2 id="etapas" className="t-h1 mt-3 text-fg-strong">{c.stepsTitle}</h2>
            </Reveal>
            <Reveal as="p" delay={0.12} className={cn("t-small", muted)}>{c.stepsDesc}</Reveal>
          </div>

          <div className="mt-12 lg:mt-20">
            {GROUPS.map((idx, g) => {
              const m = MOVES[g];
              const t = m[locale];
              return (
                <div
                  key={m.n}
                  id={`movimento-${m.n}`}
                  className="grid scroll-mt-28 gap-8 border-t border-fg-strong py-10 lg:grid-cols-[400px_1fr] lg:gap-16 lg:py-16"
                >
                  <div className="lg:sticky lg:top-32 lg:self-start">
                    <Reveal>
                      <Label className={muted}>{c.movement} {m.n}</Label>
                      <h3 className="t-h2 mt-3 text-fg-strong">{t.t}</h3>
                      <span className={cn("mt-4 inline-flex items-center gap-2 rounded-pill border border-ink-200 px-3 py-1.5 text-sm font-medium dark:border-ink-700", muted)}>
                        <Icon d={ICONS.clock} size={14} className="rb-clock" /> {t.c}
                      </span>
                    </Reveal>
                  </div>
                  <ol className="divide-y divide-ink-100 dark:divide-ink-700">
                    {idx.map((i) => {
                      const s = steps[i];
                      return s.n === SIGNATURE ? (
                        <SignatureStep key={s.n} s={s} labels={c} />
                      ) : (
                        <StepRow key={s.n} s={s} labels={c} />
                      );
                    })}
                  </ol>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Ponto de Partida ===== */}
      <section aria-labelledby="ponto-de-partida" className="bg-ink-900 text-ink-50">
        <div className="rb-container grid gap-12 py-16 lg:grid-cols-[1fr_500px] lg:gap-16 lg:py-40">
          <div className="flex flex-col">
            <Reveal as="span" y={12} className="inline-flex w-fit items-center rounded-pill border border-ink-700 px-3 py-1.5 text-sm font-medium text-ink-200">
              {c.pkgChip}
            </Reveal>
            <LineReveal as="h2" id="ponto-de-partida" delay={0.08} className="t-hero mt-5 text-brand">{c.pkgTitle}</LineReveal>
            <Reveal as="p" delay={0.16} className="t-lead mt-6 max-w-[640px] text-ink-50">{c.pkgLead}</Reveal>
            <Reveal as="p" delay={0.22} className="t-small mt-4 max-w-[640px] text-ink-200">{c.pkgDesc}</Reveal>

            <RevealGroup as="dl" stagger={0.08} className="mt-10 grid border-t border-ink-700 sm:grid-cols-3">
              {c.facts.map(([k, v]) => (
                <Reveal key={k} y={16} className="border-b border-ink-700 py-5 sm:border-b-0 sm:pr-6">
                  <dt className="t-label text-ink-200">{k}</dt>
                  <dd className="t-small mt-1.5 text-ink-50">{v}</dd>
                </Reveal>
              ))}
            </RevealGroup>

            <Reveal className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 lg:mt-auto lg:pt-12">
              <BrandButton href="/orcamento" variant="principal" className="w-full justify-between sm:w-auto">{c.pkgCalc}</BrandButton>
              <BrandButton href="/agendar" variant="contorno" className="w-full justify-between sm:w-auto">{c.pkgCall}</BrandButton>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="rounded-2xl border border-ink-700 p-5 lg:p-8">
            <h3 className="t-label text-ink-200">{c.includesTitle}</h3>
            <ul className="mt-4">
              {c.includes.map((item) => (
                <li key={item} className="t-small flex items-start gap-3 border-b border-ink-700 py-3.5 text-ink-50 last:border-b-0">
                  <Icon d={CHECK} size={20} className="mt-0.5 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>

            <h3 className="t-label mt-8 text-ink-200">{c.pkgStepsTitle}</h3>
            <RevealGroup as="ol" stagger={0.045} className="mt-4 grid grid-cols-2 gap-2">
              {steps.map((s) => {
                const inPkg = PACKAGE_STEPS.includes(s.n);
                return (
                  <Reveal
                    as="li"
                    key={s.n}
                    y={12}
                    className={cn(
                      "flex items-center gap-2 rounded-lg border px-2.5 py-2 text-base font-medium sm:px-3",
                      inPkg ? "border-brand bg-brand text-ink-50" : "border-ink-700 text-ink-400"
                    )}
                  >
                    <span className="tabular-nums">{s.n}</span>
                    <span className="min-w-0 break-words">{s.name}</span>
                    <span className="sr-only">, {inPkg ? c.inPkg : c.outPkg}</span>
                  </Reveal>
                );
              })}
            </RevealGroup>
            <p className="t-small mt-6 text-ink-200">{c.pkgNote}</p>
          </Reveal>
        </div>
      </section>

      {/* ===== O que eu preciso de você ===== */}
      <section aria-labelledby="sua-parte" className="bg-bg">
        <div className="rb-container grid gap-10 py-16 lg:grid-cols-[500px_1fr] lg:gap-[60px] lg:py-40">
          <Reveal>
            <Label className={muted}>{c.needLabel}</Label>
            <h2 id="sua-parte" className="t-h1 mt-3 text-fg-strong">{c.needTitle}</h2>
            <p className={cn("t-small mt-4 max-w-[440px] lg:mt-8", muted)}>{c.needDesc}</p>
          </Reveal>
          <RevealGroup as="ol" stagger={0.08} className="border-t border-ink-100 dark:border-ink-700">
            {c.needs.map(([title, text], i) => (
              <Reveal as="li" key={title} y={20} className="grid grid-cols-[40px_1fr] gap-4 border-b border-ink-100 py-6 dark:border-ink-700 lg:grid-cols-[56px_1fr] lg:py-8">
                <span aria-hidden className="t-lead tabular-nums text-brand">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="t-lead text-fg-strong">{title}</h3>
                  <p className={cn("t-small mt-2 max-w-[620px]", muted)}>{text}</p>
                </div>
              </Reveal>
            ))}
          </RevealGroup>
        </div>
      </section>

      <FinalCTA />
    </>
  );
}
