export const CART_KEY = "autopro-cart";

export const defaultCart = [
  { id: 1, sku: "BRK-TY-0012", name: "Front Brake Pads Set", brand: "Toyota", category: "Brake System", price: 6500, oldPrice: null, qty: 1 },
  { id: 2, sku: "OIL-HN-0045", name: "Oil Filter", brand: "Honda", category: "Filters", price: 1200, oldPrice: 1500, qty: 2 },
];

export function loadCart() {
  try {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : defaultCart;
  } catch {
    return defaultCart;
  }
}

export function saveCart(items) {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  } catch {}
}