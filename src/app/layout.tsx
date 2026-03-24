import type { Metadata } from "next";
import { ScrollTriggerRouteCleanup } from "@/components/effects/scroll-trigger-route-cleanup";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { fontDisplay, fontUi } from "@/lib/fonts";
import { siteConfig } from "@/data/site";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className={`${fontUi.variable} ${fontDisplay.variable}`}>
      <body className={`${fontUi.className} min-h-screen bg-black text-zinc-100 antialiased`}>
        <ScrollTriggerRouteCleanup />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
