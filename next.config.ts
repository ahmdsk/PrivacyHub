import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: {
    // Keep dynamic SSR fresh
    staleTimes: { dynamic: 0 },
  },
};
export default nextConfig;
