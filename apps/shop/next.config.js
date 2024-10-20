/** @type {import('next').NextConfig} */
module.exports = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.flexstart.org",
      },
    ],
  },
  async redirects() {
    return [];
  },
};
