

import { Tag, FolderTree, Star } from "lucide-react";

export default function ProductDetailsInfo({ product }) {
    return (
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

            {/* Overview */}
            <div className="mb-6 rounded-xl bg-gray-50 p-5 dark:bg-slate-800">
                <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Overview
                </p>

                <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100">
                    {product.name || "N/A"}
                </h3>

                <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {product.description || "No description available."}
                </p>
            </div>

            {/* Pricing */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Price
                    </p>

                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {product.price != null
                            ? `$${Number(product.price).toFixed(2)}`
                            : "N/A"}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Discount Price
                    </p>

                    <p className="text-xl font-bold text-green-600 dark:text-green-400">
                        {product.discountPrice != null
                            ? `$${Number(product.discountPrice).toFixed(2)}`
                            : "—"}
                    </p>
                </div>
            </div>

            {/* Inventory */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        Stock
                    </p>

                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {product.stock ?? "N/A"}
                    </p>
                </div>

                <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                    <p className="mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                        SKU
                    </p>

                    <p className="text-xl font-bold text-gray-900 dark:text-gray-100">
                        {product.sku || "N/A"}
                    </p>
                </div>
            </div>

            {/* Tags */}
            <div className="mb-6 rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                <div className="mb-4 flex items-center gap-2">
                    <Tag size={20} className="text-blue-600 dark:text-blue-400" />

                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Tags
                    </h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {product.tags?.length > 0 ? (
                        product.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="rounded-full bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 dark:bg-blue-950/50 dark:text-blue-300"
                            >
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-400 dark:text-gray-500">
                            No tags available
                        </span>
                    )}
                </div>
            </div>

            {/* Category Info */}
            <div className="mb-6 rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                <div className="mb-4 flex items-center gap-2">
                    <FolderTree size={20} className="text-blue-600 dark:text-blue-400" />

                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Category Info
                    </h3>
                </div>

                <div className="flex flex-wrap items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                    {[
                        product.category?.name || product.category,
                        product.subcategory?.name || product.subcategory,
                        product.brand?.name || product.brand,
                    ]
                        .filter(Boolean)
                        .map((item, index) => (
                            <span key={index} className="flex items-center gap-2">
                                {index > 0 && (
                                    <span className="text-gray-400 dark:text-gray-600">
                                        /
                                    </span>
                                )}
                                {item}
                            </span>
                        ))}
                </div>
            </div>

            {/* Highlights */}
            <div className="rounded-xl border border-gray-200 p-4 dark:border-slate-700">
                <div className="mb-4 flex items-center gap-2">
                    <Star size={20} className="text-yellow-500" />

                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        Highlights
                    </h3>
                </div>

                <p className="text-sm leading-7 text-gray-600 dark:text-gray-400">
                    {product.shortDescription || "No highlights available."}
                </p>
            </div>

        </div>
    );
}
