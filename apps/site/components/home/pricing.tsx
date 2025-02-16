"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Confetti from "react-dom-confetti";
// import { MinusCircle } from "lucide-react";
import {
  CheckCircleFill,
  QuestionCircle,
  XCircleFill,
} from "@/components/shared/icons";
import Slider from "@/components/shared/slider";
import { Switch } from "@headlessui/react";
import Tooltip from "@/components/shared/tooltip";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import { PRO_TIERS } from "@/lib/stripe/constants";
import { nFormatter } from "@/lib/utils";

const pricingItems = [
  {
    plan: "Free",
    tagline: "For testing or development",
    quota: "1 pod/mo",
    features: [
      {
        text: "Free Forever",
      },
      { text: "Limited bandwidth" },
      { text: "HTTPS/SSL by default" },
      {
        text: "Free custom domains",
        footnote: "Just bring any domain you own and link it to your project.",
      },
      {
        text: "Deployment Protection",
        negative: true,
      },
      { text: "Advanced Support", negative: true },
    ],
    cta: "Start for free",
    ctaLink: "https://dash.flexstart.org/register",
  },
  {
    plan: "Pro",
    tagline: "For teams with increased usage",
    features: [
      {
        text: "Unlimited users",
      },
      { text: "Unlimited bandwidth" },
      { text: "HTTPS/SSL by default" },
      {
        text: "Free custom domains",
        footnote: "You can link your own domain to your project.",
      },
      {
        text: "Deployment Protection",
      },
      { text: "Advanced Support", negative: true },
    ],
    cta: "Get started",
    ctaLink: "https://dash.flexstart.org/register",
  },
  {
    plan: "Enterprise",
    tagline: "For businesses with custom needs",
    quota: "Custom no. of pods",
    features: [
      {
        text: "All Pro plan benefits",
        footnote: "Features provided in Pro plan are included.",
      },
      { text: "Dedicated cluster" },
      { text: "DDoS Protection" },
      { text: "Multi-Region cluster" },
      {
        text: "SLA for 99.99% Uptime",
      },
      { text: "Advanced Support" },
    ],
    cta: "Contact us",
    ctaLink: "https://flexstart.org/contact",
  },
];

