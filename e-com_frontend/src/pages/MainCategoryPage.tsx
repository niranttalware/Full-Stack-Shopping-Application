import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { Product } from "../types/products";
import ProductCard from "../Components/ProductCard";
import "../styles/shimmer.css";
import { Search } from "lucide-react";
import { useSearch } from "../context/SearchContext";

const MainCategoryPage: React.FC = () => {
  const { mainCategory } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const data = await fetchProducts();

      const allProducts: Product[] = Object.entries(data).flatMap(
        ([mainCat, subCats]) =>
          Object.entries(subCats as Record<string, Product[]>).flatMap(
            ([subCat, items]) =>
              items.map((p) => ({
                ...p,
                main_category: mainCat,
                category: subCat,
              }))
          )
      );

      const filtered = allProducts.filter(
        (p) => p.main_category.toLowerCase() === mainCategory?.toLowerCase()
      );

      setProducts(filtered);
      setTimeout(() => setLoading(false), 500);
    };

    load();
  }, [mainCategory]);

  if (loading) {
    return (
      <div className="bg-gray-100 min-h-screen p-6 rounded-xl">
        {/* Heading shimmer */}
        <div className="h-8 w-56 skeleton-box mb-8"></div>

        {/* Grid skeletons */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div className="hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col group h-full min-h-[480px] bg-white p-4 border">
              {/* Image */}
              <div className="w-full h-56 skeleton-box rounded-xl mb-4"></div>

              {/* Title */}
              <div className="h-5 skeleton-box w-3/4 mb-3"></div>

              {/* Description */}
              <div className="h-3 skeleton-box w-full mb-2"></div>
              <div className="h-3 skeleton-box w-5/6 mb-2"></div>
              <div className="h-3 skeleton-box w-4/6 mb-4"></div>

              {/* Category */}
              <div className="h-4 skeleton-box w-1/3 mb-3"></div>

              {/* Price */}
              <div className="h-6 skeleton-box w-24 mb-4"></div>

              {/* Button */}
              <div className="h-10 skeleton-box w-full rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm) {
    return (
      <div className="p-6 bg-gray-100 rounded-xl">
        <h2 className="text-2xl font-medium mb-10 text-gray-800 flex items-center gap-2">
          <Search className="w-8 h-8 mt-1 mr-2 ml-1 " /> Results for "
          {searchTerm}"
        </h2>

        {filteredProducts.length ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <p>No products found.</p>
        )}
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-6 rounded-xl">
      <h1 className="text-3xl font-bold mb-8 mt-1 capitalize">
        {mainCategory} Products
      </h1>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainCategoryPage;
