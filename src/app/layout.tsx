import type { Metadata, Viewport } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description:
    "Faith Bible Church in Sprakers, NY is a Christ-centered church family loving Jesus by loving others.",
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
    title: `${site.name} | ${site.tagline}`,
    description:
      "Service times, ministries, biblical counseling, and contact information for Faith Bible Church in Sprakers, NY.",
    url: site.url,
    siteName: site.name,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/church-building.jpg",
        width: 1800,
        height: 1200,
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
  themeColor: "#f6f1e8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
