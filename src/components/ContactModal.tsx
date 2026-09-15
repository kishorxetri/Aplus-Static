"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, X, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 600));
    setIsSubmitting(false);
    setIsSent(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSent(false);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-xs sm:text-sm font-semibold text-slate-200 border border-neutral-700 hover:text-white hover:border-[#DC2626]/70 transition-all cursor-pointer shadow-md"
      >
        <MessageSquare className="w-4 h-4 text-[#DC2626]" />
        <span>Direct Inquiries & Partnerships</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fade-in">
          <div
            className="relative w-full max-w-lg p-6 sm:p-8 rounded-3xl bg-[#080e1e] border border-[#172554] shadow-2xl shadow-black"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-[#172554] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isSent ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 mx-auto rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Received!</h3>
                <p className="text-slate-300 text-sm mb-6">
                  Thank you for reaching out to Aplus Business Link. Our corporate liaisons will respond to you shortly.
                </p>
                <button
                  onClick={handleClose}
                  className="px-6 py-2.5 rounded-xl bg-[#DC2626] hover:bg-[#ef4444] text-white font-bold text-sm transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h3 className="text-xl font-extrabold text-white tracking-tight">
                    Get in Touch with Aplus Business Link
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    Seeking strategic collaboration or early partnership before general rollout?
                  </p>
                </div>

                {/* Contact items */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#172554]/40 border border-[#172554] text-xs text-slate-200">
                    <Mail className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span className="truncate">contact@apluslink.com</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 rounded-xl bg-[#172554]/40 border border-[#172554] text-xs text-slate-200">
                    <Phone className="w-4 h-4 text-[#DC2626] shrink-0" />
                    <span>+1 (800) 555-APLUS</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Your Name / Enterprise
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Nexus Global Ltd."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1329] border border-[#172554] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Business Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@company.com"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1329] border border-[#172554] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#DC2626]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-300 mb-1">
                      Inquiry / Partnership Note
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your business goals or partnership interest..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#0b1329] border border-[#172554] text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#DC2626] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-[#DC2626] to-[#b91c1c] hover:from-[#ef4444] hover:to-[#dc2626] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-[#DC2626]/30 disabled:opacity-70 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
