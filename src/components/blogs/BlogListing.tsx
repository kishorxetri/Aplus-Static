"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Search, X, BookOpen, Tag, SearchX, PhoneCall } from "lucide-react";
import { BlogArticle } from "@/data/blogs";
import BlogCard from "./BlogCard";
import QuoteModal from "@/components/QuoteModal";

interface BlogListingProps {
  initialPosts: BlogArticle[];
  categories: { name: string; slug: string; count: number }[];
}

const POPULAR_SEARCH_TOPICS = [
  "Turf",
  "Gym",
  "Playground",
  "Furniture",
  "FIFA",
  "Basketball",
];

export default function BlogListing({ initialPosts, categories }: BlogListingProps) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Sync state on client mount and whenever searchParams change without SSR hydration mismatch
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s =
      searchParams.get("search") ||
      searchParams.get("q") ||
      params.get("search") ||
      params.get("q") ||
      "";
    const c =
      searchParams.get("category") ||
      params.get("category") ||
      "all";
    setSearchQuery(s);
    setSelectedCategory(c);
  }, [searchParams.toString()]);

  // Handle category selection
  const handleCategorySelect = (categorySlug: string) => {
    setSelectedCategory(categorySlug);
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    if (categorySlug === "all") {
      params.delete("category");
    } else {
      params.set("category", categorySlug);
    }
    const newQueryString = params.toString();
    router.replace(newQueryString ? `/blog?${newQueryString}` : "/blog", { scroll: false });
  };

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    if (value.trim()) {
      params.set("search", value.trim());
    } else {
      params.delete("search");
      params.delete("q");
    }
    const newQueryString = params.toString();
    router.replace(newQueryString ? `/blog?${newQueryString}` : "/blog", { scroll: false });
  };

  // Handle reset
  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    router.replace("/blog", { scroll: false });
  };

  // Deep multi-token search across titles, excerpts, tags, takeaways, and section body content
  const filteredPosts = useMemo(() => {
    return initialPosts.filter((post) => {
      const matchesCategory =
        selectedCategory === "all" || post.categorySlug === selectedCategory;

      if (!matchesCategory) return false;

      const trimmed = searchQuery.toLowerCase().trim();
      if (!trimmed) return true;

      // Split into keywords for multi-token search
      const keywords = trimmed.split(/\s+/).filter(Boolean);

      // Aggregate all searchable text for this article
      const contentText = post.content
        .map(
          (sec) =>
            `${sec.heading || ""} ${sec.subheading || ""} ${sec.paragraphs.join(" ")} ${
              sec.bullets?.join(" ") || ""
            } ${sec.tip || ""}`
        )
        .join(" ");

      const searchableBlob = `
        ${post.title}
        ${post.excerpt}
        ${post.category}
        ${post.categorySlug}
        ${post.tags.join(" ")}
        ${post.keyTakeaways?.join(" ") || ""}
        ${contentText}
      `.toLowerCase();

      // Check if every search keyword is present in the article
      return keywords.every((keyword) => searchableBlob.includes(keyword));
    });
  }, [initialPosts, selectedCategory, searchQuery]);

  // Separate the top featured post only if we are in "all" category and no search active
  const hasActiveFilter = searchQuery.trim() !== "" || selectedCategory !== "all";

  const featuredPost =
    !hasActiveFilter && initialPosts.length > 0
      ? initialPosts.find((p) => p.featured) || initialPosts[0]
      : null;

  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  return (
    <section className="w-full py-5 sm:py-10 md:py-12 bg-neutral-100/70 border-b border-neutral-300">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Controls Bar: Category Pills + Search Bar */}
        <div className="bg-white p-3.5 sm:p-5 rounded-xl border-2 border-neutral-200 hover:border-neutral-300 shadow-sm mb-5 sm:mb-8 transition-colors">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4">
            {/* Category Filter Pills (Touch friendly horizontal scroll with snap) */}
            <div className="relative -mx-1 px-1">
              <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1.5 lg:pb-0 scrollbar-none snap-x touch-pan-x">
                <button
                  type="button"
                  onClick={() => handleCategorySelect("all")}
                  className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer shrink-0 snap-start active:scale-95 ${
                    selectedCategory === "all"
                      ? "bg-[#DC2626] text-white shadow-sm ring-2 ring-[#DC2626]/20"
                      : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-300"
                  }`}
                >
                  All Articles ({initialPosts.length})
                </button>

                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => handleCategorySelect(cat.slug)}
                    className={`px-3.5 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-black whitespace-nowrap transition-all cursor-pointer shrink-0 snap-start active:scale-95 ${
                      selectedCategory === cat.slug
                        ? "bg-[#DC2626] text-white shadow-sm ring-2 ring-[#DC2626]/20"
                        : "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border border-neutral-300"
                    }`}
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Live Search Input with Instant Clear */}
            <div className="relative w-full lg:w-80 shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500 stroke-[2.5]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search articles, turf, gym..."
                className="w-full pl-10 pr-9 py-2.5 bg-neutral-50 border-2 border-neutral-300 focus:border-[#DC2626] focus:bg-white rounded-lg text-xs sm:text-sm font-bold text-neutral-950 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/15 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => handleSearchChange("")}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 p-1.5 rounded-full cursor-pointer hover:bg-neutral-200 transition-colors"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Popular Topic Search Suggestions */}
          <div className="mt-3 pt-3 border-t border-neutral-200 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-bold text-neutral-800">
            <span className="flex items-center gap-1 text-neutral-700 font-extrabold mr-0.5">
              <Tag className="w-3.5 h-3.5 text-[#DC2626]" />
              Popular Searches:
            </span>
            {POPULAR_SEARCH_TOPICS.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => handleSearchChange(topic)}
                className={`px-2.5 py-1 rounded-md text-[11px] sm:text-xs font-bold transition-all cursor-pointer border active:scale-95 ${
                  searchQuery.toLowerCase() === topic.toLowerCase()
                    ? "bg-[#DC2626] text-white border-[#DC2626] shadow-xs"
                    : "bg-neutral-100 hover:bg-neutral-200 text-neutral-900 border-neutral-300"
                }`}
              >
                #{topic}
              </button>
            ))}
          </div>

          {/* Active Filter Indicators */}
          {(searchQuery || selectedCategory !== "all") && (
            <div className="mt-3 pt-3 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs sm:text-sm font-bold text-neutral-800">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-neutral-950 font-extrabold text-xs sm:text-sm">
                  {filteredPosts.length === 0
                    ? "0 Results found for:"
                    : `Showing ${filteredPosts.length} result${filteredPosts.length === 1 ? "" : "s"} for:`}
                </span>

                {selectedCategory !== "all" && (
                  <span className="px-2.5 py-1 rounded-md bg-neutral-900 text-white text-[11px] sm:text-xs font-black shadow-xs">
                    Category: {categories.find((c) => c.slug === selectedCategory)?.name}
                  </span>
                )}

                {searchQuery && (
                  <span className="px-2.5 py-1 rounded-md bg-red-100 text-[#DC2626] text-[11px] sm:text-xs font-black border border-red-200 flex items-center gap-1.5 shadow-xs">
                    &ldquo;{searchQuery}&rdquo;
                    <button
                      type="button"
                      onClick={() => handleSearchChange("")}
                      className="hover:text-black cursor-pointer p-0.5"
                      title="Clear keyword"
                    >
                      <X className="w-3.5 h-3.5 inline" />
                    </button>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleResetFilters}
                className="text-[#DC2626] hover:underline font-black cursor-pointer text-xs sm:text-sm self-start sm:self-auto"
              >
                Reset all filters
              </button>
            </div>
          )}
        </div>

        {/* Featured Big Spotlight Banner (Only when NO active search or category filter) */}
        {featuredPost && (
          <div className="mb-5 sm:mb-8">
            <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
              <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-[#DC2626]" />
              <h2 className="text-sm sm:text-lg md:text-xl font-black text-neutral-950 uppercase tracking-wider">
                Featured Article
              </h2>
            </div>
            <BlogCard post={featuredPost} featuredLayout={true} />
          </div>
        )}

        {/* Blog Cards Grid */}
        {filteredPosts.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-3.5 sm:mb-6">
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-neutral-950 tracking-tight">
                {!hasActiveFilter
                  ? "Latest Published Articles"
                  : `Search Results (${filteredPosts.length})`}
              </h2>
              <span className="text-xs sm:text-sm font-bold text-neutral-900 bg-white px-2.5 sm:px-3 py-1 rounded-md border border-neutral-300 shadow-2xs">
                {filteredPosts.length} {filteredPosts.length === 1 ? "Article" : "Articles"}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-7">
              {gridPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        ) : (
          /* Professional Empty State: "No Articles Found / Not Available" */
          <div className="bg-white rounded-xl border-2 border-neutral-200 p-5 sm:p-8 md:p-12 text-center my-4 sm:my-6 shadow-sm">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center mx-auto mb-3.5 sm:mb-4 border-2 border-red-200 shadow-xs">
              <SearchX className="w-6 h-6 sm:w-8 sm:h-8 stroke-[2.25]" />
            </div>

            <h3 className="text-lg sm:text-2xl font-black text-neutral-950 mb-2">
              Sorry, No Articles Found
            </h3>

            <p className="text-xs sm:text-base font-bold text-neutral-800 max-w-lg mx-auto mb-5 sm:mb-6 leading-relaxed">
              We couldn&apos;t find any guides or technical blueprints matching{" "}
              {searchQuery ? (
                <span className="text-[#DC2626] font-black">&ldquo;{searchQuery}&rdquo;</span>
              ) : (
                "the selected filters"
              )}
              . Try searching with different keywords, or explore our primary product categories below.
            </p>

            {/* Quick Category Suggestions */}
            <div className="max-w-xl mx-auto mb-6 sm:mb-8 p-3 sm:p-4 bg-neutral-50 rounded-xl border border-neutral-200">
              <span className="text-[11px] sm:text-xs font-black uppercase tracking-wider text-neutral-600 block mb-2.5 sm:mb-3">
                Browse Popular Categories:
              </span>
              <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat.slug}
                    type="button"
                    onClick={() => {
                      setSearchQuery("");
                      handleCategorySelect(cat.slug);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#DC2626] hover:text-white border border-neutral-300 text-xs sm:text-sm font-bold text-neutral-900 transition-all shadow-2xs active:scale-95 cursor-pointer"
                  >
                    {cat.name} ({cat.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-98 text-white font-black text-xs sm:text-sm rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Clear Search & View All Articles</span>
              </button>

              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="w-full sm:w-auto px-5 sm:px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 active:scale-98 text-white font-black text-xs sm:text-sm rounded-lg shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <PhoneCall className="w-4 h-4 text-red-400" />
                <span>Request Custom Inquiry</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Embedded Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </section>
  );
}
