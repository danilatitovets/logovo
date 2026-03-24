import { cn } from "@/lib/utils";

type LeadFormProps = {
  /** `dark` — как карточки на странице «Поддержка» */
  variant?: "light" | "dark";
};

export function LeadForm({ variant = "light" }: LeadFormProps) {
  const dark = variant === "dark";

  return (
    <form
      className={cn(
        "grid gap-3 rounded-2xl p-6",
        dark
          ? "border border-white/10 bg-zinc-950/40"
          : "border border-zinc-200 bg-white",
      )}
    >
      <input
        className={cn(
          "h-11 rounded-lg px-3 text-sm outline-none transition-colors",
          dark
            ? "border border-white/20 bg-black/30 text-white placeholder:text-zinc-500 focus:border-amber-400/40"
            : "border border-zinc-300 focus:border-zinc-500",
        )}
        name="name"
        placeholder="Имя"
      />
      <input
        className={cn(
          "h-11 rounded-lg px-3 text-sm outline-none transition-colors",
          dark
            ? "border border-white/20 bg-black/30 text-white placeholder:text-zinc-500 focus:border-amber-400/40"
            : "border border-zinc-300 focus:border-zinc-500",
        )}
        name="phone"
        placeholder="Телефон"
      />
      <textarea
        className={cn(
          "min-h-24 rounded-lg px-3 py-2 text-sm outline-none transition-colors",
          dark
            ? "border border-white/20 bg-black/30 text-white placeholder:text-zinc-500 focus:border-amber-400/40"
            : "border border-zinc-300 focus:border-zinc-500",
        )}
        name="message"
        placeholder="Сообщение"
      />
      <button
        type="submit"
        className={cn(
          "h-11 rounded-lg px-4 text-sm font-semibold transition",
          dark
            ? "bg-white text-zinc-900 hover:bg-zinc-100"
            : "bg-zinc-900 text-white hover:bg-zinc-700",
        )}
      >
        Отправить заявку
      </button>
    </form>
  );
}
