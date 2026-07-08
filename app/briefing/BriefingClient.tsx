"use client";

import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import {
  BRIEFING_BLOCKS,
  BRIEFING_FIELDS,
  BRIEFING_TOTAL,
  OUTRO,
  formatAnswer,
  isFilled,
  type BriefingField,
  type AnswerValue,
} from "@/content/briefing-biscoitos";
import { enviarBriefing } from "@/app/actions/enviar-briefing";

/**
 * Formulário de briefing — versão da marca de biscoitos (mãe do Pedro).
 *
 * Perguntas difíceis viram múltipla escolha (chips) pra não ficar
 * monótono e ajudar quem está começando do zero. Sempre com "Outro"
 * livre. Envio REAL por e-mail via server action + Resend.
 *
 *  - localStorage (chave v2, guarda answers + otros) pra não perder nada
 *  - Tela de "Enviado com sucesso 💛" + erro com fallback (copiar/baixar)
 *  - Chips acessíveis: <input radio/checkbox> real + <label>, foco visível
 *  - Honeypot anti-bot invisível
 *
 * CSS do HTML original escopado sob .bb — a paleta pastel não vaza pros
 * tokens do site Dropê.
 */

const KEY = "briefing_biscoitos_v2";

type Status = "idle" | "sending" | "ok" | "error";
type Answers = Record<string, AnswerValue>;
type Otros = Record<string, string>;

