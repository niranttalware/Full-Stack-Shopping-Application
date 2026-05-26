// src/api/products.ts
import { CategoryWiseProducts } from "../types/products";
import { apiUrl } from "./apiUrl";

export const fetchProducts = async (): Promise<CategoryWiseProducts> => {
  const response = await fetch(apiUrl("/api/products"));
  if (!response.ok) {
    throw new Error("Failed to fetch products from backend");
  }
  const data = await response.json();
  return data;
};

