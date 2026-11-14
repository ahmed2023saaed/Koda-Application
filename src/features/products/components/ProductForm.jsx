

import { useState } from "react";
import { Layers, Plus, X } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductForm({
    initialValues = {},
    submitLabel = "Create Product",
    onSubmit,
    isSubmitting = false,
    showActions = true,
    compact = false,
    formId,
}) {
    const [tags, setTags] = useState(
        Array.isArray(initialValues.tags) ? initialValues.tags : []
    );

    const [tagInput, setTagInput] = useState("");

    const handleAddTag = () => {
        const newTag = tagInput.trim().replace(/^#/, "");

        if (!newTag || tags.includes(newTag)) return;

        setTags((prevTags) => [...prevTags, newTag]);
        setTagInput("");
    };

    const handleRemoveTag = (tagToRemove) => {
        setTags((prevTags) =>
            prevTags.filter((tag) => tag !== tagToRemove)
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData(event.currentTarget);
        const values = Object.fromEntries(formData.entries());

        onSubmit({
            ...values,
            tags,
            featured: isFeatured,
            isActive,
        });
    };

    const [isFeatured, setIsFeatured] = useState(
        initialValues.featured ?? false
    );

    const [isActive, setIsActive] = useState(
        initialValues.isActive ?? true
    );

    return (
        <form
            id={formId}
            onSubmit={handleSubmit}
            className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
            <div className={compact ? "space-y-3" : "space-y-5"}>

                {/* Product Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Product Name <span className="text-red-500">*</span>
                    </label>

                    <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        defaultValue={initialValues.name ?? ""}
                        placeholder="Enter product name"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                    />
                </div>

                {/* Short Description */}
                <div>
                    <label
                        htmlFor="shortDescription"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Short Description <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        id="shortDescription"
                        name="shortDescription"
                        required
                        rows={3}
                        defaultValue={initialValues.shortDescription ?? ""}
                        placeholder="Write a brief product summary..."
                        className="w-full resize-none rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                    />
                </div>

                {/* Full Description */}
                <div>
                    <label
                        htmlFor="description"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Full Description <span className="text-red-500">*</span>
                    </label>

                    <textarea
                        id="description"
                        name="description"
                        required
                        rows={6}
                        defaultValue={initialValues.description ?? ""}
                        placeholder="Write the complete product description..."
                        className="w-full resize-y rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                    />
                </div>

                {/* Pricing */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="price"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Price <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="price"
                            name="price"
                            type="number"
                            required
                            min="0"
                            step="0.01"
                            defaultValue={initialValues.price ?? ""}
                            placeholder="0.00"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="discountPrice"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Discount Price
                        </label>

                        <input
                            id="discountPrice"
                            name="discountPrice"
                            type="number"
                            min="0"
                            step="0.01"
                            defaultValue={initialValues.discountPrice ?? ""}
                            placeholder="0.00"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                {/* Inventory */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <div>
                        <label
                            htmlFor="stock"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Stock <span className="text-red-500">*</span>
                        </label>

                        <input
                            id="stock"
                            name="stock"
                            type="number"
                            required
                            min="0"
                            step="1"
                            defaultValue={initialValues.stock ?? ""}
                            placeholder="Enter available quantity"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="sku"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            SKU
                        </label>

                        <input
                            id="sku"
                            name="sku"
                            type="text"
                            defaultValue={initialValues.sku ?? ""}
                            placeholder="e.g. WH-001"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                {/* Category and Subcategory */}
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                    {/* Category */}
                    <div>
                        <label
                            htmlFor="category"
                            className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Category <span className="text-red-500">*</span>
                        </label>

                        <select
                            id="category"
                            name="category"
                            defaultValue={initialValues.category ?? ""}
                            required
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                        >
                            <option value="">Select category</option>
                            <option value="electronics">Electronics</option>
                            <option value="sports">Sports</option>
                            <option value="phones">Phones</option>
                            <option value="fashion">Fashion</option>
                            <option value="beauty">Beauty</option>
                            <option value="home">Home</option>
                        </select>
                    </div>

                    {/* Subcategory */}
                    <div>
                        <label
                            htmlFor="subcategory"
                            className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                        >
                            Subcategory
                        </label>

                        <input
                            id="subcategory"
                            name="subcategory"
                            type="text"
                            defaultValue={initialValues.subcategory ?? ""}
                            placeholder="Enter subcategory"
                            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                        />
                    </div>
                </div>

                {/* Brand */}
                <div>
                    <label
                        htmlFor="brand"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Brand
                    </label>

                    <input
                        id="brand"
                        name="brand"
                        type="text"
                        defaultValue={initialValues.brand ?? ""}
                        placeholder="Enter brand name"
                        className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                    />
                </div>

                {/* Tags */}
                <div className="rounded-xl border border-blue-200 bg-blue-50/60 p-4 dark:border-blue-900/60 dark:bg-blue-950/30">
                    <label
                        htmlFor="tags"
                        className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-200"
                    >
                        Tags
                    </label>

                    {/* Tag Input and Add Button */}
                    <div className="flex gap-2">
                        <input
                            id="tags"
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    handleAddTag();
                                }
                            }}
                            placeholder="Enter a tag..."
                            className="min-w-0 flex-1 rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-blue-400 dark:focus:ring-blue-500/20"
                        />

                        <button
                            type="button"
                            onClick={handleAddTag}
                            className="flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                            <Plus size={17} />
                            Add
                        </button>
                    </div>

                    {/* Added Tags */}
                    {tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {tags.map((tag) => (
                                <div
                                    key={tag}
                                    className="flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-sm text-blue-700 dark:border-blue-900/70 dark:bg-blue-950/50 dark:text-blue-300"
                                >
                                    <span>#{tag}</span>

                                    <button
                                        type="button"
                                        onClick={() => handleRemoveTag(tag)}
                                        className="text-blue-500 transition hover:text-red-600 dark:text-blue-400 dark:hover:text-red-400"
                                        aria-label={`Remove ${tag}`}
                                    >
                                        <X size={15} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Settings */}
                <div className="grid grid-cols-2 gap-5">

                    {/* Featured Checkbox */}
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={isFeatured}
                            onChange={(e) => setIsFeatured(e.target.checked)}
                            className="h-5 w-5 cursor-pointer accent-blue-600"
                        />

                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Featured Product
                        </span>
                    </label>

                    {/* Active Checkbox */}
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
                        <input
                            type="checkbox"
                            name="isActive"
                            checked={isActive}
                            onChange={(e) => setIsActive(e.target.checked)}
                            className="h-5 w-5 cursor-pointer accent-blue-600"
                        />

                        <span className="text-sm font-medium text-gray-800 dark:text-gray-200">
                            Active
                        </span>
                    </label>

                </div>

                {/* Divider and Action Buttons */}
                {showActions && (
                    <div className="border-t border-gray-200 pt-6 dark:border-slate-700">
                        <div className="flex flex-col-reverse justify-end gap-3 sm:flex-row">

                            {/* Cancel Button */}
                            <Link
                                to="/products"
                                className="rounded-xl border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-200 dark:hover:bg-slate-700"
                            >
                                Cancel
                            </Link>

                            {/* Create / Save Button */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 disabled:opacity-60"
                            >
                                {submitLabel}
                            </button>

                        </div>
                    </div>
                )}

            </div>
        </form>
    );
}

