// src/api/products.ts
import { CategoryWiseProducts } from "../types/products";

const API_URL = `${process.env.REACT_APP_API_URL}/api/products`;

export const fetchProducts = async (): Promise<CategoryWiseProducts> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch products from backend");
  }
  const data = await response.json();
  return data;
};
