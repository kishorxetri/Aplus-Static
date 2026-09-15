import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

export default function ContactHero() {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-300">
      {/* Background Image with slight scale & rich tone */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src="/images/contact-hero.jpg"
          alt="A Plus Business Link Corporate Office and Consultation Center"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Deep Contrast Overlay */}
        <div className="absolute inset-0 bg-neutral-950/70 sm:bg-neutral-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/85 via-neutral-950/40 to-neutral-950/70" />
      </div>

      {/* Content Container - Compact & Contained with centered integrated breadcrumbs */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-5 sm:pt-6 pb-7 sm:pb-9 md:pb-10 flex flex-col items-center text-center">
        {/* Breadcrumb Navigation directly inside Hero - Centered */}
        <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
          >
            <Home className="w-3.5 h-3.5 stroke-[2.25]" />
            <span>Home</span>
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2]" />

          <span className="text-red-400 font-bold" aria-current="page">
            Contact Us
          </span>
        </nav>

        {/* Hero Topic - Centered */}
        <div className="max-w-3xl flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#DC2626] animate-pulse" />
            <span className="text-white">Get in Touch</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-bold text-white tracking-tight leading-tight">
            Contact A Plus Business Link
          </h1>
        </div>
      </div>
    </section>
  );
}
