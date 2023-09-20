/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    serverActions: true,
  },
  images: { domains: ["static.flexstart.org"] },
  async redirects() {
    return [];
  },
};
