"use client";

import { Heart } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/context/WishlistContext";

export default function WishlistButton() {
  const { totalCount } = useWishlist();

  return (
    <Link
      href="/wishlist"
      aria-label={`Wishlist, ${totalCount} items`}
      className="relative w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded-md border border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800 hover:text-[#DC2626] transition-colors flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
      title="Saved Wishlist"
    >
      <Heart className={`w-5 h-5 stroke-[1.75] ${totalCount > 0 ? "text-[#DC2626]" : ""}`} />
      {totalCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#DC2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white leading-none shadow-xs animate-in zoom-in-75 duration-150">
          {totalCount}
        </span>
      )}
    </Link>
  );
}
