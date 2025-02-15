/***********************************/

/*  Tooltip Contents  */
import Link from "next/link";
import { ReactNode, useRef, useState } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import BlurImage from "@/components/shared/blur-image";
import Slider from "@/components/shared/slider";
import { PRO_TIERS } from "@/lib/stripe/constants";
import { nFormatter } from "@/lib/utils";

export default function Tooltip({
  children,
  content,
  fullWidth,
}: {
  children: ReactNode;
  content: ReactNode | string;
  fullWidth?: boolean;
}) {
  const [openTooltip, setOpenTooltip] = useState(false);
  const mobileTooltipRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();
  const transitionProps = { type: "spring", stiffness: 500, damping: 30 };

  async function handleDragEnd(_, info) {
    const offset = info.offset.y;
    const velocity = info.velocity.y;
    const height = mobileTooltipRef.current?.getBoundingClientRect().height;
    if (offset > height! / 2 || velocity > 800) {
      await controls.start({ y: "100%", transition: transitionProps });
      setOpenTooltip(false);
    } else {
      controls.start({ y: 0, transition: transitionProps });
    }
  }

  return (
    <>
      <button
        type="button"
        className={`${fullWidth ? "w-full" : "inline-flex"} sm:hidden`}
        onClick={() => setOpenTooltip(true)}
      >
        {children}
      </button>
      <AnimatePresence>
        {openTooltip && (
          <>
            <motion.div
              ref={mobileTooltipRef}
              key="mobile-tooltip"
              className="fixed inset-x-0 bottom-0 z-40 w-screen group cursor-grab active:cursor-grabbing sm:hidden"
              initial={{ y: "100%" }}
              animate={{
                y: openTooltip ? 0 : "100%",
                transition: transitionProps,
              }}
              exit={{ y: "100%" }}
              transition={transitionProps}
              drag="y"
              dragDirectionLock
              onDragEnd={handleDragEnd}
              dragElastic={{ top: 0, bottom: 1 }}
              dragConstraints={{ top: 0, bottom: 0 }}
            >
              <div
                className={`rounded-t-4xl -mb-1 flex h-7 w-full items-center justify-center border-t border-gray-200 bg-white`}
              >
                <div className="w-6 h-1 -mr-1 transition-all bg-gray-300 rounded-full group-active:rotate-12" />
                <div className="w-6 h-1 transition-all bg-gray-300 rounded-full group-active:-rotate-12" />
              </div>
              <div className="flex min-h-[150px] w-full items-center justify-center overflow-hidden bg-white align-middle shadow-xl">
                {typeof content === "string" ? (
                  <span className="block max-w-xs text-sm text-center text-gray-700">
                    {content}
                  </span>
                ) : (
                  content
                )}
              </div>
            </motion.div>
            <motion.div
              key="mobile-tooltip-backdrop"
              className="fixed inset-0 z-30 bg-gray-100 bg-opacity-10 backdrop-blur sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpenTooltip(false)}
            />
          </>
        )}
      </AnimatePresence>
      <TooltipPrimitive.Provider delayDuration={100}>
        <TooltipPrimitive.Root>
          <TooltipPrimitive.Trigger className="hidden sm:inline-flex" asChild>
            {children}
          </TooltipPrimitive.Trigger>
          <TooltipPrimitive.Content
            sideOffset={4}
            side="top"
            className="z-30 items-center hidden overflow-hidden bg-white border border-gray-200 rounded-md animate-slide-up-fade drop-shadow-lg sm:block"
          >
            <TooltipPrimitive.Arrow className="text-white fill-current" />
            {typeof content === "string" ? (
              <div className="p-5">
                <span className="block max-w-xs text-sm text-center text-gray-700">
                  {content}
                </span>
              </div>
            ) : (
              content
            )}
            <TooltipPrimitive.Arrow className="text-white fill-current" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Root>
      </TooltipPrimitive.Provider>
    </>
  );
}

export function TooltipContent({
  title,
  cta,
  ctaLink,
}: {
  title: string;
  cta?: string;
  ctaLink?: string;
}) {
  return (
    <div className="flex flex-col items-center max-w-xs p-5 space-y-3 text-center">
      <p className="text-sm text-gray-700">{title}</p>
      {cta && ctaLink && (
        <Link
          href={ctaLink}
          className="mt-4 rounded-full border border-black bg-black py-1.5 px-3 text-sm text-white transition-all hover:bg-white hover:text-black"
        >
          {cta}
        </Link>
      )}
    </div>
  );
}

export function OGImageProxy() {
  return (
    <div className="flex flex-col items-center max-w-md p-5 space-y-5 text-center">
      <BlurImage
        alt="Demo GIF for OG Image Proxy"
        src="https://res.cloudinary.com/dubdotsh/image/upload/v1664425639/og-image-proxy-demo.gif"
        width={1200}
        height={1084}
        className="w-full overflow-hidden rounded-md shadow-md"
      />
      <p className="text-sm text-gray-700">
        Add a custom OG image in front of your target URL. Bots like
        Twitter/Facebook will be served this image, while users will be
        redirected to your target URL.
      </p>
    </div>
  );
}

export function ProTiers({ usageLimit }: { usageLimit: number }) {
  const [tier, setTier] = useState(
    usageLimit > 1000 ? PRO_TIERS.map((t) => t.quota).indexOf(usageLimit) : 0
  );

  return (
    <div className="w-full rounded-md">
      <div className="flex items-center justify-between w-full max-w-md p-5">
        <h3 className="text-2xl text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
          {PRO_TIERS[tier]?.name}
        </h3>
        <div className="flex items-center">
          <p className="text-2xl font-semibold text-gray-700">
            ${PRO_TIERS[tier]?.price.monthly.amount}
          </p>
          <p className="text-sm text-gray-700">/mo</p>
        </div>
      </div>
      <div className="flex flex-col items-center w-full p-5 space-y-1 text-center border-t border-gray-200 bg-gray-50">
        <Slider
          value={tier}
          setValue={setTier}
          maxValue={PRO_TIERS.length - 1}
        />
        <p className="text-sm text-gray-700">
          Up to {nFormatter(PRO_TIERS[tier]?.quota ?? 0)} link clicks/mo
        </p>
      </div>
    </div>
  );
}
