

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ProductForm from "../components/ProductForm";
import ProductPageHeader from "../components/ProductPageHeader";
import ProductGallery from "../components/ProductGallery";
import { createProduct } from "../services/productService";
import { useAuth } from "@/features/auth/contexts/authContext";

export default function AddProductPage() {
    const navigate = useNavigate();

    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { user } = useAuth();

    const isAdmin = user?.role === "admin";

    const handleImageUpload = (event) => {
        const selectedFiles = Array.from(event.target.files);
        const remainingSlots = 5 - images.length;

        const validFiles = selectedFiles
            .filter((file) => file.type.startsWith("image/"))
            .slice(0, remainingSlots);

        const newImages = validFiles.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));

        setImages((prevImages) => [...prevImages, ...newImages]);
        event.target.value = "";
    };

    const handleRemoveImage = (index) => {
        setImages((prevImages) => {
            const imageToRemove = prevImages[index];

            URL.revokeObjectURL(imageToRemove.preview);

            return prevImages.filter((_, i) => i !== index);
        });
    };

    const handleCreateProduct = async (values) => {
        if (!isAdmin) {
            toast.error("Admin account access only.");
            return;
        }
        if (images.length === 0) {
            setError("Please upload at least one product image.");
            return;
        }

        setError("");
        setIsSubmitting(true);

        try {
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
            // formData.append("tags", JSON.stringify(values.tags));
            values.tags.forEach((tag) => {
                formData.append("tags[]", tag);
            });
            formData.append("featured", String(values.featured));
            formData.append("isActive", String(values.isActive));

            images.forEach((image) => {
                formData.append("images", image.file);
            });

            await createProduct(formData);
            toast.success("Product has been created.");

            navigate("/products");
        } catch (error) {
            setError(
                error.response?.data?.message ||
                "Something went wrong while creating the product."
            );
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mx-auto max-w-6xl space-y-6">
            <ProductPageHeader />

            {error && (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
                <ProductGallery
                    images={images}
                    onImageUpload={handleImageUpload}
                    onRemoveImage={handleRemoveImage}
                />

                <ProductForm
                    onSubmit={handleCreateProduct}
                    isSubmitting={isSubmitting}
                    submitLabel={isSubmitting ? "Creating..." : "Create Product"}
                />
            </div>
        </div>
    );
}
