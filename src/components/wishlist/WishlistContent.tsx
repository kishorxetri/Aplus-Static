"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  Trash2,
  Share2,
  ArrowRight,
  Search,
  LayoutGrid,
  List,
  FileText,
  MessageCircle,
  AlertCircle,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Product, FEATURED_PRODUCTS } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import QuoteModal from "@/components/QuoteModal";

export default function WishlistContent() {
  const {
    items,
    isInWishlist,
    removeFromWishlist,
    clearWishlist,
    moveAllToCart,
    moveToCart,
    addToWishlist,
    showToast,
    totalCount,
    totalAmount,
  } = useWishlist();

  const { getItemQuantity } = useCart();

  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState<string>("" );
  const [sortBy, setSortBy] = useState<string>("default");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Modal feedback states
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState<string | undefined>(undefined);
  const [confirmClearOpen, setConfirmClearOpen] = useState(false);

  // Filtered and Sorted items
  const processedItems = useMemo(() => {
    let result = [...items];

    // Search query filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          (item.category && item.category.toLowerCase().includes(q))
      );
    }

    // Sorting
    if (sortBy === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating-desc") {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "name-asc") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [items, searchQuery, sortBy]);

  // Total original price and total calculated savings
  const totalOriginalAmount = useMemo(() => {
    return items.reduce((sum, item) => sum + (item.originalPrice || item.price), 0);
  }, [items]);

  const totalSavings = Math.max(0, totalOriginalAmount - totalAmount);

  // Move All to Cart handler
  const handleMoveAllToCart = () => {
    if (items.length === 0) return;
    moveAllToCart();
  };

  // Move Single Item to Cart handler
  const handleMoveItemToCart = (product: Product) => {
    moveToCart(product);
  };

  // Copy shareable link
  const handleShareWishlist = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      showToast("Wishlist Link Copied", "Shareable wishlist link has been copied to clipboard!", "info");
    }
  };

  // Open quote modal for an item or for all
  const handleOpenQuote = (category?: string) => {
    setSelectedQuoteCategory(category);
    setIsQuoteModalOpen(true);
  };

  // Recommendations when wishlist is empty or below items
  const recommendations = FEATURED_PRODUCTS.slice(0, 4);

  return (
    <>
      <section className="w-full py-4 sm:py-7 lg:py-10 bg-neutral-100/70 font-sans">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          {/* Main Layout Grid: Main Content (Left) + Order Summary (Right) */}
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 xl:gap-8 items-start">
              {/* Left 8 Columns: Controls + Product List/Grid */}
              <div className="lg:col-span-8 space-y-3.5 sm:space-y-5">
                {/* --------------------------------------------------------- */}
                {/* Top Action & Filter Toolbar Card                         */}
                {/* --------------------------------------------------------- */}
                <div className="bg-white rounded-xl border border-neutral-300 shadow-xs p-2.5 sm:p-3.5">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 sm:gap-3">
                    {/* Search inside wishlist */}
                    <div className="relative flex-1 min-w-0">
                      <Search className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search saved items..."
                        className="w-full pl-9 pr-8 py-1.5 sm:py-2 text-xs sm:text-sm bg-neutral-50 hover:bg-neutral-100/60 focus:bg-white border border-neutral-300 rounded-lg text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626] transition-all"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery("")}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold text-neutral-400 hover:text-neutral-700"
                        >
                          Clear
                        </button>
                      )}
                    </div>

                    {/* Toolbar Actions & Sort Row */}
                    <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 justify-between sm:justify-end">
                      {/* Sort Dropdown */}
                      <div className="flex items-center gap-1 flex-1 sm:flex-none min-w-0">
                        <select
                          value={sortBy}
                          onChange={(e) => setSortBy(e.target.value)}
                          className="w-full sm:w-auto py-1.5 px-2 sm:px-2.5 text-xs font-bold text-neutral-800 bg-neutral-50 hover:bg-neutral-100 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 cursor-pointer truncate"
                        >
                          <option value="default">Recently Added</option>
                          <option value="price-asc">Price: Low to High</option>
                          <option value="price-desc">Price: High to Low</option>
                          <option value="rating-desc">Highest Rated</option>
                          <option value="name-asc">Name (A-Z)</option>
                        </select>
                      </div>

                      {/* Share Button */}
                      <button
                        type="button"
                        onClick={handleShareWishlist}
                        className="px-2 sm:px-3 py-1.5 text-xs font-bold text-neutral-700 hover:text-neutral-900 bg-neutral-100 hover:bg-neutral-200/80 border border-neutral-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        title="Share Wishlist Link"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Share</span>
                      </button>

                      {/* Clear Wishlist Button */}
                      <button
                        type="button"
                        onClick={() => setConfirmClearOpen(true)}
                        className="px-2 sm:px-3 py-1.5 text-xs font-bold text-neutral-600 hover:text-[#DC2626] bg-neutral-50 hover:bg-red-50 border border-neutral-200 hover:border-red-200 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
                        title="Clear all saved items"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Clear</span>
                      </button>

                      {/* View Mode Toggle (Grid vs List View) */}
                      <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden p-0.5 bg-neutral-50 shrink-0">
                        <button
                          type="button"
                          onClick={() => setViewMode("grid")}
                          aria-label="Grid View"
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            viewMode === "grid"
                              ? "bg-white text-[#DC2626] shadow-xs font-bold"
                              : "text-neutral-500 hover:text-neutral-800"
                          }`}
                        >
                          <LayoutGrid className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setViewMode("table")}
                          aria-label="List View"
                          className={`p-1.5 rounded transition-colors cursor-pointer ${
                            viewMode === "table"
                              ? "bg-white text-[#DC2626] shadow-xs font-bold"
                              : "text-neutral-500 hover:text-neutral-800"
                          }`}
                        >
                          <List className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* Product Listing (Grid vs List/Table View)                 */}
                {/* --------------------------------------------------------- */}
                {processedItems.length === 0 ? (
                  <div className="bg-white rounded-xl border border-neutral-300 p-6 sm:p-8 text-center space-y-3">
                    <AlertCircle className="w-8 h-8 text-neutral-400 mx-auto" />
                    <h3 className="text-sm sm:text-base font-bold text-neutral-900">
                      No matching items found in your wishlist
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto">
                      Try clearing your search query.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#DC2626] hover:bg-[#b91c1c] rounded-lg shadow-xs transition-colors cursor-pointer"
                    >
                      Reset Search
                    </button>
                  </div>
                ) : viewMode === "grid" ? (
                  /* Modern Responsive Card Grid (1 col on small mobile, 2 col on sm, 3 col on xl) */
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3 sm:gap-3.5">
                    {processedItems.map((product) => {
                      const inCartQty = getItemQuantity(product.id);

                      return (
                        <div
                          key={product.id}
                          className="group bg-white rounded-xl border border-neutral-300 hover:border-neutral-400 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                        >
                          {/* Card Media Header */}
                          <div className="relative w-full aspect-[16/10] sm:aspect-[4/3] bg-neutral-100 overflow-hidden">
                            <Link href={`/product/${product.slug}`} className="block w-full h-full">
                              <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </Link>

                            {/* Discount Badge */}
                            {product.discount && (
                              <span className="absolute top-2.5 left-2.5 bg-[#DC2626] text-white text-[11px] font-extrabold px-2 py-0.5 rounded shadow-xs">
                                {product.discount}
                              </span>
                            )}

                            {/* Remove Button (Top-Right) */}
                            <button
                              type="button"
                              onClick={() => removeFromWishlist(product.id)}
                              aria-label="Remove item"
                              title="Remove from Wishlist"
                              className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 backdrop-blur-xs border border-neutral-300 shadow-xs text-neutral-600 hover:text-[#DC2626] hover:bg-white hover:border-red-200 flex items-center justify-center transition-all cursor-pointer active:scale-90"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>

                            {/* Stock Badge Overlay */}
                            <div className="absolute bottom-2.5 left-2.5">
                              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-white/95 backdrop-blur-xs text-[10.5px] font-bold text-emerald-800 border border-emerald-200 shadow-2xs">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                <span>In Stock</span>
                              </span>
                            </div>
                          </div>

                          {/* Card Content & CTAs */}
                          <div className="p-3 flex flex-col justify-between flex-1">
                            <div>
                              {/* Rating */}
                              {product.rating && (
                                <div className="flex items-center gap-1 text-neutral-700 font-bold text-xs mb-0.5">
                                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                  <span>{product.rating}</span>
                                </div>
                              )}

                              {/* Title */}
                              <Link
                                href={`/product/${product.slug}`}
                                className="block text-[14px] sm:text-[15px] font-extrabold text-neutral-950 hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors"
                              >
                                {product.name}
                              </Link>

                              {/* Price Area: Reduced gap and clean price text */}
                              <div className="flex items-baseline gap-1.5 mt-1 pt-1 border-t border-neutral-100">
                                <span className="text-[14px] sm:text-[15px] font-extrabold text-[#DC2626] tracking-tight">
                                  Rs. {product.price.toLocaleString()}
                                  <span className="text-[11px] font-semibold text-neutral-600 ml-1">
                                    /unit
                                  </span>
                                </span>
                                {product.originalPrice && (
                                  <span className="text-[11px] text-neutral-400 line-through font-medium">
                                    Rs. {product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Card Bottom CTA Actions (2-column on mobile < sm, stacked on sm+) */}
                            <div className="mt-2 pt-1 border-t border-neutral-100 grid grid-cols-2 gap-1.5 sm:flex sm:flex-col sm:space-y-1 sm:gap-0">
                              {/* Primary: Move to Cart */}
                              <button
                                type="button"
                                onClick={() => handleMoveItemToCart(product)}
                                className="w-full py-2 px-2 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white text-xs sm:text-[13px] font-extrabold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                              >
                                <ShoppingCart className="w-3.5 h-3.5 shrink-0" />
                                <span className="truncate">
                                  {inCartQty > 0 ? `In Cart (${inCartQty})` : "Move to Cart"}
                                </span>
                              </button>

                              {/* Secondary: Request Quote */}
                              <button
                                type="button"
                                onClick={() => handleOpenQuote(product.category)}
                                className="w-full py-2 sm:py-1.5 px-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <FileText className="w-3 h-3 text-neutral-600 shrink-0" />
                                <span className="truncate">Get a Quote</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  /* List / Table View (Mobile Card List on <sm, Full Table on sm+) */
                  <div className="space-y-3">
                    {/* Mobile-Optimized Card List (< sm) */}
                    <div className="block sm:hidden space-y-2.5">
                      {processedItems.map((product) => {
                        const inCartQty = getItemQuantity(product.id);

                        return (
                          <div
                            key={product.id}
                            className="bg-white rounded-xl border border-neutral-300 p-3 shadow-xs space-y-2.5"
                          >
                            <div className="flex gap-3 items-center">
                              {/* Thumbnail */}
                              <div className="relative w-18 h-18 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                                <Link href={`/product/${product.slug}`} className="block w-full h-full">
                                  <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    sizes="72px"
                                    className="object-cover"
                                  />
                                </Link>
                              </div>

                              {/* Content */}
                              <div className="flex-1 min-w-0">
                                <Link
                                  href={`/product/${product.slug}`}
                                  className="font-extrabold text-neutral-950 text-xs hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors"
                                >
                                  {product.name}
                                </Link>

                                <div className="flex items-baseline gap-1.5 mt-1">
                                  <span className="text-[13.5px] font-bold text-[#DC2626]">
                                    Rs. {product.price.toLocaleString()}
                                    <span className="text-[11px] font-normal text-neutral-600 ml-0.5">
                                      /unit
                                    </span>
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-[10.5px] text-neutral-400 line-through font-normal">
                                      Rs. {product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>

                                <div className="mt-1">
                                  <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-50 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                    <span>In Stock</span>
                                  </span>
                                </div>
                              </div>

                              {/* Remove Icon */}
                              <button
                                type="button"
                                onClick={() => removeFromWishlist(product.id)}
                                className="p-2 text-neutral-400 hover:text-[#DC2626] bg-neutral-50 hover:bg-red-50 rounded-lg border border-neutral-200 transition-colors shrink-0"
                                title="Remove"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Mobile Action Buttons Row */}
                            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-neutral-100">
                              <button
                                type="button"
                                onClick={() => handleMoveItemToCart(product)}
                                className="w-full py-1.5 px-2 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs font-extrabold rounded-lg shadow-xs flex items-center justify-center gap-1 transition-colors"
                              >
                                <ShoppingCart className="w-3.5 h-3.5" />
                                <span className="truncate">
                                  {inCartQty > 0 ? `In Cart (${inCartQty})` : "Move to Cart"}
                                </span>
                              </button>

                              <button
                                type="button"
                                onClick={() => handleOpenQuote(product.category)}
                                className="w-full py-1.5 px-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-lg transition-colors flex items-center justify-center gap-1"
                              >
                                <FileText className="w-3 h-3 text-neutral-600" />
                                <span className="truncate">Get Quote</span>
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Desktop Comparison Table (sm+) */}
                    <div className="hidden sm:block bg-white rounded-xl border border-neutral-300 shadow-xs overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="border-b border-neutral-200 bg-neutral-50/80 text-[11.5px] font-black text-neutral-700 uppercase tracking-wider">
                              <th className="py-3 px-4">Product Details</th>
                              <th className="py-3 px-4">Stock Status</th>
                              <th className="py-3 px-4">Unit Price</th>
                              <th className="py-3 px-4 text-right">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 text-sm">
                            {processedItems.map((product) => {
                              const inCartQty = getItemQuantity(product.id);

                              return (
                                <tr key={product.id} className="hover:bg-neutral-50/60 transition-colors">
                                  {/* Product Info */}
                                  <td className="py-3.5 px-4 min-w-[280px]">
                                    <div className="flex items-center gap-3">
                                      <div className="relative w-14 h-14 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                                        <Image
                                          src={product.image}
                                          alt={product.name}
                                          fill
                                          sizes="56px"
                                          className="object-cover"
                                        />
                                      </div>
                                      <div>
                                        <Link
                                          href={`/product/${product.slug}`}
                                          className="font-extrabold text-neutral-950 hover:text-[#DC2626] line-clamp-1 transition-colors text-[14px]"
                                        >
                                          {product.name}
                                        </Link>
                                        <span className="text-xs text-neutral-500 block">
                                          ID: {product.id}
                                        </span>
                                      </div>
                                    </div>
                                  </td>

                                  {/* Stock Status */}
                                  <td className="py-3.5 px-4 whitespace-nowrap">
                                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-emerald-50 text-[11px] font-bold text-emerald-800 border border-emerald-200">
                                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                      <span>In Stock</span>
                                    </span>
                                  </td>

                                  {/* Price */}
                                  <td className="py-3.5 px-4 whitespace-nowrap">
                                    <div>
                                      <span className="text-[15px] font-bold text-[#DC2626]">
                                        Rs. {product.price.toLocaleString()}
                                        <span className="text-xs font-normal text-neutral-600 ml-1">
                                          /unit
                                        </span>
                                      </span>
                                      {product.originalPrice && (
                                        <span className="text-xs text-neutral-400 line-through block font-normal">
                                          Rs. {product.originalPrice.toLocaleString()}
                                        </span>
                                      )}
                                    </div>
                                  </td>

                                  {/* Actions */}
                                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                                    <div className="flex items-center justify-end gap-2">
                                      <button
                                        type="button"
                                        onClick={() => handleMoveItemToCart(product)}
                                        className="px-3 py-1.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs font-extrabold rounded-md shadow-xs flex items-center gap-1 transition-colors cursor-pointer"
                                      >
                                        <ShoppingCart className="w-3.5 h-3.5" />
                                        <span>{inCartQty > 0 ? `In Cart (${inCartQty})` : "Add"}</span>
                                      </button>

                                      <button
                                        type="button"
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="p-1.5 text-neutral-500 hover:text-[#DC2626] hover:bg-neutral-100 rounded-md transition-colors cursor-pointer"
                                        title="Remove"
                                      >
                                        <Trash2 className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* --------------------------------------------------------- */}
              {/* Right 4 Columns: Sticky Order / Procurement Summary Box   */}
              {/* --------------------------------------------------------- */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-5 lg:sticky lg:top-20">
                {/* Summary Card */}
                <div className="bg-white rounded-xl border border-neutral-300 shadow-sm p-3.5 sm:p-6 space-y-3.5 sm:space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <h3 className="text-base sm:text-lg font-black text-neutral-950 tracking-tight">
                      Wishlist Summary
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-red-50 text-[#DC2626] text-xs font-extrabold">
                      {totalCount} {totalCount === 1 ? "Product" : "Products"}
                    </span>
                  </div>

                  {/* Pricing Breakdown */}
                  <div className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm">
                    <div className="flex items-center justify-between text-neutral-950 font-bold">
                      <span className="text-neutral-950">Total List Value:</span>
                      <span className="font-extrabold text-neutral-950 text-xs sm:text-sm">
                        Rs. {totalOriginalAmount.toLocaleString()}
                      </span>
                    </div>

                    {totalSavings > 0 && (
                      <div className="flex items-center justify-between text-emerald-800 font-bold">
                        <span>Direct Institutional Savings:</span>
                        <span className="font-extrabold text-xs sm:text-sm">- Rs. {totalSavings.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between text-neutral-950 font-bold">
                      <span className="text-neutral-950">Delivery Coverage:</span>
                      <span className="font-bold text-neutral-950">All 7 Provinces</span>
                    </div>

                    <div className="flex items-center justify-between text-neutral-950 font-bold">
                      <span className="text-neutral-950">Commercial VAT Billing:</span>
                      <span className="font-bold text-neutral-950">Available</span>
                    </div>

                    <div className="pt-2.5 sm:pt-3 border-t border-neutral-300 flex items-baseline justify-between">
                      <span className="text-xs sm:text-base font-black text-neutral-950">
                        Estimated Total:
                      </span>
                      <div className="text-right">
                        <span className="text-base sm:text-xl font-black text-[#DC2626]">
                          Rs. {totalAmount.toLocaleString()}
                        </span>
                        <span className="text-[10.5px] sm:text-[11px] font-semibold text-neutral-600 block">
                          Excl. customized freight
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* High Impact Action CTAs (Arranged in 2 lines) */}
                  <div className="pt-1 sm:pt-2 space-y-2">
                    {/* Line 1: Primary Move All to Cart */}
                    <button
                      type="button"
                      onClick={handleMoveAllToCart}
                      className="w-full py-2.5 sm:py-3 px-3 sm:px-4 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white text-xs sm:text-[15px] font-black rounded-lg shadow-sm flex items-center justify-center gap-2 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      <span>Move All Items to Cart</span>
                    </button>

                    {/* Line 2: Secondary (Get a Quote) & Tertiary (Inquire via WhatsApp) */}
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleOpenQuote()}
                        className="w-full py-2 sm:py-2.5 px-2 bg-neutral-950 hover:bg-neutral-800 active:scale-[0.98] text-white text-xs sm:text-[13px] font-extrabold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-800 text-center"
                      >
                        <FileText className="w-3.5 h-3.5 shrink-0" />
                        <span className="truncate">Get a Quote</span>
                      </button>

                      <a
                        href="https://wa.me/9779851000000?text=Hello%2C%20I%20would%20like%20to%20request%20an%20institutional%20quotation%20for%20my%20saved%20wishlist%20items."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 sm:py-2.5 px-2 bg-[#16a34a] hover:bg-[#15803d] active:scale-[0.98] text-white text-xs sm:text-[13px] font-extrabold rounded-lg shadow-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white shrink-0" />
                        <span className="truncate">WhatsApp</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================= */
            /* Empty State Display when 0 items exist in Wishlist            */
            /* ============================================================= */
            <div className="space-y-8 sm:space-y-12">
              <div className="bg-white rounded-2xl border border-neutral-300 shadow-sm p-6 sm:p-12 lg:p-14 text-center max-w-2xl mx-auto space-y-5">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-red-50 text-[#DC2626] border-2 border-red-200 flex items-center justify-center mx-auto shadow-inner">
                  <Heart className="w-9 h-9 sm:w-11 sm:h-11 fill-red-100 stroke-[1.8]" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                    Your Wishlist is Empty
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-900 font-medium max-w-lg mx-auto leading-relaxed">
                    You haven&apos;t saved any products yet. Browse our catalog and click the heart icon on any item to save it here for future planning.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white text-sm sm:text-base font-bold rounded-lg shadow-sm transition-all text-center"
                  >
                    Browse Featured Products
                  </Link>
                  <Link
                    href="/category/sports-equipment"
                    className="px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-sm sm:text-base font-bold rounded-lg border border-neutral-300 transition-colors text-center"
                  >
                    Sports Equipment
                  </Link>
                  <Link
                    href="/category/kids-educational"
                    className="px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-sm sm:text-base font-bold rounded-lg border border-neutral-300 transition-colors text-center"
                  >
                    Montessori & Toys
                  </Link>
                </div>
              </div>

              {/* Recommended Items Strip */}
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base sm:text-xl font-black text-neutral-950 tracking-tight">
                      Recommended Commercial Supplies
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-600 hidden sm:block">
                      Popular certified products frequently ordered by schools, clubs, and developers.
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="text-xs sm:text-sm font-bold text-[#DC2626] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>View All</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
                  {recommendations.map((prod) => {
                    const isSaved = isInWishlist(prod.id);

                    return (
                      <div
                        key={prod.id}
                        className="group bg-white rounded-xl border border-neutral-300 hover:border-neutral-400 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col justify-between"
                      >
                        <div>
                          <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
                            <Link href={`/product/${prod.slug}`} className="block w-full h-full">
                              <Image
                                src={prod.image}
                                alt={prod.name}
                                fill
                                sizes="(max-width: 640px) 50vw, 25vw"
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </Link>

                            {/* Quick Wishlist Save / Toggle Button */}
                            <button
                              type="button"
                              onClick={() => {
                                if (!isSaved) {
                                  addToWishlist(prod);
                                } else {
                                  removeFromWishlist(prod.id);
                                }
                              }}
                              className={`absolute top-2 right-2 sm:top-2.5 sm:right-2.5 w-7 h-7 sm:w-8 sm:h-8 rounded-full border flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
                                isSaved
                                  ? "bg-red-50 border-red-200 text-[#DC2626]"
                                  : "bg-white/95 border-neutral-300 text-neutral-700 hover:text-[#DC2626]"
                              }`}
                              title={isSaved ? "Remove from wishlist" : "Add to wishlist"}
                            >
                              <Heart
                                className={`w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2] ${
                                  isSaved ? "fill-[#DC2626]" : ""
                                }`}
                              />
                            </button>
                          </div>

                          <div className="p-2.5 sm:p-3.5 space-y-1">
                            <Link
                              href={`/product/${prod.slug}`}
                              className="block text-xs sm:text-[14.5px] font-semibold text-neutral-950 hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors"
                            >
                              {prod.name}
                            </Link>
                            <div className="text-xs sm:text-[15px] font-extrabold text-[#DC2626]">
                              Rs. {prod.price.toLocaleString()}
                              <span className="text-xs font-semibold text-neutral-600 ml-1">
                                /unit
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-2.5 sm:p-3.5 pt-0">
                          <button
                            type="button"
                            onClick={() => {
                              if (!isSaved) {
                                addToWishlist(prod);
                              }
                            }}
                            disabled={isSaved}
                            className={`w-full py-1.5 px-2 text-[11px] sm:text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
                              isSaved
                                ? "bg-red-50 text-[#DC2626] border border-red-200 cursor-default"
                                : "bg-neutral-100 hover:bg-[#DC2626] hover:text-white text-neutral-800 cursor-pointer"
                            }`}
                          >
                            <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isSaved ? "fill-[#DC2626]" : ""}`} />
                            <span>{isSaved ? "Saved in Wishlist" : "Save to Wishlist"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Confirmation Modal for Clear Wishlist */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-300 shadow-2xl p-5 sm:p-6 max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-150">
            <div className="w-12 h-12 rounded-full bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center mx-auto">
              <Trash2 className="w-6 h-6" />
            </div>
            <div className="text-center space-y-1.5">
              <h4 className="text-base sm:text-lg font-black text-neutral-950">Clear Entire Wishlist?</h4>
              <p className="text-xs sm:text-sm text-neutral-600">
                Are you sure you want to remove all {totalCount} saved items from your wishlist? This action cannot be undone.
              </p>
            </div>
            <div className="flex items-center gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmClearOpen(false)}
                className="flex-1 py-2 text-xs sm:text-sm font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearWishlist();
                  setConfirmClearOpen(false);
                }}
                className="flex-1 py-2 text-xs sm:text-sm font-black bg-[#DC2626] hover:bg-[#b91c1c] text-white rounded-lg transition-colors cursor-pointer"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Embedded Quote Modal for Bulk Inquiries */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultCategory={selectedQuoteCategory}
      />
    </>
  );
}

