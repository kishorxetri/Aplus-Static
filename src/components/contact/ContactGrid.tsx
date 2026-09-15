"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Building2,
  FileText,
  MessageSquare,
  Shield,
  ArrowRight,
  Loader2,
} from "lucide-react";
import QuoteModal from "@/components/QuoteModal";

export default function ContactGrid() {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    category: "sports-equipment",
    timeline: "within-1-month",
    message: "",
    preferredContact: "phone",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate backend submission delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      category: "sports-equipment",
      timeline: "within-1-month",
      message: "",
      preferredContact: "phone",
    });
    setIsSuccess(false);
  };

  return (
    <>
      <section
        className="w-full py-8 sm:py-10 lg:py-12 bg-neutral-100/60"
        aria-label="Contact Information and Inquiry Form"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
            {/* =============================================================== */}
            {/* LEFT COLUMN: Comprehensive Contact Info (5 cols on lg)           */}
            {/* =============================================================== */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              {/* Section Header for Info Column */}
              <div>
                <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#DC2626] block">
                  Communication Channels
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-neutral-950 tracking-tight mt-0.5">
                  Contact Information
                </h2>
              </div>

              {/* 4 Detail Cards with centered icons */}
              <div className="space-y-2.5">
                {/* 1. Corporate Office */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] transition-colors shadow-2xs group flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0 group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                    <MapPin className="w-4.5 h-4.5 stroke-[2.25]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                      Corporate Office
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-neutral-950 mt-0.5 leading-snug">
                      A Plus Business Link Pvt. Ltd.
                    </h3>
                    <p className="text-sm font-semibold text-neutral-900 mt-0.5 leading-snug">
                      Lalitpur - 03, Kathmandu Valley, Nepal
                    </p>
                  </div>
                </div>

                {/* 2. Direct Phone Hotlines */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] transition-colors shadow-2xs group flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0 group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                    <Phone className="w-4.5 h-4.5 stroke-[2.25]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                      Direct Hotlines
                    </span>
                    <div className="mt-0.5 space-y-0.5">
                      <a
                        href="tel:+97714500000"
                        className="text-sm sm:text-[15px] font-bold text-neutral-950 hover:text-[#DC2626] transition-colors block"
                      >
                        +977 1-4500000
                      </a>
                      <a
                        href="tel:+9779851000000"
                        className="text-sm sm:text-[15px] font-bold text-neutral-950 hover:text-[#DC2626] transition-colors block"
                      >
                        +977 9851000000
                      </a>
                    </div>
                  </div>
                </div>

                {/* 3. Official Email Desks */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] transition-colors shadow-2xs group flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0 group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                    <Mail className="w-4.5 h-4.5 stroke-[2.25]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                      Email Inquiries
                    </span>
                    <div className="mt-0.5 space-y-0.5">
                      <a
                        href="mailto:info@aplusbusinesslink.com"
                        className="text-sm sm:text-[15px] font-bold text-neutral-950 hover:text-[#DC2626] transition-colors block truncate"
                      >
                        info@aplusbusinesslink.com
                      </a>
                      <a
                        href="mailto:sales@aplusbusinesslink.com"
                        className="text-sm sm:text-[15px] font-bold text-neutral-950 hover:text-[#DC2626] transition-colors block truncate"
                      >
                        sales@aplusbusinesslink.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* 4. Operating Business Hours */}
                <div className="p-3 sm:p-3.5 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] transition-colors shadow-2xs group flex items-center gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0 group-hover:bg-[#DC2626] group-hover:text-white transition-colors">
                    <Clock className="w-4.5 h-4.5 stroke-[2.25]" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-bold text-neutral-900 uppercase tracking-wider block">
                      Business Operating Hours
                    </span>
                    <div className="mt-0.5 space-y-0.5">
                      <p className="text-sm sm:text-[15px] font-bold text-neutral-950">
                        Sunday – Friday: 9:00 AM – 6:00 PM
                      </p>
                      <p className="text-xs font-semibold text-neutral-700">
                        Saturday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Direct Connection Card */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-white border border-emerald-300 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <MessageSquare className="w-4.5 h-4.5" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 block">
                      Quick Assistance
                    </span>
                    <span className="text-sm font-bold text-neutral-950 block truncate">
                      Chat Directly via WhatsApp
                    </span>
                  </div>
                </div>

                <a
                  href="https://wa.me/9779851000000?text=Hello%20Aplus%20Business%20Link,%20I%20would%20like%20to%20inquire%20about%20your%20products."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold rounded-lg shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>Chat Now</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Formal Proforma / Tender Box */}
              <div className="p-3 sm:p-3.5 rounded-xl bg-neutral-950 text-white border border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-lg bg-[#DC2626] text-white flex items-center justify-center shrink-0">
                    <FileText className="w-4.5 h-4.5 stroke-[2.25]" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Need a Formal Proforma Invoice?</h4>
                </div>

                <button
                  type="button"
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-3.5 py-1.5 bg-white hover:bg-neutral-100 text-neutral-950 text-xs sm:text-sm font-bold rounded-lg transition-colors cursor-pointer shrink-0 w-full sm:w-auto text-center"
                >
                  Request Quote
                </button>
              </div>
            </div>

            {/* =============================================================== */}
            {/* RIGHT COLUMN: Professional Contact Us Form (7 cols on lg)        */}
            {/* =============================================================== */}
            <div className="lg:col-span-7">
              <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-neutral-300 bg-white shadow-xs">
                {/* Form Header with tight padding */}
                <div className="border-b border-neutral-200 pb-3 mb-3.5">
                  <span className="text-xs sm:text-[13px] font-bold uppercase tracking-wider text-[#DC2626] block">
                    Online Inquiries
                  </span>
                  <h2 className="text-2xl sm:text-[26px] font-bold text-neutral-950 tracking-tight mt-0.5">
                    Send Us a Detailed Message
                  </h2>
                  <p className="text-sm text-neutral-800 font-medium mt-1 leading-snug">
                    Please provide your project requirements or questions below. Our sales engineers will review your request and get in touch within 24 hours.
                  </p>
                </div>

                {isSuccess ? (
                  <div className="py-10 text-center flex flex-col items-center justify-center">
                    <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mb-3">
                      <CheckCircle2 className="w-8 h-8 stroke-[2.25]" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mb-1.5">
                      Inquiry Received Successfully!
                    </h3>
                    <p className="text-sm sm:text-base text-neutral-950 font-semibold max-w-md mx-auto mb-5 leading-relaxed">
                      Thank you for reaching out to <span className="font-extrabold text-neutral-950">A Plus Business Link</span>. We have assigned your request to our technical team and will respond promptly.
                    </p>
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold text-sm rounded-lg shadow-sm transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Row 1: Full Name & Company */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="fullName"
                          className="block text-sm font-bold text-neutral-950 mb-1"
                        >
                          Full Name <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          id="fullName"
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) =>
                            setFormData({ ...formData, fullName: e.target.value })
                          }
                          placeholder="e.g. Binod Sharma"
                          className="w-full px-3.5 py-2 sm:py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-950 font-semibold placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="companyName"
                          className="block text-sm font-bold text-neutral-950 mb-1"
                        >
                          Organization / Company
                        </label>
                        <input
                          id="companyName"
                          type="text"
                          value={formData.companyName}
                          onChange={(e) =>
                            setFormData({ ...formData, companyName: e.target.value })
                          }
                          placeholder="e.g. Kathmandu Valley Academy"
                          className="w-full px-3.5 py-2 sm:py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-950 font-semibold placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 2: Phone & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-bold text-neutral-950 mb-1"
                        >
                          Phone Number <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="e.g. 9851000000"
                          className="w-full px-3.5 py-2 sm:py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-950 font-semibold placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 outline-none transition-colors"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-bold text-neutral-950 mb-1"
                        >
                          Email Address <span className="text-[#DC2626]">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="e.g. contact@example.com"
                          className="w-full px-3.5 py-2 sm:py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-950 font-semibold placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 outline-none transition-colors"
                        />
                      </div>
                    </div>

                    {/* Row 3: Department Category & Project Timeline */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-bold text-neutral-950 mb-1"
                        >
                          Inquiry Category <span className="text-[#DC2626]">*</span>
                        </label>
                        <select
                          id="category"
                          value={formData.category}
                          onChange={(e) =>
                            setFormData({ ...formData, category: e.target.value })
                          }
                          className="w-full px-3.5 py-2 sm:py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-950 font-semibold focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 outline-none transition-colors cursor-pointer"
                        >
                          <option value="sports-equipment">Sports Equipment & Courts</option>
                          <option value="playground-recreation">Commercial Playground Equipment</option>
                          <option value="artificial-turf">Artificial Turf Installation</option>
                          <option value="kindergarten-furniture">Montessori & Kindergarten Setup</option>
                          <option value="commercial-fitness">Commercial Gym & Fitness</option>
                          <option value="b2b-bulk-tenders">Institutional Bulk Supply & Tenders</option>
                          <option value="turnkey-installation">Turnkey Installation & Maintenance</option>
                          <option value="general-inquiry">General Inquiry & Customer Support</option>
                        </select>
                      </div>

                      <div>
                        <label
                          htmlFor="timeline"
                          className="block text-sm font-bold text-neutral-950 mb-1"
                        >
                          Target Timeline
                        </label>
                        <select
                          id="timeline"
                          value={formData.timeline}
                          onChange={(e) =>
                            setFormData({ ...formData, timeline: e.target.value })
                          }
                          className="w-full px-3.5 py-2 sm:py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-950 font-semibold focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 outline-none transition-colors cursor-pointer"
                        >
                          <option value="immediate">Immediate / Urgent (1-2 Weeks)</option>
                          <option value="within-1-month">Within 1 Month</option>
                          <option value="within-3-months">1 - 3 Months</option>
                          <option value="planning-phase">Planning & Budgeting Phase</option>
                        </select>
                      </div>
                    </div>

                    {/* Preferred Contact Mode */}
                    <div>
                      <span className="block text-sm font-bold text-neutral-950 mb-1">
                        Preferred Response Method
                      </span>
                      <div className="flex items-center gap-6">
                        <label className="flex items-center gap-2 text-sm text-neutral-900 font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="phone"
                            checked={formData.preferredContact === "phone"}
                            onChange={() =>
                              setFormData({ ...formData, preferredContact: "phone" })
                            }
                            className="text-[#DC2626] focus:ring-[#DC2626] h-4 w-4"
                          />
                          <span>Phone Call</span>
                        </label>

                        <label className="flex items-center gap-2 text-sm text-neutral-900 font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="email"
                            checked={formData.preferredContact === "email"}
                            onChange={() =>
                              setFormData({ ...formData, preferredContact: "email" })
                            }
                            className="text-[#DC2626] focus:ring-[#DC2626] h-4 w-4"
                          />
                          <span>Email</span>
                        </label>

                        <label className="flex items-center gap-2 text-sm text-neutral-900 font-semibold cursor-pointer">
                          <input
                            type="radio"
                            name="preferredContact"
                            value="whatsapp"
                            checked={formData.preferredContact === "whatsapp"}
                            onChange={() =>
                              setFormData({ ...formData, preferredContact: "whatsapp" })
                            }
                            className="text-[#DC2626] focus:ring-[#DC2626] h-4 w-4"
                          />
                          <span>WhatsApp</span>
                        </label>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-bold text-neutral-950 mb-1"
                      >
                        Project Scope or Message <span className="text-[#DC2626]">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us about the project location, required product quantities, specifications or site dimensions..."
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-neutral-300 bg-white text-neutral-950 font-semibold placeholder:text-neutral-400 focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 outline-none transition-colors resize-y"
                      />
                    </div>

                    {/* Submit and Privacy Guarantee */}
                    <div className="pt-1 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto px-7 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] disabled:opacity-60 text-white font-bold text-sm sm:text-base rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Submitting Inquiry...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4 stroke-[2.25]" />
                            <span>Submit Message</span>
                          </>
                        )}
                      </button>

                      <div className="flex items-center gap-1.5 text-xs text-neutral-900 font-bold">
                        <Shield className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>Confidentiality guaranteed. Zero spam policy.</span>
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Modal for Institutional Requests */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        defaultCategory="sports-equipment"
      />
    </>
  );
}
