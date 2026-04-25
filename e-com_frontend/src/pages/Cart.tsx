import React, { useEffect, useState } from "react";
import { useCartStore } from "../store/useCartStore";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import {
  ShoppingCart,
  Trash2,
  Plus,
  Minus,
  ArrowRightCircle,
  IndianRupee,
} from "lucide-react";

const CartSkeleton: React.FC = () => {
  const skeletonItems = [1, 2];

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center flex justify-center items-center gap-2">
        <div className="skeleton-box w-8 h-8 rounded-full" />
        <div className="skeleton-box h-8 w-40 rounded-md" />
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 w-[900px] m-auto">
        {skeletonItems.map((_, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-br from-blue-100 to-gray-200 shadow-md rounded-lg p-8"
          >
            {/* Left side */}
            <div className="flex items-start sm:items-center space-x-4 w-full sm:w-2/3">
              <div className="skeleton-box w-28 h-28 rounded-lg" />
              <div className="flex-1 space-y-3">
                <div className="skeleton-box h-5 w-48 rounded-md" />
                <div className="skeleton-box h-4 w-32 rounded-md" />
                <div className="skeleton-box h-4 w-40 rounded-md" />
              </div>
            </div>

            {/* Right side buttons */}
            <div className="mt-4 sm:mt-0 flex items-center justify-end space-x-3 w-full sm:w-auto">
              <div className="skeleton-box w-32 h-10 rounded-md" />
              <div className="skeleton-box w-20 h-10 rounded-md" />
            </div>
          </div>
        ))}
      </div>

      {/* Total + Buttons */}
      <div className="flex flex-col items-end ml-8 w-full mt-10 space-y-3">
        <div className="skeleton-box h-6 w-48 rounded-md" />
        <div className="flex gap-4">
          <div className="skeleton-box h-10 w-32 rounded-md" />
          <div className="skeleton-box h-10 w-40 rounded-md" />
        </div>
      </div>
    </div>
  );
};

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, clearCart } = useCartStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate small delay to show shimmer
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CartSkeleton />;

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-7xl mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center flex justify-center items-center gap-2">
        <ShoppingCart className="w-8 h-8 mr-2 text-blue-600" /> Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-2">Your cart is empty.</p>
          <p className="text-gray-600 mb-4">
            Add some products to get started!
          </p>
          <div className="flex justify-center">
            <Link
              to="/shop"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 w-auto"
            >
              <ArrowRightCircle className="w-5 h-5" /> Go Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8 w-[900px] m-auto ">
          {/* Left: Items list */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-gradient-to-br from-blue-100 to-gray-200 shadow-md rounded-lg p-8"
              >
                {/* Image + title */}
                <div className="flex items-start sm:items-center space-x-4 w-full sm:w-2/3">
                  <div className="w-28 h-28 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1">
                    <h2 className="text-lg font-semibold">{item.title}</h2>

                    <p className="mt-2 text-sm text-gray-700 flex items-center gap-1">
                      <IndianRupee className="w-4 h-4 text-gray-700" />
                      Price:{" "}
                      <span className="font-semibold text-gray-800">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item.price)}
                      </span>
                    </p>

                    <p className="mt-1 text-sm text-yellow-700">
                      Subtotal ({item.quantity} item):{" "}
                      <span className="font-bold text-gray-800">
                        {new Intl.NumberFormat("en-IN", {
                          style: "currency",
                          currency: "INR",
                        }).format(item.price * item.quantity)}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Controls */}
                <div className="mt-4 sm:mt-0 flex items-center justify-end space-x-3 w-full sm:w-auto">
                  <div className="flex items-center border rounded-md overflow-hidden">
                    <button
                      onClick={() => {
                        useCartStore.getState().addToCart(item, -1);
                        toast.error("Removed one item 🛒");
                      }}
                      className="px-3 py-1 bg-red-500 text-white hover:bg-red-600 transition-colors flex items-center justify-center"
                      aria-label={`Decrease quantity for ${item.title}`}
                    >
                      <Minus className="w-4 h-6" />
                    </button>

                    <div className="px-4 py-1 bg-white text-gray-800 font-medium">
                      {item.quantity}
                    </div>

                    <button
                      onClick={() => {
                        useCartStore.getState().addToCart(item, 1);
                        toast.success("Added one more item 🛒");
                      }}
                      className="px-3 py-1 bg-blue-600 text-white hover:bg-blue-700 transition-colors flex items-center justify-center"
                      aria-label={`Increase quantity for ${item.title}`}
                    >
                      <Plus className="w-4 h-6" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      removeFromCart(item.productId);
                      toast.error("Item removed from cart ❌");
                    }}
                    className="px-3 py-2 text-sm bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* ✅ Total + Proceed Section */}
          <div className="flex flex-col items-end ml-8 w-full">
            <h2 className="text-xl font-semibold mb-4 sm:mb-0 flex items-center gap-1">
              <IndianRupee className="w-5 h-5 text-blue-600" />
              Total:{" "}
              <span className="text-blue-600 font-bold">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(total)}
              </span>
            </h2>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => {
                  clearCart();
                  toast.error("Cart cleared 🧹");
                }}
                className="bg-gray-500 text-white px-5 py-2 rounded-md hover:bg-gray-600 transition-colors flex items-center gap-2"
              >
                <Trash2 className="w-5 h-5" /> Clear Cart
              </button>

              <Link
                to="/checkout"
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
              >
                <ArrowRightCircle className="w-5 h-5" /> Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
