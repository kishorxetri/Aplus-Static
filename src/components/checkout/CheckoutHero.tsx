"use client";

import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck, Lock, CheckCircle2 } from "lucide-react";

interface CheckoutHeroProps {
  currentStep?: 1 | 2 | 3;
}

export default function CheckoutHero({ currentStep = 2 }: CheckoutHeroProps) {
  return (
    <section className="w-full bg-white border-b border-neutral-200 py-3.5 sm:py-5 font-sans">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-1.5 text-xs sm:text-sm text-neutral-700 mb-2 sm:mb-2.5"
        >
          <Link
            href="/"
            className="text-neutral-800 hover:text-[#DC2626] font-semibold transition-colors focus:outline-none focus-visible:underline"
          >
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <Link
            href="/cart"
            className="text-neutral-800 hover:text-[#DC2626] font-semibold transition-colors focus:outline-none focus-visible:underline"
          >
            Shopping Cart
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
          <span className="text-neutral-950 font-bold">Checkout</span>
        </nav>

        {/* Hero Content & Step Indicator */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-neutral-950 tracking-tight">
                Commercial Checkout
              </h1>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                <Lock className="w-3.5 h-3.5 text-emerald-700 stroke-[2.2]" />
                <span>SSL Encrypted</span>
              </span>
            </div>
            <p className="mt-1 text-xs sm:text-sm lg:text-[15px] text-neutral-800 font-normal">
              Enter your shipping destination to confirm your order with Cash on Delivery (COD).
            </p>
          </div>

          {/* Stepper Wizard Indicator */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 shrink-0">
            {/* Step 1 */}
            <Link
              href="/cart"
              className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-700 hover:text-neutral-950 transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
                ✓
              </div>
              <span className="hidden sm:inline">1. Cart</span>
            </Link>

            <div className="w-6 sm:w-10 h-0.5 bg-neutral-300" />

            {/* Step 2 */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-neutral-950">
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep >= 2 ? "bg-[#DC2626] text-white shadow-xs" : "bg-neutral-200 text-neutral-600"
              }`}>
                2
              </div>
              <span>2. Delivery & Payment</span>
            </div>

            <div className="w-6 sm:w-10 h-0.5 bg-neutral-300" />

            {/* Step 3 */}
            <div className={`flex items-center gap-2 text-xs sm:text-sm font-bold ${
              currentStep === 3 ? "text-neutral-950 font-bold" : "text-neutral-500"
            }`}>
              <div className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep === 3 ? "bg-emerald-600 text-white" : "bg-neutral-200 text-neutral-600"
              }`}>
                3
              </div>
              <span className="hidden sm:inline">3. Confirmation</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
