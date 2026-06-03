import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const sans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Sprakers, NY`,
    template: `%s | ${site.name} · Sprakers, NY`,
  },
  description:
    "Faith Bible Church in Sprakers, NY is a Christ-centered church family Loving Jesus by Loving Others. Service times, ministries, and Faith Bible Academy.",
  applicationName: site.name,
  keywords: [
    "Faith Bible Church",
    "Sprakers NY church",
    "Carlisle NY church",
    "biblical counseling",
    "Christian school",
    "church ministries",
  ],
  openGraph: {
    title: `${site.name} | Sprakers, NY`,
    description:
      "Service times, ministries, biblical counseling, and contact information for Faith Bible Church in Sprakers, NY.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/church-building.jpg",
        width: 900,
        height: 600,
        alt: "Faith Bible Church building in Sprakers, New York",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.tagline}`,
    description:
      "A Christ-centered church family in Sprakers, New York.",
    images: ["/church-building.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f8f8f6",
  colorScheme: "light",
};

const churchJsonLd = {
  "@context": "https://schema.org",
  "@type": "Church",
  name: site.name,
  alternateName: "Faith Bible Church Sprakers",
  url: site.url,
  logo: `${site.url}/logo-full.png`,
  image: `${site.url}/church-building.jpg`,
  description:
    "Faith Bible Church is a Christ-centered congregation in Sprakers, NY, and home of Faith Bible Academy.",
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: "108 Crosby Road",
    addressLocality: "Sprakers",
    addressRegion: "NY",
    postalCode: "12166",
    addressCountry: "US",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 42.8262,
    longitude: -74.449,
  },
  sameAs: [site.facebookHref],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "09:45", closes: "12:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "18:00", closes: "19:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "19:00", closes: "20:00" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(churchJsonLd) }}
        />
        <Header />
        <main>{children}</main>
        <Footer />
        <Script
          src="https://slackwebsitechat.vercel.app/widget/wbc-chat.js"
          data-api="https://slackwebsitechat.vercel.app"
          data-key="wbc_cfbaa539e1ca0e7692f5e02f43c5cd78ca140ca5abc8b32b"
          strategy="afterInteractive"
        />
        <Analytics />
      </body>
    </html>
  );
}
