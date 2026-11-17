

import { Package2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductPageHeader({
    eyebrow = "CREATE PRODUCT",
    eyebrowClassName = "text-cyan-600 dark:text-cyan-400",

    title = "Launch a polished product entry",
    description = "Add products with validation, image previews, multi-upload support, and smooth UX.",

    status = "READY",
    statusClassName = "text-cyan-600 dark:text-cyan-300",

    statusDescription = "Create, validate, and save with one click.",
    iconClassName = "text-cyan-600 dark:text-cyan-400",
}) {
    return (
        <section className="relative overflow-hidden rounded-[32px] border border-cyan-100 bg-gradient-to-br from-white via-cyan-50/60 to-white p-6 shadow-sm sm:p-8 dark:border-slate-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 dark:shadow-2xl">

            {/* Top-right cyan glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-14 -top-14 h-44 w-44 rounded-full bg-cyan-200/50 blur-3xl dark:bg-cyan-500/15"
            />

            {/* Bottom-left violet glow */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 left-0 h-44 w-44 rounded-full bg-violet-200/40 blur-3xl dark:bg-violet-500/15"
            />

            {/* Main content */}
            <div className="relative z-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                {/* Intro section */}
                <div className="min-w-0 flex-1">

                    {/* Back button */}
                    <Link
                        to="/products"
                        className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-cyan-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                    >
                        <ArrowLeft size={16} />
                        Back to products
                    </Link>

                    {/* Icon and title */}
                    <div className="mt-5 flex items-center gap-4">

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-cyan-200 bg-cyan-100 dark:border-cyan-500/20 dark:bg-cyan-500/10">
                            <Package2
                                size={28}
                                strokeWidth={1.8}
                                className={iconClassName}
                            />
                        </div>

                        <div className="min-w-0">
                            <p className={`text-xs font-semibold uppercase tracking-[0.35em] ${eyebrowClassName}`}>
                                {eyebrow}
                            </p>

                            <h1 className="mt-1 text-2xl font-black tracking-tight text-slate-900 sm:text-3xl lg:text-4xl dark:text-white">
                                {title}
                            </h1>
                        </div>

                    </div>

                    {/* Description */}
                    <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {description}
                    </p>

                </div>

                {/* Status card */}
                <div className="w-full rounded-3xl border border-cyan-100 bg-white/70 p-4 shadow-xl backdrop-blur sm:p-5 lg:max-w-[260px] dark:border-white/10 dark:bg-white/5">

                    <p className={`text-xs font-bold uppercase tracking-[0.3em] ${statusClassName}`}>
                        {status}
                    </p>

                    <p className="mt-2 text-sm leading-5 text-slate-600 dark:text-slate-200">
                        {statusDescription}
                    </p>

                </div>

            </div>
        </section>
    );
}

