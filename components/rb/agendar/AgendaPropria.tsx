"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { useLocale } from "@/components/i18n/LocaleProvider";
import { BrandArrow, Icon, ICONS, RollText } from "@/components/rb/ui";
import { DotWave } from "@/components/rb/DotWave";
import { PrivacyNote } from "@/components/rb/legal/PrivacyNote";
import { AGENDA } from "@/lib/agenda/config";
import { cn } from "@/lib/utils";

/**
 * Agenda própria (substitui o Cal.com). Mostra o mês com os dias livres, os
 * horários do dia escolhido no fuso de quem está vendo, pede nome e e-mail e
 * cria o evento no Google Agenda do Pedro, com link do Meet.
 * Dados: /api/agenda/horarios e /api/agenda/agendar.
 */
const COPY = {
  pt: {
    semana: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    prev: "Mês anterior", next: "Próximo mês",
    tzBR: "Horário de Brasília", tzOutro: "Horários no seu fuso",
    carregando: "Carregando horários…",
    semHorarioMes: "Sem horários livres neste mês. Veja o próximo.",
    escolhaDia: "Escolha um dia com horário livre.",
    horarios: "Horários",
    erroCarregar: "Não consegui carregar a agenda agora.", tentar: "Tentar de novo",
    escolhido: "Horário escolhido", trocar: "Trocar horário",
    nome: "Seu nome", email: "Seu e-mail", emailHint: "O convite com o link do Meet chega nesse e-mail.",
    notas: "Sobre o projeto", opcional: "(opcional)",
    confirmar: "Confirmar agendamento", agendando: "Agendando…",
    errNome: "Escreva seu nome.", errEmail: "Confira o e-mail.",
    ocupado: "Esse horário acabou de ser ocupado. Escolha outro.",
    falhou: "Não consegui agendar agora. Tente de novo ou me chame no WhatsApp.",
    okTitulo: "Agendado.", okA: "O convite com o link do Google Meet foi para", okB: "Até lá!",
    okMeet: "Abrir o link do Meet",
    duracao: "30 minutos · Google Meet",
  },
  en: {
    semana: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    prev: "Previous month", next: "Next month",
    tzBR: "Brasília time", tzOutro: "Times in your time zone",
    carregando: "Loading times…",
    semHorarioMes: "No open times this month. Check the next one.",
    escolhaDia: "Pick a day with open times.",
    horarios: "Times",
    erroCarregar: "I couldn't load the calendar right now.", tentar: "Try again",
    escolhido: "Your time", trocar: "Change time",
    nome: "Your name", email: "Your email", emailHint: "The invite with the Meet link goes to this email.",
    notas: "About the project", opcional: "(optional)",
    confirmar: "Confirm booking", agendando: "Booking…",
    errNome: "Please enter your name.", errEmail: "Please check your email.",
    ocupado: "That time was just taken. Please pick another one.",
    falhou: "I couldn't book it right now. Try again or message me on WhatsApp.",
    okTitulo: "Booked.", okA: "The invite with the Google Meet link went to", okB: "See you then!",
    okMeet: "Open the Meet link",
    duracao: "30 minutes · Google Meet",
  },
};

