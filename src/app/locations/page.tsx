import type { Metadata } from "next";
import { LocationsPlanetSection } from "@/components/sections/locations-planet-section";

export const metadata: Metadata = { title: "Адреса" };

export default function LocationsPage() {
  return <LocationsPlanetSection />;
}
