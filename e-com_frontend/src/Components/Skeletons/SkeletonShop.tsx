import React from "react";
import "../../styles/shimmer.css";

const SkeletonShop: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-200 p-4 rounded-md">
      {/* 🔍 Search Results */}
      <div className="p-4 bg-slate-300 shadow-md mb-6 rounded-lg">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-5 h-5 skeleton-box" />
          <div className="h-6 w-1/3 skeleton-box" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="border rounded-lg p-4 bg-gray-100 shadow flex flex-col gap-3"
            >
              <div className="w-full h-40 skeleton-box rounded" />
              <div className="h-5 w-3/4 skeleton-box mx-auto" />
              <div className="h-5 w-1/2 skeleton-box mx-auto" />
            </div>
          ))}
        </div>
      </div>

      {/* 🛍 Shop by Categories Header */}
      <div className="flex items-center gap-3 mb-8">
        <div className="w-8 h-8 rounded-full skeleton-box" />
        <div className="h-7 w-48 skeleton-box" />
      </div>

      {/* ⚡ Electronics Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-300 pb-2">
          <div className="w-6 h-6 rounded-full skeleton-box" />
          <div className="h-6 w-40 skeleton-box" />
        </div>

        {/* Smartphones, Laptops, Earphones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-xl overflow-hidden p-4 h-fit pb-4"
            >
              <div className="h-6 w-1/2 mb-6 skeleton-box" />
              <div className="grid grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-24 skeleton-box rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Accessories + Smartwatches */}
        <div className="flex flex-col lg:flex-row gap-4 mt-4">
          <div className="bg-white shadow-lg rounded-xl p-4 w-full lg:w-[59%]">
            <div className="h-6 w-2/3 mb-4 skeleton-box" />
            <div className="grid grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="h-24 skeleton-box rounded-lg" />
              ))}
            </div>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-4 w-full lg:w-[40%]">
            <div className="h-6 w-2/3 mb-4 skeleton-box" />
            <div className="grid grid-cols-2 gap-3">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="h-24 skeleton-box rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 👕 Clothing Section */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6 border-b-2 border-gray-300 pb-2">
          <div className="w-6 h-6 rounded-full skeleton-box" />
          <div className="h-6 w-48 skeleton-box" />
        </div>

        {/* Clothing Subcategories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white shadow-lg rounded-xl p-5 h-fit">
              <div className="h-6 w-2/3 mb-5 skeleton-box" />
              <div className="grid grid-cols-3 gap-4">
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="h-28 skeleton-box rounded-lg" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Jackets */}
        <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
          <div className="h-7 w-40 mb-6 skeleton-box" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 skeleton-box rounded-lg" />
            ))}
          </div>
        </div>

        {/* Shoes */}
        <div className="bg-white shadow-lg rounded-xl p-6 mt-6">
          <div className="h-7 w-40 mb-6 skeleton-box" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-36 skeleton-box rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonShop;
