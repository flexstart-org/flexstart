"use client";

import Link from "next/link";
import useSWR from "swr";
import Cookies from "js-cookie";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { Crisp } from "crisp-sdk-web";
import { fetcher } from "@/lib/utils";
import { UserProps } from "@/lib/types";
import { Divider, Logo } from "@/components/shared/icons";
import ProBanner from "@/components/layout/dashboard/pro-banner";
import AccountSelect from "@/components/layout/dashboard/account-select";
import UserDropdown from "@/components/layout/dashboard/user-dropdown";
import NavTabs from "@/components/layout/dashboard/nav-tabs";

// async function getUser() {
//   const res = await fetch(`/api/users`, { cache: "no-store" });
//   if (!res.ok) {
//     throw new Error("Failed to fetch data");
//   }
//   return res.json();
// }

export default function DashboardLayout({
  children,
  bgWhite,
}: {
  children: ReactNode;
  bgWhite?: boolean;
}) {
  const router = useRouter();
  const params = useParams() as { slug?: string };
  const { slug } = params;
  const { data: session } = useSession();
  const { data: user } = useSWR<UserProps>(`/api/users`, fetcher);

  if (!session && typeof session != "undefined") {
    router.push(`/login`);
  }

  useEffect(() => {
    Crisp.configure("fd30a7ff-e58e-4364-9ad7-81e119a763cd");
  }, []);

  useEffect(() => {
    if (session?.user?.email) {
      Crisp.user.setEmail(session.user.email);
      Crisp.user.setNickname(session.user.name || session.user.email);
    }

    if (user?.plan === "free" && Cookies.get("hideProBanner") !== "true") {
      setShowProBanner(true);
    }
  }, [session, user]);

  const [showProBanner, setShowProBanner] = useState(false);

  return (
    <div>
      {/* <Meta /> */}
      {showProBanner && <ProBanner setShowProBanner={setShowProBanner} />}
      <div
        className={`min-h-screen w-full ${bgWhite ? "bg-white" : "bg-gray-50"}`}
      >
        <div className="sticky top-0 left-0 right-0 z-30 border-b border-gray-200 bg-white">
          <div className="mx-auto max-w-screen-xl px-2.5 md:px-20">
            <div className="flex h-16 items-center justify-between">
              <div className="flex items-center">
                <Link href="/">
                  <Logo className="h-8 w-8 transition-all duration-75 active:scale-95" />
                </Link>
                <Divider className="h-8 w-8 text-gray-200 sm:ml-3" />
                <AccountSelect
                  session={session}
                  pname={slug}
                  plan={user?.plan}
                />
              </div>
              <UserDropdown
                name={session?.user?.name}
                email={session?.user?.email}
                image={session?.user?.image}
              />
            </div>
            <NavTabs />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
