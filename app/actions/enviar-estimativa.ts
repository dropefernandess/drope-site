"use server";

import { Resend } from "resend";
import { SITE } from "@/lib/config";

/**
 * Server action — recebe form da Calculadora + dados da seleção e envia
 * um email completo pro Drope via Resend.
 *
 * Requer RESEND_API_KEY em env. Sem isso, retorna erro amigável.
 */

export type EstimativaPayload = {
  // Form fields
  nome: string;
  email: string;
  mensagem?: string;

  // Calculadora context (auto-anexado)
  servicos: string[];      // labels
  escopo: string;          // label
  prazo: string;           // label
  addons: string[];        // labels
  faixaMin: number;
  faixaMax: number;
};

export type EstimativaResult =
  | { ok: true; id: string }
  | { ok: false; error: string };

export async function enviarEstimativa(
  payload: EstimativaPayload
): Promise<EstimativaResult> {
  // Validação básica
  if (!payload.nome?.trim() || payload.nome.length < 2) {
    return { ok: false, error: "Nome inválido." };
  }
  if (!payload.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    return { ok: false, error: "Email inválido." };
  }
  if (payload.servicos.length === 0) {
    return { ok: false, error: "Selecione ao menos um serviço." };
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[enviarEstimativa] RESEND_API_KEY não configurada");
    return {
      ok: false,
      error: "Sistema de email temporariamente indisponível. Tenta o WhatsApp ou agendar uma conversa.",
    };
  }

  const resend = new Resend(apiKey);

  const fmtMoeda = (n: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 }).format(n);

  // Email HTML clean
  const html = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 560px; margin: 0 auto; color: #101010; background: #F2F2EB; padding: 32px;">
      <h1 style="font-size: 22px; font-weight: 600; margin: 0 0 8px; color: #DE2828;">Nova estimativa via calculadora</h1>
      <p style="font-size: 14px; color: #3D3D3D; margin: 0 0 24px;">Lead chegou pela /calculadora do site.</p>

      <div style="background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
        <p style="font-size: 11px; color: #7D7D7D; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 8px;">CONTATO</p>
        <p style="font-size: 18px; font-weight: 600; margin: 0 0 4px;">${escape(payload.nome)}</p>
        <p style="font-size: 14px; color: #3D3D3D; margin: 0;"><a href="mailto:${escape(payload.email)}" style="color: #DE2828;">${escape(payload.email)}</a></p>
      </div>

      <div style="background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
        <p style="font-size: 11px; color: #7D7D7D; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">FAIXA ESTIMADA</p>
        <p style="font-size: 28px; font-weight: 700; margin: 0 0 4px; color: #DE2828;">${fmtMoeda(payload.faixaMin)} – ${fmtMoeda(payload.faixaMax)}</p>
        <p style="font-size: 12px; color: #7D7D7D; margin: 0;">Variação ±10% sobre escopo/prazo combinados</p>
      </div>

      <div style="background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
        <p style="font-size: 11px; color: #7D7D7D; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">SELEÇÃO</p>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr>
            <td style="padding: 6px 0; color: #7D7D7D;">Serviços</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 500;">${payload.servicos.map(escape).join(", ")}</td>
          </tr>
          <tr style="border-top: 1px solid #eee;">
            <td style="padding: 6px 0; color: #7D7D7D;">Escopo</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 500;">${escape(payload.escopo)}</td>
          </tr>
          <tr style="border-top: 1px solid #eee;">
            <td style="padding: 6px 0; color: #7D7D7D;">Prazo</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 500;">${escape(payload.prazo)}</td>
          </tr>
          ${payload.addons.length ? `
          <tr style="border-top: 1px solid #eee;">
            <td style="padding: 6px 0; color: #7D7D7D;">Adicionais</td>
            <td style="padding: 6px 0; text-align: right; font-weight: 500;">${payload.addons.map(escape).join(", ")}</td>
          </tr>` : ""}
        </table>
      </div>

      ${payload.mensagem?.trim() ? `
      <div style="background: #fff; border-radius: 12px; padding: 20px; margin-bottom: 16px;">
        <p style="font-size: 11px; color: #7D7D7D; text-transform: uppercase; letter-spacing: 0.08em; margin: 0 0 12px;">MENSAGEM</p>
        <p style="font-size: 14px; color: #101010; margin: 0; white-space: pre-wrap; line-height: 1.5;">${escape(payload.mensagem)}</p>
      </div>` : ""}

      <p style="font-size: 12px; color: #A6A6A6; text-align: center; margin-top: 24px;">Responda direto pra ${escape(payload.email)} ou no WhatsApp do contato.</p>
    </div>
  `;

  try {
    const { data, error } = await resend.emails.send({
      from: `Calculadora Dropê <onboarding@resend.dev>`, // ⚠ trocar pra noreply@dropefernandes.com após verificar domínio
      to: [SITE.contactEmail],
      replyTo: payload.email,
      subject: `Nova estimativa — ${payload.nome} (${fmtMoeda(payload.faixaMin)}–${fmtMoeda(payload.faixaMax)})`,
      html,
    });

    if (error) {
      console.error("[enviarEstimativa] Resend error:", error);
      return { ok: false, error: "Erro ao enviar. Tenta o WhatsApp ou agendar." };
    }

    return { ok: true, id: data?.id ?? "" };
  } catch (e) {
    console.error("[enviarEstimativa] Exception:", e);
    return { ok: false, error: "Erro inesperado. Tenta o WhatsApp ou agendar." };
  }
}

// HTML escape pra prevenir XSS via reply-to text injection
function escape(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
