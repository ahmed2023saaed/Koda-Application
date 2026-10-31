
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



  return (
     <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
    {/* Total Items */}
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm text-gray-500">Total Items</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {loading ? "—" : totalItems}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          On this page
        </p>
      </div>
      <div className="rounded-lg bg-indigo-50 p-3 text-indigo-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21 8-9-5-9 5 9 5 9-5Z" />
          <path d="m3 8 9 5 9-5" />
          <path d="M3 8v8l9 5 9-5V8" />
          <path d="M12 13v8" />
        </svg>
      </div>
    </div>

    {/* Featured Products */}
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm text-gray-500">Featured</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {loading ? "—" : featuredItems}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Featured products
        </p>
      </div>
      <div className="rounded-lg bg-amber-50 p-3 text-amber-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z" />
        </svg>
      </div>
    </div>

    {/* In Stock */}
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm text-gray-500">In Stock</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {loading ? "—" : inStockItems}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Available products
        </p>
      </div>
      <div className="rounded-lg bg-green-50 p-3 text-green-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7h18v13H3z" />
          <path d="M3 7l2-4h14l2 4" />
          <path d="m9 14 2 2 4-4" />
        </svg>
      </div>
    </div>

    {/* Out of Stock */}
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div>
        <p className="text-sm text-gray-500">Out of Stock</p>
        <p className="mt-2 text-2xl font-bold text-gray-900">
          {loading ? "—" : outOfStockItems}
        </p>
        <p className="mt-1 text-xs text-gray-400">
          Unavailable products
        </p>
      </div>
      <div className="rounded-lg bg-red-50 p-3 text-red-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3 7h18v13H3z" />
          <path d="M3 7l2-4h14l2 4" />
          <path d="m10 12 4 4m0-4-4 4" />
        </svg>
      </div>
    </div>
  </div>

  );
}
