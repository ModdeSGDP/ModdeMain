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
  images: {
    domains: ["modde.s3.us-east-1.amazonaws.com"], // Allow images from S3 bucket
  },
};

export default nextConfig;
