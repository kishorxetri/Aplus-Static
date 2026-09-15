import Image from "next/image";
import Link from "next/link";
import { Home, ChevronRight } from "lucide-react";

interface BlogHeroProps {
  title?: string;
  subtitle?: string;
  badge?: string;
  bgImage?: string;
}

export default function BlogHero({
  title = "Our Blogs & Articles",
  subtitle = "Expert engineering guides, procurement standards, and installation insights for commercial sports, playgrounds, gyms, and school furniture in Nepal.",
  badge = "Our Blogs",
  bgImage = "/Website-banner/artificial-turf-banner.png",
}: BlogHeroProps) {
  return (
    <section className="relative w-full overflow-hidden bg-neutral-950 border-b border-neutral-300">
      {/* Background Static Image */}
      <div className="absolute inset-0 w-full h-full pointer-events-none">
        <Image
          src={bgImage}
          alt="A Plus Business Link Blogs"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105"
        />
        {/* Deep Contrast Overlay */}
        <div className="absolute inset-0 bg-neutral-950/70 sm:bg-neutral-950/65" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/45 to-neutral-950/75" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-6 sm:pb-9 md:pb-10 flex flex-col items-center text-center">
        {/* Centered Integrated Breadcrumbs */}
        <nav
          aria-label="Breadcrumb"
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-semibold mb-2.5 sm:mb-4"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-1 sm:gap-1.5 text-neutral-300 hover:text-white transition-colors shrink-0"
          >
            <Home className="w-3.5 h-3.5 stroke-[2.25]" />
            <span>Home</span>
          </Link>

          <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

          <span className="text-red-400 font-bold shrink-0" aria-current="page">
            Our Blogs
          </span>
        </nav>

        {/* Hero Topic */}
        <div className="max-w-3xl flex flex-col items-center">
          <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-[38px] font-black text-white tracking-tight leading-tight mb-2 sm:mb-2.5">
            {title}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-neutral-200 font-medium max-w-2xl leading-relaxed px-1 sm:px-0">
            {subtitle}
          </p>
        </div>
      </div>
    </section>
  );
}
