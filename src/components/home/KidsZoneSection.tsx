"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { KIDS_FEATURED_PRODUCTS, Product } from "@/data/products";
import ProductCartControl from "@/components/common/ProductCartControl";
import ProductWishlistControl from "@/components/common/ProductWishlistControl";

export default function KidsZoneSection() {
  return (
    <section className="w-full py-5 sm:py-7 bg-white border-t border-neutral-200">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Play & Learn, Grow Together!
            </h2>
          </div>

          <Link
            href="/category/kids-educational"
            className="inline-flex items-center gap-1 text-sm font-bold text-neutral-900 hover:text-[#DC2626] transition-colors group"
          >
            <span>View All</span>
            <ArrowRight className="w-4 h-4 text-neutral-900 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Section Layout: Wider Left Promo Banner + Compact 4-Column Grid (2 Rows x 4 Products) */}
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-3.5 xl:gap-4 items-stretch">
          {/* Left Column: Perfectly Proportioned Promotional Banner Card */}
          <Link
            href="/category/kids-educational"
            className="group relative w-full lg:w-[325px] xl:w-[355px] 2xl:w-[375px] shrink-0 rounded-lg border border-neutral-300 hover:border-neutral-400 hover:shadow-md transition-all duration-200 overflow-hidden bg-sky-50 min-h-[420px] lg:min-h-full flex flex-col cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
          >
            {/* Clean Full-Bleed Generated Banner with left-aligned framing */}
            <div className="relative w-full h-full min-h-[420px] lg:min-h-full">
              <Image
                src="/images/kids-banner.jpg"
                alt="Kids Play & Toys - Educational Play Equipment"
                fill
                sizes="(max-width: 1024px) 100vw, 375px"
                className="object-cover object-left-top group-hover:scale-[1.02] transition-transform duration-500"
                priority
              />
            </div>
          </Link>

          {/* Right Column: 8 Balanced Compact Products in 2 Rows of 4 */}
          <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-3 xl:gap-3.5">
            {KIDS_FEATURED_PRODUCTS.map((product) => {
              return (
                <div key={product.id} className="flex flex-col">
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
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
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
                    <div className="p-2.5 sm:p-3 pb-2 sm:pb-2.5 flex flex-col justify-between flex-1 bg-white border-t border-neutral-200">
                      <div>
                        <h3 className="text-[14.5px] sm:text-[15.5px] font-semibold text-neutral-950 group-hover:text-[#DC2626] line-clamp-2 leading-[1.3] transition-colors min-h-[38px] sm:min-h-[42px]">
                          {product.name}
                        </h3>
                      </div>

                      {/* Price Area: Current Price in Theme Red Text with reduced gap */}
                      <div className="flex items-baseline gap-2 mt-1 pt-1 border-t border-neutral-100">
                        <span className="text-[16px] sm:text-[17.5px] font-extrabold text-[#DC2626] tracking-tight">
                          Rs. {product.price.toLocaleString()}
                          <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-neutral-600 ml-1 tracking-normal">
                            /unit
                          </span>
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs sm:text-[13px] text-neutral-400 line-through font-normal">
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
      </div>
    </section>
  );
}
