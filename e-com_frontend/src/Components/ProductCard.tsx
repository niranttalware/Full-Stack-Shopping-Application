import React from "react";
import { Product } from "../types/products";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addToCart = useCartStore((state) => state.addToCart);

  return (
    <div className="hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden flex flex-col group h-full min-h-[480px]">
      <div
        key={product.id}
        className="rounded-2xl transition-all duration-300 p-3 flex flex-col items-center"
      >
        <div>
          <Link to={`/product/${product.id}`}>
            <div className="w-full h-56 flex items-center justify-center rounded-xl mb-4 overflow-hidden flex-shrink-0">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
              />
            </div>

            <h2 className="text-lg mx-4 font-semibold line-clamp-2 min-h-[4rem]">
              {product.title}
            </h2>

            <p className="text-sm line-clamp-3 mb-3 min-h-[3.7rem] mx-2">
              {product.description}
            </p>
          </Link>
        </div>

        <p className="text-gray-500 text-sm mb-2 capitalize">
          {product.category}
        </p>

        <p className="text-xl font-bold text-green-600 mb-4">
          {new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
          }).format(product.price)}
        </p>

        <button
          onClick={() => {
            addToCart(product);
            toast.success(
              <>
                <ShoppingCart size={16} className="inline-block mr-1" />
                Added to cart!
              </>
            );
          }}
          className="w-full mt-0 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold flex justify-center items-center gap-2"
        >
          <ShoppingCart size={18} />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
