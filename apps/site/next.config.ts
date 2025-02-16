import nextra from "nextra";

const withNextra = nextra({
  staticImage: true,
  latex: true,
  search: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
  readingTime: true,
});

const nextConfig = withNextra({
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ["pbs.twimg.com"],
  },
  async redirects() {
    return [
      {
        source: "/login",
        destination: "https://dash.flexstart.org/login",
        permanent: false,
      },
      {
        source: "/signup",
        destination: "https://dash.flexstart.org/signup",
        permanent: false,
      },
    ];
  },
});

export default nextConfig;
