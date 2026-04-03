import Link from "next/link";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";
import { siteConfig } from "@/data/site";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/social";

function IconInstagram({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 01-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 017.8 2m-.2 2A3.6 3.6 0 004 7.6v8.8A3.6 3.6 0 007.6 20h8.8a3.6 3.6 0 003.6-3.6V7.6A3.6 3.6 0 0016.4 4H7.6m9.65 1.5a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5M12 7a5 5 0 100 10 5 5 0 000-10m0 2a3 3 0 110 6 3 3 0 010-6" />
    </svg>
  );
}

function IconMail({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M4 6h16v12H4z" strokeLinejoin="round" />
      <path d="M4 7l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconChat({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 15a4 4 0 01-4 4H8l-5 3V7a4 4 0 014-4h10a4 4 0 014 4v8z" strokeLinejoin="round" />
    </svg>
  );
}

function IconExternal({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SupportPage() {
  const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  return (
    <div className="relative min-h-[70vh] min-w-0 overflow-x-hidden bg-black text-zinc-100" data-header-theme="dark">
      <HeroNightSkyBackdrop />
      <div className="relative z-10 mx-auto min-w-0 max-w-6xl px-3 pt-10 pb-8 sm:px-4 md:px-6 md:pt-16 md:pb-14">
        <header className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase">Поддержка</p>
          <h1 className="mt-4 text-balance text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-[2.5rem]">
            Каналы связи
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-zinc-500">
            Выберите удобный способ — Instagram, почта или телефон.
          </p>
        </header>

        <div className="mt-16 grid gap-5 md:grid-cols-3">
          <article className="flex flex-col rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-7">
            <h2 className="text-lg font-semibold text-white">Instagram</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-zinc-500">
              Новости, работы и актуальные контакты — @{INSTAGRAM_HANDLE}. Пишите в Direct, отвечаем по возможности в
              течение дня.
            </p>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-zinc-900 transition hover:bg-zinc-100"
            >
              Открыть Instagram
              <IconInstagram className="size-4" />
            </a>
          </article>

          <article className="flex flex-col rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-7">
            <h2 className="text-lg font-semibold text-white">Проблема с визитом</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-zinc-500">
              Что-то пошло не так на сервисе? Опишите ситуацию на почте — разберёмся и предложим решение.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Проблема с сервисом LOGOVO")}`}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Сообщить о проблеме
              <IconMail className="size-4 opacity-80" />
            </a>
          </article>

          <article className="flex flex-col rounded-2xl border border-white/10 bg-zinc-950/60 p-6 md:p-7">
            <h2 className="text-lg font-semibold text-white">Идеи и пожелания</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-zinc-500">
              Поделитесь идеей по сервису или новой услуге — нам важно, как вы пользуетесь LOGOVO.
            </p>
            <a
              href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Идея / предложение LOGOVO")}`}
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-transparent px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
            >
              Предложить идею
              <IconChat className="size-4 opacity-80" />
            </a>
          </article>
        </div>

        <section className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <a
            href={phoneHref}
            className="inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2.5 text-sm font-medium text-white transition hover:border-white/40 hover:bg-white/5"
          >
            Позвонить в сеть
          </a>
          <Link
            href="/contacts"
            className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-amber-400 transition hover:text-amber-300"
          >
            Контакты
            <IconExternal className="size-4" />
          </Link>
        </section>
      </div>
    </div>
  );
}
