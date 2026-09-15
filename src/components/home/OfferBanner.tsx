import Image from "next/image";
import Link from "next/link";

export default function OfferBanner() {
  return (
    <section className="w-full py-2 sm:py-3 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/category/sports-equipment"
          className="group block relative w-full overflow-hidden rounded-xl sm:rounded-2xl border border-neutral-300 shadow-xs hover:shadow-md hover:border-neutral-400 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626]"
          aria-label="Special B2B Project Offer - Flat 30% Off on School, Sports & Playground Equipment"
        >
          <div className="relative w-full h-[80px] xs:h-[98px] sm:h-[125px] md:h-[155px] lg:h-[180px] xl:h-[195px] overflow-hidden bg-[#070e1e]">
            <Image
              src="/images/banner-offer-last.jpg"
              alt="Special B2B Project Offer - Flat 30% Off for School, Sports Complex & Play Area"
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 95vw, 1440px"
              className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-[1.015]"
              priority={false}
            />
          </div>
        </Link>
      </div>
    </section>
  );
}
