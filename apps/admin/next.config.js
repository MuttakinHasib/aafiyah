/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "example.com",
      },
      {
        hostname: "www.flaticon.com",
      },
      {
        hostname: "cdn-icons-png.flaticon.com",
      },
    ],
  },
  experimental: {
    typedRoutes: true,
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
  },
};

module.exports = nextConfig;
