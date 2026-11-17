
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductDetailsHeader({ productName }) {
  return (
    <section className="rounded-4xl border border-white/10 bg-gradient-to-r from-slate-950 to-slate-800 p-6 shadow-sm">

      {/* Back Button */}
      <Link
        to="/products"
        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white/80 transition hover:bg-white/10"
      >
        <span>←</span>
        Back to Products
      </Link>

      {/* Product Details Heading */}
      <div className="mt-6 flex items-center gap-4">

        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/10">
          <Eye
            size={34}
            strokeWidth={1.8}
            className="text-white"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            {productName || "Product Details"}
          </h1>

          <p className="mt-2 text-sm text-white/60">
            Product Details Overview
          </p>
        </div>

      </div>
    </section>
  );
}

