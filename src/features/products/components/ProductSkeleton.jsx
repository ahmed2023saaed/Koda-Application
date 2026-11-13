
export default function ProductSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm animate-pulse">

      {/* Image placeholder */}
      <div className="h-52 w-full bg-gray-200" />

      <div className="p-5">

        {/* Product name */}
        <div className="h-5 w-3/4 rounded bg-gray-200" />

        {/* Brand */}
        <div className="mt-3 h-4 w-1/2 rounded bg-gray-200" />

        {/* Category */}
        <div className="mt-4 h-3 w-2/5 rounded bg-gray-200" />

        {/* Description */}
        <div className="mt-5 space-y-2">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-4/5 rounded bg-gray-200" />
        </div>

        {/* Price */}
        <div className="mt-5 h-6 w-1/3 rounded bg-gray-200" />

        {/* Rating */}
        <div className="mt-4 h-4 w-2/3 rounded bg-gray-200" />

        {/* Tags */}
        <div className="mt-4 flex gap-2">
          <div className="h-6 w-16 rounded-full bg-gray-200" />
          <div className="h-6 w-20 rounded-full bg-gray-200" />
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-gray-200" />

        {/* Buttons */}
        <div className="flex gap-2">
          <div className="h-9 flex-1 rounded-lg bg-gray-200" />
          <div className="h-9 flex-1 rounded-lg bg-gray-200" />
          <div className="h-9 flex-1 rounded-lg bg-gray-200" />
        </div>

      </div>
    </article>
  );
}
export function ProductSkeletonList() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <ProductSkeleton key={index} />
      ))}
    </div>
  );
}