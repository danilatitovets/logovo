import type { Metadata } from "next";
import { ContactSection } from "@/components/sections/contact-section";

export const metadata: Metadata = {
  title: "Контакты",
  description: "Телефон, почта и Instagram сети LOGOVO в Минске.",
};

export default function ContactsPage() {
  return <ContactSection />;
}
