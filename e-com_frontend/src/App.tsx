import React, { useEffect } from "react";
import Header from "./Components/Header";
import Home from "./pages/Home";
import Footer from "./Components/Footer";
import { Route, Routes, useLocation } from "react-router-dom";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CategoryPage from "./pages/CategoryPage";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./Components/ScrollToTop";
import { useAuthStore } from "./store/useAuthStore";
import AdminRoute from "./Components/AdminRoute";
import DashboardAdmin from "./pages/Admin/DashboardAdmin";
import MainCategoryPage from "./pages/MainCategoryPage";
import HelpCenter from "./pages/FooterContent/HelpCenter";
import Shipping from "./pages/FooterContent/Shipping";
import Returns from "./pages/FooterContent/Returns";
import PrivacyPolicy from "./pages/FooterContent/PrivacyPolicy";
import TermsCondition from "./pages/FooterContent/TermsCondition";
import RefundPolicy from "./pages/FooterContent/RefundPolicy";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import OrderDetails from "./pages/OrderDetails";

function App() {
  const location = useLocation();
  const hideHeader = ["/login", "/signup"].includes(location.pathname);

  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <ScrollToTop />
      {!hideHeader && <Header />}
      <main className="mx-6">
        <Routes>
          <Route
            path="/admin/*"
            element={
              <AdminRoute>
                <DashboardAdmin />
              </AdminRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/category/:categoryName" element={<CategoryPage />} />
          <Route path="/main/:mainCategory" element={<MainCategoryPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/:id" element={<OrderDetails />} />
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsCondition />} />
          <Route path="/refund" element={<RefundPolicy />} />
        </Routes>
      </main>
      <Footer />
      <Toaster
        position="bottom-center"
        toastOptions={{
          duration: 1500,
          style: {
            background: "#2c3e4c",
            color: "#fff",
            borderRadius: "8px",
            fontWeight: "500",
            padding: "10px 16px",
            marginBottom: "40px",
          },
        }}
      />
    </div>
  );
}

export default App;
