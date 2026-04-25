import React, { useEffect, useState } from "react";
import { Product } from "../types/products";
import { fetchProducts } from "../api/products";
import { Link } from "react-router-dom";
import { useSearch } from "../context/SearchContext";
import SkeletonShop from "../Components/Skeletons/SkeletonShop";
import {
  Search,
  ShoppingBag,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  Cable,
  Shirt,
  Zap,
} from "lucide-react";
import ProductCard from "../Components/ProductCard";

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [, setAllProducts] = useState<Product[]>([]);
  const { searchTerm } = useSearch();

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      await new Promise((res) => setTimeout(res, 300));

      const allFlattenedProducts: Product[] = Object.values(data).flatMap(
        (mainCategory) =>
          Object.values(mainCategory as Record<string, Product[]>).flat()
      ) as Product[];

      setAllProducts(allFlattenedProducts);
      setProducts(allFlattenedProducts);
      setLoading(false);
    };
    getProducts();
  }, []);

  if (loading) return <SkeletonShop />;

  const filteredProducts = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (searchTerm) {
    return (
      <div className="min-h-screen mx-auto bg-gradient-to-br from-blue-50 to-gray-200 p-4 rounded-md">
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
      </div>
    );
  }

  return (
    <div className="min-h-screen mx-auto bg-gradient-to-br from-blue-50 to-gray-200 p-4 rounded-md">
      {/* ---------------- SHOP BY CATEGORIES ---------------- */}
      <section className="py-5 px-4 w-fit">
        <h1 className="text-3xl font-bold mb-8 text-gray-800 flex items-center gap-2 animate-fadeIn">
          <ShoppingBag className="w-8 h-8 mt-1 mr-1 text-orange-500" />
          Shop by Categories
        </h1>

        {/* ---------------- ELECTRONICS ---------------- */}
        <div className="mb-12 animate-slideUp">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 py-3 border-gray-300 flex items-center gap-2">
            <Zap className="w-6 h-6 text-yellow-500 mt-1" />
            Electronics
          </h2>

          {/* Electronics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Smartphones */}
            <Link
              to="/category/Smartphones"
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-fit pb-4"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-6 text-gray-800 flex items-center gap-2">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                  Smartphones
                </h3>
                <div className="grid grid-cols-2 grid-rows-2 gap-4">
                  <img
                    src="https://images-eu.ssl-images-amazon.com/images/I/618vU2qKXQL._AC_UL330_SR330,330_.jpg"
                    alt="Smartphones"
                    className="rounded-lg object-cover hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/31058Y9953L._SY300_SX300_QL70_FMwebp_.jpg"
                    alt="Smartphones"
                    className="rounded-lg object-cover hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://images-eu.ssl-images-amazon.com/images/I/516HIUddM3L._AC_UL330_SR330,330_.jpg"
                    alt="Smartphones"
                    className="rounded-lg object-cover hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/41X9qNxoJKL._SY300_SX300_QL70_FMwebp_.jpg"
                    alt="Smartphones"
                    className="rounded-lg object-cover hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </Link>

            {/* Laptops */}
            <Link
              to="/category/Laptops"
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-fit pb-4 mt-3"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-8 text-gray-800 flex items-center gap-2">
                  <Laptop className="w-5 h-5 text-gray-700" />
                  Laptops
                </h3>
                <div className="grid grid-cols-2 gap-4 py-2">
                  <img
                    src="https://m.media-amazon.com/images/I/71CjP9jmqZL._AC_UY327_FMwebp_QL65_.jpg"
                    alt="Laptops"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/61rES1ry1+L._AC_UY327_FMwebp_QL65_.jpg"
                    alt="Laptops"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/61LOOMpEgxL._AC_UY327_FMwebp_QL65_.jpg"
                    alt="Laptops"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/71Q6JmLZE7L._AC_UY327_FMwebp_QL65_.jpg"
                    alt="Laptops"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </Link>

            {/* Earphones */}
            <Link
              to="/category/Earphones"
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-fit"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-green-600" />
                  Earphones
                </h3>

                <div className="grid grid-cols-2 gap-2 m-2 py-2">
                  <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_boAt._SY232_CB553870684_.jpg"
                    alt="Earphones"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Boult._SY232_CB553870684_.jpg"
                    alt="Earphones"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/GW/QC/PC/PC_QuadCard_Noise._SY232_CB553870684_.jpg"
                    alt="Earphones"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://images-eu.ssl-images-amazon.com/images/G/31/img21/june/CE/MSO/PD3/PC_QuadCard_Zeb_1._SY232_CB570220221_.jpg"
                    alt="Earphones"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/51aXvjzcukL._SX679_.jpg"
                    alt="Earphones"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/41kWMvhJyEL._SY300_SX300_QL70_FMwebp_.jpg"
                    alt="Earphones"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Accessories + Smartwatches */}
          <div className="flex flex-col lg:flex-row gap-4 mt-4 w-full">
            {/* Accessories */}
            <Link
              to="/category/Accessories & Gadgets "
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-fit"
              style={{ flex: "0 0 59%" }}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-3 text-gray-800 flex items-center gap-2">
                  <Cable className="w-5 h-5 text-purple-600" />
                  Accessories & Gadgets
                </h3>
                <div className="grid grid-cols-4 gap-5 py-3">
                  <img
                    src="https://m.media-amazon.com/images/I/61W8xeZTwxL._SX679_.jpg"
                    alt="Accessories & Gadgets"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/51HlSmYUifL._AC_UF480,480_SR480,480_.jpg"
                    alt="Accessories & Gadgets"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/61s4K51Go3L._SX679_.jpg"
                    alt="Accessories & Gadgets"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/61TMyUXV2NL._AC_UY327_FMwebp_QL65_.jpg"
                    alt="Accessories & Gadgets"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/61I2seGaPUL._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Accessories & Gadgets"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/51u2MqPaQwL._SX679_.jpg"
                    alt="Accessories & Gadgets"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/71DFol2sNKL._AC_SX416_CB1169409_QL70_.jpg"
                    alt="Accessories & Gadgets"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/4154nCPCBaL._SY300_SX300_QL70_FMwebp_.jpg"
                    alt="Accessories & Gadgets"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </Link>

            {/* Smartwatches */}
            <Link
              to="/category/Smartwatches"
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-fit"
              style={{ flex: "0 0 40%" }}
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center gap-2">
                  <Watch className="w-5 h-5 text-pink-600" />
                  Smartwatches
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  <img
                    src="https://m.media-amazon.com/images/I/61ofV82kMKL._SX679_.jpg"
                    alt="Smartwatches"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/41szskqocrL._SY300_SX300_QL70_FMwebp_.jpg"
                    alt="Smartwatches"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </div>
        </div>

        {/* ---------------- CLOTHING SECTION ---------------- */}
        <div className="mb-12 animate-slideUpDelay">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b-2 py-3 border-gray-300 flex items-center gap-2">
            <Shirt className="w-6 h-6 text-blue-600 mt-1" />
            Men's Wear
          </h2>

          {/* Clothing Subcategories */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Traditional */}
            <Link
              to="/category/Traditional"
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-fit"
            >
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-5 text-gray-800">
                  Traditional Wear
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <img
                    src="https://m.media-amazon.com/images/I/81qaMI1eX7L._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Traditional Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/51Zd0+htwTL._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Traditional Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/612aNUsZvUL._AC_UL960_FMwebp_QL65_.jpg"
                    alt="Traditional Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </Link>

            {/* Western */}
            <Link
              to="/category/Western"
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-fit mt-3"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-5 text-gray-800">
                  Western Wear
                </h3>
                <div className="grid grid-cols-2 gap-8">
                  <img
                    src="https://m.media-amazon.com/images/I/71DEE9JpmlL._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Western Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/71OhvvYpnSL._AC_UL480_FMwebp_QL65_.jpg"
                    alt="Western Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </Link>

            {/* Kids */}
            <Link
              to="/category/Casual & Formal"
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 h-fit"
            >
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  Casual & Formal Wear
                </h3>
                <div className="grid grid-cols-2 grid-rows-2 py-2 gap-2">
                  <img
                    src="https://m.media-amazon.com/images/I/71DU0wuXOSL._SX679_.jpg"
                    alt="Casual & Formal Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/71IAVVgzsTL._SY879_.jpg"
                    alt="Casual & Formal Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/61a3N7wPZNL._SY879_.jpg"
                    alt="Casual & Formal Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                  <img
                    src="https://m.media-amazon.com/images/I/613ULMYOuFL._SY879_.jpg"
                    alt="Casual & Formal Wear"
                    className="rounded-lg hover:scale-105 transition-transform"
                  />
                </div>
              </div>
            </Link>
          </div>

          {/* Jackets */}
          <Link
            to="/category/Jackets"
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 block mt-6"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Jackets</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <img
                  src="https://m.media-amazon.com/images/I/51UpcCdgcFL._SY879_.jpg"
                  alt="Jackets"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/51tkmHjrvPL._AC_SX416_CB1169409_QL70_.jpg"
                  alt="Jackets"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/61YT6E6bWvL._SY879_.jpg"
                  alt="Jackets"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/71ma-aIucEL._SY879_.jpg"
                  alt="Jackets"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/61lpVCS064L._SY879_.jpg"
                  alt="Jackets"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/61CqfQUvBlL._SY879_.jpg"
                  alt="Jackets"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </Link>

          {/* Shoes */}
          <Link
            to="/category/Shoes"
            className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1 block mt-6"
          >
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Shoes</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <img
                  src="https://m.media-amazon.com/images/I/61r9oNywMeL._SY695_.jpg"
                  alt="Shoes"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/71ZXhCT3J8L._SY695_.jpg"
                  alt="Shoes"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/61e6ved+oZL._SY695_.jpg"
                  alt="Shoes"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/71rYxtbE8SS._SX695_.jpg"
                  alt="Shoes"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/71Jqccq3+aL._SY695_.jpg"
                  alt="Shoes"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
                <img
                  src="https://m.media-amazon.com/images/I/7198NljaZlL._SX695_.jpg"
                  alt="Shoes"
                  className="rounded-lg hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Shop;
