
import { Outlet } from "react-router-dom";

export default function ProductLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen">

        {/* Sidebar */}
        <aside className="w-[280px] shrink-0 bg-blue-100 p-4 text-blue-900">
          <p className="text-center font-semibold">
            SIDEBAR PLACEHOLDER
          </p>

          <p className="mt-2 text-center text-sm">
            280px wide
          </p>
        </aside>

        {/* Right Section */}
        <div className="flex min-w-0 flex-1 flex-col">

          {/* Header */}
          <header className="flex h-20 shrink-0 items-center justify-center bg-blue-900 text-white">
            <p className="font-semibold">
              HEADER PLACEHOLDER (80px tall)
            </p>
          </header>

          {/* Page Content */}
          <main className="min-w-0 flex-1 p-6">
            <Outlet />
          </main>

        </div>
      </div>
    </div>
  );
}
