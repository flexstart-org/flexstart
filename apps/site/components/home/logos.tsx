import BlurImage from "@/components/shared/blur-image";

const logos = [
  {
    alt: "MongoDB",
    src: "/_static/clients/MongoDB_Logo.svg",
    link: "mongodb.com",
    dimensions: "h-5 sm:h-8",
  },
  {
    alt: "AWS",
    src: "/_static/clients/AWS_Logo.svg",
    link: "amazonaws.com",
    dimensions: "h-5 sm:h-7",
  },
  {
    alt: "Stripe",
    src: "/_static/clients/Stripe_Logo.svg",
    link: "stripe.com",
    dimensions: "h-6 sm:h-8",
  },
  {
    alt: "Vercel",
    src: "/_static/clients/vercel.svg",
    link: "vercel.com",
    dimensions: "h-4 sm:h-5",
  },
  {
    alt: "Dub.sh",
    src: "/_static/clients/dub.svg",
    link: "dub.sh",
    dimensions: "h-4 sm:h-5",
  },
];

export default function Logos() {
  return (
    <div className="my-20">
      <p className="mx-auto max-w-sm text-center text-gray-600 sm:max-w-xl sm:text-lg">
        Credits
      </p>
      <div className="mx-auto mt-8 grid w-full max-w-screen-lg grid-cols-2 items-center gap-5 px-5 sm:grid-cols-5 sm:px-0">
        {logos.map(({ alt, src, dimensions }) => (
          <BlurImage
            key={alt}
            src={src}
            alt={alt}
            width={2418}
            height={512}
            className={`col-span-1 transition-all group-hover:opacity-20 group-hover:blur-sm ${dimensions}`}
          />
        ))}
      </div>
    </div>
  );
}
