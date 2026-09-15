"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Trophy,
  Puzzle,
  Tent,
  Sprout,
  Dumbbell,
  GraduationCap,
} from "lucide-react";
import { MAIN_CATEGORIES } from "@/data/categories";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "sports-equipment": Trophy,
  "kids-educational": Puzzle,
  "playground-recreation": Tent,
  "artificial-turf": Sprout,
  "commercial-fitness": Dumbbell,
  "kindergarten-furniture": GraduationCap,
};

export default function ShopByCategories() {
  return (
    <section className="w-full py-5 sm:py-7 bg-white border-t border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: clean without border line, tighter margin */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Shop by Categories
          </h2>

          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-neutral-900 hover:text-[#DC2626] transition-colors group shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:text-[#DC2626] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Categories in a Row Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-3.5 xl:gap-4">
          {MAIN_CATEGORIES.map((category) => {
            const CategoryIcon = CATEGORY_ICONS[category.id] || Trophy;

            return (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group flex flex-col bg-white rounded-lg border border-neutral-200/90 hover:border-[#DC2626] hover:shadow-md transition-all duration-200 overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
              >
                {/* Edge-to-edge covered image - NO padding around it */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-neutral-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Item count tag */}
                  <span className="absolute bottom-2 left-2 text-[10px] sm:text-[11px] font-bold text-neutral-900 bg-white/95 backdrop-blur-xs px-2 py-0.5 rounded shadow-2xs leading-none">
                    {category.subcategories.length} Items
                  </span>
                </div>

                {/* Category Content Area with clean padding below the image */}
                <div className="p-3 sm:p-3.5 flex items-center justify-between gap-1.5 flex-1 bg-white border-t border-neutral-100">
                  <div className="flex items-center gap-2 min-w-0">
                    <CategoryIcon className="w-4 h-4 text-black group-hover:text-[#DC2626] stroke-[2.25] shrink-0 transition-colors" />
                    <h3 className="text-xs sm:text-[13.5px] font-bold text-black group-hover:text-[#DC2626] transition-colors truncate">
                      {category.name}
                    </h3>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
