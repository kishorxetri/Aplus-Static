import { MapPin, Navigation, ExternalLink, Car, Clock, Sparkles } from "lucide-react";

export default function ContactMapSection() {
  return (
    <section
      className="w-full py-8 sm:py-10 lg:py-12 bg-white border-t border-neutral-300"
      aria-label="Experience Center and Location Map"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-2">
              <MapPin className="w-3.5 h-3.5" />
              <span>Location & Facility</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] font-bold text-neutral-950 tracking-tight">
              Visit Our Central Experience Center
            </h2>
          </div>

          <a
            href="https://maps.google.com/?q=A+Plus+Business+Link+Pvt.+Ltd."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-900 hover:bg-[#DC2626] text-white text-sm font-bold rounded-lg shadow-sm transition-colors shrink-0 cursor-pointer self-start md:self-auto"
          >
            <Navigation className="w-4 h-4" />
            <span>Get Driving Directions</span>
            <ExternalLink className="w-3.5 h-3.5 text-white/70" />
          </a>
        </div>

        {/* Map Card */}
        <div className="rounded-xl sm:rounded-2xl border border-neutral-300 overflow-hidden shadow-xs bg-white">
          {/* Map Top Bar */}
          <div className="px-4 py-3 sm:px-6 sm:py-3.5 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <span className="w-3 h-3 rounded-full bg-[#DC2626] ring-4 ring-red-100 animate-pulse" />
              <span className="text-sm font-bold text-neutral-950">
                A Plus Business Link Pvt. Ltd. Headquarters
              </span>
              <span className="text-xs px-2 py-0.5 rounded-md bg-white border border-neutral-200 text-neutral-800 font-bold hidden sm:inline-block">
                Lalitpur - 03, Kathmandu Valley
              </span>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold text-neutral-600">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-neutral-500" />
                <span>Open Today: 9:00 AM – 6:00 PM</span>
              </span>
            </div>
          </div>

          {/* Iframe Embed */}
          <div className="relative w-full h-[360px] sm:h-[420px] lg:h-[480px] bg-neutral-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.256028399894!2d85.3016415!3d27.678480699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18384caebb0d%3A0x8f89b7ee20b9c14a!2sA%20Plus%20Business%20Link%20Pvt.%20Ltd.!5e0!3m2!1sen!2snp!4v1788792298271!5m2!1sen!2snp"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="A Plus Business Link Pvt. Ltd. Office Map"
              className="w-full h-full"
            />
          </div>

          {/* Map Facility Feature Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-neutral-200 border-t border-neutral-200 bg-neutral-50/70 text-xs sm:text-[13px] font-semibold text-neutral-700">
            <div className="p-3.5 sm:p-4 flex items-center gap-2.5">
              <Car className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Free Dedicated On-Site Parking</span>
            </div>
            <div className="p-3.5 sm:p-4 flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Full Physical Sample Displays</span>
            </div>
            <div className="p-3.5 sm:p-4 flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Prime Highway / Ring Road Proximity</span>
            </div>
            <div className="p-3.5 sm:p-4 flex items-center gap-2.5">
              <Clock className="w-4 h-4 text-[#DC2626] shrink-0" />
              <span>Walk-in Inquiries Welcome (Sun - Fri)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
