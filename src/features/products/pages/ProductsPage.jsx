import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/productService";
import ProductStats from "../components/ProductStats";
import { Package, Plus, } from "lucide-react";
import ProductList from "../components/ProductList";
import ProductToolbar from "../components/ProductToolbar";
import { ProductSkeletonList } from "../components/ProductSkeleton";
import { useSearchParams } from "react-router-dom";

export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
    const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();


  const fetchProducts = useCallback(async (params = {}) => {
     try {
    setLoading(true);
    setError("");

    const data = await getProducts(params);

    setProducts(data.products || []);
    setTotalProducts(data.totalProducts || 0);
    setCurrentPage(data.currentPage || 1);
    setTotalPages(data.totalPages || 1);

  } catch (err) {
    setError(
      err.response?.data?.message ||
        err.message ||
        "Failed to load products."
    );
  } finally {
    setLoading(false);
  }
  }, []);

function handleSearch(filters) {
  setSearchParams(filters);
}
function handlePageChange(page) {
  setSearchParams((previousParams) => {
    const updatedParams = new URLSearchParams(previousParams);
    updatedParams.set("page", page);
    return updatedParams;
  });
}
useEffect(() => {
  const params = Object.fromEntries(searchParams.entries());

  fetchProducts(params);
}, [searchParams, fetchProducts]);



return (
  <div className="min-h-screen bg-gray-50">
    <div className="flex min-h-screen">

      {/* Sidebar */}
      <aside className="w-[280px] shrink-0 bg-blue-100 p-4 text-blue-900">
        <p className="text-center font-semibold">
          SIDEBAR PLACEHOLDER
        </p>
        <p className="mt-2 text-center text-sm">
          280px wide
        </p>
      </aside>

      {/* Right Section */}
      <div className="flex min-w-0 flex-1 flex-col">

        {/* Header */}
        <header className="flex h-20 shrink-0 items-center justify-center bg-blue-900 text-white">
          <p className="font-semibold">
            HEADER PLACEHOLDER (80px tall)
          </p>
        </header>

        {/* Product Page Content */}
        <main className="min-w-0 flex-1 p-6">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">

            <section className="flex flex-col gap-6">
              <div className="mb-6 w-full rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  {/* Title and subtitle */}
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                      <Package size={26} />
                    </div>

                    <div>
                      <p className="text-base text-gray-500">
                        Product Dashboard
                      </p>

                      <h1 className="mt-1 text-2xl font-bold text-gray-900">
                        Products
                      </h1>
                    </div>
                  </div>

                  {/* Add Product button */}
                  <button
                    type="button"
                    // onClick={handleAddProduct}
                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white transition hover:bg-blue-700"
                  >
                    <Plus
                      size={18}
                      className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
                    />
                    Add Product
                  </button>

                </div>
              </div>

              {/* Product Statistics */}
              <ProductStats
                products={products}
                loading={loading}
              />
            </section>

            <ProductToolbar onSearch={handleSearch} />

            {/* Product Cards */}
            <section>
              {loading ? (
                <ProductSkeletonList />
            
              ) : error ? (
                <p className="rounded-lg bg-red-50 p-4 text-red-600">
                  {error}
                </p>
              ) : products.length === 0 ? (
                <p className="py-10 text-center text-gray-500">
                  No products found.
                </p>
              ) : (
                <>
                <ProductList products={products} />
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:active:scale-100"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600">
                    Page {currentPage} of {totalPages}
                  </span>

                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:active:scale-100"
                  >
                    Next
                 </button>
               </div>
                </>
                
              )}
            </section>

          </div>
        </main>

      </div>
    </div>
  </div>
);

}