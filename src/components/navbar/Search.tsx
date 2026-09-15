"use client";

import { Search as SearchIcon, X, ArrowRight, Tag } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface SearchProps {
  isMobileDrawer?: boolean;
  onCloseMobile?: () => void;
  className?: string;
}

const POPULAR_SEARCHES = [
  { label: "Football Match Turf (50mm)", category: "Artificial Turf" },
  { label: "Montessori Wooden Puzzle Boards", category: "Kids & Educational" },
  { label: "Commercial Slide & Swing Structures", category: "Playground & Recreation" },
  { label: "Ergonomic Student Desks & Chairs", category: "School Furniture" },
  { label: "Heavy-Duty Basketball Posts", category: "Sports Equipment" },
  { label: "Commercial Urethane Dumbbell Sets", category: "Commercial & Fitness" },
  { label: "High-Density Gym Crash Mats", category: "Sports Equipment" },
];

export default function Search({
  isMobileDrawer = false,
  onCloseMobile,
  className = "",
}: SearchProps) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    setIsFocused(false);
    if (onCloseMobile) onCloseMobile();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSelectSuggestion = (item: string) => {
    setQuery(item);
    setIsFocused(false);
    if (onCloseMobile) onCloseMobile();
    router.push(`/search?q=${encodeURIComponent(item)}`);
  };

  if (isMobileDrawer) {
    return (
      <form onSubmit={handleSearchSubmit} className="relative w-full">
        <div className="relative flex items-center h-10 rounded-md border border-neutral-300 bg-white overflow-hidden focus-within:border-[#DC2626] focus-within:ring-2 focus-within:ring-red-500/20 transition-all">
          <div className="pl-3 text-neutral-400 shrink-0 pointer-events-none flex items-center">
            <SearchIcon className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, categories..."
            className="w-full h-full pl-2.5 pr-2 text-sm font-medium bg-transparent text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal focus:outline-none truncate"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-neutral-400 hover:text-neutral-700 mr-1 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            type="submit"
            aria-label="Search"
            className="h-full px-3.5 bg-[#DC2626] hover:bg-[#b91c1c] active:bg-[#991b1b] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <SearchIcon className="w-4 h-4 stroke-[2.25]" />
          </button>
        </div>
      </form>
    );
  }

  return (
    <div ref={searchRef} className={`relative w-full ${className}`}>
      <form onSubmit={handleSearchSubmit}>
        <div
          className={`relative flex items-center h-10 rounded-md border transition-all duration-150 overflow-hidden bg-white ${
            isFocused
              ? "border-[#DC2626] ring-2 ring-red-500/20 shadow-xs"
              : "border-neutral-300 hover:border-neutral-400"
          }`}
        >
          <div className="pl-3.5 text-neutral-400 shrink-0 pointer-events-none flex items-center">
            <SearchIcon className="w-4 h-4" />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Search products, categories..."
            className="w-full h-full pl-2.5 pr-2 text-sm font-medium bg-transparent text-neutral-900 placeholder:text-neutral-400 placeholder:font-normal focus:outline-none truncate"
          />

          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="p-1 text-neutral-400 hover:text-neutral-700 cursor-pointer mr-1 transition-colors"
              title="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}

          <button
            type="submit"
            aria-label="Search catalog"
            className="h-full px-3.5 sm:px-4 bg-[#DC2626] hover:bg-[#b91c1c] active:bg-[#991b1b] text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          >
            <SearchIcon className="w-4 h-4 stroke-[2.25]" />
          </button>
        </div>
      </form>

      {/* Structured Suggestions Dropdown */}
      {isFocused && (
        <div className="absolute left-0 right-0 top-full mt-1.5 min-w-[340px] sm:min-w-[420px] bg-white border border-neutral-300 rounded-lg shadow-2xl py-3 z-50 animate-in fade-in duration-100">
          <div className="px-4 pb-2.5 text-[13px] sm:text-[13.5px] font-extrabold text-neutral-950 uppercase tracking-wider flex items-center justify-between border-b border-neutral-100">
            <span>Popular Inquiries</span>
            <span className="text-xs font-bold text-neutral-500 tracking-wide">Direct B2B</span>
          </div>

          <div className="mt-1 divide-y divide-neutral-50">
            {POPULAR_SEARCHES.map((item) => (
              <button
                key={item.label}
                type="button"
                onMouseDown={() => handleSelectSuggestion(item.label)}
                className="w-full text-left px-4 py-2.5 hover:bg-neutral-50 hover:text-[#DC2626] transition-colors flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0 pr-3">
                  <SearchIcon className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] shrink-0" />
                  <span className="text-[14.5px] sm:text-[15.5px] font-semibold text-neutral-950 group-hover:text-[#DC2626] truncate">
                    {item.label}
                  </span>
                </div>
                <span className="text-xs font-semibold text-neutral-600 bg-neutral-100 px-2.5 py-1 rounded-md shrink-0">
                  {item.category}
                </span>
              </button>
            ))}
          </div>

          <div className="pt-2.5 mt-2 border-t border-neutral-200 px-4 flex items-center justify-between text-xs sm:text-[13px] text-neutral-600 font-medium">
            <span>Press Enter to search entire catalog</span>
            <span className="text-[#DC2626] font-bold flex items-center gap-1.5 group-hover:underline cursor-pointer">
              All Categories <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
