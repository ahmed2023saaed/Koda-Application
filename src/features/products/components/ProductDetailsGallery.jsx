

import { useEffect, useState } from "react";

export default function ProductDetailsGallery({ product }) {
    const images = product.images ?? [];

    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [carouselIndex, setCarouselIndex] = useState(0);

    useEffect(() => {
        if (images.length <= 1) return;

        const intervalId = setInterval(() => {
            setCarouselIndex((previousIndex) =>
                (previousIndex + 1) % images.length
            );
        }, 3000);

        return () => clearInterval(intervalId);
    }, [carouselIndex, images.length]);

    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">

            {/* Main Image Preview */}
            <div>
                {images.length > 0 ? (
                    <div className="h-96 w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800">
                        <img
                            src={images[selectedImageIndex]?.url}
                            alt={`${product.name} - selected image`}
                            className="h-full w-full rounded-2xl object-cover"
                        />
                    </div>
                ) : (
                    <div className="flex h-80 items-center justify-center rounded-xl bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500">
                        No Image Available
                    </div>
                )}
            </div>

            {/* Image Thumbnails */}
            <div>
                {images.length > 0 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                        {images.map((image, index) => (
                            <button
                                key={image.public_id || image.url || index}
                                type="button"
                                onClick={() => setSelectedImageIndex(index)}
                                className={`h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition ${
                                    selectedImageIndex === index
                                        ? "border-blue-600 dark:border-blue-400"
                                        : "border-gray-200 hover:border-gray-400 dark:border-slate-700 dark:hover:border-slate-500"
                                }`}
                            >
                                <img
                                    src={image.url}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Automatic Image Carousel */}
            <div>
                <div className="mt-6 border-t border-gray-200 pt-5 dark:border-slate-700">

                    {images.length > 0 ? (
                        <div className="group relative overflow-hidden rounded-xl">

                            <div className="h-72 w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800">
                                <div
                                    className="flex h-full transition-transform duration-500 ease-in-out"
                                    style={{
                                        transform: `translateX(-${carouselIndex * 100}%)`,
                                    }}
                                >
                                    {images.map((image, index) => (
                                        <div
                                            key={image.public_id || index}
                                            className="h-full min-w-full"
                                        >
                                            <img
                                                src={image.url}
                                                alt={`${product.name} - slideshow image ${index + 1}`}
                                                className="h-full w-full object-cover"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Navigation Buttons */}
                            {images.length > 1 && (
                                <>
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCarouselIndex((previousIndex) =>
                                                previousIndex === 0
                                                    ? images.length - 1
                                                    : previousIndex - 1
                                            )
                                        }
                                        aria-label="Previous slideshow image"
                                        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow transition hover:bg-white dark:bg-slate-900/90 dark:text-gray-100 dark:hover:bg-slate-800"
                                    >
                                        &#10094;
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setCarouselIndex(
                                                (previousIndex) =>
                                                    (previousIndex + 1) % images.length
                                            )
                                        }
                                        aria-label="Next slideshow image"
                                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-gray-800 shadow transition hover:bg-white dark:bg-slate-900/90 dark:text-gray-100 dark:hover:bg-slate-800"
                                    >
                                        &#10095;
                                    </button>
                                </>
                            )}

                            {/* Image Counter */}
                            <span className="absolute bottom-2 right-2 rounded-full bg-black/70 px-2 py-1 text-xs text-white">
                                {carouselIndex + 1} / {images.length}
                            </span>
                        </div>
                    ) : (
                        <div className="flex h-56 items-center justify-center rounded-xl bg-gray-100 text-gray-400 dark:bg-slate-800 dark:text-gray-500">
                            No Images to Display
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

