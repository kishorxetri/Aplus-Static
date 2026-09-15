"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Trophy, Puzzle, Tent, Sprout, Dumbbell, GraduationCap } from "lucide-react";
import { MainCategory } from "@/data/categories";

interface SubcategoryGridProps {
  categories: MainCategory[];
  activeCategoryId: string;
  onActiveCategoryChange: (id: string) => void;
  onCloseMenu?: () => void;
  scrollTargetCategoryId?: string | null;
  onScrollTargetHandled?: () => void;
}

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "sports-equipment": Trophy,
  "kids-educational": Puzzle,
  "playground-recreation": Tent,
  "artificial-turf": Sprout,
  "commercial-fitness": Dumbbell,
  "kindergarten-furniture": GraduationCap,
};

export default function SubcategoryGrid({
  categories,
  activeCategoryId,
  onActiveCategoryChange,
  onCloseMenu,
  scrollTargetCategoryId,
  onScrollTargetHandled,
}: SubcategoryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);

  // Handle smooth programmatic scroll when user clicks a category on the left sidebar
  useEffect(() => {
    if (!scrollTargetCategoryId || !containerRef.current) return;

    const targetElement = containerRef.current.querySelector(
      `#category-section-${scrollTargetCategoryId}`
    );

    if (targetElement) {
      isProgrammaticScrollRef.current = true;
      targetElement.scrollIntoView({ behavior: "smooth", block: "start" });

      const timer = setTimeout(() => {
        isProgrammaticScrollRef.current = false;
        if (onScrollTargetHandled) onScrollTargetHandled();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [scrollTargetCategoryId, onScrollTargetHandled]);

  // Handle scroll listener to update active category in left sidebar as user scrolls right container
  const handleScroll = () => {
    if (isProgrammaticScrollRef.current || !containerRef.current) return;

    const containerTop = containerRef.current.getBoundingClientRect().top;

    for (const cat of categories) {
      const section = containerRef.current.querySelector(
        `#category-section-${cat.id}`
      );
      if (section) {
        const rect = section.getBoundingClientRect();
        // Check if section is currently around the top viewing area of container
        if (rect.top - containerTop <= 80 && rect.bottom - containerTop > 80) {
          if (activeCategoryId !== cat.id) {
            onActiveCategoryChange(cat.id);
          }
          break;
        }
      }
    }
  };

  return (
    <div
      ref={containerRef}
      onScroll={handleScroll}
      className="flex-1 pl-6 lg:pl-8 py-1 overflow-y-auto max-h-[455px] pr-3 scroll-smooth divide-y divide-neutral-100"
    >
      {categories.map((category) => {
        const CategoryIcon = CATEGORY_ICONS[category.id] || Trophy;

        return (
          <section
            key={category.id}
            id={`category-section-${category.id}`}
            className="pt-2 pb-5 first:pt-1 scroll-mt-2"
          >
            {/* Category Header with Solid Black Icon */}
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-neutral-200">
              <div className="flex items-center gap-2.5">
                <CategoryIcon className="w-5 h-5 text-black stroke-[2.25] shrink-0" />
                <h3 className="text-base font-bold text-black tracking-tight">
                  {category.name}
                </h3>
                <span className="text-[11px] font-bold text-neutral-900 bg-neutral-100 px-2 py-0.5 rounded">
                  {category.subcategories.length} Items
                </span>
              </div>

              <Link
                href={`/category/${category.slug}`}
                onClick={onCloseMenu}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-black hover:text-[#DC2626] transition-colors group"
              >
                <span>View All {category.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-black group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5" />
              </Link>
            </div>

            {/* Subcategories 5-in-a-Row Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-3.5">
              {category.subcategories.map((sub, idx) => (
                <Link
                  key={idx}
                  href={sub.href}
                  onClick={onCloseMenu}
                  className="group flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] rounded-lg p-1 transition-all"
                >
                  {/* Image Container with decreased height */}
                  <div className="relative w-full aspect-[4/3] bg-neutral-100 rounded-lg border border-neutral-200/90 overflow-hidden group-hover:border-[#DC2626]/70 group-hover:shadow-sm transition-all duration-200">
                    <Image
                      src={sub.image}
                      alt={sub.name}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                      className="object-cover p-1 group-hover:scale-105 transition-transform duration-300"
                    />
                    {sub.isPopular && (
                      <span className="absolute top-1.5 left-1.5 text-[9px] font-bold uppercase tracking-wider bg-[#DC2626] text-white px-1.5 py-0.5 rounded shadow-xs leading-none">
                        Hot
                      </span>
                    )}
                  </div>

                  {/* Subcategory Name: snug line height without excessive gap */}
                  <span className="mt-1.5 text-[13px] sm:text-sm font-bold text-black group-hover:text-[#DC2626] text-center leading-snug line-clamp-2 transition-colors min-h-[34px] flex items-center justify-center">
                    {sub.name}
                  </span>
                </Link>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
