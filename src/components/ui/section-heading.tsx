import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title: string;
  description?: string;
  /** Тёмный фон: светлый текст */
  variant?: "default" | "dark";
};

export function SectionHeading({ title, description, variant = "default" }: SectionHeadingProps) {
  const dark = variant === "dark";
  return (
    <div className="mb-8 max-w-2xl">
      <h2
        className={cn(
          "text-3xl font-bold tracking-tight",
          dark ? "text-white" : "text-zinc-900",
        )}
      >
        {title}
      </h2>
      {description ? (
        <p className={cn("mt-3", dark ? "text-zinc-400" : "text-zinc-600")}>{description}</p>
      ) : null}
    </div>
  );
}
