

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
            <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

                {/* Gallery Skeleton */}
                <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <div className="h-64 w-full rounded-2xl bg-gray-200 sm:h-80 xl:h-96 dark:bg-slate-800" />

                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-16 w-16 shrink-0 rounded-lg bg-gray-200 sm:h-20 sm:w-20 dark:bg-slate-700"
                            />
                        ))}
                    </div>

                    <div className="mt-6 border-t border-gray-200 pt-5 dark:border-slate-700">
                        <div className="h-56 w-full rounded-xl bg-gray-200 sm:h-64 xl:h-72 dark:bg-slate-800" />
                    </div>
                </div>

                {/* Product Information Skeleton */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6 dark:border-slate-700 dark:bg-slate-900">

                    {/* Overview */}
                    <div className="mb-6 space-y-4 rounded-xl bg-gray-100 p-5 dark:bg-slate-800">
                        <div className="h-4 w-24 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-7 w-3/4 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-3 w-full rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-3 w-5/6 rounded bg-gray-200 dark:bg-slate-700" />
                        <div className="h-3 w-2/3 rounded bg-gray-200 dark:bg-slate-700" />
                    </div>

                    {/* Price and Discount */}
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                    <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
