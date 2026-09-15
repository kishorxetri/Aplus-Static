"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, PhoneCall } from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

export default function FinalCTA() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [offsetY, setOffsetY] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  // Smooth parallax scroll calculation
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Only calculate if visible in viewport or near viewport
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
        // Translate smoothly by -35px to +35px
        setOffsetY((progress - 0.5) * 65);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        aria-label="Call to Action"
        className="relative w-full overflow-hidden border-t border-neutral-300"
      >
        {/* ================================================================= */}
        {/* Parallax Background Image Container                              */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 w-full h-[125%] -top-[12%] pointer-events-none will-change-transform transition-transform duration-75 ease-out"
          style={{
            transform: `translate3d(0, ${offsetY}px, 0)`,
          }}
        >
          <Image
            src="/images/final-cta-bg.jpg"
            alt="Modern commercial indoor sports arena and adventure playground facility"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority={false}
          />
        </div>

        {/* ================================================================= */}
        {/* Professional Black Overlay (Keeps image clearly visible & rich)   */}
        {/* ================================================================= */}
        <div
          className="absolute inset-0 bg-black/65 sm:bg-black/60"
          aria-hidden="true"
        />

        {/* Subtle Radial Gradient to enhance center focus & contrast */}
        <div
          className="absolute inset-0 bg-radial-[circle_at_center,transparent_0%,rgba(0,0,0,0.45)_100%]"
          aria-hidden="true"
        />

        {/* ================================================================= */}
        {/* Content Container - Center Aligned & Compact Vertical Gaps         */}
        {/* ================================================================= */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-7 text-center">
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* Main Headline - Large, prominent, bold & high-contrast */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-white tracking-tight leading-[1.15]">
              Ready to Upgrade Your Sports & Playground Space?
            </h2>

            {/* Action Buttons in ONE line with tight vertical gap */}
            <div className="flex flex-row items-center justify-center gap-3 sm:gap-4 mt-3 sm:mt-3.5">
              {/* Primary Quote CTA Button */}
              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="px-5 sm:px-6 py-2.5 sm:py-3 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] text-white font-bold text-sm sm:text-base rounded-lg shadow-md hover:shadow-red-600/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
              >
                <span>Request a Quote</span>
                <ArrowRight className="w-4 h-4 stroke-[2.25]" />
              </button>

              {/* Secondary Call / Hotline CTA */}
              <a
                href="tel:+97714500000"
                className="px-4 sm:px-6 py-2.5 sm:py-3 bg-white hover:bg-neutral-100 active:scale-[0.98] text-neutral-950 font-bold text-sm sm:text-base rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white whitespace-nowrap"
              >
                <PhoneCall className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DC2626]" />
                <span>+977 1-4500000</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </>
  );
}
