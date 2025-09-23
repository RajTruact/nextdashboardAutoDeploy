/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "plus.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn-icons-png.flaticon.com",
      },
      {
        protocol: "https",
        hostname: "previews.123rf.com",
      },
      {
        protocol: "https",
        hostname: "c8.alamy.com",
      },
      {
        protocol: "https",
        hostname: "akm-img-a-in.tosshub.com",
      },
      {
        protocol: "https",
        hostname: "www.truact.in",
      },
      {
        protocol: "https",
        hostname: "encrypted-tbn0.gstatic.com",
      },
      {
        protocol: "https",
        hostname: "static.langimg.com",
      },
      {
        protocol: "https",
        hostname: "cms.patrika.com",
      },
    ],
  },
  experimental: {
    viewTransition: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
