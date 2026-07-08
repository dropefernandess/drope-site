/**
 * Briefing — Marca de Biscoitos (projeto da mãe do Pedro).
 *
 * Contexto: ela está começando do ZERO. Faz biscoitos hoje como hobby e
 * quer transformar em renda extra. Não há receita de família nem grande
 * diferencial pronto — as perguntas partem desse princípio e oferecem
 * "ainda não sei / quero descobrir" como resposta válida.
 *
 * Fonte canônica das perguntas em 5 blocos, compartilhada entre:
 *  - app/briefing/BriefingClient.tsx (render do formulário)
 *  - app/actions/enviar-briefing.ts  (montagem do e-mail no server —
 *    o client manda só as respostas por id; as perguntas nunca viajam do
 *    browser, então ninguém injeta pergunta falsa no e-mail)
 *
 * Tipos de campo:
 *  - "text"   → resposta aberta (textarea)
 *  - "single" → escolha única (chips tipo rádio)
 *  - "multi"  → múltipla escolha (chips tipo checkbox)
 * Campos de escolha podem ter allowOther → chip "Outro" com campo livre.
 */

/** Valor sentinela do chip "Outro" — o texto real vem do mapa `otros`. */
export const OUTRO = "__outro__";

export type BriefingField =
  | { id: string; type: "text"; label: string; placeholder?: string }
  | { id: string; type: "single"; label: string; options: string[]; allowOther?: boolean }
  | { id: string; type: "multi"; label: string; options: string[]; allowOther?: boolean };

export type BriefingBlock = {
  n: string;
  t: string;
  note: string;
  qs: BriefingField[];
};

