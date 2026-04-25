import React from "react";
import "../../styles/shimmer.css";

const SkeletonHome = () => {
  return (
    <div className="p-6 bg-gray-100">
      {/* ================= HERO BANNER ================= */}
      <div className="rounded-xl h-64 w-full mb-12 skeleton-box" />

      {/* ================= OFFER STICKERS ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-24 rounded-lg skeleton-box" />
        ))}
      </div>

      {/* ================= FLASH SALE TITLE ================= */}
      <div className="h-7 w-48 mb-5 rounded skeleton-box" />

      {/* ================= FLASH SALE HORIZONTAL CARDS ================= */}
      <div className="flex gap-6 overflow-x-auto pb-6">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-[220px]">
            <div className="h-64 rounded-xl skeleton-box" />
          </div>
        ))}
      </div>

      {/* ================= TRENDING TITLE ================= */}
      <div className="h-7 w-56 mt-10 mb-6 rounded skeleton-box" />

      {/* ================= TRENDING GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 rounded-xl skeleton-box" />
        ))}
      </div>

      {/* ================= RECOMMENDED TITLE ================= */}
      <div className="h-7 w-64 mt-12 mb-6 rounded skeleton-box" />

      {/* ================= RECOMMENDED GRID ================= */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-64 rounded-xl skeleton-box" />
        ))}
      </div>

      {/* ================= CATEGORY SECTIONS TITLE ================= */}
      <div className="h-7 w-60 mt-12 mb-6 rounded skeleton-box" />

      {/* ================= CATEGORY SECTIONS HORIZONTAL CARDS ================= */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="min-w-[220px]">
            <div className="h-64 rounded-xl skeleton-box" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonHome;
