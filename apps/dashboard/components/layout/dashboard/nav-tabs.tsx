"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useMemo } from "react";

const TabsHelper = (params) => {
  const { slug } = params;

  if (slug) {
    return [
      { name: "Project", href: `/${slug}` },
      { name: "Settings", href: `/${slug}/settings` },
    ];
  }

  return [
    { name: "Overview", href: `/` },
    { name: "Secrets", href: `/secrets` },
    { name: "Usage", href: `/usage` },
    { name: "Settings", href: `/settings` },
  ];
};

export default function NavTabs() {
  const pathname = usePathname();
  const params = useParams();

  const tabs = useMemo(() => {
    if (!params) {
      return [];
    } else {
      return TabsHelper(params);
    }
  }, [params]);

  return (
    <div className="-mb-0.5 flex h-12 items-center justify-start space-x-2">
      {tabs.map(({ name, href }) => (
        <Link
          key={href}
          href={href}
          className={`border-b-2 p-1 ${
            // hacky approach to getting the current tab – will replace with useSelectedLayoutSegments when upgrading to Next.js 13
            pathname?.split("?")[0].split("/").slice(0, 3).join("/") === href
              ? "border-black text-black"
              : "border-transparent text-gray-600 hover:text-black"
          }`}
        >
          <div className="rounded-md px-3 py-2 transition-all duration-75 hover:bg-gray-100 active:bg-gray-200">
            <p className="text-sm">{name}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
