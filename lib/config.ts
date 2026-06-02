/**
 * Configuração centralizada — só atualizar aqui se mudar email/whatsapp/etc.
 */

export const SITE = {
  /** Email principal de contato (Resend envia DE noreply, mas chega aqui) */
  contactEmail: "contato@dropefernandes.com",

  /** WhatsApp em formato internacional (55 + DDD + número), sem espaços */
  whatsapp: "5532998057750",

  /** Cal.com handle pra agendamento */
  calLink: "drope/30min",

  /** URL pública canônica (atualizada quando dropefernandes.com propagar) */
  url: "https://dropefernandes.com",
} as const;

/**
 * Gera URL do WhatsApp com mensagem pré-preenchida.
 * Uso: <a href={waLink("Oi! Vim da calculadora...")} target="_blank">
 */
export function waLink(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsapp}?text=${encoded}`;
}
