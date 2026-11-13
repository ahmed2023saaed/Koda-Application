import ProductForm from "../components/ProductForm";
import ProductPageHeader from "../components/ProductPageHeader";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import ProductGallery from "../components/ProductGallery";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { updateProduct } from "../services/productService";
import BrandLoader from "../../../components/ui/BrandLoader";
import { useAuth } from "@/features/auth/contexts/authContext";
export default function EditProductPage() {
    const { id } = useParams();
    const [images, setImages] = useState([]);
    const [deletedImages, setDeletedImages] = useState([]);
    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();

    const isAdmin = user?.role === "admin";

    const handleUpdateProduct = async (values) => {
        if (!isAdmin) {
            toast.error("Admin account access only.");
            return;
        }
        if (images.length === 0) {
            toast.error("Please keep at least one product image.");
            return;
        }
        if (
            values.discountPrice &&
            Number(values.discountPrice) >= Number(values.price)
        ) {
            toast.error("Discount price must be lower than the original price.");
            return;
        }

        try {
            setIsSubmitting(true);

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

            formData.append("featured", String(values.featured));
            formData.append("isActive", String(values.isActive));

            // Send deleted image IDs as a JSON array string.
            if (deletedImages.length > 0) {
                formData.append(
                    "deletedImages",
                    JSON.stringify(deletedImages)
                );
            }

            // Upload only newly selected images.
            images.forEach((image) => {
                if (image.file) {
                    formData.append("images", image.file);
                }
            });

            await updateProduct(id, formData);

            toast.success("Product has been updated.");
            navigate("/products");
        } catch (error) {
            toast.error(
                error.response?.data?.message || "Failed to update product."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);

        const remainingSlots = 5 - images.length;

        const newImages = files
            .filter((file) => file.type.startsWith("image/"))
            .slice(0, remainingSlots)
            .map((file) => ({
                file,
                preview: URL.createObjectURL(file),
            }));

        setImages((prev) => [...prev, ...newImages]);

        event.target.value = "";
    };
    const handleRemoveImage = (index) => {
        const imageToRemove = images[index];

        if (imageToRemove.public_id) {
            setDeletedImages((prev) => [
                ...prev,
                imageToRemove.public_id,
            ]);
        }

        if (imageToRemove.preview) {
            URL.revokeObjectURL(imageToRemove.preview);
        }

        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        async function fetchProduct() {
            try {
                setIsLoading(true);
                setError("");

                const response = await getProductById(id);
                setProduct(response.product);
                setImages(response.product.images ?? []);
            } catch (error) {
                setError(
                    error.response?.data?.message ||
                    "Failed to load product."
                );
            } finally {
                setIsLoading(false);
            }
        }

        fetchProduct();
    }, [id]);


    if (isLoading) {
        return (
            <div className="space-y-6">

                {/* Branded Koda Loader */}
                <BrandLoader message="Loading Product Details..." />

                {/* Introduction skeleton */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 animate-pulse">
                    <div className="h-3 w-28 rounded bg-gray-200"></div>
                    <div className="h-8 w-64 max-w-full rounded bg-gray-200"></div>
                    <div className="h-4 w-full max-w-xl rounded bg-gray-200"></div>
                    <div className="h-4 w-48 rounded bg-gray-200"></div>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                    {/* Gallery skeleton */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-4 animate-pulse">
                        <div className="h-6 w-40 rounded bg-gray-200"></div>
                        <div className="aspect-square w-full rounded-xl bg-gray-200"></div>
                        <div className="flex gap-3">
                            <div className="h-20 w-20 rounded-lg bg-gray-200"></div>
                            <div className="h-20 w-20 rounded-lg bg-gray-200"></div>
                            <div className="h-20 w-20 rounded-lg bg-gray-200"></div>
                        </div>
                    </div>

                    {/* Product form skeleton */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-6 space-y-5 animate-pulse">
                        <div className="h-6 w-40 rounded bg-gray-200"></div>

                        {Array.from({ length: 6 }).map((_, index) => (
                            <div key={index} className="space-y-2">
                                <div className="h-4 w-28 rounded bg-gray-200"></div>
                                <div className="h-11 w-full rounded-lg bg-gray-200"></div>
                            </div>
                        ))}

                        <div className="h-11 w-full rounded-lg bg-gray-200"></div>
                    </div>

                </div>
            </div>
        );
    }




    if (error) {
        return <p className="text-red-600">{error}</p>;
    }

    if (!product) {
        return <p>Product not found.</p>;
    }

    return (
        <div className="space-y-6">
            <ProductPageHeader
                eyebrow="EDIT PRODUCT"
                title="Update your product details"
                description="Modify product information, manage images, and keep your catalog up to date."
                status="EDITING"
                statusDescription="Review your changes before saving."
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Product gallery */}
                <div>
                    <ProductGallery
                        images={images}
                        onImageUpload={handleImageUpload}
                        onRemoveImage={handleRemoveImage}
                    />
                </div>
                {/* Product form */}
                <div>
                    <ProductForm
                        key={product._id}
                        initialValues={product}
                        submitLabel="Save Changes"
                        onSubmit={handleUpdateProduct}
                        isSubmitting={isSubmitting}
                    />
                </div>
            </div>


        </div>
    );
}
