"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, Search as SearchIcon, Phone, Mail, Globe } from "lucide-react";
import { MAIN_CATEGORIES } from "@/data/categories";
import DesktopNavigation from "./DesktopNavigation";
import CategoryMegaMenu from "./CategoryMegaMenu";
import Search from "./Search";
import WishlistButton from "./WishlistButton";
import CartButton from "./CartButton";
import GetQuoteButton from "./GetQuoteButton";
import MobileNavigation from "./MobileNavigation";
import QuoteModal from "@/components/QuoteModal";

export default function Navbar() {
  const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    MAIN_CATEGORIES[0]?.id || "sports-equipment"
  );
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [selectedQuoteCategory, setSelectedQuoteCategory] = useState<string | undefined>(
    undefined
  );
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  // Hover timeout ref to provide smooth buffer between trigger and mega menu
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Handle outside clicks to close mega menu
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
        setIsMegaMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsMegaMenuOpen(true);
  };

  const handleMouseLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setIsMegaMenuOpen(false);
    }, 180);
  };

  const handleCategoriesClick = () => {
    setIsMegaMenuOpen(!isMegaMenuOpen);
  };

  const handleOpenQuote = (categoryId?: string) => {
    setSelectedQuoteCategory(categoryId);
    setIsQuoteModalOpen(true);
  };

  return (
    <>
      {/* Top Corporate Utility Bar (Hidden on sm/mobile devices, visible on md and up) */}
      <div className="hidden md:block w-full bg-[#DC2626] text-white text-xs font-medium border-b border-red-700/50">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          {/* Left: Company & B2B Hotline */}
          <div className="flex items-center gap-3 sm:gap-5">
            <span className="font-bold text-white tracking-tight">
              Aplus Business Link Pvt. Ltd.
            </span>
            <span className="text-white/40 hidden sm:inline">|</span>
            <div className="flex items-center gap-1.5 text-white">
              <Phone className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="hidden sm:inline">B2B Hotline:</span>
              <span>+977 1-4500000 / +977 9851000000</span>
            </div>
          </div>

          {/* Right: Email */}
          <div className="flex items-center">
            <a
              href="mailto:sales@aplusbusinesslink.com"
              className="flex items-center gap-1.5 text-white hover:text-white/90 transition-colors font-medium hover:underline"
            >
              <Mail className="w-3.5 h-3.5 text-white shrink-0" />
              <span>sales@aplusbusinesslink.com</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar Header (Sticky at top:0 for the entire page scroll) */}
      <header
        ref={navbarRef}
        className="sticky top-0 z-40 w-full bg-white border-b border-neutral-200 shadow-xs font-sans"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center gap-3 lg:gap-4 xl:gap-6">
          {/* Mobile Left: Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            <button
              type="button"
              onClick={() => setIsMobileNavOpen(true)}
              aria-label="Open mobile menu"
              className="p-2 text-neutral-800 hover:text-[#DC2626] rounded-md transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* LEFT: Existing Aplus Logo */}
          <div className="flex items-center shrink-0">
            <Link
              href="/"
              className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] rounded-sm shrink-0"
              aria-label="Aplus Business Link Homepage"
            >
              <Image
                src="/aplus-logo.webp"
                alt="Aplus Business Link Logo"
                width={160}
                height={42}
                priority
                className="h-8 sm:h-9 md:h-10 lg:h-[40px] w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation placed close to logo */}
          <div className="hidden lg:flex items-center shrink-0">
            <DesktopNavigation
              isCategoriesOpen={isMegaMenuOpen}
              onCategoriesClick={handleCategoriesClick}
              onCategoriesMouseEnter={handleMouseEnter}
              onCategoriesMouseLeave={handleMouseLeave}
              onCloseMegaMenu={() => {
                if (hoverTimeoutRef.current) {
                  clearTimeout(hoverTimeoutRef.current);
                  hoverTimeoutRef.current = null;
                }
                setIsMegaMenuOpen(false);
              }}
            />
          </div>

          {/* SEARCH SECTION: Brought to the lefter side & width increased */}
          <div className="hidden sm:block flex-1 min-w-[200px] max-w-[320px] lg:max-w-[360px] xl:max-w-[420px]">
            <Search />
          </div>

          {/* RIGHT ACTIONS: Wishlist, Cart, Get a Quote pushed to right with ml-auto */}
          <div className="flex items-center gap-2 sm:gap-2.5 lg:gap-3.5 shrink-0 ml-auto">
            {/* Mobile Search Toggle Icon */}
            <button
              type="button"
              onClick={() => setMobileSearchVisible(!mobileSearchVisible)}
              aria-label="Toggle search bar"
              className="sm:hidden p-2 text-neutral-700 hover:text-[#DC2626] rounded-md transition-colors"
            >
              <SearchIcon className="w-5 h-5" />
            </button>

            {/* Wishlist */}
            <WishlistButton />

            {/* Cart */}
            <CartButton />

            {/* Primary CTA: Get a Quote */}
            <div className="hidden sm:block shrink-0">
              <GetQuoteButton onClick={() => handleOpenQuote()} />
            </div>
          </div>
        </div>

        {/* Mobile Expandable Search Bar */}
        {mobileSearchVisible && (
          <div className="sm:hidden px-4 pb-3 pt-1 border-t border-neutral-100 bg-white animate-in slide-in-from-top-1">
            <Search isMobileDrawer onCloseMobile={() => setMobileSearchVisible(false)} />
          </div>
        )}

        {/* Categories Mega Menu (Inside sticky container so it stays attached when scrolled) */}
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
        <CategoryMegaMenu
          isOpen={isMegaMenuOpen}
          categories={MAIN_CATEGORIES}
          activeCategoryId={activeCategoryId}
          onSelectCategory={(id) => setActiveCategoryId(id)}
          onClose={() => setIsMegaMenuOpen(false)}
          onRequestQuote={(catId) => handleOpenQuote(catId)}
        />
      </div>
    </header>

    {/* Mobile Drawer */}
    <MobileNavigation
      isOpen={isMobileNavOpen}
      onClose={() => setIsMobileNavOpen(false)}
      onRequestQuote={() => handleOpenQuote()}
    />

    {/* B2B Quotation Modal */}
    <QuoteModal
      isOpen={isQuoteModalOpen}
      onClose={() => setIsQuoteModalOpen(false)}
      defaultCategory={selectedQuoteCategory}
    />
  </>
  );
}
