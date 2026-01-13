import type { Metadata } from "next";
import { Merriweather, Source_Sans_3 } from "next/font/google";

import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import PlausibleScript from "@/components/PlausibleScript";
import { siteConfig } from "@/lib/site";

const display = Merriweather({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-display"
});

const body = Source_Sans_3({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body"
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://pinehillslawn.com"
  ),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    type: "website"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-screen">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <PlausibleScript />
        <Navbar />
        <main id="main" className="pb-24 md:pb-0">
          {children}
        </main>
        <Footer />
        <MobileCtaBar />
      </body>
    </html>
  );
}
