"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import ProductGridCard from "@/components/category/ProductGridCard";

interface RelatedProductsSectionProps {
  currentProduct: Product;
  relatedProducts: Product[];
}

export default function RelatedProductsSection({
  currentProduct,
  relatedProducts,
}: RelatedProductsSectionProps) {
  if (relatedProducts.length === 0) return null;

  return (
    <section className="w-full bg-white rounded-sm border border-neutral-200 p-4 sm:p-5 lg:p-6 shadow-2xs">
      {/* Section Header */}
      <div className="flex items-center justify-between gap-4 pb-3 mb-4 border-b border-neutral-200 flex-wrap">
        <div className="flex items-center gap-2.5">
          <h2 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight">
            Related Equipment & Supplies
          </h2>
          <span className="text-xs bg-red-50 text-[#DC2626] font-semibold px-2 py-0.5 rounded-sm border border-red-100">
            {currentProduct.subcategory}
          </span>
        </div>

        <Link
          href={`/category/${currentProduct.categorySlug}`}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#DC2626] hover:text-[#b91c1c] transition-colors group cursor-pointer"
        >
          <span>View All in {currentProduct.category}</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
        </Link>
      </div>

      {/* 5 Cards in a Row Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 sm:gap-3.5 lg:gap-4">
        {relatedProducts.slice(0, 5).map((prod) => (
          <ProductGridCard key={prod.id} product={prod} viewMode="grid" />
        ))}
      </div>
    </section>
  );
}
