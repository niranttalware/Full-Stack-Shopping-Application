export const fetchCategoryTree = async () => {
  const res = await fetch("${import.meta.env.VITE_API_URL}/api/products");
  const data = await res.json();
  return data; // already grouped by main_category → category
};
