/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["static.flexstart.org", "images.unsplash.com", "nextap.eu"],
  },
};

module.exports = nextConfig;
