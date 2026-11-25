"use client";

import { useEffect, useId, useRef, useState, useTransition } from "react";
import { enviarEstimativa, type EstimativaPayload } from "@/app/actions/enviar-estimativa";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { BrandArrow, BrandButton } from "@/components/rb/ui";
import type { Locale } from "@/lib/i18n/dictionaries";
import { waLink } from "@/lib/config";
import { cn } from "@/lib/utils";

type Props = {
  /** Pra desabilitar o envio se a calc não tiver seleção válida */
  canSubmit: boolean;
  /** Resumo + contexto pra anexar no email */
  payload: Omit<EstimativaPayload, "nome" | "email" | "mensagem">;
  /** Pra montar mensagem do WhatsApp */
  resumoWhatsapp: string;
};

const COPY: Record<Locale, {
  nome: string; email: string; emailHint: string; mensagem: string; opcional: string;
  errNome: string; errEmail: string; errServico: string;
  enviar: string; enviando: string;
  alt: string; whatsapp: string; agendar: string;
  okTitle: string; okA: string; okB: string; okBtn: string;
  errGeneric: string;
}> = {
  pt: {
    nome: "Seu nome",
    email: "Seu e-mail",
    emailHint: "É para esse e-mail que eu respondo.",
    mensagem: "Conte um pouco sobre o projeto",
    opcional: "(opcional)",
    errNome: "Escreva seu nome.",
    errEmail: "Escreva um e-mail válido, como nome@empresa.com.",
    errServico: "Marque ao menos um serviço na etapa 01 para enviar.",
    enviar: "Enviar estimativa",
    enviando: "Enviando…",
    alt: "Prefere conversar agora?",
    whatsapp: "Chamar no WhatsApp",
    agendar: "Agendar uma conversa",
    okTitle: "Recebi sua estimativa.",
    okA: "Respondo em até 24 horas no e-mail",
    okB: "Se quiser adiantar, já pode agendar uma conversa.",
    okBtn: "Agendar uma conversa",
    errGeneric: "Não consegui enviar agora. Tente pelo WhatsApp ou agende uma conversa.",
  },
  en: {
    nome: "Your name",
    email: "Your email",
    emailHint: "This is where I'll reply.",
    mensagem: "Tell me a bit about the project",
    opcional: "(optional)",
    errNome: "Please enter your name.",
    errEmail: "Enter a valid email, like name@company.com.",
    errServico: "Pick at least one service in step 01 to send.",
    enviar: "Send estimate",
    enviando: "Sending…",
    alt: "Rather talk now?",
    whatsapp: "Message on WhatsApp",
    agendar: "Book a call",
    okTitle: "Got your estimate.",
    okA: "I'll reply within 24 hours at",
    okB: "If you want to get ahead, you can book a call now.",
    okBtn: "Book a call",
    errGeneric: "I couldn't send it right now. Try WhatsApp or book a call.",
  },
};

/** A server action responde em português; no inglês, traduz as mensagens conhecidas. */
const SERVER_ERR_EN: Record<string, string> = {
  "Nome inválido.": "Please enter your name.",
  "Email inválido.": "Enter a valid email, like name@company.com.",
  "Selecione ao menos um serviço.": "Pick at least one service in step 01 to send.",
  "Sistema de email temporariamente indisponível. Tenta o WhatsApp ou agendar uma conversa.":
    "Email is unavailable right now. Try WhatsApp or book a call.",
  "Erro ao enviar. Tenta o WhatsApp ou agendar.": "I couldn't send it right now. Try WhatsApp or book a call.",
  "Erro inesperado. Tenta o WhatsApp ou agendar.": "Something went wrong. Try WhatsApp or book a call.",
};

/** Mesma regra de e-mail da server action. */
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Formulário de envio da estimativa (etapa 05 da calculadora).
 *
 * Estados: idle → sending → success | error.
 * Envio por e-mail (server action com Resend) ou, como alternativa,
 * WhatsApp com o resumo já escrito e o link para agendar.
 */
