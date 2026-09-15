"use client";

import Image from "next/image";
import Link from "next/link";
import { Star, CheckCircle2 } from "lucide-react";
import { Product } from "@/data/products";
import ProductCartControl from "@/components/common/ProductCartControl";
import ProductWishlistControl from "@/components/common/ProductWishlistControl";

interface ProductGridCardProps {
  product: Product;
  viewMode?: "grid" | "list";
}

export default function ProductGridCard({
  product,
  viewMode = "grid",
}: ProductGridCardProps) {
  if (viewMode === "list") {
    return (
      <div className="group flex flex-col sm:flex-row bg-white rounded-xl border border-neutral-300 hover:border-neutral-400 hover:shadow-md transition-all duration-200 overflow-hidden">
        {/* List Image */}
        <div className="relative w-full sm:w-56 md:w-64 aspect-[4/3] sm:aspect-square shrink-0 bg-neutral-100 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, 260px"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Discount Badge */}
          {product.discount && (
            <span className="absolute top-2.5 left-2.5 bg-[#DC2626] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs tracking-wide pointer-events-none">
              {product.discount}
            </span>
          )}

          {/* Wishlist Icon */}
          <ProductWishlistControl
            product={product}
            className="absolute top-2.5 right-2.5"
          />

          {/* Cart Control */}
          <ProductCartControl product={product} />
        </div>

        {/* List Details */}
        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 min-w-0">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[11.5px] font-semibold uppercase tracking-wider text-neutral-800 bg-neutral-100 px-2 py-0.5 rounded border border-neutral-300">
                {product.subcategory}
              </span>
              {product.brand && (
                <span className="text-[11.5px] font-medium text-neutral-600">
                  {product.brand}
                </span>
              )}
            </div>

            <Link href={`/product/${product.slug}`}>
              <h3 className="text-base sm:text-lg font-bold text-neutral-950 group-hover:text-[#DC2626] transition-colors leading-snug">
                {product.name}
              </h3>
            </Link>

            {product.description && (
              <p className="text-xs sm:text-sm text-neutral-700 font-normal mt-2 line-clamp-2 leading-relaxed">
                {product.description}
              </p>
            )}

            <div className="flex items-center gap-3 mt-3">
              {product.rating && (
                <div className="flex items-center gap-1 text-xs font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded border border-amber-300">
                  <Star className="w-3.5 h-3.5 fill-amber-400 stroke-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                  {product.reviewsCount && (
                    <span className="text-neutral-600 font-normal">
                      ({product.reviewsCount})
                    </span>
                  )}
                </div>
              )}

              {product.inStock && (
                <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-300">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 stroke-[2]" />
                  In Stock
                </span>
              )}
            </div>
          </div>

          <div className="flex items-baseline gap-2 mt-4 pt-3 border-t border-neutral-100">
            <span className="text-xl sm:text-2xl font-extrabold text-[#DC2626] tracking-tight">
              Rs. {product.price.toLocaleString()}
              <span className="text-sm font-semibold text-neutral-600 ml-1.5 tracking-normal">
                /unit
              </span>
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-400 line-through font-normal">
                Rs. {product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Standard 4-in-a-row Grid Card (consistent with Home Page design)
  return (
    <div className="flex flex-col h-full">
      <div className="group flex flex-col h-full bg-white rounded-lg border border-neutral-300 hover:border-neutral-400 hover:shadow-md active:scale-[0.99] transition-all duration-200 overflow-hidden">
        {/* Card Image with Badges and Floating Controls */}
        <div className="relative w-full aspect-[4/3] bg-neutral-100 overflow-hidden">
          <Link href={`/product/${product.slug}`} className="block w-full h-full">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Top-Left: Brand Red Discount Badge */}
          {product.discount && (
            <span className="absolute top-2.5 left-2.5 bg-[#DC2626] text-white text-[11px] font-bold px-2 py-0.5 rounded shadow-xs tracking-wide pointer-events-none z-10">
              {product.discount}
            </span>
          )}

          {/* Top-Right: Wishlist Heart Icon */}
          <ProductWishlistControl
            product={product}
            className="absolute top-2.5 right-2.5 z-10"
          />

          {/* Bottom-Right: Cart Control (interactive plus/minus counter) */}
          <div className="z-10">
            <ProductCartControl product={product} />
          </div>
        </div>

        {/* Card Content Details */}
        <div className="p-2.5 sm:p-3 lg:p-3.5 pb-2.5 sm:pb-3 flex flex-col justify-between flex-1 bg-white border-t border-neutral-200">
          <div>
            {/* Category/Subcategory and Rating Pill */}
            <div className="flex items-center justify-between gap-1.5 mb-1.5">
              <span className="text-[11px] font-semibold text-neutral-800 truncate bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-300">
                {product.subcategory}
              </span>

              {product.rating && (
                <div className="flex items-center gap-0.5 text-[11.5px] font-semibold text-amber-700 shrink-0">
                  <Star className="w-3 h-3 fill-amber-400 stroke-amber-400" />
                  <span>{product.rating.toFixed(1)}</span>
                </div>
              )}
            </div>

            {/* Product Title */}
            <Link href={`/product/${product.slug}`} className="block">
              <h3 className="text-[14.5px] sm:text-[16px] lg:text-[17px] font-semibold text-neutral-950 group-hover:text-[#DC2626] line-clamp-2 leading-[1.3] transition-colors">
                {product.name}
              </h3>
            </Link>
          </div>

          {/* Price Area: Current Price in Theme Red Text */}
          <div className="flex items-baseline gap-1.5 sm:gap-2 mt-2 pt-2 border-t border-neutral-100">
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
      </div>
    </div>
  );
}
