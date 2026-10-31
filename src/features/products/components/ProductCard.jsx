import {
  Eye,
  Pencil,
  SquarePen,
  Trash2,
} from "lucide-react";

import ProductImageCarousel from "./ProductImageCarousel";
export default function ProductCard({ product }) {
           const hasDiscount =
                product.discountPrice != null &&
                product.discountPrice > 0 &&
                product.discountPrice < product.price;
    
              return (
                <article
                  key={product._id}
                  className="group flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Product Image */}
                  <ProductImageCarousel product={product} />
       
    
                  <div className="flex flex-1 flex-col p-5">
                    {/* Name and Brand */}
                    <h2 className="text-lg font-semibold text-gray-900">
                      {product.name}
                    </h2>
    
                    <p className="mt-1 text-sm text-gray-500">
                      {product.brand}
                    </p>
    
                    {/* Category */}
                    <p className="mt-2 text-xs text-gray-500">
                      {product.category}
                      {product.subcategory &&
                        ` / ${product.subcategory}`}
                    </p>
    
                    {/* Description */}
                    <p className="mt-3 text-sm text-gray-600">
                      {product.shortDescription}
                    </p>
    
                    {/* Price */}
                    <div className="mt-4 flex items-center gap-2">
                      <span className="text-xl font-bold text-indigo-600">
                        $
                        {Number(
                          hasDiscount
                            ? product.discountPrice
                            : product.price
                        ).toFixed(2)}
                      </span>
    
                      {hasDiscount && (
                        <span className="text-sm text-gray-400 line-through">
                          ${Number(product.price).toFixed(2)}
                        </span>
                      )}
                    </div>
    
        
    
                    {/* Rating */}
                    <p className="mt-2 text-sm text-gray-600">
                      ★ {product.averageRating ?? 0} (
                      {product.numReviews ?? 0} reviews)
                    </p>
    
                    {/* Tags */}
                    <div className="mt-3 flex min-h-[32px] flex-wrap content-start gap-2">
                      {product.tags?.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-gray-100 px-2 py-1 text-xs text-gray-600"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {/* Divider */}
    <div className="mt-auto mb-5 border-t border-gray-200" />
    
    {/* Product actions */}
    <div className="flex items-center gap-2">
      {/* View */}
      <button
        type="button"
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        <Eye size={16} />
        View
      </button>
    
      {/* Edit */}
      <button
        type="button"
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
      >
        <Pencil size={16} />
        Edit
      </button>
    
      {/* Quick Edit */}
      <button
        type="button"
        className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-gray-200 px-2 py-2 text-sm font-medium text-indigo-600 transition hover:bg-indigo-50"
      >
        <SquarePen size={16} />
        Quick Edit
      </button>
    
      {/* Delete — extra spacing before this button */}
      <button
        type="button"
        className="ml-2 inline-flex flex-1 items-center justify-center gap-1.5 rounded-lg border border-red-200 px-2 py-2 text-sm font-medium text-red-600 transition hover:bg-red-50"
      >
        <Trash2 size={16} />
        Delete
      </button>
    </div>
    
                  </div>
                </article>
              );

}