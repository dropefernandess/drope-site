/**
 * Regras da agenda própria do site (substitui o Cal.com quando as credenciais
 * do Google estão configuradas; ver lib/agenda/google.ts e .env.example).
 *
 * Tudo em horário de Brasília. O Brasil não tem horário de verão desde 2019,
 * então o fuso é fixo em UTC-3.
 */
export const AGENDA = {
  /** Duração da conversa, em minutos. */
  duracaoMin: 30,
  /** De quanto em quanto tempo aparece um horário, em minutos. */
  passoMin: 30,
  /** Dias da semana com horário (0 = domingo, 6 = sábado). */
  dias: [1, 2, 3, 4, 5],
  /** Janelas do dia, em horário de Brasília (a pausa do almoço fica de fora). */
  janelas: [
    ["10:00", "12:00"],
    ["14:00", "17:00"],
  ] as [string, string][],
  /** Antecedência mínima para agendar, em horas. */
  antecedenciaHoras: 12,
  /** Até quantos dias à frente a agenda abre. */
  diasAFrente: 30,
  /** Fuso de Brasília (fixo). */
  offset: "-03:00",
  timeZone: "America/Sao_Paulo",
};
