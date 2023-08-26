import { useRouter } from "next/navigation";
import useSWR from "swr";
import { fetcher } from "@/lib/utils";
import { UserProps } from "@/lib/types";
import { LoadingDots } from "@/components/shared/icons";

export default function ProjectSlug() {
  const router = useRouter();

  const { data: user, error } = useSWR<UserProps>(
    "/api/projects/namespace",
    fetcher
  );
  const ns = user?.namespace;

  return (
    <div
      className="rounded-lg border border-gray-200 bg-white"
    >
      <div className="relative flex flex-col space-y-3 p-5 sm:p-10">
        <h2 className="text-xl font-medium">Your Namespace</h2>
        <div className="flex items-center space-x-1">
          <p className="text-sm text-gray-500">
            This is your namespace, used when interacting with the Flexstart API.
          </p>
        </div>
        <div />
        {ns ? (
          <input
            type="text"
            name="user-namespace"
            id="user-namespace"
            value={ns}
            readOnly
            placeholder="Flexstart"
            className="w-full max-w-md rounded-md border border-gray-300 text-sm text-gray-900 placeholder-gray-300 focus:border-gray-500 focus:outline-none focus:ring-gray-500"
          />
        ) : (
          <div className="h-[2.35rem] w-full max-w-md animate-pulse rounded-md bg-gray-200" />
        )}
      </div>

      {/* <div className="border-b border-gray-200" /> */}

      
    </div>
  );
}