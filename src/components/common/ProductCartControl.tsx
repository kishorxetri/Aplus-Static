"use client";

import React from "react";
import { ShoppingCart, Plus, Minus } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";

interface ProductCartControlProps {
  product: Product;
  className?: string;
}

export default function ProductCartControl({
  product,
  className = "",
}: ProductCartControlProps) {
  const { getItemQuantity, addToCart, increaseQuantity, decreaseQuantity } =
    useCart();

  const quantity = getItemQuantity(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    increaseQuantity(product.id);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    decreaseQuantity(product.id);
  };

  if (quantity === 0) {
    return (
      <button
        type="button"
        onClick={handleAdd}
        aria-label={`Add ${product.name} to cart`}
        title="Add to cart"
        className={`absolute bottom-2.5 right-2.5 w-8 h-8 rounded-full bg-white text-neutral-800 border border-neutral-300 shadow-sm flex items-center justify-center transition-all duration-200 hover:bg-[#DC2626] hover:text-white hover:border-[#DC2626] cursor-pointer z-10 opacity-95 sm:opacity-0 sm:translate-y-1.5 group-hover:opacity-100 group-hover:translate-y-0 ${className}`}
      >
        <ShoppingCart className="w-4 h-4 stroke-[2]" />
      </button>
    );
  }

  return (
    <div
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      className={`absolute bottom-2.5 right-2.5 h-8 bg-[#DC2626] text-white rounded-full px-1 shadow-md flex items-center gap-1 z-20 border border-[#b91c1c] animate-in fade-in zoom-in-95 duration-150 ${className}`}
      aria-label={`Quantity in cart: ${quantity}`}
    >
      <button
        type="button"
        onClick={handleDecrease}
        aria-label="Decrease count"
        title="Decrease quantity"
        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none"
      >
        <Minus className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>

      <span className="text-xs font-bold px-1 select-none min-w-[16px] text-center text-white">
        {quantity}
      </span>

      <button
        type="button"
        onClick={handleIncrease}
        aria-label="Increase count"
        title="Increase quantity"
        className="w-6 h-6 rounded-full bg-white/20 hover:bg-white/35 active:scale-90 text-white flex items-center justify-center transition-all cursor-pointer focus:outline-none"
      >
        <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
      </button>
    </div>
  );
}
