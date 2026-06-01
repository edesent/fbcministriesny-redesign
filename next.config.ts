import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  async redirects() {
    return [
      // 301s from the old Wix site paths to the new clean URLs
      { source: "/copy-of-gospel", destination: "/about", permanent: true },
      { source: "/copy-of-fbc-calendar", destination: "/events", permanent: true },
      { source: "/need-counseling", destination: "/counseling", permanent: true },
      { source: "/fbc-missions", destination: "/missions", permanent: true },
      { source: "/copy-of-church-information", destination: "/contact", permanent: true },
      { source: "/gospel", destination: "/about", permanent: true },
      { source: "/fbc-calendar", destination: "/events", permanent: true },
      { source: "/church-information", destination: "/contact", permanent: true },
    ];
  },
};

export default nextConfig;
