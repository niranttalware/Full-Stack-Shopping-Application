import React from "react";
import * as FaIcons from "react-icons/fa";

interface RatingProps {
  rate: number;
  count: number;
}

const Rating: React.FC<RatingProps> = ({ rate, count }) => {
  // Clamp between 0 and 5
  const normalizedRate = Math.max(0, Math.min(rate, 5));

  const fullStars = Math.floor(normalizedRate);
  const fraction = normalizedRate - fullStars;

  // Convert fraction into a more realistic visible fill
  // Ensures that even 4.1–4.3 still looks slightly filled
  const visibleFraction = Math.max(0.25 * fraction, fraction); // smooths low fills
  const partialPercentage = Math.min(visibleFraction * 100 + 10, 100); // adds slight bias for visibility

  const emptyStars = 5 - Math.ceil(normalizedRate);

  const FaStar = FaIcons.FaStar as React.ElementType;
  const FaRegStar = FaIcons.FaRegStar as React.ElementType;

  return (
    <div className="flex items-center space-x-1">
      <span className="ml-1 text-sm text-gray-600">
        {normalizedRate.toFixed(1)}
      </span>

      {/* Full Stars */}
      {[...Array(fullStars)].map((_, i) => (
        <FaStar key={`full-${i}`} className="text-yellow-500" />
      ))}

      {/* Partial Star (Amazon-like smooth fill) */}
      {fraction > 0 && (
        <div className="relative inline-block w-4 h-4">
          <FaRegStar className="absolute top-0 left-0 text-gray-300" />
          <FaStar
            className="absolute top-0 left-0 text-yellow-500"
            style={{
              clipPath: `inset(0 ${100 - partialPercentage}% 0 0)`,
              transition: "clip-path 0.2s ease-in-out",
            }}
          />
        </div>
      )}

      {/* Empty Stars */}
      {[...Array(emptyStars)].map((_, i) => (
        <FaRegStar key={`empty-${i}`} className="text-gray-300" />
      ))}

      <span className="ml-1 text-sm text-gray-600">({count})</span>
    </div>
  );
};

export default Rating;
