"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface BannerItem {
  id: string;
  image: string;
  alt: string;
  href?: string;
}

export const HERO_BANNERS: BannerItem[] = [
  {
    id: "playground-banner",
    image: "/Website-banner/swing-banner.png",
    alt: "Playground Equipment - Safe, Durable, Fun Playground Structures & Swings",
    href: "/category/playground-recreation",
  },
  {
    id: "sports-banner",
    image: "/Website-banner/football-cricket-banner.png",
    alt: "Sports Equipment - Football, Cricket & Athletic Gear",
    href: "/category/sports-equipment",
  },
  {
    id: "turf-banner",
    image: "/Website-banner/artificial-turf-banner.png",
    alt: "Artificial Turf - FIFA Quality Synthetic Grass & Lawns",
    href: "/category/artificial-turf",
  },
  {
    id: "badminton-banner",
    image: "/Website-banner/badminton-banner.png",
    alt: "Badminton Equipment - Rackets, Shuttles & Tournament Accessories",
    href: "/category/sports-equipment",
  },
  {
    id: "basketball-banner",
    image: "/Website-banner/basketball-banner.png",
    alt: "Basketball Equipment - Hoops, Backboards & Training Balls",
    href: "/category/sports-equipment",
  },
  {
    id: "climbing-banner",
    image: "/Website-banner/Rockclimb-banner.png",
    alt: "Climbing Wall - Safe & High-Density Indoor & Outdoor Climbing Adventure",
    href: "/category/playground-recreation",
  },
  {
    id: "pool-banner",
    image: "/Website-banner/swimming-pool-banner.png",
    alt: "Intex Frame Pool - Family Friendly Swimming Pools & Aquatic Recreation",
    href: "/category/playground-recreation",
  },
  {
    id: "fitness-banner",
    image: "/Website-banner/Aplus-slider-1.png",
    alt: "Fitness & Exercise Ball - Stronger Core, Better You",
    href: "/category/commercial-fitness",
  },
];

export default function HeroBannerSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to slide by index
  const scrollToIndex = (idx: number) => {
    if (!scrollContainerRef.current) return;
    const width = scrollContainerRef.current.clientWidth;
    scrollContainerRef.current.scrollTo({
      left: idx * width,
      behavior: "smooth",
    });
    setCurrentIndex(idx);
  };

  const nextSlide = () => {
    const next = (currentIndex + 1) % HERO_BANNERS.length;
    scrollToIndex(next);
  };

  const prevSlide = () => {
    const prev = (currentIndex - 1 + HERO_BANNERS.length) % HERO_BANNERS.length;
    scrollToIndex(prev);
  };

  // Sync currentIndex when user scrolls freely by hand
  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, clientWidth } = scrollContainerRef.current;
    if (clientWidth > 0) {
      const newIdx = Math.round(scrollLeft / clientWidth);
      if (newIdx !== currentIndex && newIdx >= 0 && newIdx < HERO_BANNERS.length) {
        setCurrentIndex(newIdx);
      }
    }
  };

  // Auto slide on desktop when not hovered
  useEffect(() => {
    if (isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => {
        const next = (prev + 1) % HERO_BANNERS.length;
        if (scrollContainerRef.current) {
          const width = scrollContainerRef.current.clientWidth;
          scrollContainerRef.current.scrollTo({
            left: next * width,
            behavior: "smooth",
          });
        }
        return next;
      });
    }, 5000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isHovered]);

  return (
    <div
      className="relative w-full h-[220px] sm:h-[280px] md:h-[330px] lg:h-[370px] rounded-none lg:rounded-lg border-b lg:border border-neutral-300 shadow-none lg:shadow-sm overflow-hidden bg-neutral-100 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      aria-label="Promotional Banners Slider"
    >
      {/* Free-hand Scrollable Track on touch/mobile, and smooth programmatic scroll */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex w-full h-full overflow-x-auto scroll-smooth snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {HERO_BANNERS.map((banner, index) => (
          <div
            key={banner.id}
            className="w-full min-w-full h-full shrink-0 snap-start relative select-none"
          >
            <Link
              href={banner.href || "/products"}
              className="block relative w-full h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
              aria-label={banner.alt}
            >
              <Image
                src={banner.image}
                alt={banner.alt}
                fill
                priority={index === 0}
                sizes="(max-width: 1024px) 100vw, 1100px"
                className="object-cover object-center pointer-events-none select-none"
                draggable={false}
              />
            </Link>
          </div>
        ))}
      </div>

      {/* Navigation Arrows (Desktop hover only) */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous Slide"
        className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-[#DC2626] shadow-md items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
      >
        <ChevronLeft className="w-5 h-5 stroke-[2.25]" />
      </button>

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next Slide"
        className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-neutral-800 hover:text-[#DC2626] shadow-md items-center justify-center backdrop-blur-xs transition-all opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
      >
        <ChevronRight className="w-5 h-5 stroke-[2.25]" />
      </button>

      {/* Floating Indicator Dots: Visible and fully responsive on mobile, sm, and desktop */}
      <div className="flex absolute bottom-2.5 sm:bottom-3.5 left-1/2 -translate-x-1/2 z-20 items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-black/40 backdrop-blur-xs border border-white/25 shadow-md pointer-events-auto">
        {HERO_BANNERS.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => scrollToIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className="p-1 -m-0.5 flex items-center justify-center cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
          >
            <span
              className={`block transition-all duration-300 rounded-full ${
                idx === currentIndex
                  ? "w-6 sm:w-7 h-2 sm:h-2.5 bg-[#DC2626] ring-1 ring-white/80 shadow-xs"
                  : "w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/75 hover:bg-white hover:scale-125 ring-1 ring-black/30"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
