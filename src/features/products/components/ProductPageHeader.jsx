

// import { Package2 } from "lucide-react";
// import { Link } from "react-router-dom";

// export default function ProductPageHeader({
//     eyebrow = "CREATE PRODUCT",
//     title = "Launch a polished product entry",
//     description = "Add products with validation, image previews, multi-upload support, and smooth UX.",
//     status = "READY",
//     statusDescription = "Create, validate, and save with one click.",
// }) {
//     return (
//         <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">

//             {/* Back Button */}
//             <Link
//                 to="/products"
//                 className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-slate-600 dark:text-gray-300 dark:hover:bg-slate-800"
//             >
//                 <span>←</span>
//                 Back to Products
//             </Link>

//             <div className="mt-6 grid items-center gap-6 md:grid-cols-[1fr_260px]">

//                 {/* Intro Text */}
//                 <div>
//                     <p className="text-xs font-semibold tracking-widest text-blue-600 dark:text-blue-400">
//                         {eyebrow}
//                     </p>

//                     <h1 className="mt-2 flex flex-wrap items-center gap-3 text-2xl font-bold text-gray-900 sm:text-3xl dark:text-gray-100">
//                         {title}

//                         <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-950/50">
//                             <Package2
//                                 size={34}
//                                 strokeWidth={1.8}
//                                 className="text-blue-600 dark:text-blue-400"
//                             />
//                         </div>
//                     </h1>

//                     <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
//                         {description}
//                     </p>
//                 </div>

//                 {/* Status Card */}
//                 <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 dark:border-slate-700 dark:bg-slate-800">
//                     <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
//                         {status}
//                     </p>

//                     <p className="mt-2 text-sm leading-5 text-gray-500 dark:text-gray-400">
//                         {statusDescription}
//                     </p>
//                 </div>

//             </div>
//         </section>
//     );
// }

import { Package2 } from "lucide-react";
import { Link } from "react-router-dom";

export default function ProductPageHeader({
    eyebrow = "CREATE PRODUCT",
    title = "Launch a polished product entry",
    description = "Add products with validation, image previews, multi-upload support, and smooth UX.",
    status = "READY",
    statusDescription = "Create, validate, and save with one click.",
}) {
    return (
        <section className="rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-sm">

            {/* Back Button */}
            <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-800"
            >
                <span>←</span>
                Back to Products
            </Link>

            <div className="mt-6 grid items-center gap-6 md:grid-cols-[1fr_260px]">

                {/* Intro Text */}
                <div>
                    <p className="text-xs font-semibold tracking-widest text-sky-400">
                        {eyebrow}
                    </p>

                    <h1 className="mt-2 flex flex-wrap items-center gap-3 text-2xl font-bold text-white sm:text-3xl">
                        {title}

                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-slate-800">
                            <Package2
                                size={34}
                                strokeWidth={1.8}
                                className="text-sky-400"
                            />
                        </div>
                    </h1>

                    <p className="mt-3 text-sm leading-6 text-slate-400">
                        {description}
                    </p>
                </div>

                {/* Status Card */}
                <div className="rounded-xl border border-slate-700 bg-slate-800 p-4">

                    <p className="text-sm font-bold tracking-wide text-sky-400">
                        {status}
                    </p>

                    <p className="mt-2 text-sm leading-5 text-slate-300">
                        {statusDescription}
                    </p>
                </div>

            </div>
        </section>
    );
}

