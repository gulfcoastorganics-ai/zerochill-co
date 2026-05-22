import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZeroChill Co. | Sovereign AI Infrastructure",
  description:
    "ZeroChill Co. builds sovereign AI infrastructure, localized deployment systems, telemetry-isolated operator tools, and edge inference surfaces.",
  openGraph: {
    title: "ZeroChill Co. | Sovereign AI Infrastructure",
    description:
      "Sovereign Zero and the Zero-State Matrix present a hardened interface for private AI deployment, local execution, and telemetry-isolated operations.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZeroChill Co. | Sovereign AI Infrastructure",
    description:
      "Sovereign Zero and the Zero-State Matrix present a hardened interface for private AI deployment, local execution, and telemetry-isolated operations.",
  },
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
