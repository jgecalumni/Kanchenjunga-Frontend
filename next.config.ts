import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ["localhost","kanchenjunga-backend.jgecalumni.in"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
