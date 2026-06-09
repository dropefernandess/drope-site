"use client";

import { useState, useTransition } from "react";
import { LocalLink as Link } from "@/components/i18n/LocalLink";
import { ArrowUpRight, Mail, MessageCircle, Loader2, Check, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { enviarEstimativa, type EstimativaPayload } from "@/app/actions/enviar-estimativa";
import { waLink } from "@/lib/config";

type Props = {
  /** Pra desabilitar tudo se a calc não tiver seleção válida */
  canSubmit: boolean;
  /** Resumo + contexto pra anexar no email */
  payload: Omit<EstimativaPayload, "nome" | "email" | "mensagem">;
  /** Pra montar mensagem do WhatsApp */
  resumoWhatsapp: string;
};

/**
 * Form de envio de estimativa.
 *
 * Estados: idle → form aberto → sending → success | error.
 * 2 CTAs: enviar por email (Resend) ou continuar no WhatsApp.
 */
export function EstimativaForm({ canSubmit, payload, resumoWhatsapp }: Props) {
  const [open, setOpen] = useState(false);
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");
  const [errMsg, setErrMsg] = useState("");

  const [nome, setNome]         = useState("");
  const [email, setEmail]       = useState("");
  const [mensagem, setMensagem] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");
    setErrMsg("");

    startTransition(async () => {
      const res = await enviarEstimativa({ ...payload, nome, email, mensagem });
      if (res.ok) {
        setStatus("ok");
      } else {
        setStatus("error");
        setErrMsg(res.error);
      }
    });
  }

  return (
    <div className="flex flex-col gap-3">
      {/* BOTÃO PRINCIPAL */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          disabled={!canSubmit}
          className={`group flex w-full items-center justify-center gap-2 rounded-pill px-5 py-4 text-sm font-semibold transition ${
            canSubmit
              ? "bg-fg-strong text-bg hover:opacity-90"
              : "bg-surface-2 text-fg-mute cursor-not-allowed"
          }`}
        >
          Enviar estimativa
          <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={2.5} />
        </button>
      )}

      {/* FORM EXPANDIDO */}
      <AnimatePresence>
        {open && status !== "ok" && (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 rounded-card border border-line bg-bg p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-semibold text-fg-strong">Quase lá</p>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-fg-mute hover:text-fg-strong transition"
                  aria-label="Fechar"
                >
                  <XIcon className="size-4" strokeWidth={2} />
                </button>
              </div>

              <input
                type="text"
                required
                placeholder="Seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="rounded-card border border-line bg-bg-soft px-4 py-3 text-sm text-fg-strong placeholder:text-fg-faint outline-none focus:border-brand transition"
              />
              <input
                type="email"
                required
                placeholder="Seu melhor email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-card border border-line bg-bg-soft px-4 py-3 text-sm text-fg-strong placeholder:text-fg-faint outline-none focus:border-brand transition"
              />
              <textarea
                rows={3}
                placeholder="Conta um pouco sobre o projeto (opcional)"
                value={mensagem}
                onChange={(e) => setMensagem(e.target.value)}
                className="rounded-card border border-line bg-bg-soft px-4 py-3 text-sm text-fg-strong placeholder:text-fg-faint outline-none focus:border-brand transition resize-none"
              />

              {status === "error" && (
                <p className="text-xs text-brand font-medium px-1">{errMsg}</p>
              )}

              <button
                type="submit"
                disabled={pending}
                className="group inline-flex items-center justify-center gap-2 rounded-pill bg-brand px-5 py-3 text-sm font-semibold text-brand-fg hover:bg-brand-deep transition disabled:opacity-60"
              >
                {pending ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Enviando…
                  </>
                ) : (
                  <>
                    <Mail className="size-4" strokeWidth={2.5} /> Enviar pro Drope
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 my-1">
                <div className="flex-1 h-px bg-line" />
                <span className="text-[11px] text-fg-faint uppercase tracking-wider">ou</span>
                <div className="flex-1 h-px bg-line" />
              </div>

              <Link
                href={waLink(resumoWhatsapp)}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center justify-center gap-2 rounded-pill border border-line bg-bg-soft px-5 py-3 text-sm font-semibold text-fg-strong hover:bg-surface transition"
              >
                <MessageCircle className="size-4 text-[#25D366]" strokeWidth={2.5} />
                Continuar no WhatsApp
              </Link>
              <Link
                href="/agendar"
                className="text-center text-xs text-fg-mute hover:text-fg-strong transition"
              >
                Prefere agendar uma conversa? →
              </Link>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* SUCCESS */}
      <AnimatePresence>
        {status === "ok" && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-3 rounded-card border border-status/30 bg-status/5 p-5 text-center"
          >
            <div className="mx-auto size-10 rounded-full bg-status/15 flex items-center justify-center">
              <Check className="size-5 text-status" strokeWidth={2.5} />
            </div>
            <p className="text-sm font-semibold text-fg-strong">Estimativa enviada</p>
            <p className="text-xs text-fg-body">
              Vou responder em até 24h pro <strong className="text-fg-strong">{email}</strong>.
              Enquanto isso, se quiser adiantar:
            </p>
            <Link
              href="/agendar"
              className="inline-flex items-center justify-center gap-2 rounded-pill bg-fg-strong px-4 py-2.5 text-xs font-semibold text-bg hover:opacity-90 transition mt-1"
            >
              Agendar 30 min agora
              <ArrowUpRight className="size-3.5" strokeWidth={2.5} />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
