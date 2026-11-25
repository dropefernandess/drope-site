/**
 * Conexão da agenda própria com o Google Agenda (só no servidor).
 *
 * Usa OAuth com refresh token da conta Google do Pedro (a do Google Agenda que ele usa):
 *  - lê os horários ocupados (freeBusy) da agenda principal e de outras
 *    agendas opcionais (GOOGLE_BUSY_CALENDARS);
 *  - cria o evento com link do Google Meet e manda o convite ao cliente
 *    (sendUpdates=all).
 *
 * Variáveis (ver .env.example): GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET,
 * GOOGLE_REFRESH_TOKEN, GOOGLE_CALENDAR_ID (opcional, padrão "primary") e
 * GOOGLE_BUSY_CALENDARS (opcional, separadas por vírgula).
 *
 * AGENDA_MOCK=1 (só fora de produção) simula o Google para testar a tela.
 */
import { AGENDA } from "./config";
import type { Busy } from "./slots";

const env = () => ({
  id: process.env.GOOGLE_CLIENT_ID,
  secret: process.env.GOOGLE_CLIENT_SECRET,
  refresh: process.env.GOOGLE_REFRESH_TOKEN,
  calendar: process.env.GOOGLE_CALENDAR_ID || "primary",
  extras: (process.env.GOOGLE_BUSY_CALENDARS || "").split(",").map((s) => s.trim()).filter(Boolean),
});

const isMock = () => process.env.AGENDA_MOCK === "1" && process.env.NODE_ENV !== "production";

/** A agenda própria está pronta para uso? Se não, o site mostra o Cal.com. */
export function agendaConfigurada(): boolean {
  const e = env();
  return isMock() || Boolean(e.id && e.secret && e.refresh);
}

let tokenCache: { token: string; exp: number } | null = null;

async function accessToken(): Promise<string> {
  if (tokenCache && tokenCache.exp > Date.now() + 60e3) return tokenCache.token;
  const e = env();
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_id: e.id ?? "",
      client_secret: e.secret ?? "",
      refresh_token: e.refresh ?? "",
      grant_type: "refresh_token",
    }),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`google token ${r.status}`);
  const j = (await r.json()) as { access_token: string; expires_in: number };
  tokenCache = { token: j.access_token, exp: Date.now() + j.expires_in * 1000 };
  return tokenCache.token;
}

// Simulação local: alguns compromissos fixos + o que for agendado na sessão.
const mockAgendados: (Busy & { email: string; created: string })[] = [];
function mockOcupados(timeMin: string, timeMax: string): Busy[] {
  const out: Busy[] = mockAgendados.map(({ start, end }) => ({ start, end }));
  for (let t = Date.parse(timeMin); t < Date.parse(timeMax); t += 86400e3) {
    const d = new Date(t - 3 * 3600e3).toISOString().slice(0, 10);
    out.push({ start: `${d}T10:00:00${AGENDA.offset}`, end: `${d}T11:00:00${AGENDA.offset}` });
    if (new Date(`${d}T12:00:00Z`).getUTCDay() === 3) out.push({ start: `${d}T14:00:00${AGENDA.offset}`, end: `${d}T16:30:00${AGENDA.offset}` });
  }
  return out;
}

/** Intervalos ocupados entre timeMin e timeMax (ISO). */
export async function ocupados(timeMin: string, timeMax: string): Promise<Busy[]> {
  if (isMock()) return mockOcupados(timeMin, timeMax);
  const e = env();
  const token = await accessToken();
  const r = await fetch("https://www.googleapis.com/calendar/v3/freeBusy", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      timeMin,
      timeMax,
      timeZone: AGENDA.timeZone,
      items: [e.calendar, ...e.extras].map((id) => ({ id })),
    }),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`google freeBusy ${r.status}`);
  const j = (await r.json()) as { calendars?: Record<string, { busy?: Busy[] }> };
  return Object.values(j.calendars ?? {}).flatMap((c) => c.busy ?? []);
}

/** Cria o evento com Google Meet e manda o convite ao cliente. */
export async function criarEvento(p: {
  start: string;
  end: string;
  nome: string;
  email: string;
  notas: string;
  locale: "pt" | "en";
}): Promise<{ id: string; meet?: string }> {
  if (isMock()) {
    mockAgendados.push({ start: p.start, end: p.end, email: p.email.toLowerCase(), created: new Date().toISOString() });
    return { id: "mock", meet: "https://meet.google.com/" };
  }
  const e = env();
  const token = await accessToken();
  const titulo = p.locale === "pt" ? `Drope Fernandes + ${p.nome} · Conversa de 30 min` : `Drope Fernandes + ${p.nome} · 30-minute call`;
  const origem = p.locale === "pt" ? "Agendado pelo site dropefernandes.com" : "Booked on dropefernandes.com";
  const url = `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(e.calendar)}/events?conferenceDataVersion=1&sendUpdates=all`;
  const r = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      summary: titulo,
      description: [p.notas, origem].filter(Boolean).join("\n\n"),
      start: { dateTime: p.start, timeZone: AGENDA.timeZone },
      end: { dateTime: p.end, timeZone: AGENDA.timeZone },
      attendees: [{ email: p.email, displayName: p.nome }],
      conferenceData: { createRequest: { requestId: crypto.randomUUID(), conferenceSolutionKey: { type: "hangoutsMeet" } } },
      reminders: { useDefault: true },
      // Marca do site: permite contar agendamentos feitos por aqui (travas contra abuso).
      extendedProperties: { private: { origem: "site", email: p.email.toLowerCase() } },
    }),
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`google events ${r.status}`);
  const j = (await r.json()) as {
    id: string;
    hangoutLink?: string;
    conferenceData?: { entryPoints?: { entryPointType: string; uri: string }[] };
  };
  return { id: j.id, meet: j.hangoutLink ?? j.conferenceData?.entryPoints?.find((x) => x.entryPointType === "video")?.uri };
}

/** Agendamentos futuros feitos pelo site (para as travas contra abuso). */
export async function agendadosPeloSite(): Promise<{ email: string; created: string }[]> {
  if (isMock()) return mockAgendados.filter((m) => Date.parse(m.end) > Date.now()).map(({ email, created }) => ({ email, created }));
  const e = env();
  const token = await accessToken();
  const q = new URLSearchParams({
    privateExtendedProperty: "origem=site",
    timeMin: new Date().toISOString(),
    singleEvents: "true",
    maxResults: "250",
    fields: "items(created,extendedProperties)",
  });
  const r = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(e.calendar)}/events?${q}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  if (!r.ok) throw new Error(`google events.list ${r.status}`);
  const j = (await r.json()) as { items?: { created?: string; extendedProperties?: { private?: Record<string, string> } }[] };
  return (j.items ?? []).map((it) => ({ email: it.extendedProperties?.private?.email ?? "", created: it.created ?? "" }));
}
