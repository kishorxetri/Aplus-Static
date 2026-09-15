import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Home,
  ArrowRight,
  Trophy,
  Puzzle,
  Tent,
  Sprout,
  Dumbbell,
  GraduationCap,
} from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FinalCTA from "@/components/home/FinalCTA";
import { MAIN_CATEGORIES } from "@/data/categories";
import { getAllProducts } from "@/data/products";

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  "sports-equipment": Trophy,
  "kids-educational": Puzzle,
  "playground-recreation": Tent,
  "artificial-turf": Sprout,
  "commercial-fitness": Dumbbell,
  "kindergarten-furniture": GraduationCap,
};

export const metadata: Metadata = {
  title: "All Equipment & Supply Categories | Aplus Business Link",
  description:
    "Explore our complete institutional catalog: Sports equipment, Montessori learning products, commercial playgrounds, FIFA-grade artificial turf, and gym systems.",
  keywords: [
    "All Categories Aplus Business Link",
    "Sports Equipment Nepal",
    "Montessori Educational Supplies",
    "Commercial Playgrounds Nepal",
    "Artificial Turf Supplier",
    "Gym Fitness Wholesale",
  ],
};

export default function CategoriesOverviewPage() {
  const allProducts = getAllProducts();

  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      <Navbar />

      {/* Breadcrumbs Navigation */}
      <div className="bg-white border-b border-neutral-200 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs sm:text-[13px] text-neutral-600 font-medium"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-neutral-600 hover:text-[#DC2626] transition-colors font-medium"
            >
              <Home className="w-3.5 h-3.5 text-neutral-700 stroke-[2]" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />
            <span className="text-[#DC2626] font-semibold">Categories</span>
          </nav>
        </div>
      </div>

      {/* Hero Banner - Clean, Premium Executive Aesthetic */}
      <section className="bg-gradient-to-r from-neutral-950 via-neutral-900 to-neutral-900 text-white py-10 sm:py-12 border-b border-neutral-800">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-4.5xl font-bold tracking-tight text-white leading-tight">
              Explore All Product Categories
            </h1>
            <p className="mt-3 text-sm sm:text-base text-neutral-200 font-normal leading-relaxed">
              Aplus Business Link provides premier institutional infrastructure, international certified athletic sports gear, Montessori educational resources, and commercial playground solutions.
            </p>
          </div>
        </div>
      </section>

      {/* Category Sections Container */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8 sm:space-y-10">
        {MAIN_CATEGORIES.map((category) => {
          const CategoryIcon = CATEGORY_ICONS[category.id] || Trophy;
          const categoryProducts = allProducts.filter(
            (p) =>
              p.categorySlug === category.slug ||
              p.category.toLowerCase().includes(category.name.toLowerCase())
          );

          return (
            <div
              key={category.id}
              id={category.slug}
              className="bg-white rounded-2xl border border-neutral-200/90 shadow-xs overflow-hidden scroll-mt-20"
            >
              {/* Category Header Banner */}
              <div className="p-5 sm:p-6 lg:p-7 border-b border-neutral-200 bg-gradient-to-r from-neutral-50 to-white flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-neutral-900 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <CategoryIcon className="w-5.5 h-5.5 text-[#DC2626] stroke-[2]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2.5 flex-wrap">
                      <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
                        {category.name}
                      </h2>
                      <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-50 text-[#DC2626] border border-red-100">
                        {category.subcategories.length} Subcategories
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-neutral-600 font-normal mt-1 max-w-2xl">
                      {category.shortDescription}
                    </p>
                  </div>
                </div>

                <Link
                  href={`/category/${category.slug}`}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-neutral-900 hover:bg-[#DC2626] text-white text-xs sm:text-sm font-semibold rounded-xl transition-all shadow-xs shrink-0 self-start md:self-auto group"
                >
                  <span>View All {category.name}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform stroke-[2]" />
                </Link>
              </div>

              {/* Subcategories Grid */}
              <div className="p-5 sm:p-6 lg:p-7">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-700 mb-4">
                  Browse by Subcategory
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
                  {category.subcategories.map((sub) => {
                    const subCount = categoryProducts.filter(
                      (p) =>
                        p.subcategorySlug === sub.slug ||
                        p.subcategory
                          .toLowerCase()
                          .includes(sub.slug.toLowerCase().replace("-", " "))
                    ).length;

                    return (
                      <Link
                        key={sub.id || sub.slug}
                        href={sub.href}
                        className="group flex flex-col bg-neutral-50/60 hover:bg-white rounded-xl border border-neutral-200/90 hover:border-[#DC2626] hover:shadow-md transition-all duration-200 p-2.5 overflow-hidden"
                      >
                        <div className="relative w-full aspect-[4/3] bg-neutral-200 rounded-lg overflow-hidden mb-2">
                          <Image
                            src={sub.image}
                            alt={sub.name}
                            fill
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {sub.isPopular && (
                            <span className="absolute top-1.5 left-1.5 bg-[#DC2626] text-white text-[9px] font-semibold uppercase px-1.5 py-0.5 rounded shadow-2xs">
                              Hot
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col flex-1 justify-between">
                          <span className="text-xs sm:text-[13.5px] font-semibold text-neutral-900 group-hover:text-[#DC2626] line-clamp-2 transition-colors leading-snug">
                            {sub.name}
                          </span>
                          <span className="text-[11.5px] text-neutral-500 font-normal mt-1">
                            {subCount > 0 ? `${subCount} Products` : "Browse Gear"}
                          </span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      <FinalCTA />
      <Footer />
    </main>
  );
}
