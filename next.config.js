/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  productionBrowserSourceMaps: false,
  compiler: {
    // strip console.* in production bundles
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // reduce bundle size by deep-importing common libraries
    optimizePackageImports: [
      "@headlessui/react",
      "@heroicons/react",
      "react-hook-form",
      "zod",
    ],
  },
  modularizeImports: {
    // ensure per-icon imports for heroicons
    "@heroicons/react": {
      transform: "@heroicons/react/24/outline/{{member}}",
    },
  },
};

module.exports = nextConfig;

