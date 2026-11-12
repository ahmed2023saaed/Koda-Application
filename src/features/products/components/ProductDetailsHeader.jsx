
import { Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductDetailsHeader({ productName }) {
  return (
    <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <Link
        to="/products"
        className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
      >
        <span>←</span>
        Back to Products
      </Link>

      <div className="mt-6 flex items-center gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <Package
            size={34}
            strokeWidth={1.8}
            className="text-blue-600"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            {productName || "Product Details"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Product Details Overview
          </p>
        </div>
      </div>
    </section>
  );
}
