import type { Metadata } from "next";
import "./_styles/dashboard.css";

export const metadata: Metadata = {
  title: {
    default: "Dashboard | ReviewKiosk",
    template: "%s | ReviewKiosk",
  },
  robots: { index: false, follow: false },
};

export default function DashboardRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50 text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
