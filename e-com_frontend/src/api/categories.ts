export const fetchCategoryTree = async () => {
  const res = await fetch("http://localhost:5000/api/products");
  const data = await res.json();
  return data; // already grouped by main_category → category
};
