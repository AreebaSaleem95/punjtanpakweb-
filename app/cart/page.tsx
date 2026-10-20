"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { loadCart, saveCart } from "../../lib/cart";

type CartItem = {
  id: number | string;
  sku: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  oldPrice: number | null;
  qty: number;
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Page khulte hi saved cart load karo
  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  // Jab bhi items badlein, unhein save karo
  useEffect(() => {
    if (loaded) saveCart(items);
  }, [items, loaded]);

  function changeQty(id: CartItem["id"], change: number) {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, item.qty + change) } : item
      )
    );
  }

  function removeItem(id: CartItem["id"]) {
    setItems(items.filter((item) => item.id !== id));
  }

  const itemsCount = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      {/* Page heading */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-sm text-slate-500">Home / Spare Parts / Cart</p>
          <h1 className="mt-3 text-3xl font-semibold">Your Cart</h1>
          <p className="mt-1 text-slate-500">Review your selected parts before checkout.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[2fr_1fr]">
        {/* Left: cart items */}
        <div>
          <div className="rounded-xl border border-slate-200 bg-white">
            <div className="grid grid-cols-[3fr_1fr_1fr] border-b border-slate-200 px-6 py-3 text-sm text-slate-500">
              <span>Product</span>
              <span>Quantity</span>
              <span>Total</span>
            </div>

            {loaded && items.length === 0 && (
              <p className="px-6 py-10 text-center text-slate-500">Your cart is empty.</p>
            )}

            {items.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[3fr_1fr_1fr] items-center gap-4 border-b border-slate-200 px-6 py-5 last:border-b-0"
              >
                <div className="flex gap-4">
                  <div className="h-20 w-20 rounded-lg bg-slate-200" />
                  <div>
                    <p className="text-xs text-slate-500">SKU: {item.sku}</p>
                    <p className="font-medium">{item.name}</p>
                    <p className="text-sm text-slate-500">{item.brand} · {item.category}</p>
                    <span className="mt-1 inline-block rounded bg-green-100 px-2 py-0.5 text-xs text-green-700">
                      In Stock
                    </span>
                    <p className="mt-1 text-sm">
                      Rs. {item.price.toLocaleString("en-US")}
                      {item.oldPrice && (
                        <span className="ml-2 text-slate-400 line-through">
                          Rs. {item.oldPrice.toLocaleString("en-US")}
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                {/* Quantity buttons */}
                <div className="flex w-fit items-center rounded-lg border border-slate-300">
                  <button onClick={() => changeQty(item.id, -1)} className="px-3 py-1.5">-</button>
                  <span className="border-x border-slate-300 px-3 py-1.5">{item.qty}</span>
                  <button onClick={() => changeQty(item.id, 1)} className="px-3 py-1.5">+</button>
                </div>

                {/* Total + remove */}
                <div className="flex items-center justify-between">
                  <p className="font-medium">Rs. {(item.price * item.qty).toLocaleString("en-US")}</p>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-slate-400 hover:text-red-500"
                    aria-label="Remove item"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between">
            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm">
              Continue Shopping
            </button>
            <button className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm">
              Update Cart
            </button>
          </div>
        </div>

        {/* Right: order summary */}
        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-medium">Order Summary</h2>
          <div className="mt-4 flex justify-between text-sm text-slate-600">
            <span>Items</span>
            <span>{itemsCount}</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-sm">
            <span>Subtotal</span>
            <span className="font-medium text-blue-600">Rs. {subtotal.toLocaleString("en-US")}</span>
          </div>
          <Link
            href="/checkout"
            className="mt-5 block w-full rounded-lg bg-blue-600 py-3 text-center text-sm font-medium text-white"
          >
            Proceed to Checkout
          </Link>
        </aside>
      </section>
    </main>
  );
}