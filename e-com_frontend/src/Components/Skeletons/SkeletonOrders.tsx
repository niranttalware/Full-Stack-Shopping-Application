import React from "react";
import "../../styles/shimmer.css";

const SkeletonOrders = () => {
  return (
    <div className="max-w-4xl mx-auto min-h-screen px-4 py-8">
      {/* PAGE TITLE */}
      <div className="flex justify-center mb-6">
        <div className="skeleton-box h-10 w-52"></div>
      </div>

      {/* LIST OF SKELETON CARDS */}
      <div className="space-y-6">
        {[1].map((_, i) => (
          <div
            key={i}
            className="bg-gradient-to-br from-blue-100 to-gray-200 shadow-md rounded-lg p-8 space-y-6"
          >
            {/* TOP ROW */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="skeleton-box h-5 w-5 rounded-full"></div>
                <div className="skeleton-box h-5 w-40"></div>
              </div>

              <div className="flex items-center gap-3">
                <div className="skeleton-box h-6 w-20 rounded-full"></div>
                <div className="skeleton-box h-6 w-16"></div>
              </div>
            </div>

            {/* ORDER ITEMS */}
            <div className="space-y-4">
              {[1].map((_, j) => (
                <div
                  key={j}
                  className="flex justify-between p-2 rounded-lg items-center"
                >
                  {/* IMAGE + TEXT */}
                  <div className="flex items-start space-x-4 w-full sm:w-2/3">
                    <div className="skeleton-box w-24 h-24 rounded-lg"></div>

                    <div className="flex-1 space-y-2">
                      <div className="skeleton-box h-5 w-40"></div>
                      <div className="skeleton-box h-4 w-20"></div>
                    </div>
                  </div>

                  <div className="skeleton-box h-5 w-16"></div>
                </div>
              ))}
            </div>

            {/* ADDRESS */}
            <div className="flex items-center gap-2">
              <div className="skeleton-box w-4 h-4 rounded-full"></div>
              <div className="skeleton-box h-4 w-64"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonOrders;
