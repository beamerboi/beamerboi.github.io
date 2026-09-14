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
      <head>
        <script
          src="https://analytics.northlinestudio.io/api/script.js"
          data-site-id="88086660b315"
          defer
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
