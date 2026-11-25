import { NextResponse } from "next/server";
import { AGENDA } from "@/lib/agenda/config";
import { agendaConfigurada, agendadosPeloSite, criarEvento, ocupados } from "@/lib/agenda/google";
import { addDays, horariosLivres, inicioDoDiaBR, ymdBR } from "@/lib/agenda/slots";

/**
 * POST /api/agenda/agendar
 * Corpo: { start, nome, email, notas?, locale, site?, ms? }
 * Confere de novo se o horário está livre e cria o evento com Google Meet.
 *
 * Travas contra abuso (o endpoint manda convite do Gmail do Pedro):
 *  - "site" é um campo escondido: se vier preenchido, é robô;
 *  - "ms" é o tempo entre abrir o formulário e enviar: rápido demais, é robô;
 *  - um agendamento futuro por e-mail;
 *  - no máximo LIMITE_24H agendamentos pelo site criados nas últimas 24 horas.
 */
const LIMITE_24H = 10;
const MS_MINIMO = 1500;
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

  // Campo escondido preenchido = robô: finge que deu certo e não cria nada.
  if (String(body.site ?? "").trim()) return NextResponse.json({ ok: true, start: startRaw, meet: null });
  // Rápido demais: pede para confirmar de novo (uma pessoa consegue na segunda vez).
  const ms = Number(body.ms ?? 0);
  if (!Number.isFinite(ms) || ms < MS_MINIMO) return NextResponse.json({ error: "rapido" }, { status: 400 });

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
    const doSite = await agendadosPeloSite();
    if (doSite.some((a) => a.email === email.toLowerCase())) {
      return NextResponse.json({ error: "jaagendado" }, { status: 409 });
    }
    const umDia = Date.now() - 86400e3;
    if (doSite.filter((a) => Date.parse(a.created) > umDia).length >= LIMITE_24H) {
      return NextResponse.json({ error: "limite" }, { status: 429 });
    }
    const ev = await criarEvento({ start, end, nome, email, notas, locale });
    return NextResponse.json({ ok: true, start, meet: ev.meet ?? null });
  } catch (err) {
    console.error("[agenda/agendar]", err);
    return NextResponse.json({ error: "google" }, { status: 502 });
  }
}
