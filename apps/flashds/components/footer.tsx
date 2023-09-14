"use client";

import { useState, ReactElement } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import cn from "classnames";

const navigation = {
  company: [
    { name: "Career", href: "#career" },
    { name: "About Us", href: "#about" },
    { name: "Blog", href: "#blog" },
    { name: "Press Info", href: "#press" },
    { name: "Features", href: "#Features" },
    { name: "Successes", href: "#Successes" },
  ],
  travellers: [
    { name: "Why Travellers", href: "#why-us" },
    { name: "Enterprise", href: "#enterprise" },
    { name: "Customers Stories", href: "#stories" },
    { name: "Pricing", href: "#pricing" },
    { name: "Security", href: "#security" },
  ],
  resources: [
    { name: "Download", href: "#download" },
    { name: "Help Center", href: "#help" },
    { name: "Guides", href: "#guides" },
    { name: "Events", href: "#events" },
    { name: "Developers", href: "#developers" },
    { name: "App Directory", href: "#directory" },
    { name: "Partners", href: "#partners" },
  ],
  extras: [
    { name: "Podcast", href: "#podcast" },
    { name: "Travellers Shop", href: "#shop" },
    { name: "Travellers at Work", href: "#work" },
    { name: "Travellers Fund", href: "#fund" },
    { name: "Integrations", href: "#integrations" },
  ],
};

export default function Footer(): ReactElement {
  return (
    <footer className="bg-[#FAFAFA] pb-[env(safe-area-inset-bottom)] relative">
      <div className="absolute top-0 h-12 w-full -translate-y-full bg-gradient-to-t from-[#FAFAFA] to-transparent" />
      <hr />
      <div
        className={cn(
          "mx-auto max-w-[90rem] py-12 flex justify-center md:justify-center text-black",
          "pl-[max(env(safe-area-inset-left),1.5rem)] pr-[max(env(safe-area-inset-right),1.5rem)]"
        )}
      >
        <div className="w-full" aria-labelledby="footer-heading">
          <h2 id="footer-heading" className="sr-only">
            Footer
          </h2>
          <div className="w-full py-8 mx-auto">
            <div className="xl:grid xl:grid-cols-3 xl:gap-8">
              <div className="grid grid-cols-1 gap-8 xl:col-span-2">
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 md:gap-8">
                  <div className="mt-12 md:!mt-0">
                    <h3 className="text-sm font-semibold text-gray-900">Company</h3>
                    <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                      {navigation.company.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-sm text-[#666666] no-underline betterhover:hover:text-gray-700 transition"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:!mt-0">
                    <h3 className="text-sm font-semibold text-gray-900">Travellers</h3>
                    <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                      {navigation.travellers.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-sm text-[#666666] no-underline betterhover:hover:text-gray-700 transition"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:!mt-0">
                    <h3 className="text-sm font-semibold text-gray-900">Resources</h3>
                    <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                      {navigation.resources.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-sm text-[#666666] no-underline betterhover:hover:text-gray-700 transition"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-12 md:!mt-0">
                    <h3 className="text-sm font-semibold text-gray-900">Extras</h3>
                    <ul role="list" className="mt-4 space-y-1.5 list-none ml-0">
                      {navigation.extras.map((item) => (
                        <li key={item.name}>
                          <Link
                            href={item.href}
                            className="text-sm text-[#666666] no-underline betterhover:hover:text-gray-700 transition"
                          >
                            {item.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <div className="mt-12 xl:!mt-0">
                <h3 className="text-sm text-black">Subscribe</h3>
                <SubmitForm />
              </div>
            </div>

            <div className="pt-8 mt-8 sm:flex sm:items-center sm:justify-between">
              <div>
                <a
                  className="text-current"
                  target="_blank"
                  rel="noopener noreferrer"
                  title="homepage"
                  href="/"
                >
                  <span className="font-bold">Travellers</span>
                </a>
                <p className="mt-4 text-xs text-gray-500">
                  &copy; {new Date().getFullYear()} Travellers, Inc. All rights
                  reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SubmitForm() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  return (
    <form
      className="mt-4 sm:flex sm:max-w-md"
      onSubmit={(e) => {
        fetch("/api/subscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        })
          .then((res) => res.json())
          .then((res) => {
            return router.push("/confirm");
          });
        e.preventDefault();
      }}
    >
      <label htmlFor="email-address" className="sr-only">
        Email address
      </label>
      <input
        type="email"
        name="email-address"
        id="email-address"
        autoComplete="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border-[#666666] w-full min-w-0 px-4 py-2 text-base text-gray-900 placeholder-gray-500 bg-white border rounded-md appearance-none sm:text-sm focus:outline-none focus:ring-2 focus:ring-gray-800 focus:placeholder-gray-400"
        placeholder="Email address"
      />
      <div className="mt-3 rounded-md sm:mt-0 sm:ml-3 sm:flex-shrink-0">
        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-2 text-base font-medium text-white bg-black border border-transparent rounded-md sm:text-sm betterhover:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-800"
        >
          Subscribe
        </button>
      </div>
    </form>
  );
}
