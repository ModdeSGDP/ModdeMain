import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:3001/api*", // Proxy to Backend
      },
    ]
  },
  /* config options here */
};

export default nextConfig;
