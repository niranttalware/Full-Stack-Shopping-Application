// src/store/useOrderStore.ts
import { create } from "zustand";

interface OrderItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  total: number;
  address: any;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
}

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  cancelOrder: (id: string) => void;
}

const ORDERS_KEY = "orders";

const migrate = (orders: any[]): Order[] => {
  return orders.map((o) => ({
    ...o,
    status: (o.status || "Processing") as Order["status"], // ⭐ FORCE correct type
  }));
};

const readOrders = (): Order[] => {
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return migrate(parsed);
  } catch {
    return [];
  }
};

export const useOrderStore = create<OrderState>((set) => ({
  orders: readOrders(),

  addOrder: (order) => {
    set((state) => {
      const updated = [...state.orders, order];
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
      return { orders: updated };
    });
  },

  updateOrderStatus: (id, status) => {
    set((state) => {
      const updated: Order[] = state.orders.map((o) =>
        o.id === id ? { ...o, status } : o
      );
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
      return { orders: updated };
    });
  },

  cancelOrder: (id) => {
    set((state) => {
      const updated: Order[] = state.orders.map((o) =>
        o.id === id ? { ...o, status: "Cancelled" } : o
      );
      localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
      return { orders: updated };
    });
  },
}));
