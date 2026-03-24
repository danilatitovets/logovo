"use client";

import { useState } from "react";

const faqItems = [
  {
    q: "Где находятся сервисы LOGOVO?",
    a: "Мы работаем в Минске по четырем адресам: Гурского 34, Лещинского 2, пр-т Дзержинского 132/1 и Логойский тракт 46.",
  },
  {
    q: "Какие услуги доступны в сети?",
    a: "Базовый набор: шиномонтаж, ремонт дисков, балансировка и сопутствующие работы по колесам. Полный список всегда есть в прайсе.",
  },
  {
    q: "Как записаться без очереди?",
    a: "Проще всего — через страницу «Контакты» или по телефону. Подберем ближайший филиал и удобное время.",
  },
  {
    q: "Сколько обычно занимает обслуживание?",
    a: "Зависит от услуги и загрузки точки. По типовым работам стараемся держать быстрые сроки и заранее озвучиваем время.",
  },
  {
    q: "Можно ли приехать в ближайший филиал?",
    a: "Да. Если нужна скорость, лучше заранее написать или позвонить — подскажем, где сейчас меньше загрузка.",
  },
  {
    q: "Даете ли вы гарантию на работы?",
    a: "Да, мы отвечаем за выполненные работы. Если что-то вызывает вопрос — сразу пишите в поддержку, решим без лишней бюрократии.",
  },
  {
    q: "Какой способ связи самый быстрый?",
    a: "Для срочных вопросов — телефон. Для обычных обращений подойдут Instagram, форма контактов и e-mail.",
  },
  {
    q: "Работаете ли вы с корпоративными клиентами?",
    a: "Да, обслуживаем частных и корпоративных клиентов. Формат и условия уточняем индивидуально под задачу.",
  },
] as const;

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-black pb-20 pt-14 md:pb-24 md:pt-16" data-header-theme="dark">
      <div className="mx-auto w-full max-w-4xl px-4 md:px-6">
        <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-5xl">
          Frequent Questions.
        </h2>

        <div className="mt-8 space-y-3 md:mt-10 md:space-y-4">
          {faqItems.map((item, idx) => {
            const isOpen = openIndex === idx;
            const particles = [
              { x: -14, y: -10, d: 0, s: 2, dur: 2.3 },
              { x: -3, y: -16, d: 70, s: 2.2, dur: 2.8 },
              { x: 9, y: -12, d: 110, s: 1.8, dur: 2.1 },
              { x: 14, y: -1, d: 40, s: 1.9, dur: 2.6 },
              { x: 8, y: 12, d: 90, s: 2.1, dur: 2.4 },
              { x: -9, y: 11, d: 120, s: 1.7, dur: 2.9 },
            ] as const;
            const iconSky = [
              { x: 20, y: 23, s: 1.4, o: 0.85, d: 0, dur: 2.2 },
              { x: 32, y: 45, s: 1.2, o: 0.7, d: 60, dur: 2.8 },
              { x: 46, y: 26, s: 1.8, o: 0.95, d: 90, dur: 2.4 },
              { x: 58, y: 56, s: 1.3, o: 0.65, d: 30, dur: 3.1 },
              { x: 72, y: 34, s: 1.5, o: 0.8, d: 120, dur: 2.5 },
              { x: 40, y: 68, s: 1.1, o: 0.6, d: 150, dur: 2.9 },
            ] as const;
            return (
              <article
              key={item.q}
              className="overflow-hidden rounded-3xl border border-white/8 bg-linear-to-r from-zinc-900/80 to-zinc-900/55"
            >
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : idx)}
                className="flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                aria-expanded={isOpen}
              >
                <span className="max-w-[88%] text-[clamp(19px,2vw,30px)] font-semibold leading-[1.2] tracking-tight text-zinc-100">
                  {item.q}
                </span>

                <span
                  className={`relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
                    isOpen ? "bg-white/18" : "bg-white/12"
                  }`}
                >
                  <span
                    className={`absolute text-2xl text-zinc-200 transition duration-200 ${
                      isOpen ? "scale-50 opacity-0" : "scale-100 opacity-100"
                    }`}
                    aria-hidden
                  >
                    +
                  </span>

                  {particles.map((p, pIdx) => (
                    <span
                      key={`${item.q}-star-${pIdx}`}
                      className={`hero-star-twinkle absolute rounded-full bg-amber-200 shadow-[0_0_7px_rgba(255,255,255,0.45)] transition-all duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        width: `${p.s}px`,
                        height: `${p.s}px`,
                        ["--star-op" as string]: 0.95,
                        animationDuration: `${p.dur}s`,
                        transform: isOpen ? `translate(${p.x}px, ${p.y}px)` : "translate(0px, 0px)",
                        transitionDelay: `${p.d}ms`,
                      }}
                      aria-hidden
                    />
                  ))}

                  {iconSky.map((s, sIdx) => (
                    <span
                      key={`${item.q}-sky-${sIdx}`}
                      className={`hero-star-twinkle pointer-events-none absolute rounded-full bg-white shadow-[0_0_4px_rgba(255,255,255,0.35)] transition-all duration-300 ${
                        isOpen ? "opacity-100" : "opacity-0"
                      }`}
                      style={{
                        left: `${s.x}%`,
                        top: `${s.y}%`,
                        width: `${s.s}px`,
                        height: `${s.s}px`,
                        ["--star-op" as string]: s.o,
                        animationDuration: `${s.dur}s`,
                        animationDelay: `${s.d}ms`,
                        transform: isOpen ? "scale(1)" : "scale(0.4)",
                      }}
                      aria-hidden
                    />
                  ))}

                  <span
                    className={`pointer-events-none absolute inset-1 rounded-full transition duration-300 ${
                      isOpen
                        ? "bg-[radial-gradient(circle_at_28%_30%,rgba(255,255,255,0.2),transparent_40%),radial-gradient(circle_at_72%_65%,rgba(56,189,248,0.25),transparent_35%),radial-gradient(circle_at_54%_24%,rgba(250,204,21,0.22),transparent_32%),linear-gradient(160deg,rgba(3,7,18,0.95)_0%,rgba(9,9,11,0.9)_100%)] opacity-100"
                        : "opacity-0"
                    }`}
                    aria-hidden
                  />
                </span>
              </button>

              <div
                className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-6 text-base leading-relaxed text-zinc-400 md:px-8 md:pb-8 md:text-lg">
                    <p>{item.a}</p>
                  </div>
                </div>
              </div>
            </article>
          );
          })}
        </div>
      </div>
    </section>
  );
}
