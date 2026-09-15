"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ShoppingCart,
  Trash2,
  Heart,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Tag,
  CheckCircle2,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { Product, FEATURED_PRODUCTS } from "@/data/products";
import { useCart, CartItem } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export default function CartContent() {
  const router = useRouter();
  const {
    items,
    updateQuantity,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
    totalCount,
    totalAmount,
  } = useCart();

  const { addToWishlist, isInWishlist, showToast: showWishlistToast } = useWishlist();

  // Selected items state for selective checkout
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Automatically initialize/sync selectedIds when items change
  React.useEffect(() => {
    setSelectedIds((prev) => {
      const valid = prev.filter((id) => items.some((item) => item.product.id === id));
      if (valid.length === 0 && items.length > 0) {
        return items.map((i) => i.product.id);
      }
      return valid;
    });
  }, [items]);

  const toggleSelectItem = (productId: string) => {
    setSelectedIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  const isAllSelected = items.length > 0 && selectedIds.length === items.length;

  const toggleSelectAll = () => {
    if (isAllSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(items.map((i) => i.product.id));
    }
  };

  // Local states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discountPercent: number;
    discountAmount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");
  const [couponSuccess, setCouponSuccess] = useState("");

  const [confirmClearOpen, setConfirmClearOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [checkoutSubmitting, setCheckoutSubmitting] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Form states for simple checkout
  const [buyerInfo, setBuyerInfo] = useState({
    fullName: "",
    phone: "",
    email: "",
    company: "",
    vatNumber: "",
    province: "Bagmati Province (Kathmandu Valley)",
    address: "",
    notes: "",
    paymentMethod: "bank_transfer",
  });

  // Selected items for checkout
  const selectedItems = useMemo(() => {
    return items.filter((item) => selectedIds.includes(item.product.id));
  }, [items, selectedIds]);

  const selectedCount = selectedItems.reduce((sum, item) => sum + item.quantity, 0);

  // Calculate selected list price and total savings
  const selectedOriginalAmount = useMemo(() => {
    return selectedItems.reduce((sum, item) => {
      const orig = item.product.originalPrice || item.product.price;
      return sum + orig * item.quantity;
    }, 0);
  }, [selectedItems]);

  const selectedAmount = useMemo(() => {
    return selectedItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }, [selectedItems]);

  const directProductSavings = Math.max(0, selectedOriginalAmount - selectedAmount);

  // Coupon discount calculation based on selected amount
  const couponDiscount = appliedCoupon
    ? (selectedAmount * appliedCoupon.discountPercent) / 100
    : 0;
  const finalPayableTotal = Math.max(0, selectedAmount - couponDiscount);

  // Estimated VAT (13% inclusive)
  const vatAmount = Math.round((finalPayableTotal * 13) / 113);
  const baseTaxableAmount = finalPayableTotal - vatAmount;

  // Handle coupon apply
  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError("");
    setCouponSuccess("");

    const code = couponCode.trim().toUpperCase();
    if (!code) {
      setCouponError("Please enter a voucher code.");
      return;
    }

    if (code === "APLUS10" || code === "WELCOME10") {
      const discountPercent = 10;
      const discountAmount = (selectedAmount * discountPercent) / 100;
      setAppliedCoupon({ code, discountPercent, discountAmount });
      setCouponSuccess(`Voucher "${code}" applied successfully! 10% discount added.`);
      setCouponCode("");
    } else if (code === "TENDER2026" || code === "B2B5") {
      const discountPercent = 5;
      const discountAmount = (selectedAmount * discountPercent) / 100;
      setAppliedCoupon({ code, discountPercent, discountAmount });
      setCouponSuccess(`Institutional voucher "${code}" applied! 5% discount added.`);
      setCouponCode("");
    } else {
      setCouponError("Invalid voucher code. Try 'APLUS10' or 'TENDER2026'.");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponSuccess("");
    setCouponError("");
  };

  // Move item to wishlist
  const handleMoveToWishlist = (product: Product) => {
    addToWishlist(product);
    removeFromCart(product.id);
  };

  // Recommendations for empty cart or bottom strip
  const recommendations = FEATURED_PRODUCTS.slice(0, 4);

  // Handle Checkout submission simulation
  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) return;
    setCheckoutSubmitting(true);
    setTimeout(() => {
      setCheckoutSubmitting(false);
      setCheckoutSuccess(true);
      // Remove only checked out items
      selectedIds.forEach((id) => removeFromCart(id));
      setSelectedIds([]);
    }, 1200);
  };

  return (
    <>
      <section className="w-full pt-4 pb-24 sm:pt-6 sm:pb-28 lg:py-10 bg-neutral-100/70 font-sans">
        <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-8">
          {items.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 xl:gap-8 items-start">
              {/* ========================================================= */}
              {/* LEFT 8 COLUMNS: Cart Item Table & Product List            */}
              {/* ========================================================= */}
              <div className="lg:col-span-8 space-y-4 sm:space-y-5">
                {/* Header Actions Bar */}
                <div className="bg-white rounded-xl border border-neutral-300 shadow-xs p-3.5 sm:p-4.5 flex items-center justify-between">
                  <div className="flex items-center gap-2.5 sm:gap-3">
                    <span className="font-bold text-base sm:text-[17px] text-neutral-950">
                      Products in Cart
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-neutral-700">
                      ({selectedIds.length} of {items.length} selected)
                    </span>
                    <button
                      type="button"
                      onClick={toggleSelectAll}
                      className="text-xs sm:text-sm font-bold text-[#DC2626] hover:underline cursor-pointer ml-1"
                    >
                      {isAllSelected ? "Deselect All" : "Select All"}
                    </button>
                  </div>

                  <div className="flex items-center gap-2.5">
                    <Link
                      href="/"
                      className="hidden sm:inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#DC2626] transition-colors"
                    >
                      <span>+ Add More Items</span>
                    </Link>
                    <span className="hidden sm:inline text-neutral-300">|</span>
                    <button
                      type="button"
                      onClick={() => setConfirmClearOpen(true)}
                      className="px-3.5 py-1.5 text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#DC2626] bg-neutral-50 hover:bg-red-50 border border-neutral-300 hover:border-red-300 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Clear Cart</span>
                    </button>
                  </div>
                </div>

                {/* --------------------------------------------------------- */}
                {/* Responsive Items List: Desktop Table + Mobile Cards       */}
                {/* --------------------------------------------------------- */}

                {/* Desktop View (sm and up) */}
                <div className="hidden sm:block bg-white rounded-xl border border-neutral-300 shadow-xs overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-neutral-300 bg-neutral-100/95 text-neutral-950 text-xs sm:text-sm font-bold uppercase tracking-wider">
                          <th className="py-4 px-5">Product Details</th>
                          <th className="py-4 px-4 text-center">Unit Price</th>
                          <th className="py-4 px-4 text-center">Quantity</th>
                          <th className="py-4 px-5 text-right">Line Subtotal</th>
                          <th className="py-4 px-3 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-neutral-200">
                        {items.map((item) => {
                          const unit = item.product.unit || "unit";
                          const lineTotal = item.product.price * item.quantity;
                          const inWishlist = isInWishlist(item.product.id);
                          const isSelected = selectedIds.includes(item.product.id);

                          return (
                            <tr
                              key={item.id}
                              className={`transition-colors ${
                                isSelected
                                  ? "bg-white hover:bg-neutral-50/80"
                                  : "bg-neutral-50/30 hover:bg-neutral-50/60 opacity-65"
                              }`}
                            >
                              {/* Product Info with Row Checkbox */}
                              <td className="py-4.5 px-5 min-w-[320px]">
                                <div className="flex items-center gap-3.5">
                                  {/* Item Checkbox */}
                                  <input
                                    type="checkbox"
                                    checked={isSelected}
                                    onChange={() => toggleSelectItem(item.product.id)}
                                    className="w-5 h-5 rounded border-neutral-300 text-[#DC2626] focus:ring-[#DC2626] accent-[#DC2626] cursor-pointer shrink-0"
                                    title={isSelected ? "Deselect item" : "Select item"}
                                  />

                                  {/* Thumbnail */}
                                  <div className="relative w-20 h-20 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                                    <Link
                                      href={`/product/${item.product.slug}`}
                                      className="block w-full h-full"
                                    >
                                      <Image
                                        src={item.product.image}
                                        alt={item.product.name}
                                        fill
                                        sizes="80px"
                                        className="object-cover hover:scale-105 transition-transform"
                                      />
                                    </Link>
                                  </div>

                                  {/* Details */}
                                  <div className="min-w-0 flex-1 space-y-1">
                                    <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider block">
                                      {item.product.category}
                                    </span>
                                    <Link
                                      href={`/product/${item.product.slug}`}
                                      className="font-bold text-neutral-950 hover:text-[#DC2626] line-clamp-2 transition-colors text-base sm:text-[16.5px] leading-snug"
                                    >
                                      {item.product.name}
                                    </Link>
                                    <div className="flex items-center gap-3 pt-0.5">
                                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-900 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                        <span>In Stock</span>
                                      </span>
                                      {item.product.sku && (
                                        <span className="text-xs font-mono text-neutral-700 font-semibold">
                                          SKU: {item.product.sku}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Unit Price */}
                              <td className="py-4.5 px-4 text-center whitespace-nowrap">
                                <span className="text-base sm:text-[16.5px] font-bold text-neutral-950 block">
                                  Rs. {item.product.price.toLocaleString()}
                                </span>
                                {item.product.originalPrice && (
                                  <span className="text-xs sm:text-sm text-neutral-500 line-through font-normal block">
                                    Rs. {item.product.originalPrice.toLocaleString()}
                                  </span>
                                )}
                              </td>

                              {/* Quantity Stepper */}
                              <td className="py-4.5 px-4 whitespace-nowrap">
                                <div className="flex items-center justify-center">
                                  <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                                    <button
                                      type="button"
                                      onClick={() => decreaseQuantity(item.product.id)}
                                      className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
                                      aria-label="Decrease quantity"
                                    >
                                      <Minus className="w-4 h-4 stroke-[2.5]" />
                                    </button>
                                    <input
                                      type="number"
                                      min={1}
                                      max={item.product.inStockCount || 999}
                                      value={item.quantity}
                                      onChange={(e) => {
                                        const val = parseInt(e.target.value, 10);
                                        if (!isNaN(val)) {
                                          updateQuantity(
                                            item.product.id,
                                            Math.max(1, Math.min(val, item.product.inStockCount || 999))
                                          );
                                        }
                                      }}
                                      className="w-14 h-9 text-center text-sm font-bold text-neutral-950 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-x border-neutral-200"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => increaseQuantity(item.product.id)}
                                      className="w-9 h-9 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
                                      aria-label="Increase quantity"
                                    >
                                      <Plus className="w-4 h-4 stroke-[2.5]" />
                                    </button>
                                  </div>
                                </div>
                                <span className="text-xs text-neutral-700 font-bold block text-center mt-1">
                                  {unit}s
                                </span>
                              </td>

                              {/* Line Subtotal */}
                              <td className="py-4.5 px-5 text-right whitespace-nowrap">
                                <span className="text-base sm:text-lg font-bold text-[#DC2626] block">
                                  Rs. {lineTotal.toLocaleString()}
                                </span>
                                <span className="text-xs text-neutral-600 font-semibold block">
                                  VAT Incl.
                                </span>
                              </td>

                              {/* Actions */}
                              <td className="py-4.5 px-3 text-center whitespace-nowrap">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => handleMoveToWishlist(item.product)}
                                    className="p-2 text-neutral-600 hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title={
                                      inWishlist
                                        ? "Already in wishlist (Click to remove from cart)"
                                        : "Move to Wishlist"
                                    }
                                  >
                                    <Heart
                                      className={`w-4.5 h-4.5 ${
                                        inWishlist ? "fill-[#DC2626] text-[#DC2626]" : ""
                                      }`}
                                    />
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => removeFromCart(item.product.id)}
                                    className="p-2 text-neutral-600 hover:text-[#DC2626] hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                    title="Remove item"
                                  >
                                    <Trash2 className="w-4.5 h-4.5" />
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

                {/* Mobile View (< sm) with Selection Checkbox & Touch-friendly Actions */}
                <div className="block sm:hidden space-y-3">
                  {items.map((item) => {
                    const unit = item.product.unit || "unit";
                    const lineTotal = item.product.price * item.quantity;
                    const inWishlist = isInWishlist(item.product.id);
                    const isSelected = selectedIds.includes(item.product.id);

                    return (
                      <div
                        key={item.id}
                        className={`rounded-xl border p-4 shadow-xs space-y-3.5 transition-colors ${
                          isSelected
                            ? "bg-white border-neutral-300"
                            : "bg-neutral-50/50 border-neutral-200 opacity-75"
                        }`}
                      >
                        <div className="flex gap-3 items-start">
                          {/* Checkbox with generous tap target */}
                          <label className="pt-2 shrink-0 cursor-pointer p-0.5">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleSelectItem(item.product.id)}
                              className="w-5 h-5 rounded border-neutral-300 text-[#DC2626] focus:ring-[#DC2626] accent-[#DC2626] cursor-pointer block"
                            />
                          </label>

                          {/* Thumbnail */}
                          <div className="relative w-20 h-20 rounded-lg bg-neutral-100 border border-neutral-200 overflow-hidden shrink-0">
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="block w-full h-full"
                            >
                              <Image
                                src={item.product.image}
                                alt={item.product.name}
                                fill
                                sizes="80px"
                                className="object-cover"
                              />
                            </Link>
                          </div>

                          {/* Info */}
                          <div className="flex-1 min-w-0">
                            <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider block">
                              {item.product.category}
                            </span>
                            <Link
                              href={`/product/${item.product.slug}`}
                              className="font-bold text-neutral-950 text-base hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors"
                            >
                              {item.product.name}
                            </Link>

                            <div className="flex items-baseline gap-1.5 mt-1">
                              <span className="text-base font-bold text-[#DC2626]">
                                Rs. {item.product.price.toLocaleString()}
                              </span>
                              <span className="text-xs text-neutral-700 font-semibold">
                                /unit
                              </span>
                              {item.product.originalPrice && (
                                <span className="text-xs text-neutral-500 line-through">
                                  Rs. {item.product.originalPrice.toLocaleString()}
                                </span>
                              )}
                            </div>

                            <div className="mt-1 flex items-center justify-between">
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                                <span>In Stock</span>
                              </span>
                            </div>
                          </div>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-neutral-500 hover:text-[#DC2626] bg-neutral-50 hover:bg-red-50 rounded-lg border border-neutral-200 transition-colors shrink-0 cursor-pointer"
                            title="Remove"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Quantity Stepper & Line Subtotal Row */}
                        <div className="flex items-center justify-between pt-2.5 border-t border-neutral-100 gap-2">
                          {/* Stepper */}
                          <div className="flex items-center gap-2">
                            <span className="text-xs sm:text-sm font-bold text-neutral-800">Qty:</span>
                            <div className="flex items-center border border-neutral-300 rounded-lg bg-white overflow-hidden shadow-2xs">
                              <button
                                type="button"
                                onClick={() => decreaseQuantity(item.product.id)}
                                className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                                aria-label="Decrease"
                              >
                                <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                              <span className="w-9 text-center text-xs font-bold text-neutral-950">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() => increaseQuantity(item.product.id)}
                                className="w-8 h-8 flex items-center justify-center text-neutral-700 hover:bg-neutral-100 transition-colors cursor-pointer"
                                aria-label="Increase"
                              >
                                <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                              </button>
                            </div>
                          </div>

                          {/* Line Subtotal */}
                          <div className="text-right">
                            <span className="text-xs font-bold text-neutral-700 block leading-tight">Line Total:</span>
                            <span className="text-base font-bold text-[#DC2626] leading-tight">
                              Rs. {lineTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>

                        {/* Action buttons row */}
                        <div className="pt-1 flex items-center justify-between border-t border-neutral-100">
                          <button
                            type="button"
                            onClick={() => handleMoveToWishlist(item.product)}
                            className="px-3 py-1.5 text-xs sm:text-sm font-bold text-neutral-800 hover:text-[#DC2626] bg-neutral-50 hover:bg-red-50 border border-neutral-200 hover:border-red-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                          >
                            <Heart
                              className={`w-4 h-4 ${
                                inWishlist ? "fill-[#DC2626] text-[#DC2626]" : ""
                              }`}
                            />
                            <span>{inWishlist ? "Saved in Wishlist" : "Move to Wishlist"}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Continue Shopping / Procurement Assistance Banner */}
                <div className="bg-white rounded-xl border border-neutral-300 p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-lg bg-red-50 text-[#DC2626] border border-red-200 flex items-center justify-center shrink-0">
                      <Truck className="w-5 h-5 stroke-[2]" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-neutral-950">
                        Kathmandu Valley & Nationwide Freight Dispatch
                      </h4>
                      <p className="text-xs sm:text-sm text-neutral-800 font-medium">
                        Bulk institutional supplies are delivered with certified insurance across all 7 Provinces.
                      </p>
                    </div>
                  </div>

                  <Link
                    href="/category/sports-equipment"
                    className="w-full sm:w-auto text-center shrink-0 px-4 py-2.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-xs sm:text-sm font-bold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                  >
                    <span>Continue Shopping</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* ========================================================= */}
              {/* RIGHT 4 COLUMNS: Sticky Checkout & Procurement Summary    */}
              {/* ========================================================= */}
              <div className="lg:col-span-4 space-y-4 sm:space-y-5 lg:sticky lg:top-20">
                {/* Order Summary Box */}
                <div className="bg-white rounded-xl border border-neutral-300 shadow-sm p-4 sm:p-6 space-y-5">
                  <div className="flex items-center justify-between pb-3.5 border-b border-neutral-200">
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
                      Order Summary
                    </h3>
                    <span className="text-sm sm:text-[15px] font-semibold text-neutral-700">
                      {selectedCount} {selectedCount === 1 ? "Product" : "Products"}
                    </span>
                  </div>

                  {selectedIds.length === 0 ? (
                    <div className="py-6 text-center space-y-2 bg-neutral-50 rounded-lg border border-dashed border-neutral-300 p-4">
                      <AlertCircle className="w-6 h-6 text-neutral-500 mx-auto" />
                      <p className="text-sm sm:text-base font-bold text-neutral-900">
                        No products selected
                      </p>
                      <p className="text-xs sm:text-sm text-neutral-700 max-w-[220px] mx-auto">
                        Please check the box next to any item to proceed to checkout.
                      </p>
                      <button
                        type="button"
                        onClick={toggleSelectAll}
                        className="mt-1 text-xs sm:text-sm font-bold text-[#DC2626] hover:underline cursor-pointer"
                      >
                        Select All Items
                      </button>
                    </div>
                  ) : (
                    <>
                      {/* Pricing Breakdown */}
                      <div className="space-y-3.5 text-sm sm:text-[15.5px]">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-800">Total List Value:</span>
                          <span className="font-bold text-neutral-950">
                            Rs. {selectedOriginalAmount.toLocaleString()}
                          </span>
                        </div>

                        {directProductSavings > 0 && (
                          <div className="flex items-center justify-between text-emerald-800">
                            <span className="font-semibold">Direct Equipment Savings:</span>
                            <span className="font-bold">
                              - Rs. {directProductSavings.toLocaleString()}
                            </span>
                          </div>
                        )}

                        {appliedCoupon && (
                          <div className="flex items-center justify-between text-emerald-900 bg-emerald-50 px-3 py-2 rounded-lg border border-emerald-200">
                            <div className="flex items-center gap-1.5">
                              <Tag className="w-4 h-4 text-emerald-700 shrink-0" />
                              <span className="font-semibold">Voucher ({appliedCoupon.code}):</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold">- Rs. {couponDiscount.toLocaleString()}</span>
                              <button
                                type="button"
                                onClick={handleRemoveCoupon}
                                className="text-neutral-500 hover:text-red-600 font-bold ml-1 text-base cursor-pointer"
                                title="Remove coupon"
                              >
                                ×
                              </button>
                            </div>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-800">Delivery / Freight:</span>
                          <span className="font-bold text-emerald-800">
                            Calculated / Free in Valley*
                          </span>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-neutral-800">Govt. 13% VAT Status:</span>
                          <span className="font-bold text-neutral-950">
                            Included in Price (Rs. {vatAmount.toLocaleString()})
                          </span>
                        </div>

                        {/* Final Grand Total */}
                        <div className="pt-4 border-t border-neutral-300 flex items-baseline justify-between">
                          <div>
                            <span className="text-lg sm:text-xl font-bold text-neutral-950 block leading-tight">
                              Grand Total:
                            </span>
                            <span className="text-xs sm:text-sm font-medium text-neutral-600">
                              (Inclusive of all Taxes)
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl sm:text-3xl font-black text-[#DC2626]">
                              Rs. {finalPayableTotal.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Promo Voucher Input */}
                      <form onSubmit={handleApplyCoupon} className="pt-3.5 border-t border-neutral-200 space-y-2">
                        <label className="text-sm sm:text-[15px] font-bold text-neutral-950 block">
                          Have a Procurement Voucher or Promo Code?
                        </label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="e.g. APLUS10"
                            className="flex-1 px-3.5 py-2.5 text-sm sm:text-[15px] bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-950 placeholder:text-neutral-500 uppercase font-mono font-bold focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                          />
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-neutral-950 hover:bg-neutral-800 text-white text-sm font-bold rounded-lg transition-colors cursor-pointer shrink-0"
                          >
                            Apply
                          </button>
                        </div>
                        {couponError && (
                          <p className="text-xs sm:text-sm text-red-600 font-bold">{couponError}</p>
                        )}
                        {couponSuccess && (
                          <p className="text-xs sm:text-sm text-emerald-700 font-bold">{couponSuccess}</p>
                        )}
                      </form>
                    </>
                  )}

                  {/* Primary Checkout CTA */}
                  <div className="pt-2 space-y-2.5">
                    {/* Primary Button: Proceed to Checkout */}
                    <button
                      type="button"
                      disabled={selectedIds.length === 0}
                      onClick={() => router.push("/checkout")}
                      className="w-full py-4 px-4 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed text-white text-base sm:text-lg font-bold rounded-lg shadow-sm flex items-center justify-center gap-2.5 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                    >
                      <CreditCard className="w-5 h-5 stroke-[2.2]" />
                      <span>
                        {selectedIds.length === 0
                          ? "Select Items to Checkout"
                          : `Proceed to Checkout (${selectedCount})`}
                      </span>
                    </button>

                    <div className="flex items-center justify-center gap-1.5 text-xs sm:text-sm text-neutral-800 font-medium pt-1">
                      <ShieldCheck className="w-4.5 h-4.5 text-emerald-600 stroke-[2] shrink-0" />
                      <span>100% Encrypted & Safe Commercial Checkout</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* ============================================================= */
            /* EMPTY CART STATE                                              */
            /* ============================================================= */
            <div className="space-y-8 sm:space-y-12">
              <div className="bg-white rounded-2xl border border-neutral-300 shadow-sm p-6 sm:p-12 lg:p-14 text-center max-w-2xl mx-auto space-y-5">
                <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-full bg-red-50 text-[#DC2626] border-2 border-red-200 flex items-center justify-center mx-auto shadow-inner">
                  <ShoppingCart className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.8]" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight">
                    Your Shopping Cart is Empty
                  </h2>
                  <p className="text-sm sm:text-base text-neutral-900 font-medium max-w-lg mx-auto leading-relaxed">
                    You haven&apos;t added any items to your shopping cart yet. Browse our verified categories or saved wishlist to start shopping.
                  </p>
                </div>

                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
                  <Link
                    href="/"
                    className="px-6 py-3 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white text-sm sm:text-base font-bold rounded-lg shadow-sm transition-all text-center flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="w-4.5 h-4.5" />
                    <span>Explore All Products</span>
                  </Link>
                  <Link
                    href="/wishlist"
                    className="px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-sm sm:text-base font-bold rounded-lg border border-neutral-300 transition-colors text-center"
                  >
                    View Saved Wishlist
                  </Link>
                  <Link
                    href="/category/sports-equipment"
                    className="px-5 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-sm sm:text-base font-bold rounded-lg border border-neutral-300 transition-colors text-center"
                  >
                    Sports Equipment
                  </Link>
                </div>
              </div>

              {/* Recommended Items Strip */}
              <div className="space-y-4 sm:space-y-5">
                <div className="flex items-center justify-between pb-1 border-b border-neutral-200">
                  <div>
                    <h3 className="text-lg sm:text-2xl font-bold text-neutral-950 tracking-tight">
                      Recommended Equipment & Supplies
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-800 font-medium hidden sm:block">
                      Trusted high-grade products for institutions, schools, clubs, and sports complexes across Nepal.
                    </p>
                  </div>
                  <Link
                    href="/"
                    className="text-xs sm:text-sm font-bold text-[#DC2626] hover:underline flex items-center gap-1 shrink-0"
                  >
                    <span>View All Products</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
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

                            {/* Quick Wishlist Save */}
                            <button
                              type="button"
                              onClick={() => addToWishlist(prod)}
                              className={`absolute top-2.5 right-2.5 w-8 h-8 sm:w-9 sm:h-9 rounded-full border flex items-center justify-center shadow-xs transition-colors cursor-pointer ${
                                isSaved
                                  ? "bg-red-50 border-red-200 text-[#DC2626]"
                                  : "bg-white/95 border-neutral-300 text-neutral-700 hover:text-[#DC2626]"
                              }`}
                              title={isSaved ? "Saved in wishlist" : "Add to wishlist"}
                            >
                              <Heart
                                className={`w-4 h-4 stroke-[2.2] ${
                                  isSaved ? "fill-[#DC2626]" : ""
                                }`}
                              />
                            </button>
                          </div>

                          <div className="p-3 sm:p-4 space-y-1.5">
                            <span className="text-xs font-bold text-neutral-600 uppercase tracking-wider block">
                              {prod.category}
                            </span>
                            <Link
                              href={`/product/${prod.slug}`}
                              className="block text-sm sm:text-[15.5px] font-bold text-neutral-950 hover:text-[#DC2626] line-clamp-2 leading-snug transition-colors"
                            >
                              {prod.name}
                            </Link>
                            <div className="text-sm sm:text-base font-bold text-[#DC2626]">
                              Rs. {prod.price.toLocaleString()}
                              <span className="text-xs font-semibold text-neutral-700 ml-1">
                                /unit
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3 sm:p-4 pt-0">
                          <button
                            type="button"
                            onClick={() => updateQuantity(prod.id, 1)}
                            className="w-full py-2.5 px-3 text-xs sm:text-sm font-bold bg-[#DC2626] hover:bg-[#b91c1c] text-white rounded-lg transition-all flex items-center justify-center gap-1.5 shadow-xs cursor-pointer active:scale-[0.98]"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            <span>Add to Cart</span>
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

      {/* Mobile Sticky Bottom Checkout Bar (< lg screens) */}
      {items.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-neutral-300 px-4 py-3.5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
          <div className="max-w-md mx-auto flex items-center justify-between gap-3">
            <div className="min-w-0">
              <span className="text-xs font-bold text-neutral-700 block truncate leading-tight">
                {selectedCount} {selectedCount === 1 ? "Product" : "Products"} Selected
              </span>
              <span className="text-lg sm:text-xl font-black text-[#DC2626] block leading-tight">
                Rs. {finalPayableTotal.toLocaleString()}
              </span>
            </div>
            <button
              type="button"
              disabled={selectedIds.length === 0}
              onClick={() => router.push("/checkout")}
              className="px-5 py-3 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] disabled:opacity-50 text-white text-sm font-bold rounded-lg shadow-sm flex items-center gap-2 shrink-0 transition-all cursor-pointer"
            >
              <CreditCard className="w-4.5 h-4.5 stroke-[2.2]" />
              <span>Checkout ({selectedCount})</span>
            </button>
          </div>
        </div>
      )}

      {/* Confirmation Modal for Clear Cart */}
      {confirmClearOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl border border-neutral-300 shadow-2xl p-5 sm:p-6 max-w-sm w-full space-y-4 animate-in zoom-in-95 duration-150">
            <div className="flex items-center gap-3 text-red-600">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                <Trash2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <h4 className="text-lg font-bold text-neutral-950">Clear Shopping Cart?</h4>
            </div>
            <p className="text-sm text-neutral-800 leading-relaxed font-medium">
              Are you sure you want to remove all {totalCount} items from your shopping cart? This action cannot be undone.
            </p>
            <div className="grid grid-cols-2 gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setConfirmClearOpen(false)}
                className="py-2.5 px-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-900 text-sm font-bold rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  clearCart();
                  setConfirmClearOpen(false);
                }}
                className="py-2.5 px-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Yes, Clear All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/60 backdrop-blur-xs animate-in fade-in duration-150 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-neutral-300 shadow-2xl p-5 sm:p-7 max-w-lg w-full space-y-4 my-8 animate-in zoom-in-95 duration-150">
            {checkoutSuccess ? (
              <div className="text-center space-y-4 py-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-xl font-black text-neutral-950">
                    Order Submitted Successfully!
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-sm mx-auto">
                    Thank you! Your institutional procurement order has been registered. Our representative will contact you with the official VAT proforma invoice and dispatch date.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setCheckoutSuccess(false);
                      setIsCheckoutModalOpen(false);
                    }}
                    className="px-6 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-extrabold rounded-lg shadow-sm transition-colors"
                  >
                    Back to Home
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-neutral-950">
                      Procurement Checkout
                    </h3>
                    <p className="text-xs text-neutral-600 font-medium">
                      Payable Amount:{" "}
                      <span className="font-black text-[#DC2626]">
                        Rs. {finalPayableTotal.toLocaleString()}
                      </span>
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="text-neutral-400 hover:text-neutral-700 font-bold text-lg p-1 cursor-pointer"
                  >
                    ✕
                  </button>
                </div>

                {/* Selected Items Mini Review */}
                <div className="bg-neutral-50 rounded-lg border border-neutral-200 p-2.5 space-y-1 max-h-24 overflow-y-auto">
                  <span className="text-[11px] font-bold text-neutral-900 block">
                    Purchasing {selectedCount} {selectedCount === 1 ? "Item" : "Items"}:
                  </span>
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between text-[11px] text-neutral-700"
                    >
                      <span className="truncate max-w-[240px] font-medium">
                        {item.product.name} (x{item.quantity} {item.product.unit || "unit"})
                      </span>
                      <span className="font-bold text-neutral-950 shrink-0">
                        Rs. {(item.product.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-3 text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-neutral-800 block mb-1">
                        Full Name / Authorized Contact *
                      </label>
                      <input
                        type="text"
                        required
                        value={buyerInfo.fullName}
                        onChange={(e) =>
                          setBuyerInfo({ ...buyerInfo, fullName: e.target.value })
                        }
                        placeholder="e.g. Ramesh Shrestha"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-neutral-800 block mb-1">
                        Phone / Mobile Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={buyerInfo.phone}
                        onChange={(e) =>
                          setBuyerInfo({ ...buyerInfo, phone: e.target.value })
                        }
                        placeholder="+977 98XXXXXXXX"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="font-bold text-neutral-800 block mb-1">
                        Institution / Company Name (Optional)
                      </label>
                      <input
                        type="text"
                        value={buyerInfo.company}
                        onChange={(e) =>
                          setBuyerInfo({ ...buyerInfo, company: e.target.value })
                        }
                        placeholder="School, Club or Company"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-neutral-800 block mb-1">
                        PAN / VAT Number (Optional)
                      </label>
                      <input
                        type="text"
                        value={buyerInfo.vatNumber}
                        onChange={(e) =>
                          setBuyerInfo({ ...buyerInfo, vatNumber: e.target.value })
                        }
                        placeholder="9-digit PAN/VAT for Tax invoice"
                        className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-bold text-neutral-800 block mb-1">
                      Delivery Province & Destination Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={buyerInfo.address}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, address: e.target.value })
                      }
                      placeholder="e.g. Baluwatar, Kathmandu (or Pokhara, Kaski)"
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-neutral-800 block mb-1">
                      Preferred Payment / Invoicing Method
                    </label>
                    <select
                      value={buyerInfo.paymentMethod}
                      onChange={(e) =>
                        setBuyerInfo({ ...buyerInfo, paymentMethod: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-neutral-50 border border-neutral-300 rounded-lg text-neutral-900 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#DC2626]/20 focus:border-[#DC2626]"
                    >
                      <option value="bank_transfer">Direct Corporate Bank Transfer / ConnectIPS</option>
                      <option value="esewa_khalti">Digital Wallet (eSewa / Khalti / Fonepay)</option>
                      <option value="cod">Cash / Cheque on Delivery (Kathmandu Valley)</option>
                      <option value="po_credit">Institutional Purchase Order (PO / 30-Day Credit)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckoutModalOpen(false)}
                    className="px-4 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={checkoutSubmitting}
                    className="px-5 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs font-black rounded-lg shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {checkoutSubmitting ? (
                      <span>Submitting Order...</span>
                    ) : (
                      <span>Confirm & Place Order</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
