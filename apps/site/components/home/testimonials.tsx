import { nFormatter } from "@/lib/utils";
import Tweet from "@/components/shared/tweet";
import getTweets, { homepageTweets } from "@/lib/twitter";
import MaxWidthWrapper from "@/components/shared/max-width-wrapper";
import TestimonialsMobile from "@/components/home/testimonials-mobile";

export default async function Testimonials() {
  const userCount = 2500;
  const tweets = await getTweets(homepageTweets);

  return (
    <MaxWidthWrapper className="pt-20">
      <div className="mx-auto max-w-md text-center sm:max-w-xl">
        <h2 className="font-display text-4xl font-extrabold leading-tight text-black sm:text-5xl sm:leading-tight">
          Loved by{" "}
          <span className="bg-gradient-to-r from-red-600 to-amber-600 bg-clip-text text-transparent">
            {nFormatter(userCount)} users
          </span>
        </h2>
        <p className="mt-5 text-gray-600 sm:text-lg">
          Don&apos;t take it from us - here&apos;s what our users have to say
          about Flexstart.
        </p>
      </div>
      <TestimonialsMobile tweets={tweets} />
      <div className="hidden space-y-6 py-8 sm:block sm:columns-2 sm:gap-6 xl:columns-3">
        {tweets.filter(Boolean).map((tweet, idx) => (
          <Tweet
            key={idx}
            metadata={JSON.stringify(tweet)}
            className={
              idx < Math.floor(tweets.length / 3) ||
              idx >= Math.floor(tweets.length / 3) * 2
                ? "relative lg:top-16"
                : ""
            }
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
