// src/components/SkeletonProfile.tsx
import React from "react";
import "../../styles/shimmer.css";

const SkeletonProfile = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 animate-pulse">
      {/* Page Title */}
      <div className="h-10 w-48 mx-auto skeleton-box mb-10"></div>

      {/* ===================== 2-COLUMN LAYOUT ===================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* LEFT: Account Info + Saved Address */}
        <div className="space-y-8">
          {/* Account Info Card */}
          <div className="bg-gradient-to-br from-gray-200 to-blue-100 shadow-lg rounded-2xl p-6">
            <div className="h-7 w-56 skeleton-box mb-6"></div>

            <div className="space-y-4">
              <div className="h-5 w-40 skeleton-box"></div>
              <div className="h-5 w-52 skeleton-box"></div>
              <div className="h-5 w-32 skeleton-box"></div>
            </div>
          </div>

          {/* Saved Addresses Card */}
          <div className="bg-gradient-to-br from-gray-200 to-blue-100 shadow-lg rounded-2xl p-6">
            <div className="h-7 w-56 skeleton-box mb-6"></div>

            {/* 3 skeleton address cards */}
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="border p-4 rounded-xl bg-white shadow-sm space-y-3"
                >
                  <div className="h-5 w-40 skeleton-box"></div>
                  <div className="h-4 w-56 skeleton-box"></div>
                  <div className="h-4 w-32 skeleton-box"></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Add New Address */}
        <div className="bg-gradient-to-br from-blue-100 to-gray-200 shadow-lg rounded-2xl p-6">
          <div className="h-7 w-56 skeleton-box mb-6"></div>

          <div className="bg-white rounded-xl shadow-md p-6 border space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-10 w-full skeleton-box"></div>
            ))}

            <div className="h-10 w-32 mx-auto skeleton-box"></div>
          </div>
        </div>
      </div>

      {/* ===================== RECENT ORDERS ===================== */}
      <div className="mt-12 bg-white shadow-md rounded-xl p-6 border">
        <div className="h-7 w-52 skeleton-box mb-6"></div>

        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="border rounded-xl p-4 bg-gray-50 shadow-sm mb-4 flex items-center gap-4"
          >
            <div className="w-20 h-20 rounded skeleton-box"></div>

            <div className="flex-1 space-y-3">
              <div className="h-4 w-40 skeleton-box"></div>
              <div className="h-5 w-56 skeleton-box"></div>
              <div className="h-4 w-24 skeleton-box"></div>
              <div className="h-3 w-32 skeleton-box"></div>
            </div>

            <div className="text-right space-y-3">
              <div className="h-5 w-20 skeleton-box ml-auto"></div>
              <div className="h-4 w-16 skeleton-box ml-auto"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonProfile;
