import { NextResponse } from "next/server";
import { AGENDA } from "@/lib/agenda/config";
import { agendaConfigurada, ocupados } from "@/lib/agenda/google";
import { addDays, horariosLivres, inicioDoDiaBR, ymdBR } from "@/lib/agenda/slots";

/**
 * GET /api/agenda/horarios?from=YYYY-MM-DD&to=YYYY-MM-DD
 * Horários livres (ISO, UTC) entre as duas datas de Brasília.
 */
export const dynamic = "force-dynamic";

const DATA = /^\d{4}-\d{2}-\d{2}$/;

export async function GET(req: Request) {
  const u = new URL(req.url);
  let from = u.searchParams.get("from") ?? "";
  let to = u.searchParams.get("to") ?? "";
  if (!DATA.test(from) || !DATA.test(to)) {
    return NextResponse.json({ error: "datas" }, { status: 400 });
  }
  if (!agendaConfigurada()) {
    return NextResponse.json({ configured: false, slots: [] }, { headers: { "Cache-Control": "no-store" } });
  }
  // Limita ao que a agenda abre: de hoje até os dias à frente.
  const hoje = ymdBR(new Date());
  const limite = addDays(hoje, AGENDA.diasAFrente + 1);
  if (from < hoje) from = hoje;
  if (to > limite) to = limite;
  if (from > to) return NextResponse.json({ configured: true, slots: [] }, { headers: { "Cache-Control": "no-store" } });

  try {
    const busy = await ocupados(inicioDoDiaBR(from), inicioDoDiaBR(addDays(to, 1)));
    const slots = horariosLivres(from, to, busy);
    return NextResponse.json({ configured: true, slots }, { headers: { "Cache-Control": "no-store" } });
  } catch (err) {
    console.error("[agenda/horarios]", err);
    return NextResponse.json({ error: "google" }, { status: 502 });
  }
}
