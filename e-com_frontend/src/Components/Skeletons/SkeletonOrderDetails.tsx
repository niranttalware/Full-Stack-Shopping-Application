import React from "react";
import "../../styles/shimmer.css";

const SkeletonOrderDetails = () => {
  return (
    <div className="max-w-5xl mx-auto min-h-screen px-4 py-8">
      {/* Title */}
      <div className="flex justify-center mb-6">
        <div className="skeleton-box h-10 w-52"></div>
      </div>

      <div className="border p-5 rounded-2xl shadow-lg bg-gradient-to-br from-gray-100 to-gray-100 space-y-8">
        {/* Banner */}
        <div className="flex gap-4 p-4 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm">
          <div className="skeleton-box w-6 h-6 rounded-full"></div>
          <div className="skeleton-box h-6 w-48"></div>
        </div>

        {/* Order Info */}
        <div className="flex justify-between items-start bg-gray-50 p-4 rounded-xl">
          <div className="space-y-3">
            <div className="skeleton-box h-5 w-48"></div>
            <div className="flex items-center gap-2">
              <div className="skeleton-box h-4 w-4 rounded-full"></div>
              <div className="skeleton-box h-4 w-40"></div>
            </div>
            <div className="skeleton-box h-5 w-32"></div>
          </div>

          <div className="text-right">
            <div className="skeleton-box h-6 w-24"></div>
          </div>
        </div>

        {/* Delivery Progress Title */}
        <div>
          <div className="skeleton-box h-5 w-40 mb-4"></div>

          {/* Timeline */}
          <div className="relative flex justify-between items-center mt-6">
            {/* Background line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-300 -z-10"></div>

            {/* Active line */}
            <div
              className="absolute top-1/2 left-0 h-1 bg-gray-400 -z-10"
              style={{ width: "60%" }}
            ></div>

            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col items-center w-24">
                <div className="skeleton-box w-10 h-10 rounded-full"></div>
                <div className="skeleton-box mt-2 h-3 w-20"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="p-4 bg-yellow-50 border border-yellow-300 rounded-xl shadow-sm">
          <div className="skeleton-box h-4 w-32 mb-2"></div>
          <div className="skeleton-box h-6 w-40"></div>
        </div>

        {/* Items List */}
        <div className="space-y-4 mt-4">
          <div className="skeleton-box h-5 w-48 mb-3"></div>

          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center p-4 bg-gray-50 rounded-xl shadow-sm"
            >
              <div className="flex items-center gap-4">
                <div className="skeleton-box w-20 h-20 rounded-lg"></div>

                <div className="space-y-2">
                  <div className="skeleton-box h-4 w-40"></div>
                  <div className="skeleton-box h-4 w-20"></div>
                </div>
              </div>

              <div className="skeleton-box h-5 w-20"></div>
            </div>
          ))}
        </div>

        {/* Address Box */}
        <div className="p-4 bg-gray-50 rounded-xl flex gap-4 items-start shadow-sm border">
          <div className="skeleton-box w-5 h-5 rounded-full mt-1"></div>

          <div className="space-y-2">
            <div className="skeleton-box h-4 w-40"></div>
            <div className="skeleton-box h-4 w-64"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <div className="skeleton-box h-10 w-32"></div>
          <div className="skeleton-box h-10 w-40"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonOrderDetails;
