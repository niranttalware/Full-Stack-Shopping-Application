import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/products";
import { fetchProducts } from "../api/products";
import { useCartStore } from "../store/useCartStore";
import toast from "react-hot-toast";
import { ShoppingCart, IndianRupee, Layers3 } from "lucide-react";
import Rating from "../Components/Rating";
import "../styles/shimmer.css"; // 👈 shimmer style import

// ✅ Skeleton Component (with shimmer)
const ProductDetailSkeleton: React.FC = () => {
  return (
    <section className="py-10 bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Image Skeleton */}
        <div className="w-full h-96 skeleton-box rounded-lg"></div>

        {/* Right Details Skeleton */}
        <div className="space-y-4">
          <div className="h-8 skeleton-box w-3/4"></div>
          <div className="h-4 skeleton-box w-full"></div>
          <div className="h-4 skeleton-box w-5/6"></div>
          <div className="h-6 skeleton-box w-1/3"></div>

          {/* Category */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 skeleton-box rounded-full"></div>
            <div className="h-4 skeleton-box w-1/4"></div>
          </div>

          {/* Rating Skeleton */}
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-5 h-5 skeleton-box rounded"></div>
            ))}
          </div>

          {/* Button */}
          <div className="h-10 skeleton-box w-40"></div>
        </div>
      </div>
    </section>
  );
};

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const addToCart = useCartStore((state) => state.addToCart);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        setLoading(true);
        const allProducts = await fetchProducts();
        await new Promise((res) => setTimeout(res, 300));

        const allProductsArray: Product[] = Object.values(allProducts)
          .flatMap((categoryGroup) => Object.values(categoryGroup))
          .flat() as Product[];

        const foundProduct = allProductsArray.find((p) => p.id === id) as
          | Product
          | undefined;

        setProduct(foundProduct || null);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;

  if (!product)
    return (
      <p className="text-center py-10 text-red-500 font-semibold">
        Product not found.
      </p>
    );

  return (
    <section className="py-10 bg-gradient-to-br from-blue-100 to-gray-200">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-96 object-contain"
        />
        <div>
          <h1 className="text-3xl font-bold mb-3 flex items-center gap-2">
            {product.title}
          </h1>

          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-xl font-semibold text-blue-600 mb-4 flex items-center gap-1">
            <IndianRupee className="w-5 h-5 text-blue-600" />{" "}
            {new Intl.NumberFormat("en-IN", {
              style: "decimal",
              maximumFractionDigits: 2,
            }).format(product.price)}
          </p>

          <p className="mb-4 flex items-center gap-2 text-gray-700">
            <Layers3 className="w-5 h-5 text-gray-600" />
            <span className="font-semibold">Category:</span> {product.category}
          </p>

          <p className="mb-4 text-yellow-500 flex items-center gap-1">
            <Rating rate={product.rating.rate} count={product.rating.count} />
          </p>

          <button
            onClick={() => {
              addToCart(product);
              toast.success("🛒 Added to cart!");
            }}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
