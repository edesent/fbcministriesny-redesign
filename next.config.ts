import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  // Old Wix → new URL 301 redirects live in src/middleware.ts (true 301s).
};

export default nextConfig;
