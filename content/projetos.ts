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
    categorias: ["branding", "web-design", "ui-ux-design"],
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
        { value: "+128%", label: "Aumento de tráfego no primeiro mês" },
        { value: "4.9★", label: "Avaliação média no TimeOut Dubai" },
        { value: "72h", label: "Tempo de fermentação valorizado em copy" },
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
          body: "O Dubai Marina concentra centenas de restaurantes em poucos quilômetros. A Bada Bing chegava com um diferencial técnico real (massa de fermentação natural de 72h, ingredientes importados da Itália), mas precisava traduzir isso em uma marca que conversasse com o público local sem perder a essência romana.\n\nO desafio era construir uma identidade que comunicasse profundidade técnica sem ser intimidante, e operar em árabe e inglês com a mesma força visual.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Do estudo de tipografia romana ao e-commerce com copy de menu autoral.",
          body: "Comecei pela pesquisa: estudei tipografia tradicional italiana, vi como pizzarias premium em Milão e Nápoles posicionam o ofício, e mapeei o que faltava no mercado de Dubai. A direção visual nasceu daí: uma identidade que respira tradição mas usa códigos visuais contemporâneos.\n\nA copy foi co-construída comigo escrevendo cada descrição de pizza como pequeno texto autoral — não lista de ingredientes, mas micro-narrativa que valoriza o processo.",
          image: {
            src: "/projetos/bada-bing/06.png",
            alt: "Aplicação da identidade em embalagens",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Marca consistente do digital ao impresso, com tráfego dobrado em 30 dias.",
          body: "O e-commerce foi lançado com cardápio em duas línguas, sistema de pedidos via WhatsApp integrado, e estética alinhada ao físico do restaurante. No primeiro mês de operação, o tráfego cresceu 128% e a Bada Bing entrou na lista do TimeOut Dubai entre as melhores pizzarias da cidade.",
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
        { src: "/projetos/use-duali/01.png", alt: "Logo e wordmark", aspect: "square" },
        { src: "/projetos/use-duali/02.png", alt: "Paleta dual cool/warm", aspect: "wide" },
        { src: "/projetos/use-duali/03.png", alt: "Aplicação em embalagens", aspect: "portrait" },
        { src: "/projetos/use-duali/04.png", alt: "Campanha lookbook", aspect: "video" },
        { src: "/projetos/use-duali/05.png", alt: "Sistema tipográfico aplicado", aspect: "wide" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Como construir uma marca que vive em dois mundos sem parecer dividida?",
          body: "A Use Dualí nasceu pra atender mulheres que usam a mesma peça pra dormir, treinar e sair de casa. O nome \"Dualí\" já traz o conceito, mas a identidade visual tinha que sustentar essa promessa sem cair em clichês de \"yin/yang\" ou paletas óbvias.\n\nA marca precisava ser confortável o suficiente pra estar no quarto e firme o suficiente pra estar na academia.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Sistema visual com duas temperaturas que coexistem no mesmo frame.",
          body: "Construí uma paleta com dois conjuntos (cool e warm) que podem ser usados isoladamente ou combinados em gradientes suaves. A tipografia usa duas famílias — uma com mais peso e geometria (pra contexto fitness), outra com curvas mais orgânicas (pra contexto íntimo) — que dialogam em hierarquias específicas.",
          image: {
            src: "/projetos/use-duali/06.png",
            alt: "Estudo de paletas dual",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Marca coesa, com identidade clara em ambos os ambientes.",
          body: "O lookbook da primeira coleção pós-rebrand teve 62% mais engajamento que campanhas anteriores. A marca passou a ser reconhecida pela ambivalência intencional, não pela ambiguidade — uma diferença sutil que mudou o posicionamento.",
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
    categorias: ["branding"],
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
        { src: "/projetos/myko/01.png", alt: "Logo MYKO principal", aspect: "square" },
        { src: "/projetos/myko/02.png", alt: "Paleta azul Egeu", aspect: "wide" },
        { src: "/projetos/myko/03.png", alt: "Aplicação em sacola de tecido", aspect: "portrait" },
        { src: "/projetos/myko/04.png", alt: "Etiqueta de peça", aspect: "square" },
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
    categorias: ["branding", "motion-design"],
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
        { src: "/projetos/sirius/01.png", alt: "Logo principal Sirius", aspect: "square" },
        { src: "/projetos/sirius/02.png", alt: "Sistema tipográfico", aspect: "wide" },
        { src: "/projetos/sirius/03.png", alt: "Aplicação em fachada", aspect: "video" },
        { src: "/projetos/sirius/04.png", alt: "Frames do motion reveal", aspect: "wide" },
        { src: "/projetos/sirius/05.png", alt: "Templates editoriais", aspect: "portrait" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Renovar uma agência criativa sem apagar o histórico.",
          body: "A Sirius existia há anos com uma identidade datada que prejudicava o pitch pra clientes maiores. Mas a marca tinha equity local — mudar demais arriscaria perder reconhecimento.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Evolução visual ancorada no significado do nome.",
          body: "Sirius é a estrela mais brilhante do céu noturno. Usei essa referência pra construir um sistema visual que respira leveza e ambição: tipografia editorial com peso variável, símbolo geométrico minimalista, paleta com 1 accent intenso.\n\nO motion brand reveal sintetiza a transição: do ponto brilhante até o nome completo, em 3 segundos.",
          image: {
            src: "/projetos/sirius/06.png",
            alt: "Aplicação em materiais impressos",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Crescimento expressivo de carteira pós-rebrand.",
          body: "No trimestre seguinte ao lançamento, a Sirius fechou 45% mais contratos novos, todos com clientes que disseram ter sido atraídos pela presença visual atualizada. O motion reveal virou ferramenta de pitch comum nas reuniões iniciais.",
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
    categorias: ["ui-ux-design", "web-design"],
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
        { value: "8.7/10", label: "NPS pós-redesign (era 6.2)" },
        { value: "2.4K", label: "Lojistas ativos na plataforma" },
      ],
      gallery: [
        { src: "/projetos/go-trace/01.jpg", alt: "Dashboard principal", aspect: "video" },
        { src: "/projetos/go-trace/02.jpg", alt: "Tela de detalhe de pedido", aspect: "video" },
        { src: "/projetos/go-trace/03.jpg", alt: "Mobile responsivo", aspect: "portrait" },
        { src: "/projetos/go-trace/04.jpg", alt: "Site institucional", aspect: "video" },
        { src: "/projetos/go-trace/05.jpg", alt: "Design system tokens", aspect: "wide" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Reduzir o atrito do onboarding sem perder funcionalidade técnica.",
          body: "A GO Trace tinha um produto poderoso mas com curva de aprendizado alta. Lojistas levavam em média 12 minutos pra configurar a primeira loja, e muitos abandonavam o onboarding. O desafio era simplificar drasticamente sem ferir os usuários técnicos que já estavam acostumados ao fluxo antigo.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Mapeamento, prototipação e testes com lojistas reais.",
          body: "Mapeei o fluxo completo antigo, identifiquei 23 pontos de fricção e prioriei os 7 mais críticos. Prototipei 3 fluxos alternativos no Figma e testei com 12 lojistas reais (mix de novatos e veteranos). O fluxo final reduziu o número de passos pela metade.\n\nO design system foi reconstruído com base em tokens reusáveis, o que vai facilitar manutenção futura.",
          image: {
            src: "/projetos/go-trace/06.jpg",
            alt: "Fluxo de onboarding refeito",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Onboarding 42% mais rápido, NPS subiu de 6.2 pra 8.7.",
          body: "O tempo médio de configuração inicial caiu de 12 para 7 minutos. O NPS pulou de 6.2 para 8.7 nos primeiros 3 meses, o que reduziu o churn de novos lojistas em 31%. O site institucional também foi refeito pra refletir a nova hierarquia.",
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
    categorias: ["ui-ux-design"],
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
        { src: "/projetos/financas-ja/01.png", alt: "Tela home do app", aspect: "portrait" },
        { src: "/projetos/financas-ja/02.png", alt: "Categorias e tags", aspect: "portrait" },
        { src: "/projetos/financas-ja/03.png", alt: "Gráfico mensal", aspect: "portrait" },
        { src: "/projetos/financas-ja/04.png", alt: "Onboarding em 4 telas", aspect: "wide" },
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
    categorias: ["ui-ux-design", "branding"],
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
        { src: "/projetos/moneyfy/01.jpg", alt: "Logo MoneyFy", aspect: "square" },
        { src: "/projetos/moneyfy/02.jpg", alt: "Templates de mensagem WhatsApp", aspect: "portrait" },
        { src: "/projetos/moneyfy/03.jpg", alt: "Dashboard web companion", aspect: "video" },
        { src: "/projetos/moneyfy/04.jpg", alt: "Visual da IA — chat", aspect: "wide" },
        { src: "/projetos/moneyfy/05.jpg", alt: "Aplicações em redes sociais", aspect: "square" },
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
        { src: "/projetos/bosque-do-sol/01.png", alt: "Logo Bosque do Sol", aspect: "square" },
        { src: "/projetos/bosque-do-sol/02.png", alt: "Sistema de cores naturais", aspect: "wide" },
        { src: "/projetos/bosque-do-sol/03.png", alt: "Sinalização no terreno", aspect: "video" },
        { src: "/projetos/bosque-do-sol/04.png", alt: "Material impresso de venda", aspect: "portrait" },
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
        { src: "/projetos/katia-assis/01.jpg", alt: "Logo principal", aspect: "square" },
        { src: "/projetos/katia-assis/02.jpg", alt: "Sistema de cores acolhedor", aspect: "wide" },
        { src: "/projetos/katia-assis/03.jpg", alt: "Cartão de visita", aspect: "portrait" },
        { src: "/projetos/katia-assis/04.jpg", alt: "Templates Instagram", aspect: "square" },
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
        { src: "/projetos/gisto-xavier/01.png", alt: "Logo principal", aspect: "square" },
        { src: "/projetos/gisto-xavier/02.png", alt: "Sistema tipográfico", aspect: "wide" },
        { src: "/projetos/gisto-xavier/03.png", alt: "Cartão de visita", aspect: "portrait" },
        { src: "/projetos/gisto-xavier/04.png", alt: "Templates de processos", aspect: "video" },
      ],
      sections: [
        {
          eyebrow: "DESAFIO",
          title: "Diferenciar um escritório feminino sem perder credibilidade jurídica.",
          body: "O Direito Previdenciário é um nicho competitivo, e escritórios liderados por mulheres costumam ser estereotipados visualmente (paletas \"femininas\", ilustrações suaves). O Gisto & Xavier queria firmeza e seriedade, mas sem replicar a estética cinza-azul-marinho dos escritórios tradicionais.",
        },
        {
          eyebrow: "PROCESSO",
          title: "Tipografia editorial robusta + paleta sóbria com 1 accent vivo.",
          body: "Construí a identidade em torno de tipografia editorial firme (com peso variável pra hierarquia), paleta sóbria de cinza-grafite + branco, com um accent vermelho-vinho que aparece em momentos específicos pra criar pontuação visual. O sistema é severo o suficiente pra parecer jurídico, com personalidade suficiente pra não passar despercebido.",
          image: {
            src: "/projetos/gisto-xavier/05.png",
            alt: "Material processual aplicado",
            aspect: "wide",
          },
        },
        {
          eyebrow: "RESULTADO",
          title: "Identidade firme aplicada em todas as frentes.",
          body: "A nova identidade foi aplicada em material processual, redes sociais, sinalização do escritório e papelaria completa. O escritório passou a ser reconhecido na região pela presença visual distinta, com vários clientes mencionando o cartão de visita como primeiro contato memorável.",
        },
      ],
      next: "bada-bing", // volta pro primeiro
    },
  },
];

export function getProjeto(slug: string) {
  return projetos.find((p) => p.slug === slug);
}
