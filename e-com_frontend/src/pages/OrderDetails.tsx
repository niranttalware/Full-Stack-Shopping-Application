// src/pages/OrderDetails.tsx
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useOrderStore } from "../store/useOrderStore";
import {
  Package,
  Calendar,
  MapPin,
  Truck,
  CheckCircle,
  Clock,
  AlertTriangle,
  Box,
} from "lucide-react";
import toast from "react-hot-toast";
import SkeletonOrderDetails from "../Components/Skeletons/SkeletonOrderDetails";

/* ---------------------------- TIMELINE HELPERS ---------------------------- */

const getSteps = (status: string) => {
  const steps = [
    { label: "Ordered", icon: Box },
    { label: "Shipped", icon: Truck },
    { label: "Out for Delivery", icon: Clock },
    { label: "Delivered", icon: CheckCircle },
  ];

  const indexMap: any = {
    Processing: 0,
    Shipped: 1,
    "Out for Delivery": 2,
    Delivered: 3,
    Cancelled: -1,
  };

  return { steps, activeIndex: indexMap[status] ?? 0 };
};

const getAutoStatus = (orderDate: string, currentStatus: string) => {
  const orderTime = new Date(orderDate).getTime();
  const now = Date.now();

  const diffDays = Math.floor((now - orderTime) / (1000 * 60 * 60 * 24));

  if (currentStatus === "Cancelled") return "Cancelled";

  // Simple time-based progression:
  if (diffDays === 0) return "Processing"; // Today
  if (diffDays === 1) return "Shipped"; // Next day
  if (diffDays === 2 || diffDays === 3) return "Out for Delivery";
  if (diffDays >= 4) return "Delivered"; // After 4 days

  return currentStatus;
};

/**
 * Return a readable estimated delivery date (based on order date).
 * Using a +4 day baseline (you can tune this).
 */
const getEstimatedDelivery = (status: string, date: string) => {
  if (status === "Delivered") return "Delivered";

  const base = new Date(date);
  base.setDate(base.getDate() + 4);
  // nicer formatting:
  return base.toDateString();
};

const getBanner = (status: string) => {
  if (status === "Processing")
    return {
      text: "Your order is being prepared",
      class: "bg-yellow-100 text-yellow-800 border border-yellow-300",
      icon: Clock,
    };

  if (status === "Shipped")
    return {
      text: "Your package is on the way",
      class: "bg-blue-100 text-blue-800 border border-blue-300",
      icon: Truck,
    };

  if (status === "Delivered")
    return {
      text: "Your package has been delivered",
      class: "bg-green-100 text-green-800 border border-green-300",
      icon: CheckCircle,
    };

  return {
    text: "Your order was cancelled",
    class: "bg-red-100 text-red-800 border border-red-300",
    icon: AlertTriangle,
  };
};

/* -------------------------------------------------------------------------- */

const OrderDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const orders = useOrderStore((s) => s.orders);
  const cancelOrder = useOrderStore((s) => s.cancelOrder);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const order = orders.find((o) => o.id === id);

  if (!order) {
    return (
      <div className="px-6 py-10">
        <p className="text-center text-gray-600">Order not found.</p>
      </div>
    );
  }

  // derive auto status (time-based). Keep original stored status untouched until user cancels.
  const autoStatus = getAutoStatus(order.date, order.status);

  // steps and activeIndex are driven by autoStatus so the timeline progresses automatically.
  const { steps, activeIndex } = getSteps(autoStatus);

  // banner should reflect the *current* (auto) status so UI is consistent
  const banner = getBanner(autoStatus);

  const handleCancel = () => {
    // allow cancel only if the order is still in the Processing stage (autoStatus)
    if (autoStatus === "Processing") {
      cancelOrder(order.id);
      toast.success("✅ Order cancelled", { position: "top-center" });
      navigate("/orders");
    } else {
      toast.error("Order cannot be cancelled", { position: "top-center" });
    }
  };

  if (loading) return <SkeletonOrderDetails />;

  return (
    <div className="max-w-5xl mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
        <Package className="text-blue-600 w-7 h-7" /> Order Details
      </h1>

      <div className="border p-5 rounded-2xl shadow-lg  bg-gradient-to-br from-gray-100 to-gray-100 space-y-8">
        {/* use banner based on autoStatus */}
        <div
          className={`flex items-center gap-3 p-4 rounded-xl ${banner.class}`}
        >
          <banner.icon className="w-6 h-6" />
          <p className="font-semibold text-sm">{banner.text}</p>
        </div>

        <div className="flex justify-between items-start bg-gray-50 p-4 rounded-xl">
          <div>
            <p className="text-gray-800 font-semibold text-lg">
              Order ID: {order.id}
            </p>

            <p className="text-gray-600 text-sm flex items-center gap-1 mt-1">
              <Calendar className="w-4 h-4" />
              Ordered on: {new Date(order.date).toLocaleString()}
            </p>

            {/* display autoStatus so status label matches banner + timeline */}
            <p className="text-gray-800 text-sm font-semibold mt-2">
              Status:{" "}
              <span className="font-bold text-blue-600">{autoStatus}</span>
            </p>
          </div>

          <div className="text-right">
            <p className="text-green-700 font-extrabold text-xl">
              ₹{order.total}
            </p>
          </div>
        </div>

        {/* --------------------------- PREMIUM TIMELINE --------------------------- */}
        <div>
          <h3 className="font-semibold text-gray-800 mb-4">
            Delivery Progress
          </h3>

          <div className="flex items-center justify-between relative mt-6">
            {/* BACKGROUND LINE */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-10"></div>

            {/* ACTIVE PROGRESS LINE (width computed relative to steps.length - 1) */}
            <div
              className="absolute top-1/2 left-0 h-1 bg-green-600 -z-10 transition-all duration-500"
              style={{ width: `${(activeIndex / (steps.length - 1)) * 100}%` }}
            ></div>

            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div key={idx} className="flex flex-col items-center w-24">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                      idx <= activeIndex
                        ? "bg-green-600 text-white border-green-600 scale-110 shadow-lg"
                        : "bg-gray-200 text-gray-500 border-gray-400"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>

                  <p
                    className={`mt-2 text-xs font-semibold text-center ${
                      idx <= activeIndex ? "text-green-700" : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* --------------------------- ESTIMATED DELIVERY --------------------------- */}
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm">
          <p className="text-sm text-gray-800 font-semibold">
            Estimated Delivery:
          </p>
          <p className="font-bold text-green-700 text-xl mt-1">
            {getEstimatedDelivery(autoStatus, order.date)}
          </p>
        </div>

        {/* --------------------------- ITEM LIST --------------------------- */}
        <div className="space-y-4 mt-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-600" /> Items in this
            Order
          </h3>

          {order.items.map((item) => (
            <div
              key={item.productId}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 rounded-lg border object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{item.title}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <p className="font-bold text-gray-900">
                ₹{item.price * item.quantity}
              </p>
            </div>
          ))}
        </div>

        {/* --------------------------- ADDRESS --------------------------- */}
        <div className="p-4 bg-gray-50 rounded-xl flex gap-4 items-start shadow-sm border">
          <MapPin className="w-5 h-5 text-red-500 mt-1" />
          <div>
            <p className="font-semibold text-gray-800">Delivery Address</p>
            <p className="text-gray-700 text-sm mt-1 leading-6">
              {order.address.house}, {order.address.city}, {order.address.state}{" "}
              - {order.address.pincode}
            </p>
          </div>
        </div>

        {/* --------------------------- BUTTONS --------------------------- */}
        <div className="flex gap-3">
          <button
            onClick={() => navigate("/orders")}
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition font-medium"
          >
            Back to orders
          </button>

          {autoStatus === "Processing" && (
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 font-medium"
            >
              Cancel Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
