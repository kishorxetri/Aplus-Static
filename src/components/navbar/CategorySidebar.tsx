"use client";

import {
  ChevronRight,
  ArrowRight,
  Trophy,
  Puzzle,
  Tent,
  Sprout,
  Dumbbell,
  GraduationCap,
  LayoutGrid,
} from "lucide-react";
import Link from "next/link";
import { MainCategory } from "@/data/categories";

interface CategorySidebarProps {
  categories: MainCategory[];
  activeCategoryId: string;
  onSelectCategory: (id: string) => void;
  onCloseMenu?: () => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "sports-equipment": Trophy,
  "kids-educational": Puzzle,
  "playground-recreation": Tent,
  "artificial-turf": Sprout,
  "commercial-fitness": Dumbbell,
  "kindergarten-furniture": GraduationCap,
};

export default function CategorySidebar({
  categories,
  activeCategoryId,
  onSelectCategory,
  onCloseMenu,
}: CategorySidebarProps) {
  return (
    <div className="w-72 lg:w-80 shrink-0 border-r border-neutral-200 py-3 pr-4 flex flex-col justify-between">
      <div className="space-y-1">
        <div className="px-3 pb-2.5 text-xs sm:text-[13px] font-extrabold text-black uppercase tracking-wider">
          Main Categories
        </div>

        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;
          const CategoryIcon = CATEGORY_ICONS[category.id] || Trophy;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-md text-[15px] transition-colors flex items-center justify-between group cursor-pointer ${
                isActive
                  ? "text-[#DC2626] font-bold bg-neutral-100/80"
                  : "text-neutral-900 hover:text-[#DC2626] hover:bg-neutral-50 font-semibold"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                <CategoryIcon
                  className={`w-4 h-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-[#DC2626] stroke-[2.25]"
                      : "text-black group-hover:text-[#DC2626] stroke-[2.25]"
                  }`}
                />
                <span className="truncate">{category.name}</span>
              </div>
              <ChevronRight
                className={`w-4 h-4 shrink-0 transition-transform ${
                  isActive
                    ? "text-[#DC2626] translate-x-0.5"
                    : "text-neutral-700 group-hover:text-black"
                }`}
              />
            </button>
          );
        })}
      </div>

      {/* View All Categories Link */}
      <div className="pt-3 mt-3 border-t border-neutral-200 px-3">
        <Link
          href="/categories"
          onClick={onCloseMenu}
          className="flex items-center justify-between text-xs sm:text-sm font-bold text-black hover:text-[#DC2626] transition-colors group"
        >
          <div className="flex items-center gap-2">
            <LayoutGrid className="w-4 h-4 text-black group-hover:text-[#DC2626] transition-colors stroke-[2.25]" />
            <span>View All Categories</span>
          </div>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>
    </div>
  );
}
