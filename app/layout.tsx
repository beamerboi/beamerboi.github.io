import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ghassen Jemiai | Software Engineer",
  description:
    "Software engineer building scalable SaaS, payment integrations, automation systems, and AI-based products.",
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
