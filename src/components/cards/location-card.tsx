import Link from "next/link";
import type { Location } from "@/types";

type LocationCardProps = {
  item: Location;
};

export function LocationCard({ item }: LocationCardProps) {
  return (
    <article className="rounded-2xl border border-zinc-200 bg-white p-5">
      <h3 className="text-lg font-semibold">{item.name}</h3>
      <p className="mt-2 text-sm text-zinc-600">{item.address}</p>
      <p className="mt-1 text-sm text-zinc-600">{item.hours}</p>
      <Link className="mt-4 inline-block text-sm font-medium text-zinc-900" href={`/locations/${item.slug}`}>
        ? ???????
      </Link>
    </article>
  );
}
