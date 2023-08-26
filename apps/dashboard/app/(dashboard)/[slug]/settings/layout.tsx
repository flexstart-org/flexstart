"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function SettingsLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: { slug: string };
}) {
  const pathname = usePathname();
  const { slug } = params;

  const tabs = [
    {
      name: "General",
      href: `/${slug}/settings`,
    },
    {
      name: "People",
      href: `/${slug}/settings/people`,
    },
  ];

  return (
    <>
      <div className="flex h-36 items-center border-b border-gray-200 bg-white">
        <MaxWidthWrapper>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl text-gray-600">Settings</h1>
          </div>
        </MaxWidthWrapper>
      </div>
      <MaxWidthWrapper className="grid items-start py-10 md:grid-cols-5">
        <div className="flex gap-1 md:grid">
          {tabs.map(({ name, href }) => (
            <Link
              href={href}
              key={href}
              className={`${
                pathname === href ? "font-semibold text-black" : ""
              } rounded-md p-2.5 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200`}
            >
              {name}
            </Link>
          ))}
        </div>
        <div className="grid gap-5 md:col-span-4">{children}</div>
      </MaxWidthWrapper>
    </>
  );
}
