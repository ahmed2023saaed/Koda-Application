

export default function ProductDetailsSkeleton() {
    return (
        <div className="animate-pulse space-y-6">

            {/* Header Skeleton */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <div className="h-10 w-40 rounded-lg bg-gray-200 dark:bg-slate-700" />

                <div className="mt-6 flex items-center gap-4">
                    <div className="h-14 w-14 rounded-xl bg-gray-200 dark:bg-slate-700" />

                    <div className="flex-1 space-y-3">
                        <div className="h-7 w-2/3 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-4 w-1/3 rounded bg-gray-200 dark:bg-slate-700" />
                    </div>
                </div>
            </div>

            {/* Main Content Skeleton */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">

                {/* Gallery Skeleton */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div className="h-96 w-full rounded-2xl bg-gray-200 dark:bg-slate-800" />

                    <div className="mt-4 flex gap-3">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-20 w-20 shrink-0 rounded-lg bg-gray-200 dark:bg-slate-700"
                            />
                        ))}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-5 dark:border-slate-700">
                        <div className="h-72 w-full rounded-xl bg-gray-200 dark:bg-slate-800" />
                    </div>
                </div>

                {/* Product Information Skeleton */}
                <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

                    {/* Overview */}
                    <div className="mb-6 space-y-4 rounded-xl bg-gray-100 p-5 dark:bg-slate-800">
                        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-7 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-3 w-full rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-slate-700" />
                    </div>

                    {/* Price and Discount */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="h-24 rounded-xl bg-gray-100 p-4 dark:bg-slate-800"
                            >
                                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-700" />
                                <div className="mt-4 h-6 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                            </div>
                        ))}
                    </div>

                    {/* Stock and SKU */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        {[1, 2].map((item) => (
                            <div
                                key={item}
                                className="h-24 rounded-xl bg-gray-100 p-4 dark:bg-slate-800"
                            >
                                <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-700" />
                                <div className="mt-4 h-6 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                            </div>
                        ))}
                    </div>

                    {/* Tags */}
                    <div className="mb-6 h-24 rounded-xl bg-gray-100 p-4 dark:bg-slate-800">
                        <div className="h-4 w-20 rounded bg-gray-200 dark:bg-slate-700" />

                        <div className="mt-4 flex gap-2">
                            <div className="h-7 w-16 rounded-full bg-gray-200 dark:bg-slate-700" />
                            <div className="h-7 w-20 rounded-full bg-gray-200 dark:bg-slate-700" />
                        </div>
                    </div>

                    {/* Category Info */}
                    <div className="mb-6 h-20 rounded-xl bg-gray-100 p-4 dark:bg-slate-800">
                        <div className="h-4 w-28 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="mt-4 h-4 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
                    </div>

                    {/* Highlights */}
                    <div className="h-24 rounded-xl bg-gray-100 p-4 dark:bg-slate-800">
                        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="mt-4 h-4 w-full rounded bg-gray-200 dark:bg-slate-700" />
                    </div>

                </div>
            </div>
        </div>
    );
}
