import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function Features() {
  return (
    <MaxWidthWrapper className="text-center">
      <div className="items-center">
        <p className="my-5 text-gray-600 sm:text-md">BUILD UP A COMMUNITY</p>
        <h3 className="text-3xl font-semibold text-black font-display">
          Join the biggest community of Travellers
        </h3>
        <div className="flex justify-center"><img src="/people.webp" alt="community" /></div>
        
      </div>

      <div className="justify-between my-10 align-middle lg:flex">
        <div className="flex justify-center">
          <img src="/photography.png" alt="image" />
        </div>
        <div>
          <Feat />
        </div>
      </div>

      <div className="flex justify-between">
        <div>khfa</div>
        <div>
          <img src="/mob.svg" width={420} alt="mob" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";

const features = [
  {
    name: "Sign Up",
    description:
      "Make an account and login to keep yourself updated into travellers platforms.",
    icon: FingerPrintIcon,
  },
  {
    name: "Create Events",
    description:
      "Create an event to gather your fellow travellers and get to know them.",
    icon: ArrowPathIcon,
  },
  {
    name: "Share Memories",
    description:
      "Upload and share stories with your fellow travellers anytime.",
    icon: CloudArrowUpIcon,
  },
];

export function Feat() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-xl px-6 mx-auto lg:px-8">
        <div className="max-w-lg mx-auto lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-gray-600">
            Get Connected
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 text-start sm:text-4xl">
            Share your memories <br /> with your travel buddys
          </p>
        </div>
        <div className="max-w-lg mx-auto mt-12">
          <dl className="grid max-w-md grid-cols-1 gap-x-8 gap-y-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900 text-start">
                  <div className="absolute top-0 left-0 flex items-center justify-center w-10 h-10 bg-indigo-600 rounded-lg">
                    <feature.icon
                      className="w-6 h-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  {feature.name}
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 text-start">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}
