import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProducts } from "../api/products";
import { Product } from "../types/products";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";
import { ShoppingCart, IndianRupee, Search } from "lucide-react";
import Rating from "../Components/Rating";
import { useSearch } from "../context/SearchContext";

const ProductSkeleton: React.FC = () => {
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-blue-100 rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Left Skeleton (Image) */}
      <div className="md:w-1/4 flex justify-center items-center p-3">
        <div className="w-48 h-48 skeleton-box rounded"></div>
      </div>

      {/* Right Skeleton (Details) */}
      <div className="flex-1 flex flex-col justify-between p-2 md:p-4 space-y-3">
        <div>
          <div className="h-5 skeleton-box w-3/4 mb-2"></div>
          <div className="h-3 skeleton-box w-full mb-2"></div>
          <div className="h-3 skeleton-box w-5/6 mb-2"></div>

          {/* Rating Placeholder */}
          <div className="flex gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-4 h-4 skeleton-box rounded"></div>
            ))}
          </div>

          {/* Price Placeholder */}
          <div className="h-5 skeleton-box w-24 mb-2"></div>

          {/* Subtext */}
          <div className="h-3 skeleton-box w-1/3"></div>
        </div>

        {/* Button Placeholder */}
        <div className="h-10 skeleton-box w-32"></div>
      </div>
    </div>
  );
};

const CategoryProductItem = ({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (p: Product) => void;
}) => {
  return (
    <div className="flex flex-col md:flex-row bg-gradient-to-br from-gray-100 to-blue-100 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 border border-gray-200 p-4">
      {/* Left: Product Image */}
      <div className="md:w-1/4 flex justify-center items-center p-3">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.title}
            className="w-48 h-48 object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Right: Product Details */}
      <div className="flex-1 flex flex-col justify-between p-2 md:p-4">
        <div>
          <Link to={`/product/${product.id}`}>
            <h2 className="text-lg font-semibold text-blue-700 hover:underline mb-1">
              {product.title}
            </h2>
          </Link>

          <p className="text-gray-700 text-sm mb-2">{product.description}</p>

          {/* ⭐ Rating Component */}
          <div className="mb-2">
            <Rating rate={product.rating.rate} count={product.rating.count} />
          </div>

          <p className="text-xl font-bold text-green-600 mb-2 flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-green-600" />
            {new Intl.NumberFormat("en-IN", {
              style: "decimal",
              maximumFractionDigits: 2,
            }).format(product.price)}
          </p>

          <p className="text-sm text-gray-500 mb-3">
            Save extra with No Cost EMI
          </p>
        </div>

        <button
          onClick={() => {
            addToCart(product);
            toast.success("🛒 Added to cart!");
          }}
          className="bg-yellow-400 text-black px-6 py-2 rounded-md font-semibold hover:bg-yellow-500 transition-all flex items-center gap-2 w-fit"
        >
          <ShoppingCart className="w-5 h-5" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const addToCart = useCartStore((state) => state.addToCart);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      await new Promise((res) => setTimeout(res, 300));

      const allProducts: Product[] = Object.values(data).flatMap(
        (mainCategory) =>
          Object.values(mainCategory as Record<string, Product[]>).flat(),
      ) as Product[];

      const filtered = allProducts.filter(
        (p) =>
          p.category.trim().toLowerCase() ===
          categoryName?.trim().toLowerCase(),
      );

      setProducts(filtered);
      setLoading(false);
    };
    getProducts();
  }, [categoryName]);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 bg-gradient-to-br from-gray-200 to-gray-200">
        {/* ✅ Shimmer for category heading */}
        <div className="flex items-center gap-2 mb-10 mt-3">
          <div className="w-8 h-8 skeleton-box rounded-full"></div>
          <div className="h-8 w-48 skeleton-box"></div>
        </div>

        {/* Skeleton list (4 placeholders) */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (searchTerm) {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4 bg-gradient-to-br from-gray-200 to-gray-200">
        <h2 className="text-2xl font-medium mb-10 mt-1 text-gray-800 flex items-center gap-2">
          <Search className="w-8 h-8 mt-1 mr-2 ml-1 " /> Results for "
          {searchTerm}"
        </h2>

        {filteredProducts.length ? (
          <div className="flex flex-col gap-4">
            {filteredProducts.map((p) => (
              <CategoryProductItem
                key={p.id}
                product={p}
                addToCart={addToCart}
              />
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
      <h1 className="text-3xl font-bold mb-10 mt-1 text-gray-800 flex items-center gap-2">
        <ShoppingCart className="w-8 h-8 mt-1 mr-2 ml-1" /> {categoryName}{" "}
        Products
      </h1>

      {products.length === 0 ? (
        <p className="text-gray-600 text-lg">
          No products found for this category.
        </p>
      ) : (
        <div className="flex flex-col gap-4">
          {products.map((p) => (
            <CategoryProductItem key={p.id} product={p} addToCart={addToCart} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
