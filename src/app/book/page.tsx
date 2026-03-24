import type { Metadata } from "next";
import { BookingPageContent } from "@/components/booking/booking-page-content";

export const metadata: Metadata = {
  title: "Записаться",
  description:
    "Онлайн-заявка на шиномонтаж и сервис LOGOVO в Минске: удобное время, адрес сети, перезвоним для подтверждения.",
};

export default function BookPage() {
  return <BookingPageContent />;
}
