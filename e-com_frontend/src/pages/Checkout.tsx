// src/pages/Checkout.tsx
import React, { useState, useRef, useEffect } from "react";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import SkeletonCheckout from "../Components/Skeletons/SkeletonCheckout";
import {
  Receipt,
  ShoppingBag,
  CheckCircle2,
  AlertTriangle,
  CreditCard,
  Smartphone,
  Wallet,
  NotebookText,
  MapPinHouse,
  Wallet2,
} from "lucide-react";
import { useOrderStore } from "../store/useOrderStore";

const Checkout: React.FC = () => {
  const { cartItems, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [showWarning, setShowWarning] = useState(false);
  const [loading, setLoading] = useState(true);

  const [address, setAddress] = useState({
    fullName: "",
    mobile: "",
    house: "",
    pincode: "",
    city: "",
    state: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const formRef = useRef<HTMLFormElement | null>(null);

  const addOrder = useOrderStore((state) => state.addOrder);

  useEffect(() => {
    if (showAddressForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showAddressForm]);

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCharge = total > 500 ? 0 : 99;

  const handleProceed = () => {
    if (!user) {
      setShowWarning(true);
      return;
    }
    setShowAddressForm(true);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const requiredFields: string[] = [];

    // Full Name
    if (!address.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      requiredFields.push("fullName");
    } else if (!/^[A-Za-z\s]+$/.test(address.fullName)) {
      newErrors.fullName = "Name can only contain letters and spaces";
    }

    // Mobile
    if (!address.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
      requiredFields.push("mobile");
    } else if (!/^[6-9]\d{9}$/.test(address.mobile)) {
      newErrors.mobile = "Please enter a valid 10-digit mobile number";
    }

    // House
    if (!address.house.trim()) {
      newErrors.house = "House / Street address is required";
      requiredFields.push("house");
    }

    // Pincode
    if (!address.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
      requiredFields.push("pincode");
    } else if (!/^\d{6}$/.test(address.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    // City
    if (!address.city.trim()) {
      newErrors.city = "City is required";
      requiredFields.push("city");
    } else if (!/^[A-Za-z\s]+$/.test(address.city)) {
      newErrors.city = "Please enter a valid city name";
    }

    // State
    if (!address.state.trim()) {
      newErrors.state = "State is required";
      requiredFields.push("state");
    } else if (!/^[A-Za-z\s]+$/.test(address.state)) {
      newErrors.state = "Please enter a valid state name";
    }

    setErrors(newErrors);

    if (requiredFields.length > 0) {
      toast.error("Please fill all required fields ⚠️", {
        position: "top-center",
      });
      return false;
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      items: cartItems,
      total: total + shippingCharge,
      address,
      status: "Processing" as const,
    };

    // ⭐ Save order in store
    addOrder(order);

    toast.success("✅ Order placed successfully!", {
      position: "top-center",
    });

    clearCart();
    navigate("/orders");
  };

  const fieldClass = (field: string) =>
    `border px-3 py-2 rounded-md w-full ${
      errors[field]
        ? "border-red-500 focus:ring-red-400"
        : "border-gray-300 focus:ring-blue-500"
    }`;

  // validate a single field and return an error message (empty string if valid)
  const validateField = (field: string, value: string): string => {
    const v = value.trim();

    switch (field) {
      case "fullName":
        if (!v) return "Full Name is required";
        if (!/^[A-Za-z\s]+$/.test(v))
          return "Name can only contain letters and spaces";
        return "";

      case "mobile":
        if (!v) return "Mobile number is required";
        if (!/^[6-9]\d{9}$/.test(v))
          if (v.length < 10 || v.length > 10) {
            return "Please enter a valid 10-digit mobile number";
          }
        return "";

      case "house":
        if (!v) return "House / Street address is required";
        return "";

      case "pincode":
        if (!v) return "Pincode is required";
        if (!/^\d{6}$/.test(v)) return "Please enter a valid 6-digit pincode";
        return "";

      case "city":
        if (!v) return "City is required";
        if (!/^[A-Za-z\s]+$/.test(v)) return "Please enter a valid city name";
        return "";

      case "state":
        if (!v) return "State is required";
        if (!/^[A-Za-z\s]+$/.test(v)) return "Please enter a valid state name";
        return "";

      default:
        return "";
    }
  };

  // update field value and re-validate only that field (clear error only when field valid)
  const handleInputChange = (field: string, value: string) => {
    setAddress((prev) => ({ ...prev, [field]: value }));

    const fieldError = validateField(field, value);

    setErrors((prev) => {
      // if field is valid -> remove error for that field
      if (!fieldError) {
        const { [field]: _, ...rest } = prev;
        return rest;
      }
      // keep/update the error message for this field
      return { ...prev, [field]: fieldError };
    });
  };

  // List of Indian states
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // simulate load
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonCheckout showAddressForm={showAddressForm} />;

  return (
    <div className="w-full px-6 min-h-screen py-10">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800 flex items-center justify-center gap-2">
        <Receipt className="w-8 h-8 mt-1 text-orange-600" /> Checkout
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Your cart is empty. Please add some items in Cart before checkout.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Order Summary */}
          <div className="md:col-span-2 bg-gradient-to-br from-gray-200 to-blue-100 shadow-lg rounded-2xl p-6 h-fit">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-3 flex items-center justify-start gap-2">
              <NotebookText className="w-6 h-6 mt-1 text-blue-600" />
              Order Summary
            </h2>

            <div className="divide-y">
              {cartItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex justify-between items-center py-4"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-contain rounded-md border"
                    />
                    <div>
                      <p className="font-medium text-gray-800">{item.title}</p>
                      <p className="text-sm text-gray-500">
                        Qty:{" "}
                        <span className="font-semibold">{item.quantity}</span>
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold text-gray-800">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Section - Payment Summary */}
          <div className="bg-gradient-to-br from-blue-100 to-gray-200 shadow-lg rounded-2xl p-6 flex flex-col justify-between h-fit">
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b pb-3 flex items-center justify-start gap-2">
                <Wallet className="w-6 h-6 mt-1 text-blue-600" />
                Payment Details
              </h2>

              <div className="space-y-3 mt-4">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(total)}
                  </span>
                </div>

                <div className="flex justify-between text-gray-700 grid-flow-row">
                  <span>Shipping</span>
                  <span>
                    {shippingCharge === 0 ? (
                      <span className="text-green-600 font-semibold">FREE</span>
                    ) : (
                      "₹99.00"
                    )}
                  </span>
                </div>

                <div className="border-t pt-3 flex justify-between font-bold text-lg text-gray-900">
                  <span>Total</span>
                  <span className="text-blue-600">
                    {new Intl.NumberFormat("en-IN", {
                      style: "currency",
                      currency: "INR",
                    }).format(total + shippingCharge)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleProceed}
                className="mt-8 mb-4 w-full bg-green-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-green-700 transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" /> Proceed to Buy
              </button>
            </div>
          </div>
        </div>
      )}

      {showWarning && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-8 w-[35%] text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
              <AlertTriangle className="text-yellow-600 w-7 h-7" /> Please Login
            </h2>
            <p className="text-gray-600 mb-6">
              You need to login to proceed with your purchase.
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowWarning(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowWarning(false);
                  navigate("/login");
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ✅ Address + Payment Form (only shows if user is logged in) */}
      {showAddressForm && (
        <form
          ref={formRef}
          onSubmit={handleCheckout}
          className="mt-12 bg-white shadow-lg rounded-2xl p-8 max-w-full mx-auto"
        >
          <h2 className="text-2xl font-semibold mb-6 border-b pb-3 flex items-center justify-start gap-2">
            <MapPinHouse className="w-6 h-6 mt-1 text-blue-600" />
            Delivery Address
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Full Name */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Full Name"
                value={address.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className={fieldClass("fullName")}
              />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Mobile */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mobile Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Mobile Number"
                value={address.mobile}
                onChange={(e) => handleInputChange("mobile", e.target.value)}
                className={fieldClass("mobile")}
              />
              {errors.mobile && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.mobile}
                </p>
              )}
            </div>

            {/* House / Street */}
            <div className="relative col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                House No, Building, Street{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="House No, Building, Street"
                value={address.house}
                onChange={(e) => handleInputChange("house", e.target.value)}
                className={fieldClass("house")}
              />
              {errors.house && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.house}
                </p>
              )}
            </div>

            {/* Pincode */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pincode <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Pincode"
                value={address.pincode}
                onChange={(e) => handleInputChange("pincode", e.target.value)}
                className={fieldClass("pincode")}
              />
              {errors.pincode && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.pincode}
                </p>
              )}
            </div>

            {/* City */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                City <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="City"
                value={address.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                className={fieldClass("city")}
              />
              {errors.city && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.city}
                </p>
              )}
            </div>

            {/* State */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                State <span className="text-red-500">*</span>
              </label>
              <select
                value={address.state}
                onChange={(e) => handleInputChange("state", e.target.value)}
                className={`${fieldClass("state")} bg-white overflow-y-auto`}
                style={{
                  maxHeight: "10rem", // shows roughly 5–6 states when opened
                }}
              >
                <option value="">Select State</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs mt-1 absolute">
                  {errors.state}
                </p>
              )}
            </div>
          </div>

          {/* Payment Section */}
          <h3 className="text-xl font-semibold mb-3 text-gray-800 border-b pb-2 pt-5">
            Payment Method
          </h3>

          <div className="space-y-3 mb-6">
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" defaultChecked />
              <span className="flex items-center gap-2">
                <Wallet2 className="w-5 h-5 text-green-600" /> Cash on Delivery
                (COD)
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" />
              <span className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-blue-600" /> Credit / Debit
                Card
              </span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="radio" name="payment" />
              <span className="flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-purple-600" /> UPI / Wallet
              </span>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-xl text-lg font-semibold hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" /> Place Order
          </button>
        </form>
      )}
    </div>
  );
};

export default Checkout;
