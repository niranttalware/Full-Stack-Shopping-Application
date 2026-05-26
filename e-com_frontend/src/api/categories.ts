export const fetchCategoryTree = async () => {
  const res = await fetch("${process.env.REACT_APP_API_URL}/api/products");
  const data = await res.json();
  return data; // already grouped by main_category → category
};
