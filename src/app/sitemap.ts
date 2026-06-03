import type { MetadataRoute } from "next";
import { ministries, site } from "@/lib/site";

// Explicit list of real, indexable pages. (Not derived from navItems, which
// includes on-page anchors like /#times that don't belong in a sitemap.)
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/about",
    "/about/constitution",
    "/ministries",
    ...ministries.map((m) => `/ministries/${m.slug}`),
    "/sermons",
    "/missions",
    "/events",
    "/counseling",
    "/give",
    "/contact",
  ];

  const now = new Date();
  return paths.map((path) => ({
    url: `${site.url}${path === "/" ? "" : path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
