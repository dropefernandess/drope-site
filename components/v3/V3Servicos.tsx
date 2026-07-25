"use client";

import Image from "next/image";
import { SERVICOS } from "./data";

/**
 * V3Servicos — lista tipográfica, não grade de cards.
 *
 * Cards iguais lado a lado não escalam (quebram no 4º serviço) e são o
 * formato mais genérico que existe. A lista escala, deixa a tipografia
 * carregar, e o hover eleva a linha revelando o trabalho relacionado —
 * o padrão de densidade que Linear e Paraform usam.
 */
export function V3Servicos() {
  return (
    <section id="servicos" className="v3-section v3-wrap" style={{ scrollMarginTop: "24px" }}>
      <div className="v3-grid">
        <div className="col-span-4 md:col-span-8 lg:col-span-6">
          <p className="v3-mono" data-reveal>
            02 — O que eu faço
          </p>
          <h2 className="v3-h1 mt-5" data-reveal>
            Quatro frentes,{" "}
            <em className="v3-em v3-em--sage">uma cabeça só.</em>
          </h2>
        </div>
        <div className="col-span-4 self-end md:col-span-8 lg:col-span-5 lg:col-start-8">
          <p className="v3-body" data-reveal>
            Você contrata uma pessoa e recebe o pacote inteiro. Sem tradução
            entre designer e dev, sem briefing repetido três vezes, sem
            ninguém para culpar quando a entrega não bate com o layout.
          </p>
        </div>
      </div>

      <ul className="mt-16 md:mt-20">
        {SERVICOS.map((s) => (
          <li key={s.n} data-reveal>
            <hr className="v3-rule" />
            <article className="v3-svc">
              <span className="v3-num v3-mono !text-[13px]">{s.n}</span>

              <div className="min-w-0">
                <h3 className="v3-h2">{s.title}</h3>
                <p className="v3-small mt-3 max-w-[52ch] text-[var(--n-500)]">{s.desc}</p>
              </div>

              <span className="v3-mono shrink-0 !text-[11px]">
                <span aria-hidden="true">↗</span>
              </span>

              <div className="v3-svc__thumb" aria-hidden="true">
                <Image
                  src={s.thumb}
                  alt=""
                  width={296}
                  height={222}
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </article>
          </li>
        ))}
      </ul>
      <hr className="v3-rule" />
    </section>
  );
}
