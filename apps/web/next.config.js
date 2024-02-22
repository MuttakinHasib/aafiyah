/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "example.com",
      },
      {
        hostname: "res.cloudinary.com",
      },
      {
        hostname: "www.flaticon.com",
      },
      {
        hostname: "cdn-icons-png.flaticon.com",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
};

module.exports = nextConfig;
