"use client";

import { useState, type FormEvent, type ReactNode } from "react";
import { BookingConsentCheckbox } from "@/components/booking/booking-consent-checkbox";
import { BookingSelect } from "@/components/booking/booking-select";
import { HeroNightSkyBackdrop } from "@/components/effects/hero-night-sky-backdrop";
import { bookingLocations } from "@/data/booking";
import { services } from "@/data/services";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const WITH_LOGOVO = [
  "Понятное время и адрес — перезвоним и подтвердим запись.",
  "Работаем по регламенту: видно, что сделано с колёсами и авто.",
  "Честная оценка работ без навязывания лишнего.",
] as const;

export function BookingPageContent() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const name = String(fd.get("name") ?? "").trim();
    const phone = String(fd.get("phone") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const service = String(fd.get("service") ?? "");
    const location = String(fd.get("location") ?? "");
    const comment = String(fd.get("comment") ?? "").trim();
    const agree = fd.get("agree") === "on";

    if (!agree || !name || !phone) return;

    const locLabel = bookingLocations.find((l) => l.value === location)?.label ?? location;
    const svcLabel =
      service === "other"
        ? "Другое / уточню по телефону"
        : (services.find((s) => s.slug === service)?.title ?? service);

    const body = [
      `Имя: ${name}`,
      `Телефон: ${phone}`,
      email ? `Email: ${email}` : null,
      `Услуга: ${svcLabel}`,
      `Адрес: ${locLabel}`,
      comment ? `Комментарий: ${comment}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const mailto = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Запись на сервис LOGOVO")}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
    setSent(true);
  }

  return (
    <section
      className="relative min-h-screen overflow-x-hidden bg-black pb-14 text-zinc-100 md:pb-16"
      data-header-theme="dark"
    >
      <HeroNightSkyBackdrop />
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-5 md:px-6 md:pt-7">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.12fr)_minmax(0,0.92fr)] lg:items-start lg:gap-10">
          {/* Левая колонка */}
          <div className="relative min-w-0">
            <div className="pointer-events-none absolute inset-x-0 bottom-0 top-[38%] bg-[radial-gradient(ellipse_88%_65%_at_50%_100%,rgba(220,90,50,0.11),transparent_62%)] opacity-90" aria-hidden />

            <p className="relative text-xs font-semibold tracking-[0.2em] text-amber-400 uppercase">Запись</p>
            <h1 className="relative mt-2.5 max-w-xl text-balance text-3xl font-bold tracking-tight text-white md:text-[2rem] lg:text-[2.15rem] lg:leading-[1.12]">
              Запишитесь на сервис без лишней суеты
            </h1>
            <p className="relative mt-3 max-w-lg text-[15px] leading-snug text-zinc-400">
              Оставьте контакты и пожелания — администратор сети LOGOVO перезвонит, уточнит время и адрес. Работаем в
              Минске, понятные регламенты и аккуратный сервис.
            </p>

            <div className="relative mt-6">
              <p className="text-xs font-semibold tracking-[0.18em] text-zinc-500 uppercase">С {siteConfig.name}:</p>
              <ul className="mt-3 space-y-2.5 text-[15px] leading-snug text-zinc-300">
                {WITH_LOGOVO.map((line) => (
                  <li key={line} className="flex gap-3">
                    <span className="mt-0.5 shrink-0 text-[10px] text-white/80" aria-hidden>
                      ▶
                    </span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Правая колонка — карточка формы */}
          <div className="min-w-0">
            <div className="rounded-xl border border-white/10 bg-zinc-950/55 p-5 shadow-[0_20px_56px_rgba(0,0,0,0.4)] backdrop-blur-md md:p-6">
              <h2 className="text-lg font-bold text-white md:text-xl">Онлайн-заявка</h2>
              <p className="mt-2 text-[14px] leading-snug text-zinc-500">
                Заполните поля — откроется письмо на почту сети с вашими данными. Достаточно отправить его из почтового
                клиента.
              </p>

              {sent ? (
                <p className="mt-5 rounded-lg border border-amber-400/30 bg-amber-400/10 px-3 py-2.5 text-sm text-amber-200">
                  Если почта не открылась автоматически, напишите на {siteConfig.email} или позвоните{" "}
                  {siteConfig.phone}.
                </p>
              ) : null}

              <form className="mt-5 space-y-5" onSubmit={handleSubmit}>
                <Field label="Имя">
                  <input required name="name" autoComplete="name" className={underlineInput} placeholder="" />
                </Field>

                <Field label="Телефон">
                  <input
                    required
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={underlineInput}
                    placeholder=""
                  />
                </Field>

                <Field label="Email (необязательно)">
                  <input name="email" type="email" autoComplete="email" className={underlineInput} placeholder="" />
                </Field>

                <Field label="Услуга">
                  <BookingSelect
                    name="service"
                    defaultValue="tire-fitting"
                    options={[
                      ...services.map((s) => ({ value: s.slug, label: s.title })),
                      { value: "other", label: "Другое / уточню по телефону" },
                    ]}
                  />
                </Field>

                <Field label="Адрес / точка сети">
                  <BookingSelect
                    name="location"
                    defaultValue="any"
                    options={bookingLocations.map((l) => ({ value: l.value, label: l.label }))}
                  />
                </Field>

                <Field label="Комментарий">
                  <textarea name="comment" rows={3} className={cn(underlineInput, "resize-none")} placeholder="" />
                </Field>

                <BookingConsentCheckbox />

                <button
                  type="submit"
                  className="w-full rounded-lg bg-white py-3 text-center text-sm font-bold text-zinc-950 transition hover:bg-zinc-100"
                >
                  Отправить заявку
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const underlineInput = cn(
  "mt-1 w-full border-0 border-b border-white/20 bg-transparent py-1.5 text-[15px] text-white outline-none transition-colors",
  "placeholder:text-zinc-600 focus:border-b-amber-400/60",
);

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <span className="text-[11px] font-medium tracking-wide text-zinc-500 uppercase">{label}</span>
      {children}
    </div>
  );
}
