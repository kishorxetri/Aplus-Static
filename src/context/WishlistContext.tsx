"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, CheckCircle2, X, ShoppingCart, Trash2 } from "lucide-react";
import { Product } from "@/data/products";
import { useCart } from "./CartContext";

export interface WishlistToast {
  id: number;
  type: "add" | "remove" | "info";
  title: string;
  message: string;
  product?: Product;
}

interface WishlistContextType {
  items: Product[];
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (product: Product) => void;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  clearWishlist: () => void;
  moveToCart: (product: Product) => void;
  moveAllToCart: () => void;
  showToast: (title: string, message: string, type?: "add" | "remove" | "info", product?: Product) => void;
  totalCount: number;
  totalAmount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const STORAGE_KEY = "aplus_wishlist_items";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [toast, setToast] = useState<WishlistToast | null>(null);
  const toastTimerRef = useRef<NodeJS.Timeout | null>(null);
  const { addToCart } = useCart();

  // Load persisted wishlist from localStorage on client mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          // De-duplicate any potential duplicate IDs
          const uniqueItems: Product[] = Array.from(
            new Map(parsed.filter((item) => item && item.id).map((item: Product) => [item.id, item])).values()
          );
          setItems(uniqueItems);
        }
      }
    } catch (e) {
      console.warn("Failed to load wishlist from localStorage", e);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Sync to localStorage whenever items change
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.warn("Failed to save wishlist to localStorage", e);
    }
  }, [items, isHydrated]);

  // Display floating toast message
  const showToast = useCallback(
    (title: string, message: string, type: "add" | "remove" | "info" = "info", product?: Product) => {
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
      setToast({
        id: Date.now(),
        type,
        title,
        message,
        product,
      });

      toastTimerRef.current = setTimeout(() => {
        setToast(null);
      }, 3500);
    },
    []
  );

  const isInWishlist = useCallback(
    (productId: string): boolean => {
      return items.some((item) => item.id === productId);
    },
    [items]
  );

  const addToWishlist = useCallback(
    (product: Product) => {
      setItems((prev) => {
        if (prev.some((item) => item.id === product.id)) {
          showToast("Already in Wishlist", `"${product.name}" is already saved in your wishlist.`, "info", product);
          return prev;
        }
        showToast("Added to Wishlist", product.name, "add", product);
        return [product, ...prev];
      });
    },
    [showToast]
  );

  const removeFromWishlist = useCallback(
    (productId: string) => {
      setItems((prev) => {
        const removed = prev.find((item) => item.id === productId);
        if (removed) {
          showToast("Removed from Wishlist", removed.name, "remove", removed);
        }
        return prev.filter((item) => item.id !== productId);
      });
    },
    [showToast]
  );

  const toggleWishlist = useCallback(
    (product: Product) => {
      setItems((prev) => {
        const exists = prev.some((item) => item.id === product.id);
        if (exists) {
          showToast("Removed from Wishlist", product.name, "remove", product);
          return prev.filter((item) => item.id !== product.id);
        } else {
          showToast("Added to Wishlist", product.name, "add", product);
          return [product, ...prev];
        }
      });
    },
    [showToast]
  );

  const clearWishlist = useCallback(() => {
    setItems([]);
    showToast("Wishlist Cleared", "All saved items have been removed.", "info");
  }, [showToast]);

  const moveToCart = useCallback(
    (product: Product) => {
      addToCart(product);
      showToast("Added to Cart", `"${product.name}" moved to your procurement cart.`, "info", product);
    },
    [addToCart, showToast]
  );

  const moveAllToCart = useCallback(() => {
    if (items.length === 0) return;
    items.forEach((item) => {
      addToCart(item);
    });
    showToast("Moved to Cart", `Successfully added ${items.length} items to your procurement cart!`, "info");
  }, [items, addToCart, showToast]);

  const totalCount = items.length;
  const totalAmount = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <WishlistContext.Provider
      value={{
        items,
        isInWishlist,
        toggleWishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist,
        moveToCart,
        moveAllToCart,
        showToast,
        totalCount,
        totalAmount,
      }}
    >
      {children}

      {/* Global Interactive Wishlist Toast Popup */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-4 sm:bottom-6 left-3 right-3 sm:left-auto sm:right-6 z-[9999] max-w-sm sm:w-auto bg-neutral-950/95 backdrop-blur-md text-white px-3.5 sm:px-4 py-3 rounded-xl shadow-2xl border border-neutral-700/80 flex items-center gap-3 animate-in slide-in-from-bottom-3 fade-in duration-200"
        >
          {/* Thumbnail / Status Icon */}
          {toast.product?.image ? (
            <div className="relative w-11 h-11 rounded-lg bg-neutral-900 border border-neutral-700 overflow-hidden shrink-0">
              <Image
                src={toast.product.image}
                alt={toast.product.name}
                fill
                sizes="44px"
                className="object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                toast.type === "add"
                  ? "bg-red-500/20 text-[#DC2626] border border-red-500/30"
                  : toast.type === "remove"
                  ? "bg-neutral-800 text-neutral-400 border border-neutral-700"
                  : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
              }`}
            >
              {toast.type === "add" ? (
                <Heart className="w-5 h-5 fill-[#DC2626]" />
              ) : toast.type === "remove" ? (
                <Trash2 className="w-4 h-4 text-neutral-400" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              )}
            </div>
          )}

          {/* Text Details */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-1.5">
              {toast.type === "add" && <Heart className="w-3.5 h-3.5 fill-[#DC2626] text-[#DC2626] shrink-0" />}
              {toast.type === "info" && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />}
              <span className="text-xs sm:text-[13.5px] font-black text-white tracking-tight">
                {toast.title}
              </span>
            </div>
            <p className="text-[11.5px] sm:text-xs text-neutral-300 truncate font-medium mt-0.5 max-w-[210px] sm:max-w-[240px]">
              {toast.message}
            </p>
          </div>

          {/* Action Links & Close */}
          <div className="flex items-center gap-1.5 shrink-0">
            {toast.type === "add" && (
              <Link
                href="/wishlist"
                onClick={() => setToast(null)}
                className="px-2.5 py-1 text-[11px] sm:text-xs font-extrabold text-white bg-[#DC2626] hover:bg-[#b91c1c] active:scale-95 rounded-lg transition-all shadow-xs"
              >
                View
              </Link>
            )}
            <button
              type="button"
              onClick={() => setToast(null)}
              className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors cursor-pointer"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
}
