import type { Bloco } from "@/content/posts";
import { slugify } from "@/lib/slugify";

/**
 * Corpo do post (sem hooks, renderiza no servidor). Medida de leitura de
 * ~680px, t-body com entrelinha 1.6, citações em Instrument Serif itálica.
 *
 * Markdown leve do content/posts.ts:
 *  - __negrito__ (aceita um nível aninhado, que vira itálico:
 *    "__Não diferenciar __primitive__ de __semantic__ tokens__")
 *  - `código` em linha, neutro
 */

type Node = string | { t: "strong" | "em"; c: Node[] } | { t: "code"; v: string };

const isSpace = (ch: string | undefined) => ch === undefined || /\s/.test(ch);
const closesBefore = (ch: string | undefined) => ch === undefined || /[\s.,;:!?)"”]/.test(ch);

/** __ abre quando vem colado à palavra seguinte e fecha quando vem colado à anterior. */
function parseBold(s: string): Node[] {
  const stack: Node[][] = [[]];
  let buf = "";
  const flush = () => {
    if (buf) stack[stack.length - 1].push(buf);
    buf = "";
  };
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "_" && s[i + 1] === "_") {
      const prev = s[i - 1];
      const next = s[i + 2];
      if (stack.length > 1 && !isSpace(prev) && closesBefore(next)) {
        flush();
        const children = stack.pop()!;
        stack[stack.length - 1].push({ t: stack.length === 1 ? "strong" : "em", c: children });
        i++;
        continue;
      }
      if (!isSpace(next)) {
        flush();
        stack.push([]);
        i++;
        continue;
      }
    }
    buf += s[i];
  }
  flush();
  // Sem fechamento: devolve os __ como texto.
  while (stack.length > 1) {
    const children = stack.pop()!;
    stack[stack.length - 1].push("__", ...children);
  }
  return stack[0];
}

function parseInline(text: string): Node[] {
  const out: Node[] = [];
  const re = /`([^`]+)`/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(...parseBold(text.slice(last, m.index)));
    out.push({ t: "code", v: m[1] });
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(...parseBold(text.slice(last)));
  return out;
}

function renderNodes(nodes: Node[], prefix = ""): React.ReactNode[] {
  return nodes.map((n, i) => {
    const key = `${prefix}${i}`;
    if (typeof n === "string") return n;
    if (n.t === "code") {
      return (
        <code key={key} className="rounded-[4px] bg-ink-900/[0.06] px-1.5 py-0.5 whitespace-nowrap font-mono text-[0.82em] font-normal tracking-normal text-fg-strong dark:bg-ink-50/10">
          {n.v}
        </code>
      );
    }
    if (n.t === "strong") {
      return <strong key={key} className="font-bold text-fg-strong">{renderNodes(n.c, `${key}-`)}</strong>;
    }
    return <em key={key} className="italic">{renderNodes(n.c, `${key}-`)}</em>;
  });
}

function Inline({ text }: { text: string }) {
  return <>{renderNodes(parseInline(text))}</>;
}

const bodyText = "t-body leading-[1.6] tracking-[-0.015em] text-fg-strong";

function RenderBloco({ bloco }: { bloco: Bloco }) {
  switch (bloco.tipo) {
    case "h2":
      return (
        <h2 id={slugify(bloco.texto)} className="t-h2 mb-5 mt-14 scroll-mt-28 text-balance text-fg-strong first:mt-0 lg:mb-6 lg:mt-20 lg:scroll-mt-32">
          {bloco.texto}
        </h2>
      );
    case "h3":
      return (
        <h3 id={slugify(bloco.texto)} className="t-h3 mb-4 mt-10 scroll-mt-28 text-balance text-fg-strong first:mt-0 lg:mt-14 lg:scroll-mt-32">
          {bloco.texto}
        </h3>
      );
    case "p":
      return (
        <p className={`${bodyText} mt-6 first:mt-0`}>
          <Inline text={bloco.texto} />
        </p>
      );
    case "quote":
      return (
        <figure className="my-12 border-y border-ink-100 py-10 dark:border-ink-700 lg:my-16 lg:py-12">
          <span aria-hidden className="t-serif block h-[0.42em] text-[72px] leading-[1] text-brand lg:text-[96px]">“</span>
          <blockquote className="t-serif mt-2 text-[clamp(30px,calc(23.31px+1.714vw),48px)] leading-[1.12] text-fg-strong lg:mt-3">
            <p>{bloco.texto}</p>
          </blockquote>
          {bloco.autor && (
            <figcaption className="t-label mt-6 text-ink-700 dark:text-ink-200">{bloco.autor}</figcaption>
          )}
        </figure>
      );
    case "hr":
      return <hr className="my-12 border-ink-100 dark:border-ink-700 lg:my-16" />;
    case "ul":
      return (
        <ul className="mt-6 flex flex-col gap-4">
          {bloco.itens.map((item, i) => (
            <li key={i} className={`${bodyText} flex gap-4`}>
              <span aria-hidden className="mt-[0.62em] size-2 shrink-0 bg-brand" />
              <span className="min-w-0">
                <Inline text={item} />
              </span>
            </li>
          ))}
        </ul>
      );
  }
}

export function PostBody({ blocos }: { blocos: Bloco[] }) {
  return (
    <div lang="pt-BR" className="max-w-[680px]">
      {blocos.map((bloco, i) => (
        <RenderBloco key={i} bloco={bloco} />
      ))}
    </div>
  );
}
