"use client";

import {
  createContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import products, { categories, brands, type Product } from "../data/dummyData";

// Cart ka shakal: { productId: quantity }
export type CartItems = Record<number, number>;

interface ShopContextType {
  products: Product[];
  categories: string[];
  brands: string[];
  cartItems: CartItems;
  addToCart: (productId: number) => void;
  cartCount: number;
}

export const ShopContext = createContext<ShopContextType>({
  products,
  categories,
  brands,
  cartItems: {},
  addToCart: () => {},
  cartCount: 0,
});

// ---- Cart ko browser ke localStorage mein save rakhne ka hissa ----
// Next.js pehle server par page banata hai, jahan localStorage hota hi nahi.
// Is liye cart ko useSyncExternalStore se padhte hain: server par khali cart "{}",
// browser mein aate hi asli saved cart. (Is se hydration error nahi aata.)
const CART_KEY = "cartItems";
const listeners = new Set<() => void>();

const subscribe = (callback: () => void) => {
  listeners.add(callback);
  window.addEventListener("storage", callback); // doosre tab mein cart badle to yahan bhi update
  return () => {
    listeners.delete(callback);
    window.removeEventListener("storage", callback);
  };
};

const getSnapshot = () => {
  try {
    return localStorage.getItem(CART_KEY) ?? "{}";
  } catch {
    return "{}";
  }
};

const getServerSnapshot = () => "{}";

const parseCart = (json: string): CartItems => {
  try {
    return JSON.parse(json);
  } catch {
    return {};
  }
};

const ShopContextProvider = ({ children }: { children: ReactNode }) => {
  const cartJson = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const cartItems = useMemo(() => parseCart(cartJson), [cartJson]);

  const addToCart = (productId: number) => {
    const updatedCart: CartItems = {
      ...cartItems,
      [productId]: (cartItems[productId] || 0) + 1,
    };
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    } catch {
      // storage band ho to cart is session mein save nahi hoga
    }
    listeners.forEach((listener) => listener());
  };

  const getCartCount = () => {
    return Object.values(cartItems).reduce((total, count) => total + count, 0);
  };

  const value: ShopContextType = {
    products,
    categories,
    brands,
    cartItems,
    addToCart,
    cartCount: getCartCount(),
  };

  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
