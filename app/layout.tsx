import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroChill Co. | Sovereign Zero",
  description: "ZeroChill Co. landing page for Sovereign Zero, Zero-State Matrix, and local intelligence hardware.",
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
