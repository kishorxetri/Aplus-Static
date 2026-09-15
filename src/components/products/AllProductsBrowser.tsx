"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import {
  Search,
  ArrowUpDown,
  Grid3X3,
  List,
  X,
  PackageOpen,
  Trophy,
  Puzzle,
  Tent,
  Sprout,
  Dumbbell,
  GraduationCap,
  Layers,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import { MAIN_CATEGORIES } from "@/data/categories";
import { ALL_PRODUCTS, Product } from "@/data/products";
import ProductGridCard from "@/components/category/ProductGridCard";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "sports-equipment": Trophy,
  "kids-educational": Puzzle,
  "playground-recreation": Tent,
  "artificial-turf": Sprout,
  "commercial-fitness": Dumbbell,
  "kindergarten-furniture": GraduationCap,
};

type SortOption =
  | "featured"
  | "price-asc"
  | "price-desc"
  | "rating-desc"
  | "discount-desc"
  | "name-asc";

export default function AllProductsBrowser() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [onSaleOnly, setOnSaleOnly] = useState<boolean>(false);
  const [sortOption, setSortOption] = useState<SortOption>("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(20); // 20 items per page = 4 rows of 5 cards

  const gridTopRef = useRef<HTMLDivElement>(null);

  // Filter products
  const filteredProducts = useMemo(() => {
    return ALL_PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== "all") {
        if (product.categorySlug !== selectedCategory) return false;
      }

      // In stock
      if (inStockOnly && !product.inStock) return false;

      // On sale
      if (onSaleOnly && !product.discount) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(q);
        const matchesCat = product.category.toLowerCase().includes(q);
        const matchesSub = product.subcategory.toLowerCase().includes(q);
        const matchesBrand = product.brand
          ? product.brand.toLowerCase().includes(q)
          : false;
        if (!matchesName && !matchesCat && !matchesSub && !matchesBrand)
          return false;
      }

      return true;
    });
  }, [selectedCategory, inStockOnly, onSaleOnly, searchQuery]);

  // Sort products
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

  // Total pages calculation
  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / itemsPerPage));

  // Reset page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchQuery, inStockOnly, onSaleOnly, sortOption, itemsPerPage]);

  // Paginated slice
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, sortedProducts.length);
  const displayedProducts = sortedProducts.slice(startIndex, endIndex);

  // Smooth scroll to top of product grid when changing pages
  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setCurrentPage(newPage);
      if (gridTopRef.current) {
        const yOffset = -90;
        const element = gridTopRef.current;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }
  };

  // Generate intelligent pagination range with ellipsis
  const paginationRange = useMemo(() => {
    const delta = 2;
    const range: (number | string)[] = [];
    const left = currentPage - delta;
    const right = currentPage + delta;

    let l: number | null = null;

    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || (i >= left && i <= right)) {
        if (l) {
          if (i - l === 2) {
            range.push(l + 1);
          } else if (i - l !== 1) {
            range.push("...");
          }
        }
        range.push(i);
        l = i;
      }
    }
    return range;
  }, [currentPage, totalPages]);

  return (
    <div className="w-full" ref={gridTopRef}>
      {/* Category Pills Header */}
      <div className="bg-white border-b border-neutral-200 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1">
            <button
              type="button"
              onClick={() => setSelectedCategory("all")}
              className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#DC2626] text-white shadow-xs font-semibold"
                  : "bg-white text-neutral-800 hover:text-[#DC2626] hover:bg-neutral-100 border border-neutral-300"
              }`}
            >
              <Layers className="w-4 h-4 stroke-[2]" />
              <span>All Products ({ALL_PRODUCTS.length})</span>
            </button>

            {MAIN_CATEGORIES.map((cat) => {
              const Icon = CATEGORY_ICONS[cat.id] || Trophy;
              const isSelected = selectedCategory === cat.slug;
              const count = ALL_PRODUCTS.filter(
                (p) => p.categorySlug === cat.slug
              ).length;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isSelected
                      ? "bg-[#DC2626] text-white shadow-xs font-semibold ring-2 ring-[#DC2626]/20"
                      : "bg-white text-neutral-800 hover:text-[#DC2626] hover:bg-neutral-100 border border-neutral-300"
                  }`}
                >
                  <Icon className="w-4 h-4 stroke-[2]" />
                  <span>{cat.name}</span>
                  <span
                    className={`text-[11px] px-1.5 py-0.2 rounded font-normal ${
                      isSelected
                        ? "bg-white/20 text-white font-medium"
                        : "bg-neutral-100 text-neutral-600 border border-neutral-200"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid & Filters Container */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Toolbar */}
        <div className="bg-white rounded-xl border border-neutral-200/90 p-4 mb-5 shadow-2xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search across all commercial equipment..."
                className="w-full pl-9 pr-8 py-2 text-xs sm:text-sm font-medium text-neutral-900 placeholder:text-neutral-500 bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-[#DC2626] focus:border-[#DC2626]"
              />
              <Search className="w-4 h-4 text-neutral-500 stroke-[2] absolute left-3 top-1/2 -translate-y-1/2" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-black cursor-pointer"
                >
                  <X className="w-4 h-4 stroke-[2]" />
                </button>
              )}
            </div>

            {/* Checkbox Toggles, Sort & Per-Page Controls */}
            <div className="flex items-center gap-3 sm:gap-4 flex-wrap justify-between md:justify-end">
              <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={inStockOnly}
                  onChange={(e) => setInStockOnly(e.target.checked)}
                  className="w-4 h-4 text-[#DC2626] rounded border-neutral-300 focus:ring-[#DC2626] accent-[#DC2626]"
                />
                <span>In Stock Only</span>
              </label>

              <label className="flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={onSaleOnly}
                  onChange={(e) => setOnSaleOnly(e.target.checked)}
                  className="w-4 h-4 text-[#DC2626] rounded border-neutral-300 focus:ring-[#DC2626] accent-[#DC2626]"
                />
                <span>On Sale</span>
              </label>

              {/* Items Per Page Selector */}
              <div className="hidden sm:flex items-center gap-1.5 text-xs sm:text-sm font-medium text-neutral-600">
                <span>Per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-2 py-1 text-xs font-medium bg-white border border-neutral-300 rounded-md text-neutral-900 focus:outline-none focus:ring-1 focus:ring-[#DC2626] cursor-pointer"
                >
                  <option value={15}>15</option>
                  <option value={20}>20 (5×4)</option>
                  <option value={30}>30</option>
                  <option value={50}>50</option>
                </select>
              </div>

              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-medium text-neutral-600 whitespace-nowrap hidden sm:inline">
                  Sort:
                </span>
                <div className="relative">
                  <select
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
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

              {/* View Switcher */}
              <div className="hidden sm:flex items-center border border-neutral-300 rounded-lg p-0.5 bg-neutral-50">
                <button
                  type="button"
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                    viewMode === "grid"
                      ? "bg-white text-[#DC2626] shadow-xs"
                      : "text-neutral-600 hover:text-black"
                  }`}
                  aria-label="Grid View (5 Columns)"
                  title="5 Cards in a Row"
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

          {/* Results Summary Bar */}
          <div className="flex items-center justify-between gap-3 pt-3 mt-3 border-t border-neutral-100 text-xs sm:text-[13px] text-neutral-600">
            <div>
              Showing <span className="font-semibold text-neutral-900">{sortedProducts.length > 0 ? startIndex + 1 : 0}–{endIndex}</span> of{" "}
              <span className="font-semibold text-neutral-900">{sortedProducts.length}</span> Products
              {selectedCategory !== "all" && (
                <span className="ml-1 text-neutral-500">
                  in{" "}
                  <span className="font-medium text-[#DC2626]">
                    {MAIN_CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                  </span>
                </span>
              )}
            </div>

            {totalPages > 1 && (
              <div className="font-medium text-neutral-600">
                Page <span className="font-semibold text-neutral-900">{currentPage}</span> of{" "}
                <span className="font-semibold text-neutral-900">{totalPages}</span>
              </div>
            )}
          </div>
        </div>

        {/* 5 Cards in a Row Product Grid (xl:grid-cols-5) */}
        {displayedProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4"
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
          <div className="bg-white rounded-xl border border-neutral-200/90 p-12 text-center flex flex-col items-center justify-center my-6">
            <div className="w-16 h-16 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center mb-4">
              <PackageOpen className="w-8 h-8 stroke-[1.5]" />
            </div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-1.5">
              No Products Found
            </h3>
            <p className="text-sm font-normal text-neutral-600 max-w-md mb-6 leading-relaxed">
              We couldn&apos;t find any items matching your current filters or query.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setSearchQuery("");
                setInStockOnly(false);
                setOnSaleOnly(false);
              }}
              className="px-5 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-sm font-semibold rounded-lg shadow-sm transition-all cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Professional Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl border border-neutral-200/90 px-4 sm:px-6 py-4 shadow-2xs">
            {/* Left page info */}
            <div className="text-xs sm:text-sm text-neutral-600 font-normal">
              Showing{" "}
              <span className="font-semibold text-neutral-900">
                {startIndex + 1}–{endIndex}
              </span>{" "}
              of <span className="font-semibold text-neutral-900">{sortedProducts.length}</span> items
            </div>

            {/* Pagination Button Group */}
            <nav aria-label="Product pagination" className="flex items-center gap-1.5">
              {/* First Page button */}
              <button
                type="button"
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="First Page"
                aria-label="Go to first page"
              >
                <ChevronsLeft className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Previous button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors cursor-pointer"
                aria-label="Go to previous page"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2]" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              {/* Page Number Buttons */}
              <div className="flex items-center gap-1">
                {paginationRange.map((pageItem, idx) => {
                  if (pageItem === "...") {
                    return (
                      <span
                        key={`ellipsis-${idx}`}
                        className="px-2 py-1 text-xs text-neutral-400 font-medium select-none"
                      >
                        ...
                      </span>
                    );
                  }

                  const pageNumber = pageItem as number;
                  const isActive = pageNumber === currentPage;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => handlePageChange(pageNumber)}
                      className={`min-w-[36px] h-9 px-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all cursor-pointer flex items-center justify-center ${
                        isActive
                          ? "bg-[#DC2626] text-white font-semibold shadow-xs"
                          : "border border-neutral-200 text-neutral-800 hover:bg-neutral-100 hover:text-black bg-white"
                      }`}
                      aria-label={`Page ${pageNumber}`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      {pageNumber}
                    </button>
                  );
                })}
              </div>

              {/* Next button */}
              <button
                type="button"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-neutral-200 text-xs sm:text-sm font-medium text-neutral-700 hover:bg-neutral-100 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors cursor-pointer"
                aria-label="Go to next page"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4 stroke-[2]" />
              </button>

              {/* Last Page button */}
              <button
                type="button"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-neutral-200 text-neutral-700 hover:bg-neutral-100 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent transition-colors cursor-pointer"
                title="Last Page"
                aria-label="Go to last page"
              >
                <ChevronsRight className="w-4 h-4 stroke-[2]" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
