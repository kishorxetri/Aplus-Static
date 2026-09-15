"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Building2 } from "lucide-react";

export interface PartnerSchool {
  id: string;
  name: string;
  location: string;
  logo: string;
}

export const PARTNER_SCHOOLS: PartnerSchool[] = [
  {
    id: "partner-1",
    name: "The British School",
    location: "Jhamsikhel, Lalitpur",
    logo: "/School%20logo/The%20British%20School.jpg",
  },
  {
    id: "partner-2",
    name: "GEMS School",
    location: "Dhapakhel, Lalitpur",
    logo: "/School%20logo/GEMS%20School%20Dhapakhel.png",
  },
  {
    id: "partner-3",
    name: "Little Angels' Education Group",
    location: "Hattiban, Lalitpur",
    logo: "/School%20logo/Little%20Angels'%20education%20GroupHattiban.jpg",
  },
  {
    id: "partner-4",
    name: "Career Building Int'l Academy",
    location: "Kathmandu",
    logo: "/School%20logo/Career%20Building%20International%20Academy.jpg",
  },
  {
    id: "partner-5",
    name: "Regent School",
    location: "Dhapakhel, Lalitpur",
    logo: "/School%20logo/Regent%20School%20Dhapakhel.jpg",
  },
  {
    id: "partner-6",
    name: "Holy Vision School",
    location: "Tahachal, Kathmandu",
    logo: "/School%20logo/Holy%20Vision%20School.png",
  },
  {
    id: "partner-7",
    name: "Mount Olive School",
    location: "Lalitpur",
    logo: "/School%20logo/Mount%20Olive%20School%20Lalitpur.jpg",
  },
  {
    id: "partner-8",
    name: "Royal Kinder Castle",
    location: "Preschool & Day Care",
    logo: "/School%20logo/Royal%20Kinder%20Castile%20Day%20care.jpg",
  },
  {
    id: "partner-9",
    name: "Kinder Pillar",
    location: "Bafal, Kathmandu",
    logo: "/School%20logo/kinder%20pillar%20Bafal.jpg",
  },
  {
    id: "partner-10",
    name: "Shaishav Pathshala",
    location: "Raniban, Kathmandu",
    logo: "/School%20logo/Shaishav%20Pathshala%20Raniban.jpg",
  },
  {
    id: "partner-11",
    name: "Sophia Residential Eng. School",
    location: "Nepalgunj",
    logo: "/School%20logo/Spphia%20Residental%20Eng%20School%20Nepalganj.jpg",
  },
];

export default function OurPartners() {
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll by 1 card width
  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const card = container.querySelector<HTMLElement>("[data-partner-card]");
    const step = card ? card.offsetWidth + 12 : 240;

    if (direction === "right") {
      // If reached near end, wrap smoothly to start
      if (container.scrollLeft + container.clientWidth >= container.scrollWidth - 10) {
        container.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        container.scrollBy({ left: step, behavior: "smooth" });
      }
    } else {
      if (container.scrollLeft <= 10) {
        container.scrollTo({ left: container.scrollWidth, behavior: "smooth" });
      } else {
        container.scrollBy({ left: -step, behavior: "smooth" });
      }
    }
  };

  // Auto-scroll effect: advances by 1 partner every 2.8 seconds when not hovered
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      scroll("right");
    }, 2800);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <section
      className="w-full py-6 sm:py-7 lg:py-8 bg-neutral-50/80 border-t border-b border-neutral-300 overflow-hidden select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      aria-label="Our Partners"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-3.5 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
            Our Partners
          </h2>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Previous partners"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-neutral-300 text-neutral-700 hover:text-white hover:bg-[#DC2626] hover:border-[#DC2626] shadow-xs flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.25]" />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Next partners"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white border border-neutral-300 text-neutral-700 hover:text-white hover:bg-[#DC2626] hover:border-[#DC2626] shadow-xs flex items-center justify-center transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.25]" />
            </button>
          </div>
        </div>

        {/* 5 in 1 Row Partner Carousel Track */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex items-stretch gap-2.5 sm:gap-3 overflow-x-auto scroll-smooth scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden py-1 px-0.5"
          >
            {PARTNER_SCHOOLS.map((school) => (
              <div
                key={school.id}
                data-partner-card
                className="w-[calc(50%-6px)] sm:w-[calc(33.333%-8px)] lg:w-[calc(20%-10px)] shrink-0 group flex flex-col items-center text-center bg-white rounded-xl border border-neutral-200 p-3 sm:p-3.5 shadow-xs hover:shadow-md hover:border-[#DC2626]/50 transition-all duration-300"
              >
                {/* School Logo Container */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 relative rounded-lg bg-neutral-50 group-hover:bg-white border border-neutral-100 group-hover:border-neutral-200 flex items-center justify-center p-1.5 mb-2 sm:mb-2.5 transition-colors">
                  <Image
                    src={school.logo}
                    alt={`${school.name} logo`}
                    fill
                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 140px"
                    className="object-contain p-1 transition-transform duration-300 group-hover:scale-105"
                  />
                </div>

                {/* School Details */}
                <div className="w-full flex-1 flex flex-col justify-center">
                  <h3
                    title={school.name}
                    className="text-sm sm:text-base font-bold text-neutral-900 group-hover:text-[#DC2626] transition-colors line-clamp-2 leading-snug"
                  >
                    {school.name}
                  </h3>
                  <div className="mt-1 flex items-center justify-center gap-1 text-xs sm:text-[13px] font-semibold text-neutral-600 line-clamp-1">
                    <Building2 className="w-3.5 h-3.5 shrink-0 text-neutral-400" />
                    <span>{school.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
