"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  X,
  Calendar,
  Clock,
  ArrowRight,
  CheckCircle2,
  Share2,
  Check,
  BookOpen,
  ShieldCheck,
  Tag,
  Info,
  Quote,
  SearchX,
} from "lucide-react";
import { BlogArticle, getAllBlogs } from "@/data/blogs";
import QuoteModal from "@/components/QuoteModal";

interface BlogDetailContentProps {
  post: BlogArticle;
  latestBlogs: BlogArticle[];
  categories?: { name: string; slug: string; count: number }[];
  relatedBlogs: BlogArticle[];
}

export default function BlogDetailContent({
  post,
  latestBlogs,
  relatedBlogs,
}: BlogDetailContentProps) {
  const router = useRouter();
  const [sidebarSearch, setSidebarSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  const allPosts = useMemo(() => getAllBlogs(), []);

  // Compute live search suggestions for sidebar
  const liveSuggestions = useMemo(() => {
    const trimmed = sidebarSearch.toLowerCase().trim();
    if (!trimmed) return [];

    const keywords = trimmed.split(/\s+/).filter(Boolean);

    return allPosts.filter((article) => {
      const contentText = article.content
        .map((s) => `${s.heading || ""} ${s.paragraphs.join(" ")}`)
        .join(" ");
      const blob = `${article.title} ${article.excerpt} ${article.category} ${article.tags.join(" ")} ${contentText}`.toLowerCase();
      return keywords.every((kw) => blob.includes(kw));
    }).slice(0, 3);
  }, [sidebarSearch, allPosts]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sidebarSearch.trim()) {
      router.push(`/blog?search=${encodeURIComponent(sidebarSearch.trim())}`);
    } else {
      router.push(`/blog`);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <section className="w-full py-5 sm:py-8 md:py-10 bg-neutral-100/60 border-b border-neutral-300">
      <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-8">
          {/* ============================================================= */}
          {/* LEFT COLUMN: Featured Image + Rich Blog Content (8 Cols)     */}
          {/* ============================================================= */}
          <main className="lg:col-span-8 flex flex-col space-y-4 sm:space-y-6">
            {/* 1. Featured Image Container */}
            <div className="bg-white rounded-xl border-2 border-neutral-200 overflow-hidden shadow-sm">
              <div className="relative aspect-16/9 sm:aspect-16/9 md:aspect-21/9 lg:aspect-16/9 w-full bg-neutral-900">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>
              <div className="p-2.5 sm:p-3.5 bg-neutral-50 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2 text-[11px] sm:text-xs font-bold text-neutral-800">
                <span className="flex items-center gap-1.5 text-neutral-950 font-extrabold">
                  <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DC2626] shrink-0" />
                  A Plus Business Link Technical Blueprint & Setup Guide
                </span>
                <span className="text-neutral-700 hidden sm:inline font-bold">
                  Verified Commercial Standard
                </span>
              </div>
            </div>

            {/* 2. Key Takeaways Box */}
            {post.keyTakeaways && post.keyTakeaways.length > 0 && (
              <div className="bg-white rounded-xl p-3.5 sm:p-5 border-2 border-neutral-200 shadow-sm">
                <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                  <span className="p-1 rounded bg-red-100 text-[#DC2626]">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                  </span>
                  <h3 className="text-sm sm:text-lg font-black text-neutral-950 uppercase tracking-tight">
                    Key Highlights & Takeaways
                  </h3>
                </div>

                <ul className="space-y-2 sm:space-y-2.5">
                  {post.keyTakeaways.map((takeaway, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-[15px] md:text-[16px] font-bold text-neutral-950 leading-relaxed"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0 mt-2" />
                      <span>{takeaway}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 3. Rich Text Content Body */}
            <article className="bg-white rounded-xl p-3.5 sm:p-6 md:p-7 border-2 border-neutral-200 shadow-sm space-y-4 sm:space-y-6">
              {post.content.map((section, idx) => (
                <div key={idx} className="space-y-2.5 sm:space-y-3.5">
                  {/* Section Heading - Bold Black */}
                  {section.heading && (
                    <h2 className="text-lg sm:text-2xl md:text-[24px] font-black text-neutral-950 tracking-tight leading-snug pt-1 border-b border-neutral-200 pb-2 sm:pb-2.5">
                      {section.heading}
                    </h2>
                  )}

                  {/* Section Subheading */}
                  {section.subheading && (
                    <h3 className="text-base sm:text-[19px] font-black text-neutral-950 tracking-tight">
                      {section.subheading}
                    </h3>
                  )}

                  {/* Paragraphs */}
                  {section.paragraphs.map((p, pIdx) => (
                    <p
                      key={pIdx}
                      className="text-[14.5px] sm:text-[16.5px] md:text-[17.5px] font-medium sm:font-semibold text-neutral-950 leading-[1.75] sm:leading-[1.8]"
                    >
                      {p}
                    </p>
                  ))}

                  {/* Blockquote / Industry Quote Highlight */}
                  {section.quote && (
                    <blockquote className="my-3 sm:my-4 p-3.5 sm:p-5 bg-red-50/50 border-l-4 border-[#DC2626] rounded-r-xl relative">
                      <div className="flex items-start gap-2.5 sm:gap-3">
                        <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-[#DC2626] shrink-0 mt-0.5 opacity-80" />
                        <p className="text-xs sm:text-[15.5px] font-bold text-neutral-950 italic leading-relaxed">
                          &ldquo;{section.quote}&rdquo;
                        </p>
                      </div>
                    </blockquote>
                  )}

                  {/* Bullets */}
                  {section.bullets && section.bullets.length > 0 && (
                    <div className="bg-neutral-50 rounded-xl p-3 sm:p-4.5 border border-neutral-200 my-2.5 sm:my-3 space-y-1.5 sm:space-y-2">
                      {section.bullets.map((bullet, bIdx) => (
                        <div
                          key={bIdx}
                          className="flex items-start gap-2 sm:gap-2.5 text-xs sm:text-[15px] sm:text-[16.5px] font-bold text-neutral-950 leading-relaxed"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] shrink-0 mt-2" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Technical Table with Horizontal Scroll for Mobile */}
                  {section.tableData && (
                    <div className="my-3 sm:my-4 overflow-hidden rounded-xl border-2 border-neutral-200">
                      <div className="overflow-x-auto scrollbar-none touch-pan-x">
                        <table className="w-full text-left text-xs sm:text-sm">
                          <thead className="bg-neutral-900 text-white font-black uppercase text-[10.5px] sm:text-[11px] tracking-wider">
                            <tr>
                              {section.tableData.headers.map((h, hIdx) => (
                                <th key={hIdx} className="px-3.5 sm:px-4 py-2.5 sm:py-3 border-b border-neutral-800 whitespace-nowrap">
                                  {h}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-neutral-200 bg-white font-bold text-neutral-950">
                            {section.tableData.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? "bg-white" : "bg-neutral-50/70"}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className="px-3.5 sm:px-4 py-2.5 sm:py-3 leading-snug whitespace-normal min-w-[120px] sm:min-w-0">
                                    {cell}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      <div className="sm:hidden bg-neutral-100 px-3 py-1.5 text-[10.5px] font-bold text-neutral-600 flex items-center justify-between border-t border-neutral-200">
                        <span>Scroll table horizontally &rarr;</span>
                        <span className="text-[10px] uppercase font-black text-neutral-500">Specs Sheet</span>
                      </div>
                    </div>
                  )}

                  {/* Technical Note Box */}
                  {section.tip && (
                    <div className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-3.5 sm:p-4 my-3 sm:my-4 flex items-start gap-2.5 sm:gap-3">
                      <div className="p-1 sm:p-1.5 rounded-md bg-neutral-900 text-white shrink-0">
                        <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
                      </div>
                      <div>
                        <span className="text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-[#DC2626] block mb-0.5">
                          Technical Specification Note
                        </span>
                        <p className="text-xs sm:text-sm font-bold text-neutral-950 leading-relaxed">
                          {section.tip}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Tags Row */}
              <div className="pt-3.5 sm:pt-4 border-t-2 border-neutral-200 flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-xs font-black text-neutral-950 flex items-center gap-1.5 uppercase tracking-wider mr-1">
                  <Tag className="w-3.5 h-3.5 text-[#DC2626]" />
                  Topics:
                </span>
                {post.tags.map((tag) => (
                  <Link
                    key={tag}
                    href={`/blog?search=${encodeURIComponent(tag)}`}
                    className="px-2.5 py-1 rounded-md bg-neutral-100 hover:bg-neutral-200 border border-neutral-300 text-[11px] sm:text-xs font-extrabold text-neutral-950 transition-colors"
                  >
                    #{tag}
                  </Link>
                ))}
              </div>

              {/* Social Share Bar */}
              <div className="pt-3.5 sm:pt-4 border-t border-neutral-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DC2626]" />
                  <span className="text-xs sm:text-sm font-black text-neutral-950 uppercase tracking-wider">
                    Share this Guide:
                  </span>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {/* WhatsApp */}
                  <a
                    href={`https://api.whatsapp.com/send?text=${encodeURIComponent(post.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-lg bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-xs transition-transform active:scale-95 flex items-center justify-center"
                    title="Share on WhatsApp"
                  >
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-lg bg-[#1877F2] hover:bg-[#166fe5] text-white shadow-xs transition-transform active:scale-95 flex items-center justify-center"
                    title="Share on Facebook"
                  >
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                    </svg>
                  </a>

                  {/* LinkedIn */}
                  <a
                    href={`https://www.linkedin.com/shareArticle`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 sm:p-2.5 rounded-lg bg-[#0A66C2] hover:bg-[#095196] text-white shadow-xs transition-transform active:scale-95 flex items-center justify-center"
                    title="Share on LinkedIn"
                  >
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.39 9.74v-8.37H5.07v8.37h2.78z" />
                    </svg>
                  </a>

                  {/* Copy Link */}
                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="px-3 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-black shadow-xs transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Link Copied!</span>
                      </>
                    ) : (
                      <span>Copy Link</span>
                    )}
                  </button>
                </div>
              </div>
            </article>

            {/* 4. Author Bio Box */}
            <div className="bg-white rounded-xl p-3.5 sm:p-5 border-2 border-neutral-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-3.5 sm:gap-4">
              <div className="relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl overflow-hidden border-2 border-neutral-300 bg-neutral-100 shrink-0">
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <span className="text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-[#DC2626] block mb-0.5">
                  Written by Industry Expert
                </span>
                <h4 className="text-sm sm:text-lg font-black text-neutral-950">
                  {post.author.name}
                </h4>
                <p className="text-[11px] sm:text-xs font-bold text-neutral-700 mb-1">
                  {post.author.role} &bull; A Plus Business Link
                </p>
                <p className="text-xs sm:text-[13px] font-medium sm:font-semibold text-neutral-900 leading-relaxed">
                  Specializing in commercial sports ground construction, high-impact rubber surfaces, and institutional educational infrastructure setups across Nepal.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setIsQuoteOpen(true)}
                className="w-full sm:w-auto px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-black rounded-lg shadow-xs shrink-0 cursor-pointer transition-colors text-center active:scale-95"
              >
                Inquire with Team
              </button>
            </div>

            {/* 5. Related Articles Grid */}
            {relatedBlogs.length > 0 && (
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2.5 sm:mb-4">
                  <h3 className="text-base sm:text-xl font-black text-neutral-950 tracking-tight">
                    Related Articles
                  </h3>
                  <Link
                    href="/blog"
                    className="text-xs sm:text-sm font-black text-[#DC2626] hover:underline flex items-center gap-1"
                  >
                    <span>View All Articles</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 sm:gap-5">
                  {relatedBlogs.map((rel) => (
                    <Link
                      key={rel.id}
                      href={`/blog/${rel.slug}`}
                      className="group flex flex-col rounded-xl border-2 border-neutral-200 bg-white overflow-hidden hover:border-[#DC2626] hover:shadow-xl transition-all block cursor-pointer active:scale-[0.99]"
                    >
                      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-900">
                        <Image
                          src={rel.image}
                          alt={rel.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[10.5px] sm:text-xs font-black text-[#DC2626] uppercase tracking-wider block mb-1">
                            {rel.category}
                          </span>
                          <h4 className="text-[13.5px] sm:text-base font-black text-neutral-950 group-hover:text-[#DC2626] transition-colors line-clamp-2 leading-snug">
                            {rel.title}
                          </h4>
                        </div>
                        <div className="mt-2.5 sm:mt-3 pt-2 sm:pt-2.5 border-t border-neutral-200 flex items-center justify-between text-xs font-bold text-neutral-800">
                          <span>{rel.readTime}</span>
                          <span className="text-[#DC2626] font-black flex items-center gap-1">
                            Read <ArrowRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </main>

          {/* ============================================================= */}
          {/* RIGHT SIDEBAR: Search + Latest 3 Blogs + Quote                */}
          {/* ============================================================= */}
          <aside className="lg:col-span-4 space-y-4 sm:space-y-5 lg:sticky lg:top-24 self-start">
            {/* 1. Search Box with Search Button & Quick Topics */}
            <div className="bg-white rounded-xl p-3.5 sm:p-5 border-2 border-neutral-200 shadow-sm">
              <h3 className="text-sm sm:text-base font-black text-neutral-950 uppercase tracking-wider mb-2.5 flex items-center gap-2">
                <Search className="w-4 h-4 text-[#DC2626]" />
                <span>Search Articles</span>
              </h3>

              <form onSubmit={handleSearchSubmit} className="space-y-2.5">
                <div className="relative">
                  <input
                    type="text"
                    value={sidebarSearch}
                    onChange={(e) => setSidebarSearch(e.target.value)}
                    placeholder="Search articles, turf, gym..."
                    className="w-full pl-3.5 pr-8 py-2.5 bg-neutral-50 border-2 border-neutral-300 focus:border-[#DC2626] focus:bg-white rounded-lg text-xs sm:text-sm font-bold text-neutral-950 placeholder:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-[#DC2626]/15 transition-all"
                  />
                  {sidebarSearch && (
                    <button
                      type="button"
                      onClick={() => setSidebarSearch("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 p-1 rounded-full cursor-pointer hover:bg-neutral-200 transition-colors"
                      title="Clear"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Real-time Search Suggestions Dropdown */}
                {sidebarSearch.trim() && (
                  <div className="bg-neutral-50 border-2 border-neutral-200 rounded-xl p-2.5 space-y-2">
                    {liveSuggestions.length > 0 ? (
                      <>
                        <span className="text-[10.5px] font-black uppercase tracking-wider text-neutral-600 block">
                          Suggested Articles:
                        </span>
                        <div className="space-y-1.5">
                          {liveSuggestions.map((item) => (
                            <Link
                              key={item.id}
                              href={`/blog/${item.slug}`}
                              className="group flex items-start gap-2 p-1.5 rounded-lg bg-white hover:bg-neutral-100 border border-neutral-200 transition-colors block"
                            >
                              <div className="relative w-8 h-8 rounded overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200">
                                <Image
                                  src={item.image}
                                  alt={item.title}
                                  fill
                                  sizes="32px"
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-[10px] font-black text-[#DC2626] uppercase block leading-tight">
                                  {item.category}
                                </span>
                                <h5 className="text-[12px] font-black text-neutral-950 group-hover:text-[#DC2626] truncate leading-tight">
                                  {item.title}
                                </h5>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </>
                    ) : (
                      <div className="text-center py-2">
                        <p className="text-[12px] font-bold text-neutral-700 leading-snug">
                          No quick match for &ldquo;{sidebarSearch}&rdquo;.
                        </p>
                        <p className="text-[11px] font-medium text-neutral-500 mt-0.5">
                          Click below to search all articles.
                        </p>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Search className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Search Articles</span>
                </button>
              </form>

              {/* Quick Filter Tags in Sidebar */}
              <div className="mt-3 pt-2.5 border-t border-neutral-200 flex flex-wrap items-center gap-1.5">
                <span className="text-[10.5px] sm:text-[11px] font-extrabold text-neutral-600 block w-full mb-0.5">
                  Popular Topics:
                </span>
                {["Turf", "Gym", "Playground", "Furniture", "FIFA"].map((topic) => (
                  <button
                    key={topic}
                    type="button"
                    onClick={() => router.push(`/blog?search=${encodeURIComponent(topic)}`)}
                    className="px-2.5 py-1 text-[10.5px] sm:text-[11px] font-bold rounded-md bg-neutral-100 hover:bg-[#DC2626] hover:text-white text-neutral-800 border border-neutral-200 transition-colors cursor-pointer active:scale-95"
                  >
                    #{topic}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Latest 3 Blogs Widget with Image and Title */}
            <div className="bg-white rounded-xl p-3.5 sm:p-5 border-2 border-neutral-200 shadow-sm">
              <div className="flex items-center justify-between mb-2.5 sm:mb-3 pb-2 sm:pb-2.5 border-b-2 border-neutral-200">
                <h3 className="text-xs sm:text-base font-black text-neutral-950 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#DC2626]" />
                  <span>Latest 3 Articles</span>
                </h3>
                <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {latestBlogs.map((latest) => (
                  <Link
                    key={latest.id}
                    href={`/blog/${latest.slug}`}
                    className="group flex items-start gap-2.5 sm:gap-3 p-1.5 sm:p-2 rounded-lg hover:bg-neutral-50 transition-colors border border-transparent hover:border-neutral-200 block cursor-pointer active:scale-[0.99]"
                  >
                    {/* Compact Image */}
                    <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-neutral-900 shrink-0 border border-neutral-200">
                      <Image
                        src={latest.image}
                        alt={latest.title}
                        fill
                        sizes="80px"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Meta & Title */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5 text-[10.5px] sm:text-[11px] font-extrabold text-neutral-800 mb-0.5">
                        <span className="text-[#DC2626] uppercase">
                          {latest.category}
                        </span>
                        <span>&bull;</span>
                        <span>{latest.readTime}</span>
                      </div>

                      {/* Title */}
                      <h4 className="text-xs sm:text-[13.5px] font-black text-neutral-950 group-hover:text-[#DC2626] transition-colors line-clamp-2 leading-snug">
                        {latest.title}
                      </h4>

                      <span className="text-[10.5px] sm:text-[11px] font-bold text-neutral-600 block mt-0.5 sm:mt-1">
                        {latest.publishedDate}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* 3. Instant B2B Quote Card */}
            <div className="bg-neutral-950 text-white rounded-xl p-4 sm:p-5 border-2 border-neutral-900 shadow-md relative overflow-hidden">
              <div className="relative z-10">
                <span className="text-[10.5px] sm:text-[11px] font-black uppercase tracking-wider text-red-400 block mb-1">
                  Need Commercial Equipment?
                </span>

                <h4 className="text-sm sm:text-lg font-black text-white leading-tight mb-1.5">
                  Get a Free Project Blueprint & Price Estimate
                </h4>

                <p className="text-[11px] sm:text-xs text-neutral-300 font-medium leading-relaxed mb-3 sm:mb-3.5">
                  Talk to our engineering team for custom gym floorplans, certified playground layouts, or FIFA turf estimates.
                </p>

                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setIsQuoteOpen(true)}
                    className="w-full py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-98 text-white font-black text-xs uppercase tracking-wider rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Free Quotation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href="https://wa.me/9779851000000"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 active:scale-98"
                  >
                    <svg className="w-3.5 h-3.5 fill-white" viewBox="0 0 24 24">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span>WhatsApp Direct Support</span>
                  </a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Embedded Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </section>
  );
}
