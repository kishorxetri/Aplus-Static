"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, ChevronDown, ChevronRight, Phone, Mail, Heart, ShoppingCart } from "lucide-react";
import { MAIN_CATEGORIES, TOP_NAV_LINKS } from "@/data/categories";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";
import Search from "./Search";
import GetQuoteButton from "./GetQuoteButton";

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
  onRequestQuote: () => void;
}

export default function MobileNavigation({
  isOpen,
  onClose,
  onRequestQuote,
}: MobileNavigationProps) {
  const [expandedCategories, setExpandedCategories] = useState(true);
  const [expandedCategoryId, setExpandedCategoryId] = useState<string | null>(null);
  const { totalCount: wishlistCount } = useWishlist();
  const { totalCount: cartCount } = useCart();

  // Lock scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const toggleCategory = (id: string) => {
    setExpandedCategoryId(expandedCategoryId === id ? null : id);
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/60 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 w-full max-w-sm bg-white shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <span className="text-sm font-bold tracking-tight text-neutral-900">
            Aplus Business Link
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close navigation"
            className="p-2 text-neutral-500 hover:text-neutral-900 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar in Drawer */}
        <div className="px-5 pt-4 pb-2">
          <Search isMobileDrawer onCloseMobile={onClose} />
        </div>

        {/* Nav Items Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-5 py-3 divide-y divide-neutral-100">
          {/* Categories Accordion Section */}
          <div className="py-2">
            <button
              type="button"
              onClick={() => setExpandedCategories(!expandedCategories)}
              className="w-full flex items-center justify-between py-2.5 text-sm font-bold text-neutral-900 hover:text-[#DC2626] transition-colors"
            >
              <span>All Categories</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  expandedCategories ? "rotate-180 text-[#DC2626]" : "text-neutral-400"
                }`}
              />
            </button>

            {expandedCategories && (
              <div className="pl-2 pr-1 space-y-1 mt-1 border-l-2 border-neutral-100">
                {MAIN_CATEGORIES.map((cat) => {
                  const isCatExpanded = expandedCategoryId === cat.id;

                  return (
                    <div key={cat.id} className="py-1">
                      <button
                        type="button"
                        onClick={() => toggleCategory(cat.id)}
                        className={`w-full flex items-center justify-between px-2.5 py-2 text-xs font-semibold rounded-md transition-colors ${
                          isCatExpanded
                            ? "text-[#DC2626] bg-neutral-50"
                            : "text-neutral-800 hover:text-[#DC2626]"
                        }`}
                      >
                        <span>{cat.name}</span>
                        <ChevronRight
                          className={`w-3.5 h-3.5 transition-transform ${
                            isCatExpanded ? "rotate-90 text-[#DC2626]" : "text-neutral-400"
                          }`}
                        />
                      </button>

                      {isCatExpanded && (
                        <div className="pl-3 pr-1 py-2 grid grid-cols-2 gap-2 bg-neutral-50/70 rounded-md mt-1">
                          {cat.subcategories.map((sub, sIdx) => (
                            <Link
                              key={sIdx}
                              href={sub.href}
                              onClick={onClose}
                              className="group flex items-center gap-2 p-1.5 rounded-md hover:bg-white transition-colors"
                            >
                              <div className="relative w-9 h-9 rounded bg-white border border-neutral-200 overflow-hidden shrink-0">
                                <Image
                                  src={sub.image}
                                  alt={sub.name}
                                  fill
                                  sizes="36px"
                                  className="object-cover"
                                />
                              </div>
                              <span className="text-[11px] font-bold text-neutral-800 group-hover:text-[#DC2626] line-clamp-2 leading-tight">
                                {sub.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Regular Navigation Links */}
          <div className="py-3 space-y-1">
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 px-2 text-[15px] font-bold text-neutral-900 hover:text-[#DC2626] transition-colors"
            >
              <span className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-[#DC2626]" />
                <span>Shopping Cart</span>
              </span>
              {cartCount > 0 && (
                <span className="px-2 py-0.5 bg-[#DC2626] text-white text-xs font-bold rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>

            <Link
              href="/wishlist"
              onClick={onClose}
              className="flex items-center justify-between py-2.5 px-2 text-[15px] font-bold text-neutral-900 hover:text-[#DC2626] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-[#DC2626]" />
                <span>Saved Wishlist</span>
              </span>
              {wishlistCount > 0 && (
                <span className="px-2 py-0.5 bg-[#DC2626] text-white text-xs font-bold rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {TOP_NAV_LINKS.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={onClose}
                className="block py-2.5 px-2 text-[15px] font-bold text-neutral-900 hover:text-[#DC2626] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Quick Contact Information */}
          <div className="py-4 space-y-2 text-xs text-neutral-600">
            <div className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>+977 1-4500000 / Direct B2B</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-3.5 h-3.5 text-[#DC2626]" />
              <span>info@aplusbusinesslink.com</span>
            </div>
          </div>
        </div>

        {/* Drawer Bottom CTA */}
        <div className="p-5 border-t border-neutral-200 bg-neutral-50">
          <GetQuoteButton
            isFullWidth
            onClick={() => {
              onClose();
              onRequestQuote();
            }}
          />
        </div>
      </div>
    </div>
  );
}
