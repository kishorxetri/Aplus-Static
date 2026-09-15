"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistHero() {
  const { totalCount, totalAmount } = useWishlist();

  return (
    <section className="w-full bg-white border-b border-neutral-200 py-3.5 sm:py-6 lg:py-7 font-sans">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 text-[11px] sm:text-[13px] text-neutral-600 mb-1.5 sm:mb-2.5"
        >
          <Link
            href="/"
            className="text-neutral-700 hover:text-[#DC2626] font-semibold transition-colors focus:outline-none focus-visible:underline"
          >
            Home
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-neutral-400 shrink-0" />
          <span className="text-neutral-950 font-bold">Saved Wishlist</span>
        </nav>

        {/* Hero Main Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6">
          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-neutral-950 tracking-tight leading-tight">
              My Saved Wishlist{" "}
              <span className="text-base sm:text-2xl lg:text-3xl font-extrabold text-neutral-950 font-sans">
                ({totalCount} {totalCount === 1 ? "Item" : "Items"})
              </span>
            </h1>

            <p className="mt-1 text-xs sm:text-[15px] lg:text-base text-neutral-800 font-normal leading-relaxed">
              Review your saved sports, recreation, and commercial items. Compare specifications or move items directly to your shopping cart.
            </p>
          </div>

          {/* Quick Stat Pill (Visible when items exist) */}
          {totalCount > 0 && (
            <div className="w-full md:w-auto shrink-0 bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 sm:p-3.5 grid grid-cols-2 md:flex md:items-center gap-3 sm:gap-4 text-center md:text-left">
              <div>
                <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Estimated Value
                </span>
                <span className="text-sm sm:text-lg font-extrabold text-[#DC2626]">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>
              <div className="hidden md:block w-px h-8 bg-neutral-200" />
              <div className="border-l border-neutral-200 md:border-l-0 pl-3 md:pl-0">
                <span className="block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Saved Items
                </span>
                <span className="text-sm sm:text-lg font-extrabold text-neutral-950">
                  {totalCount} Units
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
