import React from "react";
import { useOrderStore } from "../store/useOrderStore";
import { Package, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import SkeletonOrders from "../Components/Skeletons/SkeletonOrders";

const StatusBadge = ({ status }: { status: string }) => {
  const base = "px-2 py-1 rounded-full text-xs font-semibold";
  const colors: Record<string, string> = {
    Processing: "bg-yellow-100 text-yellow-700 border border-yellow-300",
    Shipped: "bg-blue-100 text-blue-700 border border-blue-300",
    Delivered: "bg-green-100 text-green-700 border border-green-300",
    Cancelled: "bg-red-100 text-red-700 border border-red-300",
  };
  return <span className={`${base} ${colors[status]}`}>{status}</span>;
};

const Orders = () => {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);
  const orders = useOrderStore((state) => state.orders);

  if (orders.length === 0) {
    return (
      <p className="text-center mt-20 text-gray-600 text-xl">
        You have no orders yet.
      </p>
    );
  }

  if (loading) return <SkeletonOrders />;

  return (
    <div className="max-w-4xl mx-auto min-h-screen px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2 text-gray-800">
        <Package className="text-blue-600 w-7 h-7 mt-2" /> Your Orders
      </h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <div
            key={order.id}
            className="items-start sm:items-center justify-between bg-gradient-to-br from-blue-100 to-gray-200 shadow-md rounded-lg p-8"
          >
            {/* TOP ROW: Date + Total + Status */}
            <div className="flex justify-between items-center">
              <span className="font-semibold flex items-center gap-2 text-gray-700">
                <Calendar className="w-5 h-5 text-blue-600" />
                {new Date(order.date).toLocaleString()}
              </span>

              <div className="flex items-center gap-3">
                <StatusBadge status={order.status} />
                <span className="font-bold text-green-700 text-lg">
                  ₹{order.total}
                </span>
              </div>
            </div>

            {/* ITEMS LIST */}
            <div className="lg:col-span-2 space-y-4">
              {order.items.map((item) => (
                <Link
                  key={item.productId}
                  to={`/orders/${order.id}`}
                  className="flex justify-between p-2 rounded-lg transition-all"
                >
                  <div className="flex items-start sm:items-center space-x-4 w-full sm:w-2/3">
                    <div className="w-24 h-24 bg-gray-50 rounded-lg flex items-center justify-center overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-start">
                        {item.title}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        Qty: {item.quantity}
                      </p>
                    </div>
                  </div>

                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                </Link>
              ))}
            </div>

            {/* ADDRESS */}
            <p className="mt-3 text-gray-700 flex gap-2 items-center">
              <MapPin className="w-4 h-4 text-red-500" />
              {order.address.house}, {order.address.city}, {order.address.state}{" "}
              - {order.address.pincode}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
