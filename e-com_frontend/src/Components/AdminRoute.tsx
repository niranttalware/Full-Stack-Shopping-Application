import React, { JSX } from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const { user, loading } = useAuthStore();

  // 🔥 WAIT UNTIL Zustand finishes reading localStorage
  if (loading) return <div></div>; // or loader if you want

  // ❌ If no user → go login
  if (!user) return <Navigate to="/login" replace />;

  // ❌ If user is not admin → block access
  if (user.role !== "admin") return <Navigate to="/" replace />;

  // ✅ Admin allowed
  return children;
};

export default AdminRoute;
