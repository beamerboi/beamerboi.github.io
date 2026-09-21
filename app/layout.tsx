import type { Metadata, Viewport } from "next";
import { assetPath, site } from "./site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: site.url,
  title: { default: site.title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: `${site.name} — Portfolio`,
  authors: [{ name: site.name, url: site.url.href }],
  creator: site.name,
  category: "technology",
  alternates: { canonical: site.url.href },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    url: site.url.href,
    title: site.title,
    description: site.description,
    siteName: `${site.name} — Portfolio`,
    locale: "en_US",
    alternateLocale: ["it_IT"],
    images: [
      {
        url: new URL("social-banner.png", site.url).href,
        width: 1200,
        height: 630,
        type: "image/png",
        alt: site.imageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jemi3i",
    creator: "@jemi3i",
    title: site.title,
    description: site.description,
    images: [
      { url: new URL("social-banner.png", site.url).href, alt: site.imageAlt },
    ],
  },
  icons: {
    icon: [
      {
        url: assetPath("favicon.ico"),
        sizes: "16x16 32x32 48x48",
        type: "image/x-icon",
      },
      {
        url: assetPath("favicon-32x32.png"),
        sizes: "32x32",
        type: "image/png",
      },
      { url: assetPath("favicon.svg"), sizes: "any", type: "image/svg+xml" },
    ],
    apple: [
      {
        url: assetPath("apple-touch-icon.png"),
        sizes: "180x180",
        type: "image/png",
      },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fefefd" },
    { media: "(prefers-color-scheme: dark)", color: "#171a18" },
  ],
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": site.url.href,
  url: site.url.href,
  name: site.title,
  description: site.description,
  inLanguage: ["en", "it"],
  author: {
    "@type": "Person",
    "@id": new URL("#ghassen-jemiai", site.url).href,
    name: site.name,
    url: site.url.href,
    jobTitle: "Software Engineer",
    sameAs: site.profiles,
    knowsAbout: [
      "Software engineering",
      "SaaS",
      "Web development",
      "Artificial intelligence",
      "Workflow automation",
    ],
  },
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
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />
        {process.env.NODE_ENV === "production" &&
          process.env.BLOG_BUILD_CHECK !== "true" && (
            <script
              src="https://analytics.northlinestudio.io/api/script.js"
              data-site-id="88086660b315"
              defer
            />
          )}
      </head>
      <body>{children}</body>
    </html>
  );
}
