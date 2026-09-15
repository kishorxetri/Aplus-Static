import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight, Calendar, Clock, ShieldCheck } from "lucide-react";
import { BlogArticle } from "@/data/blogs";

interface BlogDetailHeroProps {
  post: BlogArticle;
}

export default function BlogDetailHero({ post }: BlogDetailHeroProps) {
  const bgImage = post.heroBgImage || post.image || "/images/contact-hero.jpg";

  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-300">
      {/* Background Static Image with Dark Contrast Overlay */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={bgImage}
          alt={post.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Deep Contrast Multi-Layer Overlay for extreme readability */}
        <div className="absolute inset-0 bg-neutral-950/80 sm:bg-neutral-950/75" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/85" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 pt-5 sm:pt-8 md:pt-10 pb-6 sm:pb-12 md:pb-14">
        {/* Breadcrumb Navigation inside Hero */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold mb-3 sm:mb-5 text-neutral-300"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-neutral-300 hover:text-white transition-colors shrink-0"
          >
            <Home className="w-3.5 h-3.5 stroke-[2.25]" />
            <span>Home</span>
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

          <Link
            href="/blog"
            className="text-neutral-300 hover:text-white transition-colors shrink-0"
          >
            Our Blogs
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

          <span className="text-red-400 font-bold shrink-0 truncate max-w-[200px] sm:max-w-none">
            {post.category}
          </span>
        </nav>

        {/* Hero Content Header */}
        <div className="max-w-4xl">
          {/* Category Pill */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-0.5 sm:py-1 rounded-full bg-[#DC2626] text-white text-[11px] sm:text-xs font-black uppercase tracking-wider mb-3 sm:mb-4 shadow-md">
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>{post.category}</span>
          </div>

          {/* Main Title - Bold White */}
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-[1.25] sm:leading-[1.2] mb-4 sm:mb-5">
            {post.title}
          </h1>

          {/* Meta Details Row */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-3.5 sm:pt-4 border-t border-white/15 text-xs sm:text-sm font-bold text-neutral-200">
            {/* Author */}
            <div className="flex items-center gap-2 sm:gap-2.5">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-white/30 bg-neutral-800 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <span className="text-white font-extrabold block leading-tight text-xs sm:text-sm">
                  {post.author.name}
                </span>
                <span className="text-neutral-300 text-[11px] sm:text-xs block leading-tight font-medium">
                  {post.author.role}
                </span>
              </div>
            </div>

            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-500" />

            {/* Publication Date */}
            <div className="flex items-center gap-1.5 text-neutral-200 text-xs sm:text-sm">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 shrink-0" />
              <span>{post.publishedDate}</span>
            </div>

            <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-neutral-500" />

            {/* Read Time */}
            <div className="flex items-center gap-1.5 text-neutral-200 text-xs sm:text-sm">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400 shrink-0" />
              <span>{post.readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
