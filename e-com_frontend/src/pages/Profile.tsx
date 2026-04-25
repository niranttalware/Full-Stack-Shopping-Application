// src/pages/Profile.tsx
import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useOrderStore } from "../store/useOrderStore";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import SkeletonProfile from "../Components/Skeletons/SkeletonProfile";

const ADDR_KEY = "saved_addresses";

const readAddresses = () => {
  try {
    return JSON.parse(localStorage.getItem(ADDR_KEY) || "[]");
  } catch {
    return [];
  }
};

const Profile: React.FC = () => {
  const { user } = useAuthStore();
  const orders = useOrderStore((s) => s.orders);
  const [addresses, setAddresses] = useState(readAddresses());
  const [loading, setLoading] = useState(true);

  const [newAddr, setNewAddr] = useState({
    fullName: "",
    mobile: "",
    house: "",
    pincode: "",
    city: "",
    state: "",
  });

  const saveAddress = () => {
    const updated = [...addresses, newAddr];
    localStorage.setItem(ADDR_KEY, JSON.stringify(updated));
    setAddresses(updated);

    setNewAddr({
      fullName: "",
      mobile: "",
      house: "",
      pincode: "",
      city: "",
      state: "",
    });

    toast.success("Address saved", { position: "top-center" });
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <SkeletonProfile />;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
        Your Profile
      </h1>

      {user ? (
        <>
          {/* ===================== 2-COLUMN LAYOUT ===================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* LEFT COLUMN (Account Info + Saved Address stacked) */}
            <div className="col-span-1 space-y-8">
              {/* Account Information */}
              <div className="bg-gradient-to-br from-gray-200 to-blue-100 shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-3">
                  Account Information
                </h2>

                <div className="space-y-4 mt-4 text-gray-800">
                  <p className="text-lg">
                    <span className="font-semibold">Name:</span> {user.name}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold">Email:</span> {user.email}
                  </p>
                  {user.city && (
                    <p className="text-lg">
                      <span className="font-semibold">City:</span> {user.city}
                    </p>
                  )}
                </div>
              </div>

              {/* Saved Addresses (NOW BELOW ACCOUNT INFO & SAME WIDTH) */}
              <div className="bg-gradient-to-br from-gray-200 to-blue-100 shadow-lg rounded-2xl p-6">
                <h2 className="text-2xl font-semibold mb-4 border-b pb-3">
                  Saved Addresses
                </h2>

                <div className="space-y-4">
                  {addresses.length === 0 ? (
                    <p className="text-gray-500">No saved addresses</p>
                  ) : (
                    addresses.map((a: any, i: number) => (
                      <div
                        key={i}
                        className="border p-4 rounded-xl bg-white shadow-sm"
                      >
                        <p className="font-semibold text-gray-800">
                          {a.fullName}
                        </p>
                        <p className="text-sm text-gray-600 mt-1 leading-6">
                          {a.house}, {a.city}, {a.state} - {a.pincode}
                        </p>
                        <p className="text-sm text-gray-500">
                          Mobile: {a.mobile}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN — Add New Address (Same width as left column) */}
            <div className="bg-gradient-to-br from-blue-100 to-gray-200 shadow-lg rounded-2xl p-6 h-fit">
              <h3 className="text-2xl font-bold mb-4 border-b pb-3 text-gray-800">
                Add New Address
              </h3>

              <div className="mt-4 bg-white shadow-md rounded-xl p-6 border border-gray-200">
                <div className="grid grid-cols-1 gap-4">
                  <input
                    placeholder="Full name"
                    value={newAddr.fullName}
                    onChange={(e) =>
                      setNewAddr((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                    className="border px-3 py-2 rounded-lg shadow-sm"
                  />

                  <input
                    placeholder="Mobile"
                    value={newAddr.mobile}
                    onChange={(e) =>
                      setNewAddr((prev) => ({
                        ...prev,
                        mobile: e.target.value,
                      }))
                    }
                    className="border px-3 py-2 rounded-lg shadow-sm"
                  />

                  <input
                    placeholder="House / Flat / Street"
                    value={newAddr.house}
                    onChange={(e) =>
                      setNewAddr((prev) => ({ ...prev, house: e.target.value }))
                    }
                    className="border px-3 py-2 rounded-lg shadow-sm"
                  />

                  <input
                    placeholder="Pincode"
                    value={newAddr.pincode}
                    onChange={(e) =>
                      setNewAddr((prev) => ({
                        ...prev,
                        pincode: e.target.value,
                      }))
                    }
                    className="border px-3 py-2 rounded-lg shadow-sm"
                  />

                  <input
                    placeholder="City"
                    value={newAddr.city}
                    onChange={(e) =>
                      setNewAddr((prev) => ({ ...prev, city: e.target.value }))
                    }
                    className="border px-3 py-2 rounded-lg shadow-sm"
                  />

                  <input
                    placeholder="State"
                    value={newAddr.state}
                    onChange={(e) =>
                      setNewAddr((prev) => ({ ...prev, state: e.target.value }))
                    }
                    className="border px-3 py-2 rounded-lg shadow-sm"
                  />
                </div>

                <button
                  onClick={saveAddress}
                  className="mt-4 px-5 py-2 flex mx-auto justify-center bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 shadow"
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>

          {/* ===================== RECENT ORDERS (UNCHANGED) ===================== */}
          <div className="mt-12 bg-white shadow-md rounded-xl p-6 border border-gray-200">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Recent Orders
            </h2>

            {orders.length === 0 ? (
              <p className="text-gray-600">No orders yet</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((o) => {
                  const firstItem = o.items[0];
                  const extraCount = o.items.length - 1;

                  return (
                    <li
                      key={o.id}
                      className="border rounded-xl p-4 bg-gray-50 shadow-sm flex items-center gap-4"
                    >
                      <img
                        src={firstItem.image}
                        alt={firstItem.title}
                        className="w-20 h-20 object-contain rounded border bg-white"
                      />

                      <div className="flex-1">
                        <Link to={`/orders/${o.id}`}>
                          <p className="text-sm text-gray-500 mb-1">
                            Order ID:{" "}
                            <span className="font-semibold">{o.id}</span>
                          </p>

                          <p className="font-semibold text-gray-900">
                            {firstItem.title}
                            {extraCount > 0 && (
                              <span className="text-sm text-gray-500">
                                {" "}
                                + {extraCount} more item(s)
                              </span>
                            )}
                          </p>

                          <p className="text-sm text-gray-600">
                            Qty: {firstItem.quantity}
                          </p>

                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(o.date).toLocaleString()}
                          </p>
                        </Link>
                      </div>

                      <div className="text-right">
                        <p className="text-lg font-bold text-green-700">
                          ₹{o.total}
                        </p>
                        <p className="text-sm font-semibold text-blue-600">
                          {o.status}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          Please login to view your profile.
        </p>
      )}
    </div>
  );
};

export default Profile;
