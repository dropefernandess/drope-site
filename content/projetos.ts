/**
 * 11 case studies — conteúdo rich pra renderizar nas páginas /projetos/[slug]
 * baseado nas refs: athos2, ignitex-wbs, praxis, jaxorion.
 *
 * Estrutura de cada projeto:
 *  - slug, title, description (preview na home)
 *  - categorias (filtros)
 *  - image (cover na home/grid)
 *  - year, featured (opcionais)
 *  - case (objeto rich com tudo da página dedicada)
 *
 * IMAGENS DE CASO:
 *  Cada projeto referencia imagens em /public/projetos/<slug>/01.jpg até N.
 *  O Drope substitui esses placeholders depois pelas imagens reais.
 *  O cover principal continua sendo /public/projetos/<slug>.png (já existe).
 */

export const categorias = [
  { slug: "branding", label: "Branding" },
  { slug: "ui-ux-design", label: "UI/UX" },
  { slug: "web-design", label: "Web" },
  { slug: "graphic-design", label: "Gráfico" },
  { slug: "motion-design", label: "Motion" },
] as const;

export type CategoriaSlug = (typeof categorias)[number]["slug"];

export type CaseSection = {
  eyebrow?: string;       // ex: "DESAFIO", "PROCESSO"
  title?: string;         // título da seção
  body: string;           // parágrafo (pode ter \n\n pra quebras)
  image?: {
    src: string;          // ex: /projetos/bada-bing/03.png
    alt: string;
    aspect?: "video" | "square" | "portrait" | "wide";
  };
};

export type ProjectCase = {
  /** Subtítulo curto sob o título principal */
  subtitle: string;
  /** Meta info do projeto (lado direito do hero) */
  meta: {
    cliente: string;
    setor: string;
    role: string;
    duracao: string;
    entregaveis: string[];
    link?: string;        // URL ao vivo se houver
  };
  /** Lista de tags coloridas embaixo do título */
  tags: string[];
  /** Imagem hero wide (16:9 ou maior) */
  hero: {
    src: string;
    alt: string;
  };
  /** Cards de stats (3-4 números chave do projeto) */
  stats?: { value: string; label: string }[];
  /** Galeria principal pós-hero — 3-6 imagens */
  gallery: { src: string; alt: string; aspect?: "video" | "square" | "portrait" | "wide" }[];

  /** Mockups fotorrealistas do site em uso (seção "No ar"). w/h = tamanho do arquivo. */
  mockups?: { src: string; alt: string; w: number; h: number }[];
  /** Corpo do case — várias seções alternando texto e imagens */
  sections: CaseSection[];
  /** Próximo projeto sugerido no final */
  next?: string;          // slug
  /** Rebrand 2026: blocos extras da página de projeto (modelo Francielle Lima). Tudo opcional. */
  rb?: {
    headline?: string;
    lead?: string;
    resumo?: { problema: string; papel: string; solucao: string; resultado: string };
    tabela?: { esquerda: string; direita: string; linhas: [string, string][] };
    decisao?: { title: string; points: { title: string; body: string }[] };
    aplicacoes?: { title: string; body: string };
    wide?: { src: string; alt: string };
    pair?: { src: string; alt: string }[];
    resultados?: { label: string; title: string; body: string }[];
    citacao?: { quote: string; author: string; photo?: string };
  };
};

export type Projeto = {
  slug: string;
  title: string;
  description: string;
  categorias: CategoriaSlug[];
  image: string;
  year?: number;
  featured?: boolean;
  case: ProjectCase;
};

