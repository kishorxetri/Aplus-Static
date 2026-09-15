"use client";

import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartButton() {
  const { totalCount } = useCart();

  return (
    <Link
      href="/cart"
      aria-label={`Shopping Cart, ${totalCount} items`}
      className="relative w-9 h-9 lg:w-10 lg:h-10 shrink-0 rounded-md border border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800 hover:text-[#DC2626] transition-colors flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
      title="Shopping Cart"
    >
      <ShoppingCart className={`w-5 h-5 stroke-[2] ${totalCount > 0 ? "text-neutral-950" : ""}`} />
      {totalCount > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 bg-[#DC2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white leading-none shadow-xs animate-in zoom-in-75 duration-150">
          {totalCount}
        </span>
      )}
    </Link>
  );
}

