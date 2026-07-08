"use server";

import { Resend } from "resend";
import { SITE } from "@/lib/config";
import {
  BRIEFING_BLOCKS,
  BRIEFING_FIELDS,
  BRIEFING_TOTAL,
  formatAnswer,
  isFilled,
  type AnswerValue,
} from "@/content/briefing-biscoitos";

/**
 * Server action — recebe as respostas do briefing da marca de biscoitos
 * e envia por e-mail via Resend (mesma infra da calculadora).
 *
 * O client manda answers (por id) + otros (texto dos chips "Outro"). As
 * perguntas e os tipos vêm do conteúdo canônico aqui no server, então o
 * browser não injeta pergunta falsa. Requer RESEND_API_KEY em env.
 */

export type BriefingPayload = {
  answers: Record<string, AnswerValue>;
  otros?: Record<string, string>;
  /** Honeypot — humano nunca preenche; bot preenche e é descartado. */
  docinho?: string;
};

export type BriefingResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

const MAX_LEN = 8000; // teto por resposta de texto

export async function enviarBriefing(
  payload: BriefingPayload
): Promise<BriefingResult> {
  // Honeypot preenchido = bot. Finge sucesso pra não dar sinal.
  if (payload.docinho?.trim()) {
    return { ok: true, id: "ok" };
  }

  const answers = (payload.answers && typeof payload.answers === "object")
    ? payload.answers
    : {};
  const otros = (payload.otros && typeof payload.otros === "object")
    ? payload.otros
    : {};

  // Sanitiza: só ids conhecidos, com teto de tamanho
  const clean: Record<string, AnswerValue> = {};
  const cleanOtros: Record<string, string> = {};
  for (const f of BRIEFING_FIELDS) {
    const v = answers[f.id];
    if (typeof v === "string") clean[f.id] = v.slice(0, MAX_LEN);
    else if (Array.isArray(v)) clean[f.id] = v.filter((x) => typeof x === "string").slice(0, 40);
    const o = otros[f.id];
    if (typeof o === "string") cleanOtros[f.id] = o.slice(0, MAX_LEN);
  }

  const preenchidas = BRIEFING_FIELDS.filter((f) =>
    isFilled(f, clean[f.id], cleanOtros[f.id])
  ).length;
  if (preenchidas === 0) {
    return { ok: false, error: "Preencha ao menos uma resposta antes de enviar." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[enviarBriefing] RESEND_API_KEY não configurada");
    return {
      ok: false,
      error:
        "O envio automático está fora do ar. Use o botão 'Copiar respostas' e mande pelo WhatsApp.",
    };
  }

  const resend = new Resend(apiKey);

  // ---- E-mail com a estética da marca (creme + rosé) ----
  let numero = 0;
  const blocosHtml = BRIEFING_BLOCKS.map((bloco) => {
    const qsHtml = bloco.qs
      .map((field) => {
        numero++;
        const resp = formatAnswer(field, clean[field.id], cleanOtros[field.id]);
        return `
          <div style="background:#FCFAF4;border:1px solid #E3DBCB;border-radius:12px;padding:16px 18px;margin-top:12px;">
            <p style="font-size:13px;font-weight:600;color:#3A362E;margin:0 0 8px;line-height:1.5;">
              <span style="color:#A67878;">${numero}.</span> ${escapeHtml(field.label)}
            </p>
            <p style="font-size:14px;color:${resp ? "#3A362E" : "#B9B2A3"};margin:0;white-space:pre-wrap;line-height:1.6;${resp ? "" : "font-style:italic;"}">
              ${resp ? escapeHtml(resp) : "(em branco)"}
            </p>
          </div>`;
      })
      .join("");

    return `
      <div style="margin-top:32px;">
        <p style="font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#C2A15B;margin:0 0 4px;">${escapeHtml(bloco.n)}</p>
        <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:20px;font-weight:500;color:#3A362E;margin:0 0 4px;">${escapeHtml(bloco.t)}</h2>
        ${qsHtml}
      </div>`;
  }).join("");

  const html = `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:640px;margin:0 auto;background:#F6F1E7;padding:32px 24px;color:#3A362E;">
      <p style="font-size:11px;letter-spacing:.28em;text-transform:uppercase;color:#A67878;margin:0 0 10px;text-align:center;">Questionário de briefing</p>
      <h1 style="font-family:Georgia,'Times New Roman',serif;font-weight:400;font-size:28px;margin:0 0 6px;text-align:center;color:#3A362E;">
        Respostas do briefing — <em style="color:#A67878;">Marca de Biscoitos</em>
      </h1>
      <p style="font-size:13px;color:#6B655A;text-align:center;margin:0 0 8px;">
        ${preenchidas} de ${BRIEFING_TOTAL} perguntas respondidas
      </p>
      ${blocosHtml}
      <p style="font-size:12px;color:#B9B2A3;text-align:center;margin-top:32px;font-style:italic;">
        Enviado pelo formulário em dropefernandes.com/briefing 💛
      </p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: `Briefing Biscoitos <noreply@dropefernandes.com>`, // domínio verificado no Resend
      to: [SITE.contactEmail],
      subject: "Respostas do briefing — Marca de Biscoitos",
      html,
    });

    if (error) {
      console.error("[enviarBriefing] Resend error:", error);
      return {
        ok: false,
        error: "Não consegui enviar agora. Tente de novo ou use 'Copiar respostas'.",
      };
    }

    return { ok: true, id: data?.id ?? "" };
  } catch (e) {
    console.error("[enviarBriefing] Exception:", e);
    return {
      ok: false,
      error: "Erro inesperado. Tente de novo ou use 'Copiar respostas'.",
    };
  }
}

// HTML escape — as respostas viram HTML no e-mail
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
