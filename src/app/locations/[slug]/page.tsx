import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { locations } from "@/data/locations";

type LocationDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return locations.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: LocationDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const item = locations.find((location) => location.slug === slug);
  if (!item) return { title: "?????? ?? ??????" };
  return { title: item.name, description: item.address };
}

export default async function LocationDetailPage({ params }: LocationDetailProps) {
  const { slug } = await params;
  const item = locations.find((location) => location.slug === slug);

  if (!item) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-4xl px-4 py-14" data-header-theme="dark">
      <h1 className="text-3xl font-bold">{item.name}</h1>
      <p className="mt-4 text-zinc-700">{item.address}</p>
      <p className="mt-2 text-zinc-700">{item.phone}</p>
      <p className="mt-2 text-zinc-700">{item.hours}</p>
    </section>
  );
}
