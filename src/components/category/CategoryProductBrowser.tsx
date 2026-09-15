"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  SlidersHorizontal,
  ArrowUpDown,
  Grid3X3,
  List,
  Search,
  X,
  PackageOpen,
  Sparkles,
} from "lucide-react";
import { MainCategory } from "@/data/categories";
import { Product } from "@/data/products";
import CategoryHeader from "./CategoryHeader";
import CategoryFilterSidebar, { FilterState } from "./CategoryFilterSidebar";
import ProductGridCard from "./ProductGridCard";

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "discount-desc"
  | "name-asc";

interface CategoryProductBrowserProps {
  category: MainCategory;
  initialProducts: Product[];
}

export default function CategoryProductBrowser({
  category,
  initialProducts,
}: CategoryProductBrowserProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Determine min and max bounds from category products
  const minPossiblePrice = useMemo(() => {
    if (initialProducts.length === 0) return 0;
    return Math.min(...initialProducts.map((p) => p.price));
  }, [initialProducts]);

  const maxPossiblePrice = useMemo(() => {
    if (initialProducts.length === 0) return 100000;
    return Math.max(...initialProducts.map((p) => p.price));
  }, [initialProducts]);

  // Read initial values from URL query parameters (supporting comma-separated multi-subcategories)
  const subParam = searchParams.get("sub");
  const initialSubcategories = useMemo(() => {
    if (!subParam) return [];
    return subParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  }, [subParam]);

  const sortParam = (searchParams.get("sort") as SortOption) || "featured";
  const minPriceParam = searchParams.get("minPrice")
    ? Number(searchParams.get("minPrice"))
    : minPossiblePrice;
  const maxPriceParam = searchParams.get("maxPrice")
    ? Number(searchParams.get("maxPrice"))
    : maxPossiblePrice;
  const inStockParam = searchParams.get("inStock") === "true";
  const onSaleParam = searchParams.get("onSale") === "true";
  const ratingParam = searchParams.get("rating")
    ? Number(searchParams.get("rating"))
    : 0;
  const qParam = searchParams.get("q") || "";

  // State Management
  const [filters, setFilters] = useState<FilterState>({
    subcategories: initialSubcategories,
    minPrice: minPriceParam,
    maxPrice: maxPriceParam,
    inStockOnly: inStockParam,
    onSaleOnly: onSaleParam,
    minRating: ratingParam,
  });

  const [searchQuery, setSearchQuery] = useState(qParam);
  const [sortOption, setSortOption] = useState<SortOption>(sortParam);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(16);

  // Sync state when URL params change
  useEffect(() => {
    const currentSubParam = searchParams.get("sub");
    const currentSubs = currentSubParam
      ? currentSubParam
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];

    setFilters((prev) => {
      const isSame =
        prev.subcategories.length === currentSubs.length &&
        prev.subcategories.every((s) => currentSubs.includes(s));
      if (isSame) return prev;
      return { ...prev, subcategories: currentSubs };
    });
  }, [searchParams]);

  // Update URL search parameters when filters change
  const updateUrlParams = useCallback(
    (newFilters: FilterState, newSort: SortOption, newQuery: string) => {
      const params = new URLSearchParams();

      if (newFilters.subcategories.length > 0) {
        params.set("sub", newFilters.subcategories.join(","));
      }
      if (newFilters.minPrice > minPossiblePrice) {
        params.set("minPrice", String(newFilters.minPrice));
      }
      if (newFilters.maxPrice < maxPossiblePrice) {
        params.set("maxPrice", String(newFilters.maxPrice));
      }
      if (newFilters.inStockOnly) {
        params.set("inStock", "true");
      }
      if (newFilters.onSaleOnly) {
        params.set("onSale", "true");
      }
      if (newFilters.minRating > 0) {
        params.set("rating", String(newFilters.minRating));
      }
      if (newSort !== "featured") {
        params.set("sort", newSort);
      }
      if (newQuery.trim()) {
        params.set("q", newQuery.trim());
      }

      const queryString = params.toString();
      const targetUrl = queryString ? `${pathname}?${queryString}` : pathname;
      router.replace(targetUrl, { scroll: false });
    },
    [pathname, router, minPossiblePrice, maxPossiblePrice]
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setVisibleCount(16);
    updateUrlParams(newFilters, sortOption, searchQuery);
  };

  // Toggle individual subcategory
  const handleSubcategoryToggle = (subSlug: string) => {
    const isCurrentlySelected = filters.subcategories.includes(subSlug);
    const updated = isCurrentlySelected
      ? filters.subcategories.filter((s) => s !== subSlug)
      : [...filters.subcategories, subSlug];

    const newFilters = { ...filters, subcategories: updated };
    setFilters(newFilters);
    setVisibleCount(16);
    updateUrlParams(newFilters, sortOption, searchQuery);
  };

  // Clear all subcategories selection
  const handleClearSubcategories = () => {
    const newFilters = { ...filters, subcategories: [] };
    setFilters(newFilters);
    setVisibleCount(16);
    updateUrlParams(newFilters, sortOption, searchQuery);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSort = e.target.value as SortOption;
    setSortOption(newSort);
    updateUrlParams(filters, newSort, searchQuery);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    updateUrlParams(filters, sortOption, val);
  };

  const handleResetFilters = () => {
    const resetFilters: FilterState = {
      subcategories: [],
      minPrice: minPossiblePrice,
      maxPrice: maxPossiblePrice,
      inStockOnly: false,
      onSaleOnly: false,
      minRating: 0,
    };
    setFilters(resetFilters);
    setSearchQuery("");
    setSortOption("featured");
    setVisibleCount(16);
    router.replace(pathname, { scroll: false });
  };

  // Precompute product counts per subcategory
  const productCountsBySubcategory = useMemo(() => {
    const counts: Record<string, number> = {};
    category.subcategories.forEach((sub) => {
      counts[sub.slug] = initialProducts.filter(
        (p) =>
          p.subcategorySlug === sub.slug ||
          p.subcategory.toLowerCase().includes(sub.slug.toLowerCase())
      ).length;
    });
    return counts;
  }, [category, initialProducts]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((product) => {
      // 1. Multi-Subcategory filter
      if (filters.subcategories.length > 0) {
        const matchesAnySub = filters.subcategories.some(
          (subSlug) =>
            product.subcategorySlug === subSlug ||
            product.subcategory
              .toLowerCase()
              .includes(subSlug.toLowerCase().replace("-", " "))
        );
        if (!matchesAnySub) return false;
      }

      // 2. Price filter
      if (
        product.price < filters.minPrice ||
        product.price > filters.maxPrice
      ) {
        return false;
      }

      // 3. Stock filter
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }

      // 4. Sale filter
      if (filters.onSaleOnly && !product.discount) {
        return false;
      }

      // 5. Rating filter
      if (filters.minRating > 0 && (product.rating || 0) < filters.minRating) {
        return false;
      }

      // 6. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesSub = product.subcategory.toLowerCase().includes(q);
        const matchesBrand = product.brand
          ? product.brand.toLowerCase().includes(q)
          : false;
        if (!matchesName && !matchesSub && !matchesBrand) return false;
      }

      return true;
    });
  }, [initialProducts, filters, searchQuery]);

  // Apply Sorting
  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    switch (sortOption) {
      case "price-asc":
        return list.sort((a, b) => a.price - b.price);
      case "price-desc":
        return list.sort((a, b) => b.price - a.price);
      case "rating-desc":
        return list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case "discount-desc":
        return list.sort((a, b) => {
          const discountA = a.discount ? parseInt(a.discount.replace(/\D/g, "")) : 0;
          const discountB = b.discount ? parseInt(b.discount.replace(/\D/g, "")) : 0;
          return discountB - discountA;
        });
      case "name-asc":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "featured":
      default:
        return list.sort((a, b) => {
          if (a.isFeatured && !b.isFeatured) return -1;
          if (!a.isFeatured && b.isFeatured) return 1;
          return 0;
        });
    }
  }, [filteredProducts, sortOption]);

  const displayedProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = sortedProducts.length > visibleCount;

  const activeFiltersCount =
    filters.subcategories.length +
    (filters.minPrice > minPossiblePrice || filters.maxPrice < maxPossiblePrice ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.onSaleOnly ? 1 : 0) +
    (filters.minRating > 0 ? 1 : 0) +
    (searchQuery.trim() ? 1 : 0);

  return (
    <div className="w-full flex flex-col bg-neutral-100/60 pb-16">
      {/* Category Top Banner & Breadcrumbs */}
      <CategoryHeader
        category={category}
        activeSubcategories={filters.subcategories}
        onToggleSubcategory={handleSubcategoryToggle}
        onClearSubcategories={handleClearSubcategories}
        totalProductsCount={initialProducts.length}
      />

      {/* Main Content Area */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6">
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-6 items-start">
          {/* Left Sticky Filter Sidebar */}
          <CategoryFilterSidebar
            category={category}
            filters={filters}
            onFilterChange={handleFilterChange}
            onResetFilters={handleResetFilters}
            minPossiblePrice={minPossiblePrice}
            maxPossiblePrice={maxPossiblePrice}
            productCountsBySubcategory={productCountsBySubcategory}
            totalProductsCount={initialProducts.length}
            isMobileDrawerOpen={isMobileFilterOpen}
            onCloseMobileDrawer={() => setIsMobileFilterOpen(false)}
          />

          {/* Right Main Product Area */}
          <div className="flex-1 min-w-0 w-full">
            {/* Top Toolbar & Controls */}
            <div className="bg-white rounded-xl border border-neutral-200/90 p-3.5 sm:p-4 mb-4 shadow-2xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                {/* Search in Category */}
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    placeholder={`Search within ${category.name}...`}
                    className="w-full pl-9 pr-8 py-2 text-sm font-medium text-neutral-900 placeholder:text-neutral-500 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DC2626] focus:border-[#DC2626]"
                  />
                  <Search className="w-4 h-4 text-neutral-500 stroke-[2] absolute left-3 top-1/2 -translate-y-1/2" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => handleSearchChange("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black cursor-pointer"
                    >
                      <X className="w-4 h-4 stroke-[2]" />
                    </button>
                  )}
                </div>

                {/* Right Controls: Sort & Layout */}
                <div className="flex items-center gap-2.5 sm:gap-3.5 justify-between sm:justify-end">
                  {/* Mobile Filter Button */}
                  <button
                    type="button"
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-lg text-xs sm:text-sm font-semibold text-neutral-900 transition-colors cursor-pointer"
                  >
                    <SlidersHorizontal className="w-4 h-4 text-[#DC2626] stroke-[2]" />
                    <span>Filter</span>
                    {activeFiltersCount > 0 && (
                      <span className="w-5 h-5 rounded-full bg-[#DC2626] text-white text-[10px] flex items-center justify-center font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </button>

                  {/* Sort Dropdown */}
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="hidden sm:inline text-xs sm:text-[13px] font-medium text-neutral-600 whitespace-nowrap">
                      Sort by:
                    </span>
                    <div className="relative">
                      <select
                        value={sortOption}
                        onChange={handleSortChange}
                        className="appearance-none pl-3 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm font-medium bg-white border border-neutral-300 rounded-lg text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#DC2626] focus:border-[#DC2626] cursor-pointer"
                      >
                        <option value="featured">Featured / Best Match</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="rating-desc">Highest Rated</option>
                        <option value="discount-desc">Biggest Discounts</option>
                        <option value="name-asc">Product Name (A-Z)</option>
                      </select>
                      <ArrowUpDown className="w-3.5 h-3.5 text-neutral-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none stroke-[2]" />
                    </div>
                  </div>

                  {/* View Mode Switcher */}
                  <div className="hidden sm:flex items-center border border-neutral-300 rounded-lg p-0.5 bg-neutral-50 shrink-0">
                    <button
                      type="button"
                      onClick={() => setViewMode("grid")}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        viewMode === "grid"
                          ? "bg-white text-[#DC2626] shadow-xs"
                          : "text-neutral-600 hover:text-black"
                      }`}
                      aria-label="Grid View (4 columns)"
                      title="4 Cards in a Row"
                    >
                      <Grid3X3 className="w-4 h-4 stroke-[2]" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setViewMode("list")}
                      className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                        viewMode === "list"
                          ? "bg-white text-[#DC2626] shadow-xs"
                          : "text-neutral-600 hover:text-black"
                      }`}
                      aria-label="List View"
                      title="Detailed List View"
                    >
                      <List className="w-4 h-4 stroke-[2]" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Status and Active Filter Chips */}
              <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-neutral-100 flex-wrap">
                <div className="text-xs sm:text-[13px] font-normal text-neutral-600">
                  Showing <span className="font-semibold text-neutral-900">{sortedProducts.length}</span> of{" "}
                  <span className="font-semibold text-neutral-900">{initialProducts.length}</span> Products
                  {filters.subcategories.length > 0 && (
                    <span className="text-neutral-500 ml-1">
                      in <span className="font-medium text-[#DC2626]">{filters.subcategories.length} subcategories</span>
                    </span>
                  )}
                </div>

                {/* Active Filter Chips */}
                {activeFiltersCount > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {/* Individual Subcategory Chips */}
                    {filters.subcategories.map((subSlug) => {
                      const subObj = category.subcategories.find((s) => s.slug === subSlug);
                      const subName = subObj?.name || subSlug;

                      return (
                        <span
                          key={subSlug}
                          className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900 border border-neutral-300"
                        >
                          {subName}
                          <button
                            type="button"
                            onClick={() => handleSubcategoryToggle(subSlug)}
                            className="text-neutral-500 hover:text-[#DC2626] cursor-pointer"
                            aria-label={`Remove ${subName} filter`}
                          >
                            <X className="w-3 h-3 stroke-[2]" />
                          </button>
                        </span>
                      );
                    })}

                    {(filters.minPrice > minPossiblePrice || filters.maxPrice < maxPossiblePrice) && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900 border border-neutral-300">
                        Rs. {filters.minPrice.toLocaleString()} - Rs. {filters.maxPrice.toLocaleString()}
                        <button
                          type="button"
                          onClick={() =>
                            handleFilterChange({
                              ...filters,
                              minPrice: minPossiblePrice,
                              maxPrice: maxPossiblePrice,
                            })
                          }
                          className="text-neutral-500 hover:text-[#DC2626] cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[2]" />
                        </button>
                      </span>
                    )}

                    {filters.inStockOnly && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900 border border-neutral-300">
                        In Stock Only
                        <button
                          type="button"
                          onClick={() =>
                            handleFilterChange({ ...filters, inStockOnly: false })
                          }
                          className="text-neutral-500 hover:text-[#DC2626] cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[2]" />
                        </button>
                      </span>
                    )}

                    {filters.onSaleOnly && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900 border border-neutral-300">
                        On Sale Only
                        <button
                          type="button"
                          onClick={() =>
                            handleFilterChange({ ...filters, onSaleOnly: false })
                          }
                          className="text-neutral-500 hover:text-[#DC2626] cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[2]" />
                        </button>
                      </span>
                    )}

                    {filters.minRating > 0 && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900 border border-neutral-300">
                        {filters.minRating}★ & Up
                        <button
                          type="button"
                          onClick={() =>
                            handleFilterChange({ ...filters, minRating: 0 })
                          }
                          className="text-neutral-500 hover:text-[#DC2626] cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[2]" />
                        </button>
                      </span>
                    )}

                    {searchQuery && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-neutral-100 text-neutral-900 border border-neutral-300">
                        &quot;{searchQuery}&quot;
                        <button
                          type="button"
                          onClick={() => handleSearchChange("")}
                          className="text-neutral-500 hover:text-[#DC2626] cursor-pointer"
                        >
                          <X className="w-3 h-3 stroke-[2]" />
                        </button>
                      </span>
                    )}

                    <button
                      type="button"
                      onClick={handleResetFilters}
                      className="text-xs font-medium text-[#DC2626] hover:underline ml-1 cursor-pointer"
                    >
                      Clear All
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 4 Cards in a Row Product Grid */}
            {displayedProducts.length > 0 ? (
              <div
                className={
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-4.5"
                    : "flex flex-col gap-3 sm:gap-4"
                }
              >
                {displayedProducts.map((product) => (
                  <ProductGridCard
                    key={product.id}
                    product={product}
                    viewMode={viewMode}
                  />
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="bg-white rounded-xl border border-neutral-200/90 p-8 sm:p-12 text-center flex flex-col items-center justify-center my-6">
                <div className="w-16 h-16 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center mb-4">
                  <PackageOpen className="w-8 h-8 stroke-[1.5]" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-1.5">
                  No Products Match Your Filters
                </h3>
                <p className="text-sm text-neutral-600 max-w-md mb-6 leading-relaxed">
                  We couldn&apos;t find any products in{" "}
                  <span className="font-semibold text-neutral-900">
                    {category.name}
                  </span>{" "}
                  matching all selected criteria. Try adjusting the price range or clearing some subcategory selections.
                </p>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    Reset All Filters
                  </button>
                  <button
                    type="button"
                    onClick={handleClearSubcategories}
                    className="px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs sm:text-sm font-medium rounded-lg border border-neutral-300 transition-all cursor-pointer"
                  >
                    Show All {category.name}
                  </button>
                </div>
              </div>
            )}

            {/* Load More Button */}
            {hasMore && (
              <div className="mt-8 flex flex-col items-center justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((prev) => prev + 8)}
                  className="px-8 py-2.5 bg-white hover:bg-neutral-50 text-neutral-900 border border-neutral-300 hover:border-[#DC2626] text-sm font-medium rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer hover:text-[#DC2626]"
                >
                  <Sparkles className="w-4 h-4 text-[#DC2626]" />
                  <span>Load More Products ({sortedProducts.length - visibleCount} remaining)</span>
                </button>
                <span className="text-xs text-neutral-500 font-normal mt-2">
                  Showing {displayedProducts.length} of {sortedProducts.length} products
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
