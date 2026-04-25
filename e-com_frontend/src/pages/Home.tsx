import React, { useEffect, useState } from "react";
import { Product } from "../types/products";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

import { Search, Star, Zap } from "lucide-react";

import ProductCard from "../Components/ProductCard";
import SkeletonHome from "../Components/Skeletons/SkeletonHome";

const Home: React.FC = () => {
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

      setProducts(allProducts);
      setTimeout(() => setLoading(false), 500);
    };

    load();
  }, []);

  if (loading) {
    return <SkeletonHome />;
  }

  /* ---------------- SEARCH RESULTS ---------------- */
  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm) {
    return (
      <div className="p-6 bg-gray-100 rounded-xl">
        <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
          <Search /> Results for "{searchTerm}"
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

  /* ----------------- Helpers ----------------- */
  const groupByCategory = (list: Product[]) => {
    const groups: Record<string, Product[]> = {};
    list.forEach((p) => {
      if (!groups[p.category]) groups[p.category] = [];
      groups[p.category].push(p);
    });
    return groups;
  };

  const topRated = [...products]
    .filter((p) => p.rating && typeof p.rating.rate === "number")
    .sort((a, b) => b.rating.rate - a.rating.rate)
    .slice(0, 6);

  /* ----------------- Components ----------------- */

  const OfferStickers = () => (
    <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
      {[
        { icon: "🔥", title: "Hot Deals" },
        { icon: "🚚", title: "Free Delivery" },
        { icon: "⭐", title: "Top Rated" },
        { icon: "⚡", title: "Fast Checkout" },
      ].map((o) => (
        <div key={o.title} className="bg-white p-4 rounded-lg shadow">
          <div className="text-3xl text-center">{o.icon}</div>
          <div className="font-semibold mt-2 text-center">{o.title}</div>
        </div>
      ))}
    </div>
  );

  const HeroBanner = () => (
    <section className="bg-gradient-to-r from-purple-600 to-blue-500 text-white p-12 rounded-xl flex flex-col md:flex-row justify-between items-center shadow-lg max-h-[320px]">
      <div className="md:w-1/2 space-y-4">
        <h1 className="text-2xl md:text-3xl font-extrabold leading-tight">
          Discover Premium Products at Best Prices!
        </h1>
        <p className="text-lg opacity-90 pb-6">
          Electronics • Fashion • Accessories • More
        </p>

        <Link
          to="/shop"
          className="px-6 py-3 bg-white text-black rounded-lg shadow font-semibold hover:bg-gray-100 transition"
        >
          Shop Now →
        </Link>
      </div>

      <img
        src="https://static.vecteezy.com/system/resources/previews/000/669/988/original/vector-shopping-online-banner.jpg"
        alt="Hero banner"
        className="md:w-1/2 rounded-lg mt-6 md:mt-0 shadow-xl object-cover max-h-[320px]"
      />
    </section>
  );

  const FlashSale = () => (
    <div className="mt-12">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Zap className="text-yellow-500" /> Flash Sale
      </h2>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {products.slice(0, 12).map((p) => (
          <div key={p.id} className="min-w-[220px]">
            <div className="relative">
              <div className="absolute top-3 left-3 bg-red-600 text-white px-3 py-1 rounded-full animate-pulse text-sm z-10">
                🔥 Price Drop
              </div>
              <ProductCard product={p} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const Trending = () => (
    <div className="mt-14">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Star className="text-yellow-500" /> Trending Products
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, 8).map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );

  const Recommended = () => (
    <div className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recommended for You</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {topRated.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );

  const DynamicCategorySections = () => {
    const groups = groupByCategory(products);

    return (
      <div className="mt-12">
        {Object.entries(groups).map(([cat, items]) => (
          <div key={cat} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{cat}</h2>
            <div className="flex gap-6 overflow-x-auto pb-4">
              {items.slice(0, 10).map((p) => (
                <div key={p.id} className="min-w-[220px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6 rounded-xl">
      <HeroBanner />
      <OfferStickers />
      <FlashSale />
      <Trending />
      <Recommended />
      <DynamicCategorySections />
    </div>
  );
};

export default Home;
