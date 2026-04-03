import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "@/data/social";

/** Крупная надпись внизу футера */
const FOOTER_WORDMARK = "/images/logovo.webp";

export function Footer() {
  const phoneHref = `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}`;

  return (
    <footer className="border-t border-white/10 bg-black text-zinc-100" data-header-theme="dark">
      <div className="mx-auto w-full min-w-0 max-w-6xl px-3 pt-10 pb-0 sm:px-4 md:px-6 md:pt-16">
        <div className="grid min-w-0 gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1.6fr)] lg:gap-14 lg:items-start">
          <div className="flex min-w-0 max-w-md flex-col">
            <Link href="/" className="w-fit text-sm font-semibold tracking-tight text-white">
              {siteConfig.name}
            </Link>
            <p className="mt-4 text-[13px] leading-relaxed text-zinc-500">
              {siteConfig.name}: шиномонтаж, ремонт и покраска дисков, обслуживание колёс. Сеть сервисов в городе.
            </p>
            <p className="mt-8 text-xs leading-relaxed text-zinc-600">
              © {new Date().getFullYear()} {siteConfig.name}. Все права защищены.
            </p>
          </div>

          <div className="grid min-w-0 gap-6 sm:grid-cols-2 sm:gap-8 sm:gap-x-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)_minmax(13.5rem,1.2fr)] lg:gap-x-8 lg:gap-y-6">
            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">Сайт</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Главная
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Услуги
                  </Link>
                </li>
                <li>
                  <Link href="/prices" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Прайс
                  </Link>
                </li>
                <li>
                  <Link href="/locations" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Адреса
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">Компания</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/about" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    О нас
                  </Link>
                </li>
                <li>
                  <Link href="/#team" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Команда
                  </Link>
                </li>
                <li>
                  <Link href="/#clients" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Клиенты
                  </Link>
                </li>
                <li>
                  <Link href="/cases" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Кейсы
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">Помощь</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link href="/book" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Записаться
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Поддержка
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="text-[15px] text-white transition-colors hover:text-zinc-300">
                    Контакты
                  </Link>
                </li>
              </ul>
            </div>

            <div className="min-w-0">
              <p className="text-[11px] font-semibold tracking-[0.2em] text-zinc-500 uppercase">Контакты</p>
              <ul className="mt-3 space-y-2">
                <li>
                  <a
                    href={phoneHref}
                    className="inline-block max-w-full text-[15px] leading-snug text-white underline-offset-2 transition-colors hover:text-zinc-300 max-sm:whitespace-normal sm:whitespace-nowrap"
                  >
                    {siteConfig.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="inline-block max-w-full text-[15px] leading-snug text-white underline-offset-2 transition-colors hover:text-zinc-300 break-all sm:whitespace-nowrap sm:break-normal"
                  >
                    {siteConfig.email}
                  </a>
                </li>
                <li>
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block max-w-full text-[15px] leading-snug text-white underline-offset-2 transition-colors hover:text-zinc-300 max-sm:whitespace-normal sm:whitespace-nowrap"
                  >
                    Instagram · @{INSTAGRAM_HANDLE}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 md:mt-9">
          <div className="flex justify-center pt-1 pb-0 md:pt-1.5">
            <Image
              src={FOOTER_WORDMARK}
              alt="LOGOVO"
              width={900}
              height={280}
              className="block w-full max-w-[min(96vw,820px)] -translate-y-1 object-contain object-bottom md:-translate-y-1.5"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}
