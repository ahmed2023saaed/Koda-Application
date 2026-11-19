

import { Package2, Star, TrendingUp, Boxes } from "lucide-react";

export default function ProductStats({ products, loading }) {
  const totalItems = products.length;

  const featuredItems = products.filter(
    (product) => product.featured === true
  ).length;

  const inStockItems = products.filter(
    (product) => product.stock > 0
  ).length;

  const outOfStockItems = products.filter(
    (product) => product.stock <= 0
  ).length;

  const stats = [
    {
      label: "Total",
      value: totalItems,
      Icon: Package2,
      iconColor: "text-sky-600 dark:text-gray-400",
      iconBg: "bg-teal-100 dark:bg-slate-800",
    },
    {
      label: "Featured",
      value: featuredItems,
      Icon: Star,
      iconColor: "text-amber-600 dark:text-gray-400",
      iconBg: "bg-amber-100 dark:bg-slate-800",
    },
    {
      label: "In Stock",
      value: inStockItems,
      Icon: TrendingUp,
      iconColor: "text-green-600 dark:text-gray-400",
      iconBg: "bg-green-100 dark:bg-slate-800",
    },
    {
      label: "Out of Stock",
      value: outOfStockItems,
      Icon: Boxes,
      iconColor: "text-red-600 dark:text-gray-400",
      iconBg: "bg-red-100 dark:bg-slate-800",
    },
  ];





  if (loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="mx-1 flex min-h-[150px] flex-col items-start justify-start gap-2 rounded-2xl border border-gray-200 bg-white p-3 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <div className="h-12 w-12 animate-pulse rounded-xl bg-gray-200 dark:bg-slate-700" />

            <div className="h-8 w-16 animate-pulse rounded bg-gray-200 dark:bg-slate-700" />

            <div className="h-3 w-20 animate-pulse rounded bg-gray-100 dark:bg-slate-800" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {stats.map(({ label, value, Icon, iconColor, iconBg }) => (
        <div
          key={label}
          className="mx-0 flex min-h-[135px] flex-col items-start justify-start gap-2 rounded-3xl border border-gray-200 bg-white p-3 text-left shadow-sm sm:mx-1 sm:min-h-[150px] dark:border-slate-700 dark:bg-slate-900"
        >
          {/* Icon */}
          <div className={`rounded-xl p-3 ${iconBg} ${iconColor}`}>
            <Icon size={20} strokeWidth={2} />
          </div>

          {/* Actual Number */}
          <p className="text-xl font-bold text-gray-900 sm:text-2xl dark:text-gray-100">
            {value}
          </p>

          {/* Label */}
          <p className="text-xs font-medium text-gray-500 sm:text-sm dark:text-gray-400">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

