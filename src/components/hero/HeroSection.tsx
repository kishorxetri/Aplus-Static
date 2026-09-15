"use client";

import { useState } from "react";
import HeroCategoriesCard from "./HeroCategoriesCard";
import HeroBannerSlider from "./HeroBannerSlider";
import CategoryModal from "./CategoryModal";

export default function HeroSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | undefined>(undefined);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
    setIsModalOpen(true);
  };

  const handleViewAllClick = () => {
    setSelectedCategoryId(undefined);
    setIsModalOpen(true);
  };

  return (
    <section className="w-full pt-0 sm:pt-2 lg:py-6 pb-4 sm:pb-6">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-5">
          {/* Top on sm/mobile devices, Right on desktop: Full-width Promotional Banner Slider */}
          <div className="order-1 lg:order-2 flex-1 min-w-0 -mx-4 sm:-mx-6 lg:mx-0">
            <HeroBannerSlider />
          </div>

          {/* Below banner on sm/mobile devices, Left on desktop: Categories For You Card */}
          <div className="order-2 lg:order-1">
            <HeroCategoriesCard
              onCategoryClick={handleCategoryClick}
              onViewAllClick={handleViewAllClick}
            />
          </div>
        </div>
      </div>

      {/* Category Mega Catalog Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialCategoryId={selectedCategoryId}
      />
    </section>
  );
}
