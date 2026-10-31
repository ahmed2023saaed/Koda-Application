

import { useEffect, useState } from "react";

export default function ProductImageCarousel({ product }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = product.images ?? [];

  // Automatically change the image every 3 seconds.
  useEffect(() => {
    if (images.length <= 1) return;

    const intervalId = setInterval(() => {
      setCurrentIndex((previousIndex) =>
        (previousIndex + 1) % images.length
      );
    }, 3000);

    // Clean up the timer when the component is removed.
    return () => clearInterval(intervalId);
  }, [currentIndex,images.length]);

  const showPrevious = () => {
    setCurrentIndex((previousIndex) =>
      previousIndex === 0
        ? images.length - 1
        : previousIndex - 1
    );
  };

  const showNext = () => {
    setCurrentIndex(
      (previousIndex) => (previousIndex + 1) % images.length
    );
  };

  if (images.length === 0) {
    return (
      <div className="mb-4 flex h-40 items-center justify-center rounded-lg bg-gray-100 text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <div className="group relative mb-4 overflow-hidden rounded-lg">
      {/* Stock status badge */}
<span
  className={`absolute right-3 bottom-3 z-10 rounded-full px-3 py-1 text-xs font-semibold ${
    Number(product.stock) > 0
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700"
  }`}
>
  {Number(product.stock) > 0 ? "In Stock" : "Out of Stock"}
</span>
{/* Featured status badge */}
{product.featured === true && (
  <span className="absolute left-3 top-3 z-10 rounded-full bg-yellow-100 px-3 py-1 text-xs font-semibold text-yellow-700">
    Featured
  </span>
)}
      {/* Sliding image track */}
      <div
        className="flex transition-transform duration-500 ease-in-out motion-reduce:transition-none"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((image, index) => (
          <div
            key={image.public_id || image.url || index}
            className="w-full flex-shrink-0"
          >
            {index === currentIndex && (
                <img
              src={image.url}
              alt={`${product.name || "Product"} - image ${index + 1}`}
               loading="lazy"
               decoding="async"
              className="h-56 w-full bg-gray-100 object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            )}
          
          </div>
        ))}
      </div>

      {/* Manual navigation buttons */}
      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label="Previous image"
            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow hover:bg-white"
          >
            &#10094;
          </button>

          <button
            type="button"
            onClick={showNext}
            aria-label="Next image"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow hover:bg-white"
          >
            &#10095;
          </button>

          {/* Image counter */}
          <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
            {currentIndex + 1} / {images.length}
          </span>
        </>
      )}
    </div>
  );
}


