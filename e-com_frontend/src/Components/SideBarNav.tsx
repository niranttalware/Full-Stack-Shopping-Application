import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  X,
  User,
  ArrowRight,
  LogOut,
  LogIn,
  AlertTriangle,
} from "lucide-react";
import CategoryTree from "./CategoryTree";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  userName?: string;
}

const SidebarNav: React.FC<Props> = ({ isOpen, onClose, userName }) => {
  const { user, logout } = useAuthStore();

  // ⭐ state for logout modal (only inside sidebar)
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // ref to scrollable container to control overscroll behavior
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // touch handling for mobile
  const touchStartY = useRef<number | null>(null);

  // Lock body scroll when sidebar is open, restore when closed
  useEffect(() => {
    if (isOpen) {
      // remember existing overflow to restore exactly if needed
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev || "";
      };
    }
    // ensure restore if component unmounts while closed
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Wheel handler to prevent scroll chaining
  const handleWheel = (e: React.WheelEvent) => {
    const el = scrollRef.current;
    if (!el) return;

    const atTop = el.scrollTop === 0;
    const atBottom =
      Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

    // user is trying to scroll past top or bottom -> preventDefault to avoid page scroll
    if ((atTop && e.deltaY < 0) || (atBottom && e.deltaY > 0)) {
      e.preventDefault();
    }
    // else allow normal scrolling inside sidebar
  };

  // Touch handlers for mobile overscroll prevention
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartY.current = e.touches?.[0]?.clientY ?? null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const el = scrollRef.current;
    if (!el || touchStartY.current === null) return;

    const currentY = e.touches?.[0]?.clientY ?? 0;
    const deltaY = touchStartY.current - currentY;

    const atTop = el.scrollTop === 0;
    const atBottom =
      Math.ceil(el.scrollTop + el.clientHeight) >= el.scrollHeight;

    // if user would scroll past top or bottom, prevent default so page doesn't move
    if ((atTop && deltaY < 0) || (atBottom && deltaY > 0)) {
      e.preventDefault();
    }
  };

  return (
    <>
      {/* BACKDROP */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-[200] transition-opacity ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      >
        {isOpen && (
          <button
            onClick={onClose}
            className="absolute top-4 left-[320px] z-[300]"
          >
            <X className="w-9 h-9 text-white border p-1" />
          </button>
        )}

        {/* SIDEBAR */}
        <div
          className={`bg-white w-80 h-full shadow-xl transform transition-all duration-300 ease-out ${
            isOpen
              ? "translate-x-0 scale-100 opacity-100"
              : "-translate-x-full scale-95 opacity-0"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gray-700 text-white px-8 py-4">
            <h2 className="text-lg font-semibold">
              {user ? `Hello, ${userName}` : "Hello, Sign in"} 👋
            </h2>
            <p className="text-sm opacity-90">Welcome to MyShop</p>
          </div>

          {/* Scrollable */}
          <div
            // attach ref + wheel & touch handlers
            ref={scrollRef}
            onWheel={handleWheel}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            className="overflow-y-auto h-[calc(100%-88px)] px-8 py-7 space-y-6"
          >
            <CategoryTree onClose={onClose} />

            <hr className="border-gray-300 opacity-60" />

            {/* OFFERS */}
            <div>
              <h3 className="text-gray-800 font-bold text-sm mb-2 uppercase tracking-wide flex items-center gap-2">
                <ArrowRight className="w-4 h-4" /> Offers & Deals
              </h3>

              <ul className="space-y-2 pl-1">
                <li>Today's Deals</li>
                <li>Flash Sale</li>
                <li>Trending Products</li>
                <li>Bestsellers</li>
                <li>New Arrivals</li>
              </ul>
            </div>

            <hr className="my-3 border-gray-300 opacity-60" />

            {/* SETTINGS */}
            <div>
              <h3 className="text-gray-800 font-bold text-sm mb-2 uppercase tracking-wide flex items-center gap-2">
                <User className="w-4 h-4" /> Help & Settings
              </h3>

              <ul className="space-y-2 pl-1">
                <li>
                  <Link
                    to="/help"
                    onClick={onClose}
                    className="hover:text-indigo-600"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    to="/shipping"
                    onClick={onClose}
                    className="hover:text-indigo-600"
                  >
                    Shipping Info
                  </Link>
                </li>
                <li>
                  <Link
                    to="/returns"
                    onClick={onClose}
                    className="hover:text-indigo-600"
                  >
                    Returns
                  </Link>
                </li>
                <li>
                  <Link
                    to="/refund"
                    onClick={onClose}
                    className="hover:text-indigo-600"
                  >
                    Refund Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    onClick={onClose}
                    className="hover:text-indigo-600"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    onClick={onClose}
                    className="hover:text-indigo-600"
                  >
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>

            <hr className="my-1 border-gray-300 opacity-60" />

            <ul className="space-y-2 pl-1">
              <li>
                <Link
                  to="/profile"
                  onClick={onClose}
                  className="hover:text-indigo-600"
                >
                  Your Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/orders"
                  onClick={onClose}
                  className="hover:text-indigo-600"
                >
                  Your Orders
                </Link>
              </li>
            </ul>

            {/* SIGN OUT / SIGN IN */}
            <div>
              {user ? (
                <button
                  onClick={() => setShowLogoutModal(true)}
                  className="w-full flex items-center gap-2 text-red-600 font-semibold px-2 py-2 rounded-md hover:bg-red-100 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="w-full flex items-center gap-2 text-indigo-600 font-semibold px-2 py-2 rounded-md hover:bg-indigo-100 transition-all"
                >
                  <LogIn className="w-5 h-5" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ⭐ FULL-SCREEN LOGOUT MODAL (Copied from Header) */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-[500]">
          <div className="bg-white rounded-xl shadow-xl p-8 min-w-[30%] text-center">
            <h2 className="text-xl font-semibold text-gray-800 mb-3 flex items-center justify-center gap-2">
              <AlertTriangle className="text-red-600 w-7 h-7" /> Confirm Logout
            </h2>

            <p className="text-gray-600 mb-6">
              Are you sure you want to logout?
            </p>

            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-all"
              >
                Cancel
              </button>

              <button
                onClick={() => {
                  setShowLogoutModal(false);
                  logout();
                  onClose();
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
    </>
  );
};

export default SidebarNav;
