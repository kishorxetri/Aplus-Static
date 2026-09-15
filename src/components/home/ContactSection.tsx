"use client";

import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    subject: "sports-equipment",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API request
    await new Promise((resolve) => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      phone: "",
      email: "",
      subject: "sports-equipment",
      message: "",
    });
    setIsSuccess(false);
  };

  return (
    <section
      id="contact"
      className="w-full py-5 sm:py-6 lg:py-8 bg-white border-t border-neutral-300"
      aria-label="Contact Us and Location"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Clean Bold Title without extra gap */}
        <div className="mb-3.5 sm:mb-4.5">
          <h2 className="text-2xl sm:text-[26px] lg:text-[28px] font-bold text-neutral-950 tracking-tight">
            Get in Touch
          </h2>
        </div>

        {/* 2-Column Grid: Form on Left (50%), Info Cards + Map on Right (50%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 lg:gap-6 items-stretch">
          {/* ================================================================= */}
          {/* LEFT: Contact Form (6 cols on lg)                                 */}
          {/* ================================================================= */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="p-4 sm:p-5 lg:p-6 rounded-xl sm:rounded-2xl border border-neutral-300 bg-neutral-50/50 shadow-xs h-full flex flex-col justify-between">
              {isSuccess ? (
                <div className="py-10 text-center flex flex-col items-center justify-center my-auto">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-300 text-emerald-600 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-neutral-950 mb-1.5">
                    Message Sent Successfully!
                  </h3>
                  <p className="text-sm text-neutral-600 max-w-md mx-auto mb-6">
                    Thank you for reaching out to A Plus Business Link. Our representative will contact you promptly.
                  </p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold text-sm rounded-lg shadow-xs transition-colors cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5">
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="contact-name"
                        className="block text-sm sm:text-[15px] font-bold text-neutral-950 mb-1.5"
                      >
                        Full Name <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="text"
                        id="contact-name"
                        required
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        placeholder="e.g. Ramesh Thapa"
                        className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-[15px] rounded-lg border border-neutral-300 bg-white text-neutral-950 font-medium placeholder:text-neutral-400 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-colors"
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <label
                        htmlFor="contact-phone"
                        className="block text-sm sm:text-[15px] font-bold text-neutral-950 mb-1.5"
                      >
                        Phone Number <span className="text-[#DC2626]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contact-phone"
                        required
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                        placeholder="e.g. 9851000000"
                        className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-[15px] rounded-lg border border-neutral-300 bg-white text-neutral-950 font-medium placeholder:text-neutral-400 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Email */}
                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm sm:text-[15px] font-bold text-neutral-950 mb-1.5"
                      >
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="contact-email"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        placeholder="e.g. info@company.com"
                        className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-[15px] rounded-lg border border-neutral-300 bg-white text-neutral-950 font-medium placeholder:text-neutral-400 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-colors"
                      />
                    </div>

                    {/* Inquiring For / Subject */}
                    <div>
                      <label
                        htmlFor="contact-subject"
                        className="block text-sm sm:text-[15px] font-bold text-neutral-950 mb-1.5"
                      >
                        Inquiry Category
                      </label>
                      <select
                        id="contact-subject"
                        value={formData.subject}
                        onChange={(e) =>
                          setFormData({ ...formData, subject: e.target.value })
                        }
                        className="w-full px-4 py-2.5 sm:py-3 text-sm sm:text-[15px] rounded-lg border border-neutral-300 bg-white text-neutral-950 font-semibold focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-colors cursor-pointer"
                      >
                        <option value="sports-equipment">Sports Equipment</option>
                        <option value="playground-recreation">Commercial Playground</option>
                        <option value="artificial-turf">Artificial Turf Project</option>
                        <option value="kids-educational">Montessori & Educational</option>
                        <option value="commercial-fitness">Gym & Fitness Equipment</option>
                        <option value="kindergarten-furniture">School & Class Furniture</option>
                        <option value="general-inquiry">Other / General Inquiry</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      className="block text-sm sm:text-[15px] font-bold text-neutral-950 mb-1.5"
                    >
                      Message / Project Scope <span className="text-[#DC2626]">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      placeholder="Tell us about your requirements, project timeline, location or quantity..."
                      className="w-full px-4 py-3 text-sm sm:text-[15px] rounded-lg border border-neutral-300 bg-white text-neutral-950 font-medium placeholder:text-neutral-400 focus:border-[#DC2626] focus:ring-1 focus:ring-[#DC2626] outline-none transition-colors resize-y"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto px-7 py-2.5 sm:py-3 bg-[#DC2626] hover:bg-[#b91c1c] active:scale-[0.98] disabled:opacity-60 text-white font-bold text-sm sm:text-base rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
                    >
                      {isSubmitting ? (
                        <span>Sending message...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 stroke-[2.25]" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT: Premium Contact Info Cards + Google Map (6 cols on lg)     */}
          {/* ================================================================= */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            {/* 2x2 Premium Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {/* Location Card */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] transition-colors shadow-2xs group flex items-start gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0 mt-0.5">
                  <MapPin className="w-4.5 h-4.5 stroke-[2.25]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs sm:text-[13px] font-extrabold text-neutral-950 uppercase tracking-wider block">
                    Corporate Office
                  </span>
                  <span className="text-sm sm:text-[15px] font-bold text-neutral-950 block mt-0.5 leading-snug">
                    Kathmandu / Lalitpur, Nepal
                  </span>
                </div>
              </div>

              {/* Direct Call Card */}
              <a
                href="tel:+97714500000"
                className="p-3.5 sm:p-4 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] transition-colors shadow-2xs group flex items-start gap-3"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0 mt-0.5">
                  <Phone className="w-4.5 h-4.5 stroke-[2.25]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs sm:text-[13px] font-extrabold text-neutral-950 uppercase tracking-wider block">
                    Direct Hotlines
                  </span>
                  <span className="text-sm sm:text-[15px] font-bold text-neutral-950 group-hover:text-[#DC2626] transition-colors block mt-0.5 leading-snug truncate">
                    +977 1-4500000 / 9851000000
                  </span>
                </div>
              </a>

              {/* Email Desk Card */}
              <a
                href="mailto:info@aplusbusinesslink.com"
                className="p-3.5 sm:p-4 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] transition-colors shadow-2xs group flex items-start gap-3"
              >
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0 mt-0.5">
                  <Mail className="w-4.5 h-4.5 stroke-[2.25]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs sm:text-[13px] font-extrabold text-neutral-950 uppercase tracking-wider block">
                    Official Email
                  </span>
                  <span className="text-sm sm:text-[15px] font-bold text-neutral-950 group-hover:text-[#DC2626] transition-colors block mt-0.5 leading-snug truncate">
                    info@aplusbusinesslink.com
                  </span>
                </div>
              </a>

              {/* Working Hours Card */}
              <div className="p-3.5 sm:p-4 rounded-xl border border-neutral-300 bg-white hover:border-[#DC2626] transition-colors shadow-2xs group flex items-start gap-3">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-red-50 border border-red-100 flex items-center justify-center text-[#DC2626] shrink-0 mt-0.5">
                  <Clock className="w-4.5 h-4.5 stroke-[2.25]" />
                </div>
                <div className="min-w-0 flex-1">
                  <span className="text-xs sm:text-[13px] font-extrabold text-neutral-950 uppercase tracking-wider block">
                    Business Hours
                  </span>
                  <span className="text-sm sm:text-[15px] font-bold text-neutral-950 block mt-0.5 leading-snug">
                    Sun - Fri: 9:00 AM - 6:00 PM
                  </span>
                </div>
              </div>
            </div>

            {/* Google Map Card */}
            <div className="flex-1 rounded-xl sm:rounded-2xl border border-neutral-300 bg-white overflow-hidden shadow-xs flex flex-col min-h-[290px] sm:min-h-[320px]">
              {/* Map Card Header */}
              <div className="px-4 py-2.5 sm:px-5 sm:py-3 border-b border-neutral-200 bg-neutral-50 flex items-center justify-between shrink-0">
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#DC2626] shrink-0" />
                  <span className="text-xs sm:text-sm font-bold text-neutral-950 truncate">
                    A Plus Business Link Pvt. Ltd.
                  </span>
                </div>

                <a
                  href="https://maps.google.com/?q=A+Plus+Business+Link+Pvt.+Ltd."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#DC2626] hover:underline shrink-0"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Exact Google Maps Embed Provided by User */}
              <div className="relative flex-1 w-full min-h-[260px] bg-neutral-100">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.256028399894!2d85.3016415!3d27.678480699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18384caebb0d%3A0x8f89b7ee20b9c14a!2sA%20Plus%20Business%20Link%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1788792298271!5m2!1sen!2snp"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  title="A Plus Business Link Pvt. Ltd. Google Map Location"
                  className="absolute inset-0 w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
