"use client";

import Image from "next/image";
import Link from "next/link";
import { JUST_FOR_YOU_PRODUCTS, Product } from "@/data/products";
import ProductCartControl from "@/components/common/ProductCartControl";
import ProductWishlistControl from "@/components/common/ProductWishlistControl";

export default function JustForYou() {
  return (
    <section className="w-full py-5 sm:py-7 bg-neutral-50/80 border-t border-b border-neutral-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-5">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              Just For You
            </h2>
          </div>
        </div>

        {/* 5 in a Row Responsive Product Grid (15 Products) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-4">
          {JUST_FOR_YOU_PRODUCTS.map((product) => {
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
                      sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
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
                  <div className="p-3 sm:p-3.5 pb-2 sm:pb-2.5 flex flex-col justify-between flex-1 bg-white border-t border-neutral-200">
                    <div>
                      <h3 className="text-[15.5px] sm:text-[17px] font-semibold text-neutral-950 group-hover:text-[#DC2626] line-clamp-2 leading-[1.3] transition-colors">
                        {product.name}
                      </h3>
                    </div>

                    {/* Price Area: Current Price in Theme Red Text with reduced gap */}
                    <div className="flex items-baseline gap-2 mt-1 pt-1 border-t border-neutral-100">
                      <span className="text-[16.5px] sm:text-[18px] font-extrabold text-[#DC2626] tracking-tight">
                        Rs. {product.price.toLocaleString()}
                        <span className="text-[12.5px] sm:text-[13.5px] font-semibold text-neutral-600 ml-1 tracking-normal">
                          /unit
                        </span>
                      </span>
                      {product.originalPrice && (
                        <span className="text-[12px] sm:text-[13px] text-neutral-500 line-through font-medium">
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
