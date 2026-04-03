"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";

gsap.registerPlugin(ScrollTrigger);

/** Логотип с рабочего стола пользователя → public/images/logo-hero.png */
const ABOUT_LOGO_SRC = "/images/logo-hero.png";

/** Ширина колонки под логотип */
const LOGO_SLOT = "min(260px, 28vw)";

function tokenizeText(text: string): ReactNode[] {
  return text.split(/(\s+)/).map((part, i) => {
    if (/^\s+$/.test(part)) {
      return part;
    }
    return (
      <span key={i} data-about-token>
        {part}
      </span>
    );
  });
}

function TokenLine({ children }: { children: string }) {
  return <span data-about-token>{children}</span>;
}

const MASTER_RULES = [
  "точно диагностируют проблему без лишних «догадок»",
  "работают аккуратно и без спешки",
  "используют проверенные технологии и оборудование",
  "не допускают халтуры — ни при каких условиях",
] as const;

const TRUST_RULES = [
  "Опытные специалисты, а не случайные работники",
  "Честный подход без навязывания лишнего",
  "Контроль качества на каждом этапе",
  "Работаем как для себя",
] as const;

export function AboutPageContent() {
  const textAnimRef = useRef<HTMLDivElement>(null);
  const scrollZoneRef = useRef<HTMLDivElement>(null);
  const logoStretchRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = textAnimRef.current;
    if (!root) return;
    const tokens = Array.from(root.querySelectorAll<HTMLElement>("[data-about-token]"));
    if (tokens.length === 0) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const applyAlpha = (el: HTMLElement, a: number) => {
      el.style.color = `rgba(255,255,255,${a})`;
    };

    const ctx = gsap.context(() => {
      if (reduce) {
        tokens.forEach((el) => applyAlpha(el, 0.92));
        return;
      }

      tokens.forEach((el) => applyAlpha(el, 0.36));

      const n = tokens.length;
      const windowSize = Math.max(5, Math.min(14, Math.floor(n * 0.12)));

      ScrollTrigger.create({
        trigger: root,
        start: "top 82%",
        end: "bottom 38%",
        scrub: 0.6,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          const lit = p * (n + windowSize);
          tokens.forEach((el, i) => {
            const raw = lit - i;
            const t = gsap.utils.clamp(0, 1, raw / windowSize);
            const smooth = t * t * (3 - 2 * t);
            applyAlpha(el, 0.34 + 0.62 * smooth);
          });
        },
      });
    }, root);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 120);

    return () => {
      window.clearTimeout(t);
      try {
        ctx.revert();
      } catch {
        /* ignore */
      }
    };
  }, []);

  /** Вертикальное «растягивание» логотипа по скроллу текста; зона заканчивается до фото — sticky отпускает и блок уезжает обычным скроллом */
  useLayoutEffect(() => {
    const zone = scrollZoneRef.current;
    const logo = logoStretchRef.current;
    if (!zone || !logo) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const mm = gsap.matchMedia();
    mm.add("(min-width: 1024px)", () => {
      gsap.fromTo(
        logo,
        { scaleY: 1 },
        {
          scaleY: 1.18,
          ease: "none",
          transformOrigin: "50% 0%",
          scrollTrigger: {
            trigger: zone,
            start: "top 88%",
            end: "bottom 32%",
            scrub: 0.5,
            invalidateOnRefresh: true,
          },
        },
      );
    });

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(t);
      mm.revert();
    };
  }, []);

  return (
    <section
      className="relative min-h-screen overflow-x-hidden bg-black text-zinc-100"
      data-header-theme="dark"
    >
      <HeroNightSkyBackdrop />
      <div className="relative z-10 w-full pb-20 pt-10 md:pb-28 md:pt-14">
        <div className="relative mx-auto w-full min-w-0 max-w-6xl px-3 sm:px-4 md:px-6">
          <div
            ref={scrollZoneRef}
            className="grid min-w-0 items-start gap-10 lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-14"
          >
            <div className="hidden min-h-0 lg:block">
              <div className="sticky top-24 z-10">
                <div
                  ref={logoStretchRef}
                  className="origin-top will-change-transform [transform:translateZ(0)]"
                  style={{ width: LOGO_SLOT }}
                >
                  <Image
                    src={ABOUT_LOGO_SRC}
                    alt="LOGOVO"
                    width={520}
                    height={520}
                    className="h-auto w-full object-contain"
                    priority
                    sizes="260px"
                  />
                </div>
              </div>
            </div>

            <div className="min-w-0 text-left">
              <header className="md:pt-2">
                <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase">О нас</p>
                <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
                  Команда и стандарты LOGOVO
                </h1>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-zinc-500">
                  Команда, которая делает сложные работы по колёсам понятными и предсказуемыми.
                </p>
              </header>

              <div className="mb-10 mt-10 flex justify-center lg:mb-0 lg:hidden">
                <Image
                  src={ABOUT_LOGO_SRC}
                  alt="LOGOVO"
                  width={400}
                  height={400}
                  className="h-auto w-full max-w-[200px] object-contain"
                  sizes="200px"
                />
              </div>

              <div ref={textAnimRef} className="w-full max-w-none space-y-10 lg:mt-12">
                <div className="space-y-6 border-t border-white/10 pt-10">
                  <h2 className="font-display text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                    Наша команда
                  </h2>
                  <p className="text-pretty text-base leading-relaxed text-zinc-300 md:text-[17px] md:leading-[1.65]">
                    {tokenizeText(
                      "За качеством нашей работы стоят не просто мастера — а люди, которые знают своё дело до мелочей и относятся к каждой машине как к своей.",
                    )}
                  </p>
                  <p className="text-pretty text-base leading-relaxed text-zinc-300 md:text-[17px] md:leading-[1.65]">
                    {tokenizeText(
                      "Мы собрали команду специалистов с опытом, вниманием к деталям и настоящей ответственностью за результат. Каждый сотрудник проходит внутренний отбор и обучение, чтобы соответствовать нашим стандартам качества.",
                    )}
                  </p>
                  <h3 className="pt-2 font-display text-sm font-semibold tracking-wide text-zinc-200">
                    Наши мастера
                  </h3>
                  <ul className="list-none space-y-3.5 text-base leading-relaxed text-zinc-300 md:text-[17px]">
                    {MASTER_RULES.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span className="mt-2 size-1 shrink-0 rounded-full bg-white/25" aria-hidden />
                        <TokenLine>{line}</TokenLine>
                      </li>
                    ))}
                  </ul>
                  <p className="text-pretty text-base leading-relaxed text-zinc-300 md:text-[17px] md:leading-[1.65]">
                    {tokenizeText(
                      "Мы понимаем, что вы доверяете нам не просто автомобиль, а свою безопасность и комфорт. Поэтому в команде остаются только те, кто действительно умеет работать и держит слово.",
                    )}
                  </p>
                  <p className="text-pretty text-base font-medium leading-relaxed text-zinc-100 md:text-[17px]">
                    {tokenizeText(
                      "Для нас важно не просто выполнить услугу, а сделать так, чтобы вы захотели вернуться.",
                    )}
                  </p>
                </div>

                <div className="space-y-6 border-t border-white/10 pt-10">
                  <h2 className="font-display text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                    Почему нам доверяют
                  </h2>
                  <ul className="list-none space-y-3.5 text-base leading-relaxed text-zinc-300 md:text-[17px]">
                    {TRUST_RULES.map((line) => (
                      <li key={line} className="flex gap-3">
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-[rgba(217,255,88,0.75)] shadow-[0_0_10px_rgba(217,255,88,0.35)]"
                          aria-hidden
                        />
                        <TokenLine>{line}</TokenLine>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-6 border-t border-white/10 pt-10">
                  <h2 className="font-display text-xs font-bold tracking-[0.2em] text-zinc-500 uppercase">
                    Личное отношение
                  </h2>
                  <p className="text-pretty text-base leading-relaxed text-zinc-300 md:text-[17px] md:leading-[1.65]">
                    {tokenizeText(
                      "Мы не потоковый сервис. Мы знаем, что у каждой машины — своя история, а у каждого клиента — свои ожидания. Поэтому наши сотрудники всегда готовы объяснить, подсказать и сделать чуть больше, чем просто «по прайсу».",
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Резерв под фото команды — картинку можно вернуть сюда позже */}
          <div className="mt-16 md:mt-24">
            <div
              className="aspect-video w-full min-h-[200px] rounded-xl border border-dashed border-white/15 bg-zinc-950/40 md:min-h-[280px]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  );
}
