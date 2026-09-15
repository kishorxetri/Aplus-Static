"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Star,
  CheckCircle2,
  Heart,
  Share2,
  ShoppingCart,
  CreditCard,
  FileText,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import QuoteModal from "@/components/QuoteModal";

interface ProductInfoCenterProps {
  product: Product;
}

export default function ProductInfoCenter({ product }: ProductInfoCenterProps) {
  const router = useRouter();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();

  const isSaved = isInWishlist(product.id);
  const [quantity, setQuantity] = useState(1);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isAddedSuccess, setIsAddedSuccess] = useState(false);

  const unit = product.unit || "unit";
  const maxStock = product.inStockCount || 50;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrease = () => {
    if (quantity < maxStock) {
      setQuantity((prev) => prev + 1);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAddedSuccess(true);
    setTimeout(() => setIsAddedSuccess(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    router.push("/cart");
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  return (
    <div className="flex flex-col gap-3.5 w-full">
      {/* Category / Subcategory & Wishlist/Share header */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 text-sm font-semibold text-neutral-800 flex-wrap">
          <Link
            href={`/category/${product.categorySlug}`}
            className="text-neutral-950 hover:text-[#DC2626] font-bold transition-colors"
          >
            {product.category}
          </Link>
          <span className="text-neutral-400 font-normal">/</span>
          <Link
            href={`/category/${product.categorySlug}?sub=${product.subcategorySlug}`}
            className="text-neutral-800 hover:text-[#DC2626] transition-colors"
          >
            {product.subcategory}
          </Link>
        </div>

        {/* Quick Actions: Share & Wishlist */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold text-neutral-950 hover:text-black bg-neutral-100 hover:bg-neutral-200 rounded-sm border border-neutral-300 transition-colors cursor-pointer"
            title="Share Product Link"
          >
            {isCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-600 stroke-[2.5]" />
                <span className="text-emerald-700 font-bold">Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-neutral-700 stroke-[2]" />
                <span>Share</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => toggleWishlist(product)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-[13px] font-bold rounded-sm border transition-colors cursor-pointer ${
              isSaved
                ? "bg-red-50 text-[#DC2626] border-red-200"
                : "bg-neutral-100 text-neutral-950 hover:text-[#DC2626] border-neutral-300 hover:bg-neutral-200"
            }`}
            title={isSaved ? "Saved to Wishlist" : "Add to Wishlist"}
          >
            <Heart
              className={`w-4 h-4 ${
                isSaved ? "fill-[#DC2626] text-[#DC2626]" : "stroke-[2] text-neutral-700"
              }`}
            />
            <span>{isSaved ? "Saved" : "Wishlist"}</span>
          </button>
        </div>
      </div>

      {/* Product Title in Solid Black */}
      <h1 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold text-neutral-950 leading-snug tracking-tight">
        {product.name}
      </h1>

      {/* Meta Specs: Brand, SKU, Rating, and Stock */}
      <div className="flex items-center gap-3.5 sm:gap-4.5 flex-wrap text-sm text-neutral-800 pb-2.5 border-b border-neutral-200">
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1.5 bg-amber-50 px-2.5 py-0.5 rounded-sm border border-amber-300 text-amber-950 font-bold text-xs sm:text-[13px]">
            <Star className="w-4 h-4 text-amber-500 fill-amber-400 stroke-amber-400" />
            <span>{product.rating.toFixed(1)}</span>
            {product.reviewsCount && (
              <span className="text-neutral-700 font-semibold ml-0.5">
                ({product.reviewsCount} Ratings)
              </span>
            )}
          </div>
        )}

        {/* Brand */}
        <div className="flex items-center gap-1">
          <span className="text-neutral-600 font-medium">Brand:</span>
          <span className="font-bold text-neutral-950">
            {product.brand || "Aplus Certified"}
          </span>
        </div>

        {/* SKU */}
        <div className="flex items-center gap-1">
          <span className="text-neutral-600 font-medium">SKU:</span>
          <span className="font-mono font-bold text-neutral-900">
            {product.sku || `APLUS-${product.id}`}
          </span>
        </div>

        {/* Stock Status */}
        <div className="flex items-center gap-1.5 font-bold text-emerald-800 text-xs sm:text-[13.5px]">
          <CheckCircle2 className="w-4.5 h-4.5 text-emerald-600 stroke-[2.2]" />
          <span>In Stock ({maxStock} Available)</span>
        </div>
      </div>

      {/* Pricing Box */}
      <div className="bg-neutral-50 rounded-sm border border-neutral-200 p-3.5 sm:p-4 space-y-2">
        <div className="flex items-baseline gap-3 flex-wrap">
          <span className="text-3xl sm:text-4xl font-extrabold text-[#DC2626] tracking-tight">
            Rs. {product.price.toLocaleString()}
            <span className="text-base sm:text-lg font-semibold text-neutral-700 ml-1.5">
              /unit
            </span>
          </span>

          {product.originalPrice && (
            <span className="text-base sm:text-lg text-neutral-500 line-through font-medium">
              Rs. {product.originalPrice.toLocaleString()}
            </span>
          )}

          {product.discount && (
            <span className="bg-[#DC2626] text-white text-xs sm:text-sm font-bold px-2.5 py-0.5 rounded-sm shadow-2xs">
              Save {product.discount}
            </span>
          )}
        </div>

        <p className="text-xs sm:text-sm text-neutral-800 font-medium">
          * Price is inclusive of all standard government VAT and custom duties.
        </p>
      </div>

      {/* Quantity Selector & Subtotal */}
      <div className="space-y-2 pt-0.5">
        <label className="text-sm sm:text-[15px] font-bold text-neutral-950 block">
          Quantity (Units):
        </label>
        <div className="flex items-center gap-3.5">
          <div className="flex items-center border border-neutral-300 rounded-sm bg-white overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-9 h-9 flex items-center justify-center text-neutral-800 hover:bg-neutral-100 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Decrease quantity"
            >
              <Minus className="w-4 h-4 stroke-[2.5]" />
            </button>
            <input
              type="number"
              min={1}
              max={maxStock}
              value={quantity}
              onChange={(e) => {
                const val = Math.max(1, Math.min(Number(e.target.value) || 1, maxStock));
                setQuantity(val);
              }}
              className="w-14 h-9 text-center text-base font-bold text-neutral-950 focus:outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none border-x border-neutral-200"
            />
            <button
              type="button"
              onClick={handleIncrease}
              disabled={quantity >= maxStock}
              className="w-9 h-9 flex items-center justify-center text-neutral-800 hover:bg-neutral-100 hover:text-black disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Increase quantity"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          <div className="text-xs sm:text-sm text-neutral-700 font-medium">
            Subtotal:{" "}
            <span className="font-extrabold text-neutral-950 text-base sm:text-lg">
              Rs. {(product.price * quantity).toLocaleString()}
            </span>
          </div>
        </div>
      </div>

      {/* Primary Action Buttons (Buy Now, Add to Cart) */}
      <div className="flex flex-col sm:flex-row gap-2.5 pt-1">
        {/* Buy Now (Direct Checkout) */}
        <button
          type="button"
          onClick={handleBuyNow}
          className="flex-1 py-3 px-5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-sm sm:text-base font-bold rounded-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          <CreditCard className="w-4.5 h-4.5 stroke-[2.2]" />
          <span>Buy Now</span>
        </button>

        {/* Add to Cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className="flex-1 py-3 px-5 bg-neutral-950 hover:bg-neutral-800 text-white text-sm sm:text-base font-bold rounded-sm shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
        >
          {isAddedSuccess ? (
            <>
              <Check className="w-4.5 h-4.5 text-emerald-400 stroke-[2.5]" />
              <span>Added to Cart!</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4.5 h-4.5 stroke-[2]" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Secondary Action: Bulk Proforma Quotation Modal Trigger */}
      <button
        type="button"
        onClick={() => setIsQuoteOpen(true)}
        className="w-full py-2.5 px-4 bg-white hover:bg-neutral-50 text-neutral-950 text-xs sm:text-sm font-bold rounded-sm border border-neutral-300 hover:border-neutral-400 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
      >
        <FileText className="w-4.5 h-4.5 text-[#DC2626] stroke-[2]" />
        <span>Request Official Tender / Institutional Quotation</span>
      </button>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        initialProductName={`${product.name} (Quantity: ${quantity} ${unit}s)`}
      />
    </div>
  );
}
