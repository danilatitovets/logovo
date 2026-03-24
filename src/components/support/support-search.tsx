"use client";

import { useCallback, useEffect, useRef } from "react";

type SupportSearchProps = {
  placeholder?: string;
};

function isApplePlatform() {
  if (typeof navigator === "undefined") return true;
  return /Mac|iPhone|iPad|iPod/.test(navigator.platform) || navigator.userAgent.includes("Mac");
}

export function SupportSearch({ placeholder = "Как записаться на шиномонтаж без очереди?" }: SupportSearchProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusSearch = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        focusSearch();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [focusSearch]);

  const shortcut = isApplePlatform() ? "⌘ K" : "Ctrl K";

  return (
    <div className="relative mx-auto w-full max-w-2xl">
      <span className="pointer-events-none absolute top-1/2 left-4 z-10 -translate-y-1/2 text-zinc-500" aria-hidden>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.2-3.2" strokeLinecap="round" />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="search"
        name="support-search"
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-xl border border-white/15 bg-zinc-950/80 py-3.5 pr-24 pl-12 text-[15px] text-zinc-100 placeholder:text-zinc-600 outline-none ring-emerald-500/30 transition-[box-shadow,border-color] focus:border-emerald-500/50 focus:ring-2"
        aria-label="Поиск по помощи"
      />
      <kbd
        className="pointer-events-none absolute top-1/2 right-3 z-10 hidden -translate-y-1/2 rounded-md border border-white/15 bg-zinc-900 px-2 py-1 font-mono text-[11px] text-zinc-500 sm:inline-block"
        aria-hidden
      >
        {shortcut}
      </kbd>
    </div>
  );
}
