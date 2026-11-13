// import React from "react";
import { NavLink } from "react-router-dom";
// import { useTheme } from "../../contexts/themeContext";

export default function Sidebar({ isDarkMode }) {
  // const { isDarkMode } = useTheme();
  const navItems = [
    {
      to: "/dashboard",
      label: "Dashboard",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <path d="M3 10.5 12 3l9 7.5" />
          <path d="M5 9.5V20h14V9.5" />
          <path d="M9 20v-6h6v6" />
        </svg>
      ),
    },
    {
      to: "/users",
      label: "Users",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="10" cy="7" r="4" />
          <path d="M20 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      to: "/products",
      label: "Products",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <path d="m12 3 9 5-9 5-9-5 9-5Z" />
          <path d="m3 8 9 5 9-5" />
          <path d="M3 8v9l9 5 9-5V8" />
          <path d="M12 13v9" />
        </svg>
      ),
    },
    {
      to: "/products/add",
      label: "Add Product",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <path d="M12 5v14" />
          <path d="M5 12h14" />
        </svg>
      ),
    },
    {
      to: "/orders",
      label: "Orders",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <path d="M6 3h9l4 4v14H6z" />
          <path d="M14 3v5h5" />
          <path d="M9 12h7M9 16h7" />
        </svg>
      ),
    },
    {
      to: "/carts",
      label: "Carts",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <circle cx="9" cy="21" r="1" />
          <circle cx="19" cy="21" r="1" />
          <path d="M2 3h2l3 13h12l3-9H5" />
        </svg>
      ),
    },
    {
      to: "/settings",
      label: "Settings",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 shrink-0">
          <circle cx="14.3" cy="14" r="2" />
          <path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.7-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.7a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.7 1.4 2.4-1.4 1.1a7 7 0 0 1 0 2Z" />
        </svg>
      ),
    },
  ];

  const baseClass =
    "flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors duration-200";

  return (
    <aside
      className={`w-64 min-h-screen flex flex-col border-r transition-colors duration-300 ${
        isDarkMode
          ? "bg-[#050817] border-gray-800/60 text-white"
          : "bg-white border-gray-200 text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="px-3.5 pt-3.5 pb-1">
        <span className="block text-[10px] tracking-[0.3em] text-cyan-400 font-bold uppercase">
          COMMERCE
        </span>
        <h2
          className={`text-base font-bold mt-1 ${
            isDarkMode ? "text-gray-100" : "text-gray-900"
          }`}
        >
          Admin Panel
        </h2>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3.5 pt-3.5 space-y-0.5">
        {navItems.map(({ to, label, icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/products"}
            className={({ isActive }) =>
              `${baseClass} ${
                isActive
                  ? "bg-gray-800 text-white"
                  : isDarkMode
                    ? "text-gray-300 hover:bg-gray-800 hover:text-white"
                    : "text-gray-700 hover:bg-gray-800 hover:text-white"
              }`
            }
          >
            {icon}
            <span>{label}</span>
          </NavLink>
        ))}
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