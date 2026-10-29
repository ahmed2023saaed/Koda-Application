
import React from 'react';

export default function Sidebar({ isDarkMode }) {
  const navItemClass = `flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors duration-200 cursor-pointer ${
    isDarkMode
      ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
    : 'text-gray-700 hover:bg-gray-800 hover:text-white'
  }`;

  const iconClass = "w-4 h-4 shrink-0";

  return (
    <aside
      className={`w-64 min-h-screen flex flex-col border-r transition-colors duration-300 ${
        isDarkMode
          ? 'bg-[#050817] border-gray-800/60 text-white'
          : 'bg-white border-gray-200 text-gray-900'
      }`}
    >
      {/* Header */}
      <div className="px-3.5 pt-3.5 pb-1">
        <span className="block text-[10px] tracking-[0.3em] text-cyan-400 font-bold uppercase">
          COMMERCE
        </span>

        <h2
          className={`text-base font-bold mt-1 ${
            isDarkMode ? 'text-gray-100' : 'text-gray-900'
          }`}
        >
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3.5 pt-3.5 space-y-0.5">
        {/* Dashboard - Active */}
        <a
          href="#"
          className={`flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors ${
  isDarkMode
    ? 'text-gray-300 hover:bg-gray-800 hover:text-white'
    : 'text-gray-700 hover:bg-gray-800 hover:text-white'
}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconClass}
          >
            <path d="M3 10.5 12 3l9 7.5" />
            <path d="M5 9.5V20h14V9.5" />
            <path d="M9 20v-6h6v6" />
          </svg>
          <span>Dashboard</span>
        </a>

        {/* Users */}
        <a href="#" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconClass}
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="10" cy="7" r="4" />
            <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
          <span>Users</span>
        </a>

        {/* Products */}
        <a href="#" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconClass}
          >
            <path d="m12 3 9 5-9 5-9-5 9-5Z" />
            <path d="m3 8 9 5 9-5" />
            <path d="M3 8v9l9 5 9-5V8" />
            <path d="M12 13v9" />
          </svg>
          <span>Products</span>
        </a>

        {/* Add Product */}
        <a href="#" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconClass}
          >
            <path d="M12 5v14" />
            <path d="M5 12h14" />
          </svg>
          <span className="-translate-x-0.5 relative">Add Product</span>
        </a>

        {/* Orders */}
        <a href="#" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconClass}
          >
            <path d="M6 3h9l4 4v14H6z" />
            <path d="M14 3v5h5" />
            <path d="M9 12h7M9 16h7" />
          </svg>
          <span>Orders</span>
        </a>

        {/* Carts */}
        <a href="#" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={iconClass}
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2 3h2l3 13h12l3-9H5" />
          </svg>
          <span>Carts</span>
        </a>

        {/* Settings */}
        <a href="#" className={navItemClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-5 shrink-0 -translate-x-1"
          >
            <circle cx="14.3" cy="14" r="2" />
            <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" />
          </svg>
          <span className="-translate-x-1 relative">Settings</span>
        </a>
      </nav>

      {/* LIVE Status */}
     <div className="p-3.5 mt-auto">
  <div className="mr-1 rounded-3xl bg-gradient-to-br from-cyan-400 via-sky-500 to-indigo-600 px-3 py-5 text-white">
          <span className="block text-[11px] tracking-[0.25em] uppercase opacity-90">
            LIVE
          </span>

          <p className="text-sm font-semibold leading-5 mt-1 max-w-[150px]">
  Connected to the E-commerce API
</p>
        </div>
      </div>
    </aside>
  );
}
