"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  ChevronDown,
  MessageCircle,
} from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

export default function Footer() {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);

  // Accordion open/close state for mobile/sm devices
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    categories: false,
    services: false,
    contact: false,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <>
      <footer className="w-full bg-neutral-100/90 pt-4 sm:pt-6 lg:pt-8 border-t border-neutral-300">
        <div className="max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8">
          {/* =============================================================== */}
          {/* Main White Elevated Card Container (subtly rounded corners)     */}
          {/* =============================================================== */}
          <div className="bg-white rounded-xl border border-neutral-300 shadow-sm p-4 sm:p-6 lg:p-7 mb-4 sm:mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-6 xl:gap-8">
              {/* ============================================================= */}
              {/* Col 1: Brand Info & Socials                                    */}
              {/* ============================================================= */}
              <div className="flex flex-col justify-between space-y-3 sm:space-y-4">
                <div>
                  {/* Brand Logo - Matched with Navbar */}
                  <Link
                    href="/"
                    className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] rounded-sm"
                    aria-label="Aplus Business Link Homepage"
                  >
                    <Image
                      src="/aplus-logo.webp"
                      alt="Aplus Business Link Logo"
                      width={160}
                      height={42}
                      className="h-8 sm:h-10 w-auto object-contain"
                    />
                  </Link>

                  {/* Company Description */}
                  <p className="mt-2.5 sm:mt-3 text-[14px] sm:text-[15px] text-neutral-900 font-bold leading-[1.65] sm:leading-[1.7]">
                    A Plus Business Link Pvt. Ltd. is Nepal&apos;s premier commercial
                    enterprise supplier dedicated to certified sports infrastructure,
                    commercial playgrounds, FIFA-standard artificial turf, and Montessori
                    educational supplies.
                  </p>
                </div>

                {/* Social Media Links */}
                <div>
                  <span className="text-[13px] sm:text-[14px] font-black text-neutral-950 uppercase tracking-wider block mb-2">
                    Connect With Us
                  </span>
                  <div className="flex items-center gap-2">
                    {/* Facebook */}
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-100 hover:bg-[#DC2626] text-neutral-950 hover:text-white border border-neutral-300 hover:border-[#DC2626] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                      </svg>
                    </a>

                    {/* Instagram */}
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-100 hover:bg-[#DC2626] text-neutral-950 hover:text-white border border-neutral-300 hover:border-[#DC2626] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </a>

                    {/* YouTube */}
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="YouTube"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-100 hover:bg-[#DC2626] text-neutral-950 hover:text-white border border-neutral-300 hover:border-[#DC2626] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                      </svg>
                    </a>

                    {/* TikTok */}
                    <a
                      href="https://tiktok.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-neutral-100 hover:bg-[#DC2626] text-neutral-950 hover:text-white border border-neutral-300 hover:border-[#DC2626] flex items-center justify-center transition-all cursor-pointer shadow-2xs active:scale-95"
                    >
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-1.01-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>

              {/* ============================================================= */}
              {/* Col 2: Product Categories (Responsive Dropdown on mobile/sm)   */}
              {/* ============================================================= */}
              <div className="border-t lg:border-t-0 border-neutral-200 pt-2.5 sm:pt-3 lg:pt-0">
                {/* Mobile Dropdown Header Button */}
                <button
                  type="button"
                  onClick={() => toggleSection("categories")}
                  className="w-full flex items-center justify-between py-1.5 lg:py-0 lg:cursor-default text-left group cursor-pointer"
                >
                  <h3 className="text-[13.5px] sm:text-[15px] font-extrabold text-neutral-950 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] lg:hidden" />
                    <span>Product Categories</span>
                  </h3>
                  <span className="lg:hidden p-1.5 rounded-md bg-neutral-100 text-neutral-700 group-hover:text-[#DC2626] transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] ${
                        openSections.categories ? "rotate-180 text-[#DC2626]" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* List: Always open on lg, conditionally toggled on mobile/sm */}
                <div
                  className={`mt-2 sm:mt-2.5 lg:mt-3 ${
                    openSections.categories ? "block" : "hidden lg:block"
                  }`}
                >
                  <ul className="space-y-2 sm:space-y-2 lg:space-y-2.5 text-[14px] sm:text-[15px]">
                    <li>
                      <Link
                        href="/category/sports-equipment"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Sports & Athletic Equipment</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/playground-recreation"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Commercial Playground & Swings</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/artificial-turf"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Artificial Turf & Pitch Solutions</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/kids-educational"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Montessori & Educational Toys</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/commercial-fitness"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Commercial Gym & Fitness Machines</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/kindergarten-furniture"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>School & Kindergarten Furniture</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/category/sports-equipment"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>New Arrivals & Special Offers</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ============================================================= */}
              {/* Col 3: Our Services (Responsive Dropdown on mobile/sm)         */}
              {/* ============================================================= */}
              <div className="border-t lg:border-t-0 border-neutral-200 pt-2.5 sm:pt-3 lg:pt-0">
                {/* Mobile Dropdown Header Button */}
                <button
                  type="button"
                  onClick={() => toggleSection("services")}
                  className="w-full flex items-center justify-between py-1.5 lg:py-0 lg:cursor-default text-left group cursor-pointer"
                >
                  <h3 className="text-[13.5px] sm:text-[15px] font-extrabold text-neutral-950 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] lg:hidden" />
                    <span>Our Services</span>
                  </h3>
                  <span className="lg:hidden p-1.5 rounded-md bg-neutral-100 text-neutral-700 group-hover:text-[#DC2626] transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] ${
                        openSections.services ? "rotate-180 text-[#DC2626]" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* List: Always open on lg, conditionally toggled on mobile/sm */}
                <div
                  className={`mt-2 sm:mt-2.5 lg:mt-3 ${
                    openSections.services ? "block" : "hidden lg:block"
                  }`}
                >
                  <ul className="space-y-2 sm:space-y-2 lg:space-y-2.5 text-[14px] sm:text-[15px]">
                    <li>
                      <button
                        type="button"
                        onClick={() => setIsQuoteOpen(true)}
                        className="w-full flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group text-left cursor-pointer leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Institutional Bulk Pricing</span>
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setIsQuoteOpen(true)}
                        className="w-full flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group text-left cursor-pointer leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Request Proforma Invoice</span>
                      </button>
                    </li>
                    <li>
                      <Link
                        href="/#contact"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Turnkey Installation Support</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/#contact"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Nationwide Delivery Logistics</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/#contact"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Warranty & Return Support</span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/blog"
                        className="flex items-start gap-1.5 text-neutral-900 hover:text-[#DC2626] font-bold transition-colors group leading-snug py-0.5"
                      >
                        <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-[#DC2626] transition-transform group-hover:translate-x-0.5 shrink-0 mt-0.5 stroke-[2.25]" />
                        <span>Buying Guides & Updates</span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* ============================================================= */}
              {/* Col 4: Office & Inquiries (Responsive Dropdown on mobile/sm)   */}
              {/* ============================================================= */}
              <div className="border-t lg:border-t-0 border-neutral-200 pt-2.5 sm:pt-3 lg:pt-0">
                {/* Mobile Dropdown Header Button */}
                <button
                  type="button"
                  onClick={() => toggleSection("contact")}
                  className="w-full flex items-center justify-between py-1.5 lg:py-0 lg:cursor-default text-left group cursor-pointer"
                >
                  <h3 className="text-[13.5px] sm:text-[15px] font-extrabold text-neutral-950 uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#DC2626] lg:hidden" />
                    <span>Office & Inquiries</span>
                  </h3>
                  <span className="lg:hidden p-1.5 rounded-md bg-neutral-100 text-neutral-700 group-hover:text-[#DC2626] transition-colors">
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 stroke-[2.5] ${
                        openSections.contact ? "rotate-180 text-[#DC2626]" : ""
                      }`}
                    />
                  </span>
                </button>

                {/* List: Always open on lg, conditionally toggled on mobile/sm */}
                <div
                  className={`mt-2 sm:mt-2.5 lg:mt-3 ${
                    openSections.contact ? "block" : "hidden lg:block"
                  }`}
                >
                  <div className="space-y-2.5 sm:space-y-3 text-[14px] sm:text-[15px]">
                    {/* Location */}
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 stroke-[2.25]" />
                      <div>
                        <span className="font-extrabold text-neutral-950 block text-[13px] sm:text-[14px]">
                          Corporate Office:
                        </span>
                        <span className="text-neutral-900 font-bold block leading-snug text-[13.5px] sm:text-[14.5px]">
                          Lalitpur - 03, Kathmandu Valley, Nepal
                        </span>
                      </div>
                    </div>

                    {/* Phone & WhatsApp */}
                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 stroke-[2.25]" />
                      <div>
                        <span className="font-extrabold text-neutral-950 block text-[13px] sm:text-[14px]">
                          Phone / WhatsApp:
                        </span>
                        <a
                          href="tel:+97714500000"
                          className="text-neutral-900 hover:text-[#DC2626] font-bold transition-colors block break-words leading-snug text-[13.5px] sm:text-[14.5px]"
                        >
                          +977 1-4500000 / +977 9851000000
                        </a>
                      </div>
                    </div>

                    {/* Email */}
                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 stroke-[2.25]" />
                      <div>
                        <span className="font-extrabold text-neutral-950 block text-[13px] sm:text-[14px]">
                          Email Address:
                        </span>
                        <a
                          href="mailto:info@aplusbusinesslink.com"
                          className="text-neutral-900 hover:text-[#DC2626] font-bold transition-colors block break-all sm:break-normal leading-snug text-[13.5px] sm:text-[14.5px]"
                        >
                          info@aplusbusinesslink.com
                        </a>
                      </div>
                    </div>

                    {/* Working Hours */}
                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#DC2626] shrink-0 mt-0.5 stroke-[2.25]" />
                      <div>
                        <span className="font-extrabold text-neutral-950 block text-[13px] sm:text-[14px]">
                          Operating Hours:
                        </span>
                        <span className="text-neutral-900 font-bold block leading-snug text-[13.5px] sm:text-[14.5px]">
                          Sun - Fri: 9:00 AM - 6:00 PM
                        </span>
                      </div>
                    </div>

                    {/* Action CTA Button */}
                    <div className="pt-2">
                      <button
                        type="button"
                        onClick={() => setIsQuoteOpen(true)}
                        className="w-full py-2.5 px-3.5 bg-[#16a34a] hover:bg-[#15803d] active:scale-[0.98] text-white font-black text-[13.5px] sm:text-sm rounded-lg shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#16a34a]"
                      >
                        <MessageCircle className="w-4 h-4 fill-white" />
                        <span>WhatsApp / Instant Inquiry</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* Bottom Bar: Copyright, Legal Links & Developer Credit             */}
        {/* ================================================================= */}
        <div className="w-full bg-neutral-950 text-neutral-300 py-2.5 sm:py-3 border-t border-neutral-900">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:flex-wrap lg:flex-nowrap items-center justify-between gap-2 sm:gap-3.5 text-[12.5px] sm:text-[13.5px] text-center sm:text-left">
              {/* Copyright */}
              <div className="font-medium text-neutral-300">
                &copy; 2026 <span className="text-white font-bold">A Plus Business Link Pvt. Ltd.</span> All rights reserved.
              </div>

              {/* Policy Links */}
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-neutral-300 font-semibold leading-normal">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <span className="text-neutral-600">&bull;</span>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
                <span className="text-neutral-600">&bull;</span>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </div>

              {/* Developer Credit */}
              <div className="text-neutral-300 font-medium">
                Developed By:{" "}
                <span className="text-white font-bold hover:text-[#DC2626] transition-colors">
                  Smart Web Care Center Pvt. Ltd.
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Embedded Quote Modal */}
      <QuoteModal
        isOpen={isQuoteOpen}
        onClose={() => setIsQuoteOpen(false)}
      />
    </>
  );
}
