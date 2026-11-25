import { AGENDA } from "./config";

/** Intervalo ocupado na agenda (ISO). */
export type Busy = { start: string; end: string };

const pad = (n: number) => String(n).padStart(2, "0");
const HORA = 3600e3;
const DIA = 86400e3;

/** Data (YYYY-MM-DD) em horário de Brasília. */
export function ymdBR(d: Date): string {
  const t = new Date(d.getTime() - 3 * HORA);
  return `${t.getUTCFullYear()}-${pad(t.getUTCMonth() + 1)}-${pad(t.getUTCDate())}`;
}

/** Soma dias a uma data YYYY-MM-DD. */
export function addDays(ymd: string, n: number): string {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Início do dia (YYYY-MM-DD) em Brasília, como ISO. */
export function inicioDoDiaBR(ymd: string): string {
  return new Date(`${ymd}T00:00:00${AGENDA.offset}`).toISOString();
}

/**
 * Horários livres entre duas datas (inclusive), já sem os intervalos
 * ocupados, sem o que estiver antes da antecedência mínima e sem o que passar
 * da janela de dias à frente. Devolve o início de cada horário em ISO (UTC).
 */
export function horariosLivres(from: string, to: string, busy: Busy[], now = new Date()): string[] {
  const out: string[] = [];
  const dur = AGENDA.duracaoMin * 60e3;
  const passo = AGENDA.passoMin * 60e3;
  const minStart = now.getTime() + AGENDA.antecedenciaHoras * HORA;
  const maxStart = now.getTime() + AGENDA.diasAFrente * DIA;
  const ocupado = busy.map((b) => [Date.parse(b.start), Date.parse(b.end)] as const);
  for (let day = from; day <= to; day = addDays(day, 1)) {
    const semana = new Date(`${day}T12:00:00Z`).getUTCDay();
    if (!AGENDA.dias.includes(semana)) continue;
    for (const [a, z] of AGENDA.janelas) {
      const fim = Date.parse(`${day}T${z}:00${AGENDA.offset}`);
      for (let t = Date.parse(`${day}T${a}:00${AGENDA.offset}`); t + dur <= fim; t += passo) {
        if (t < minStart || t > maxStart) continue;
        const e = t + dur;
        if (ocupado.some(([bs, be]) => t < be && e > bs)) continue;
        out.push(new Date(t).toISOString());
      }
    }
  }
  return out;
}
