"use client";

import Link from "next/link";
import cn from "classnames";
import { useSelectedLayoutSegment } from "next/navigation";
import useScroll from "@/lib/use-scroll";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export const navItems = [
  {
    name: "Reviews",
    href: "#reviews",
  },
  {
    name: "People",
    href: "#people",
  },
  {
    name: "Partners",
    href: "#partners",
  },
  {
    name: "Feedbacks",
    href: "#feedbacks",
  },
  {
    name: "Pricing",
    href: "#pricing",
  },
];

export default function Navbar() {
  const scrolled = useScroll(80);
  const selectedLayout = useSelectedLayoutSegment();

  return (
    <div
      className={cn(`sticky inset-x-0 top-0 z-30 w-full transition-all`, {
        "border-b border-gray-200 bg-white/75 backdrop-blur-lg": scrolled,
        "border-b border-gray-200 bg-white": selectedLayout,
      })}
    >
      <MaxWidthWrapper>
        <div className="flex items-center justify-between h-14">
          <Link href="/">
            <span className="w-20 h-20 font-bold">Travellers</span>
          </Link>
          <div className="flex items-center space-x-3">
            <div className="items-center hidden space-x-3 lg:flex">
              {navItems.map(({ name, href }) => (
                <Link
                  id={`nav-${href}`}
                  key={href}
                  href={`/${href}`}
                  className={cn(
                    "z-10 rounded-full px-4 py-1.5 text-sm font-medium capitalize text-gray-500 transition-colors ease-out hover:text-black",
                    {
                      "text-black": selectedLayout === href,
                    }
                  )}
                >
                  {name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:block">
              <Link
                href={`#`}
                className="animate-fade-in rounded-md border border-orange-500 bg-orange-500 px-2 py-1.5 text-xs text-white transition-all hover:bg-white hover:text-black"
              >
                Get the App
              </Link>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </div>
  );
}