export function EstimativaForm({ canSubmit, payload, resumoWhatsapp }: Props) {
  const { locale } = useLocale();
  const c = COPY[locale];
  const uid = useId();
  const ids = {
    nome: `${uid}-nome`, nomeErr: `${uid}-nome-erro`,
    email: `${uid}-email`, emailErr: `${uid}-email-erro`, emailHint: `${uid}-email-dica`,
    msg: `${uid}-mensagem`,
  };

  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");
  const [tried, setTried] = useState(false);

  const [nome, setNome]         = useState("");
  const [email, setEmail]       = useState("");
  const [mensagem, setMensagem] = useState("");

  const nomeRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const okRef = useRef<HTMLHeadingElement>(null);

  // Mesmas regras da server action, mostradas ao lado do campo depois da 1ª tentativa.
  const nomeErr  = tried && nome.trim().length < 2 ? c.errNome : "";
  const emailErr = tried && !EMAIL_RE.test(email) ? c.errEmail : "";

  useEffect(() => {
    if (status === "ok") okRef.current?.focus();
  }, [status]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || pending) return;
    setTried(true);
    setStatus("idle");
    setErrMsg("");

    if (nome.trim().length < 2) { nomeRef.current?.focus(); return; }
    if (!EMAIL_RE.test(email)) { emailRef.current?.focus(); return; }

    startTransition(async () => {
      const res = await enviarEstimativa({ ...payload, nome, email, mensagem });
      if (res.ok) {
        setStatus("ok");
      } else {
        setStatus("error");
        setErrMsg(locale === "pt" ? res.error : SERVER_ERR_EN[res.error] ?? c.errGeneric);
      }
    });
  }

  if (status === "ok") {
    return (
      <div role="status" className="rounded-2xl border border-ink-100 bg-bg-soft p-6 dark:border-ink-700 lg:p-10">
        <span aria-hidden className="grid size-12 place-items-center rounded-full bg-brand text-ink-50">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
        </span>
        <h3 ref={okRef} tabIndex={-1} className="t-h3 mt-6 text-fg-strong outline-none">{c.okTitle}</h3>
        <p className="t-small mt-3 max-w-[560px] text-ink-700 dark:text-ink-200">
          {c.okA} <strong className="font-semibold text-fg-strong">{email}</strong>. {c.okB}
        </p>
        <BrandButton href="/agendar" variant="escuro" className="mt-8 w-full sm:w-auto">{c.okBtn}</BrandButton>
      </div>
    );
  }

  const field =
    "block w-full rounded-xl border bg-bg-soft px-4 py-3.5 text-base text-fg-strong transition-colors " +
    "focus:border-ink-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:focus:border-ink-50";
  const ok = "border-ink-200 hover:border-ink-400 dark:border-ink-400";
  const bad = "border-brand-wine dark:border-brand-coral";
  const lbl = "t-small block font-semibold text-fg-strong";
  const err = "t-small mt-2 flex items-start gap-2 text-brand-wine dark:text-brand-coral";

  return (
    <div>
      <form onSubmit={handleSubmit} noValidate className="grid gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label htmlFor={ids.nome} className={lbl}>{c.nome}</label>
            <input
              ref={nomeRef}
              id={ids.nome}
              name="nome"
              type="text"
              autoComplete="name"
              required
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              aria-invalid={!!nomeErr}
              aria-describedby={nomeErr ? ids.nomeErr : undefined}
              className={cn(field, "mt-2", nomeErr ? bad : ok)}
            />
            {nomeErr && <p id={ids.nomeErr} className={err}><ErrIcon />{nomeErr}</p>}
          </div>
          <div>
            <label htmlFor={ids.email} className={lbl}>{c.email}</label>
            <input
              ref={emailRef}
              id={ids.email}
              name="email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailErr}
              aria-describedby={emailErr ? ids.emailErr : ids.emailHint}
              className={cn(field, "mt-2", emailErr ? bad : ok)}
            />
            {emailErr
              ? <p id={ids.emailErr} className={err}><ErrIcon />{emailErr}</p>
              : <p id={ids.emailHint} className="t-small mt-2 text-ink-700 dark:text-ink-200">{c.emailHint}</p>}
          </div>
        </div>

        <div>
          <label htmlFor={ids.msg} className={lbl}>
            {c.mensagem} <span className="font-medium text-ink-700 dark:text-ink-200">{c.opcional}</span>
          </label>
          <textarea
            id={ids.msg}
            name="mensagem"
            rows={4}
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className={cn(field, ok, "mt-2 resize-y")}
          />
        </div>

        <div aria-live="polite" className="empty:hidden">
          {!canSubmit && <p className={err}><ErrIcon />{c.errServico}</p>}
          {status === "error" && <p className={err}><ErrIcon />{errMsg}</p>}
        </div>

        <div>
          <button
            type="submit"
            disabled={!canSubmit || pending}
            className="rb-btn rb-btn--escuro w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            <span>{pending ? c.enviando : c.enviar}</span>
            <span className="rb-btn__block">
              {pending
                ? <span aria-hidden className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                : <BrandArrow />}
            </span>
          </button>
        </div>
      </form>

      {/* Alternativas ao e-mail */}
      <div className="mt-10 border-t border-ink-100 pt-8 dark:border-ink-700">
        <p className="t-small font-semibold text-fg-strong">{c.alt}</p>
        <div className="mt-5 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-6">
          <BrandButton href={waLink(resumoWhatsapp)} external variant="contorno">{c.whatsapp}</BrandButton>
          <BrandButton href="/agendar" variant="contorno">{c.agendar}</BrandButton>
        </div>
      </div>
    </div>
  );
}

function ErrIcon() {
  return (
    <svg aria-hidden width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.25} strokeLinecap="round" strokeLinejoin="round" className="mt-[3px] shrink-0">
      <circle cx="12" cy="12" r="10" /><path d="M12 8v4" /><path d="M12 16h.01" />
    </svg>
  );
}
