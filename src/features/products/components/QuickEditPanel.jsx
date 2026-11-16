

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
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/30 p-4 backdrop-blur-sm dark:bg-black/60">

            <div className="flex max-h-[85vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">

                {/* Quick Edit Header */}
                <div className="flex items-center justify-between border-b border-gray-200 pb-3 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                        <span className="h-2.5 w-2.5 rounded-full bg-blue-600"></span>

                        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                            Quick Edit
                        </h2>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-slate-800 dark:hover:text-white"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Scrollable Gallery and Product Form */}
                <div className="min-h-0 flex-1 overflow-y-auto pr-2">

                    <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-2">

                        {/* Product Gallery */}
                        <div>
                            <ProductGallery
                                images={images}
                                onImageUpload={onImageUpload}
                                onRemoveImage={onRemoveImage}
                            />
                        </div>

                        {/* Product Form */}
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
                    <div className="mt-4 border-t border-gray-200 pt-3 dark:border-slate-700">
                        <div className="flex justify-end gap-3">

                            {/* Cancel */}
                            <button
                                type="button"
                                onClick={onClose}
                                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-100 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-800"
                            >
                                Cancel
                            </button>

                            {/* Save Changes */}
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
