import { LocationCard } from "@/components/cards/location-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { locations } from "@/data/locations";

export function LocationsSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-16" data-header-theme="dark">
      <SectionHeading title="??????" description="4 ??????? LOGOVO ?? ??????." />
      <div className="grid gap-4 md:grid-cols-2">
        {locations.map((item) => (
          <LocationCard key={item.slug} item={item} />
        ))}
      </div>
    </section>
  );
}
