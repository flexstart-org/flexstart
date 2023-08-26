"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Crisp } from "crisp-sdk-web";
import { signOut } from "next-auth/react";
import { MessageCircle, Settings } from "lucide-react";
import { Logout } from "@/components/shared/icons";
import Popover from "@/components/shared/popover";
import IconMenu from "@/components/shared/icon-menu";
import { LoadingCircle } from "@/components/shared/icons";

export default function UserDropdown({ name, email, image }) {
  const [openPopover, setOpenPopover] = useState(false);
  const [openingSupport, setOpeningSupport] = useState(false);

  return (
    <div className="relative inline-block">
      <Popover
        content={
          <div className="flex w-full flex-col space-y-px rounded-md bg-white p-3 sm:w-56">
            <div className="p-2">
              {name && (
                <p className="truncate text-sm font-medium text-gray-900">
                  {name}
                </p>
              )}
              <p className="truncate text-sm text-gray-500">{email}</p>
            </div>
            <button
              className="w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
              onClick={() => {
                setOpeningSupport(true);
                Crisp.chat.open();
                Crisp.chat.show();
              }}
            >
              <IconMenu
                text="Support"
                icon={
                  openingSupport ? (
                    <LoadingCircle />
                  ) : (
                    <MessageCircle className="h-4 w-4" />
                  )
                }
              />
            </button>
            <Link
              href="/settings"
              className="block w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
            >
              <IconMenu
                text="Settings"
                icon={<Settings className="h-4 w-4" />}
              />
            </Link>
            <button
              className="w-full rounded-md p-2 text-sm transition-all duration-75 hover:bg-gray-100 active:bg-gray-200"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              <IconMenu text="Logout" icon={<Logout className="h-4 w-4" />} />
            </button>
          </div>
        }
        align="end"
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
      >
        <button
          onClick={() => setOpenPopover(!openPopover)}
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-gray-300 transition-all duration-75 focus:outline-none active:scale-95 sm:h-10 sm:w-10"
        >
          {name && (
            <Image
              alt={email || "Avatar for logged in user"}
              src={
                image || `https://avatars.dicebear.com/api/micah/${email}.svg`
              }
              width={40}
              height={40}
            />
          )}
        </button>
      </Popover>
    </div>
  );
}