export function BriefingClient() {
  const [answers, setAnswers] = useState<Answers>({});
  const [otros, setOtros] = useState<Otros>({});
  const [status, setStatus] = useState<Status>("idle");
  const [errMsg, setErrMsg] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [copied, setCopied] = useState(false);
  const honeyRef = useRef<HTMLInputElement>(null);
  const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [pending, startTransition] = useTransition();

  // ---- localStorage: carrega no mount ----
  useEffect(() => {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "{}");
      if (raw && typeof raw === "object") {
        if (raw.answers && typeof raw.answers === "object") setAnswers(raw.answers);
        if (raw.otros && typeof raw.otros === "object") setOtros(raw.otros);
      }
    } catch {}
  }, []);

  const persist = useCallback((nextAnswers: Answers, nextOtros: Otros) => {
    try {
      localStorage.setItem(KEY, JSON.stringify({ answers: nextAnswers, otros: nextOtros }));
    } catch {}
    setSavedFlash(true);
    if (flashTimer.current) clearTimeout(flashTimer.current);
    flashTimer.current = setTimeout(() => setSavedFlash(false), 1600);
  }, []);

  // ---- setters por tipo ----
  const setText = (id: string, value: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      persist(next, otros);
      return next;
    });
  };

  const setSingle = (id: string, opt: string) => {
    setAnswers((prev) => {
      const next = { ...prev, [id]: opt };
      persist(next, otros);
      return next;
    });
  };

  const toggleMulti = (id: string, opt: string) => {
    setAnswers((prev) => {
      const cur = Array.isArray(prev[id]) ? (prev[id] as string[]) : [];
      const has = cur.includes(opt);
      const arr = has ? cur.filter((o) => o !== opt) : [...cur, opt];
      const next = { ...prev, [id]: arr };
      persist(next, otros);
      return next;
    });
  };

  const setOther = (id: string, value: string) => {
    setOtros((prev) => {
      const next = { ...prev, [id]: value };
      persist(answers, next);
      return next;
    });
  };

  const filled = BRIEFING_FIELDS.filter((f) =>
    isFilled(f, answers[f.id], otros[f.id])
  ).length;
  const pct = Math.round((filled / BRIEFING_TOTAL) * 100);

  // ---- texto plano (copiar / baixar) ----
  const buildText = () => {
    let out = "RESPOSTAS DO BRIEFING — MARCA DE BISCOITOS\n\n";
    BRIEFING_FIELDS.forEach((f, i) => {
      const resp = formatAnswer(f, answers[f.id], otros[f.id]) || "(em branco)";
      out += `${i + 1}. ${f.label}\n> ${resp}\n\n`;
    });
    return out;
  };

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      alert("Não consegui copiar automaticamente. Use o botão 'Baixar arquivo'.");
    }
  };

  const onDownload = () => {
    const blob = new Blob([buildText()], { type: "text/plain;charset=utf-8" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "briefing-biscoitos.txt";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const onSend = () => {
    if (filled === 0) {
      setStatus("error");
      setErrMsg("Responda ao menos uma pergunta antes de enviar. 💛");
      return;
    }
    setStatus("sending");
    setErrMsg("");
    startTransition(async () => {
      const res = await enviarBriefing({
        answers,
        otros,
        docinho: honeyRef.current?.value,
      });
      if (res.ok) {
        setStatus("ok");
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
      } else {
        setStatus("error");
        setErrMsg(res.error);
      }
    });
  };

  let numero = 0;

  return (
    <div className="bb" style={{ colorScheme: "light" }}>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />

      {/* Progress sticky */}
      <div className="bb-progress-shell">
        <div className="bb-progress-inner">
          <div
            className="bb-bar"
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Progresso do questionário"
          >
            <div className="bb-fill" style={{ width: pct + "%" }} />
          </div>
          <div className="bb-pct">
            {filled} de {BRIEFING_TOTAL} · {pct}%
          </div>
        </div>
      </div>

      <header className="bb-header">
        <p className="bb-eyebrow">Questionário de briefing</p>
        <h1>
          Vamos criar
          <br />a sua <em>marca</em>
        </h1>
        <p className="bb-sub">
          Responda com calma, do jeitinho que você pensa. Não existe resposta
          errada — quanto mais sentimento e detalhe, mais a marca vai ficar com
          a sua cara. Suas respostas ficam salvas neste aparelho enquanto você
          preenche.
        </p>
      </header>

      <div className="bb-wrap">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSend();
          }}
        >
          {/* honeypot — invisível pra humanos, irresistível pra bots */}
          <input
            ref={honeyRef}
            type="text"
            name="docinho"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="bb-honey"
          />

          {BRIEFING_BLOCKS.map((block) => (
            <section className="bb-block" key={block.n}>
              <div className="bb-block-head">
                <span className="bb-block-num">{block.n}</span>
                <h2 className="bb-block-title">{block.t}</h2>
              </div>
              <p className="bb-block-note">{block.note}</p>
              {block.qs.map((field) => {
                const i = numero++;
                return (
                  <Field
                    key={field.id}
                    field={field}
                    n={i + 1}
                    value={answers[field.id]}
                    other={otros[field.id] || ""}
                    onText={setText}
                    onSingle={setSingle}
                    onToggle={toggleMulti}
                    onOther={setOther}
                  />
                );
              })}
            </section>
          ))}

          {/* Ações / status */}
          <div className="bb-actions" aria-live="polite">
            {status === "ok" ? (
              <>
                <h3>Enviado com sucesso 💛</h3>
                <p>
                  Suas respostas chegaram direitinho no e-mail do Pedro. Pode
                  fechar esta página — e obrigado por cada detalhe que você
                  compartilhou.
                </p>
                <div className="bb-btn-row">
                  <button type="button" className="bb-btn-ghost" onClick={onDownload}>
                    Baixar uma cópia
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Terminou? 💛</h3>
                <p>
                  É só tocar em enviar que as respostas chegam por e-mail. Se
                  quiser, pode parar e voltar depois — fica tudo salvo.
                </p>
                {status === "error" && <p className="bb-error">{errMsg}</p>}
                <div className="bb-btn-row">
                  <button
                    type="submit"
                    className="bb-btn-primary"
                    disabled={pending || status === "sending"}
                  >
                    {pending || status === "sending" ? "Enviando…" : "Enviar respostas"}
                  </button>
                  <button type="button" className="bb-btn-ghost" onClick={onCopy}>
                    {copied ? "Copiado! ✓" : "Copiar respostas"}
                  </button>
                  <button type="button" className="bb-btn-ghost" onClick={onDownload}>
                    Baixar arquivo
                  </button>
                </div>
                <div className={`bb-saved-tag ${savedFlash ? "show" : ""}`}>
                  <span className="bb-dot" /> Progresso salvo automaticamente
                </div>
              </>
            )}
          </div>
        </form>

        <p className="bb-foot-note">Feito com carinho para a marca da mamãe.</p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────
// Campo individual — renderiza text / single / multi
// ─────────────────────────────────────────────────────────────────────

function Field({
  field,
  n,
  value,
  other,
  onText,
  onSingle,
  onToggle,
  onOther,
}: {
  field: BriefingField;
  n: number;
  value: AnswerValue;
  other: string;
  onText: (id: string, v: string) => void;
  onSingle: (id: string, opt: string) => void;
  onToggle: (id: string, opt: string) => void;
  onOther: (id: string, v: string) => void;
}) {
  const labelId = `${field.id}-label`;

  // ---- TEXT ----
  if (field.type === "text") {
    return (
      <div className="bb-q">
        <label className="bb-q-label" htmlFor={field.id}>
          <span className="bb-q-num">{n}.</span>
          {field.label}
        </label>
        <textarea
          id={field.id}
          value={typeof value === "string" ? value : ""}
          onChange={(e) => onText(field.id, e.target.value)}
          placeholder={field.placeholder || "Escreva aqui…"}
          rows={3}
        />
        <div className="bb-q-under">
          <span>Pode escrever à vontade</span>
        </div>
      </div>
    );
  }

  // ---- SINGLE / MULTI ----
  const isMulti = field.type === "multi";
  const selectedArr = Array.isArray(value) ? value : [];
  const selectedSingle = typeof value === "string" ? value : "";
  const otherOn = isMulti ? selectedArr.includes(OUTRO) : selectedSingle === OUTRO;

  const isChecked = (opt: string) =>
    isMulti ? selectedArr.includes(opt) : selectedSingle === opt;

  return (
    <div className="bb-q">
      <p className="bb-q-label" id={labelId}>
        <span className="bb-q-num">{n}.</span>
        {field.label}
      </p>
      <div
        className="bb-chips"
        role={isMulti ? "group" : "radiogroup"}
        aria-labelledby={labelId}
      >
        {field.options.map((opt) => {
          const checked = isChecked(opt);
          return (
            <label key={opt} className={`bb-chip${checked ? " is-checked" : ""}`}>
              <input
                type={isMulti ? "checkbox" : "radio"}
                name={field.id}
                value={opt}
                checked={checked}
                onChange={() =>
                  isMulti ? onToggle(field.id, opt) : onSingle(field.id, opt)
                }
              />
              <span>{opt}</span>
            </label>
          );
        })}
        {field.allowOther && (
          <label className={`bb-chip${otherOn ? " is-checked" : ""}`}>
            <input
              type={isMulti ? "checkbox" : "radio"}
              name={field.id}
              value={OUTRO}
              checked={otherOn}
              onChange={() =>
                isMulti ? onToggle(field.id, OUTRO) : onSingle(field.id, OUTRO)
              }
            />
            <span>Outro…</span>
          </label>
        )}
      </div>
      {field.allowOther && otherOn && (
        <input
          type="text"
          className="bb-other"
          value={other}
          onChange={(e) => onOther(field.id, e.target.value)}
          placeholder="Conta aqui…"
          aria-label="Outro — especifique"
        />
      )}
    </div>
  );
}

/* Stylesheet do HTML original, escopado sob .bb (paleta da marca de
   biscoitos fica contida — não vaza pros tokens do site Dropê). */
const CSS = `
.bb{
  --cream:#F6F1E7; --paper:#FCFAF4; --ink:#3A362E; --ink-soft:#6B655A;
  --rose:#C9A0A0; --rose-deep:#A67878; --sage:#9CA891; --gold:#C2A15B;
  --line:#E3DBCB; --radius:14px;
  background:var(--cream); color:var(--ink);
  font-family:var(--font-inter),'Inter',sans-serif;
  line-height:1.65; min-height:100vh;
  -webkit-font-smoothing:antialiased;
}
.bb :focus-visible{ outline:2px solid var(--rose-deep); outline-offset:2px; border-radius:4px; }
.bb-wrap{max-width:720px;margin:0 auto;padding:0 20px 80px}

.bb-header{text-align:center;padding:64px 20px 40px}
.bb-eyebrow{font-size:12px;letter-spacing:.28em;text-transform:uppercase;color:var(--rose-deep);font-weight:500;margin:0 0 18px}
.bb-header h1{
  font-family:var(--font-fraunces),'Fraunces',Georgia,serif;font-weight:400;
  font-size:clamp(34px,6vw,52px);line-height:1.08;margin:0 0 18px;color:var(--ink);
}
.bb-header h1 em{font-style:italic;color:var(--rose-deep)}
.bb-sub{font-size:16px;color:var(--ink-soft);max-width:460px;margin:0 auto}

.bb-progress-shell{
  position:sticky;top:0;z-index:20;background:rgba(246,241,231,.92);
  backdrop-filter:blur(8px);padding:14px 20px;border-bottom:1px solid var(--line);
}
.bb-progress-inner{max-width:720px;margin:0 auto;display:flex;align-items:center;gap:14px}
.bb-bar{flex:1;height:6px;background:var(--line);border-radius:99px;overflow:hidden}
.bb-fill{height:100%;width:0;background:var(--rose-deep);border-radius:99px;transition:width .4s ease}
.bb-pct{font-size:13px;color:var(--ink-soft);font-variant-numeric:tabular-nums;min-width:88px;text-align:right}

.bb-block{margin-top:52px}
.bb-block-head{display:flex;align-items:baseline;gap:14px;margin-bottom:8px;padding-bottom:16px;border-bottom:1px solid var(--line)}
.bb-block-num{font-family:var(--font-fraunces),'Fraunces',Georgia,serif;font-size:15px;color:var(--gold);font-weight:500;letter-spacing:.05em}
.bb-block-title{font-family:var(--font-fraunces),'Fraunces',Georgia,serif;font-size:24px;font-weight:500;margin:0;color:var(--ink)}
.bb-block-note{font-size:14px;color:var(--ink-soft);font-style:italic;margin:14px 0 4px}

.bb-q{
  background:var(--paper);border:1px solid var(--line);border-radius:var(--radius);
  padding:22px 22px 20px;margin-top:18px;transition:border-color .25s, box-shadow .25s;
}
.bb-q:focus-within{border-color:var(--rose);box-shadow:0 4px 20px rgba(166,120,120,.10)}
.bb-q-label{display:block;font-size:15.5px;font-weight:500;margin:0 0 14px;color:var(--ink);line-height:1.5}
.bb-q-num{color:var(--rose-deep);font-family:var(--font-fraunces),'Fraunces',Georgia,serif;margin-right:8px}
.bb-q textarea{
  width:100%;border:none;background:transparent;resize:vertical;
  font-family:var(--font-inter),'Inter',sans-serif;font-size:15px;color:var(--ink);
  line-height:1.6;min-height:64px;outline:none;padding:0;
}
.bb-q textarea::placeholder{color:#B9B2A3}
.bb-q-under{border-top:1px dashed var(--line);margin-top:10px;padding-top:8px;font-size:12.5px;color:#B9B2A3;display:flex;justify-content:space-between}

/* Chips (single/multi) */
.bb-chips{display:flex;flex-wrap:wrap;gap:9px}
.bb-chip{
  position:relative;display:inline-flex;align-items:center;
  padding:9px 15px;border:1px solid var(--line);border-radius:99px;
  background:var(--cream);font-size:14px;color:var(--ink);cursor:pointer;
  transition:background .18s, border-color .18s, color .18s;user-select:none;line-height:1.35;
}
.bb-chip:hover{border-color:var(--rose)}
.bb-chip.is-checked{background:var(--rose-deep);border-color:var(--rose-deep);color:#fff}
.bb-chip:focus-within{outline:2px solid var(--rose-deep);outline-offset:2px}
.bb-chip input{position:absolute;opacity:0;width:1px;height:1px;margin:0}
.bb-other{
  width:100%;margin-top:14px;border:none;border-bottom:1px solid var(--rose);
  background:transparent;font-family:var(--font-inter),'Inter',sans-serif;
  font-size:15px;color:var(--ink);line-height:1.6;padding:6px 2px;outline:none;
}
.bb-other::placeholder{color:#B9B2A3}

.bb-actions{
  margin-top:56px;padding:32px;background:var(--paper);
  border:1px solid var(--line);border-radius:var(--radius);text-align:center;
}
.bb-actions h3{font-family:var(--font-fraunces),'Fraunces',Georgia,serif;font-weight:500;font-size:22px;margin:0 0 8px}
.bb-actions p{font-size:14.5px;color:var(--ink-soft);margin:0 auto 24px;max-width:420px}
.bb-error{color:var(--rose-deep);font-weight:500;font-size:14px !important}
.bb-btn-row{display:flex;flex-wrap:wrap;gap:12px;justify-content:center}
.bb button{
  font-family:var(--font-inter),'Inter',sans-serif;font-size:14.5px;font-weight:500;
  padding:13px 24px;border-radius:99px;cursor:pointer;border:1px solid transparent;
  transition:transform .15s, background .2s, opacity .2s;
}
.bb button:active{transform:translateY(1px)}
.bb button:disabled{opacity:.6;cursor:default}
.bb-btn-primary{background:var(--rose-deep);color:#fff}
.bb-btn-primary:hover:not(:disabled){background:#946868}
.bb-btn-ghost{background:transparent;color:var(--ink);border-color:var(--line)}
.bb-btn-ghost:hover{border-color:var(--rose)}
.bb-saved-tag{
  display:inline-flex;align-items:center;gap:7px;font-size:13px;color:var(--sage);
  margin-top:18px;opacity:0;transition:opacity .3s;
}
.bb-saved-tag.show{opacity:1}
.bb-dot{width:7px;height:7px;border-radius:99px;background:var(--sage)}
.bb-foot-note{text-align:center;font-size:13px;color:var(--ink-soft);margin-top:34px;font-style:italic}

.bb-honey{position:absolute;left:-9999px;width:1px;height:1px;opacity:0;pointer-events:none}

@media (max-width:520px){
  .bb-header{padding:44px 12px 28px}
  .bb-q{padding:18px}
  .bb-actions{padding:24px 18px}
}
`;
