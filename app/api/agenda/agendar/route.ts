import { NextResponse } from "next/server";
import { AGENDA } from "@/lib/agenda/config";
import { agendaConfigurada, criarEvento, ocupados } from "@/lib/agenda/google";
import { addDays, horariosLivres, inicioDoDiaBR, ymdBR } from "@/lib/agenda/slots";

/**
 * POST /api/agenda/agendar
 * Corpo: { start, nome, email, notas?, locale, site? }
 * Confere de novo se o horário está livre e cria o evento com Google Meet.
 * "site" é um campo escondido: se vier preenchido, é robô.
 */
export const dynamic = "force-dynamic";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(req: Request) {
  if (!agendaConfigurada()) return NextResponse.json({ error: "config" }, { status: 503 });

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "dados" }, { status: 400 });
  }
  const nome = String(body.nome ?? "").trim().slice(0, 80);
  const email = String(body.email ?? "").trim().slice(0, 160);
  const notas = String(body.notas ?? "").trim().slice(0, 1000);
  const locale = body.locale === "en" ? "en" : "pt";
  const startRaw = String(body.start ?? "");

  // Robô: finge que deu certo e não cria nada.
  if (String(body.site ?? "").trim()) return NextResponse.json({ ok: true, start: startRaw });

  const t = Date.parse(startRaw);
  if (nome.length < 2 || !EMAIL.test(email) || Number.isNaN(t)) {
    return NextResponse.json({ error: "dados" }, { status: 400 });
  }
  const start = new Date(t).toISOString();
  const end = new Date(t + AGENDA.duracaoMin * 60e3).toISOString();

  try {
    const dia = ymdBR(new Date(t));
    const busy = await ocupados(inicioDoDiaBR(dia), inicioDoDiaBR(addDays(dia, 1)));
    if (!horariosLivres(dia, dia, busy).includes(start)) {
      return NextResponse.json({ error: "ocupado" }, { status: 409 });
    }
    const ev = await criarEvento({ start, end, nome, email, notas, locale });
    return NextResponse.json({ ok: true, start, meet: ev.meet ?? null });
  } catch (err) {
    console.error("[agenda/agendar]", err);
    return NextResponse.json({ error: "google" }, { status: 502 });
  }
}
