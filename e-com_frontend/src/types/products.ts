export interface Product {
  main_category: string;
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CategoryWiseProducts {
  Electronics: {
    Smartphones: Product[];
    Laptops: Product[];
    Earphones: Product[];
    SmartWatches: Product[];
    Accessories: Product[];
  };
  MensWear: {
    Traditional: Product[];
    Western: Product[];
    Casual: Product[];
    Jackets: Product[];
    Shoes: Product[];
  };
}

export interface CartItem {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  token?: string;
}

export interface Order {
  id: number;
  userId: string;
  items: CartItem[];
  total: number;
  createdAt: string;
  status: "pending" | "paid" | "shipped" | "delivered";
}
