

import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductDetailsHeader({ productName }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-800"
      >
        <span>←</span>
        Back to Products
      </Link>

      {/* Product Details Heading */}
      <div className="mt-6 flex items-center gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50">
          <Eye
            size={34}
            strokeWidth={1.8}
            className="text-blue-600 dark:text-blue-400"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">
            {productName || "Product Details"}
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Product Details Overview
          </p>
        </div>

      </div>
    </section>
  );
}

