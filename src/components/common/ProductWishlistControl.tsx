"use client";

import React from "react";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";

interface ProductWishlistControlProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function ProductWishlistControl({
  product,
  className = "",
  size = "md",
}: ProductWishlistControlProps) {
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const sizeClasses = {
    sm: "w-7 h-7",
    md: "w-8 h-8",
    lg: "w-9 h-9",
  }[size];

  const iconSizes = {
    sm: "w-3.5 h-3.5",
    md: "w-4 h-4",
    lg: "w-4.5 h-4.5",
  }[size];

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      title={isWishlisted ? "Saved in Wishlist" : "Add to Wishlist"}
      className={`rounded-full bg-white/95 backdrop-blur-xs border border-neutral-300 shadow-xs flex items-center justify-center transition-all duration-200 cursor-pointer z-10 active:scale-90 ${sizeClasses} ${
        isWishlisted
          ? "text-[#DC2626] border-red-200 bg-red-50/50"
          : "text-neutral-700 hover:text-[#DC2626] hover:bg-white hover:border-neutral-400"
      } ${className}`}
    >
      <Heart
        className={`${iconSizes} stroke-[2.2] transition-transform duration-200 ${
          isWishlisted ? "fill-[#DC2626] scale-110" : ""
        }`}
      />
    </button>
  );
}
