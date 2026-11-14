

import { ImagePlus, X } from "lucide-react";

export default function ProductGallery({
    images,
    onImageUpload,
    onRemoveImage,
}) {
    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

            {/* Gallery Heading */}
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50">
                    <ImagePlus
                        size={30}
                        strokeWidth={1.8}
                        className="text-blue-600 dark:text-blue-400"
                    />
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                        Gallery
                    </h2>

                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Upload images and previews instantly.
                    </p>
                </div>
            </div>

            {/* Image Previews */}
            <div className="mt-6 grid grid-cols-3 gap-3">
                {images.length === 0 ? (
                    <div className="flex aspect-square flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 dark:border-slate-600 dark:bg-slate-800">
                        <ImagePlus
                            size={32}
                            strokeWidth={1.7}
                            className="text-gray-400 dark:text-gray-500"
                        />

                        <p className="mt-2 text-xs text-gray-400 dark:text-gray-500">
                            Image preview
                        </p>
                    </div>
                ) : (
                    images.map((image, index) => (
                        <div
                            key={image.public_id || image.preview || image.url || index}
                            className="min-w-0"
                        >
                            <div className="group relative aspect-square overflow-hidden rounded-xl border border-gray-200 dark:border-slate-700">
                                <img
                                    src={image.preview || image.url}
                                    alt={`Product image ${index + 1}`}
                                    className="h-full w-full object-cover"
                                />

                                <button
                                    type="button"
                                    onClick={() => onRemoveImage(index)}
                                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-gray-700 shadow-md transition hover:bg-red-50 hover:text-red-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-red-950/60 dark:hover:text-red-400"
                                    aria-label={`Remove image ${index + 1}`}
                                >
                                    <X size={17} />
                                </button>
                            </div>

                            <p className="mt-2 text-center text-xs font-medium text-gray-500 dark:text-gray-400">
                                Image {index + 1}
                            </p>
                        </div>
                    ))
                )}
            </div>

            {/* Upload Area */}
            <label
                className={`mt-6 flex min-h-48 flex-col items-center justify-center rounded-xl border-2 border-dashed px-4 py-8 text-center transition ${
                    images.length >= 5
                        ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-60 dark:border-slate-700 dark:bg-slate-800"
                        : "cursor-pointer border-gray-300 bg-gray-50 hover:border-blue-400 hover:bg-blue-50/40 dark:border-slate-600 dark:bg-slate-800/50 dark:hover:border-blue-500 dark:hover:bg-blue-950/30"
                }`}
            >
                <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    multiple
                    disabled={images.length >= 5}
                    onChange={onImageUpload}
                    className="hidden"
                />

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-950/50">
                    <ImagePlus
                        size={38}
                        strokeWidth={1.7}
                        className="text-blue-600 dark:text-blue-400"
                    />
                </div>

                <p className="mt-3 font-semibold text-gray-800 dark:text-gray-100">
                    {images.length >= 5
                        ? "Maximum images reached"
                        : "Upload images"}
                </p>

                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG, JPEG, WEBP
                </p>

                <p className="mt-1 text-xs text-gray-400 dark:text-gray-500">
                    {images.length}/5 images uploaded
                </p>
            </label>

        </section>
    );
}
