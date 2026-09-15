"use client";

import { useEffect, useRef, useState } from "react";
import { MainCategory } from "@/data/categories";
import CategorySidebar from "./CategorySidebar";
import SubcategoryGrid from "./SubcategoryGrid";

interface CategoryMegaMenuProps {
  isOpen: boolean;
  categories: MainCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  onClose: () => void;
  onRequestQuote?: (categoryName: string) => void;
}

export default function CategoryMegaMenu({
  isOpen,
  categories,
  activeCategoryId,
  onSelectCategory,
  onClose,
  onRequestQuote,
}: CategoryMegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const [scrollTargetId, setScrollTargetId] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleSidebarSelect = (id: string) => {
    onSelectCategory(id);
    setScrollTargetId(id);
  };

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      role="region"
      aria-label="Product Categories Navigation"
      className="absolute left-0 right-0 top-full w-full bg-white border-b border-neutral-300 shadow-xl z-50"
    >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex min-h-[420px] max-h-[475px]">
            {/* LEFT SIDE: Category Sidebar */}
            <CategorySidebar
              categories={categories}
              activeCategoryId={activeCategoryId}
              onSelectCategory={handleSidebarSelect}
              onCloseMenu={onClose}
            />

            {/* RIGHT SIDE: Alibaba-style 5-in-a-row Subcategory Catalog */}
            <SubcategoryGrid
              categories={categories}
              activeCategoryId={activeCategoryId}
              onActiveCategoryChange={onSelectCategory}
              onCloseMenu={onClose}
              scrollTargetCategoryId={scrollTargetId}
              onScrollTargetHandled={() => setScrollTargetId(null)}
            />
          </div>
      </div>
    </div>
  );
}
