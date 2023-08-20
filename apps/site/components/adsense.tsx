import { useRouter } from "next/router";
import { useRef } from "react";
import { useState, useEffect } from "react";

function Ads() {
  const adsRef = useRef<HTMLModElement | null>(null);

  useEffect(() => {
    const executeWindowAds = () => {
      try {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (e) {
        console.log(e);
      }
    };

    const insHasChildren = adsRef.current?.childNodes.length;
    if (!insHasChildren) {
      executeWindowAds();
    }
  }, []);

  return (
    <ins
      ref={adsRef}
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-8782359641457789"
      data-ad-slot="6787609555"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}

export default function Adsense() {
  const router = useRouter();
  const [adUnit, setAdUnit] = useState(true);

  useEffect(() => {
    const onRouteChangeStart = () => setAdUnit(false);
    const onRouteChangeComplete = () => setAdUnit(true);

    router.events.on("routeChangeStart", onRouteChangeStart);
    router.events.on("routeChangeComplete", onRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", onRouteChangeStart);
      router.events.off("routeChangeComplete", onRouteChangeComplete);
    };
  }, [router.events]);

  return adUnit ? <Ads /> : null;
}
