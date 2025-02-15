import { Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import type { Metadata } from "next";
import { Logo } from "@/components/shared/icons";
import Footer from "@/components/footer";
import Adsense from "@/components/adsense";
import { Toaster } from "react-hot-toast";
import "@/styles/global.css";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: {
      default: "Flexstart – Serverless Kubernetes platform",
      template: "%s | Flexstart",
    },
    metadataBase: new URL("https://flexstart.org"),
    applicationName: "Flexstart",
    appleWebApp: {
      title: "Flexstart",
    },
    twitter: {
      site: "https://flexstart.org",
    },
    // other: {
    //   'msapplication-TileColor': '#fff'
    // },
  };
}

// const banner = <Banner storageKey="some-key">New release 🎉</Banner>
const navbar = (
  <Navbar
    logo={
      <>
        <Logo className="w-3 h-3 text-white" />
        <span className="ml-2 font-bold">Flexstart</span>
      </>
    }
    projectIcon={
      <p className="px-4 py-2 text-sm text-white transition-all bg-gray-900 rounded-lg hover:bg-white hover:text-black">
        Sign In
      </p>
    }
    projectLink="https://dash.flexstart.org/login"
  />
);
const footer = <Footer />;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={navbar}
          search={<></>}
          pageMap={await getPageMap()}
          docsRepositoryBase="https://github.com/flexstart-org/flexstart"
          nextThemes={{ defaultTheme: "light" }}
          editLink={""}
          footer={footer}
          sidebar={{ defaultMenuCollapseLevel: 2, toggleButton: true }}
          toc={{
            title: "On This Page",
            float: true,
            extraContent: (
              <div className="relative w-full h-96">
                <div className="absolute w-full h-96">
                  <Adsense />
                </div>
              </div>
            ),
          }}
          navigation={{ prev: true, next: true }}
        >
          <svg height="0px" width="0px">
            <defs>
              <linearGradient
                id="pink-gradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="rgba(156, 81, 161, 1)" />
                <stop offset="70%" stopColor="rgba(255, 30, 86, 1)" />
              </linearGradient>
            </defs>
          </svg>
          <Toaster position="bottom-center" />
          {children}
          <div className="w-auto overflow-hidden max-h-32">
            <Adsense />
            {/* <Adsense data-ad-format="autorelaxed" data-ad-slot="3683525643" /> */}
          </div>
        </Layout>
      </body>
    </html>
  );
}
