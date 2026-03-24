import { TestimonialsMarquee } from "@/components/sections/testimonials-marquee";

export function ClientsSection() {
  return (
    <section id="clients" className="w-full scroll-mt-20 bg-black py-16 md:py-20" data-header-theme="dark">
      <TestimonialsMarquee />
    </section>
  );
}
