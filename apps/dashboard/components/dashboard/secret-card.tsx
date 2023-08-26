"use client";

import { useState } from "react";
import { mutate } from "swr";
import toast from "react-hot-toast";
import BlurImage from "@/components/shared/blur-image";
import { Delete, ThreeDots } from "@/components/shared/icons";
import IconMenu from "@/components/shared/icon-menu";
import Tooltip, { TooltipContent } from "@/components/shared/tooltip";
import { SecretProps } from "@/lib/types";
import { fetcher, nFormatter } from "@/lib/utils";
import Popover from "../shared/popover";

export default function SecretCard({ name }: SecretProps) {
  const [deleting, setDeleting] = useState(false);

  return (
    // <Link key={name} href={`/${name}`}>
    <div className="flex justify-between rounded-lg bg-white p-6 shadow transition-all hover:shadow-md">
      <div className="flex items-center space-x-3">
        <BlurImage
          src={`https://www.google.com/s2/favicons?sz=64&domain_url=`}
          alt={name}
          className="h-9 w-9 flex-shrink-0 overflow-hidden rounded-full"
          width={48}
          height={48}
        />
        <div>
          <h2 className="text-lg font-medium text-gray-700">{name}</h2>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={async (e) => {
            e.preventDefault();
            setDeleting(true);
            fetch(`/api/secrets`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ name }),
            }).then(async (res) => {
              setDeleting(false);
              if (res.status === 200) {
                mutate("/api/secrets");
                toast.success(`Secret "${name}" deleted successfully.`);
              } else {
                const error = await res.json();
                toast.error(JSON.stringify(error));
              }
            });
          }}
          className="rounded-md p-2 font-medium text-red-600 transition-all duration-75 hover:bg-red-600 hover:text-white"
        >
          <IconMenu text="Delete" icon={<Delete className="h-4 w-4" />} />
        </button>
      </div>
    </div>
    // </Link>
  );
}
