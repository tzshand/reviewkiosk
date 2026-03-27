"use client";

import { useState } from "react";

interface StarRatingProps {
  onRate: (rating: number) => void;
}

export function StarRating({ onRate }: StarRatingProps) {
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedStar, setSelectedStar] = useState(0);

  const handleTap = (star: number) => {
    setSelectedStar(star);
    setTimeout(() => onRate(star), 300);
  };

  return (
    <div className="flex gap-8 justify-center">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onPointerEnter={() => setHoveredStar(star)}
          onPointerLeave={() => setHoveredStar(0)}
          onClick={() => handleTap(star)}
          className={`transition-transform duration-150 ${
            selectedStar === star ? "star-pop" : ""
          }`}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <svg
            width="96"
            height="96"
            viewBox="0 0 24 24"
            fill={star <= (hoveredStar || selectedStar) ? "var(--color-kiosk-star)" : "var(--color-kiosk-star-empty)"}
            className="transition-colors duration-150 drop-shadow-md"
          >
            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
