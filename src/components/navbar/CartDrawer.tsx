"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ShoppingCart, ArrowRight, Plus, Minus, Trash2 } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: () => void;
}

export default function CartDrawer({
  isOpen,
  onClose,
  onRequestQuote,
}: CartDrawerProps) {
  const {
    items,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    totalCount,
    totalAmount,
  } = useCart();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-200 bg-neutral-50">
          <div className="flex items-center gap-2.5">
            <ShoppingCart className="w-5 h-5 text-neutral-950 stroke-[2.2]" />
            <h2 className="text-base sm:text-lg font-black text-neutral-950 tracking-tight">
              Procurement Cart ({totalCount})
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-neutral-600 hover:text-neutral-950 hover:bg-neutral-200/60 rounded-lg transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 divide-y divide-neutral-200">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center mb-3.5 shadow-inner">
                <ShoppingCart className="w-8 h-8 stroke-[1.8]" />
              </div>
              <h3 className="text-lg font-black text-neutral-950 mb-1.5">
                Your Procurement Cart is Empty
              </h3>
              <p className="text-xs sm:text-sm text-neutral-700 font-medium max-w-xs mb-4 leading-relaxed">
                Explore our featured products, school equipment, or sports catalog to add items.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white text-xs sm:text-sm font-extrabold rounded-lg shadow-xs transition-all cursor-pointer"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-3.5 sm:gap-4">
                <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl bg-neutral-100 border border-neutral-300 overflow-hidden shrink-0">
                  <Image
                    src={item.product.image}
                    alt={item.product.name}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-[14px] sm:text-[15px] font-extrabold text-neutral-950 line-clamp-2 leading-snug">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeFromCart(item.product.id)}
                        aria-label={`Remove ${item.product.name} from cart`}
                        title="Remove item"
                        className="text-neutral-500 hover:text-[#DC2626] p-1 transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 stroke-[2.2]" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-baseline gap-2">
                      <span className="text-[14.5px] sm:text-[15.5px] font-black text-[#DC2626]">
                        Rs. {item.product.price.toLocaleString()}
                        <span className="text-xs font-bold text-neutral-800 ml-1">
                          /unit
                        </span>
                      </span>
                      {item.product.originalPrice && (
                        <span className="text-xs sm:text-[12.5px] text-neutral-500 line-through font-medium">
                          Rs. {item.product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Quantity Plus/Minus Controller and Row Subtotal */}
                  <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-neutral-100">
                    <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                      <button
                        type="button"
                        onClick={() => decreaseQuantity(item.product.id)}
                        aria-label="Decrease count"
                        className="w-7 h-7 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>

                      <span className="w-8 text-center text-xs sm:text-sm font-black text-neutral-950 select-none">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => increaseQuantity(item.product.id)}
                        aria-label="Increase count"
                        className="w-7 h-7 flex items-center justify-center text-neutral-700 hover:text-black hover:bg-neutral-100 active:bg-neutral-200 transition-colors cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                      </button>
                    </div>

                    <span className="text-xs sm:text-sm font-black text-neutral-950">
                      Total: Rs. {(item.product.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout/Quote CTA */}
        {items.length > 0 && (
          <div className="p-5 sm:p-6 border-t border-neutral-200 bg-neutral-50 space-y-3">
            <div className="flex items-center justify-between text-sm sm:text-base">
              <span className="text-neutral-900 font-extrabold">Estimated Subtotal:</span>
              <span className="text-lg sm:text-xl font-black text-[#DC2626]">
                Rs. {totalAmount.toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between text-xs sm:text-[13px] text-neutral-800 font-medium">
              <span className="text-neutral-900 font-bold">Order Type:</span>
              <span className="font-extrabold text-neutral-950">Commercial Wholesale / B2B</span>
            </div>

            <button
              type="button"
              onClick={() => {
                onClose();
                onRequestQuote();
              }}
              className="w-full py-3 px-4 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white text-sm sm:text-[15px] font-black rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            >
              <span>Get a Quote</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <p className="text-xs sm:text-[12.5px] text-center text-neutral-700 font-medium leading-normal">
              Aplus guarantees institutional volume discounts & freight coordination across Nepal.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
