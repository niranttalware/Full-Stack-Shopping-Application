import React, { useEffect, useState } from "react";
import { Link, Routes, Route } from "react-router-dom";

import AddProductAdmin from "./AddProductAdmin";
import EditProductAdmin from "./EditProductAdmin";
import UsersAdmin from "./UsersAdmin";
import ProductsAdmin from "./ProductsAdmin";

const DashboardAdmin = () => {
  /* ---------------------------- DASHBOARD STATS ---------------------------- */
  const [stats, setStats] = useState({
    products: 0,
    users: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        // ----------- PRODUCTS COUNT ------------
        const prodRes = await fetch(
          "${process.env.REACT_APP_API_URL}/api/products",
        );
        const productData = await prodRes.json();

        let productCount = 0;

        Object.values(productData).forEach((subCats: any) => {
          Object.values(subCats).forEach((items: any) => {
            productCount += items.length;
          });
        });

        // ----------- USERS COUNT (CORRECT ROUTE) ------------
        const userRes = await fetch(
          "${process.env.REACT_APP_API_URL}/api/auth/users",
        );
        const userData = await userRes.json();

        setStats({
          products: productCount,
          users: userData.length,
        });
      } catch (err) {
        console.error(err);
      }
    };

    loadStats();
  }, []);

  /* ---------------------------- DASHBOARD UI ---------------------------- */
  const DashboardHome = () => (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="p-6 bg-blue-600 text-white rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Products</h2>
          <p className="text-4xl font-bold mt-2">{stats.products}</p>
        </div>

        <div className="p-6 bg-green-600 text-white rounded-xl shadow">
          <h2 className="text-xl font-semibold">Total Users</h2>
          <p className="text-4xl font-bold mt-2">{stats.users}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-5 space-y-4">
        <h2 className="text-2xl font-bold mb-5">Admin Panel</h2>

        <Link to="products" className="block hover:text-yellow-400">
          Manage Products
        </Link>

        <Link to="users" className="block hover:text-yellow-400">
          Manage Users
        </Link>

        <Link to="/" className="block text-red-400 mt-6">
          ← Back to Home
        </Link>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Routes>
          <Route index element={<DashboardHome />} />

          <Route path="products" element={<ProductsAdmin />} />
          <Route path="products/add" element={<AddProductAdmin />} />
          <Route path="products/edit/:id" element={<EditProductAdmin />} />

          <Route path="users" element={<UsersAdmin />} />
        </Routes>
      </main>
    </div>
  );
};

export default DashboardAdmin;
