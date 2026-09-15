"use client";

import { useState, useEffect } from "react";
import {
  Filter,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Star,
  Check,
  X,
  SlidersHorizontal,
  Tag,
  Boxes,
} from "lucide-react";
import { MainCategory } from "@/data/categories";

export interface FilterState {
  subcategories: string[]; // Supports multiple selected subcategory slugs
  minPrice: number;
  maxPrice: number;
  inStockOnly: boolean;
  onSaleOnly: boolean;
  minRating: number;
}

interface CategoryFilterSidebarProps {
  category: MainCategory;
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  minPossiblePrice: number;
  maxPossiblePrice: number;
  productCountsBySubcategory: Record<string, number>;
  totalProductsCount: number;
  isMobileDrawerOpen?: boolean;
  onCloseMobileDrawer?: () => void;
}

export default function CategoryFilterSidebar({
  category,
  filters,
  onFilterChange,
  onResetFilters,
  minPossiblePrice,
  maxPossiblePrice,
  productCountsBySubcategory,
  totalProductsCount,
  isMobileDrawerOpen = false,
  onCloseMobileDrawer,
}: CategoryFilterSidebarProps) {
  // Accordion toggle states
  const [isSubcategoriesOpen, setIsSubcategoriesOpen] = useState(true);
  const [isPriceOpen, setIsPriceOpen] = useState(true);
  const [isAvailabilityOpen, setIsAvailabilityOpen] = useState(true);
  const [isRatingOpen, setIsRatingOpen] = useState(true);

  // Local price input state for smooth sliding & typing
  const [localMin, setLocalMin] = useState<number>(filters.minPrice);
  const [localMax, setLocalMax] = useState<number>(filters.maxPrice);

  useEffect(() => {
    setLocalMin(filters.minPrice);
    setLocalMax(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  // Toggle multiple subcategories selection
  const handleSubcategoryToggle = (subSlug: string) => {
    const isCurrentlySelected = filters.subcategories.includes(subSlug);
    let updated: string[];

    if (isCurrentlySelected) {
      updated = filters.subcategories.filter((s) => s !== subSlug);
    } else {
      updated = [...filters.subcategories, subSlug];
    }

    onFilterChange({
      ...filters,
      subcategories: updated,
    });
  };

  const handleSelectAllSubcategories = () => {
    onFilterChange({
      ...filters,
      subcategories: [], // Empty array means all subcategories
    });
  };

  const handlePriceApply = () => {
    const validMin = Math.max(0, Math.min(localMin, localMax));
    const validMax = Math.max(validMin, localMax);
    setLocalMin(validMin);
    setLocalMax(validMax);
    onFilterChange({
      ...filters,
      minPrice: validMin,
      maxPrice: validMax,
    });
  };

  const handlePresetPrice = (min: number, max: number) => {
    setLocalMin(min);
    setLocalMax(max);
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  const hasActiveFilters =
    filters.subcategories.length > 0 ||
    filters.minPrice > minPossiblePrice ||
    filters.maxPrice < maxPossiblePrice ||
    filters.inStockOnly ||
    filters.onSaleOnly ||
    filters.minRating > 0;

  // Safe percentage calculator for the slider track
  const priceRange = maxPossiblePrice - minPossiblePrice || 1;
  const minPercent = Math.min(
    100,
    Math.max(0, ((localMin - minPossiblePrice) / priceRange) * 100)
  );
  const maxPercent = Math.min(
    100,
    Math.max(0, ((localMax - minPossiblePrice) / priceRange) * 100)
  );

  const filterContent = (
    <div className="space-y-6">
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200">
        <div className="flex items-center gap-2.5">
          <SlidersHorizontal className="w-4.5 h-4.5 text-[#DC2626] stroke-[2]" />
          <h2 className="text-[17px] font-semibold text-neutral-900 tracking-tight">
            Filters
          </h2>
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
          )}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#DC2626] hover:text-[#b91c1c] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5 stroke-[2]" />
            Reset all
          </button>
        )}
      </div>

      {/* 1. Subcategories Section (Multi-Select Enabled) */}
      <div className="border-b border-neutral-200 pb-5">
        <button
          type="button"
          onClick={() => setIsSubcategoriesOpen(!isSubcategoriesOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-[15px] text-neutral-900 mb-3 group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Boxes className="w-4.5 h-4.5 text-neutral-700 group-hover:text-[#DC2626] transition-colors stroke-[2]" />
            <span>Subcategories</span>
            {filters.subcategories.length > 0 && (
              <span className="text-xs bg-red-100 text-[#DC2626] font-medium px-1.5 py-0.5 rounded-full">
                {filters.subcategories.length}
              </span>
            )}
          </div>
          {isSubcategoriesOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-500 stroke-[2]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500 stroke-[2]" />
          )}
        </button>

        {isSubcategoriesOpen && (
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            {/* "All Subcategories" option */}
            <button
              type="button"
              onClick={handleSelectAllSubcategories}
              className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                filters.subcategories.length === 0
                  ? "bg-red-50/80 text-[#DC2626] font-semibold"
                  : "text-neutral-900 hover:bg-neutral-100/80"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div
                  className={`w-4.5 h-4.5 rounded flex items-center justify-center border transition-colors ${
                    filters.subcategories.length === 0
                      ? "bg-[#DC2626] border-[#DC2626] text-white"
                      : "border-neutral-300 bg-white"
                  }`}
                >
                  {filters.subcategories.length === 0 && (
                    <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                  )}
                </div>
                <span className="truncate text-[14px]">All Subcategories</span>
              </div>
              <span className="text-xs text-neutral-500 font-normal">
                ({totalProductsCount})
              </span>
            </button>

            {/* Individual Subcategories (Multi-Select Checkboxes) */}
            {category.subcategories.map((sub) => {
              const isSelected = filters.subcategories.includes(sub.slug);
              const count = productCountsBySubcategory[sub.slug] || 0;

              return (
                <button
                  key={sub.id || sub.slug}
                  type="button"
                  onClick={() => handleSubcategoryToggle(sub.slug)}
                  className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                    isSelected
                      ? "bg-red-50/80 text-[#DC2626] font-semibold"
                      : "text-neutral-900 hover:bg-neutral-100/80"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div
                      className={`w-4.5 h-4.5 rounded flex items-center justify-center border transition-colors ${
                        isSelected
                          ? "bg-[#DC2626] border-[#DC2626] text-white"
                          : "border-neutral-300 bg-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[2.5]" />}
                    </div>
                    <span className="truncate text-[14px]">{sub.name}</span>
                  </div>
                  <span className="text-xs text-neutral-500 font-normal">
                    ({count})
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 2. Professional Price Range Section with Precision Slider */}
      <div className="border-b border-neutral-200 pb-5">
        <button
          type="button"
          onClick={() => setIsPriceOpen(!isPriceOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-[15px] text-neutral-900 mb-3 group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Tag className="w-4.5 h-4.5 text-neutral-700 group-hover:text-[#DC2626] transition-colors stroke-[2]" />
            <span>Price Range</span>
          </div>
          {isPriceOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-500 stroke-[2]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500 stroke-[2]" />
          )}
        </button>

        {isPriceOpen && (
          <div className="space-y-4 pt-1">
            {/* Live Slider Values Display Badge */}
            <div className="flex items-center justify-between text-sm font-medium text-neutral-900 bg-neutral-50 px-3 py-2 rounded-lg border border-neutral-200">
              <span className="font-semibold text-neutral-900">
                Rs. {localMin.toLocaleString()}
              </span>
              <span className="text-neutral-400 text-xs font-normal">to</span>
              <span className="font-semibold text-neutral-900">
                Rs. {localMax.toLocaleString()}
              </span>
            </div>

            {/* Precision Dual-Thumb Range Slider */}
            <div className="relative h-6 flex items-center px-1 my-1">
              {/* Base Background Track */}
              <div className="absolute left-0 right-0 h-2 bg-neutral-200 rounded-full" />

              {/* Highlighted Active Range Fill */}
              <div
                className="absolute h-2 bg-[#DC2626] rounded-full transition-all duration-75"
                style={{
                  left: `${minPercent}%`,
                  width: `${Math.max(0, maxPercent - minPercent)}%`,
                }}
              />

              {/* Min Range Slider Thumb Input */}
              <input
                type="range"
                min={minPossiblePrice}
                max={maxPossiblePrice}
                step={50}
                value={localMin}
                onChange={(e) => {
                  const val = Math.min(Number(e.target.value), localMax - 100);
                  setLocalMin(val);
                  onFilterChange({ ...filters, minPrice: val, maxPrice: localMax });
                }}
                className="dual-range-slider absolute inset-x-0 w-full h-2 appearance-none bg-transparent pointer-events-none z-20 cursor-pointer"
                aria-label="Minimum Price Slider"
              />

              {/* Max Range Slider Thumb Input */}
              <input
                type="range"
                min={minPossiblePrice}
                max={maxPossiblePrice}
                step={50}
                value={localMax}
                onChange={(e) => {
                  const val = Math.max(Number(e.target.value), localMin + 100);
                  setLocalMax(val);
                  onFilterChange({ ...filters, minPrice: localMin, maxPrice: val });
                }}
                className="dual-range-slider absolute inset-x-0 w-full h-2 appearance-none bg-transparent pointer-events-none z-20 cursor-pointer"
                aria-label="Maximum Price Slider"
              />
            </div>

            {/* Min and Max Numeric Inputs */}
            <div className="flex items-center gap-2.5 pt-1">
              <div className="flex-1">
                <label className="text-xs font-medium text-neutral-600 block mb-1">
                  Min (Rs.)
                </label>
                <input
                  type="number"
                  value={localMin}
                  onChange={(e) => setLocalMin(Number(e.target.value) || 0)}
                  onBlur={handlePriceApply}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePriceApply();
                  }}
                  className="w-full px-3 py-1.5 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DC2626] focus:border-[#DC2626]"
                  placeholder="0"
                />
              </div>

              <span className="text-neutral-400 font-medium text-sm mt-5">-</span>

              <div className="flex-1">
                <label className="text-xs font-medium text-neutral-600 block mb-1">
                  Max (Rs.)
                </label>
                <input
                  type="number"
                  value={localMax}
                  onChange={(e) => setLocalMax(Number(e.target.value) || 0)}
                  onBlur={handlePriceApply}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handlePriceApply();
                  }}
                  className="w-full px-3 py-1.5 text-sm font-medium text-neutral-900 bg-white border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DC2626] focus:border-[#DC2626]"
                  placeholder={String(maxPossiblePrice)}
                />
              </div>
            </div>

            {/* Quick Price Range Presets */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <button
                type="button"
                onClick={() => handlePresetPrice(0, 3000)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                  filters.minPrice === 0 && filters.maxPrice === 3000
                    ? "bg-[#DC2626] text-white border-[#DC2626] font-semibold"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50"
                }`}
              >
                Under Rs. 3k
              </button>
              <button
                type="button"
                onClick={() => handlePresetPrice(3000, 10000)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                  filters.minPrice === 3000 && filters.maxPrice === 10000
                    ? "bg-[#DC2626] text-white border-[#DC2626] font-semibold"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50"
                }`}
              >
                Rs. 3k - 10k
              </button>
              <button
                type="button"
                onClick={() => handlePresetPrice(10000, 30000)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                  filters.minPrice === 10000 && filters.maxPrice === 30000
                    ? "bg-[#DC2626] text-white border-[#DC2626] font-semibold"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50"
                }`}
              >
                Rs. 10k - 30k
              </button>
              <button
                type="button"
                onClick={() => handlePresetPrice(30000, maxPossiblePrice)}
                className={`px-2.5 py-1.5 text-xs font-medium rounded-md border text-center transition-all cursor-pointer ${
                  filters.minPrice === 30000 && filters.maxPrice === maxPossiblePrice
                    ? "bg-[#DC2626] text-white border-[#DC2626] font-semibold"
                    : "bg-white text-neutral-800 border-neutral-200 hover:border-neutral-400 hover:bg-neutral-50"
                }`}
              >
                Above Rs. 30k
              </button>
            </div>
          </div>
        )}
      </div>

      {/* 3. Availability & Deals Section */}
      <div className="border-b border-neutral-200 pb-5">
        <button
          type="button"
          onClick={() => setIsAvailabilityOpen(!isAvailabilityOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-[15px] text-neutral-900 mb-3 group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4.5 h-4.5 text-neutral-700 group-hover:text-[#DC2626] transition-colors stroke-[2]" />
            <span>Availability & Offers</span>
          </div>
          {isAvailabilityOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-500 stroke-[2]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500 stroke-[2]" />
          )}
        </button>

        {isAvailabilityOpen && (
          <div className="space-y-2.5">
            {/* In Stock Only Toggle */}
            <label className="flex items-center justify-between cursor-pointer group py-1">
              <span className="text-sm font-medium text-neutral-900 group-hover:text-[#DC2626] transition-colors">
                In Stock Only
              </span>
              <input
                type="checkbox"
                checked={filters.inStockOnly}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    inStockOnly: e.target.checked,
                  })
                }
                className="w-4.5 h-4.5 text-[#DC2626] rounded border-neutral-300 focus:ring-[#DC2626] accent-[#DC2626] cursor-pointer"
              />
            </label>

            {/* On Sale / Discounts Only */}
            <label className="flex items-center justify-between cursor-pointer group py-1">
              <span className="text-sm font-medium text-neutral-900 group-hover:text-[#DC2626] transition-colors">
                Discounted / On Sale
              </span>
              <input
                type="checkbox"
                checked={filters.onSaleOnly}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    onSaleOnly: e.target.checked,
                  })
                }
                className="w-4.5 h-4.5 text-[#DC2626] rounded border-neutral-300 focus:ring-[#DC2626] accent-[#DC2626] cursor-pointer"
              />
            </label>
          </div>
        )}
      </div>

      {/* 4. Customer Ratings Section */}
      <div className="pb-2">
        <button
          type="button"
          onClick={() => setIsRatingOpen(!isRatingOpen)}
          className="flex items-center justify-between w-full text-left font-semibold text-[15px] text-neutral-900 mb-3 group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4.5 h-4.5 text-amber-500 fill-amber-400 stroke-amber-400" />
            <span>Customer Rating</span>
          </div>
          {isRatingOpen ? (
            <ChevronUp className="w-4 h-4 text-neutral-500 stroke-[2]" />
          ) : (
            <ChevronDown className="w-4 h-4 text-neutral-500 stroke-[2]" />
          )}
        </button>

        {isRatingOpen && (
          <div className="space-y-1.5">
            {[
              { label: "4.8★ & Above (Top Rated)", rating: 4.8 },
              { label: "4.5★ & Above", rating: 4.5 },
              { label: "4.0★ & Above", rating: 4.0 },
              { label: "All Ratings", rating: 0 },
            ].map((item) => (
              <button
                key={item.rating}
                type="button"
                onClick={() =>
                  onFilterChange({
                    ...filters,
                    minRating: item.rating,
                  })
                }
                className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-sm font-medium transition-all text-left cursor-pointer ${
                  filters.minRating === item.rating
                    ? "bg-red-50/80 text-[#DC2626] font-semibold"
                    : "text-neutral-900 hover:bg-neutral-100/80"
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                      filters.minRating === item.rating
                        ? "border-[#DC2626] bg-[#DC2626]"
                        : "border-neutral-300 bg-white"
                    }`}
                  >
                    {filters.minRating === item.rating && (
                      <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    )}
                  </div>
                  <span className="text-[14px]">{item.label}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sticky Filter Sidebar */}
      <aside className="hidden lg:block w-64 xl:w-72 shrink-0">
        <div className="sticky top-20 bg-white rounded-xl border border-neutral-200/90 p-5 shadow-2xs">
          {filterContent}
        </div>
      </aside>

      {/* Mobile Filter Drawer / Modal */}
      {isMobileDrawerOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
            onClick={onCloseMobileDrawer}
          />

          {/* Drawer Panel */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-white shadow-2xl p-5 overflow-y-auto flex flex-col justify-between animate-in slide-in-from-left duration-300">
            <div>
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-neutral-200">
                <div className="flex items-center gap-2.5">
                  <Filter className="w-5 h-5 text-[#DC2626] stroke-[2]" />
                  <h2 className="text-[17px] font-semibold text-neutral-900">
                    Filters
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={onCloseMobileDrawer}
                  className="p-1.5 text-neutral-500 hover:text-black rounded-lg hover:bg-neutral-100 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5 stroke-[2]" />
                </button>
              </div>

              {filterContent}
            </div>

            {/* Mobile Apply Button */}
            <div className="pt-4 mt-4 border-t border-neutral-200">
              <button
                type="button"
                onClick={onCloseMobileDrawer}
                className="w-full py-2.5 px-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-semibold text-sm rounded-lg shadow-md transition-all text-center cursor-pointer"
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
