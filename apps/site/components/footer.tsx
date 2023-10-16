import Link from "next/link";
import { ThemeSwitch } from "nextra-theme-docs";
import { ReactElement } from "react";
import { Github, LinkedIn, Logo, Twitter } from "@/components/shared/icons";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const navigation = {
  product: [{ name: "Pricing", href: "/pricing" }],
  resources: [
    { name: "Blog", href: "/blog" },
    { name: "Courses", href: "/courses" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Contact Us", href: "/contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer({ menu }: { menu?: boolean }): ReactElement {
  return (
    <footer className="pb-[env(safe-area-inset-bottom)] relative dark:bg-[#111111] bg-[#FAFAFA] backdrop-blur-lg">
      <div className="absolute top-0 h-12 w-full -translate-y-full bg-gradient-to-t from-[#FAFAFA] to-transparent dark:from-black pointer-events-none" />
      {/* <div
        className={`mx-auto max-w-[90rem] py-2 px-4 flex gap-2 ${
          menu ? "flex" : "hidden"
        }`}
      >
        <ThemeSwitch />
      </div> */}
      <hr className="dark:border-neutral-800" />
      <MaxWidthWrapper className="py-10">
        <div className="px-5 xl:px-0 xl:grid xl:grid-cols-5 xl:gap-8">
          <div className="space-y-8 xl:col-span-2">
            <Link href="/">
              <span className="sr-only">Flexstart Logo</span>
              <Logo className="dark:text-white h-7 w-7" />
            </Link>
            <p className="max-w-xs text-sm text-gray-500 dark:text-white">
              Run and scale containerized applications.
            </p>
            <div className="flex items-center space-x-2">
              <a
                href="https://twitter.com/flexstart_org"
                target="_blank"
                rel="noreferrer"
                className="p-2 transition-colors rounded-md hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="w-5 h-5 text-gray-600 dark:text-white" />
              </a>
              <div className="h-8 border-l border-gray-200 dark:border-neutral-700" />
              <a
                href="https://github.com/flexstart-org"
                target="_blank"
                rel="noreferrer"
                className="p-2 transition-colors rounded-md hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">Github</span>
                <Github className="w-5 h-5 text-gray-600 dark:text-white" />
              </a>
              <div className="h-8 border-l border-gray-200 dark:border-neutral-700" />
              <a
                href="https://www.linkedin.com/company/flexstart"
                target="_blank"
                rel="noreferrer"
                className="p-2 transition-colors rounded-md hover:bg-gray-100 active:bg-gray-200"
              >
                <span className="sr-only">LinkedIn</span>
                <LinkedIn className="w-5 h-5" fill="#52525B" />
              </a>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-16 xl:col-span-3 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white">
                  Product
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.product.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-[#888888]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-white">
                  Resources
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.resources.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-[#888888]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-600 dark:text-white">
                  Company
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.company.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-[#888888]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-10 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-600 dark:text-white">
                  Legal
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.legal.map((item) => (
                    <li key={item.name}>
                      <Link
                        href={item.href}
                        className="text-sm text-gray-500 hover:text-gray-900 dark:text-[#888888]"
                      >
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 mt-16 border-t border-gray-900/10 dark:border-neutral-800 sm:mt-20 lg:mt-24">
          <p className="text-sm leading-5 text-gray-500 dark:text-[#888888]">
            © {new Date().getFullYear()} Flexstart.org. All rights reserved.
          </p>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
}
