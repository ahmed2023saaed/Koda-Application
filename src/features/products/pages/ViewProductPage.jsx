
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import ProductDetailsHeader from "../components/ProductDetailsHeader";
import ProductDetailsGallery from "../components/ProductDetailsGallery";
import ProductDetailsInfo from "../components/ProductDetailsInfo";
import ProductDetailsSkeleton from "../components/ProductDetailsSkeleton";
import BrandLoader from "../../../components/ui/BrandLoader";

export default function ViewProductPage() {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchProduct() {
            try {
                setIsLoading(true);
                setError("");

                const response = await getProductById(id);
                setProduct(response.product);
            } catch (error) {
                setError(
                    error.response?.data?.message || "Failed to load product."
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
                <BrandLoader message="Loading Product..." />
                <ProductDetailsSkeleton />
            </div>
        );
    }

    if (error || !product) {
        return (
            <p className="p-6 text-red-600">
                {error || "Product not found."}
            </p>
        );
    }

    return (
        <div className="space-y-6">
            <ProductDetailsHeader productName={product.name} />
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <ProductDetailsGallery product={product} />
                <ProductDetailsInfo product={product} />
            </div>
        </div>
    );
}
