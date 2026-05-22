import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GulfCoast Labs | Operational Startup Systems",
  description:
    "GulfCoast Labs builds operational startup systems, AppSec dashboards, backend infrastructure, deployment UX, and cinematic infrastructure branding.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-black text-white">{children}</body>
    </html>
  );
}