export const BRIEFING_BLOCKS: BriefingBlock[] = [
  {
    n: "Bloco 1",
    t: "Você e a sua história",
    note: "A marca nasce de quem você é. Não precisa de uma grande história — o que é real já basta.",
    qs: [
      {
        id: "q1",
        type: "multi",
        label: "Como os biscoitos entraram na sua vida? (pode marcar mais de um)",
        options: [
          "Sempre gostei de cozinhar e assar",
          "Comecei testando receitas por curiosidade",
          "Aprendi vendo vídeos e receitas na internet",
          "Fiz um curso ou uma oficina",
          "Alguém me incentivou a fazer",
        ],
        allowOther: true,
      },
      {
        id: "q2",
        type: "text",
        label: "O que fazer biscoitos desperta em você? Conta um pouquinho do que você sente quando está na cozinha.",
      },
      {
        id: "q3",
        type: "single",
        label: "Hoje, os biscoitos são pra você…",
        options: [
          "Um hobby que quero transformar em renda extra",
          "Uma renda extra que já começo a tentar",
          "Um sonho de ter o meu próprio negócio um dia",
          "Ainda estou descobrindo o que quero",
        ],
      },
      {
        id: "q4",
        type: "text",
        label: "Como você quer se sentir vendo a marca pronta — com nome, embalagem, tudo com a sua cara? O que seria um sonho realizado aqui?",
      },
    ],
  },
  {
    n: "Bloco 2",
    t: "O produto",
    note: "Vamos entender o que você faz hoje — e o que você gostaria de fazer.",
    qs: [
      {
        id: "q5",
        type: "multi",
        label: "Que tipos de biscoito você faz ou gostaria de fazer? (marque à vontade)",
        options: [
          "Amanteigado",
          "Com recheio (goiabada, doce de leite…)",
          "Cobertos ou decorados",
          "Com chocolate",
          "Sequilhos",
          "Salgadinhos amanteigados",
          "Ainda estou testando sabores",
        ],
        allowOther: true,
      },
      {
        id: "q6",
        type: "text",
        label: "Tem algum que já é o queridinho — que as pessoas elogiam ou que você mais gosta de fazer? (se ainda não tem, tudo bem, é só dizer!)",
      },
      {
        id: "q7",
        type: "multi",
        label: "O que você gostaria que fosse o 'charme' dos seus biscoitos?",
        options: [
          "Manteiga de verdade",
          "Feito com capricho, artesanal",
          "Sem conservantes",
          "Aparência bonita e delicada",
          "Um sabor que lembra aconchego",
          "Ainda não sei — quero descobrir isso com você",
        ],
        allowOther: true,
      },
      {
        id: "q8",
        type: "multi",
        label: "Como você imagina vender? (marque as que gosta)",
        options: [
          "Caixinha",
          "Saquinho",
          "Potinho",
          "Kit presente",
          "Buquê de biscoito",
          "Por peso",
        ],
        allowOther: true,
      },
      {
        id: "q9",
        type: "multi",
        label: "Você pensa em vender…",
        options: [
          "Por encomenda",
          "Pronta-entrega",
          "Em datas especiais (Natal, Páscoa, Dia das Mães)",
          "Ainda não decidi",
        ],
        allowOther: true,
      },
    ],
  },
  {
    n: "Bloco 3",
    t: "O cliente",
    note: "Pra quem estamos falando? Isso ajuda a definir o tom de tudo.",
    qs: [
      {
        id: "q10",
        type: "multi",
        label: "Quem você imagina comprando os seus biscoitos?",
        options: [
          "Vizinhos e conhecidos",
          "Amigos e família",
          "Gente comprando pra presentear",
          "Empresas (brindes e presentes)",
          "Cafeterias e lojinhas",
          "Pessoas de outras cidades",
        ],
        allowOther: true,
      },
      {
        id: "q11",
        type: "multi",
        label: "Em que momento a pessoa comeria seus biscoitos?",
        options: [
          "No café da tarde",
          "Como presente pra alguém",
          "Um mimo só pra si",
          "Acompanhando um café ou chá",
          "Em festas e comemorações",
        ],
        allowOther: true,
      },
      {
        id: "q12",
        type: "single",
        label: "Por onde você quer começar a vender?",
        options: [
          "Só na minha cidade ou região",
          "Minha cidade agora, outras depois",
          "Já quero conseguir enviar pra outros lugares",
          "Ainda não pensei nisso",
        ],
      },
    ],
  },
  {
    n: "Bloco 4",
    t: "A personalidade da marca",
    note: "Aqui a gente descobre a 'alma' visual e o jeito de falar. Vá no impulso — pode marcar quantos quiser.",
    qs: [
      {
        id: "q13",
        type: "multi",
        label: "Se a sua marca fosse uma pessoa, como ela seria?",
        options: [
          "Calma e acolhedora",
          "Delicada e elegante",
          "Divertida e alegre",
          "Sofisticada e refinada",
          "Simples e do interior",
          "Carinhosa e afetiva",
          "Moderna e clean",
          "Nostálgica e aconchegante",
        ],
        allowOther: true,
      },
      {
        id: "q14",
        type: "multi",
        label: "Que sensação você quer que a embalagem passe?",
        options: [
          "Aconchego",
          "Carinho",
          "Capricho",
          "Nostalgia",
          "Sofisticação",
          "'Feito em casa com amor'",
          "Frescor e leveza",
        ],
        allowOther: true,
      },
      {
        id: "q15",
        type: "multi",
        label: "Que cores combinam com o que você imagina pra marca?",
        options: [
          "Tons de creme e manteiga",
          "Rosé / rosa empoeirado",
          "Verde-sálvia",
          "Terracota / telha",
          "Dourado",
          "Marrom quente",
          "Off-white e neutros",
        ],
        allowOther: true,
      },
      {
        id: "q16",
        type: "text",
        label: "Tem alguma cor que você NÃO gosta de jeito nenhum? (se não tiver, é só deixar em branco)",
      },
      {
        id: "q17",
        type: "text",
        label: "Você tem alguma marca (de doce ou não) que acha linda? Pode ser um perfil do Instagram, uma embalagem que viu… (se lembrar, manda o @ ou o nome)",
      },
      {
        id: "q18",
        type: "single",
        label: "Você quer que o seu nome ou apelido apareça na marca?",
        options: [
          "Sim, gosto da ideia",
          "Não, prefiro um nome inventado (de fantasia)",
          "Tanto faz, confio na sugestão do Pedro",
        ],
      },
      {
        id: "q19",
        type: "text",
        label: "Já passou alguma ideia de nome pela sua cabeça, mesmo que boba? Uma palavra, um apelido, algo que te representa?",
      },
    ],
  },
  {
    n: "Bloco 5",
    t: "Prático e futuro",
    note: "Pra alinharmos expectativas e planejar os próximos passos, sem pressão.",
    qs: [
      {
        id: "q20",
        type: "single",
        label: "Quanto você consegue produzir por semana hoje, mais ou menos?",
        options: [
          "Só faço quando alguém pede",
          "Poucas encomendas (até ~10 por semana)",
          "Algumas por semana (~10 a 30)",
          "Já produzo bastante (mais de 30)",
        ],
      },
      {
        id: "q21",
        type: "single",
        label: "Você já vende hoje?",
        options: [
          "Ainda não, quero começar",
          "Vendo de vez em quando, pra conhecidos",
          "Sim, já divulgo no WhatsApp / Instagram",
        ],
      },
      {
        id: "q22",
        type: "text",
        label: "Qual é o seu sonho com esse negócio? Pensa em algo pequeno e gostoso, ou sonha em crescer bastante?",
      },
      {
        id: "q23",
        type: "text",
        label: "Tem algo mais que você queira contar, que eu não perguntei?",
      },
    ],
  },
];

/** Todos os campos achatados na ordem 1..N. */
export const BRIEFING_FIELDS: BriefingField[] = BRIEFING_BLOCKS.flatMap((b) => b.qs);

export const BRIEFING_TOTAL = BRIEFING_FIELDS.length;

// ─────────────────────────────────────────────────────────────────────
// Helpers compartilhados (client + server) — fonte única de formatação
// ─────────────────────────────────────────────────────────────────────

export type AnswerValue = string | string[] | undefined;

/**
 * Formata a resposta de um campo em texto legível. `other` é o texto do
 * chip "Outro" (quando aplicável). Retorna "" se vazio.
 */
export function formatAnswer(
  field: BriefingField,
  value: AnswerValue,
  other?: string
): string {
  const otherText = (other ?? "").trim();

  if (field.type === "text") {
    return typeof value === "string" ? value.trim() : "";
  }

  if (field.type === "single") {
    const v = typeof value === "string" ? value : "";
    if (!v) return "";
    return v === OUTRO ? otherText : v;
  }

  // multi
  const arr = Array.isArray(value) ? value : [];
  return arr
    .map((x) => (x === OUTRO ? otherText : x))
    .filter(Boolean)
    .join(", ");
}

/** Um campo conta como respondido se produz texto não-vazio. */
export function isFilled(
  field: BriefingField,
  value: AnswerValue,
  other?: string
): boolean {
  return formatAnswer(field, value, other).length > 0;
}
