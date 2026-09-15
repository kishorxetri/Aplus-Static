"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Calendar, BookOpen } from "lucide-react";

export interface GuideArticle {
  id: string;
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
}

export const LATEST_GUIDES: GuideArticle[] = [
  {
    id: "turf-guide",
    slug: "choosing-right-artificial-turf-futsal-nepal",
    category: "Turf & Sports",
    title: "Choosing the Right Artificial Turf for Futsal & Multi-Sport Arenas",
    excerpt:
      "A complete technical guide on pile height, infill sand/rubber ratios, drainage layers, and FIFA durability benchmarks.",
    image: "/images/blogs/turf-guide.jpg",
    readTime: "5 min read",
    date: "Sep 2026",
  },
  {
    id: "gym-setup-guide",
    slug: "commercial-gym-equipment-setup-guide",
    category: "Commercial Fitness",
    title: "Commercial Gym Setup: Equipment Selection & Space Optimization",
    excerpt:
      "Essential planning steps for cardio rows, selectorized strength stations, power racks, and high-impact rubber flooring.",
    image: "/images/blogs/gym-setup-guide.jpg",
    readTime: "7 min read",
    date: "Aug 2026",
  },
  {
    id: "playground-safety-guide",
    slug: "school-playground-equipment-safety-standards",
    category: "Playground & Kids",
    title: "School Playground Safety Standards: Choosing Certified Equipment",
    excerpt:
      "Key regulations on critical fall heights, EN1176 compliance, UV-stabilized materials, and shock-absorbing playground surfaces.",
    image: "/images/blogs/playground-safety-guide.jpg",
    readTime: "4 min read",
    date: "Aug 2026",
  },
  {
    id: "school-furniture-guide",
    slug: "ergonomic-classroom-furniture-schools-colleges",
    category: "Institutional Supply",
    title: "Ergonomic Classroom Furniture: Supporting Posture & Student Focus",
    excerpt:
      "Selecting heavy-duty, height-appropriate dual desks, ergonomic student chairs, and collaborative modular classroom layouts.",
    image: "/images/blogs/school-furniture-guide.jpg",
    readTime: "6 min read",
    date: "Jul 2026",
  },
];

export default function LatestGuides() {
  return (
    <section className="w-full py-8 sm:py-10 lg:py-12 bg-neutral-50 border-t border-neutral-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight">
            Buying Guides & Articles
          </h2>

          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-950 hover:text-[#DC2626] transition-colors group shrink-0"
          >
            <span>View All Guides</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Guides Grid / Hand-Scrollable Carousel: Exactly 1 card per row on small devices, 4 in a row on desktop */}
        <div className="flex lg:grid lg:grid-cols-4 gap-4 sm:gap-5 overflow-x-auto lg:overflow-visible pb-3 sm:pb-4 lg:pb-0 scroll-smooth snap-x snap-mandatory scrollbar-none [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {LATEST_GUIDES.map((guide) => (
            <Link
              key={guide.id}
              href={`/blog/${guide.slug}`}
              className="group flex flex-col rounded-lg border border-neutral-300 bg-white overflow-hidden hover:border-[#DC2626] hover:shadow-md transition-all duration-300 w-full min-w-full md:min-w-0 md:w-[calc((100%-20px)/2)] lg:w-auto shrink-0 lg:shrink snap-start"
            >
              {/* Image Container */}
              <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-100">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                {/* Category Pill on top left */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#DC2626] text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-md border border-neutral-200 shadow-2xs">
                  {guide.category}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-4 sm:p-4.5 flex-1 flex flex-col justify-between">
                <div>
                  {/* Meta: Date & Read Time */}
                  <div className="flex items-center gap-3 text-[11px] sm:text-xs font-semibold text-neutral-700 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-neutral-500" />
                      {guide.date}
                    </span>
                    <span className="inline-block w-1 h-1 rounded-full bg-neutral-400" />
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      {guide.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-base sm:text-[17px] font-black text-neutral-950 group-hover:text-[#DC2626] transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h3>

                  {/* Excerpt: larger, bolder, deep black */}
                  <p className="text-[14px] sm:text-[14.5px] font-bold text-neutral-900 line-clamp-2 leading-relaxed mt-2">
                    {guide.excerpt}
                  </p>
                </div>

                {/* Footer Link */}
                <div className="mt-4 pt-3 border-t border-neutral-200 flex items-center justify-between text-xs sm:text-[13px] font-bold text-[#DC2626]">
                  <span className="inline-flex items-center gap-1 group-hover:gap-1.5 transition-all">
                    Read Guide
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                  <BookOpen className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
