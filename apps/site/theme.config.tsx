import { usePathname } from "next/navigation";
import { DocsThemeConfig, useConfig } from "nextra-theme-docs";
import { Logo } from "@/components/shared/icons";
import Adsense from "@/components/adsense";
import Footer from "@/components/footer";

const config: DocsThemeConfig = {
  nextThemes: { defaultTheme: "light" },
  logo: (
    <>
      <Logo className="h-3 w-3 text-gray-600" />
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
  search: { component: <></> },
  docsRepositoryBase: "https://github.com/flexstart-org/docs",
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
  head: () => {
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
    defaultMenuCollapseLevel: 1,
    toggleButton: true,
  },
  main: ({ children }) => {
    return (
      <>
        <div className="w-full h-24 relative overflow-hidden">
          <div className="w-full !h-56 absolute">
            <Adsense />
          </div>
        </div>
        {children}
        <div className="overflow-hidden">
          <Adsense />
          {/* <Adsense data-ad-format="autorelaxed" data-ad-slot="3683525643" /> */}
        </div>
      </>
    );
  },
  navigation: {
    prev: true,
    next: true,
  },
  toc: {
    extraContent: (
      <div className="w-full h-56 relative">
        <div className="w-full !h-56 absolute overflow-hidden">
          <Adsense />
        </div>
      </div>
    ),
  },
  editLink: { text: "" },
  footer: {
    component: <Footer />,
  },
};

export default config;
