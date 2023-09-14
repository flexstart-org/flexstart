import MaxWidthWrapper from "@/components/shared/max-width-wrapper";

export default function CTA() {
  return (
    <MaxWidthWrapper>
      <div className="bg-white">
        <div className="py-24 mx-auto max-w-7xl sm:py-32">
          <div className="relative px-2 py-16 overflow-hidden bg-orange-500 shadow-2xl isolate sm:rounded-3xl sm:px-16 lg:flex lg:gap-x-10">
            <div className="mx-auto text-center lg:mx-0 lg:flex-auto">
              <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Download the travellers community app now!
              </h2>
              <p className="mt-4 text-md leading-8 text-white">
                Be the first one to explore one of the best travel application
              </p>
              <div className="flex items-center justify-center mt-6 gap-x-6">
                <a
                  href="#"
                  className="flex rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg"
                    width={28}
                    alt="image"
                  />
                  <div className="ml-3">
                    <p className="text-xs text-gray-400">Download on the</p>
                    <p className="text-start">Apple Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="flex rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/55/Google_Play_2016_icon.svg"
                    width={28}
                    alt="image"
                  />
                  <div className="ml-3">
                    <p className="text-xs text-gray-400 text-start">Get it from </p>
                    <p>Google Play</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
