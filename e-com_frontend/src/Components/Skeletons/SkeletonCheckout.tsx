import React from "react";
import "../../styles/shimmer.css";

interface SkeletonCheckoutProps {
  showAddressForm?: boolean;
}

const Skeletoncheckout: React.FC<SkeletonCheckoutProps> = ({
  showAddressForm,
}) => {
  return (
    <div className="w-full px-6 min-h-screen py-10 animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-10">
        <div className="w-8 h-8 skeleton-box rounded-full" />
        <div className="h-8 w-40 skeleton-box rounded-md" />
      </div>

      {/* Order Summary + Payment */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Section – Order Summary */}
        <div className="md:col-span-2 bg-gradient-to-br from-gray-200 to-blue-100 shadow-lg rounded-2xl p-6 h-fit">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 skeleton-box rounded-full" />
            <div className="h-6 w-40 skeleton-box rounded-md" />
          </div>

          {[1, 2].map((i) => (
            <div
              key={i}
              className="flex justify-between items-center py-4 border-b border-gray-300 last:border-none"
            >
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 skeleton-box rounded-md" />
                <div className="space-y-2">
                  <div className="h-4 w-32 skeleton-box rounded-md" />
                  <div className="h-3 w-20 skeleton-box rounded-md" />
                </div>
              </div>
              <div className="h-4 w-16 skeleton-box rounded-md" />
            </div>
          ))}
        </div>

        {/* Right Section – Payment Details */}
        <div className="bg-gradient-to-br from-blue-100 to-gray-200 shadow-lg rounded-2xl p-6 flex flex-col justify-between h-fit">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 skeleton-box rounded-full" />
              <div className="h-6 w-36 skeleton-box rounded-md" />
            </div>

            <div className="space-y-3 mt-4">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex justify-between items-center text-gray-700"
                >
                  <div className="h-4 w-24 skeleton-box rounded-md" />
                  <div className="h-4 w-20 skeleton-box rounded-md" />
                </div>
              ))}
            </div>

            <div className="mt-8 mb-4 w-full h-10 skeleton-box rounded-xl" />
          </div>
        </div>
      </div>

      {/* Address Form – only when visible */}
      {showAddressForm && (
        <div className="mt-12 bg-white shadow-lg rounded-2xl p-8 max-w-full mx-auto">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 skeleton-box rounded-full" />
            <div className="h-6 w-40 skeleton-box rounded-md" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-28 skeleton-box rounded-md" />
                <div className="h-10 skeleton-box rounded-md" />
              </div>
            ))}
          </div>

          <div className="h-6 w-48 skeleton-box rounded-md mb-4" />
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-5 w-64 skeleton-box rounded-md mb-3" />
          ))}

          <div className="w-full h-10 skeleton-box rounded-xl mt-6" />
        </div>
      )}
    </div>
  );
};

export default Skeletoncheckout;
