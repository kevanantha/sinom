import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "strapi.monis.rent",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "www.monis.rent",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  transpilePackages: ["three"],
}

export default nextConfig
