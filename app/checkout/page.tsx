
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

type PlacedOrder = {
  id: string;
  status: string;
  date: string;
  items: {
    id: number | string;
    sku: string;
    name: string;
    brand: string;
    category: string;
    quantity: number;
    price: number;
  }[];
  total: number;
  payment: string;
  customer: {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    postalCode: string;
    notes: string;
  };
};

const ORDERS_KEY = "autopro-orders";

export default function CheckoutPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [payment, setPayment] = useState("cod");
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    setItems(loadCart());
    setLoaded(true);
  }, []);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (items.length === 0) {
      alert("Your cart is empty. Please add products before checkout.");
      return;
    }

    const form = event.currentTarget;
    const formData = new FormData(form);
    const now = new Date();

    const order = {
      id: `AP-${now.getTime()}`,
      status: "Order Placed",
      date: now.toISOString(),
      items: items.map((item) => ({
        id: item.id,
        sku: item.sku,
        name: item.name,
        brand: item.brand,
        category: item.category,
        quantity: item.qty,
        price: item.price,
      })),
      total: subtotal,
      payment,
      customer: {
        name: String(formData.get("fullName") || "").trim(),
        phone: String(formData.get("phone") || "").trim(),
        email: String(formData.get("email") || "").trim(),
        address: String(formData.get("address") || "").trim(),
        city: String(formData.get("city") || "").trim(),
        postalCode: String(formData.get("postalCode") || "").trim(),
        notes: String(formData.get("notes") || "").trim(),
      },
    };

    try {
      const savedOrders = localStorage.getItem(ORDERS_KEY);
      const parsedOrders = savedOrders ? JSON.parse(savedOrders) : [];

      if (!Array.isArray(parsedOrders)) {
        throw new Error("Saved orders data is invalid.");
      }

      localStorage.setItem(
        ORDERS_KEY,
        JSON.stringify([order, ...parsedOrders])
      );

      // Cart clears only after the order has been saved.
      saveCart([]);
      setPlacedOrder(order);
    } catch (error) {
      console.error("Could not save order:", error);
      alert(
        "Your order could not be saved. Please try again. Your cart has not been cleared."
      );
    }
  }

  const inputStyle =
    "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm outline-none focus:border-blue-600";

  if (placedOrder) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-2xl text-green-700">
            ✓
          </div>

          <h1 className="mt-4 text-2xl font-semibold">
            Order Request Received
          </h1>

          <p className="mt-2 text-slate-500">
            Thank you! Your order request has been saved. Our team will contact
            you shortly to confirm your order.
          </p>

          <div className="mt-6 rounded-lg bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Your Order ID</p>
            <p className="mt-1 break-all font-semibold text-blue-600">
              {placedOrder.id}
            </p>

            <p className="mt-3 text-sm text-slate-500">Total Amount</p>
            <p className="mt-1 font-semibold">
              Rs. {placedOrder.total.toLocaleString("en-PK")}
            </p>

            <p className="mt-3 text-sm text-slate-500">Current Status</p>
            <p className="mt-1 font-medium">{placedOrder.status}</p>
          </div>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/profile"
              className="inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
            >
              View My Orders
            </Link>

            <Link
              href="/"
              className="inline-block rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium hover:bg-slate-50"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    );
  }

  if (!loaded) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center">
          Loading your cart...
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-16 text-slate-900">
        <div className="mx-auto max-w-lg rounded-xl border border-slate-200 bg-white p-8 text-center">
          <h1 className="text-2xl font-semibold">Your cart is empty</h1>
          <p className="mt-2 text-slate-500">
            Add some parts to your cart before checking out.
          </p>

          <Link
            href="/cart"
            className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white"
          >
            Back to Cart
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-8">
          <p className="text-sm text-slate-500">
            Home / Spare Parts / Cart / Checkout
          </p>
          <h1 className="mt-3 text-3xl font-semibold">Checkout</h1>
          <p className="mt-1 text-slate-500">
            Enter your details to place an order request.
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto grid max-w-6xl gap-6 px-6 py-8 lg:grid-cols-[2fr_1fr]"
      >
        <div className="space-y-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-medium">Delivery Details</h2>

            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                Full Name
                <input
                  name="fullName"
                  required
                  type="text"
                  placeholder="e.g. Asad Ali"
                  className={inputStyle}
                />
              </label>

              <label className="text-sm">
                Phone / WhatsApp Number
                <input
                  name="phone"
                  required
                  type="tel"
                  placeholder="0300 0000000"
                  className={inputStyle}
                />
              </label>

              <label className="text-sm sm:col-span-2">
                Email
                <input
                  name="email"
                  type="email"
                  placeholder="name@company.com"
                  className={inputStyle}
                />
              </label>

              <label className="text-sm sm:col-span-2">
                Street Address
                <input
                  name="address"
                  required
                  type="text"
                  placeholder="House / Street / Area"
                  className={inputStyle}
                />
              </label>

              <label className="text-sm">
                City
                <input
                  name="city"
                  required
                  type="text"
                  placeholder="e.g. Multan"
                  className={inputStyle}
                />
              </label>

              <label className="text-sm">
                Postal Code
                <input
                  name="postalCode"
                  type="text"
                  placeholder="e.g. 60000"
                  className={inputStyle}
                />
              </label>

              <label className="text-sm sm:col-span-2">
                Order Notes (optional)
                <textarea
                  name="notes"
                  rows={3}
                  placeholder="Any special instructions..."
                  className={inputStyle}
                />
              </label>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-medium">Payment Method</h2>

            <div className="mt-4 space-y-3">
              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3 text-sm">
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "cod"}
                  onChange={() => setPayment("cod")}
                />
                Cash on Delivery
              </label>

              <label className="flex cursor-pointer items-center gap-3 rounded-lg border border-slate-300 p-3 text-sm">
                <input
                  type="radio"
                  name="payment"
                  checked={payment === "bank"}
                  onChange={() => setPayment("bank")}
                />
                Bank Transfer
              </label>

              {payment === "bank" && (
                <p className="rounded-lg bg-slate-100 p-3 text-sm text-slate-600">
                  Our team will share the bank account details after
                  confirming your order.
                </p>
              )}
            </div>
          </div>
        </div>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-medium">Order Summary</h2>

          <div className="mt-4 space-y-3 text-sm">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between gap-3">
                <span className="text-slate-600">
                  {item.name} × {item.qty}
                </span>
                <span>
                  Rs. {(item.price * item.qty).toLocaleString("en-PK")}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between border-t border-slate-200 pt-4 text-sm">
            <span>Total</span>
            <span className="font-semibold text-blue-600">
              Rs. {subtotal.toLocaleString("en-PK")}
            </span>
          </div>

          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-sm font-medium text-white hover:bg-blue-700"
          >
            Place Order Request
          </button>

          <Link
            href="/cart"
            className="mt-3 block w-full rounded-lg border border-slate-300 py-3 text-center text-sm"
          >
            Back to Cart
          </Link>
        </aside>
      </form>
    </main>
  );
}
