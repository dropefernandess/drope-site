/**
 * Glossário de design — termos PT/EN com definição curta.
 *
 * Cada termo vira um <DefinedTerm> no schema DefinedTermSet (SEO) e tem
 * um id-âncora (slug) pra deep-linking: /glossario#design-tokens.
 *
 * Tráfego-alvo: buscas informacionais "o que é design tokens",
 * "o que é kerning", "o que é brand system", etc.
 */

export type GlossCategory = "branding" | "tipografia" | "uiux" | "motion" | "frontend";

export type GlossTerm = {
  slug: string;
  term: { pt: string; en: string };
  def: { pt: string; en: string };
  category: GlossCategory;
};

export const categoryLabels: Record<GlossCategory, { pt: string; en: string }> = {
  branding:   { pt: "Branding",     en: "Branding" },
  tipografia: { pt: "Tipografia",   en: "Typography" },
  uiux:       { pt: "UI/UX",        en: "UI/UX" },
  motion:     { pt: "Motion",       en: "Motion" },
  frontend:   { pt: "Front-end",    en: "Front-end" },
};

export const glossario: GlossTerm[] = [
  // ===== BRANDING =====
  {
    slug: "brand-system",
    term: { pt: "Brand System", en: "Brand System" },
    category: "branding",
    def: {
      pt: "Conjunto completo de regras visuais e verbais de uma marca — logo, cores, tipografia, tom de voz e aplicações — que garante consistência em qualquer ponto de contato.",
      en: "The complete set of a brand's visual and verbal rules — logo, colors, typography, tone of voice and applications — ensuring consistency across every touchpoint.",
    },
  },
  {
    slug: "identidade-visual",
    term: { pt: "Identidade Visual", en: "Visual Identity" },
    category: "branding",
    def: {
      pt: "A face visível de uma marca: a combinação de logotipo, paleta, tipografia e elementos gráficos que a tornam reconhecível à primeira vista.",
      en: "The visible face of a brand: the combination of logo, palette, typography and graphic elements that make it recognizable at a glance.",
    },
  },
  {
    slug: "naming",
    term: { pt: "Naming", en: "Naming" },
    category: "branding",
    def: {
      pt: "O processo estratégico de criar o nome de uma marca, produto ou serviço, equilibrando significado, sonoridade, disponibilidade de domínio e registro.",
      en: "The strategic process of creating a brand, product or service name, balancing meaning, sound, domain availability and trademark.",
    },
  },
  {
    slug: "logotipo",
    term: { pt: "Logotipo vs. Símbolo", en: "Logotype vs. Symbol" },
    category: "branding",
    def: {
      pt: "Logotipo é o nome escrito com tipografia própria; símbolo (ou marca gráfica) é o ícone abstrato ou figurativo. Juntos formam a assinatura visual.",
      en: "A logotype is the name set in custom type; a symbol (or brandmark) is the abstract or figurative icon. Together they form the visual signature.",
    },
  },
  {
    slug: "brand-book",
    term: { pt: "Brand Book (Manual da Marca)", en: "Brand Book" },
    category: "branding",
    def: {
      pt: "Documento que reúne todas as regras de uso da marca — espaçamentos, versões do logo, paleta, tipografia e exemplos do que pode e não pode.",
      en: "A document gathering all brand usage rules — spacing, logo versions, palette, typography and dos-and-don'ts examples.",
    },
  },
  {
    slug: "tom-de-voz",
    term: { pt: "Tom de Voz", en: "Tone of Voice" },
    category: "branding",
    def: {
      pt: "A personalidade da marca expressa em palavras: como ela escreve, que vocabulário usa e que sensação transmite em cada mensagem.",
      en: "A brand's personality expressed in words: how it writes, what vocabulary it uses and the feeling it conveys in every message.",
    },
  },
  {
    slug: "paleta-de-cores",
    term: { pt: "Paleta de Cores", en: "Color Palette" },
    category: "branding",
    def: {
      pt: "O conjunto definido de cores de uma marca, com cores primárias, secundárias e neutras, e regras de proporção e contraste entre elas.",
      en: "A brand's defined set of colors — primary, secondary and neutral — with rules for proportion and contrast between them.",
    },
  },

  // ===== TIPOGRAFIA =====
  {
    slug: "kerning",
    term: { pt: "Kerning", en: "Kerning" },
    category: "tipografia",
    def: {
      pt: "O ajuste fino do espaço entre dois caracteres específicos para equilibrar visualmente palavras — essencial em logotipos e títulos grandes.",
      en: "The fine adjustment of space between two specific characters to visually balance words — essential in logos and large headlines.",
    },
  },
  {
    slug: "tracking",
    term: { pt: "Tracking", en: "Tracking" },
    category: "tipografia",
    def: {
      pt: "O espaçamento uniforme aplicado a um bloco inteiro de texto. Diferente do kerning (que é entre pares), o tracking afeta tudo de uma vez.",
      en: "The uniform spacing applied across an entire block of text. Unlike kerning (between pairs), tracking affects everything at once.",
    },
  },
  {
    slug: "entrelinha",
    term: { pt: "Entrelinha (Leading)", en: "Leading (Line Height)" },
    category: "tipografia",
    def: {
      pt: "A distância vertical entre linhas de texto. Bem calibrada, melhora a legibilidade; apertada demais ou larga demais cansa a leitura.",
      en: "The vertical distance between lines of text. Well calibrated, it improves readability; too tight or too loose tires the reader.",
    },
  },
  {
    slug: "hierarquia-tipografica",
    term: { pt: "Hierarquia Tipográfica", en: "Typographic Hierarchy" },
    category: "tipografia",
    def: {
      pt: "O uso de tamanho, peso e espaçamento para guiar o olho pelo conteúdo na ordem certa — do título mais importante ao detalhe.",
      en: "Using size, weight and spacing to guide the eye through content in the right order — from the most important heading to the detail.",
    },
  },
  {
    slug: "serifa",
    term: { pt: "Serifa", en: "Serif" },
    category: "tipografia",
    def: {
      pt: "Os pequenos traços nas extremidades das letras em fontes serifadas (como Times). Fontes sem esses traços são chamadas sans-serif.",
      en: "The small strokes at the ends of letters in serif typefaces (like Times). Fonts without them are called sans-serif.",
    },
  },

  // ===== UI/UX =====
  {
    slug: "wireframe",
    term: { pt: "Wireframe", en: "Wireframe" },
    category: "uiux",
    def: {
      pt: "Esboço de baixa fidelidade de uma tela, focado em estrutura e fluxo — sem cores ou estilo final. Define o esqueleto antes do visual.",
      en: "A low-fidelity sketch of a screen, focused on structure and flow — no colors or final styling. Defines the skeleton before the visuals.",
    },
  },
  {
    slug: "prototipo",
    term: { pt: "Protótipo", en: "Prototype" },
    category: "uiux",
    def: {
      pt: "Versão interativa e navegável de um design, usada para testar fluxos e validar decisões antes de programar de fato.",
      en: "An interactive, navigable version of a design, used to test flows and validate decisions before actually coding.",
    },
  },
  {
    slug: "design-tokens",
    term: { pt: "Design Tokens", en: "Design Tokens" },
    category: "uiux",
    def: {
      pt: "Variáveis nomeadas que guardam decisões de design (cores, espaçamentos, raios). Trocar o valor em um lugar atualiza todo o sistema.",
      en: "Named variables that store design decisions (colors, spacing, radii). Change the value in one place and the whole system updates.",
    },
  },
  {
    slug: "design-system",
    term: { pt: "Design System", en: "Design System" },
    category: "uiux",
    def: {
      pt: "Biblioteca viva de componentes, tokens e diretrizes reutilizáveis que mantém produto e marca consistentes e acelera novas telas.",
      en: "A living library of reusable components, tokens and guidelines that keeps product and brand consistent and speeds up new screens.",
    },
  },
  {
    slug: "grid",
    term: { pt: "Grid", en: "Grid" },
    category: "uiux",
    def: {
      pt: "Sistema de colunas e margens invisível que organiza o layout, criando alinhamento e ritmo entre os elementos da página.",
      en: "An invisible system of columns and margins that organizes layout, creating alignment and rhythm between page elements.",
    },
  },
  {
    slug: "microinteracao",
    term: { pt: "Microinteração", en: "Microinteraction" },
    category: "uiux",
    def: {
      pt: "Pequena animação ou resposta visual a uma ação do usuário (um botão que reage, um toggle que desliza) que dá feedback e prazer de uso.",
      en: "A small animation or visual response to a user action (a button that reacts, a toggle that slides) giving feedback and delight.",
    },
  },
  {
    slug: "affordance",
    term: { pt: "Affordance", en: "Affordance" },
    category: "uiux",
    def: {
      pt: "Pista visual que sugere como usar um elemento — um botão que parece clicável, um campo que parece editável. Bom design é autoexplicativo.",
      en: "A visual cue suggesting how to use an element — a button that looks clickable, a field that looks editable. Good design is self-explanatory.",
    },
  },

  // ===== MOTION =====
  {
    slug: "easing",
    term: { pt: "Easing", en: "Easing" },
    category: "motion",
    def: {
      pt: "A curva de aceleração de uma animação. Movimento natural raramente é linear — ele acelera e desacelera, como objetos no mundo real.",
      en: "The acceleration curve of an animation. Natural motion is rarely linear — it speeds up and slows down, like objects in the real world.",
    },
  },
  {
    slug: "logo-reveal",
    term: { pt: "Logo Reveal", en: "Logo Reveal" },
    category: "motion",
    def: {
      pt: "Animação curta que apresenta a marca — o logo se desenha, monta ou aparece — usada em aberturas de vídeo, sites e lançamentos.",
      en: "A short animation that introduces the brand — the logo draws, assembles or appears — used in video intros, sites and launches.",
    },
  },
  {
    slug: "frame-rate",
    term: { pt: "Frame Rate (FPS)", en: "Frame Rate (FPS)" },
    category: "motion",
    def: {
      pt: "Quadros por segundo de uma animação ou vídeo. Quanto mais alto, mais fluido o movimento — 60fps é o padrão de interfaces suaves.",
      en: "Frames per second of an animation or video. The higher, the smoother the motion — 60fps is the standard for fluid interfaces.",
    },
  },

  // ===== FRONT-END =====
  {
    slug: "responsivo",
    term: { pt: "Design Responsivo", en: "Responsive Design" },
    category: "frontend",
    def: {
      pt: "Abordagem em que o layout se adapta a qualquer tamanho de tela — do celular ao desktop — reorganizando elementos em vez de só encolher.",
      en: "An approach where the layout adapts to any screen size — from phone to desktop — reorganizing elements rather than just shrinking.",
    },
  },
  {
    slug: "componente",
    term: { pt: "Componente", en: "Component" },
    category: "frontend",
    def: {
      pt: "Bloco de interface reutilizável (botão, card, modal) construído uma vez e reaproveitado em todo o produto, com props que ajustam variações.",
      en: "A reusable interface block (button, card, modal) built once and reused across the product, with props that adjust variations.",
    },
  },
];
