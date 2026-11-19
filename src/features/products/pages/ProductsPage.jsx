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

  // const [productToDelete, setProductToDelete] = useState(null);

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


  async function handleConfirmDelete(product) {
    if (!isAdmin) {
      toast.error("Admin account access only.");
      return;
    }

    if (!product) return;

    // Native browser confirmation
    const confirmed = window.confirm(
      `Are you sure you want to delete "${product.name}"? This action cannot be undone.`
    );

    // Stop if the user clicks Cancel
    if (!confirmed) return;

    try {
      await deleteProduct(product._id);

      setProducts((prev) =>
        prev.filter((item) => item._id !== product._id)
      );

      setTotalProducts((prev) => Math.max(0, prev - 1));

      toast.success("Product has been deleted.");

    } catch (error) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        toast.error("Admin accounts only can delete products.");
      } else {
        toast.error(
          error.response?.data?.message || "Failed to delete product."
        );
      }
    }
  }


  // async function handleConfirmDelete() {
  //   if (!isAdmin) {
  //     toast.error("Admin account access only.");
  //     return;
  //   }
  //   if (!productToDelete) return;

  //   try {
  //     await deleteProduct(productToDelete._id);

  //     setProducts((prev) =>
  //       prev.filter((product) => product._id !== productToDelete._id)
  //     );

  //     setTotalProducts((prev) => Math.max(0, prev - 1));

  //     toast.success("Product has been deleted.");

  //     setProductToDelete(null);
  //   } catch (error) {
  //     const status = error.response?.status;

  //     if (status === 401 || status === 403) {
  //       toast.error("Admin accounts only can delete products.");
  //       setProductToDelete(null);
  //     } else {
  //       toast.error(
  //         error.response?.data?.message || "Failed to delete product."
  //       );
  //     }
  //   }
  // }

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

      {/* Full-page Background */}
      <div className="-m-4 min-h-full bg-slate-50 py-4 pl-6 pr-4 dark:bg-slate-950 md:-m-6 md:py-6 md:pl-10 md:pr-6">
        <div className="mx-auto flex w-full max-w-5xl flex-col gap-7">

          <section className="flex flex-col gap-7">

            {loading ? (
              <BrandLoader message="Products Loading..." />
            ) : (
              <div className="relative mx-1 flex min-h-[130px] items-center overflow-hidden rounded-3xl border border-cyan-100 bg-gradient-to-br from-white via-cyan-50/60 to-white px-7 py-5 shadow-sm dark:border-slate-800 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-slate-950 dark:shadow-none">

                {/* Top-right cyan glow */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-cyan-200/50 blur-3xl dark:bg-cyan-500/10" />

                {/* Bottom-left violet glow */}
                <div className="pointer-events-none absolute -bottom-12 left-8 h-44 w-44 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-500/10" />

                <div className="relative z-10 flex w-full flex-col items-stretch gap-5 xl:flex-row xl:items-center xl:justify-between">

                  {/* Title and subtitle */}
                  <div className="relative z-10 flex items-center gap-4">

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-teal-100 text-sky-700 dark:bg-slate-800 dark:text-cyan-300">
                      <Package2 size={36} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-sm font-medium tracking-widest text-blue-900 sm:text-lg dark:text-cyan-300">
                        PRODUCT DASHBOARD
                      </p>

                      <h1 className="mt-1 text-3xl font-bold text-black sm:text-4xl dark:text-white">
                        Products
                      </h1>
                    </div>

                  </div>

                  {/* Add Product button */}
                  <button
                    type="button"
                    onClick={() => navigate("/products/add")}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-cyan-300 bg-cyan-500 px-5 py-3 text-base font-bold tracking-wide text-white shadow-md shadow-cyan-200 transition-all duration-300 hover:bg-cyan-400 hover:shadow-cyan-300 dark:border-cyan-500/30 dark:bg-cyan-500/10 dark:text-cyan-300 dark:shadow-none dark:hover:border-cyan-400/50 dark:hover:bg-cyan-500/20 dark:hover:text-cyan-200 xl:w-auto"
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
                  onDelete={handleConfirmDelete}
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