
import { Package } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductPageHeader({
    eyebrow = "CREATE PRODUCT",
    title = "Launch a polished product entry",
    description = "Add products with validation, image previews, multi-upload support, and smooth UX.",
    status = "READY",
    statusDescription = "Create, validate, and save with one click.",
}) {
    return (
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
            >
                <span>←</span>
                Back to Products
            </Link>

            <div className="mt-6 grid items-center gap-6 md:grid-cols-[1fr_260px]">
                {/* Intro Text */}
                <div>
                    <p className="text-xs font-semibold tracking-widest text-blue-600">
                        {eyebrow}
                    </p>

                    <h1 className="mt-2 flex flex-wrap items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl">
                        {title}

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50">
                            <Package
                                size={34}
                                strokeWidth={1.8}
                                className="text-blue-600"
                            />
                        </div>
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-gray-500">
                        {description}
                    </p>
                </div>

                {/* Status Card */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-sm font-medium text-gray-700">
                        {status}
                    </p>

                    <p className="mt-2 text-sm leading-5 text-gray-500">
                        {statusDescription}
                    </p>
                </div>
            </div>
        </section>
    );
}
