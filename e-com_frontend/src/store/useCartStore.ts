// src/store/useCartStore.ts
import { create } from "zustand";
import { Product, CartItem } from "../types/products";

interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product | CartItem, qty?: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
}

const CART_KEY = "cart";

export const useCartStore = create<CartState>((set, get) => ({
  // load initial cart from localStorage
  cartItems: (() => {
    try {
      const raw = localStorage.getItem(CART_KEY);
      return raw ? (JSON.parse(raw) as CartItem[]) : [];
    } catch {
      return [];
    }
  })(),

  addToCart: (product, qty = 1) => {
    const productId = "productId" in product ? product.productId : product.id;

    const existing = get().cartItems.find(
      (item) => item.productId === productId
    );

    if (existing) {
      const newQuantity = existing.quantity + qty;

      if (newQuantity <= 0) {
        const newItems = get().cartItems.filter(
          (item) => item.productId !== productId
        );
        set({ cartItems: newItems });
        try {
          localStorage.setItem(CART_KEY, JSON.stringify(newItems));
        } catch {}
      } else {
        const newItems = get().cartItems.map((item) =>
          item.productId === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
        set({ cartItems: newItems });
        try {
          localStorage.setItem(CART_KEY, JSON.stringify(newItems));
        } catch {}
      }
    } else {
      // Convert Product -> CartItem if necessary
      const newItem: CartItem =
        "productId" in product
          ? { ...product, quantity: product.quantity + qty } // already CartItem
          : {
              productId: product.id,
              title: product.title,
              price: product.price,
              image: product.image,
              quantity: qty,
            };

      // Add only if qty > 0
      if (qty > 0) {
        const newItems = [...get().cartItems, newItem];
        set({ cartItems: newItems });
        try {
          localStorage.setItem(CART_KEY, JSON.stringify(newItems));
        } catch {}
      }
    }
  },

  removeFromCart: (id: string) => {
    const newItems = get().cartItems.filter((item) => item.productId !== id);
    set({ cartItems: newItems });
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(newItems));
    } catch {}
  },

  clearCart: () => {
    set({ cartItems: [] });
    try {
      localStorage.setItem(CART_KEY, JSON.stringify([]));
    } catch {}
  },
}));
