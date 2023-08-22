import nextra from "nextra";

const withNextra = nextra({
  theme: "nextra-theme-docs",
  themeConfig: "./theme.config.tsx",
  staticImage: true,
  latex: true,
  flexsearch: {
    codeblocks: false,
  },
  defaultShowCopyCode: true,
  readingTime: true,
});

const nextConfig = withNextra({
  reactStrictMode: true,
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
