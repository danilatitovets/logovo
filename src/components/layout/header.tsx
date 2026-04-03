"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { navItems } from "@/data/nav";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

/** Высота полосы под шапкой (h-14 ≈ 56px): берём центр — какой фон «под» хедером */
const HEADER_PROBE_Y = 28;

type HeaderTheme = "darkHero" | "light";

function navLinkActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<HeaderTheme>(() => (pathname === "/" ? "darkHero" : "light"));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const resolveTheme = (): HeaderTheme => {
      const blocks = document.querySelectorAll<HTMLElement>("[data-header-theme]");
      if (blocks.length === 0) {
        return pathname === "/" ? "darkHero" : "light";
      }
      const probeY = HEADER_PROBE_Y;
      /** Снизу вверх по DOM: при совпадении берём последний блок — тот, что визуально перекрывает верх */
      const list = Array.from(blocks).reverse();
      for (const el of list) {
        const r = el.getBoundingClientRect();
        if (r.top <= probeY && r.bottom > probeY) {
          const t = el.dataset.headerTheme;
          if (t === "light") return "light";
          if (t === "dark") return "darkHero";
        }
      }
      return "darkHero";
    };

    const update = () => {
      setTheme(resolveTheme());
      setIsScrolled(window.scrollY > 22);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isDark = theme === "darkHero";
  const logoInvert = isDark && (siteConfig.logoInvertOnDark ?? true);

  const linkBase = isDark
    ? "rounded-full px-3 py-1.5 text-[12px] font-semibold text-zinc-400 transition-all duration-200 hover:bg-white/8 hover:text-white"
    : "rounded-full px-3 py-1.5 text-[12px] font-semibold text-zinc-600 transition-all duration-200 hover:bg-zinc-900/6 hover:text-zinc-900";

  const linkActive = isDark ? "bg-white/10 text-white" : "bg-zinc-900/10 text-zinc-900";

  return (
    <header
      className={[
        "sticky top-0 z-1000 border-b transition-all duration-300",
        isDark
          ? isScrolled
            ? "border-white/10 bg-black/65 backdrop-blur-xl"
            : "border-transparent bg-transparent"
          : "border-zinc-200/80 bg-white/80 backdrop-blur-md",
      ].join(" ")}
    >
      <div
        className={[
          "mx-auto flex w-full min-w-0 max-w-6xl items-center justify-between gap-2 px-3 transition-all duration-300 sm:gap-4 sm:px-4 md:px-6",
          isScrolled ? "h-14" : "h-18",
        ].join(" ")}
      >
        <Link
          href="/"
          className={cn(
            "flex shrink-0 items-center outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-violet-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-md",
            isScrolled ? "scale-100 opacity-100" : "scale-[1.02] opacity-95",
          )}
          aria-label={`${siteConfig.name} — на главную`}
        >
          <Image
            src={siteConfig.logoSrc}
            alt=""
            width={160}
            height={40}
            className={cn(
              "h-7 w-auto object-contain object-left md:h-8",
              logoInvert && "brightness-0 invert",
            )}
            priority
          />
        </Link>

        {/* Desktop / tablet: всё справа */}
        <div className="hidden min-w-0 flex-1 items-center justify-end md:flex">
          <div
            className={`flex items-center gap-1 rounded-full border px-1.5 py-1 ${
              isDark ? "border-white/12 bg-white/4" : "border-zinc-200 bg-white/85"
            } transition-all duration-300 ${isScrolled ? "shadow-none" : "shadow-[0_8px_28px_rgba(0,0,0,0.28)]"}`}
          >
          <nav
            className="flex max-w-[65vw] items-center gap-1 overflow-x-auto lg:max-w-none lg:overflow-visible"
            aria-label="Основное меню"
          >
            {navItems.map((item) => {
              const active = navLinkActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`shrink-0 whitespace-nowrap ${linkBase} ${active ? linkActive : ""}`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <Link
            href="/book"
            className={`ml-1 shrink-0 rounded-full px-4 py-2 text-[12px] font-semibold transition-all duration-200 ${
              isDark
                ? "bg-amber-400 text-zinc-950 hover:bg-amber-300 hover:shadow-[0_0_18px_rgba(250,204,21,0.35)]"
                : "bg-amber-400 text-zinc-950 hover:bg-amber-300"
            }`}
          >
            Записаться
          </Link>
          </div>
        </div>

        <button
          type="button"
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-md md:hidden ${
            isDark ? "text-zinc-300 hover:bg-white/10 hover:text-white" : "text-zinc-700 hover:bg-zinc-100"
          }`}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {mobileOpen ? (
        <div
          id="mobile-menu"
          className={[
            "border-t px-4 py-4 md:hidden",
            isDark ? "border-white/10 bg-black/60 backdrop-blur-lg" : "border-zinc-200 bg-white/95",
          ].join(" ")}
        >
          <nav className="mx-auto flex max-w-6xl flex-col gap-1" aria-label="Мобильное меню">
            {navItems.map((item) => {
              const active = navLinkActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={[
                    "rounded-lg px-3 py-3 text-[15px] font-medium",
                    isDark
                      ? active
                        ? "bg-white/10 text-white"
                        : "text-zinc-300 hover:bg-white/5 hover:text-white"
                      : active
                        ? "bg-zinc-100 font-semibold text-zinc-900"
                        : "text-zinc-700 hover:bg-zinc-50",
                  ].join(" ")}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/book"
              className={`mt-2 inline-flex items-center justify-center rounded-md py-3 text-[15px] font-semibold ${
                isDark ? "bg-white text-zinc-900" : "bg-zinc-900 text-white"
              }`}
              onClick={() => setMobileOpen(false)}
            >
              Записаться
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