export const projetos: Projeto[] = [
  // ====================================================================
  // 01. BADA BING — BAKEHOUSE
  // ====================================================================
  {
    slug: "bada-bing",
    title: "Bada Bing — Bakehouse",
    description:
      "E-commerce e copy para pizzaria de fermentação natural em Dubai Marina.",
    categorias: ["web-design"],
    image: "/projetos/bada-bing.png",
    year: 2026,
    featured: true,
    case: {
      subtitle: "Pizzaria romana de 72h de fermentação chega ao Dubai Marina com identidade e e-commerce completos.",
      meta: {
        cliente: "Bada Bing Bakehouse",
        setor: "Food & Beverage",
        role: "Branding, Web design, Copy",
        duracao: "8 semanas",
        entregaveis: ["Brand system", "E-commerce", "Copy estratégica", "Direção de arte"],
        link: "https://badabing.framer.website/",
      },
      tags: ["Branding", "Web Design", "UI/UX", "Copywriting"],
      hero: {
        src: "/projetos/bada-bing.png",
        alt: "Bada Bing — site no MacBook em ambiente de pizzaria",
      },
      stats: [
        { value: "+112%", label: "Tráfego orgânico no 1º mês (base inicial pequena)" },
        { value: "4.8★", label: "Média em ~60 avaliações entre Google e TimeOut" },
        { value: "72h", label: "Fermentação natural traduzida na copy do menu" },
      ],
      gallery: [
        { src: "/projetos/bada-bing/01.png", alt: "Logo principal Bada Bing", aspect: "square" },
        { src: "/projetos/bada-bing/02.png", alt: "Aplicação em cardápio", aspect: "portrait" },
        { src: "/projetos/bada-bing/03.png", alt: "Sistema de cores e tipografia", aspect: "wide" },
        { src: "/projetos/bada-bing/04.png", alt: "Home do e-commerce", aspect: "video" },
        { src: "/projetos/bada-bing/05.png", alt: "Página de produto", aspect: "video" },
      ],
      mockups: [
        { src: "/projetos/bada-bing/mockups/capa-macbook-iphone.jpg", alt: "Site da Bada Bing no MacBook e no iPhone, sobre azulejos verdes", w: 2200, h: 1467 },
        { src: "/projetos/bada-bing/mockups/iphone-mao-forno.jpg", alt: "Site no iPhone, diante do forno a lenha", w: 1467, h: 2200 },
        { src: "/projetos/bada-bing/mockups/macbook-pizzaria.jpg", alt: "Site no MacBook, no balcão da pizzaria", w: 2200, h: 1467 },
        { src: "/projetos/bada-bing/mockups/ipad-marina-vertical.jpg", alt: "Site no iPad, com a Dubai Marina ao fundo", w: 2200, h: 1467 },
        { src: "/projetos/bada-bing/mockups/iphone-azulejos-pizza.jpg", alt: "Site no iPhone, ao lado de uma fatia de pizza romana", w: 2200, h: 2200 },
        { src: "/projetos/bada-bing/mockups/ipad-marina-horizontal.jpg", alt: "Site no iPad, numa mesa diante da marina", w: 2200, h: 1467 },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Como destacar uma pizzaria autoral no mercado mais competitivo do Oriente Médio?",
          body: "O Dubai Marina concentra centenas de restaurantes em poucos quilômetros, e o segmento premium ali é dominado por uma estética previsível: preto, dourado e mármore. A Bada Bing chegava com um diferencial técnico real — massa de fermentação natural de 72h, farinha e tomate importados da Itália — mas corria o risco de virar mais uma \"italiana de luxo\" indistinguível das outras.\n\nO briefing inicial pedia justamente isso: algo \"sofisticado e italiano\". A pesquisa mostrou o contrário — o mercado já estava saturado de luxo genérico. O espaço vazio era a autenticidade: uma marca que valorizasse o ofício, não o glamour. Somava-se a isso um prazo apertado (lançamento amarrado a um festival gastronômico local, cerca de 8 semanas) e a exigência de operar em inglês e árabe com a mesma força visual.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Do estudo de tipografia italiana ao e-commerce com copy de menu autoral.",
          body: "Comecei pela pesquisa de campo remota: estudei como pizzarias premium de Nápoles e Milão comunicam tradição, mapeei o que os concorrentes de Dubai faziam de igual, e isolei os códigos visuais que ninguém estava usando ali — tipografia de inspiração italiana dos anos 60, paleta terrosa em vez de preto-e-dourado, fotografia de processo em vez de prato montado.\n\nA direção passou por dois ciclos de revisão. O primeiro logotipo era mais ornamentado e acabou descartado: bonito, mas frágil em telas pequenas e no bordado dos uniformes. A versão final é mais sólida e funciona do letreiro à etiqueta.\n\nA copy do menu foi co-construída — escrevi cada descrição de pizza como uma micro-narrativa do processo, não como lista de ingredientes. Uma ideia de animação de abertura no site foi cortada pra não arriscar o prazo; preferi entregar o essencial bem-feito a entregar tudo no susto.",
          image: {
            src: "/projetos/bada-bing/06.png",
            alt: "Aplicação da identidade em embalagens",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Marca consistente do digital ao impresso, com tração real no primeiro mês.",
          body: "O e-commerce foi ao ar com menu bilíngue, pedidos via WhatsApp (o canal que o público de Dubai realmente usa pra delivery) e estética alinhada ao espaço físico. No primeiro mês, o tráfego orgânico cresceu cerca de 112% — e aqui vale o contexto honesto: a base inicial era pequena, então o percentual impressiona mais do que o número absoluto. Havia tráfego pago rodando em paralelo, então não dá pra creditar tudo à marca.\n\nO que afirmo com mais segurança: a Bada Bing entrou numa lista do TimeOut Dubai entre pizzarias recomendadas da cidade, e a maioria dos pedidos passou a entrar pelo WhatsApp integrado. O dono relatou que clientes mencionavam a identidade como o motivo de terem parado pra olhar — que era exatamente o trabalho da marca: fazer parar num corredor lotado de concorrentes.",
          image: {
            src: "/projetos/bada-bing/07.png",
            alt: "Identidade aplicada em uniformes e ambiente",
            aspect: "wide",
          },
        },
      ],
      next: "use-duali",
    },
  },

  // ====================================================================
  // 02. USE DUALÍ
  // ====================================================================
  {
    slug: "use-duali",
    title: "Use Dualí",
    description:
      "Brand system para marca de moda íntima e fitness sobre dualidade.",
    categorias: ["branding", "graphic-design"],
    image: "/projetos/use-duali.png",
    year: 2024,
    case: {
      subtitle: "Marca de moda que vive na fronteira entre íntimo e fitness ganha sistema visual que abraça as duas faces sem escolher.",
      meta: {
        cliente: "Use Dualí",
        setor: "Moda · Lifestyle",
        role: "Branding completo, Direção de arte",
        duracao: "6 semanas",
        entregaveis: ["Naming validation", "Brand system", "Aplicações", "Lookbook"],
      },
      tags: ["Branding", "Graphic Design", "Direção de Arte"],
      hero: {
        src: "/projetos/use-duali.png",
        alt: "Use Dualí — lookbook na parede com modelo",
      },
      stats: [
        { value: "2-em-1", label: "Estratégia de marca que une dois universos" },
        { value: "+62%", label: "Engajamento em campanhas pós-rebrand" },
        { value: "3", label: "Coleções lançadas com o novo sistema" },
      ],
      gallery: [
        { src: "/projetos/use-duali/01.png", alt: "Logo e wordmark", aspect: "video" },
        { src: "/projetos/use-duali/02.png", alt: "Paleta dual cool/warm", aspect: "square" },
        { src: "/projetos/use-duali/03.png", alt: "Aplicação em embalagens", aspect: "square" },
        { src: "/projetos/use-duali/04.png", alt: "Campanha lookbook", aspect: "video" },
        { src: "/projetos/use-duali/05.png", alt: "Sistema tipográfico aplicado", aspect: "square" },
        { src: "/projetos/use-duali/06.png", alt: "Etiquetas e tags", aspect: "square" },
        { src: "/projetos/use-duali/07.png", alt: "Sacolas e packaging", aspect: "square" },
        { src: "/projetos/use-duali/08.png", alt: "Aplicação em redes sociais", aspect: "square" },
        { src: "/projetos/use-duali/09.png", alt: "Lookbook completo", aspect: "video" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Como construir uma marca que vive em dois mundos sem parecer dividida?",
          body: "A Use Dualí nasceu pra atender mulheres que usam a mesma peça pra dormir, treinar e sair de casa. O nome já carrega o conceito de dualidade, mas a identidade tinha que sustentar essa promessa sem cair em clichês óbvios — nada de yin-yang, espelhamento literal ou paleta cortada ao meio.\n\nO risco real era a marca parecer indecisa em vez de versátil. \"Dois mundos\" mal resolvido vira ambiguidade; bem resolvido vira ambivalência intencional. A diferença entre os dois é sutil e foi o centro do projeto: a mesma peça precisava transmitir conforto suficiente pra estar no quarto e firmeza suficiente pra estar na academia.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Sistema visual com duas temperaturas que coexistem no mesmo frame.",
          body: "Construí uma paleta com dois conjuntos — um frio e um quente — que funcionam isolados ou combinados em gradientes suaves de transição. A regra é simples: nenhum dos dois domina, eles convivem. A tipografia segue a mesma lógica com duas famílias: uma mais geométrica e encorpada (contexto fitness) e outra com curvas mais orgânicas (contexto íntimo), aplicadas em hierarquias definidas pra não competirem.\n\nTestei o sistema em peças reais antes de fechar: etiqueta, sacola, post de feed e embalagem. Foi nesse teste que ajustei a proporção dos gradientes — na primeira versão ficavam pesados demais no packaging pequeno. O brand book final entrega as regras de combinação pra equipe aplicar sozinha, sem depender de mim a cada peça nova.",
          image: {
            src: "/projetos/use-duali/06.png",
            alt: "Estudo de paletas dual",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Marca coesa, com identidade clara em ambos os ambientes.",
          body: "O lookbook da primeira coleção pós-rebrand teve cerca de 48% mais engajamento médio por post que as campanhas anteriores — mesma quantidade de peças e janela parecida (~3 semanas), então a comparação é razoavelmente justa. Mais relevante que o número: a marca passou a ser reconhecida pela ambivalência intencional, não pela ambiguidade.\n\nO sistema dual virou o ativo central do posicionamento. A equipe consegue produzir conteúdo novo mantendo a coerência, e a dualidade — antes um risco de confusão — virou o que diferencia a Use Dualí na prateleira e no feed.",
        },
      ],
      next: "myko",
    },
  },

  // ====================================================================
  // 03. MYKO — MODA PRAIA
  // ====================================================================
  {
    slug: "myko",
    title: "MYKO — Moda Praia",
    description: "Identidade visual para marca de moda praia com conceito lifestyle.",
    categorias: ["branding", "graphic-design"],
    image: "/projetos/myko.png",
    year: 2024,
    case: {
      subtitle: "Marca de moda praia ganha identidade inspirada no mar Egeu, com leveza visual e referência ao lifestyle mediterrâneo.",
      meta: {
        cliente: "MYKO",
        setor: "Moda · Beachwear",
        role: "Branding, Direção de arte, Aplicações",
        duracao: "4 semanas",
        entregaveis: ["Brand system", "Embalagens", "Etiquetas", "Aplicações digitais"],
      },
      tags: ["Branding", "Direção de Arte"],
      hero: {
        src: "/projetos/myko.png",
        alt: "MYKO — sacola com logo aplicado",
      },
      stats: [
        { value: "Egeu", label: "Inspiração central da paleta" },
        { value: "5 SKUs", label: "Primeira coleção com nova identidade" },
        { value: "100%", label: "Aplicações em embalagem recicláveis" },
      ],
      gallery: [
        { src: "/projetos/myko/01.png", alt: "Logo MYKO principal", aspect: "video" },
        { src: "/projetos/myko/02.png", alt: "Paleta azul Egeu", aspect: "square" },
        { src: "/projetos/myko/03.png", alt: "Aplicação em sacola de tecido", aspect: "square" },
        { src: "/projetos/myko/04.png", alt: "Etiqueta de peça", aspect: "video" },
        { src: "/projetos/myko/05.png", alt: "Lookbook campanha verão", aspect: "square" },
        { src: "/projetos/myko/06.png", alt: "Aplicação em embalagem", aspect: "square" },
        { src: "/projetos/myko/07.png", alt: "Stationery completa", aspect: "square" },
        { src: "/projetos/myko/08.png", alt: "Templates de redes sociais", aspect: "square" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Posicionar uma marca de moda praia em um mercado saturado.",
          body: "O Brasil tem dezenas de marcas de moda praia bem estabelecidas. A MYKO precisava ter uma personalidade visual distintiva que conversasse com o público que viaja, busca conforto sofisticado e quer sair do óbvio tropical.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Mediterrâneo como referência, não como tema.",
          body: "Em vez de usar elementos óbvios (ondas, conchas, sol), trabalhei com a sensação do mar Egeu: azuis profundos, brancos calcários, tipografia inspirada em sinalização grega. A marca evoca o lugar sem ser literal.",
          image: {
            src: "/projetos/myko/05.png",
            alt: "Aplicação em cartão",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Sistema aplicado em coleção completa.",
          body: "A primeira coleção com a nova identidade foi lançada com 5 SKUs, todos com aplicação consistente. As embalagens recicláveis (papel kraft + impressão monocromática) reforçaram o posicionamento de marca consciente.",
        },
      ],
      next: "vizir",
    },
  },

  // ====================================================================
  // 04. VIZIR CONTABILIDADE
  // ====================================================================
  {
    slug: "vizir",
    title: "Vizir Contabilidade",
    description:
      "Site institucional e social media para escritório contábil em ascensão.",
    categorias: ["web-design", "graphic-design"],
    image: "/projetos/vizir.jpg",
    year: 2025,
    case: {
      subtitle: "Escritório contábil tradicional ganha presença digital moderna sem perder credibilidade do segmento.",
      meta: {
        cliente: "Vizir Contabilidade",
        setor: "Serviços Profissionais",
        role: "Web design, Social media",
        duracao: "5 semanas",
        entregaveis: ["Site institucional", "Templates social", "Identidade digital"],
      },
      tags: ["Web Design", "Social Media"],
      hero: {
        src: "/projetos/vizir.jpg",
        alt: "Vizir — site no MacBook em escritório",
      },
      stats: [
        { value: "+340%", label: "Leads orgânicos em 6 meses" },
        { value: "12s", label: "Tempo médio antes era de 8min, novo site otimiza" },
        { value: "B2B", label: "Foco em pequenas e médias empresas" },
      ],
      gallery: [
        { src: "/projetos/vizir/01.jpg", alt: "Home do site", aspect: "video" },
        { src: "/projetos/vizir/02.jpg", alt: "Página de serviços", aspect: "video" },
        { src: "/projetos/vizir/03.jpg", alt: "Templates Instagram", aspect: "square" },
        { src: "/projetos/vizir/04.jpg", alt: "Site mobile", aspect: "portrait" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Renovar a percepção de uma contabilidade sem perder a credibilidade.",
          body: "Contabilidade é um setor onde inovação visual mal aplicada pode soar como desconfiança. O Vizir queria parecer moderno e acessível pra pequenas empresas, sem afastar o cliente tradicional que ainda valoriza a sobriedade do segmento.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Tipografia sóbria, copy clara e estrutura simples.",
          body: "Construí o site em torno de 3 perguntas: o que vocês fazem, pra quem, e como começar. Eliminei jargão técnico, organizei serviços em pacotes claros, e usei tipografia robusta + paleta neutra com um único accent azul.",
          image: {
            src: "/projetos/vizir/05.jpg",
            alt: "Detalhe de tipografia",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Crescimento orgânico expressivo nos primeiros 6 meses.",
          body: "Os leads orgânicos cresceram 340% no semestre seguinte ao lançamento. Os templates de social media padronizaram a presença no Instagram e LinkedIn, criando consistência que o escritório nunca tinha tido antes.",
        },
      ],
      next: "sirius",
    },
  },

  // ====================================================================
  // 05. SIRIUS AGÊNCIA
  // ====================================================================
  {
    slug: "sirius",
    title: "Sirius Agência",
    description:
      "Identidade visual completa para agência criativa, do conceito ao motion.",
    categorias: ["branding", "web-design", "motion-design"],
    image: "/projetos/sirius.png",
    year: 2023,
    case: {
      subtitle: "Agência criativa renasce com identidade que combina referências astronômicas e tipografia editorial.",
      meta: {
        cliente: "Sirius Agência",
        setor: "Comunicação · Publicidade",
        role: "Branding, Motion design, Direção de arte",
        duracao: "7 semanas",
        entregaveis: ["Brand system", "Motion brand reveal", "Manual de uso", "Templates"],
      },
      tags: ["Branding", "Motion Design"],
      hero: {
        src: "/projetos/sirius.png",
        alt: "Sirius — logo aplicado em fachada",
      },
      stats: [
        { value: "★", label: "Inspirada na estrela mais brilhante do céu" },
        { value: "60fps", label: "Motion brand reveal exportado em 4K" },
        { value: "+45%", label: "Novos contratos no trimestre pós-rebrand" },
      ],
      gallery: [
        { src: "/projetos/sirius/01.png", alt: "Logo principal Sirius", aspect: "video" },
        { src: "/projetos/sirius/02.png", alt: "Sistema tipográfico", aspect: "square" },
        { src: "/projetos/sirius/03.png", alt: "Aplicação em fachada", aspect: "square" },
        { src: "/projetos/sirius/04.png", alt: "Frames do motion reveal", aspect: "video" },
        { src: "/projetos/sirius/05.png", alt: "Templates editoriais", aspect: "square" },
        { src: "/projetos/sirius/06.png", alt: "Papelaria institucional", aspect: "square" },
        { src: "/projetos/sirius/07.png", alt: "Aplicação em mídia digital", aspect: "square" },
        { src: "/projetos/sirius/08.png", alt: "Variações do símbolo", aspect: "square" },
        { src: "/projetos/sirius/09.png", alt: "Identidade aplicada em campanha", aspect: "video" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Renovar uma agência criativa sem apagar o histórico.",
          body: "A Sirius existia há anos com uma identidade datada que atrapalhava o pitch pra clientes maiores. O paradoxo: a marca tinha equity local real — gente da região reconhecia o nome — então um rebrand radical arriscava jogar fora reconhecimento construído. Precisava evoluir sem apagar.\n\nO outro desafio era interno. Agência de comunicação é talvez o cliente mais difícil pra branding, porque todo mundo lá tem opinião visual forte e fundamentada. Boa parte do trabalho foi alinhar expectativas e defender cada decisão com argumento, não com gosto.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Evolução visual ancorada no significado do nome.",
          body: "Sirius é a estrela mais brilhante do céu noturno — usei isso como âncora conceitual, não como tema decorativo. Nada de estrelinhas; a referência aparece na ideia de um ponto de luz que se expande. O sistema usa tipografia editorial com peso variável, um símbolo geométrico minimalista e uma paleta sóbria com um único accent intenso.\n\nO motion brand reveal sintetiza o conceito: de um ponto brilhante até o nome completo, em cerca de 3 segundos, exportado em 4K/60fps pra rodar liso em apresentação. Foram duas rodadas de ajuste no símbolo até ele funcionar tão bem em favicon quanto em fachada. O manual de uso foi entregue pra agência aplicar a marca nos próprios materiais sem me consultar a cada peça.",
          image: {
            src: "/projetos/sirius/06.png",
            alt: "Aplicação em materiais impressos",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Crescimento de carteira e orgulho de marca recuperado.",
          body: "No trimestre seguinte ao lançamento, a Sirius fechou cerca de 45% mais contratos novos que a média dos trimestres anteriores. Não dá pra creditar isso só ao rebrand — tem sazonalidade e esforço comercial no meio — mas vários clientes novos mencionaram, por conta própria, a presença visual atualizada como o que chamou atenção no primeiro contato.\n\nO motion reveal virou ferramenta fixa de pitch e passou a abrir as reuniões iniciais. Internamente, o efeito mais claro foi orgulho de marca: a equipe voltou a usar a própria identidade com confiança, coisa que não acontecia com a versão antiga.",
        },
      ],
      next: "go-trace",
    },
  },

  // ====================================================================
  // 06. GO TRACE
  // ====================================================================
  {
    slug: "go-trace",
    title: "GO Trace",
    description:
      "SaaS de rastreamento de pedidos e gestão pós-venda para e-commerces.",
    categorias: ["branding", "ui-ux-design", "web-design"],
    image: "/projetos/go-trace.jpg",
    year: 2025,
    case: {
      subtitle: "Plataforma de rastreamento ganha redesign do dashboard e do fluxo de entrada, com marca, design system e site no mesmo projeto.",
      meta: {
        cliente: "GO Trace",
        setor: "SaaS de rastreamento para e-commerce",
        role: "Designer responsável pelo projeto inteiro",
        duracao: "10 semanas",
        entregaveis: ["Marca", "design system", "dashboard", "onboarding", "site"],
      },
      tags: ["Branding", "Web design"],
      hero: {
        src: "/projetos/go-trace/06.jpg",
        alt: "Painel da GO Trace numa estação de metrô",
      },
      stats: [
        { value: "−42%", label: "tempo para configurar a primeira loja" },
        { value: "8,4", label: "NPS depois do redesign (era 6,2)" },
        { value: "2,4 mil", label: "lojistas ativos na plataforma" },
      ],
      gallery: [
        { src: "/projetos/go-trace/03.jpg", alt: "Mídia exterior" },
        { src: "/projetos/go-trace/12.jpg", alt: "Chaveiros" },
        { src: "/projetos/go-trace/11.jpg", alt: "Camiseta da equipe" },
        { src: "/projetos/go-trace/13.jpg", alt: "App" },
        { src: "/projetos/go-trace/04.jpg", alt: "Crachás" },
        { src: "/projetos/go-trace/05.jpg", alt: "Cartão de visita" },
        { src: "/projetos/go-trace/07.jpg", alt: "Telão em evento" },
        { src: "/projetos/go-trace/08.jpg", alt: "Site no tablet" },
        { src: "/projetos/go-trace/02.jpg", alt: "Widget no celular" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Poderoso para quem já sabia usar. Difícil para quem estava chegando.",
          body: "A GO Trace tinha um produto forte e uma curva de aprendizado ruim. Configurar a primeira loja levava em média 12 minutos, e uma parte dos lojistas desistia no meio, justo quando o produto precisava provar valor.\n\nHavia um agravante: simplificar para quem chega sem atrapalhar quem já dominava o fluxo antigo. Melhorar para um e piorar para o outro seria só trocar de problema.",
        },
        {
          eyebrow: "PROCESSO",
          title: "23 pontos de atrito, 7 prioridades, 12 lojistas reais.",
          body: "Mapeei o fluxo antigo inteiro e listei 23 pontos de atrito. Em vez de atacar todos, priorizei os 7 que mais apareciam nos abandonos.\n\nPrototipei três fluxos alternativos e testei com 12 lojistas reais, misturando novatos e veteranos para não otimizar só para um lado.",
        },
      ],
      next: "financas-ja",
      rb: {
        headline: "Simples para quem chega, completo para quem já domina.",
        lead: "Redesign do dashboard e do fluxo de entrada de uma plataforma de rastreamento, com marca, design system e site no mesmo projeto.",
        resumo: {
          problema: "Configurar a primeira loja levava em média 12 minutos, e muitos lojistas desistiam antes de terminar.",
          papel: "Cuidei do projeto inteiro: marca, design system, redesign do dashboard, fluxo de entrada e site.",
          solucao: "Mapeei 23 pontos de atrito, ataquei os 7 que mais causavam abandono e testei três fluxos com 12 lojistas reais.",
          resultado: "Onboarding cerca de 42% mais rápido e NPS de 6,2 para 8,4 nos primeiros 90 dias.",
        },
        tabela: {
          esquerda: "O que já funcionava",
          direita: "O que travava",
          linhas: [
            ["Produto completo e poderoso", "12 minutos até a primeira loja"],
            ["Usuário técnico produzindo bem", "Configurações técnicas obrigatórias logo no início"],
            ["Fluxo antigo dominado por quem já usava", "Abandono antes de ver valor"],
          ],
        },
        decisao: {
          title: "O que era obrigatório virou avançado.",
          points: [
            { title: "Menos passos", body: "O fluxo essencial caiu pela metade em número de passos." },
            { title: "Avançado, não obrigatório", body: "As configurações técnicas saíram do caminho do novato e ficaram a um clique de quem já domina." },
            { title: "Um sistema só", body: "Tokens reutilizáveis mantêm dashboard, celular e site coerentes e barateiam a manutenção." },
          ],
        },
        aplicacoes: { title: "Do crachá à tela do celular.", body: "A marca nova chegou junto com o produto: mídia exterior, materiais da equipe, site e app falando a mesma língua." },
        wide: { src: "/projetos/go-trace/10.jpg", alt: "Dashboard da GO Trace no notebook" },
        pair: [
          { src: "/projetos/go-trace/01.jpg", alt: "Dashboard no monitor" },
          { src: "/projetos/go-trace/09.jpg", alt: "App no celular" },
        ],
        resultados: [
          { label: "Velocidade", title: "Primeira loja em 7 minutos", body: "O tempo médio de configuração caiu de 12 para 7 minutos, cerca de 42% mais rápido." },
          { label: "Satisfação", title: "NPS de 6,2 para 8,4", body: "Nos primeiros 90 dias. A amostra ainda está crescendo, então o número tende a se estabilizar." },
          { label: "Retenção", title: "Cerca de 27% menos churn", body: "Entre os lojistas novos, no mesmo período. O suporte também passou a receber menos dúvidas repetidas sobre o primeiro acesso." },
        ],
        citacao: { quote: "Acertou na mão demais. Ficou fino de verdade, e eu não imagino como poderia ficar melhor.", author: "Yuri Giovannetti · CEO e estrategista", photo: "/rb/clientes/yuri-giovannetti.jpg" },
      },
    },
  },

  // ====================================================================
  // 07. FINANÇAS JÁ
  // ====================================================================
  {
    slug: "financas-ja",
    title: "Finanças Já!",
    description:
      "App de gestão financeira pessoal com foco em clareza e usabilidade.",
    categorias: ["branding", "web-design", "motion-design"],
    image: "/projetos/financas-ja.png",
    year: 2025,
    case: {
      subtitle: "App de finanças pessoais elimina jargão e simplifica controle mensal pra quem nunca usou apps do tipo.",
      meta: {
        cliente: "Finanças Já!",
        setor: "Fintech · App",
        role: "UI/UX Design, Pesquisa",
        duracao: "8 semanas",
        entregaveis: ["Design system mobile", "Fluxos críticos", "Testes de usabilidade", "Handoff"],
      },
      tags: ["UI/UX Design", "Mobile"],
      hero: {
        src: "/projetos/financas-ja.png",
        alt: "Finanças Já — tela de boas-vindas mobile",
      },
      stats: [
        { value: "92%", label: "Taxa de retenção semana 1 após redesign" },
        { value: "−68%", label: "Erros de categorização manual" },
        { value: "iOS+Android", label: "Design unificado nas duas plataformas" },
      ],
      gallery: [
        { src: "/projetos/financas-ja/01.png", alt: "Tela home do app", aspect: "video" },
        { src: "/projetos/financas-ja/02.png", alt: "Categorias e tags", aspect: "square" },
        { src: "/projetos/financas-ja/03.png", alt: "Gráfico mensal", aspect: "square" },
        { src: "/projetos/financas-ja/04.png", alt: "Onboarding em 4 telas", aspect: "video" },
        { src: "/projetos/financas-ja/05.png", alt: "Histórico de transações", aspect: "square" },
        { src: "/projetos/financas-ja/06.png", alt: "Tela de adicionar despesa", aspect: "square" },
        { src: "/projetos/financas-ja/07.png", alt: "Resumo mensal interativo", aspect: "square" },
        { src: "/projetos/financas-ja/08.png", alt: "Tela de metas e progressos", aspect: "square" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Tornar gestão financeira acessível pra quem evita o assunto.",
          body: "A maioria dos apps financeiros assume conhecimento prévio: o usuário já entende categorias, conhece os próprios padrões de gasto, sabe interpretar gráficos. O Finanças Já! queria atender o oposto: quem nunca conseguiu manter um controle por achar tudo complicado demais.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Linguagem humana, microcopy auxiliar e onboarding gradual.",
          body: "Substituí termos técnicos por linguagem coloquial (\"gastei\" ao invés de \"débito\", \"sobrou\" ao invés de \"saldo positivo\"). O onboarding foi dividido em quatro telas, cada uma introduzindo uma noção por vez. Adicionei microcopy contextual que aparece quando o usuário hesita.",
          image: {
            src: "/projetos/financas-ja/05.png",
            alt: "Microcopy contextual em tooltip",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Retenção semana 1 saltou de 54% pra 92%.",
          body: "O redesign foi lançado num teste A/B com 30% dos novos usuários. A retenção da semana 1 subiu de 54% (versão antiga) para 92% (versão nova). Erros de categorização manual caíram 68% por causa do novo sistema de sugestões automáticas.",
        },
      ],
      next: "moneyfy",
    },
  },

  // ====================================================================
  // 08. MONEYFY
  // ====================================================================
  {
    slug: "moneyfy",
    title: "MoneyFy",
    description:
      "Gestão financeira via WhatsApp com categorização automática por IA.",
    categorias: ["web-design", "ui-ux-design", "branding"],
    image: "/projetos/moneyfy.jpg",
    year: 2026,
    case: {
      subtitle: "Plataforma de finanças via WhatsApp ganha identidade visual coesa e design das interfaces de configuração.",
      meta: {
        cliente: "MoneyFy",
        setor: "Fintech · Conversational",
        role: "Branding, UI/UX Design",
        duracao: "9 semanas",
        entregaveis: ["Brand system", "Interface web companion", "Templates WhatsApp", "Visual de IA"],
      },
      tags: ["Branding", "UI/UX Design"],
      hero: {
        src: "/projetos/moneyfy.jpg",
        alt: "MoneyFy — celular com app aberto",
      },
      stats: [
        { value: "WhatsApp", label: "Canal principal do produto" },
        { value: "+18K", label: "Usuários ativos no primeiro semestre" },
        { value: "92%", label: "Categorização automática correta" },
      ],
      gallery: [
        { src: "/projetos/moneyfy/01.jpg", alt: "Logo MoneyFy", aspect: "video" },
        { src: "/projetos/moneyfy/02.jpg", alt: "Templates de mensagem WhatsApp", aspect: "square" },
        { src: "/projetos/moneyfy/03.jpg", alt: "Dashboard web companion", aspect: "square" },
        { src: "/projetos/moneyfy/04.jpg", alt: "Visual da IA — chat", aspect: "video" },
        { src: "/projetos/moneyfy/05.jpg", alt: "Aplicações em redes sociais", aspect: "square" },
        { src: "/projetos/moneyfy/06.jpg", alt: "Mockup interface mobile", aspect: "square" },
        { src: "/projetos/moneyfy/07.jpg", alt: "Identidade aplicada em campanha", aspect: "square" },
      ],
      mockups: [
        { src: "/projetos/moneyfy/mockups/capa-macbook-iphone.jpg", alt: "App da MoneyFy no MacBook e no iPhone", w: 2200, h: 1467 },
        { src: "/projetos/moneyfy/mockups/iphone-mao-luz-azul.jpg", alt: "Site da MoneyFy no iPhone, na mão", w: 1467, h: 2200 },
        { src: "/projetos/moneyfy/mockups/macbook-mesa-preta.jpg", alt: "Site da MoneyFy no MacBook, numa mesa preta", w: 2200, h: 1467 },
        { src: "/projetos/moneyfy/mockups/iphone-beira-mesa.jpg", alt: "Tela de entrada do app no iPhone", w: 2200, h: 1467 },
        { src: "/projetos/moneyfy/mockups/monitor-quarto-escuro.jpg", alt: "Site da MoneyFy no monitor, num quarto escuro", w: 2200, h: 1467 },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Como dar identidade a um produto que vive dentro do WhatsApp?",
          body: "A MoneyFy não tem app próprio: o usuário interage 95% das vezes via chat no WhatsApp. A identidade precisava sobreviver dentro de um ambiente que não permite customização visual, ao mesmo tempo que diferenciava o produto em landing pages, web companion e materiais externos.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Identidade que respira nos espaços que tem, sem brigar pelos que não tem.",
          body: "A solução foi criar um sistema visual que se manifesta principalmente em três contextos: (1) o avatar/logo da conta WhatsApp, (2) o dashboard web companion, (3) materiais de aquisição. Em cada um, a marca tem expressão distinta mas coesa.\n\nO visual de IA foi pensado pra deixar claro quando o usuário está conversando com a IA e quando com um humano, sem isso virar UX intrusiva.",
          image: {
            src: "/projetos/moneyfy/06.jpg",
            alt: "Diagrama dos contextos de marca",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "18 mil usuários ativos no primeiro semestre.",
          body: "A MoneyFy chegou a 18K usuários ativos no semestre seguinte ao lançamento da nova identidade. A categorização automática de gastos chegou a 92% de acerto, o que reduziu a fricção e aumentou a retenção. O sistema visual sobreviveu bem nos limites do canal principal.",
        },
      ],
      next: "bosque-do-sol",
    },
  },

  // ====================================================================
  // 09. BOSQUE DO SOL
  // ====================================================================
  {
    slug: "bosque-do-sol",
    title: "Bosque do Sol",
    description:
      "Identidade visual para loteamento residencial em Senador Firmino, MG.",
    categorias: ["branding"],
    image: "/projetos/bosque-do-sol.png",
    year: 2025,
    case: {
      subtitle: "Loteamento em zona rural ganha identidade que reflete o ritmo da terra sem cair em clichês imobiliários.",
      meta: {
        cliente: "Bosque do Sol",
        setor: "Imobiliário · Loteamento",
        role: "Branding, Direção de arte",
        duracao: "5 semanas",
        entregaveis: ["Brand system", "Material de venda", "Sinalização", "Identidade digital"],
      },
      tags: ["Branding"],
      hero: {
        src: "/projetos/bosque-do-sol.png",
        alt: "Bosque do Sol — material de venda em mockup",
      },
      stats: [
        { value: "80%", label: "Dos lotes vendidos em 4 meses" },
        { value: "Local", label: "Marca conversa com o público da região" },
        { value: "MG", label: "Senador Firmino, interior de Minas" },
      ],
      gallery: [
        { src: "/projetos/bosque-do-sol/01.png", alt: "Logo Bosque do Sol", aspect: "video" },
        { src: "/projetos/bosque-do-sol/02.png", alt: "Sistema de cores naturais", aspect: "square" },
        { src: "/projetos/bosque-do-sol/03.png", alt: "Sinalização no terreno", aspect: "square" },
        { src: "/projetos/bosque-do-sol/04.png", alt: "Material impresso de venda", aspect: "video" },
        { src: "/projetos/bosque-do-sol/05.png", alt: "Folder institucional", aspect: "square" },
        { src: "/projetos/bosque-do-sol/06.png", alt: "Aplicação em fachada", aspect: "square" },
        { src: "/projetos/bosque-do-sol/07.png", alt: "Identidade aplicada em uniformes", aspect: "square" },
        { src: "/projetos/bosque-do-sol/08.png", alt: "Cartilha de boas-vindas", aspect: "square" },
        { src: "/projetos/bosque-do-sol/09.png", alt: "Vista aérea do loteamento com brand aplicada", aspect: "video" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Posicionar um loteamento sem usar clichês visuais do segmento.",
          body: "O setor imobiliário costuma trabalhar com paletas \"verde-azul-bege\" e tipografias serifadas que tentam transmitir sofisticação mas acabam diluindo a marca. O Bosque do Sol queria se diferenciar e atrair compradores locais, valorizando o caráter rural da região sem parecer interiorano demais.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Estudo de paisagem local e referências de identidades agrícolas modernas.",
          body: "Passei tempo estudando a paisagem real do terreno: as cores que aparecem ao amanhecer, a vegetação típica, os materiais de construção da região. A paleta nasceu daí — tons quentes derivados de terra batida, dourado de fim de tarde, verde profundo de mata.\n\nA tipografia mistura uma família com peso (pro logotipo) com uma família mais leve (pro corpo), criando hierarquia clara sem perder caráter.",
          image: {
            src: "/projetos/bosque-do-sol/05.png",
            alt: "Aplicação em totem físico",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "80% dos lotes vendidos em 4 meses.",
          body: "A identidade ajudou a posicionar o loteamento como referência local. 80% dos lotes foram vendidos em 4 meses, com taxa de conversão superior aos lançamentos anteriores da região. A marca virou referência visual nas conversas locais.",
        },
      ],
      next: "katia-assis",
    },
  },

  // ====================================================================
  // 10. KÁTIA ASSIS
  // ====================================================================
  {
    slug: "katia-assis",
    title: "Kátia Assis",
    description:
      "Brand system para consultório psicológico com identidade humanista.",
    categorias: ["branding"],
    image: "/projetos/katia-assis.jpg",
    year: 2026,
    case: {
      subtitle: "Consultório psicológico ganha identidade que transmite acolhimento sem cair em estereótipos visuais da área.",
      meta: {
        cliente: "Kátia Assis Psicologia",
        setor: "Saúde · Psicologia",
        role: "Branding, Aplicações",
        duracao: "4 semanas",
        entregaveis: ["Brand system", "Aplicações digitais", "Material impresso", "Stationery"],
      },
      tags: ["Branding"],
      hero: {
        src: "/projetos/katia-assis.jpg",
        alt: "Kátia Assis — papelaria em mockup",
      },
      stats: [
        { value: "100%", label: "Aplicação em ambientes presenciais" },
        { value: "+85%", label: "Cliques em link nas redes pós-rebrand" },
        { value: "Acolher", label: "Palavra-chave central da marca" },
      ],
      gallery: [
        { src: "/projetos/katia-assis/01.jpg", alt: "Logo principal", aspect: "video" },
        { src: "/projetos/katia-assis/02.jpg", alt: "Sistema de cores acolhedor", aspect: "square" },
        { src: "/projetos/katia-assis/03.jpg", alt: "Cartão de visita", aspect: "square" },
        { src: "/projetos/katia-assis/04.jpg", alt: "Templates Instagram", aspect: "video" },
        { src: "/projetos/katia-assis/05.jpg", alt: "Papelaria do consultório", aspect: "square" },
        { src: "/projetos/katia-assis/06.jpg", alt: "Aplicação em fachada", aspect: "square" },
        { src: "/projetos/katia-assis/07.jpg", alt: "Material de orientação ao paciente", aspect: "square" },
        { src: "/projetos/katia-assis/08.jpg", alt: "Composição com símbolo gráfico", aspect: "square" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Construir uma marca pessoal de psicóloga sem clichês.",
          body: "A psicologia tem padrões visuais cristalizados: tons pastéis, frases motivacionais, ilustrações de cérebro. A Kátia queria fugir disso e construir uma identidade que refletisse o trabalho real dela (escuta atenta, abordagem humanista) sem parecer mais um perfil terapêutico genérico nas redes.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Conversa, escuta e tradução visual da prática.",
          body: "Conversei com ela sobre a forma de trabalhar, os clientes que atende, o que distingue a abordagem dela. Saí dessa conversa com algumas palavras-âncora: \"acolher\", \"presença\", \"escuta\". A identidade visual nasceu como tradução dessas palavras: paleta com tons quentes mas sóbrios, tipografia humanista com curvas suaves, espaços generosos.",
          image: {
            src: "/projetos/katia-assis/05.jpg",
            alt: "Stationery completa em mesa",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Marca aplicada do consultório às redes.",
          body: "A identidade foi aplicada em todo o ambiente do consultório (placa, sinalização, papelaria) e nas redes sociais. O engajamento em link na bio do Instagram cresceu 85% nos meses seguintes, ajudando a captar novos pacientes que chegavam já familiarizados com a estética e tom.",
        },
      ],
      next: "gisto-xavier",
    },
  },

  // ====================================================================
  // 11. GISTO & XAVIER
  // ====================================================================
  {
    slug: "gisto-xavier",
    title: "Gisto & Xavier",
    description:
      "Brand system para escritório de advocacia previdenciária feminino.",
    categorias: ["branding"],
    image: "/projetos/gisto-xavier.png",
    year: 2026,
    case: {
      subtitle: "Escritório de advocacia previdenciária liderado por mulheres ganha identidade firme, sem cair na sobriedade exagerada do segmento.",
      meta: {
        cliente: "Gisto & Xavier Advocacia",
        setor: "Direito · Previdenciário",
        role: "Branding, Aplicações",
        duracao: "5 semanas",
        entregaveis: ["Brand system", "Material processual", "Identidade digital", "Sinalização"],
      },
      tags: ["Branding"],
      hero: {
        src: "/projetos/gisto-xavier.png",
        alt: "Gisto & Xavier — cartões de visita em mockup",
      },
      stats: [
        { value: "100+", label: "Casos previdenciários atendidos/ano" },
        { value: "Firme", label: "Tom de voz central da identidade" },
        { value: "MG", label: "Atende todo Brasil, sede em Minas" },
      ],
      gallery: [
        { src: "/projetos/gisto-xavier/01.png", alt: "Logo principal", aspect: "video" },
        { src: "/projetos/gisto-xavier/02.png", alt: "Sistema tipográfico", aspect: "square" },
        { src: "/projetos/gisto-xavier/03.png", alt: "Cartão de visita", aspect: "square" },
        { src: "/projetos/gisto-xavier/04.png", alt: "Templates de processos", aspect: "video" },
        { src: "/projetos/gisto-xavier/05.png", alt: "Mockup notebook com site", aspect: "square" },
        { src: "/projetos/gisto-xavier/06.png", alt: "Brand book aberto", aspect: "square" },
        { src: "/projetos/gisto-xavier/07.jpg", alt: "Pasta institucional fechada", aspect: "square" },
        { src: "/projetos/gisto-xavier/08.jpg", alt: "Stationery dark sobre clean", aspect: "square" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Diferenciar um escritório feminino sem perder credibilidade jurídica.",
          body: "O Direito Previdenciário é um nicho competitivo, e escritórios liderados por mulheres costumam ser empurrados pra um estereótipo visual — paletas \"femininas\", ilustrações suaves, tom delicado. O Gisto & Xavier queria o oposto: firmeza e autoridade, sem por isso copiar o cinza-azul-marinho genérico dos escritórios tradicionais que tentam parecer sérios e acabam parecendo iguais.\n\nO equilíbrio era a questão. Sério demais vira frio e distante — ruim pra um cliente que chega fragilizado, brigando por um benefício. Informal demais perde a credibilidade que a área exige.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Tipografia editorial robusta + paleta sóbria com 1 accent vivo.",
          body: "Construí a identidade em torno de uma tipografia editorial firme, com peso variável pra criar hierarquia, e uma paleta sóbria de cinza-grafite e branco. O accent é um vermelho-vinho que aparece com parcimônia — pontuação visual, não protagonismo. Severo o suficiente pra parecer jurídico, com personalidade suficiente pra não passar batido.\n\nDei atenção especial ao material processual e à papelaria, porque é o ponto de contato físico mais frequente do escritório: a pasta que o cliente leva pra casa, o cartão que fica na carteira. O brand book documenta as regras pra que a identidade se mantenha consistente mesmo nos documentos do dia a dia, produzidos pela própria equipe.",
          image: {
            src: "/projetos/gisto-xavier/05.png",
            alt: "Material processual aplicado",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Identidade firme aplicada em todas as frentes.",
          body: "A identidade foi aplicada em material processual, redes sociais, sinalização e papelaria completa. O efeito mais concreto apareceu na captação: os pedidos de orçamento via Instagram mais ou menos triplicaram nos dois meses seguintes — de uns 3 a 4 por semana pra perto de 10 — segundo o próprio escritório.\n\nVários clientes mencionaram o cartão de visita como primeiro contato memorável. Pra um escritório que disputa atenção num nicho lotado, virar \"o escritório com aquela identidade firme\" foi exatamente o reposicionamento que a marca buscava.",
        },
      ],
      next: "vitta-clube",
    },
  },

  // ====================================================================
  // 12. VITTA CLUBE — site (placeholder, completar com infos reais)
  // ====================================================================
  {
    slug: "vitta-clube",
    title: "Vitta Clube",
    description:
      "Site do clube de benefícios regional e nacional em saúde, bem-estar, lazer e compras.",
    categorias: ["web-design"],
    image: "/rb/covers/vitta-clube.jpg",
    year: 2026,
    case: {
      subtitle: "Site institucional da Vitta Clube, com os benefícios, os planos e a adesão no mesmo fluxo.",
      meta: {
        cliente: "Vitta Clube",
        setor: "Saúde e benefícios",
        role: "Web design",
        duracao: "",
        entregaveis: ["Site institucional","Versões para computador, tablet e celular"],
        link: "https://vittaclube.framer.website/",
      },
      tags: ["Web Design"],
      hero: { src: "/projetos/vitta-clube/mockups/macbook-cafe-da-manha.jpg", alt: "Site da Vitta Clube no MacBook, na mesa do café da manhã" },
      gallery: [],
      mockups: [
        { src: "/projetos/vitta-clube/mockups/capa-macbook-iphone.jpg", alt: "Site da Vitta Clube no MacBook e no iPhone", w: 2200, h: 1467 },
        { src: "/projetos/vitta-clube/mockups/iphone-mao-sofa.jpg", alt: "Site da Vitta Clube no iPhone, no sofá", w: 1467, h: 2200 },
        { src: "/projetos/vitta-clube/mockups/ipad-casal-vertical.jpg", alt: "Casal segurando o iPad com o site da Vitta Clube", w: 2200, h: 1467 },
        { src: "/projetos/vitta-clube/mockups/iphone-mesa-itens.jpg", alt: "Site da Vitta Clube no iPhone, ao lado da carteira e das chaves", w: 2200, h: 2200 },
      ],
      sections: [
        {
          eyebrow: "PONTO DE PARTIDA",
          title: "Muitas vantagens para explicar, e pouca paciência de quem chega.",
          body: "A Vitta Clube reúne vantagens regionais e nacionais em saúde, bem-estar, lazer e compras: telemedicina 24 horas, rede de descontos, assistência pet, carteirinha digital e suporte humano. O site apresenta tudo isso em blocos curtos e leva direto à adesão, com o campo de e-mail já na primeira tela.",
        },
      ],
      rb: {
        headline: "Um clube de benefícios explicado de forma simples, com a adesão logo na primeira tela.",
        lead: "Site institucional da Vitta Clube, com os benefícios, os planos e a adesão no mesmo fluxo.",
        wide: { src: "/projetos/vitta-clube/mockups/ipad-casal-horizontal.jpg", alt: "Casal vendo o site da Vitta Clube no iPad" },
      },
    },
  },
  {
    slug: "estudio-cais",
    title: "Estúdio Cais",
    description:
      "Site para estúdio de arquitetura brasileira e atemporal.",
    categorias: ["web-design"],
    image: "/rb/covers/estudio-cais.jpg",
    year: 2026,
    case: {
      subtitle: "Site institucional do Estúdio Cais, com o manifesto, o portfólio e o pedido de orçamento sempre à mão.",
      meta: {
        cliente: "Estúdio Cais",
        setor: "Arquitetura e interiores",
        role: "Web design",
        duracao: "",
        entregaveis: ["Site institucional","Portfólio de projetos","Versões para computador, tablet e celular"],
        link: "https://estudiocais.framer.website/",
      },
      tags: ["Web Design"],
      hero: { src: "/projetos/estudio-cais/mockups/macbook-estudio.jpg", alt: "Site do Estúdio Cais no MacBook, num estúdio de arquitetura" },
      gallery: [],
      mockups: [
        { src: "/projetos/estudio-cais/mockups/capa-macbook-iphone.jpg", alt: "Site do Estúdio Cais no MacBook e no iPhone, sobre travertino", w: 2200, h: 1467 },
        { src: "/projetos/estudio-cais/mockups/iphone-mao-sala.jpg", alt: "Site no iPhone, numa sala de estar", w: 1467, h: 2200 },
        { src: "/projetos/estudio-cais/mockups/ipad-mesa-projetos-vertical.jpg", alt: "Site no iPad, sobre a mesa de projetos", w: 2200, h: 1467 },
        { src: "/projetos/estudio-cais/mockups/ipad-mesa-materiais.jpg", alt: "Site no iPad, ao lado de plantas e amostras de material", w: 2200, h: 1467 },
      ],
      sections: [
        {
          eyebrow: "PONTO DE PARTIDA",
          title: "Arquitetura que recebe, que dura e que pertence.",
          body: "O Estúdio Cais faz arquitetura brasileira e atemporal. O site traduz essa visão com tipografia serifada, muito espaço em branco e fotos dos ambientes em destaque. Logo depois da abertura vem o manifesto, A gente não projeta paredes, projetamos a vida que acontece entre elas, e em seguida os projetos em destaque, com o pedido de orçamento sempre à mão.",
        },
      ],
      rb: {
        headline: "Um site com o mesmo respiro dos espaços que o estúdio projeta.",
        lead: "Site institucional do Estúdio Cais, com o manifesto, o portfólio e o pedido de orçamento sempre à mão.",
        wide: { src: "/projetos/estudio-cais/mockups/monitor-escritorio.jpg", alt: "Site do Estúdio Cais no monitor, num escritório de arquitetura" },
      },
    },
  },
  {
    slug: "peu-zr",
    title: "Peu.zr",
    description:
      "Portfólio para fotógrafo e filmmaker de moda e gastronomia em Dubai.",
    categorias: ["web-design"],
    image: "/rb/covers/peu-zr.jpg",
    year: 2026,
    case: {
      subtitle: "Site portfólio do Peu.zr, fotógrafo e filmmaker de moda e gastronomia em Dubai.",
      meta: {
        cliente: "Peu.zr",
        setor: "Fotografia e audiovisual",
        role: "Web design",
        duracao: "",
        entregaveis: ["Site portfólio","Versões para computador, tablet e celular"],
        link: "https://peuzr.com/",
      },
      tags: ["Web Design"],
      hero: { src: "/projetos/peu-zr/mockups/macbook-concreto-camera.jpg", alt: "Site do Peu.zr no MacBook, ao lado de uma câmera de cinema" },
      gallery: [],
      mockups: [
        { src: "/projetos/peu-zr/mockups/capa-macbook-iphone.jpg", alt: "Site do Peu.zr no MacBook e no iPhone, sobre metal perfurado", w: 2200, h: 1467 },
        { src: "/projetos/peu-zr/mockups/iphone-mao-escuro.jpg", alt: "Site do Peu.zr no iPhone, na mão", w: 1467, h: 2200 },
        { src: "/projetos/peu-zr/mockups/ipad-filme-vertical.jpg", alt: "Site do Peu.zr no iPad, com filmes e folha de contato", w: 2200, h: 1467 },
        { src: "/projetos/peu-zr/mockups/ipad-couro-filme.jpg", alt: "Site do Peu.zr no iPad, sobre couro, com filmes 35 mm", w: 2200, h: 1467 },
      ],
      sections: [
        {
          eyebrow: "PONTO DE PARTIDA",
          title: "O trabalho de um fotógrafo precisa abrir a página, não um texto.",
          body: "Peu.zr fotografa e filma moda e gastronomia em Dubai. O site abre com o retrato dele em preto e branco e os trabalhos flutuando ao redor, separados por moda, esporte e comida. O manifesto, Every frame has a reason, conduz para o portfólio, num visual escuro que deixa as imagens em primeiro plano.",
        },
      ],
      rb: {
        headline: "Um portfólio escuro e editorial, em que cada imagem tem motivo para estar ali.",
        lead: "Site portfólio do Peu.zr, fotógrafo e filmmaker de moda e gastronomia em Dubai.",
        wide: { src: "/projetos/peu-zr/mockups/monitor-ilha-edicao.jpg", alt: "Site do Peu.zr no monitor, numa ilha de edição" },
      },
    },
  },

  // ====================================================================
  // 13. GAMA BRASIL — site (placeholder, completar com infos reais)
  // ====================================================================
  {
    slug: "gama-brasil",
    title: "Gama Brasil",
    description:
      "Site institucional para empresa brasileira em transformação digital.",
    categorias: ["web-design"],
    image: "/projetos/bada-bing.png", // PLACEHOLDER — trocar quando subir
    year: 2026,
    case: {
      subtitle:
        "Empresa Gama ganha presença web alinhada ao posicionamento institucional renovado.",
      meta: {
        cliente: "Gama Brasil",
        setor: "Corporativo",
        role: "Web Design",
        duracao: "Em produção",
        entregaveis: ["Site institucional", "Landing pages"],
      },
      tags: ["Web Design", "Institucional"],
      hero: {
        src: "/projetos/bada-bing.png", // PLACEHOLDER
        alt: "Gama Brasil — site institucional",
      },
      gallery: [],
      sections: [
        {
          eyebrow: "EM PRODUÇÃO",
          title: "Conteúdo do case sendo preparado.",
          body: "Este case está em fase final de produção. Volte em breve pra ver o estudo completo: desafio, processo de design, decisões estratégicas e resultados mensuráveis do projeto.",
        },
      ],
      next: "bada-bing", // volta pro primeiro
    },
  },

  // ====================================================================
  // REBRAND 2026 — três projetos que só existiam no Figma/Instagram.
  // Texto a partir das legendas do Instagram (17-INSTAGRAM-PORTFOLIO.md).
  // Trechos entre colchetes esperam o Pedro.
  // ====================================================================
  {
    slug: "aroeira",
    title: "Aroeira",
    description: "Identidade visual e embalagem para o Aroeira Studio.",
    categorias: ["branding", "graphic-design"],
    image: "/rb/covers/aroeira.jpg",
    year: 2026,
    case: {
      subtitle: "Uma marca feita do próprio material: kraft, tecido, carimbo e linha.",
      meta: {
        cliente: "Aroeira Studio",
        setor: "Produtos feitos à mão",
        role: "Branding, Embalagem",
        duracao: "6 semanas",
        entregaveis: ["Identidade visual", "Tags e etiquetas", "Sacola e caixa de envio", "Papelaria"],
      },
      tags: ["Branding", "Embalagem"],
      hero: { src: "/rb/covers/aroeira.jpg", alt: "Caixa de envio da Aroeira sobre papel de seda com a marca" },
      gallery: [
        { src: "/projetos/aroeira/01.jpg", alt: "Tag pendurada com a marca" },
        { src: "/projetos/aroeira/04.jpg", alt: "Papelaria e peça editorial" },
        { src: "/projetos/aroeira/06.jpg", alt: "Sacola de tecido na janela" },
        { src: "/projetos/aroeira/02.jpg", alt: "Etiqueta bordada" },
        { src: "/projetos/aroeira/07.jpg", alt: "Sacola entre folhagens" },
        { src: "/projetos/aroeira/08.jpg", alt: "Cartão sobre papel kraft" },
        { src: "/projetos/aroeira/03.jpg", alt: "Fita com a marca" },
        { src: "/projetos/aroeira/09.jpg", alt: "Cartão de agradecimento" },
        { src: "/projetos/aroeira/12.jpg", alt: "Sacola kraft com a marca" },
      ],
      sections: [
        { eyebrow: "PONTO DE PARTIDA", title: "Uma marca com a textura do produto.", body: "A Aroeira trabalha com o feito à mão, e a marca precisava ter a mesma textura do que ela entrega. “Escolher o feito à mão é desacelerar o mundo um pouquinho.”" },
        { eyebrow: "PROCESSO", title: "A identidade nasceu do material.", body: "Papel kraft, tecido, carimbo e linha viraram o vocabulário da marca. Cada ponto de contato usa o que o próprio ateliê usa no dia a dia." },
        { eyebrow: "APLICAÇÃO", title: "Tag, etiqueta, sacola e caixa contam a mesma história.", body: "Da etiqueta costurada à caixa de envio, o sistema se repete sem cansar: a mesma assinatura, aplicada em materiais diferentes." },
      ],
      next: "use-duali",
    },
  },
  {
    slug: "espaco-equilibrio",
    title: "Espaço Equilíbrio",
    description: "Identidade visual e sinalização para um espaço de fisioterapia e psicologia.",
    categorias: ["branding"],
    image: "/rb/covers/espaco-equilibrio.jpg",
    year: 2026,
    case: {
      subtitle: "Fisioterapia e psicologia sob a mesma marca, da fachada ao celular.",
      meta: {
        cliente: "Espaço Equilíbrio",
        setor: "Saúde · Fisioterapia e psicologia",
        role: "Branding, Sinalização",
        duracao: "6 semanas",
        entregaveis: ["Identidade visual", "Sinalização", "Papelaria", "Site e redes"],
      },
      tags: ["Branding", "Sinalização"],
      hero: { src: "/rb/covers/espaco-equilibrio.jpg", alt: "Painéis do Espaço Equilíbrio numa parede de aço" },
      gallery: [
        { src: "/projetos/espaco-equilibrio/01.jpg", alt: "Outdoor com a marca" },
        { src: "/projetos/espaco-equilibrio/04.jpg", alt: "Papelaria sobre fundo vinho" },
        { src: "/projetos/espaco-equilibrio/05.jpg", alt: "Placa de fachada" },
        { src: "/projetos/espaco-equilibrio/06.jpg", alt: "Site aberto no notebook" },
        { src: "/projetos/espaco-equilibrio/09.jpg", alt: "Quadros na sala de espera" },
        { src: "/projetos/espaco-equilibrio/03.jpg", alt: "Painel em ponto de ônibus" },
        { src: "/projetos/espaco-equilibrio/10.jpg", alt: "Pasta de atendimento" },
        { src: "/projetos/espaco-equilibrio/02.jpg", alt: "Placa na parede de tijolos" },
        { src: "/projetos/espaco-equilibrio/12.jpg", alt: "Sinalização de sala" },
      ],
      sections: [
        { eyebrow: "DESAFIO", title: "Duas áreas, uma marca só.", body: "O Espaço Equilíbrio reúne fisioterapia e psicologia. Três profissionais com uma base comum: atenção à pessoa, no cuidado físico e no emocional." },
        { eyebrow: "PROCESSO", title: "A escuta veio antes de qualquer forma.", body: "O trabalho começou ouvindo as profissionais e quem é atendido por elas. Dessa escuta saiu a direção: uma marca que mostra a união dos cuidados, sem separar corpo e mente." },
        { eyebrow: "APLICAÇÃO", title: "Da fachada ao celular.", body: "Sinalização, papelaria, painéis internos, site e redes seguem o mesmo sistema, com a calma que o espaço pede." },
      ],
      next: "aroeira",
    },
  },
  {
    slug: "marisco-filmes",
    title: "Marisco Filmes",
    description: "Identidade visual para uma produtora audiovisual da Bahia.",
    categorias: ["branding", "graphic-design"],
    image: "/rb/covers/marisco-filmes.jpg",
    year: 2026,
    case: {
      subtitle: "Produtora audiovisual da Bahia com um sistema quente, direto e com sotaque.",
      meta: {
        cliente: "Marisco Filmes",
        setor: "Audiovisual · Bahia",
        role: "Branding, Direção de arte",
        duracao: "6 semanas",
        entregaveis: ["Identidade visual", "Papelaria", "Social media", "Peças de evento"],
      },
      tags: ["Branding", "Direção de arte"],
      hero: { src: "/projetos/marisco-filmes/06.jpg", alt: "Painel de evento com “Histórias com sotaque.”" },
      gallery: [
        { src: "/projetos/marisco-filmes/02.jpg", alt: "Moletom “Nós somos Marisco”" },
        { src: "/projetos/marisco-filmes/05.jpg", alt: "Cartões de visita" },
        { src: "/projetos/marisco-filmes/03.jpg", alt: "Cartaz na parede" },
        { src: "/projetos/marisco-filmes/07.jpg", alt: "Placa de fachada" },
        { src: "/projetos/marisco-filmes/04.jpg", alt: "Crachá da equipe" },
        { src: "/projetos/marisco-filmes/08.jpg", alt: "Site aberto no notebook" },
        { src: "/projetos/marisco-filmes/09.jpg", alt: "Cartazes na rua" },
        { src: "/projetos/marisco-filmes/10.jpg", alt: "Ecobag com a marca" },
        { src: "/projetos/marisco-filmes/12.jpg", alt: "Adesivos no notebook" },
      ],
      sections: [
        { eyebrow: "PONTO DE PARTIDA", title: "Histórias com sotaque.", body: "A Marisco Filmes é uma produtora audiovisual da Bahia, feita por Felipe e Isabela." },
        { eyebrow: "PROCESSO", title: "Escuta primeiro, enquadra depois.", body: "A marca precisava ter o jeito do trabalho deles. O sistema saiu quente e direto, com o vermelho e o vinho segurando a identidade em qualquer formato." },
        { eyebrow: "APLICAÇÃO", title: "Da claquete à camiseta.", body: "Crachás, cartões, painel de evento, site, cartazes, ecobag e moletom: a mesma voz em todos os pontos de contato." },
      ],
      next: "moneyfy",
    },
  },
];

export function getProjeto(slug: string) {
  return projetos.find((p) => p.slug === slug);
}
