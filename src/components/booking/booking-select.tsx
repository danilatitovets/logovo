"use client";

import { useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type BookingSelectOption = { value: string; label: string };

type BookingSelectProps = {
  name: string;
  options: BookingSelectOption[];
  defaultValue?: string;
  className?: string;
};

export function BookingSelect({ name, options, defaultValue, className }: BookingSelectProps) {
  const first = options[0]?.value ?? "";
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(() => defaultValue ?? first);
  const rootRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const selectedLabel = options.find((o) => o.value === value)?.label ?? "";

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div ref={rootRef} className={cn("relative", className)}>
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        id={`${listId}-trigger`}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-controls={listId}
        className={cn(
          "mt-1 flex w-full min-h-9 items-center justify-between gap-2 border-0 border-b bg-transparent py-1.5 pr-0.5 text-left text-[15px] text-white outline-none transition-colors",
          open ? "border-b-amber-400/60" : "border-b border-white/20 focus:border-b-amber-400/60",
        )}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="min-w-0 flex-1 truncate">{selectedLabel}</span>
        <svg
          className={cn("size-4 shrink-0 text-zinc-500 transition-transform duration-200", open && "rotate-180")}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <ul
          id={listId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={`${listId}-opt-${value}`}
          className="absolute top-full right-0 left-0 z-80 mt-1 rounded-xl border border-white/12 bg-zinc-950/97 py-1.5 shadow-[0_24px_60px_rgba(0,0,0,0.72),0_0_0_1px_rgba(255,255,255,0.04)_inset] backdrop-blur-xl"
        >
          {options.map((opt) => {
            const selected = value === opt.value;
            return (
              <li key={opt.value} role="presentation" className="px-1">
                <button
                  type="button"
                  id={`${listId}-opt-${opt.value}`}
                  role="option"
                  aria-selected={selected}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-left text-[14px] leading-snug transition-colors",
                    selected
                      ? "bg-[rgba(217,255,88,0.12)] font-medium text-[rgba(235,252,170,0.98)]"
                      : "text-zinc-200 hover:bg-white/[0.07]",
                  )}
                  onClick={() => {
                    setValue(opt.value);
                    setOpen(false);
                  }}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center rounded border text-[10px]",
                      selected ? "border-amber-400/50 bg-amber-400/15 text-amber-300" : "border-white/15 text-transparent",
                    )}
                    aria-hidden
                  >
                    ✓
                  </span>
                  <span className="min-w-0 flex-1">{opt.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
}
