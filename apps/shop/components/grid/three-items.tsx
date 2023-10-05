import { GridTileImage } from "components/grid/tile";
// import type { Product } from "lib/shopify/types";
import Link from "next/link";

function ThreeItemGridItem({
  item,
  size,
  priority,
}: {
  item: any;
  size: "full" | "half";
  priority?: boolean;
}) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block w-full h-full aspect-square"
        href={`/product/${item?.handle}`}
      >
        <GridTileImage
          src={item?.featuredImage?.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item?.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item?.title as string,
            amount: item?.priceRange.maxVariantPrice?.amount,
            currencyCode: item?.priceRange.maxVariantPrice?.currencyCode,
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  const homepageItems = await fetch("https://shop.flexstart.org/api/products", {
    method: "GET",
    cache: "no-store",
  }).then((res) => res.json());

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="grid gap-4 px-4 pb-4 mx-auto max-w-screen-2xl md:grid-cols-6 md:grid-rows-2">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
