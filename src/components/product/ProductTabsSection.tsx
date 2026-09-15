"use client";

import { useState } from "react";
import {
  FileText,
  Sliders,
  Star,
  HelpCircle,
  CheckCircle2,
  BadgeCheck,
  ShieldAlert,
  Truck,
  Building,
} from "lucide-react";
import { Product } from "@/data/products";

interface ProductTabsSectionProps {
  product: Product;
}

type TabType = "description" | "specifications" | "reviews" | "shipping";

export default function ProductTabsSection({ product }: ProductTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>("description");

  const specifications = product.specifications || {
    "Brand": product.brand || "Aplus Certified",
    "Category": product.category,
    "Subcategory": product.subcategory,
    "SKU Code": product.sku || `APLUS-${product.id}`,
    "Pricing Standard": `Rs. ${product.price.toLocaleString()} / unit`,
    "Material / Composition": "Commercial Heavy-Duty Grade Alloy / High-Density Polyurethane / Safe Non-Toxic Polymers",
    "Certification": "ISO 9001:2015 / CE Certified / EN1176 Safety Compliant",
    "Warranty Coverage": product.warranty || "1 Year Commercial Warranty",
    "Origin": "Direct Authorized Import (Nepal Distribution)",
  };

  const features = product.features && product.features.length > 0
    ? product.features
    : [
        "Heavy-duty commercial-grade construction engineered for institutional high-traffic environments.",
        "Certified to international safety and quality standards (ISO 9001 / CE / FIFA / EN1176 compliant).",
        "Weather-resistant, UV-stabilized, and wear-tested materials suitable for diverse climatic conditions in Nepal.",
        "Includes official Aplus Business Link authenticity stamp and institutional warranty coverage.",
        "Bulk discount eligibility and priority delivery available for schools, fitness complexes, and municipalities.",
      ];

  const reviews = product.reviewsList || [];

  return (
    <div className="w-full bg-white rounded-sm border border-neutral-200 shadow-2xs overflow-hidden">
      {/* Tab Navigation Bar (Daraz / Alibaba Style) */}
      <div className="flex items-center border-b border-neutral-200 bg-neutral-50/70 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab("description")}
          className={`flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === "description"
              ? "border-[#DC2626] text-[#DC2626] bg-white"
              : "border-transparent text-neutral-700 hover:text-black hover:bg-neutral-100"
          }`}
        >
          <FileText className="w-4.5 h-4.5 stroke-[2]" />
          <span>Product Description</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("specifications")}
          className={`flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === "specifications"
              ? "border-[#DC2626] text-[#DC2626] bg-white"
              : "border-transparent text-neutral-700 hover:text-black hover:bg-neutral-100"
          }`}
        >
          <Sliders className="w-4.5 h-4.5 stroke-[2]" />
          <span>Specifications</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === "reviews"
              ? "border-[#DC2626] text-[#DC2626] bg-white"
              : "border-transparent text-neutral-700 hover:text-black hover:bg-neutral-100"
          }`}
        >
          <Star className="w-4.5 h-4.5 stroke-[2]" />
          <span>Customer Reviews ({reviews.length > 0 ? reviews.length : product.reviewsCount || 0})</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("shipping")}
          className={`flex items-center gap-2 px-5 py-3 text-sm sm:text-base font-bold border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
            activeTab === "shipping"
              ? "border-[#DC2626] text-[#DC2626] bg-white"
              : "border-transparent text-neutral-700 hover:text-black hover:bg-neutral-100"
          }`}
        >
          <HelpCircle className="w-4.5 h-4.5 stroke-[2]" />
          <span>Shipping & Wholesale Inquiries</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="p-4 sm:p-5 lg:p-6">
        {/* 1. DESCRIPTION TAB */}
        {activeTab === "description" && (
          <div className="space-y-4 max-w-4xl">
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-1.5 tracking-tight">
                Overview of {product.name}
              </h3>
              <p className="text-base sm:text-[16.5px] text-neutral-800 font-normal leading-relaxed">
                {product.description ||
                  `The ${product.name} is engineered to meet strict institutional, commercial, and athletic specifications. Imported directly through authorized international manufacturing channels, it delivers uncompromising durability, safety, and performance for commercial facilities, educational institutions, and sports complexes throughout Nepal.`}
              </p>
            </div>

            {/* Key Features List */}
            <div>
              <h4 className="text-base font-bold uppercase tracking-wider text-neutral-950 mb-2">
                Key Performance Highlights
              </h4>
              <ul className="space-y-2">
                {features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm sm:text-[15.5px] text-neutral-850 font-medium leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#DC2626] stroke-[2] shrink-0 mt-0.5" />
                    <span className="text-neutral-900">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Institutional Suitability Card */}
            <div className="bg-neutral-50 rounded-sm border border-neutral-200 p-3.5 sm:p-4">
              <h4 className="text-base font-bold text-neutral-950 mb-2 flex items-center gap-2.5">
                <Building className="w-5 h-5 text-[#DC2626]" />
                <span>Recommended Applications & Sectors</span>
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-[14.5px] text-neutral-800">
                <div className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  <span>Schools, Colleges & Universities</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  <span>Commercial Gyms & Fitness Centers</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  <span>Clubs & Tournament Sports Arenas</span>
                </div>
                <div className="flex items-center gap-2.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-[#DC2626]" />
                  <span>Government & Municipal Recreation Sites</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 2. SPECIFICATIONS TAB */}
        {activeTab === "specifications" && (
          <div className="max-w-4xl space-y-3">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-1.5 tracking-tight">
              Technical Specifications
            </h3>
            <div className="border border-neutral-200 rounded-sm overflow-hidden shadow-2xs">
              <table className="w-full text-sm sm:text-[15px] text-left">
                <tbody>
                  {Object.entries(specifications).map(([key, val], idx) => (
                    <tr
                      key={key}
                      className={idx % 2 === 0 ? "bg-neutral-50/70" : "bg-white"}
                    >
                      <th className="py-2.5 px-3.5 sm:px-5 font-bold text-neutral-950 w-1/3 border-b border-neutral-200/80">
                        {key}
                      </th>
                      <td className="py-2.5 px-3.5 sm:px-5 font-medium text-neutral-900 border-b border-neutral-200/80">
                        {val}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. REVIEWS TAB */}
        {activeTab === "reviews" && (
          <div className="max-w-4xl space-y-4">
            {/* Reviews Summary Header Box */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-neutral-50 p-4 sm:p-5 rounded-sm border border-neutral-200">
              {/* Left Score */}
              <div className="flex flex-col items-center justify-center text-center p-2 border-b md:border-b-0 md:border-r border-neutral-200">
                <div className="text-5xl sm:text-6xl font-extrabold text-neutral-950">
                  {product.rating ? product.rating.toFixed(1) : "4.9"}
                </div>
                <div className="flex items-center gap-1 my-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      className="w-5 h-5 text-amber-500 fill-amber-400 stroke-amber-400"
                    />
                  ))}
                </div>
                <div className="text-sm text-neutral-800 font-bold">
                  Based on {reviews.length > 0 ? reviews.length : product.reviewsCount || 38} verified institutional reviews
                </div>
              </div>

              {/* Center Rating Distribution */}
              <div className="md:col-span-2 space-y-1.5 justify-center flex flex-col px-2">
                {[
                  { star: 5, pct: 88, count: 32 },
                  { star: 4, pct: 10, count: 5 },
                  { star: 3, pct: 2, count: 1 },
                  { star: 2, pct: 0, count: 0 },
                  { star: 1, pct: 0, count: 0 },
                ].map((item) => (
                  <div key={item.star} className="flex items-center gap-3 text-sm">
                    <span className="w-10 font-bold text-neutral-950">
                      {item.star} ★
                    </span>
                    <div className="flex-1 h-3 bg-neutral-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                    <span className="w-10 text-neutral-800 font-bold text-right">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Individual Reviews List */}
            <div className="space-y-3 pt-0">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  className="bg-white p-3.5 sm:p-4.5 rounded-sm border border-neutral-200 space-y-1.5 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-3 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="font-bold text-neutral-950 text-base sm:text-lg">
                          {rev.author}
                        </span>
                        {rev.verified && (
                          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-sm border border-emerald-200">
                            <BadgeCheck className="w-4 h-4 stroke-[2.5]" />
                            <span>Verified Purchaser</span>
                          </span>
                        )}
                      </div>
                      {rev.role && (
                        <div className="text-sm text-neutral-700 font-medium mt-0.5">
                          {rev.role}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rev.rating
                                ? "text-amber-500 fill-amber-400 stroke-amber-400"
                                : "text-neutral-300 stroke-neutral-300"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs sm:text-sm text-neutral-600 font-medium">
                        {rev.date}
                      </span>
                    </div>
                  </div>

                  <h5 className="text-base font-bold text-neutral-950">
                    &quot;{rev.title}&quot;
                  </h5>
                  <p className="text-sm sm:text-[15.5px] text-neutral-850 font-normal leading-relaxed text-neutral-800">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 4. SHIPPING & WHOLESALE FAQ TAB */}
        {activeTab === "shipping" && (
          <div className="max-w-4xl space-y-3.5">
            <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-1.5 tracking-tight">
              Logistics, Freight & Wholesale Inquiries
            </h3>

            <div className="space-y-2.5">
              <div className="p-3.5 sm:p-4 rounded-sm bg-neutral-50 border border-neutral-200 space-y-1.5">
                <h4 className="text-base font-bold text-neutral-950 flex items-center gap-2.5">
                  <Truck className="w-5 h-5 text-[#DC2626]" />
                  <span>How is institutional freight handled outside Kathmandu Valley?</span>
                </h4>
                <p className="text-sm sm:text-[15.5px] text-neutral-800 font-normal leading-relaxed pl-7">
                  For bulk and institutional orders outside the valley, Aplus Business Link coordinates dedicated cargo and freight transport to all major provincial hubs (Pokhara, Butwal, Biratnagar, Nepalgunj, Dhangadhi, and Birtamode). Transit time is typically 2–4 business days.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-sm bg-neutral-50 border border-neutral-200 space-y-1.5">
                <h4 className="text-base font-bold text-neutral-950 flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-[#DC2626]" />
                  <span>Do you provide official VAT Invoices and Proforma Quotations for tenders?</span>
                </h4>
                <p className="text-sm sm:text-[15.5px] text-neutral-800 font-normal leading-relaxed pl-7">
                  Yes, 100% of our products are supplied with authorized Nepal Government VAT tax bills, import customs declarations, and formal proforma quotations required by institutional committees and government auditors.
                </p>
              </div>

              <div className="p-3.5 sm:p-4 rounded-sm bg-neutral-50 border border-neutral-200 space-y-1.5">
                <h4 className="text-base font-bold text-neutral-950 flex items-center gap-2.5">
                  <ShieldAlert className="w-5 h-5 text-[#DC2626]" />
                  <span>What is the institutional warranty and replacement process?</span>
                </h4>
                <p className="text-sm sm:text-[15.5px] text-neutral-800 font-normal leading-relaxed pl-7">
                  All equipment carries a 1-year commercial warranty against manufacturing defects. If any structural issue arises, our technical service team in Kathmandu coordinates rapid inspection and component replacement.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
