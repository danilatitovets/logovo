import type { PriceItem } from "@/types";

type PriceCardProps = {
  item: PriceItem;
};

export function PriceCard({ item }: PriceCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-base font-semibold">{item.service}</h3>
      <p className="mt-2 text-xl font-bold text-zinc-900">{item.price}</p>
      {item.note ? <p className="mt-1 text-xs text-zinc-500">{item.note}</p> : null}
    </article>
  );
}
