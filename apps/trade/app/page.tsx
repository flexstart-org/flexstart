"use client";

import { useEffect, useState } from "react";
import { getAccessToken, getProfile } from "@/lib";

export default function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [auth_code: string]: string | string[] | undefined };
}) {
  const { auth_code } = searchParams;
  const { Auth_URL } = process.env;

  const [accessToken, setAccessToken] = useState("");

  // useEffect(() => {
  //   if (auth_code) {
  //     setTimeout(() => {
  //       const token = getAccessToken(auth_code);
  //       setAccessToken(token);
  //     }, 500);
  //   }
  // }, []);

  return (
    <>
      {accessToken ? (
        <div className="break-words text-sm">{accessToken}</div>
      ) : auth_code ? (
        <button
          onClick={() => {
            const token = getAccessToken(auth_code);
            setAccessToken(token);
          }}
        >
          get token
        </button>
      ) : (
        <a href={`${Auth_URL}`}>Login</a>
      )}
    </>
  );
}
