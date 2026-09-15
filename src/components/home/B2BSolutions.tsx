"use client";

import { useState } from "react";
import Image from "next/image";
import {
  ArrowRight,
  Trophy,
  Tent,
  Sprout,
  Building2,
  Phone,
} from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

const B2B_SERVICES = [
  {
    id: "playground-recreation",
    title: "Playground Projects",
    desc: "Custom outdoor multi-play towers, spiral slides, swings & shock-absorbing tiles.",
    icon: Tent,
  },
  {
    id: "sports-equipment",
    title: "Sports Supply",
    desc: "Tournament-grade equipment for football, basketball, badminton & volleyball courts.",
    icon: Trophy,
  },
  {
    id: "artificial-turf",
    title: "Turf Projects",
    desc: "50mm FIFA standard football turf pitches & landscape multi-purpose synthetic grass.",
    icon: Sprout,
  },
  {
    id: "commercial-fitness",
    title: "Bulk Orders",
    desc: "Tiered institutional wholesale pricing, formal proforma invoices & nationwide logistics.",
    icon: Building2,
  },
];

export default function B2BSolutions() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );

  const handleOpenQuote = (categoryId?: string) => {
    setSelectedCategory(categoryId);
    setIsQuoteOpen(true);
  };

  return (
    <>
      <section className="w-full py-5 sm:py-6 lg:py-8 bg-white border-t border-neutral-300">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-8 xl:gap-10">
            {/* ================================================================= */}
            {/* LEFT: Clean Project / Commercial Playground Showcase Image        */}
            {/* ================================================================= */}
            <div className="relative w-full lg:w-[40%] xl:w-[38%] min-h-[260px] sm:min-h-[340px] lg:min-h-[420px] rounded-xl sm:rounded-2xl overflow-hidden border border-neutral-300 shadow-xs group bg-neutral-100 shrink-0">
              <Image
                src="/images/categories/playground-recreation.jpg"
                alt="Aplus Business Link Commercial Playground and Sports Infrastructure Projects"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                priority={false}
              />
            </div>

            {/* ================================================================= */}
            {/* RIGHT: B2B Solutions Details & 2x2 Feature Grid                    */}
            {/* ================================================================= */}
            <div className="w-full lg:w-[60%] xl:w-[62%] flex flex-col justify-between py-1">
              <div>
                {/* Main Headline */}
                <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold text-neutral-950 tracking-tight">
                  Business Solutions
                </h2>

                {/* Description: larger, bold, deep black contrast */}
                <p className="text-[15px] sm:text-base font-semibold text-neutral-900 leading-relaxed mt-2 sm:mt-2.5 max-w-2xl">
                  We supply certified products and turnkey infrastructure solutions
                  for businesses, schools, sports facilities, municipalities, and
                  commercial institutions across Nepal.
                </p>

                {/* 2x2 Solutions Grid: larger text, tight gaps */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mt-4 sm:mt-5">
                  {B2B_SERVICES.map((service) => {
                    const Icon = service.icon;
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => handleOpenQuote(service.id)}
                        className="text-left p-3.5 sm:p-4 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] hover:shadow-xs transition-all duration-200 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shadow-2xs shrink-0 mt-0.5">
                            <Icon className="w-4.5 h-4.5 stroke-[2.25]" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h3 className="text-[15px] sm:text-base font-bold text-neutral-950 group-hover:text-[#DC2626] transition-colors leading-snug">
                              {service.title}
                            </h3>
                            <p className="text-[13px] sm:text-[13.5px] font-semibold text-neutral-900 leading-snug mt-1">
                              {service.desc}
                            </p>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons: Get a Quote CTA & Phone Hotline */}
              <div className="mt-5 sm:mt-6 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
                <button
                  type="button"
                  onClick={() => handleOpenQuote()}
                  className="px-6 py-2.5 sm:py-3 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.99] text-white text-[15px] sm:text-base font-bold rounded-lg shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                >
                  <span>Get a Quote</span>
                  <ArrowRight className="w-4.5 h-4.5 stroke-[2.5]" />
                </button>

                <div className="flex items-center gap-2.5 text-xs sm:text-sm">
                  <div className="w-9 h-9 rounded-full bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0">
                    <Phone className="w-4 h-4 stroke-[2.25]" />
                  </div>
                  <div>
                    <span className="block text-neutral-600 text-xs font-semibold leading-none mb-0.5">
                      Direct B2B Desk
                    </span>
                    <a
                      href="tel:+97714500000"
                      className="font-bold text-neutral-950 hover:text-[#DC2626] transition-colors text-sm sm:text-[15px]"
                    >
                      +977 1-4500000 / 9851000000
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Embedded Quote Modal Triggered by Get a Quote or Solution Cards */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
        defaultCategory={selectedCategory}
      />
    </>
  );
}
