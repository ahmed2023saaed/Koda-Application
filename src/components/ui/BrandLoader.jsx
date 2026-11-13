export default function BrandLoader({ message = "Loading..." }) {
    return (
        <div className="flex flex-col items-center justify-center gap-4 py-12">

            {/* Rotating Logo */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full border-4 border-blue-100 border-t-blue-600 animate-spin">
                <img
                    src="/images/image12.jpeg"
                    alt="Koda Logo"
                    className="h-10 w-10 object-contain"
                />
            </div>

            {/* Loading Text */}
            <div className="text-center">
                <h2 className="text-xl font-bold text-gray-900">
                    Koda Dashboard
                </h2>

                <p className="mt-1 text-sm font-medium text-gray-500">
                    {message}
                </p>
            </div>

        </div>
    );
}