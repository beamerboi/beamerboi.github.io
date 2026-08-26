import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghassen Jemiai | Software Engineer",
  description:
    "Software engineer focused on practical SaaS products, payment flows, automation tools, and AI-backed systems.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
