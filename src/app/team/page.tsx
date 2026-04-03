import type { Metadata } from "next";
import { TeamCard } from "@/components/cards/team-card";
import { SectionHeading } from "@/components/ui/section-heading";
import { team } from "@/data/team";

export const metadata: Metadata = { title: "???? ???????" };

export default function TeamPage() {
  return (
    <section className="mx-auto w-full min-w-0 max-w-6xl overflow-x-hidden px-3 py-12 sm:px-4 md:py-14" data-header-theme="dark">
      <SectionHeading title="???? ???????" description="???????????????? ??????? LOGOVO." />
      <div className="grid gap-4 md:grid-cols-3">
        {team.map((item) => (
          <TeamCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
