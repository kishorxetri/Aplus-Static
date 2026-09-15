"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { NEW_ARRIVALS_PRODUCTS, Product } from "@/data/products";
import ProductCartControl from "@/components/common/ProductCartControl";
import ProductWishlistControl from "@/components/common/ProductWishlistControl";

export default function NewArrivals() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  const checkScroll = useCallback(() => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollPrev(scrollLeft > 5);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 5);
  }, []);

  useEffect(() => {
    const el = scrollContainerRef.current;
    if (!el) return;
    checkScroll();
    el.addEventListener("scroll", checkScroll, { passive: true });
    window.addEventListener("resize", checkScroll);
    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, [checkScroll]);

  // Scroll by exactly one card
  const scrollOneCard = useCallback((direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const firstCard = container.firstElementChild as HTMLElement | null;
    const cardWidth = firstCard ? firstCard.clientWidth : 260;
    const gap = 16;
    const step = cardWidth + gap;

    if (direction === "next") {
      const isAtEnd = container.scrollLeft >= container.scrollWidth - container.clientWidth - 10;
      if (isAtEnd) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: step, behavior: "smooth" });
      }
    } else {
      container.scrollBy({ left: -step, behavior: "smooth" });
    }
  }, []);

  // Desktop Auto-scroll interval (disabled on touch/small screens, pauses on hover)
  useEffect(() => {
    // Only enable auto-scroll on desktop screens with hover support
    if (typeof window === "undefined") return;
    const isDesktop = window.matchMedia("(min-width: 1024px) and (hover: hover)").matches;
    if (!isDesktop) return;

    if (isHovered) return;

    const interval = setInterval(() => {
      scrollOneCard("next");
    }, 3600);

    return () => clearInterval(interval);
  }, [isHovered, scrollOneCard]);

  return (
    <section className="w-full py-5 sm:py-7 bg-neutral-50/80 border-t border-b border-neutral-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              New Arrivals
            </h2>
          </div>

          {/* Navigation Slider Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => scrollOneCard("prev")}
              disabled={!canScrollPrev}
              aria-label="Previous new arrival"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-100 text-neutral-800 hover:text-black flex items-center justify-center transition-all disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-neutral-800 disabled:cursor-not-allowed shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            >
              <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={() => scrollOneCard("next")}
              disabled={!canScrollNext}
              aria-label="Next new arrival"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-100 text-neutral-800 hover:text-black flex items-center justify-center transition-all disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-neutral-800 disabled:cursor-not-allowed shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            >
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

        {/* Products Carousel (Auto-scrolls 1 card at a time on desktop, free-hand scrolling on small devices) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex items-stretch gap-3 lg:gap-3.5 xl:gap-4 overflow-x-auto scroll-smooth scrollbar-none py-1 -mx-1 px-1 snap-x snap-mandatory lg:snap-none touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {NEW_ARRIVALS_PRODUCTS.map((product) => {
            return (
              <div
                key={product.id}
                className="w-[calc((100%-12px)/2)] sm:w-[calc((100%-14px)/2)] md:w-[calc((100%-2*14px)/3)] lg:w-[calc((100%-4*14px)/5)] xl:w-[calc((100%-4*16px)/5)] shrink-0 flex flex-col snap-start"
              >
                <Link
                  href={`/product/${product.slug}`}
                  className="group flex flex-col h-full bg-white rounded-lg border border-neutral-300 hover:border-neutral-400 hover:shadow-md active:scale-[0.99] transition-all duration-200 overflow-hidden cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                >
                  {/* Card Image with Badges and Floating Actions */}
                  <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Top-Left: Brand Red Discount Badge */}
                    {product.discount && (
                      <span className="absolute top-2.5 left-2.5 bg-[#DC2626] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs tracking-wide pointer-events-none">
                        {product.discount}
                      </span>
                    )}

                    {/* Top-Right: Wishlist Heart Icon */}
                    <ProductWishlistControl
                      product={product}
                      className="absolute top-2.5 right-2.5"
                    />

                    {/* Bottom-Right: Cart Control (interactive plus/minus counter) */}
                    <ProductCartControl product={product} />
                  </div>

                  {/* Card Content Details */}
                  <div className="p-2.5 sm:p-3 lg:p-3.5 pb-2 sm:pb-2.5 lg:pb-3 flex flex-col justify-between flex-1 bg-white border-t border-neutral-200">
                    <div>
                      <h3 className="text-[14.5px] sm:text-[16px] lg:text-[17px] font-semibold text-neutral-950 group-hover:text-[#DC2626] line-clamp-2 leading-[1.3] transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    {/* Price Area: Current Price in Theme Red Text with reduced gap */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1 pt-1 border-t border-neutral-100">
                      <span className="text-[16px] sm:text-[17.5px] lg:text-[19px] font-extrabold text-[#DC2626] tracking-tight">
                        Rs. {product.price.toLocaleString()}
                        <span className="text-[12.5px] sm:text-[13.5px] lg:text-[14.5px] font-semibold text-neutral-600 ml-1 tracking-normal">
                          /unit
                        </span>
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs sm:text-[13px] lg:text-[14px] text-neutral-400 line-through font-normal">
                          Rs. {product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
