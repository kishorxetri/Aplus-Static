import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { BlogArticle } from "@/data/blogs";

interface BlogCardProps {
  post: BlogArticle;
  featuredLayout?: boolean;
}

export default function BlogCard({ post, featuredLayout = false }: BlogCardProps) {
  if (featuredLayout) {
    return (
      <Link
        href={`/blog/${post.slug}`}
        className="group relative rounded-xl border-2 border-neutral-200 hover:border-[#DC2626] bg-white overflow-hidden hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0 mb-6 sm:mb-8 cursor-pointer block active:scale-[0.99]"
      >
        {/* Left / Top Image */}
        <div className="relative aspect-16/10 lg:aspect-auto lg:col-span-7 overflow-hidden bg-neutral-900 min-h-[210px] sm:min-h-[290px] md:min-h-[350px]">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 1024px) 100vw, 60vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden" />
          {/* Featured Badge */}
          <div className="absolute top-2.5 left-2.5 sm:top-3.5 sm:left-3.5 flex flex-wrap items-center gap-1.5 sm:gap-2">
            <span className="bg-[#DC2626] text-white text-[10.5px] sm:text-xs font-black uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded shadow-md">
              Featured Guide
            </span>
            <span className="bg-white/95 backdrop-blur-xs text-neutral-950 text-[10.5px] sm:text-xs font-extrabold uppercase tracking-wider px-2.5 sm:px-3 py-0.5 sm:py-1 rounded border border-neutral-200 shadow-sm">
              {post.category}
            </span>
          </div>
        </div>

        {/* Right / Content Side */}
        <div className="lg:col-span-5 p-4 sm:p-6 lg:p-8 flex flex-col justify-between bg-white">
          <div>
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 text-xs sm:text-sm font-bold text-neutral-800 mb-2 sm:mb-3">
              <span className="flex items-center gap-1.5 text-neutral-900 font-extrabold">
                <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DC2626] shrink-0" />
                {post.publishedDate}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-400 hidden sm:inline-block" />
              <span className="flex items-center gap-1.5 text-neutral-900 font-extrabold">
                <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DC2626] shrink-0" />
                {post.readTime}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-base sm:text-2xl lg:text-[25px] font-black text-neutral-950 group-hover:text-[#DC2626] transition-colors leading-[1.25] tracking-tight mb-2 sm:mb-3">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-xs sm:text-[14px] md:text-[15px] font-medium sm:font-semibold text-neutral-800 leading-relaxed mb-3 sm:mb-4 line-clamp-3">
              {post.excerpt}
            </p>

            {/* Key takeaway highlight pill */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="bg-neutral-50 rounded-lg p-3 sm:p-3.5 border border-neutral-200 mb-3 sm:mb-4 hidden sm:block">
                <span className="text-[11px] sm:text-xs font-black text-[#DC2626] uppercase tracking-wider block mb-0.5">
                  Key Technical Focus:
                </span>
                <p className="text-xs sm:text-[13px] font-bold text-neutral-950 line-clamp-2 leading-snug">
                  {post.keyTakeaways[0]}
                </p>
              </div>
            )}
          </div>

          {/* Author & Read Action */}
          <div className="pt-3 sm:pt-3.5 border-t-2 border-neutral-200 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
              <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-full overflow-hidden border-2 border-neutral-300 bg-neutral-100 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-black text-neutral-950 block leading-tight truncate max-w-[120px] sm:max-w-[150px]">
                  {post.author.name}
                </span>
                <span className="text-[10.5px] sm:text-[11px] font-bold text-neutral-600 block leading-tight truncate max-w-[120px] sm:max-w-[150px]">
                  {post.author.role.split(" ")[0]} Specialist
                </span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-[#DC2626] group-hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-black rounded-lg shadow-sm transition-all group-hover:shadow-md shrink-0">
              <span>Read Guide</span>
              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-xl border-2 border-neutral-200 hover:border-[#DC2626] bg-white overflow-hidden hover:shadow-lg transition-all duration-300 h-full cursor-pointer block active:scale-[0.99]"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
        {/* Category Badge on top left */}
        <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-xs text-[#DC2626] text-[10.5px] sm:text-xs font-black uppercase tracking-wider px-2 sm:px-2.5 py-0.5 sm:py-1 rounded border border-neutral-200 shadow-sm">
          {post.category}
        </div>
        {/* Read Time on top right */}
        <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 bg-neutral-950/85 backdrop-blur-xs text-white text-[10.5px] sm:text-xs font-bold px-2 sm:px-2.5 py-0.5 sm:py-1 rounded shadow-xs flex items-center gap-1">
          <Clock className="w-3 h-3 text-red-400" />
          <span>{post.readTime}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-3.5 sm:p-5 flex-1 flex flex-col justify-between bg-white">
        <div>
          {/* Publication Date */}
          <div className="flex items-center gap-1.5 text-xs sm:text-[13px] font-bold text-neutral-800 mb-2">
            <Calendar className="w-3.5 h-3.5 text-[#DC2626] shrink-0" />
            <span>{post.publishedDate}</span>
          </div>

          {/* Title */}
          <h3 className="text-[15px] sm:text-lg md:text-[18.5px] font-black text-neutral-950 group-hover:text-[#DC2626] transition-colors leading-[1.3] tracking-tight mb-2 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-[14px] font-medium sm:font-semibold text-neutral-800 leading-relaxed line-clamp-3 mb-3.5">
            {post.excerpt}
          </p>
        </div>

        {/* Footer: Author & Read CTA */}
        <div className="pt-3 border-t-2 border-neutral-200 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <div className="relative w-7 h-7 rounded-full overflow-hidden border border-neutral-300 bg-neutral-100 shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                fill
                className="object-cover"
              />
            </div>
            <span className="text-xs sm:text-sm font-black text-neutral-950 truncate max-w-[110px] sm:max-w-[140px]">
              {post.author.name}
            </span>
          </div>

          <span className="inline-flex items-center gap-1 text-xs sm:text-sm font-black text-[#DC2626] group-hover:text-[#b91c1c] transition-colors shrink-0">
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
