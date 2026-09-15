"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  X,
  ArrowRight,
  Layers,
  Trophy,
  Puzzle,
  Tent,
  Sprout,
  Dumbbell,
  GraduationCap,
} from "lucide-react";
import { MAIN_CATEGORIES } from "@/data/categories";
import CategorySidebar from "@/components/navbar/CategorySidebar";
import SubcategoryGrid from "@/components/navbar/SubcategoryGrid";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialCategoryId?: string;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "sports-equipment": Trophy,
  "kids-educational": Puzzle,
  "playground-recreation": Tent,
  "artificial-turf": Sprout,
  "commercial-fitness": Dumbbell,
  "kindergarten-furniture": GraduationCap,
};

export default function CategoryModal({
  isOpen,
  onClose,
  initialCategoryId,
}: CategoryModalProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    initialCategoryId || MAIN_CATEGORIES[0]?.id || "sports-equipment"
  );
  const [scrollTargetId, setScrollTargetId] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialCategoryId) {
      setActiveCategoryId(initialCategoryId);
      setScrollTargetId(initialCategoryId);
    }
  }, [initialCategoryId, isOpen]);

  // Handle Escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSidebarSelect = (id: string) => {
    setActiveCategoryId(id);
    setScrollTargetId(id);
  };

  const currentCategory =
    MAIN_CATEGORIES.find((cat) => cat.id === activeCategoryId) ||
    MAIN_CATEGORIES[0];
  const ActiveCategoryIcon =
    CATEGORY_ICONS[currentCategory.id] || Trophy;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="category-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 md:p-6 bg-neutral-950/70 animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl xl:max-w-7xl max-h-[92vh] sm:max-h-[90vh] bg-white rounded-xl sm:rounded-2xl border border-neutral-300 shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4 border-b border-neutral-200 bg-neutral-50/80 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#DC2626]/10 text-[#DC2626] flex items-center justify-center shrink-0">
              <Layers className="w-4 h-4 stroke-[2.25]" />
            </div>
            <div>
              <h2
                id="category-modal-title"
                className="text-sm sm:text-base font-bold text-neutral-900 tracking-tight"
              >
                All Product Categories
              </h2>
              <p className="hidden sm:block text-xs font-semibold text-neutral-700">
                Explore commercial supplies, sports equipment & playground infrastructure
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close categories modal"
            className="w-8 h-8 rounded-full text-neutral-600 hover:text-black hover:bg-neutral-200/70 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 stroke-[2.25]" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE / SM VIEW (< lg screens): Split Rail Master-Detail Layout          */}
        {/* Left vertical icon rail + Right active category subcategories grid        */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-1 overflow-hidden h-[74vh] xs:h-[77vh] sm:h-[80vh] max-h-[580px]">
          {/* Left Vertical Category Rail */}
          <div className="w-[90px] xs:w-[100px] sm:w-[125px] shrink-0 bg-neutral-100/90 border-r border-neutral-200 overflow-y-auto py-1 scrollbar-thin">
            {MAIN_CATEGORIES.map((cat) => {
              const isActive = cat.id === activeCategoryId;
              const IconComponent = CATEGORY_ICONS[cat.id] || Trophy;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategoryId(cat.id)}
                  className={`w-full py-2.5 px-1 sm:px-2 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative border-b border-neutral-200/40 ${
                    isActive
                      ? "bg-white text-[#DC2626] font-extrabold shadow-2xs"
                      : "text-neutral-700 hover:text-black hover:bg-neutral-200/50 font-medium"
                  }`}
                >
                  {/* Left Active Indicator Bar */}
                  {isActive && (
                    <span className="absolute left-0 top-1 bottom-1 w-1 bg-[#DC2626] rounded-r" />
                  )}
                  <IconComponent
                    className={`w-5 h-5 mb-1 shrink-0 transition-colors ${
                      isActive ? "text-[#DC2626] stroke-[2.5]" : "text-neutral-600 stroke-[2]"
                    }`}
                  />
                  <span className="text-[10px] xs:text-[10.5px] sm:text-[11px] leading-tight line-clamp-2 px-0.5">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Subcategories Content Area */}
          <div className="flex-1 bg-white p-3 sm:p-4 overflow-y-auto flex flex-col justify-between">
            <div>
              {/* Category Active Header Bar */}
              <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-200">
                <div className="flex items-center gap-2 min-w-0 pr-1">
                  <ActiveCategoryIcon className="w-4 h-4 text-[#DC2626] stroke-[2.25] shrink-0" />
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-900 truncate">
                    {currentCategory.name}
                  </h3>
                  <span className="text-[10px] font-bold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded shrink-0">
                    {currentCategory.subcategories.length}
                  </span>
                </div>

                <Link
                  href={`/category/${currentCategory.slug}`}
                  onClick={onClose}
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#DC2626] hover:underline shrink-0"
                >
                  <span>View All</span>
                  <ArrowRight className="w-3 h-3" />
                </Link>
              </div>

              {/* Subcategories Grid: 2 columns on small phones, 3 columns on sm/tablets */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-2.5">
                {currentCategory.subcategories.map((sub, idx) => (
                  <Link
                    key={idx}
                    href={sub.href}
                    onClick={onClose}
                    className="group flex flex-col items-center p-1.5 rounded-lg border border-neutral-200 hover:border-[#DC2626] hover:shadow-xs bg-white transition-all text-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#DC2626]"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-md overflow-hidden bg-neutral-100 mb-1.5 border border-neutral-100">
                      <Image
                        src={sub.image}
                        alt={sub.name}
                        fill
                        sizes="(max-width: 640px) 45vw, 30vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-200"
                      />
                    </div>
                    <span className="text-[10.5px] sm:text-[11.5px] font-bold text-neutral-900 group-hover:text-[#DC2626] line-clamp-2 leading-tight">
                      {sub.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Bottom link to full categories index */}
            <div className="pt-3 mt-3 border-t border-neutral-100">
              <Link
                href="/categories"
                onClick={onClose}
                className="w-full py-2 bg-neutral-100 hover:bg-neutral-200/80 text-neutral-900 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Browse All Main Categories</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP VIEW (lg: >= 1024px): Full Alibaba Mega-Menu Dual Pane           */}
        {/* ========================================================================= */}
        <div className="hidden lg:flex flex-1 overflow-hidden p-4 sm:p-6">
          <div className="flex w-full h-[480px]">
            {/* Left Sidebar */}
            <CategorySidebar
              categories={MAIN_CATEGORIES}
              activeCategoryId={activeCategoryId}
              onSelectCategory={handleSidebarSelect}
              onCloseMenu={onClose}
            />

            {/* Right Subcategories Catalog */}
            <SubcategoryGrid
              categories={MAIN_CATEGORIES}
              activeCategoryId={activeCategoryId}
              onActiveCategoryChange={setActiveCategoryId}
              onCloseMenu={onClose}
              scrollTargetCategoryId={scrollTargetId}
              onScrollTargetHandled={() => setScrollTargetId(null)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
