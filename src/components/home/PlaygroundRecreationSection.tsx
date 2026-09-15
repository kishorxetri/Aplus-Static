"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";
import { PLAYGROUND_RECREATION_PRODUCTS } from "@/data/products";
import ProductCartControl from "@/components/common/ProductCartControl";
import ProductWishlistControl from "@/components/common/ProductWishlistControl";

export default function PlaygroundRecreationSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const checkScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    setCanScrollPrev(scrollLeft > 5);
    setCanScrollNext(scrollLeft < scrollWidth - clientWidth - 5);
  };

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
  }, []);

  const handleScroll = (direction: "prev" | "next") => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = container.clientWidth * 0.85;
    container.scrollBy({
      left: direction === "next" ? scrollAmount : -scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="w-full py-5 sm:py-7 bg-white border-t border-b border-neutral-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div className="flex items-center gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Playground & Recreation
            </h2>
          </div>

          {/* Right Controls: View All Link + Slider Arrows */}
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              href="/category/playground-recreation"
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-bold text-neutral-900 hover:text-[#DC2626] transition-colors group shrink-0"
            >
              <span>View All</span>
              <ArrowRight className="w-4 h-4 text-neutral-900 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5" />
            </Link>

            <div className="flex items-center gap-1.5 sm:gap-2">
              <button
                type="button"
                onClick={() => handleScroll("prev")}
                disabled={!canScrollPrev}
                aria-label="Previous playground products"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-100 text-neutral-800 hover:text-black flex items-center justify-center transition-all disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-neutral-800 disabled:cursor-not-allowed shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
              >
                <ChevronLeft className="w-4 h-4 stroke-[2.5]" />
              </button>
              <button
                type="button"
                onClick={() => handleScroll("next")}
                disabled={!canScrollNext}
                aria-label="Next playground products"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full border border-neutral-300 hover:border-neutral-400 bg-white hover:bg-neutral-100 text-neutral-800 hover:text-black flex items-center justify-center transition-all disabled:opacity-35 disabled:hover:bg-white disabled:hover:text-neutral-800 disabled:cursor-not-allowed shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
              >
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* 5-in-a-row Products Carousel with touch snap */}
        <div
          ref={scrollContainerRef}
          className="flex items-stretch gap-3 lg:gap-3.5 xl:gap-4 overflow-x-auto scroll-smooth scrollbar-none py-1 -mx-1 px-1 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {PLAYGROUND_RECREATION_PRODUCTS.map((product) => {
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
                  <div className="p-2.5 sm:p-3.5 lg:p-4 flex flex-col justify-between flex-1 bg-white border-t border-neutral-200">
                    <div>
                      <h3 className="text-[14.5px] sm:text-[16.5px] lg:text-[17.5px] font-semibold text-neutral-950 group-hover:text-[#DC2626] line-clamp-2 leading-[1.3] transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    {/* Price Area: Current Price in Theme Red Text with reduced gap */}
                    <div className="flex items-baseline gap-1.5 sm:gap-2 mt-1.5 pt-1.5 border-t border-neutral-100">
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
