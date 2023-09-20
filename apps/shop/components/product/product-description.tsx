import { AddToCart } from 'components/cart/add-to-cart';
import Price from 'components/price';
import Prose from 'components/prose';
import { Product } from 'lib/shopify/types';
import { VariantSelector } from './variant-selector';

export function ProductDescription({ product }: { product: Product }) {
  return (
    <>
      <div className="flex flex-col pb-6 mb-6 border-b dark:border-neutral-700">
        <h1 className="mb-2 text-5xl font-medium">{product.title}</h1>
        <div className="w-auto p-2 mr-auto text-sm text-white bg-blue-600 rounded-full">
          <Price
            amount={product.priceRange?.maxVariantPrice.amount}
            currencyCode={product.priceRange?.maxVariantPrice.currencyCode}
          />
        </div>
      </div>
      <VariantSelector options={product.options} variants={product.variants} />

      {product.descriptionHtml ? (
        <Prose
          className="mb-6 text-sm leading-tight dark:text-white/[60%]"
          html={product.descriptionHtml}
        />
      ) : null}

      <AddToCart variants={product.variants} availableForSale={product.availableForSale} />
    </>
  );
}
