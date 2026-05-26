import { apiUrl } from "./apiUrl";

export const fetchCategoryTree = async () => {
  const res = await fetch(apiUrl("/api/products"));
  const data = await res.json();
  return data; // already grouped by main_category → category
};

