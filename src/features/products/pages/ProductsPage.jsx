import { useEffect, useState, useCallback } from "react";
import { getProducts, deleteProduct, updateProduct } from "../services/productService";
import ProductStats from "../components/ProductStats";
import { Plus, Package2 } from "lucide-react";
import ProductList from "../components/ProductList";
import ProductToolbar from "../components/ProductToolbar";
import { ProductSkeletonList } from "../components/ProductSkeleton";

import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QuickEditPanel from "../components/QuickEditPanel";
import BrandLoader from "../../../components/ui/BrandLoader";
import { useAuth } from "@/features/auth/contexts/authContext";
export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const [productToDelete, setProductToDelete] = useState(null);

  const [quickEditProduct, setQuickEditProduct] = useState(null);
  const [quickEditImages, setQuickEditImages] = useState([]);
  const [quickEditDeletedImages, setQuickEditDeletedImages] = useState([]);
  const [quickEditSubmitting, setQuickEditSubmitting] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";




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

  async function handleConfirmDelete() {
    if (!isAdmin) {
      toast.error("Admin account access only.");
      return;
    }
    if (!productToDelete) return;

    try {
      await deleteProduct(productToDelete._id);

      setProducts((prev) =>
        prev.filter((product) => product._id !== productToDelete._id)
      );

      setTotalProducts((prev) => Math.max(0, prev - 1));

      toast.success("Product has been deleted.");

      setProductToDelete(null);
    } catch (error) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        toast.error("Admin accounts only can delete products.");
        setProductToDelete(null);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to delete product."
        );
      }
    }
  }

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

  function handleOpenQuickEdit(product) {
    setQuickEditProduct(product);

    setQuickEditImages(product.images || []);

    setQuickEditDeletedImages([]);
  }

  function handleQuickEditImageUpload(event) {
    const files = Array.from(event.target.files);

    setQuickEditImages((prevImages) => {
      const remainingSlots = 5 - prevImages.length;
      const selectedFiles = files.slice(0, remainingSlots);

      const newImages = selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }));

      return [...prevImages, ...newImages];
    });

    event.target.value = "";
  }

  function handleQuickEditRemoveImage(index) {
    const imageToRemove = quickEditImages[index];

    if (!imageToRemove) return;

    if (imageToRemove.public_id) {
      setQuickEditDeletedImages((prev) => [
        ...prev,
        imageToRemove.public_id,
      ]);
    }

    if (imageToRemove.preview) {
      URL.revokeObjectURL(imageToRemove.preview);
    }

    setQuickEditImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );
  }

  async function handleQuickEditSubmit(values) {
    if (!isAdmin) {
      toast.error("Admin account access only.");
      return;
    }
    if (!quickEditProduct) return;

    if (quickEditImages.length === 0) {
      toast.error("Please upload at least one product image.");
      return;
    }

    const price = Number(values.price);
    const discountPrice = Number(values.discountPrice);

    if (
      values.discountPrice &&
      discountPrice >= price
    ) {
      toast.error("Discount price must be lower than the original price.");
      return;
    }

    try {
      setQuickEditSubmitting(true);

      const formData = new FormData();

      formData.append("name", values.name);
      formData.append("shortDescription", values.shortDescription);
      formData.append("description", values.description);
      formData.append("price", values.price);
      formData.append("discountPrice", values.discountPrice || "");
      formData.append("stock", values.stock);
      formData.append("sku", values.sku || "");
      formData.append("category", values.category);
      formData.append("subcategory", values.subcategory || "");
      formData.append("brand", values.brand || "");

      values.tags.forEach((tag) => {
        formData.append("tags[]", tag);
      });

      formData.append("featured", values.featured);
      formData.append("isActive", values.isActive);

      formData.append(
        "deletedImages",
        JSON.stringify(quickEditDeletedImages)
      );

      quickEditImages.forEach((image) => {
        if (image.file) {
          formData.append("images", image.file);
        }
      });

      await updateProduct(quickEditProduct._id, formData);

      toast.success("Product updated successfully.");

      setQuickEditProduct(null);

      const params = Object.fromEntries(searchParams.entries());
      await fetchProducts(params);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to update product."
      );
    } finally {
      setQuickEditSubmitting(false);
    }
  }

  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    fetchProducts(params);
  }, [searchParams, fetchProducts]);


  return (
    <>
      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/40 px-4 pt-24">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl dark:border dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              Confirm Deletion
            </h2>

            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {productToDelete.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-800"
              >
                No
              </button>

              <button
                type="button"
                onClick={handleConfirmDelete}
                className="rounded-lg bg-red-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Full-page Background */}
      <div className="-m-4 min-h-full bg-slate-50 p-4 md:-m-6 md:p-6 dark:bg-slate-950">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">

          <section className="flex flex-col gap-6">

            {loading ? (
              <BrandLoader message="Products Loading..." />
            ) : (
              /* Gradient Introduction Card */
              <div className="mb-6 flex min-h-[160px] w-full items-center rounded-2xl bg-gradient-to-r from-sky-400 via-blue-600 to-blue-900 p-7 shadow-md dark:bg-none dark:bg-slate-900 dark:border dark:border-slate-700 dark:shadow-sm">

                <div className="flex w-full flex-col items-center justify-center gap-5 sm:flex-row sm:justify-between">

                  {/* Title and subtitle */}
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white/20 text-white dark:bg-slate-800 dark:text-blue-400">
                      <Package2 size={32} />
                    </div>

                    <div>
                      <p className="text-lg font-medium text-blue-50 dark:text-gray-400">
                        Product Dashboard
                      </p>

                      <h1 className="mt-1 text-3xl font-bold text-white dark:text-gray-100">
                        Products
                      </h1>
                    </div>
                  </div>

                  {/* Add Product button */}
                  <button
                    type="button"
                    onClick={() => navigate("/products/add")}
                    className="group inline-flex items-center justify-center gap-2 rounded-xl border border-white/80 bg-transparent px-5 py-3 text-base font-semibold text-white shadow-none transition-all duration-300 hover:border-white hover:bg-white/15 dark:border-sky-400 dark:text-sky-300 dark:hover:border-sky-300 dark:hover:bg-slate-800 dark:hover:text-sky-200"

                  >
                    <Plus
                      size={20}
                      className="transition-transform duration-300 ease-in-out group-hover:rotate-180"
                    />
                    Add Product
                  </button>

                </div>
              </div>
            )}

            {/* Product Statistics */}
            <ProductStats
              products={products}
              loading={loading}
            />

          </section>

          {/* Product Toolbar */}
          <ProductToolbar
            onSearch={handleSearch}
            loading={loading}
          />

          {/* Quick Edit */}
          {quickEditProduct && (
            <QuickEditPanel
              product={quickEditProduct}
              onClose={() => setQuickEditProduct(null)}
              images={quickEditImages}
              onImageUpload={handleQuickEditImageUpload}
              onRemoveImage={handleQuickEditRemoveImage}
              onSubmit={handleQuickEditSubmit}
              isSubmitting={quickEditSubmitting}
            />
          )}

          {/* Product Cards */}
          <section>
            {loading ? (
              <ProductSkeletonList />
            ) : error ? (
              <p className="rounded-lg bg-red-50 p-4 text-red-600 dark:bg-red-950/40 dark:text-red-400">
                {error}
              </p>
            ) : products.length === 0 ? (
              <p className="py-10 text-center text-gray-500 dark:text-gray-400">
                No products found.
              </p>
            ) : (
              <>
                <ProductList
                  products={products}
                  onDelete={setProductToDelete}
                  onQuickEdit={handleOpenQuickEdit}
                />

                {/* Pagination */}
                <div className="mt-8 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="rounded-lg bg-blue-600 px-5 py-2.5 font-medium text-white shadow-sm transition-all duration-200 hover:bg-blue-700 hover:shadow-md active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none disabled:active:scale-100"
                  >
                    Previous
                  </button>

                  <span className="text-sm text-gray-600 dark:text-gray-300">
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
      </div>
    </>
  );

}