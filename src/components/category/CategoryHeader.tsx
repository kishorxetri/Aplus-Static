"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  Trophy,
  Puzzle,
  Tent,
  Sprout,
  Dumbbell,
  GraduationCap,
  Layers,
} from "lucide-react";
import { MainCategory } from "@/data/categories";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "sports-equipment": Trophy,
  "kids-educational": Puzzle,
  "playground-recreation": Tent,
  "artificial-turf": Sprout,
  "commercial-fitness": Dumbbell,
  "kindergarten-furniture": GraduationCap,
};

interface CategoryHeaderProps {
  category: MainCategory;
  activeSubcategories: string[];
  onToggleSubcategory: (subSlug: string) => void;
  onClearSubcategories: () => void;
  totalProductsCount: number;
}

export default function CategoryHeader({
  category,
  activeSubcategories,
  onToggleSubcategory,
  onClearSubcategories,
  totalProductsCount,
}: CategoryHeaderProps) {
  const CategoryIcon = CATEGORY_ICONS[category.id] || Trophy;

  return (
    <div className="w-full bg-white border-b border-neutral-200 shadow-2xs">
      {/* Breadcrumbs Navigation - Refined, Clean Typography */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-3.5 pb-2.5">
        <nav aria-label="Breadcrumbs" className="flex items-center gap-2 text-xs sm:text-[13px] text-neutral-600 font-medium flex-wrap">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-neutral-600 hover:text-[#DC2626] transition-colors font-medium"
          >
            <Home className="w-3.5 h-3.5 text-neutral-700 stroke-[2]" />
            <span>Home</span>
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

          <Link
            href="/categories"
            className="text-neutral-600 hover:text-[#DC2626] transition-colors font-medium"
          >
            Categories
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

          <Link
            href={`/category/${category.slug}`}
            onClick={(e) => {
              if (activeSubcategories.length > 0) {
                e.preventDefault();
                onClearSubcategories();
              }
            }}
            className={`font-semibold ${
              activeSubcategories.length === 0
                ? "text-[#DC2626] cursor-default"
                : "text-neutral-800 hover:text-[#DC2626] transition-colors"
            }`}
          >
            {category.name}
          </Link>

          {activeSubcategories.length === 1 && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />
              <span className="text-[#DC2626] font-semibold truncate">
                {category.subcategories.find(
                  (s) => s.slug === activeSubcategories[0]
                )?.name || activeSubcategories[0]}
              </span>
            </>
          )}

          {activeSubcategories.length > 1 && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />
              <span className="text-[#DC2626] font-semibold">
                {activeSubcategories.length} subcategories selected
              </span>
            </>
          )}
        </nav>
      </div>

      {/* Hero Category Banner - Clean Executive Aesthetic */}
      <div className="relative overflow-hidden bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-900 text-white border-y border-neutral-800">
        {/* Subtle Background Ambience */}
        <div className="absolute inset-0 opacity-15 pointer-events-none mix-blend-overlay">
          <Image
            src={category.image}
            alt={category.name}
            fill
            className="object-cover object-center"
            priority
          />
        </div>

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-9 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="max-w-2xl">
            {/* Category Title & Icon */}
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#DC2626] text-white flex items-center justify-center shrink-0 shadow-md">
                <CategoryIcon className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-3.5xl font-bold tracking-tight text-white leading-tight">
                {category.name}
              </h1>
            </div>

            {/* Category Description */}
            <p className="text-sm sm:text-base text-neutral-200 font-normal leading-relaxed max-w-xl pl-0 sm:pl-1">
              {category.shortDescription}
            </p>
          </div>

          {/* Clean Executive Metrics Widget */}
          <div className="flex items-center gap-3.5 sm:gap-4 shrink-0 bg-white/10 backdrop-blur-md border border-white/20 px-4 sm:px-5 py-3 rounded-xl shadow-md">
            <div className="w-10 h-10 rounded-lg bg-[#DC2626] flex items-center justify-center text-white shrink-0">
              <Layers className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold text-white leading-none tracking-tight">
                {totalProductsCount}
              </div>
              <div className="text-xs sm:text-[13px] text-neutral-300 font-normal mt-1">
                Products Available
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subcategory Pills Carousel / Quick Multi-Filter Bar */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3 bg-neutral-50 border-b border-neutral-200">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-1 -my-1">
          <span className="text-xs sm:text-[13px] font-semibold text-neutral-700 tracking-wider shrink-0 pr-1">
            Subcategories:
          </span>

          {/* "All Items" Pill */}
          <button
            type="button"
            onClick={onClearSubcategories}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer ${
              activeSubcategories.length === 0
                ? "bg-[#DC2626] text-white shadow-xs font-semibold"
                : "bg-white text-neutral-800 hover:text-[#DC2626] hover:bg-neutral-100 border border-neutral-300"
            }`}
          >
            All Items ({totalProductsCount})
          </button>

          {/* Subcategory Multi-Select Pills */}
          {category.subcategories.map((sub) => {
            const isSelected = activeSubcategories.includes(sub.slug);

            return (
              <button
                key={sub.id || sub.slug}
                type="button"
                onClick={() => onToggleSubcategory(sub.slug)}
                className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-[13px] font-medium whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[#DC2626] text-white shadow-xs font-semibold ring-2 ring-[#DC2626]/20"
                    : "bg-white text-neutral-800 hover:text-[#DC2626] hover:bg-neutral-100 border border-neutral-300"
                }`}
              >
                {/* Thumbnail Icon */}
                <div className="relative w-4 h-4 rounded-full overflow-hidden shrink-0 bg-neutral-200 border border-neutral-300">
                  <Image
                    src={sub.image}
                    alt={sub.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <span>{sub.name}</span>
                {sub.isPopular && (
                  <span
                    className={`text-[9.5px] font-semibold uppercase px-1 py-0.2 rounded ${
                      isSelected
                        ? "bg-white/25 text-white"
                        : "bg-red-100 text-[#DC2626]"
                    }`}
                  >
                    Hot
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
