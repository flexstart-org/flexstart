import Image from "next/image";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import {
  ArrowPathIcon,
  CloudArrowUpIcon,
  FingerPrintIcon,
} from "@heroicons/react/24/outline";

export default function Features() {
  return (
    <MaxWidthWrapper className="text-center">
      <div className="items-center py-16">
        <p className="my-6 text-base font-semibold leading-7 text-gray-600">
          BUILD UP A COMMUNITY
        </p>
        <h3 className="text-3xl font-semibold text-black font-display">
          Join the biggest community of Travellers
        </h3>
        <div className="flex justify-center">
          <Image src="/people.webp" width={720} height={480} alt="community" />
        </div>
      </div>

      <div className="justify-between my-10 lg:flex">
        <div className="flex justify-center">
          <Image src="/photography.png" width={480} height={360} alt="image" />
        </div>
        <div>
          <Feat1 />
        </div>
      </div>

      <div className="justify-between lg:flex">
        <div className="flex justify-center">
          <Feat2 />
        </div>
        <div className="flex justify-center">
          <Image src="/mob.svg" width={480} height={480} alt="mob" />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}

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

export function Feat1() {
  return (
    <div className="py-12 bg-white">
      <div className="max-w-lg px-6 mx-auto lg:px-8">
        <div className="max-w-lg mx-auto lg:text-center">
          <h2 className="py-4 text-base font-semibold leading-7 text-gray-600 text-start">
            GET CONNECTED
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

export function Feat2() {
  return (
    <div className="py-24 bg-white sm:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="max-w-2xl mx-auto lg:mx-0">
          <h2 className="text-base font-semibold leading-7 text-gray-600 text-start">
            POPULAR TRAVELLERS
          </h2>
          <p className="mt-5 text-3xl font-bold tracking-tight text-gray-900 text-start sm:text-4xl">
            Know the people you&apos;re <br /> going to meet
          </p>
        </div>
        <div className="max-w-2xl mx-auto lg:mx-0">
          <article className="flex flex-col items-start justify-between max-w-xl">
            <div className="relative group">
              <p className="my-10 text-sm leading-6 text-gray-600 text-start line-clamp-3">
                have a quick observation anytime you need with your <br />{" "}
                fellow travellers you&apos;re going to travel with.
              </p>
            </div>
            <div className="flex -space-x-2 overflow-hidden">
              <Image
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                width={32}
                height={32}
                alt=""
              />
              <Image
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                width={32}
                height={32}
                alt=""
              />
              <Image
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
                width={32}
                height={32}
                alt=""
              />
              <Image
                className="inline-block w-10 h-10 rounded-full ring-2 ring-white"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                width={32}
                height={32}
                alt=""
              />
            </div>
            <div className="relative group">
              <p className="mt-10 text-sm leading-6 text-gray-600 text-start line-clamp-3">
                With one simple click you can know who you can have <br /> as
                your travel buddy.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