const Pricing = () => {
  const [tier, setTier] = useState(0);
  const [annualBilling, setAnnualBilling] = useState(false);
  const period = useMemo(
    () => (annualBilling ? "yearly" : "monthly"),
    [annualBilling]
  );

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <MaxWidthWrapper className="my-20 text-center">
      <div id="pricing" className="mx-auto my-10 sm:max-w-lg">
        <h2 className="text-4xl font-extrabold text-black font-display sm:text-5xl">
          Simple,{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text">
            usage-based
          </span>{" "}
          pricing
        </h2>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Start for free, no credit card required. Upgrade anytime.
        </p>
      </div>

      <div className="relative flex items-center mx-auto space-x-2 mb-14 max-w-fit">
        <p className="text-gray-600">Billed Monthly</p>
        <Confetti
          active={period === "yearly"}
          config={{ elementCount: 200, spread: 90 }}
        />
        <Switch
          checked={annualBilling}
          onChange={setAnnualBilling}
          className={classNames(
            annualBilling ? "bg-indigo-600" : "bg-gray-200",
            "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          )}
        >
          <span
            aria-hidden="true"
            className={classNames(
              annualBilling ? "translate-x-3.5" : "translate-x-0",
              "h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out"
            )}
          />
        </Switch>
        <p className="text-gray-600">Billed Annually</p>
        <span className="absolute -top-8 -right-12 rounded-full bg-purple-200 px-3 py-1 text-sm text-purple-700 sm:-right-[9.5rem] sm:-top-2">
          🎁 2 months FREE
        </span>
      </div>

      <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
        {pricingItems.map(
          ({ plan, tagline, quota, features, cta, ctaLink }) => {
            return (
              <div
                key={plan}
                className={`relative rounded-2xl bg-white ${
                  plan === "Pro"
                    ? "border-2 border-blue-600 shadow-blue-200"
                    : "border border-gray-200"
                } shadow-lg`}
              >
                {plan === "Pro" && (
                  <div className="absolute left-0 right-0 w-32 px-3 py-2 mx-auto text-sm font-medium text-white rounded-full -top-5 bg-gradient-to-r from-blue-600 to-cyan-600">
                    Popular
                  </div>
                )}

                <div className="p-5">
                  <h3 className="my-3 text-3xl font-bold text-center font-display">
                    {plan}
                  </h3>
                  <p className="text-gray-500">{tagline}</p>
                  {plan === "Enterprise" ? (
                    <p className="my-5 text-6xl font-semibold font-display">
                      Custom
                    </p>
                  ) : (
                    <div className="flex justify-center my-5">
                      <p className="text-6xl font-semibold font-display">
                        $
                        {plan === "Pro"
                          ? period === "yearly"
                            ? nFormatter(
                                PRO_TIERS[tier]?.price.yearly.amount ?? 0,
                                1
                              )
                            : PRO_TIERS[tier]?.price.monthly.amount
                          : 0}
                      </p>
                    </div>
                  )}

                  <p className="text-gray-500">
                    {period === "yearly" ? "per year" : "per month"}
                  </p>
                </div>
                <div className="flex items-center justify-center h-20 border-t border-b border-gray-200 bg-gray-50">
                  {plan === "Pro" ? (
                    <div className="flex flex-col items-center space-y-1">
                      <Slider
                        value={tier}
                        setValue={setTier}
                        maxValue={PRO_TIERS.length - 1}
                      />
                      <div className="flex items-center">
                        <p className="text-sm text-gray-600">
                          {nFormatter(PRO_TIERS[tier]?.quota ?? 0)} pods/mo
                        </p>
                        <Tooltip content="No. of pods you can run in a month.">
                          <div className="flex justify-center w-6 h-4">
                            <QuestionCircle className="w-4 h-4 text-gray-600" />
                          </div>
                        </Tooltip>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <p className="text-gray-600">{quota}</p>
                      <Tooltip content="No. of pods you can run in a month">
                        <div className="flex justify-center w-8 h-4">
                          <QuestionCircle className="w-4 h-4 text-gray-600" />
                        </div>
                      </Tooltip>
                    </div>
                  )}
                </div>
                <ul className="px-8 my-10 space-y-5">
                  {features.map(({ text, footnote, negative }) => (
                    <li key={text} className="flex space-x-5">
                      <div className="flex-shrink-0">
                        {
                          // neutral ? (
                          //   <MinusCircle
                          //     fill="#D4D4D8"
                          //     className="w-6 h-6 text-white"
                          //   />
                          // ) :
                          negative ? (
                            <XCircleFill className="w-6 h-6 text-gray-300" />
                          ) : (
                            <CheckCircleFill className="w-6 h-6 text-green-500" />
                          )
                        }
                      </div>
                      {footnote ? (
                        <div className="flex items-center">
                          <p
                            className={
                              negative ? "text-gray-400" : "text-gray-600"
                            }
                          >
                            {text}
                          </p>
                          <Tooltip content={footnote}>
                            <div className="flex justify-center w-8 h-4">
                              <QuestionCircle className="w-4 h-4 text-gray-600" />
                            </div>
                          </Tooltip>
                        </div>
                      ) : (
                        <p
                          className={
                            negative ? "text-gray-400" : "text-gray-600"
                          }
                        >
                          {text}
                        </p>
                      )}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-gray-200" />
                <div className="p-5">
                  <Link
                    href={ctaLink}
                    className={`${
                      plan === "Pro"
                        ? "border border-transparent bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:border-blue-700 hover:bg-white hover:bg-clip-text hover:text-transparent"
                        : "border border-gray-200 bg-black text-white hover:border-black hover:bg-white hover:text-black"
                    } block w-full rounded-full py-2 font-medium transition-all`}
                  >
                    {cta}
                  </Link>
                </div>
              </div>
            );
          }
        )}
      </div>
    </MaxWidthWrapper>
  );
};

export default Pricing;
