// import Link from "next/link";
import type { Metadata } from "next";
import Hero from "@/components/home/hero";
import Logos from "@/components/home/logos";
import Features from "@/components/home/features";
// import Testimonials from "@/components/home/testimonials";
// import Pricing from "@/components/home/pricing";
// import Background from "@/components/shared/background";

export const metadata: Metadata = {
  title: "Flexstart – Serverless Kubernetes platform",
  description:
    "Flexstart is a serverless container orchestration platform that removes the operational overhead of scaling, patching, securing, and managing servers and lets you focus on building applications.",
  keywords:
    "flexstart, serverless kubernetes platform, serverless, docker, kubernetes, k8s, docker container, container orchestration, hosting, container hosting",
};

export default function Home() {
  const stats = [
    { id: 1, name: "Users", value: "4,600" },
    { id: 2, name: "No. of Pods running", value: "39,212" },
    { id: 3, name: "Projects", value: "18,600" },
  ];

  return (
    <div className="bg-gradient-to-br from-indigo-50 via-white to-sky-50">
      <div className="z-10">
        <Hero />
        <Logos />
        <Features />
        <div className="pb-24 sm:pb-32">
          <div className="px-6 mx-auto max-w-7xl lg:px-8">
            <dl className="grid grid-cols-1 text-center gap-x-8 gap-y-16 lg:grid-cols-3">
              {stats.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col max-w-xs mx-auto gap-y-4"
                >
                  <dt className="text-base leading-7 text-gray-600">
                    {stat.name}
                  </dt>
                  <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
                    {stat.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
        {/* <Testimonials /> */}
      </div>
    </div>
  );
}
