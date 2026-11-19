

import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import {
  Search,
  SlidersHorizontal,
  Layers,
  Tag,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function ProductToolbar({ onSearch, loading }) {
  const [searchParams] = useSearchParams();
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Search and filter values
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");

  useEffect(() => {
    setSearchTerm(searchParams.get("search") || "");
    setSelectedCategory(searchParams.get("category") || "");
    setSubcategory(searchParams.get("subcategory") || "");
  }, [searchParams]);

  // Runs when the Search button is clicked
  function handleSearch() {
    const filters = {
      page: 1,
    };

    if (searchTerm.trim()) {
      filters.search = searchTerm.trim();
    }

    if (selectedCategory) {
      filters.category = selectedCategory;
    }

    if (subcategory.trim()) {
      filters.subcategory = subcategory.trim();
    }

    onSearch(filters);
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="mx-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-12 min-w-[200px] flex-1 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-12 w-28 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />
          <div className="h-12 w-28 animate-pulse rounded-lg bg-gray-200 dark:bg-slate-700" />
        </div>
      </div>
    );
  }

  return (
    <div className="mx-1 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-slate-700 dark:bg-slate-900">

      {/* Main toolbar */}
      <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-center">

        {/* Search input */}
        <div className="relative w-full min-w-0 flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
          />
        </div>
        {/* Filters button */}
        <button
          type="button"
          onClick={() => setIsFilterOpen((previous) => !previous)}
          aria-expanded={isFilterOpen}
          className={`flex h-12 w-full items-center justify-center gap-2 rounded-xl border px-4 text-sm font-semibold transition-all duration-300 sm:w-auto ${isFilterOpen
              ? "border-cyan-400 bg-cyan-100 text-cyan-700 shadow-[0_0_14px_rgba(6,182,212,0.22)] dark:border-cyan-400 dark:bg-cyan-500/20 dark:text-cyan-300 dark:shadow-[0_0_14px_rgba(6,182,212,0.2)]"
              : "border-gray-300 bg-white text-gray-700 hover:border-cyan-300 hover:bg-white hover:text-black hover:shadow-[0_0_12px_rgba(6,182,212,0.16)] dark:border-slate-600 dark:bg-slate-800 dark:text-gray-300 dark:hover:border-slate-600 dark:hover:bg-slate-800 dark:hover:text-white dark:hover:shadow-none"
            }`}
        >
          <SlidersHorizontal size={15} />
          Filters

          {isFilterOpen ? (
            <ChevronUp size={16} />
          ) : (
            <ChevronDown size={16} />
          )}
        </button>



        {/* Search button */}
        <button
          type="button"
          onClick={handleSearch}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700 sm:w-auto"
        >
          <Search size={18} />
          Search
        </button>

      </div>

      {/* Expandable filters */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${isFilterOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="mt-5 border-t border-gray-200 pt-5 dark:border-slate-700">

            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

              {/* Category */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <Layers size={17} className="text-gray-500 dark:text-gray-400" />
                  Category
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
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
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-200">
                  <Tag size={17} className="text-gray-500 dark:text-gray-400" />
                  Subcategory
                </label>

                <input
                  type="text"
                  placeholder="Enter subcategory..."
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-gray-900 outline-none placeholder:text-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 dark:border-slate-600 dark:bg-slate-800 dark:text-gray-100 dark:placeholder:text-gray-500 dark:focus:border-indigo-400 dark:focus:ring-indigo-500/20"
                />
              </div>

            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

