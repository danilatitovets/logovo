import type { Metadata } from "next";
import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";

export const metadata: Metadata = { title: "Отзывы — LOGOVO" };

export default function ClientsPage() {
  return (
    <section className="w-full bg-black py-14 md:py-20" data-header-theme="dark">
      <TestimonialsMarquee
        title="Отзывы клиентов"
        subtitle="Печать, брендинг и сопровождение — как это видят те, кто уже работал с нами."
      />
    </section>
  );
}
