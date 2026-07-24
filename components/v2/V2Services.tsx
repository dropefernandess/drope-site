"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { V2Btn } from "./V2Btn";

/**
 * V2Services — os 3 cards do prompt GroundAI, fiéis à estrutura
 * (585px, raio 24, layouts internos) e recoloridos no manual:
 *
 *  1. Carousel vertical de pills glass sobre foto (auto-cycle 2.8s,
 *     spring 260/28, ativa expande com "ESCOLHA DO DROPÊ")
 *  2. Chat escuro #141413 — bolha skeleton + MorphBubble que vira a
 *     mensagem do cliente depois de 1.1s
 *  3. Card vermelho "adaptável" com linhas brancas + ícone de +
 *
 * Zero sombra, zero gradiente. Reveal: y40 → 0, stagger 0.35s.
 */

const ITEMS = [
  "Branding & Identidade",
  "UI/UX & Product",
  "Web & Landing Pages",
  "Design Gráfico",
  "Motion & Vídeo",
  "Direção de Arte",
  "Embalagens",
];

const PILL_H = 56;
const PILL_GAP = 18;
const ACTIVE_GAP = 22;

/* ---------- Card 1: carousel de pills ---------- */
function CarouselCard() {
  const [active, setActive] = useState(2);
  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % ITEMS.length), 2800);
    return () => clearInterval(id);
  }, []);

  const len = ITEMS.length;
  const half = Math.floor(len / 2);

  return (
    <div className="relative h-[585px] flex-1 overflow-hidden rounded-3xl bg-surface">
      <Image
        src="/sobre-trabalho.png"
        alt=""
        fill
        sizes="(min-width:1024px) 33vw, 100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-ink-900/25" aria-hidden />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-20 w-full">
          {ITEMS.map((label, i) => {
            const diff = ((i - active + len + half) % len) - half;
            const isActive = diff === 0;
            const visible = Math.abs(diff) <= 2;
            const y =
              diff === 0
                ? 0
                : diff < 0
                  ? diff * (PILL_H + PILL_GAP) - ACTIVE_GAP
                  : diff * (PILL_H + PILL_GAP) + ACTIVE_GAP;
            const opacity = !visible ? 0 : Math.abs(diff) === 2 ? 0.55 : 1;
            return (
              <motion.div
                key={label}
                animate={{ y, opacity }}
                transition={{
                  y: { type: "spring", stiffness: 260, damping: 28 },
                  opacity: { duration: 0.4, ease: "easeInOut" },
                }}
                className="pointer-events-none absolute left-0 right-0 flex justify-center"
              >
                <motion.div
                  layout
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  className={
                    isActive
                      ? "mx-[30px] flex h-20 w-[calc(100%_-_60px)] items-center gap-[8.5px] rounded-full bg-white/25 p-[8.5px] backdrop-blur-xl"
                      : "flex h-[56px] w-[261px] items-center gap-[8.5px] rounded-full border border-white/10 bg-white/15 px-3 backdrop-blur-md"
                  }
                >
                  <div
                    className={`flex shrink-0 items-center justify-center rounded-full bg-white/30 ${
                      isActive ? "size-[63px]" : "size-[44px]"
                    }`}
                  >
                    <span className={`rounded-full bg-white/10 ${isActive ? "size-8" : "size-full"}`} />
                  </div>
                  <div className="relative ml-1 h-[44px] flex-1 text-left">
                    <AnimatePresence mode="wait" initial={false}>
                      {isActive ? (
                        <motion.div
                          key="on"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 flex flex-col justify-center"
                        >
                          <p className="text-lg font-medium leading-tight text-white">{label}</p>
                          <p className="text-[11px] tracking-[0.15em] text-white/70">
                            ESCOLHA DO DROPÊ
                          </p>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="off"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="absolute inset-0 flex flex-col justify-center gap-1.5"
                        >
                          <span className="h-2 w-[140px] rounded-full bg-white/50" />
                          <span className="h-2 w-[70px] rounded-full bg-white/35" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

/* ---------- Card 2: chat escuro com MorphBubble ---------- */
function ChatCard() {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setFilled(true), 1100);
    return () => clearTimeout(id);
  }, []);

  const words = "Do brief ao deploy, sem ruído".split(" ");

  return (
    <div className="flex h-[585px] flex-1 flex-col justify-between overflow-hidden rounded-3xl bg-[#141413] pb-10 pt-10">
      <div className="mb-6 flex flex-1 flex-col justify-center gap-[10px]">
        {/* bolha skeleton */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-[48px] flex h-[108px] items-start rounded-2xl bg-[#FAFAFA14] pl-[22px] pt-[22px]"
        >
          <span className="size-10 shrink-0 rounded-xl bg-[#FFFFFF54]" />
          <div className="ml-3 flex flex-1 flex-col gap-[9px] pr-[22px]">
            <span className="mt-[17px] h-[6px] w-[31px] rounded-full bg-[#FFFFFF3D]" />
            <span className="h-[6px] w-[85%] rounded-full bg-[#FFFFFF3D]" />
            <span className="h-[6px] w-[55%] rounded-full bg-[#FFFFFF3D]" />
          </div>
        </motion.div>

        {/* MorphBubble — skeleton → mensagem do cliente */}
        <motion.div
          layout
          animate={{ backgroundColor: filled ? "#DE2828" : "#FAFAFA14" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-[38px] h-[135px] overflow-hidden rounded-3xl p-[22px]"
        >
          <AnimatePresence mode="wait" initial={false}>
            {filled ? (
              <motion.div
                key="msg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.15 }}
              >
                <div className="flex h-[40px] items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-xl bg-ink-50/90 text-sm font-bold text-brand">
                    C
                  </span>
                  <span className="text-base leading-none text-white">Cliente</span>
                </div>
                <p className="ml-[52px] mt-1.5 text-[15px] leading-snug text-white">
                  Tenho um negócio bom, mas a marca não mostra isso. Dá pra
                  resolver?
                </p>
              </motion.div>
            ) : (
              <motion.div
                key="skel"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <span className="size-10 shrink-0 rounded-xl bg-[#FFFFFF54]" />
                <div className="ml-3 flex flex-1 flex-col gap-[9px]">
                  <span className="mt-[17px] h-[6px] w-[31px] rounded-full bg-[#FFFFFF3D]" />
                  <span className="h-[6px] w-[85%] rounded-full bg-[#FFFFFF3D]" />
                  <span className="h-[6px] w-[55%] rounded-full bg-[#FFFFFF3D]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* rodapé do card: frase word-by-word + steps 01/2/3 */}
      <div className="flex items-end justify-between px-8">
        <p className="w-64 text-4xl leading-10 text-white">
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.1, ease: "easeOut" }}
              className="mr-[0.25em] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </p>
        <div className="flex items-center">
          <span className="z-30 flex size-10 items-center justify-center rounded-full border-2 border-[#141413] bg-brand text-base text-white">
            01
          </span>
          <span className="z-20 -ml-3 flex size-10 items-center justify-center rounded-full border-2 border-[#141413] bg-[#252522] text-base text-white/40">
            2
          </span>
          <span className="z-10 -ml-3 flex size-10 items-center justify-center rounded-full border-2 border-[#141413] bg-[#252522] text-base text-white/40">
            3
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Card 3: adaptável (vermelho, linhas brancas) ---------- */
function AdaptCard() {
  const rows = ["Identidade do zero", "Redesign de marca", "Site + marca juntos"];
  const desc =
    "Cada projeto entra do jeito que você precisa — marca nova, reposicionamento ou o pacote completo com site no ar.".split(" ");

  return (
    <div className="flex h-[585px] flex-1 flex-col overflow-hidden rounded-3xl bg-brand px-[33px] pb-10 pt-[44px]">
      <div className="flex flex-col gap-[26px]">
        <h3 className="text-5xl font-normal leading-[1.05] text-white">
          É completamente
          <br />
          adaptável.
        </h3>
        <p className="max-w-[340px] text-lg leading-snug text-white/70">
          {desc.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.6 + i * 0.04, ease: "easeOut" }}
              className="mr-[5px] inline-block"
            >
              {w}
            </motion.span>
          ))}
        </p>
      </div>
      <div className="z-10 mt-auto flex flex-col gap-3">
        {rows.map((label, idx) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, delay: 1.1 + idx * 0.18, ease: "easeOut" }}
            className="flex w-full items-center justify-between rounded-2xl bg-white px-[27px] py-[15px]"
          >
            <span className={`text-lg ${idx === 0 ? "text-brand" : "text-ink-700"}`}>
              {label}
            </span>
            <svg viewBox="0 0 24 24" className="size-[22px] text-neutral-400" fill="none" aria-hidden>
              <path d="M12 4.5v15m7.5-7.5h-15" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function V2Services() {
  return (
    <section id="servicos" className="bg-bg">
      <div className="mx-auto max-w-[1360px] px-6 pb-20 pt-16 md:px-12">
        <h2 className="mb-12 text-center text-5xl font-normal leading-[1.1] text-fg-strong md:text-6xl">
          Experiências que o teu cliente
          <br />
          <span className="font-semibold text-brand">vai lembrar</span>
        </h2>

        <div className="flex flex-col items-stretch justify-between gap-6 lg:flex-row">
          {[CarouselCard, ChatCard, AdaptCard].map((Card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.1, delay: i * 0.35, ease: "easeOut" }}
              className="flex flex-1"
            >
              <Card />
            </motion.div>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <V2Btn href="/calculadora" variant="dark">
            Estimar projeto
          </V2Btn>
        </div>
      </div>
    </section>
  );
}
