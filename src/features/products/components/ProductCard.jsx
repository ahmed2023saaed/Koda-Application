

import {
  Eye,
  Pencil,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductImageCarousel from "./ProductImageCarousel";

export default function ProductCard({ product, onDelete, onQuickEdit }) {
  const navigate = useNavigate();

  const hasDiscount =
    product.discountPrice != null &&
    product.discountPrice > 0 &&
    product.discountPrice < product.price;

  const getDisplayValue = (value) =>
    typeof value === "string" ? value : value?.name || "";

  const categoryDetails = [
    getDisplayValue(product.category),
    getDisplayValue(product.subcategory),
    getDisplayValue(product.brand),
  ].filter(Boolean);

  return (
    <article
      key={product._id}
      className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900 dark:hover:shadow-slate-950/40"
    >
      {/* Product Image */}
      <ProductImageCarousel product={product} />

      <div className="flex flex-1 flex-col p-5">

        {/* Product Name */}
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {product.name}
        </h2>

        {/* Category · Subcategory · Brand */}
        <div className="mt-2 flex flex-wrap items-center text-xs text-gray-500 dark:text-gray-400">
          {categoryDetails.map((item, index) => (
            <span key={index}>
              {index > 0 && (
                <span className="mx-2 text-gray-300 dark:text-slate-600">
                  •
                </span>
              )}
              {item}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
          {product.shortDescription}
        </p>

        {/* Price */}
        <div className="mt-4 flex items-center gap-2">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            $
            {Number(
              hasDiscount
                ? product.discountPrice
                : product.price
            ).toFixed(2)}
          </span>

          {hasDiscount && (
            <span className="text-sm text-gray-400 line-through dark:text-gray-500">
              ${Number(product.price).toFixed(2)}
            </span>
          )}
        </div>

        {/* Rating */}
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          ★ {product.averageRating ?? 0} (
          {product.numReviews ?? 0} reviews)
        </p>

        {/* Tags */}
        <div className="mt-3 flex min-h-[32px] flex-wrap content-start gap-2">
          {product.tags?.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-slate-800 dark:text-gray-300"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-auto mb-5 border-t border-gray-200 dark:border-slate-700" />

        {/* Product Actions */}
        <div className="flex items-center gap-2">

          {/* View */}
          <button
            type="button"
            onClick={() => navigate(`/products/view/${product._id}`)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-sky-200 hover:bg-sky-50 hover:text-sky-700 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:border-sky-700 dark:hover:bg-sky-950/40 dark:hover:text-sky-300"
          >
            <Eye size={16} />
            View
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() => navigate(`/products/edit/${product._id}`)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:border-amber-700 dark:hover:bg-amber-950/40 dark:hover:text-amber-300"
          >
            <Pencil size={16} />
            Edit
          </button>

          {/* Quick Edit */}
          <button
            type="button"
            onClick={() => onQuickEdit(product)}
            className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 bg-gray-100 px-2 py-2 text-sm font-medium text-gray-700 transition-all duration-300 hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700 dark:border-slate-700 dark:bg-slate-800 dark:text-gray-300 dark:hover:border-indigo-700 dark:hover:bg-indigo-950/40 dark:hover:text-indigo-300"
          >
            <SlidersHorizontal size={16} />
            Quick Edit
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(product)}
            className="ml-2 inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-transparent px-2 py-2 text-sm font-medium text-red-700 transition-all duration-300 hover:border-red-300 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:border-red-600 dark:hover:bg-red-950/40"
          >
            <Trash2 size={16} />
            Delete
          </button>

        </div>
      </div>
    </article>
  );
}
