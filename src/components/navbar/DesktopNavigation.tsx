"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { TOP_NAV_LINKS } from "@/data/categories";

interface DesktopNavigationProps {
  isCategoriesOpen: boolean;
  onCategoriesClick: () => void;
  onCategoriesMouseEnter: () => void;
  onCategoriesMouseLeave: () => void;
  onCloseMegaMenu?: () => void;
}

export default function DesktopNavigation({
  isCategoriesOpen,
  onCategoriesClick,
  onCategoriesMouseEnter,
  onCategoriesMouseLeave,
  onCloseMegaMenu,
}: DesktopNavigationProps) {
  return (
    <nav
      aria-label="Primary Navigation"
      className="flex items-center space-x-0.5 xl:space-x-1 shrink-0"
    >
      {/* Categories Trigger Button - strictly handles Categories hover */}
      <div
        className="relative shrink-0"
        onMouseEnter={onCategoriesMouseEnter}
        onMouseLeave={onCategoriesMouseLeave}
      >
        <button
          type="button"
          onClick={onCategoriesClick}
          aria-expanded={isCategoriesOpen}
          aria-haspopup="true"
          className={`px-2 lg:px-2.5 xl:px-3.5 py-1.5 text-sm xl:text-[15px] font-bold tracking-normal whitespace-nowrap rounded-md transition-colors flex items-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] ${
            isCategoriesOpen
              ? "text-[#DC2626] bg-neutral-50"
              : "text-neutral-900 hover:text-[#DC2626] hover:bg-neutral-50/80"
          }`}
        >
          <span>All Categories</span>
          <ChevronDown
            className={`w-4 h-4 stroke-[2.25] transition-transform duration-200 ${
              isCategoriesOpen ? "rotate-180 text-[#DC2626]" : "text-neutral-700"
            }`}
          />
        </button>
      </div>

      {/* Main Navigation Links - when hovered, close the categories mega menu */}
      {TOP_NAV_LINKS.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          onMouseEnter={onCloseMegaMenu}
          className="px-2 lg:px-2.5 xl:px-3 py-1.5 text-sm xl:text-[15px] font-bold tracking-normal whitespace-nowrap text-neutral-900 hover:text-[#DC2626] hover:bg-neutral-50/80 rounded-md transition-colors shrink-0"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}
