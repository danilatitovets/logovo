import type { Metadata } from "next";
import { SupportPage } from "@/components/support/support-page";

export const metadata: Metadata = {
  title: "Поддержка",
  description: "Помощь, контакты и каналы связи с LOGOVO.",
};

export default function SupportRoute() {
  return <SupportPage />;
}
