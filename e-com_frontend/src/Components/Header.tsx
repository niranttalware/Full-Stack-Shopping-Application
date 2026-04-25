import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCartStore } from "../store/useCartStore";
import { useAuthStore } from "../store/useAuthStore";
import {
  ShoppingCart,
  Search,
  X,
  MapPin,
  AlertTriangle,
  Menu,
} from "lucide-react";
import { useSearch } from "../context/SearchContext";
import logo from "../assets/shopping-icon-1.webp";
import toast from "react-hot-toast";
import SidebarNav from "./SideBarNav";

const Header: React.FC = () => {
  const cartItems = useCartStore((state) => state.cartItems);
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const { user, logout, loading } = useAuthStore();
  const { searchTerm, setSearchTerm } = useSearch();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  if (loading) return null;

  return (
    <>
      <header className="shadow-md sticky top-0 z-50 bg-gray-700 text-white">
        {/* Top Navbar */}
        <nav className="flex items-center justify-between px-6 py-3">
          {/* Left Section: Logo + Username */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={logo}
                alt="logo"
                className="w-10 h-10 object-contain drop-shadow-md mt-1"
              />
              <span className="text-2xl font-extrabold text-yellow-400">
                MyShop
              </span>
            </Link>

            {/* 👇 Username beside logo */}
            {user && (
              <span className="text-md text-gray-200 flex items-center gap-2">
                Hello,{" "}
                <span className="font-bold text-yellow-400">{user.name}</span>
                {user.city && (
                  <span className="text-md text-gray-300 ml-3 flex items-center gap-1 font-bold">
                    <MapPin size={16} className="text-yellow-400" />
                    {user.city}
                  </span>
                )}
              </span>
            )}
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 mx-40 ml-20 relative">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-4 py-2 rounded-l-md outline-none text-gray-800"
            />

            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-16 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
                aria-label="Clear search"
              >
                <X size={18} />
              </button>
            )}

            <button className="bg-yellow-400 text-black px-4 py-2 rounded-r-md hover:bg-yellow-500">
              <Search size={18} />
            </button>
          </div>

          {/* Right Side: Cart + Auth */}
          <div className="flex items-center space-x-5">
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                `flex items-center gap-1 text-sm font-semibold hover:text-yellow-400 ${
                  isActive ? "text-yellow-400" : ""
                }`
              }
            >
              <ShoppingCart size={22} />
              <span>Cart ({totalItems})</span>
            </NavLink>

            {/* Keep Login/Logout button at same place */}
            {user ? (
              <button
                onClick={() => setShowLogoutModal(true)}
                className="bg-red-500 px-3 py-1 rounded-md text-sm hover:bg-red-600 flex items-center gap-1"
              >
                {/* <LogOut size={16} /> */}
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="bg-yellow-400 text-black px-3 py-1 rounded-md hover:bg-yellow-500 text-sm flex items-center gap-1"
              >
                {/* <LogIn size={16} /> */}
                Login
              </Link>
            )}
          </div>
        </nav>

        {/* Bottom Menu */}
        <div className="bg-gray-800 text-sm px-6 py-2 flex space-x-6 overflow-x-auto">
          <button onClick={() => setOpenSidebar(true)}>
            <Menu size={24} />
          </button>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/checkout"
            className={({ isActive }) =>
              isActive
                ? "text-yellow-400 font-semibold"
                : "hover:text-yellow-400"
            }
          >
            Checkout
          </NavLink>
        </div>
      </header>

      {/* Logout Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[100]">
          <div className="bg-white rounded-xl shadow-xl p-8 min-w-[30%] text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
              <AlertTriangle className="text-red-600 w-7 h-7" /> Confirm Logout
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)} // cancel
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                  toast.success("✅ Logged Out successfully!", {
                    position: "top-center",
                    style: { marginTop: "90px" },
                  });
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-red-700 transition-all flex items-center gap-1"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      <SidebarNav
        isOpen={openSidebar}
        onClose={() => setOpenSidebar(false)}
        userName={user?.name}
      />
    </>
  );
};

export default Header;
