"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "@/lib";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [auth_code: string]: string | string[] | undefined };
}) {
  const { auth_code } = searchParams;
  const Auth_URL =
    "https://api-t1.fyers.in/api/v3/generate-authcode?client_id=S3ZENE8T7T-100&redirect_uri=trade.flexstart.org&response_type=code&state=fyers";

  const router = useRouter();
  const [accessToken, setAccessToken] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="flex h-screen w-screen justify-center">
        <div className="z-10 mt-[calc(30vh)] h-fit w-full max-w-md overflow-hidden sm:rounded-2xl border border-gray-100 sm:shadow-xl">
          <div className="flex flex-col space-y-3 bg-gray-50 px-4 py-8 sm:px-16">
            {accessToken ? (
              <div className="break-words text-sm">{accessToken}</div>
            ) : auth_code ? (
              <button
                className="flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none border-black bg-white text-black hover:bg-black hover:text-white"
                onClick={() => {
                  const token = getAccessToken(auth_code);
                  setAccessToken(token);
                }}
              >
                get token
              </button>
            ) : (
              <button
                className="flex h-10 w-full items-center justify-center space-x-2 rounded-md border text-sm transition-all focus:outline-none border-black bg-white text-black hover:bg-black hover:text-white"
                onClick={() => {
                  setLoading(true);
                  router.push(Auth_URL);
                }}
              >
                {loading ? (
                  <p>loading...</p>
                ) : (
                  <>
                    <p>Login with Fyers</p>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
