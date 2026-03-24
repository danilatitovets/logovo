import { FAQSection } from "@/components/sections/faq-section";
import { CasesSection } from "@/components/sections/cases-section";
import { ClientsSection } from "@/components/sections/clients-section";
import { CosmicToLightTransition } from "@/components/sections/cosmic-to-light-transition";
import { HeroSection } from "@/components/sections/hero-section";
import { LocationsScrollSection } from "@/components/sections/locations-scroll-section-dynamic";
import { PricesSection } from "@/components/sections/prices-section";
import { ServicesSection } from "@/components/sections/services-section";
import { TeamSection } from "@/components/sections/team-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <PricesSection />
      <CasesSection />
      <TeamSection />
      <ClientsSection />
      <CosmicToLightTransition />
      <LocationsScrollSection />
      <FAQSection />
    </>
  );
}
