import type { Metadata } from "next";
import { Header } from "./_components/header";
import { Footer } from "./_components/footer";
import "./_styles/marketing.css";

export const metadata: Metadata = {
  title: {
    default: "ReviewKiosk — Turn Happy Customers Into 5-Star Reviews",
    template: "%s | ReviewKiosk",
  },
  description:
    "A countertop kiosk that captures customer sentiment, routes happy customers to leave Google reviews, and intercepts unhappy ones with private feedback. One-time purchase or $21.99/mo.",
  keywords: [
    "review kiosk",
    "google review kiosk",
    "customer review tablet",
    "review gathering kiosk",
    "get more google reviews",
    "restaurant review kiosk",
    "business review device",
    "5 star review kiosk",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "ReviewKiosk",
    title: "ReviewKiosk — Turn Happy Customers Into 5-Star Reviews",
    description:
      "A countertop kiosk that captures customer sentiment and drives Google reviews. $249 one-time or $21.99/mo.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@400,500,700,800&f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-zinc-950 text-zinc-100 antialiased">
        <Header />
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
