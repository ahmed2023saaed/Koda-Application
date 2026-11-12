import { useEffect, useState, useCallback } from "react";
import { getProducts, deleteProduct, updateProduct } from "../services/productService";
import ProductStats from "../components/ProductStats";
import { Package, Plus, } from "lucide-react";
import ProductList from "../components/ProductList";
import ProductToolbar from "../components/ProductToolbar";
import { ProductSkeletonList } from "../components/ProductSkeleton";
import AdminLoginModal from "../components/AdminLoginModal";
import { getCurrentAdmin } from "../services/authService";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import QuickEditPanel from "../components/QuickEditPanel";
import BrandLoader from "../../../components/ui/BrandLoader";
export default function ProductsPage() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [admin, setAdmin] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [quickEditProduct, setQuickEditProduct] = useState(null);
  const [quickEditImages, setQuickEditImages] = useState([]);
  const [quickEditDeletedImages, setQuickEditDeletedImages] = useState([]);
  const [quickEditSubmitting, setQuickEditSubmitting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function restoreAdminSession() {
      const token = localStorage.getItem("token");

      if (!token) {
        setCheckingAdmin(false);
        return;
      }

      try {
        const user = await getCurrentAdmin();
        setAdmin(user);
      } catch (error) {
        localStorage.removeItem("token");
        setAdmin(null);
      } finally {
        setCheckingAdmin(false);
      }
    }

    restoreAdminSession();
  }, []);


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
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-start justify-center  px-4 pt-24">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-gray-900">
              Confirm Deletion
            </h2>

            <p className="mt-3 text-sm text-gray-600">
              Are you sure you want to delete{" "}
              <span className="font-semibold text-gray-900">
                {productToDelete.name}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
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
      <div className="mx-auto flex max-w-6xl flex-col gap-6">

        <section className="flex flex-col gap-6">

          {loading ? (
            <BrandLoader message="Products Loading..." />
          ) : (
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
                  onClick={() => {
                    if (admin) {
                      navigate("/products/add");
                    } else {
                      setIsLoginOpen(true);
                    }
                  }}
                  disabled={checkingAdmin}
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
          )}


          {/* Product Statistics */}
          <ProductStats
            products={products}
            loading={loading}
          />
        </section>

        <ProductToolbar onSearch={handleSearch} loading={loading} />
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
            <p className="rounded-lg bg-red-50 p-4 text-red-600">
              {error}
            </p>
          ) : products.length === 0 ? (
            <p className="py-10 text-center text-gray-500">
              No products found.
            </p>
          ) : (
            <>
              <ProductList
                products={products}
                onDelete={setProductToDelete}
                onQuickEdit={handleOpenQuickEdit}
              />

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

      <AdminLoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        // onLoginSuccess={(user) => setAdmin(user)}
        onLoginSuccess={(user) => {
          setAdmin(user);
          navigate("/products/add");
        }}
      />
    </>
  );

}