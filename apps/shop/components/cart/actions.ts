"use server";

import {
  addToCart,
  createCart,
  getCart,
  removeFromCart,
  updateCart,
} from "lib/shopify";
import { cookies } from "next/headers";

export const addItem = async (
  variantId: string | undefined
): Promise<String | undefined> => {
  let cartId = cookies().get("cartId")?.value;
  let cart;

  if (cartId) {
    cart = await getCart(cartId);
  }

  if (!cartId || !cart) {
    let cart = await fetch("https://shop.flexstart.org/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    }).then((res) => res.json());
    cartId = cart.id;
    cookies().set("cartId", cartId!);
  }

  if (!variantId) {
    return "Missing product variant ID";
  }

  try {
    // const temp = await fetch("http://localhost:3000/api/cart", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     cartId: cartId,
    //     lines: [{ merchandiseId: variantId, quantity: 1 }],
    //   }),
    // }).then((res) => res.json());
    // await addToCart(cartId, [{ merchandiseId: variantId, quantity: 1 }]);
  } catch (e) {
    return "Error adding item to cart";
  }
};

export const removeItem = async (
  lineId: string
): Promise<String | undefined> => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }
  try {
    await removeFromCart(cartId, [lineId]);
  } catch (e) {
    return "Error removing item from cart";
  }
};

export const updateItemQuantity = async ({
  lineId,
  variantId,
  quantity,
}: {
  lineId: string;
  variantId: string;
  quantity: number;
}): Promise<String | undefined> => {
  const cartId = cookies().get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }
  try {
    await updateCart(cartId, [
      {
        id: lineId,
        merchandiseId: variantId,
        quantity,
      },
    ]);
  } catch (e) {
    return "Error updating item quantity";
  }
};
