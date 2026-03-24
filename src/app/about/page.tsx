import type { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/about-page-content";

export const metadata: Metadata = {
  title: "О нас",
  description:
    "Команда LOGOVO: мастера, стандарты качества и честный сервис шиномонтажа в Минске.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
