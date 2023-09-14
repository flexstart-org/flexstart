export default function Hero() {
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="relative isolate overflow-hidden bg-orange-50 px-6 pt-16 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-black sm:text-5xl">
              Don't listen to
              <br />
              What they say,
              <br />
              Go see
            </h2>
            <p className="mt-6 leading-8 text-sm">
              Your ultimate travel companion. Carries all the information
              <br /> you need while travelling.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
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
                  <p>Apple Store</p>
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
                  <p className="text-xs text-gray-400">Get it from </p>
                  <p>Google Play</p>
                </div>
              </a>
            </div>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <img
              className="absolute left-0 top-0 w-[25rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://nextap.eu/img/references/steller/mockup.png"
              alt="App screenshot"
              width={240}
              height={240}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
