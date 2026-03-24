import type { Client } from "@/types";

type ClientCardProps = {
  item: Client;
};

export function ClientCard({ item }: ClientCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="mt-2 text-sm text-zinc-600">{item.niche}</p>
    </article>
  );
}
