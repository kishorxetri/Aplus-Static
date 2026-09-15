"use client";

import Link from "next/link";
import { ChevronRight, ShoppingBag, ShieldCheck, Truck } from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function CartHero() {
  const { totalCount, totalAmount } = useCart();

  return (
    <section className="w-full bg-white border-b border-neutral-200 py-3.5 sm:py-6 lg:py-7 font-sans">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-700 mb-2 sm:mb-3"
        >
          <Link
            href="/"
            className="text-neutral-800 hover:text-[#DC2626] font-semibold transition-colors focus:outline-none focus-visible:underline"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="text-neutral-950 font-bold">Shopping Cart</span>
        </nav>

        {/* Hero Header Content */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 sm:gap-6">
          <div className="max-w-3xl">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-950 tracking-tight leading-tight">
              Shopping Cart{" "}
              <span className="text-base sm:text-xl lg:text-2xl font-bold text-neutral-700 font-sans">
                ({totalCount} {totalCount === 1 ? "Item" : "Items"})
              </span>
            </h1>

            <p className="mt-1 text-xs sm:text-sm lg:text-base text-neutral-800 font-normal leading-relaxed">
              Review your selected items, verify order quantities, and proceed to checkout with Cash on Delivery (COD).
            </p>
          </div>

          {/* Quick Metrics Badge */}
          {totalCount > 0 && (
            <div className="w-full md:w-auto shrink-0 bg-neutral-50 border border-neutral-300 rounded-xl p-3 sm:p-4 flex items-center justify-between md:justify-start gap-5">
              <div className="text-left">
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Total Items
                </span>
                <span className="text-base sm:text-lg font-bold text-neutral-950">
                  {totalCount} Units
                </span>
              </div>
              <div className="w-px h-8 bg-neutral-300" />
              <div className="text-right md:text-left">
                <span className="block text-xs font-bold uppercase tracking-wider text-neutral-700">
                  Subtotal (VAT Inc.)
                </span>
                <span className="text-base sm:text-lg font-bold text-[#DC2626]">
                  Rs. {totalAmount.toLocaleString()}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
