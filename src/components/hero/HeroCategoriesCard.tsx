"use client";

import {
  Star,
  ChevronRight,
  Trophy,
  Puzzle,
  Tent,
  Sprout,
  Dumbbell,
  GraduationCap,
} from "lucide-react";
import { MAIN_CATEGORIES } from "@/data/categories";

interface HeroCategoriesCardProps {
  onCategoryClick: (categoryId: string) => void;
  onViewAllClick: () => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "sports-equipment": Trophy,
  "kids-educational": Puzzle,
  "playground-recreation": Tent,
  "artificial-turf": Sprout,
  "commercial-fitness": Dumbbell,
  "kindergarten-furniture": GraduationCap,
};

export default function HeroCategoriesCard({
  onCategoryClick,
  onViewAllClick,
}: HeroCategoriesCardProps) {
  return (
    <div className="w-full lg:w-[330px] xl:w-[360px] h-[320px] sm:h-[350px] lg:h-[370px] bg-white rounded-lg border border-neutral-300 shadow-sm p-3.5 sm:p-4 flex flex-col justify-between shrink-0 overflow-hidden">
      {/* Top Header - Fixed */}
      <div className="shrink-0 pb-2.5 mb-1 border-b border-neutral-200">
        <button
          type="button"
          onClick={onViewAllClick}
          className="w-full flex items-center justify-between group text-left cursor-pointer focus:outline-none"
        >
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-black fill-black shrink-0" />
            <h2 className="text-sm font-extrabold text-black uppercase tracking-wider group-hover:text-[#DC2626] transition-colors">
              Categories For You
            </h2>
          </div>
          <ChevronRight className="w-4 h-4 text-neutral-700 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* Categories List - Scrollable within fixed container height */}
      <div className="flex-1 overflow-y-auto space-y-0.5 sm:space-y-1 my-1 pr-1.5 scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
        {MAIN_CATEGORIES.map((category) => {
          const CategoryIcon = CATEGORY_ICONS[category.id] || Trophy;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onCategoryClick(category.id)}
              className="w-full flex items-center justify-between px-3 py-2 sm:py-2.5 rounded-md text-[15px] sm:text-base font-bold text-neutral-900 hover:text-[#DC2626] hover:bg-neutral-50 transition-colors group text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            >
              <div className="flex items-center gap-3 min-w-0 pr-2">
                <CategoryIcon className="w-4 h-4 text-black group-hover:text-[#DC2626] stroke-[2.25] shrink-0 transition-colors" />
                <span className="truncate leading-normal">{category.name}</span>
              </div>
              <ChevronRight className="w-4 h-4 text-neutral-700 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Bottom Footer: Clean text-only View all without borders and without rounded borders */}
      <div className="shrink-0 pt-2 border-t border-neutral-200 flex items-center justify-end">
        <button
          type="button"
          onClick={onViewAllClick}
          className="inline-flex items-center gap-1 text-xs font-extrabold text-black hover:text-[#DC2626] transition-colors cursor-pointer group p-1 focus:outline-none"
        >
          <span>View all</span>
          <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
    </div>
  );
}
