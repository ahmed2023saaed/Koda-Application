import { X } from "lucide-react";
import ProductGallery from "./ProductGallery";
import ProductForm from "./ProductForm";

export default function QuickEditPanel({
    product,
    onClose,
    images,
    onImageUpload,
    onRemoveImage,
    onSubmit,
    isSubmitting,
}) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30 p-4 backdrop-blur-sm">
            <div className="flex max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-2xl">

                {/* Quick Edit Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Quick Edit
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                        <X size={20} />
                    </button>
                </div>
                {/* Scrollable Gallery and Product Form */}
                <div className="min-h-0 flex-1 overflow-y-auto pr-2">
                    {/* Gallery and Product Form */}
                    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

                        <div>
                            <ProductGallery
                                images={images}
                                onImageUpload={onImageUpload}
                                onRemoveImage={onRemoveImage}
                            />
                        </div>

                        <div>
                            <ProductForm
                                key={product._id}
                                formId="quick-edit-product-form"
                                initialValues={product}
                                submitLabel="Save Changes"
                                onSubmit={onSubmit}
                                isSubmitting={isSubmitting}
                                showActions={false}
                                compact={true}
                            />
                        </div>

                    </div>

                    {/* Full-width Footer */}
                    <div className="mt-4 border-t border-gray-200 pt-3">
                        <div className="flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                form="quick-edit-product-form"
                                disabled={isSubmitting}
                                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
                            >
                                {isSubmitting ? "Saving..." : "Save Changes"}
                            </button>
                        </div>
                    </div>
                </div>


            </div>

        </div>
    );
}