/**
 * Posts do blog — conteúdo real escrito por Drope.
 * Estrutura simples (sem MDX por enquanto): cada post tem corpo em
 * parágrafos, com markdown leve (negrito via __, hr via ---).
 *
 * Quando o volume crescer (>5 posts), migrar pra MDX em /content/posts/*.mdx.
 */

export type Post = {
  slug: string;
  titulo: string;
  subtitulo: string;
  excerpt: string;
  categoria: string;
  data: string;        // ISO date
  leitura: string;     // ex: "6 min"
  // Corpo em blocos (parágrafos, headings, quotes, hr)
  blocos: Bloco[];
};

export type Bloco =
  | { tipo: "p"; texto: string }
  | { tipo: "h2"; texto: string }
  | { tipo: "h3"; texto: string }
  | { tipo: "quote"; texto: string; autor?: string }
  | { tipo: "hr" }
  | { tipo: "ul"; itens: string[] };

export const posts: Post[] = [
  // ====================================================================
  // 01. Design como linguagem
  // ====================================================================
  {
    slug: "design-como-linguagem",
    titulo: "Design como linguagem (não como decoração)",
    subtitulo:
      "Por que tratar identidade visual como vocabulário muda completamente a forma como marcas são percebidas — e por que isso é mais difícil que parece.",
    excerpt:
      "Marca não é arte aplicada. É um sistema de comunicação que ensina o público a entender você antes mesmo de ler o que você escreve.",
    categoria: "Ensaio",
    data: "2026-04-22",
    leitura: "6 min",
    blocos: [
      {
        tipo: "p",
        texto:
          "Toda vez que alguém me pede pra fazer uma marca, a primeira pergunta nunca é sobre cores. É sobre o que essa marca precisa __dizer__ antes de qualquer palavra. Tipografia, paleta, espaçamento, ritmo — tudo isso é vocabulário. E como qualquer vocabulário, ou ele tem uma gramática consistente, ou vira ruído.",
      },
      {
        tipo: "p",
        texto:
          "Decoração é diferente de linguagem. Decoração serve pra atrair o olhar. Linguagem serve pra construir entendimento ao longo do tempo. A maioria das marcas que falha em ser memorável investe muito no primeiro e quase nada no segundo.",
      },
      { tipo: "h2", texto: "O que muda quando você trata design como linguagem" },
      {
        tipo: "p",
        texto:
          "Quando uma identidade visual é construída como linguagem, cada decisão tem um motivo replicável. A escolha de uma serifa específica não é só estética — é porque essa serifa carrega associações culturais que reforçam o posicionamento. A paleta não é só agradável — ela tem uma temperatura emocional que conversa com o setor.",
      },
      {
        tipo: "p",
        texto:
          "O resultado prático é que o time interno consegue criar materiais novos sem precisar do designer toda hora. Porque a marca tem uma __gramática__: regras claras de como combinar os elementos.",
      },
      { tipo: "h2", texto: "Por que isso é mais difícil que parece" },
      {
        tipo: "p",
        texto:
          "Construir linguagem leva mais tempo que escolher cor bonita. Exige conversa profunda com quem está dentro da marca, estudo do mercado, e testes de aplicação em contextos reais antes de cravar o sistema.",
      },
      {
        tipo: "p",
        texto:
          "A pressão de mercado puxa pra entrega rápida. Cliente quer ver logo na próxima semana. Mas marca rasa, feita em 5 dias, tende a virar decoração que envelhece em 6 meses. Marca trabalhada como linguagem dura 10 anos com pequenas evoluções.",
      },
      {
        tipo: "quote",
        texto:
          "No fim, o design que transforma não é aquele que grita. É o que fala na hora certa, da forma certa, com a intensidade exata.",
      },
      { tipo: "h2", texto: "Como reconhecer cada um na prática" },
      {
        tipo: "p",
        texto:
          "Olha pra qualquer marca que você admira há mais de 5 anos. Pega 10 peças aleatórias dela (anúncio, embalagem, site, post de Instagram, manual técnico, papelaria). Você consegue identificar que são todas da mesma marca sem ver o logo?",
      },
      {
        tipo: "p",
        texto:
          "Se consegue, é linguagem. Tem um vocabulário consistente operando por trás. Se você precisa do logo pra reconhecer, é decoração — bonita, talvez, mas frágil.",
      },
      {
        tipo: "p",
        texto:
          "Esse é o teste que aplico em todo projeto: a marca sobrevive sem o logo? Se sobrevive, está construída como linguagem. Se não, ainda é decoração esperando pra virar marca.",
      },
    ],
  },

  // ====================================================================
  // 02. Profundidade em vez de pressa
  // ====================================================================
  {
    slug: "profundidade-no-processo",
    titulo: "Profundidade no processo: o que isso significa na prática",
    subtitulo:
      "Como dar conta de projetos grandes sem perder a qualidade do detalhe — incluindo a parte mais importante: saber dizer não no momento certo.",
    excerpt:
      "Profundidade não é fazer mais. É fazer com o tempo certo, com a atenção certa, no momento que o projeto pede. E isso quase sempre passa por recusar o que não cabe.",
    categoria: "Processo",
    data: "2026-03-15",
    leitura: "8 min",
    blocos: [
      {
        tipo: "p",
        texto:
          "Quando comecei a trabalhar com design, achava que profissionalismo era dar conta de tudo que aparecia. Aceitar todo briefing, encaixar todo prazo, encontrar uma forma de entregar. Hoje vejo como aquilo me consumia sem deixar espaço pro que importa: tempo de pensar, testar, refazer.",
      },
      {
        tipo: "p",
        texto:
          "Profundidade não nasce de quantidade. Nasce de espaço. E pra ter espaço, a primeira ferramenta é saber recusar.",
      },
      { tipo: "h2", texto: "O que significa profundidade no projeto" },
      {
        tipo: "p",
        texto:
          "Profundidade é a diferença entre __aceitar__ o briefing como está escrito e __interrogar__ o briefing até entender o que realmente importa. É a diferença entre entregar a primeira ideia que funciona e a terceira ideia que funciona melhor.",
      },
      {
        tipo: "p",
        texto:
          "Na prática, isso aparece em coisas pequenas. Uma reunião extra de discovery quando o cliente tá com pressa. Uma rodada de teste antes de mandar o arquivo final. Um espaço de 2 dias sem mexer no projeto pra olhar com olho fresco depois.",
      },
      { tipo: "h3", texto: "Os 4 momentos que profundidade aparece" },
      {
        tipo: "ul",
        itens: [
          "__Discovery__: quando se faz a pergunta certa, não só a planejada.",
          "__Direção__: quando se defende a aposta criativa, mesmo quando é mais fácil entregar o seguro.",
          "__Iteração__: quando se refaz uma área inteira porque algo ainda está engasgando, mesmo que o cliente tenha aprovado.",
          "__Polish__: quando o projeto já está 90% certo, e os últimos 10% vão exigir 30% do tempo total.",
        ],
      },
      { tipo: "h2", texto: "Por que isso quase sempre passa por dizer não" },
      {
        tipo: "p",
        texto:
          "Profundidade não cabe num cronograma cheio. Pra entregar com profundidade um projeto, preciso recusar outros dois no mesmo período. Isso é matemático e sem romantismo.",
      },
      {
        tipo: "p",
        texto:
          "No início, recusar projeto soa contraintuitivo. Especialmente quando se está formando carteira. Mas a verdade é que cada projeto raso que você aceita rouba o tempo que faria diferença num projeto profundo. E o efeito de longo prazo é catastrófico: você fica conhecido como bom executor, não como bom designer.",
      },
      {
        tipo: "quote",
        texto:
          "O briefing perfeito não existe. O briefing que vale a pena, sim — e quase sempre ele aparece junto com permissão pra interrogar tudo.",
      },
      { tipo: "h2", texto: "Como eu decido o que aceitar" },
      {
        tipo: "p",
        texto:
          "Tenho três critérios. Não são científicos, mas funcionam pra mim:",
      },
      {
        tipo: "ul",
        itens: [
          "O cliente entende que design é estratégia, não enfeite? Se não entende, não importa o preço — vai ser briga toda semana.",
          "O escopo dá pra fazer com a qualidade que eu quero entregar? Se o prazo aperta demais, é melhor recusar do que entregar morno.",
          "O projeto vai me ensinar algo? Se for repetir o que já sei fazer dormindo, prefiro abrir espaço pra outro mais difícil.",
        ],
      },
      { tipo: "h2", texto: "O preço de manter profundidade" },
      {
        tipo: "p",
        texto:
          "Manter profundidade custa dinheiro. Você recusa receita imediata pra não comprometer a qualidade do que aceita. Custa também ansiedade — sempre tem aquela vozinha falando \"e se for o último briefing bom?\".",
      },
      {
        tipo: "p",
        texto:
          "Mas o trade é claro: profundidade gera reputação. Reputação gera próximos briefings. Profundidade vira o teu serviço, não tua estética. E aí o preço sobe sozinho.",
      },
      {
        tipo: "p",
        texto:
          "Profundidade é o que separa um designer que faz coisa boa de um designer que faz coisa que dura. E essa diferença, com o tempo, é tudo.",
      },
    ],
  },

  // ====================================================================
  // 03. Design tokens como código vivo
  // ====================================================================
  {
    slug: "tokens-vivos",
    titulo: "Design tokens não são planilha. São código vivo.",
    subtitulo:
      "Lições reais de mover paletas, tipografia e spacing de uma fonte única pro Tailwind, Figma e Storybook — e por que dá errado tantas vezes.",
    excerpt:
      "Um design system é tão bom quanto a infraestrutura que carrega os tokens. Mal montada, vira tabelão. Bem montada, vira sistema operacional.",
    categoria: "Técnica",
    data: "2026-02-08",
    leitura: "11 min",
    blocos: [
      {
        tipo: "p",
        texto:
          "Toda equipe que monta um design system passa por uma decisão silenciosa: como os __tokens__ (cores, espaçamentos, raios, tipografia, sombras) vão viver no projeto. A escolha parece técnica mas tem consequências enormes pra manutenção, escalabilidade e confiança no sistema.",
      },
      {
        tipo: "p",
        texto:
          "Vejo duas falhas comuns: tratar tokens como tabela estática (e replicar manualmente em Figma + código) ou tratar tokens como código sem ponte com design (e o Figma fica defasado da realidade).",
      },
      { tipo: "h2", texto: "O que tokens deveriam ser" },
      {
        tipo: "p",
        texto:
          "Tokens são variáveis nomeadas que representam decisões de design. Não confunda com __valores brutos__ (#DE2828). Token é __semântica__: `brand-primary`, `surface-default`, `text-strong`. O valor pode mudar entre temas, modos, marcas — o nome é estável.",
      },
      {
        tipo: "p",
        texto:
          "Isso muda a forma de pensar. Em vez de \"vou usar #DE2828\", o time pensa em \"vou usar a cor da marca\". Quando alguém precisa rebrandizar, troca o valor uma vez e tudo se atualiza. Esse é o ponto de tokens.",
      },
      { tipo: "h2", texto: "Por que vira planilha" },
      {
        tipo: "p",
        texto:
          "A armadilha mais comum: alguém cria um Notion com a paleta, espaçamentos, fontes — e usa esse Notion como referência. Quando muda uma cor, alguém precisa atualizar manualmente em 3 lugares: Notion, Figma, código. Em 6 meses, os 3 não batem.",
      },
      {
        tipo: "p",
        texto:
          "Quando o sistema cresce, esse desalinhamento vira problema sério. Designer mostra mockup com cor que não existe em produção. Dev usa cor que não tá no Figma. Cliente vê resultado diferente do approvado.",
      },
      { tipo: "h2", texto: "O modelo que uso" },
      {
        tipo: "p",
        texto:
          "Em projeto Next + Tailwind, sigo este fluxo:",
      },
      {
        tipo: "ul",
        itens: [
          "Tokens semânticos como __CSS variables__ em `globals.css`: `--bg`, `--fg-strong`, `--brand`, etc.",
          "Tailwind config consome essas variáveis: `bg-bg`, `text-fg-strong`, `bg-brand`.",
          "Temas (light/dark) alternam só os valores das variáveis, sem refazer classes.",
          "Figma usa __Variables__ com os mesmos nomes semânticos.",
          "Quando muda algo, edito CSS variable + Figma Variable em paralelo. Nunca um sem o outro.",
        ],
      },
      {
        tipo: "p",
        texto:
          "Esse esquema permite trocar tema/marca sem refatorar componentes. E garante que designer e dev falam a mesma língua: ambos pensam em __surface-2__, não em __cinza claro 6%__.",
      },
      { tipo: "h3", texto: "Exemplo prático que uso nesse site" },
      {
        tipo: "p",
        texto:
          "Esse próprio site tem light/dark mode. O segredo: nenhum componente sabe se está em light ou dark. Eles usam tokens semânticos. Quando o usuário troca o tema, eu mudo apenas o valor das CSS variables — todos os componentes se atualizam automaticamente porque consomem do mesmo lugar.",
      },
      {
        tipo: "quote",
        texto:
          "Design tokens bem montados são o que diferencia um sistema vivo de um sistema engessado. Se você precisa de 3 reuniões pra mudar uma cor, o sistema tá morrendo.",
      },
      { tipo: "h2", texto: "Os erros mais comuns" },
      {
        tipo: "ul",
        itens: [
          "__Nomear tokens por valor__: `gray-100`, `red-500`. Quando troca a marca, o nome perde sentido. Use semântica: `surface`, `brand`.",
          "__Não diferenciar __primitive__ de __semantic__ tokens__: tem `#DE2828` (primitivo) e `brand` (semântico que aponta pro primitivo). Isso permite que troca de tema não quebre nada.",
          "__Esquecer estados__: tokens de hover, focus, disabled. Sem isso, cada componente reinventa.",
          "__Não documentar quando usar cada um__: token sem regra vira escolha pessoal, e o sistema rachadura.",
        ],
      },
      { tipo: "h2", texto: "Quando tokens viram organismo" },
      {
        tipo: "p",
        texto:
          "Tokens bem montados deixam de ser arquivo estático e viram __infraestrutura__. Você adiciona uma cor nova, e ela já tá disponível em Tailwind, em Figma, em Storybook, e em qualquer time que use o sistema. Você muda um valor, e tudo segue.",
      },
      {
        tipo: "p",
        texto:
          "Esse é o ponto de virada onde design system para de ser projeto e começa a ser plataforma. E é nesse ponto que ele começa a economizar tempo de verdade — porque o sistema passa a __ajudar__ o time, em vez de exigir manutenção.",
      },
      {
        tipo: "p",
        texto:
          "Se você tá montando um design system agora, o melhor investimento de 8 horas que pode fazer é definir bem a arquitetura de tokens antes de criar o primeiro componente. Vai pagar de volta em todo projeto futuro.",
      },
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
