"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { CheckCircleFill } from "@/components/shared/icons";
import { Switch } from "@headlessui/react";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

const pricingItems = [
  {
    plan: "Standard",
    tagline: "All the basics for businesses that are just getting started.",
    price: 29,
    features: [
      { text: "Organizes your travel plans" },
      { text: "Find places near hotel" },
      { text: "Tallies & displays travel stats" },
    ],
    cta: "Get Started",
    ctaLink: "#register",
  },
  {
    plan: "Essentials",
    tagline: "Advanced features for travelling that are needed",
    price: 99,
    features: [
      { text: "Tracks reward programs" },
      { text: "Find places near hotel" },
      { text: "Find alternative flights" },
      { text: "Shows transportation option" },
    ],
    cta: "Get started",
    ctaLink: "#register",
  },
  {
    plan: "Premium",
    tagline: "Advanced features for pros who need more customization",
    price: 129,
    features: [
      { text: "Country specific travel info" },
      { text: "Finds better hotels" },
      { text: "Shows security wait items" },
      { text: "Tracks reward programs" },
    ],
    cta: "Get started",
    ctaLink: "#register",
  },
];

const Pricing = () => {
  const [annualBilling, setAnnualBilling] = useState(false);
  const period = useMemo(
    () => (annualBilling ? "yearly" : "monthly"),
    [annualBilling]
  );

  function classNames(...classes: any) {
    return classes.filter(Boolean).join(" ");
  }

  return (
    <MaxWidthWrapper className="my-20 text-center">
      <div id="pricing" className="mx-auto my-10 sm:max-w-lg">
        <p className="my-5 text-base font-semibold leading-7 text-gray-600">PRICING TABLE</p>
        <h2 className="text-3xl font-semibold text-black font-display">
          Choose the plan that&apos;s right for you
        </h2>
      </div>

      <div className="px-16 py-6 overflow-hidden sm:px-36 bg-orange-50 isolate sm:rounded-3xl lg:px-4 xl:px-16">
        <div className="relative flex items-center mx-auto space-x-2 mb-14 max-w-fit">
          <p className="text-gray-600">Billed Monthly</p>

          <Switch
            checked={annualBilling}
            onChange={setAnnualBilling}
            className={classNames(
              annualBilling ? "bg-orange-600" : "bg-gray-200",
              "flex w-8 flex-none cursor-pointer rounded-full p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-3">
          {pricingItems.map(
            ({ plan, tagline, price, features, cta, ctaLink }) => {
              return (
                <div
                  key={plan}
                  className={`relative rounded-2xl bg-white border border-gray-200 shadow-lg`}
                >
                  <div className="flex mt-5 ml-5">
                    <p className="text-2xl font-semibold font-display">
                      ${price}
                    </p>
                    <span className="text-gray-500"> / per month</span>
                  </div>
                  <div className="p-5">
                    <h3 className="mb-3 text-lg font-bold text-start font-display">
                      {plan}
                    </h3>
                    <p className="text-sm text-gray-500 text-start">
                      {tagline}
                    </p>
                  </div>
                  <hr />
                  <ul className="px-4 my-10 space-y-2 min-h-[124px]">
                    {features.map(({ text }) => (
                      <li key={text} className="flex space-x-2">
                        <div className="flex-shrink-0">
                          <CheckCircleFill className="w-5 h-5 text-green-500" />
                        </div>
                        <p className={"text-gray-600 text-sm text-start"}>
                          {text}
                        </p>
                      </li>
                    ))}
                  </ul>
                  <div className="p-5">
                    <Link
                      href={ctaLink}
                      className="block w-full py-2 font-medium text-black transition-all bg-white border border-orange-500 rounded-full hover:text-white hover:bg-orange-500"
                    >
                      {cta}
                    </Link>
                  </div>
                </div>
              );
            }
          )}
        </div>
      </div>
    </MaxWidthWrapper>
  );
};

export default Pricing;
