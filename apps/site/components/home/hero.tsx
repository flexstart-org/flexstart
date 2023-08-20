import Link from "next/link";

const Hero = () => {
  return (
    <div className="mx-auto mt-20 mb-10 max-w-md px-2.5 text-center sm:max-w-xl sm:px-0">
      <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.15] text-black sm:text-6xl sm:leading-[1.15]">
        <span className="bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent">
          Run and scale containerized applications
        </span>
      </h1>
      <h2 className="mt-5 text-gray-600 sm:text-xl">
        Flexstart removes the need to own, run, and manage the compute
        infrastructure so that you can focus on what matters most: your
        applications
      </h2>

      <div className="mx-auto mt-10 flex max-w-fit space-x-4">
        <Link
          href="https://dash.flexstart.org/signup"
          className="rounded-full border border-black bg-black py-2 px-5 text-sm text-white shadow-lg transition-all hover:bg-white hover:text-black"
        >
          Start Free Trial
        </Link>
      </div>
    </div>
  );
};

export default Hero;
