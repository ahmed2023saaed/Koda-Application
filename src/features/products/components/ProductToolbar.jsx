

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

export default function ProductToolbar({ onSearch }) {
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

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      {/* Main toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        {/* Search input */}
        <div className="relative min-w-[200px] flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-3 pl-10 pr-4 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
          />
        </div>

        {/* Filters button */}
        <button
          type="button"
          onClick={() => setIsFilterOpen((previous) => !previous)}
          className={`flex items-center gap-2 rounded-lg border px-4 py-3 transition-all duration-300 ${
            isFilterOpen
              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-100"
          }`}
        >
          <SlidersHorizontal size={18} />
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
          className="flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
        >
          <Search size={18} />
          Search
        </button>
      </div>

      {/* Expandable filters */}
      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          isFilterOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="mt-5 border-t border-gray-200 pt-5">
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Category */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Layers size={17} className="text-gray-500" />
                  Category
                </label>

                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
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
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-gray-700">
                  <Tag size={17} className="text-gray-500" />
                  Subcategory
                </label>

                <input
                  type="text"
                  placeholder="Enter subcategory..."
                  value={subcategory}
                  onChange={(e) => setSubcategory(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
