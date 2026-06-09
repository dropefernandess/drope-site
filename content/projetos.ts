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
  /** Corpo do case — várias seções alternando texto e imagens */
  sections: CaseSection[];
  /** Próximo projeto sugerido no final */
  next?: string;          // slug
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
        link: "https://badabing.com",
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
      subtitle: "Plataforma de rastreamento ganha redesign completo de dashboard e fluxo de onboarding pra lojistas.",
      meta: {
        cliente: "GO Trace",
        setor: "SaaS · Logística",
        role: "UI/UX Design, Web design",
        duracao: "10 semanas",
        entregaveis: ["Design system", "Dashboard redesign", "Onboarding flow", "Site institucional"],
      },
      tags: ["UI/UX Design", "Web Design"],
      hero: {
        src: "/projetos/go-trace.jpg",
        alt: "GO Trace — dashboard em mockup escuro",
      },
      stats: [
        { value: "−42%", label: "Tempo médio de onboarding por lojista" },
        { value: "8.4/10", label: "NPS pós-redesign (era 6.2, ~90 dias)" },
        { value: "2.4K", label: "Lojistas ativos na plataforma" },
      ],
      gallery: [
        { src: "/projetos/go-trace/01.jpg", alt: "Dashboard principal", aspect: "video" },
        { src: "/projetos/go-trace/02.jpg", alt: "Tela de detalhe de pedido", aspect: "square" },
        { src: "/projetos/go-trace/03.jpg", alt: "Mobile responsivo", aspect: "square" },
        { src: "/projetos/go-trace/04.jpg", alt: "Site institucional", aspect: "video" },
        { src: "/projetos/go-trace/05.jpg", alt: "Design system tokens", aspect: "square" },
        { src: "/projetos/go-trace/06.jpg", alt: "Componentes de UI", aspect: "square" },
        { src: "/projetos/go-trace/07.jpg", alt: "Fluxo de onboarding", aspect: "square" },
        { src: "/projetos/go-trace/08.jpg", alt: "Filtros e estados vazios", aspect: "square" },
        { src: "/projetos/go-trace/09.jpg", alt: "Landing page completa", aspect: "video" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Reduzir o atrito do onboarding sem perder funcionalidade técnica.",
          body: "A GO Trace tinha um produto poderoso e uma curva de aprendizado ruim. Lojistas levavam em média 12 minutos pra configurar a primeira loja, e uma parcela considerável abandonava antes de terminar o onboarding — ou seja, o produto perdia gente justo no momento em que precisava provar valor.\n\nO desafio tinha um agravante: simplificar pra novato sem irritar o usuário técnico que já dominava o fluxo antigo e produzia em cima dele. Redesign que melhora pra um e piora pro outro não é redesign, é troca de problema.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Mapeamento, prototipação e testes com lojistas reais.",
          body: "Mapeei o fluxo antigo inteiro e listei os pontos de fricção — foram 23. Em vez de atacar todos, prioriei os 7 que apareciam com mais frequência nos abandonos. Prototipei três fluxos alternativos no Figma e testei com 12 lojistas reais, misturando novatos e veteranos pra não otimizar só pra um lado.\n\nA decisão mais importante foi tornar avançado o que era obrigatório: configurações técnicas que travavam o novato viraram opcionais, recolhidas atrás de um \"avançado\" que o veterano encontra na hora. O fluxo essencial caiu pela metade no número de passos. O design system foi reconstruído com tokens reutilizáveis, o que reduz o custo de manutenção e mantém consistência entre dashboard, mobile e site.",
          image: {
            src: "/projetos/go-trace/06.jpg",
            alt: "Fluxo de onboarding refeito",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Onboarding ~42% mais rápido, NPS de 6.2 pra 8.4.",
          body: "O tempo médio de configuração inicial caiu de 12 pra 7 minutos — cerca de 42% mais rápido. O NPS subiu de 6.2 pra 8.4 nos primeiros ~90 dias (amostra ainda crescendo, então tende a se estabilizar com mais volume), e o churn de novos lojistas caiu por volta de 27% no mesmo período.\n\nOs números vieram com uma mudança qualitativa: o time de suporte relatou queda nas dúvidas repetidas sobre o setup inicial, o que liberou atendimento pra problemas mais complexos. O site institucional foi refeito junto, alinhando a promessa externa ao que o produto entrega de fato.",
        },
      ],
      next: "financas-ja",
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
      "Site institucional para clube de benefícios em saúde e bem-estar.",
    categorias: ["web-design"],
    image: "/projetos/bada-bing.png", // PLACEHOLDER — trocar quando subir
    year: 2026,
    case: {
      subtitle:
        "Plataforma de benefícios em saúde ganha presença digital clara, focada em conversão e clareza de oferta.",
      meta: {
        cliente: "Vitta Clube",
        setor: "Saúde · Benefícios",
        role: "Web Design",
        duracao: "Em produção",
        entregaveis: ["Site institucional", "Páginas de planos"],
      },
      tags: ["Web Design", "Institucional"],
      hero: {
        src: "/projetos/bada-bing.png", // PLACEHOLDER
        alt: "Vitta Clube — site institucional",
      },
      gallery: [],
      sections: [
        {
          eyebrow: "EM PRODUÇÃO",
          title: "Conteúdo do case sendo preparado.",
          body: "Este case está em fase final de produção. Volte em breve pra ver o estudo completo: desafio, processo de design, decisões estratégicas e resultados mensuráveis do projeto.",
        },
      ],
      next: "gama-brasil",
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
];

export function getProjeto(slug: string) {
  return projetos.find((p) => p.slug === slug);
}