const pad = (n: number) => String(n).padStart(2, "0");
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** YYYY-MM-DD de um instante, no fuso dado. */
const ymdIn = (d: Date | string, tz: string) =>
  new Intl.DateTimeFormat("en-CA", { timeZone: tz, year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date(d));
const addDays = (ymd: string, n: number) => {
  const d = new Date(`${ymd}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
};

type Etapa = "escolher" | "dados" | "feito";

export function AgendaPropria() {
  const { locale } = useLocale();
  const c = COPY[locale];
  const intl = locale === "pt" ? "pt-BR" : "en-US";
  const ids = { nome: useId(), email: useId(), notas: useId(), hint: useId() };

  // Fuso e "hoje" só no navegador (evita diferença entre servidor e cliente).
  const [tz, setTz] = useState<string | null>(null);
  const [mes, setMes] = useState<{ y: number; m: number } | null>(null);
  useEffect(() => {
    const z = Intl.DateTimeFormat().resolvedOptions().timeZone || AGENDA.timeZone;
    const [y, m] = ymdIn(new Date(), z).split("-").map(Number);
    setTz(z);
    setMes({ y, m: m - 1 });
  }, []);

  const [slots, setSlots] = useState<string[] | null>(null);
  const [erro, setErro] = useState(false);
  const [dia, setDia] = useState<string | null>(null);
  const [slot, setSlot] = useState<string | null>(null);
  const [etapa, setEtapa] = useState<Etapa>("escolher");
  const [aviso, setAviso] = useState<string | null>(null);

  const carregar = useCallback(async () => {
    if (!mes) return;
    setSlots(null);
    setErro(false);
    const first = `${mes.y}-${pad(mes.m + 1)}-01`;
    const last = new Date(Date.UTC(mes.y, mes.m + 1, 0)).toISOString().slice(0, 10);
    try {
      const r = await fetch(`/api/agenda/horarios?from=${addDays(first, -1)}&to=${addDays(last, 1)}`, { cache: "no-store" });
      if (!r.ok) throw new Error(String(r.status));
      const j = (await r.json()) as { slots: string[] };
      setSlots(j.slots);
    } catch {
      setErro(true);
    }
  }, [mes]);
  useEffect(() => { carregar(); }, [carregar]);

  // Horários agrupados pelo dia no fuso de quem vê, só os deste mês.
  const porDia = useMemo(() => {
    const map = new Map<string, string[]>();
    if (!slots || !tz || !mes) return map;
    const prefixo = `${mes.y}-${pad(mes.m + 1)}-`;
    for (const s of slots) {
      const k = ymdIn(s, tz);
      if (!k.startsWith(prefixo)) continue;
      map.set(k, [...(map.get(k) ?? []), s]);
    }
    return map;
  }, [slots, tz, mes]);

  // Ao carregar o mês, abre o primeiro dia com horário.
  useEffect(() => {
    if (!slots) return;
    if (dia && porDia.has(dia)) return;
    setDia(porDia.keys().next().value ?? null);
  }, [slots, porDia, dia]);

  // Form
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [notas, setNotas] = useState("");
  const [site, setSite] = useState("");
  const [errs, setErrs] = useState<{ nome?: string; email?: string }>({});
  const [enviando, setEnviando] = useState(false);
  const [meet, setMeet] = useState<string | null>(null);
  const nomeRef = useRef<HTMLInputElement>(null);
  const okRef = useRef<HTMLHeadingElement>(null);
  const topoRef = useRef<HTMLDivElement>(null);

  if (!tz || !mes) {
    return <div className="min-h-[520px] rounded-2xl border border-ink-100 dark:border-ink-700" aria-busy="true" />;
  }

  const hoje = ymdIn(new Date(), tz);
  const limite = ymdIn(new Date(Date.now() + AGENDA.diasAFrente * 86400e3), tz);
  const primeiroDia = `${mes.y}-${pad(mes.m + 1)}-01`;
  const podeVoltar = primeiroDia > hoje.slice(0, 8) + "01";
  const proximo = mes.m === 11 ? { y: mes.y + 1, m: 0 } : { y: mes.y, m: mes.m + 1 };
  const podeAvancar = `${proximo.y}-${pad(proximo.m + 1)}-01` <= limite;
  const anterior = mes.m === 0 ? { y: mes.y - 1, m: 11 } : { y: mes.y, m: mes.m - 1 };

  const tituloMes = new Intl.DateTimeFormat(intl, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(Date.UTC(mes.y, mes.m, 15)));
  const inicioSemana = (new Date(Date.UTC(mes.y, mes.m, 1)).getUTCDay() + 6) % 7;
  const diasNoMes = new Date(Date.UTC(mes.y, mes.m + 1, 0)).getUTCDate();
  const hora = (s: string) => new Intl.DateTimeFormat(intl, { hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date(s));
  const dataLonga = (s: string) => new Intl.DateTimeFormat(intl, { weekday: "long", day: "numeric", month: "long", timeZone: tz }).format(new Date(s));
  /** Rótulo de um dia do calendário (YYYY-MM-DD), sem depender de fuso. */
  const dataDia = (ymd: string) => new Intl.DateTimeFormat(intl, { weekday: "long", day: "numeric", month: "long", timeZone: "UTC" }).format(new Date(`${ymd}T12:00:00Z`));
  const tzLabel = tz === AGENDA.timeZone ? c.tzBR : `${c.tzOutro} (${tz.replace(/_/g, " ")})`;

  const escolherSlot = (s: string) => {
    setSlot(s);
    setAviso(null);
    setEtapa("dados");
    requestAnimationFrame(() => nomeRef.current?.focus());
  };

  const enviar = async (e: React.FormEvent) => {
    e.preventDefault();
    const n: typeof errs = {};
    if (nome.trim().length < 2) n.nome = c.errNome;
    if (!EMAIL.test(email.trim())) n.email = c.errEmail;
    setErrs(n);
    if (n.nome || n.email || !slot) return;
    setEnviando(true);
    setAviso(null);
    try {
      const r = await fetch("/api/agenda/agendar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ start: slot, nome, email, notas, locale, site }),
      });
      if (r.status === 409) {
        setAviso(c.ocupado);
        setEtapa("escolher");
        setSlot(null);
        carregar();
        topoRef.current?.scrollIntoView({ block: "nearest" });
        return;
      }
      if (!r.ok) throw new Error(String(r.status));
      const j = (await r.json()) as { meet?: string | null };
      setMeet(j.meet ?? null);
      setEtapa("feito");
      requestAnimationFrame(() => okRef.current?.focus());
    } catch {
      setAviso(c.falhou);
    } finally {
      setEnviando(false);
    }
  };

  const field =
    "block w-full rounded-xl border border-ink-200 bg-bg-soft px-4 py-3.5 text-base text-fg-strong transition-colors hover:border-ink-400 " +
    "focus:border-ink-900 focus:outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand dark:border-ink-400 dark:focus:border-ink-50";
  const lbl = "t-small block font-semibold text-fg-strong";
  const errCls = "t-small mt-2 text-brand-wine dark:text-brand-coral";
  const navBtn = "grid size-11 place-items-center rounded-full border border-ink-100 text-fg-strong transition-colors hover:bg-ink-100 disabled:pointer-events-none disabled:opacity-30 dark:border-ink-700 dark:hover:bg-ink-700";

  // ===== Confirmado =====
  if (etapa === "feito" && slot) {
    return (
      <div className="rounded-2xl border border-ink-100 p-6 dark:border-ink-700 lg:p-10">
        <span className="grid size-12 place-items-center rounded-full bg-brand text-ink-50">
          <Icon d='<path d="M20 6 9 17l-5-5"/>' size={22} />
        </span>
        <h3 ref={okRef} tabIndex={-1} className="t-h2 mt-6 text-fg-strong outline-none">{c.okTitulo}</h3>
        <p className="t-lead mt-3 text-fg-strong first-letter:uppercase">{dataLonga(slot)}, {hora(slot)}</p>
        <p className="t-small mt-1 text-ink-700 dark:text-ink-200">{c.duracao} · {tzLabel}</p>
        <p className="t-small mt-6 max-w-[560px] text-ink-700 dark:text-ink-200">
          {c.okA} <strong className="font-semibold text-fg-strong">{email.trim()}</strong>. {c.okB}
        </p>
        {meet && (
          <a href={meet} target="_blank" rel="noreferrer" className="rb-btn rb-btn--escuro mt-8 w-full sm:w-auto">
            <DotWave />
            <RollText>{c.okMeet}</RollText>
            <span className="rb-btn__block">
              <span className="rb-btn__arrow"><BrandArrow /></span>
              <span className="rb-btn__arrow" aria-hidden><BrandArrow /></span>
            </span>
          </a>
        )}
      </div>
    );
  }

  // ===== Dados =====
  if (etapa === "dados" && slot) {
    return (
      <div className="rounded-2xl border border-ink-100 p-6 dark:border-ink-700 lg:p-10">
        <div className="flex flex-col gap-4 border-b border-ink-100 pb-6 dark:border-ink-700 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="t-label text-ink-700 dark:text-ink-200">{c.escolhido}</p>
            <p className="t-lead mt-2 text-fg-strong first-letter:uppercase">{dataLonga(slot)}, {hora(slot)}</p>
            <p className="t-small mt-1 text-ink-700 dark:text-ink-200">{c.duracao} · {tzLabel}</p>
          </div>
          <button type="button" onClick={() => setEtapa("escolher")} className="t-small inline-flex min-h-[44px] items-center gap-2 self-start font-semibold text-fg-strong underline decoration-ink-200 underline-offset-4 hover:decoration-fg-strong sm:self-auto">
            <Icon d={ICONS.arrowLeft} size={18} /> {c.trocar}
          </button>
        </div>
        <form onSubmit={enviar} noValidate className="mt-6 grid gap-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor={ids.nome} className={lbl}>{c.nome}</label>
              <input ref={nomeRef} id={ids.nome} type="text" autoComplete="name" value={nome} onChange={(e) => setNome(e.target.value)} aria-invalid={!!errs.nome} className={cn(field, "mt-2")} />
              {errs.nome && <p className={errCls}>{errs.nome}</p>}
            </div>
            <div>
              <label htmlFor={ids.email} className={lbl}>{c.email}</label>
              <input id={ids.email} type="email" inputMode="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={!!errs.email} aria-describedby={ids.hint} className={cn(field, "mt-2")} />
              {errs.email ? <p className={errCls}>{errs.email}</p> : <p id={ids.hint} className="t-small mt-2 text-ink-700 dark:text-ink-200">{c.emailHint}</p>}
            </div>
          </div>
          <div>
            <label htmlFor={ids.notas} className={lbl}>{c.notas} <span className="font-medium text-ink-700 dark:text-ink-200">{c.opcional}</span></label>
            <textarea id={ids.notas} rows={4} value={notas} onChange={(e) => setNotas(e.target.value)} className={cn(field, "mt-2 resize-y")} />
          </div>
          {/* Campo escondido contra robôs */}
          <div aria-hidden className="absolute left-[-9999px] h-px w-px overflow-hidden">
            <label>Site<input tabIndex={-1} autoComplete="off" value={site} onChange={(e) => setSite(e.target.value)} /></label>
          </div>
          <div aria-live="polite" className="empty:hidden">{aviso && <p className={errCls}>{aviso}</p>}</div>
          <div>
            <button type="submit" disabled={enviando} className="rb-btn rb-btn--escuro w-full disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
              <DotWave />
              <RollText>{enviando ? c.agendando : c.confirmar}</RollText>
              <span className="rb-btn__block">
                {enviando
                  ? <span aria-hidden className="size-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
                  : (<>
                      <span className="rb-btn__arrow"><BrandArrow /></span>
                      <span className="rb-btn__arrow" aria-hidden><BrandArrow /></span>
                    </>)}
              </span>
            </button>
            <PrivacyNote uso="agenda" />
          </div>
        </form>
      </div>
    );
  }

  // ===== Escolher dia e horário =====
  const doDia = dia ? porDia.get(dia) ?? [] : [];
  return (
    <div ref={topoRef} className="rounded-2xl border border-ink-100 p-4 dark:border-ink-700 sm:p-6 lg:p-8">
      <div aria-live="polite" className="empty:hidden">{aviso && <p className={cn(errCls, "mb-4 mt-0")}>{aviso}</p>}</div>
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_220px] md:gap-10">
        {/* Mês */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="t-lead font-semibold text-fg-strong first-letter:uppercase">{tituloMes}</h3>
            <div className="flex gap-2">
              <button type="button" onClick={() => { setDia(null); setMes(anterior); }} disabled={!podeVoltar} aria-label={c.prev} className={navBtn}><Icon d={ICONS.arrowLeft} size={20} /></button>
              <button type="button" onClick={() => { setDia(null); setMes(proximo); }} disabled={!podeAvancar} aria-label={c.next} className={navBtn}><Icon d={ICONS.arrowRight} size={20} /></button>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-7 gap-1 text-center">
            {c.semana.map((s) => <span key={s} aria-hidden className="t-label py-2 text-ink-400">{s}</span>)}
            {Array.from({ length: inicioSemana }, (_, i) => <span key={`v${i}`} aria-hidden />)}
            {Array.from({ length: diasNoMes }, (_, i) => {
              const k = `${mes.y}-${pad(mes.m + 1)}-${pad(i + 1)}`;
              const livre = porDia.has(k);
              const ativo = k === dia;
              return (
                <button
                  key={k}
                  type="button"
                  disabled={!livre}
                  aria-pressed={ativo}
                  aria-label={livre ? dataDia(k) : undefined}
                  onClick={() => setDia(k)}
                  className={cn(
                    "mx-auto grid aspect-square w-full max-w-[52px] place-items-center rounded-full text-base font-medium transition-colors",
                    ativo ? "bg-brand text-ink-50" : livre ? "bg-ink-100 text-fg-strong hover:bg-ink-200 dark:bg-ink-700 dark:hover:bg-ink-400" : "text-ink-400/60",
                    k === hoje && !ativo && "ring-1 ring-inset ring-ink-400",
                  )}
                >
                  {i + 1}
                </button>
              );
            })}
          </div>
          <p className="t-small mt-5 flex items-center gap-2 text-ink-700 dark:text-ink-200">
            <Icon d='<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>' size={16} className="shrink-0" />
            {tzLabel}
          </p>
        </div>

        {/* Horários do dia */}
        <div className="md:border-l md:border-ink-100 md:pl-10 md:dark:border-ink-700">
          <p className="t-label text-ink-700 dark:text-ink-200">{dia ? <span className="first-letter:uppercase">{dataDia(dia)}</span> : c.horarios}</p>
          <div className="mt-4">
            {erro ? (
              <div>
                <p className="t-small text-ink-700 dark:text-ink-200">{c.erroCarregar}</p>
                <button type="button" onClick={carregar} className="t-small mt-3 min-h-[44px] font-semibold text-fg-strong underline decoration-ink-200 underline-offset-4">{c.tentar}</button>
              </div>
            ) : slots === null ? (
              <p className="t-small text-ink-700 dark:text-ink-200" aria-busy="true">{c.carregando}</p>
            ) : porDia.size === 0 ? (
              <p className="t-small text-ink-700 dark:text-ink-200">{c.semHorarioMes}</p>
            ) : !dia ? (
              <p className="t-small text-ink-700 dark:text-ink-200">{c.escolhaDia}</p>
            ) : (
              <ul className="grid max-h-[360px] grid-cols-3 gap-2 overflow-y-auto pr-1 md:grid-cols-1">
                {doDia.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => escolherSlot(s)}
                      className="min-h-[48px] w-full rounded-xl border border-ink-200 text-base font-semibold tabular-nums text-fg-strong transition-colors hover:border-brand hover:bg-brand hover:text-ink-50 dark:border-ink-400"
                    >
                      {hora(s)}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
