import { usePathname } from "next/navigation";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Logo } from "@/components/shared/icons";
import Adsense from "@/components/adsense";
import Footer from "@/components/footer";

const config: DocsThemeConfig = {
  search: { component: <></> },
  docsRepositoryBase: "https://github.com/flexstart-org/flexstart",
  editLink: { text: "" },
  footer: { component: Footer },
  nextThemes: { defaultTheme: "light" },
  navigation: { prev: true, next: true },
  logo: (
    <>
      <Logo className="w-3 h-3 text-gray-600" />
      <span className="ml-2 font-bold">Flexstart</span>
    </>
  ),
  project: {
    icon: (
      <p className="rounded-full border border-black bg-black px-4 py-1.5 text-sm text-white transition-all hover:bg-white hover:text-black">
        Sign In
      </p>
    ),
    link: "https://dash.flexstart.org/login",
  },
  useNextSeoProps() {
    const pathname = usePathname();
    if (pathname == "/") {
      return {
        title: "Flexstart – Serverless Kubernetes platform",
        description:
          "Flexstart is a serverless container orchestration platform that removes the operational overhead of scaling, patching, securing, and managing servers and lets you focus on building applications.",
        additionalMetaTags: [
          {
            name: "keywords",
            content:
              "flexstart, serverless kubernetes platform, serverless, docker, kubernetes, k8s, docker container, container orchestration, hosting, container hosting",
          },
        ],
      };
    } else {
      return {
        titleTemplate: "%s",
      };
    }
  },
  head: function Head() {
    const { title } = useConfig();
    const pathname = usePathname();
    const url = `https://flexstart.org${pathname}`;
    const img = `https://flexstart.org/_static/thumbnail.png`;

    return (
      <>
        <meta data-rh="true" name="title" content={title} />
        <meta
          data-rh="true"
          name="apple-mobile-web-app-title"
          content="Flexstart – Serverless Kubernetes platform"
        />
        <meta
          data-rh="true"
          name="author"
          content="Flexstart Software Solutions"
        />
        <meta data-rh="true" name="og:image" content={img} />
        <meta
          data-rh="true"
          name="twitter:card"
          content="summary_large_image"
        />
        <meta data-rh="true" name="twitter:image" content={img} />
        <meta
          data-rh="true"
          name="twitter:site:domain"
          content="flexstart.org"
        />
        <meta
          data-rh="true"
          name="twitter:url"
          content="https://flexstart.org"
        />
        <meta data-rh="true" name="msapplication-TileColor" content="#ffffff" />
        <meta data-rh="true" name="theme-color" content="#ffffff" />
        <meta
          data-rh="true"
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta data-rh="true" httpEquiv="Content-Language" content="en" />
        <meta data-rh="true" property="og:url" content={url} />
        <meta data-rh="true" property="og:type" content="website" />
        <meta data-rh="true" property="og:site_name" content="Flexstart" />
        <link data-rh="true" rel="canonical" href={url} />
        <link data-rh="true" rel="icon" href="/favicon.ico" />
        <link
          data-rh="true"
          rel="icon"
          href="/favicon.svg"
          type="image/svg+xml"
        />
        <link data-rh="true" rel="icon" href="/favicon.png" type="image/png" />
        <link
          data-rh="true"
          rel="icon"
          href="/favicon-dark.svg"
          type="image/svg+xml"
          media="(prefers-color-scheme: dark)"
        />
        <link
          data-rh="true"
          rel="icon"
          href="/favicon-dark.png"
          type="image/png"
          media="(prefers-color-scheme: dark)"
        />
      </>
    );
  },
  sidebar: {
    titleComponent: ({ title, type }) => {
      if (type === "separator") {
        return <span className="cursor-default">{title}</span>;
      }
      return <>{title}</>;
    },
    defaultMenuCollapseLevel: 2,
    toggleButton: true,
  },
  main: ({ children }) => {
    return (
      <>
        {/* <div className="relative w-full h-24 overflow-hidden">
          <div className="w-full !h-24 absolute">
            <Adsense />
          </div>
        </div> */}
        {children}
        <div className="w-auto h-32 overflow-hidden">
          <Adsense />
          {/* <Adsense data-ad-format="autorelaxed" data-ad-slot="3683525643" /> */}
        </div>
      </>
    );
  },
  toc: {
    title: "On This Page",
    float: true,
    // backToTop: true,
    extraContent: (
      <div className="relative w-full h-56">
        <div className="absolute w-full h-56">
          <Adsense />
        </div>
      </div>
    ),
  },
};

export default config;
