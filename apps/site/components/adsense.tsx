"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function Adsense() {
  const pathname = usePathname();

  useEffect(() => {
    try {
      if (typeof window !== "undefined") {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, [pathname]);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8782359641457789"
      data-ad-slot="6787609555"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
