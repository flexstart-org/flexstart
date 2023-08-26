/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "www.google.com",
      "avatar.vercel.sh",
      "res.cloudinary.com",
      "pbs.twimg.com",
      "media.flexstart.org",
    ],
  },
}

module.exports = nextConfig
