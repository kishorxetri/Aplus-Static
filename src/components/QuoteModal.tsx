"use client";

import { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  Building2,
  Mail,
  Phone,
  User,
  MapPin,
  Clock,
  ShieldCheck,
  Send,
} from "lucide-react";
import { MAIN_CATEGORIES } from "@/data/categories";

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCategory?: string;
  initialProductName?: string;
}

export default function QuoteModal({
  isOpen,
  onClose,
  defaultCategory,
  initialProductName,
}: QuoteModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    email: "",
    phone: "",
    category: defaultCategory || MAIN_CATEGORIES[0]?.id || "sports-equipment",
    estimatedVolume: "Institutional / Bulk Order",
    location: "",
    timeline: "Within 2-4 Weeks",
    details: initialProductName ? `Inquiry for product: ${initialProductName}` : "",
  });

  // Update details if initialProductName changes
  useEffect(() => {
    if (initialProductName) {
      setFormData((prev) => ({
        ...prev,
        details: `Inquiry for product: ${initialProductName}`,
      }));
    }
  }, [initialProductName]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on escape key
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormData({
      fullName: "",
      companyName: "",
      email: "",
      phone: "",
      category: defaultCategory || MAIN_CATEGORIES[0]?.id || "sports-equipment",
      estimatedVolume: "Institutional / Bulk Order",
      location: "",
      timeline: "Within 2-4 Weeks",
      details: "",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 overflow-y-auto">
      {/* Dark Backdrop */}
      <div
        className="fixed inset-0 bg-neutral-950/70 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog (Larger max-w-3xl, crisp black typography, proper borders) */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-modal-title"
        className="relative w-full max-w-3xl bg-white rounded-xl border border-neutral-300 shadow-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="flex items-start justify-between px-6 sm:px-8 py-5 border-b border-neutral-200 bg-neutral-50 shrink-0">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-neutral-200/80 text-[11px] font-bold text-neutral-900 tracking-wide uppercase mb-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#DC2626]" />
              Official B2B Inquiry
            </div>
            <h2
              id="quote-modal-title"
              className="text-xl sm:text-2xl font-bold text-neutral-950 tracking-tight"
            >
              Request a Commercial Wholesale Quotation
            </h2>
            <p className="text-xs sm:text-sm font-medium text-neutral-700 mt-1">
              Direct institutional pricing, technical spec sheets & freight logistics from Aplus Business Link.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-neutral-600 hover:text-black rounded-lg hover:bg-neutral-200/70 transition-colors shrink-0 ml-4 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.2]" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {isSuccess ? (
            <div className="text-center py-10 px-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-neutral-950 mb-2">
                Quotation Request Received
              </h3>
              <p className="text-sm font-medium text-neutral-800 max-w-md mx-auto mb-2 leading-relaxed">
                Thank you for contacting Aplus Business Link. Our procurement and engineering team will review your specifications and issue an official proforma quotation within 24 business hours.
              </p>
              <p className="text-xs text-neutral-600 mb-8">
                Reference copy dispatched to: <span className="font-bold text-neutral-950">{formData.email || "your email"}</span>
              </p>
              <button
                type="button"
                onClick={handleReset}
                className="px-8 py-3 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-sm font-bold rounded-lg shadow-sm transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row 1: Contact Name & Company Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950 mb-1.5">
                    Contact Person Full Name <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) =>
                        setFormData({ ...formData, fullName: e.target.value })
                      }
                      placeholder="e.g. Rajesh Shrestha"
                      className="w-full h-11 pl-10 pr-3.5 text-sm bg-white text-neutral-950 font-medium border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors placeholder:text-neutral-400"
                    />
                    <User className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950 mb-1.5">
                    Organization / School / Company <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) =>
                        setFormData({ ...formData, companyName: e.target.value })
                      }
                      placeholder="e.g. Kathmandu Sports Club / Horizon School"
                      className="w-full h-11 pl-10 pr-3.5 text-sm bg-white text-neutral-950 font-medium border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors placeholder:text-neutral-400"
                    />
                    <Building2 className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-700" />
                  </div>
                </div>
              </div>

              {/* Row 2: Official Work Email & Phone / Mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950 mb-1.5">
                    Official Email Address <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      placeholder="procurement@organization.com"
                      className="w-full h-11 pl-10 pr-3.5 text-sm bg-white text-neutral-950 font-medium border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors placeholder:text-neutral-400"
                    />
                    <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950 mb-1.5">
                    Phone / WhatsApp Number <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      placeholder="+977 98XXXXXXXX"
                      className="w-full h-11 pl-10 pr-3.5 text-sm bg-white text-neutral-950 font-medium border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors placeholder:text-neutral-400"
                    />
                    <Phone className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-700" />
                  </div>
                </div>
              </div>

              {/* Row 3: Product Category & Project Scale */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950 mb-1.5">
                    Target Category <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full h-11 px-3.5 text-sm bg-white text-neutral-950 font-semibold border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors"
                  >
                    {MAIN_CATEGORIES.map((cat) => (
                      <option key={cat.id} value={cat.id} className="text-neutral-950 font-medium">
                        {cat.name}
                      </option>
                    ))}
                    <option value="multi-category" className="text-neutral-950 font-medium">
                      Multi-Category / Turnkey Facility Setup
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950 mb-1.5">
                    Procurement Scale <span className="text-[#DC2626]">*</span>
                  </label>
                  <select
                    value={formData.estimatedVolume}
                    onChange={(e) =>
                      setFormData({ ...formData, estimatedVolume: e.target.value })
                    }
                    className="w-full h-11 px-3.5 text-sm bg-white text-neutral-950 font-semibold border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors"
                  >
                    <option value="Institutional / Bulk Order">Institutional / Bulk Order</option>
                    <option value="Commercial Turnkey Project">Commercial Turnkey Project</option>
                    <option value="School / Campus Setup">School / Campus Setup</option>
                    <option value="Government / Tender Enquiry">Government / Tender Enquiry</option>
                    <option value="Wholesale Distributorship">Wholesale Distributorship</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Delivery Location & Timeline */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950 mb-1.5">
                    Project / Delivery Location
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={formData.location}
                      onChange={(e) =>
                        setFormData({ ...formData, location: e.target.value })
                      }
                      placeholder="e.g. Lalitpur, Pokhara, Biratnagar, Kathmandu"
                      className="w-full h-11 pl-10 pr-3.5 text-sm bg-white text-neutral-950 font-medium border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors placeholder:text-neutral-400"
                    />
                    <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-700" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950 mb-1.5">
                    Required Delivery Timeline
                  </label>
                  <div className="relative">
                    <select
                      value={formData.timeline}
                      onChange={(e) =>
                        setFormData({ ...formData, timeline: e.target.value })
                      }
                      className="w-full h-11 pl-10 pr-3.5 text-sm bg-white text-neutral-950 font-semibold border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors"
                    >
                      <option value="Immediate / Ready Stock">Immediate / Ready Stock</option>
                      <option value="Within 2-4 Weeks">Within 2-4 Weeks</option>
                      <option value="1-3 Months (Planned Project)">1-3 Months (Planned Project)</option>
                      <option value="Tender / Future Budgeting">Tender / Future Budgeting</option>
                    </select>
                    <Clock className="absolute left-3.5 top-3.5 w-4 h-4 text-neutral-700 pointer-events-none" />
                  </div>
                </div>
              </div>

              {/* Row 5: Details / Specifications Textarea */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs sm:text-sm font-bold text-neutral-950">
                    Product Requirements & Technical Specifications
                  </label>
                  <span className="text-[11px] font-medium text-neutral-600">
                    Sizes, quantities, custom colors, surface sqm, etc.
                  </span>
                </div>
                <textarea
                  rows={3}
                  value={formData.details}
                  onChange={(e) =>
                    setFormData({ ...formData, details: e.target.value })
                  }
                  placeholder="Please describe specific items needed (e.g. 500 sqm 50mm football turf rolls, 4 sets of outdoor multi-play stations, 40 sets classroom ergonomic desks, or gym rubber tiles)..."
                  className="w-full p-3.5 text-sm bg-white text-neutral-950 font-medium border border-neutral-300 rounded-lg hover:border-neutral-400 focus:outline-none focus:border-neutral-950 focus:ring-1 focus:ring-neutral-950 transition-colors placeholder:text-neutral-400 leading-relaxed"
                />
              </div>

              {/* Footer Trust Bar & Action Buttons */}
              <div className="pt-2 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-neutral-800">
                  <ShieldCheck className="w-4 h-4 text-[#DC2626] shrink-0" />
                  <span>Institutional discounts applied directly on official proforma</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-5 py-2.5 text-xs sm:text-sm font-bold text-neutral-800 hover:text-black hover:bg-neutral-100 rounded-lg border border-neutral-300 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-6 py-2.5 text-xs sm:text-sm font-bold text-white bg-[#DC2626] hover:bg-[#b91c1c] active:bg-[#991b1b] rounded-lg shadow-sm transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Processing...</span>
                    ) : (
                      <>
                        <span>Submit Quotation Request</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
