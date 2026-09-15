import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Home, PackageOpen, ArrowLeft } from "lucide-react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FinalCTA from "@/components/home/FinalCTA";
import { getProductBySlug, getProductsByCategory, ALL_PRODUCTS } from "@/data/products";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInfoCenter from "@/components/product/ProductInfoCenter";
import ProductDeliverySidebar from "@/components/product/ProductDeliverySidebar";
import ProductTabsSection from "@/components/product/ProductTabsSection";
import RelatedProductsSection from "@/components/product/RelatedProductsSection";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Dynamic SEO Metadata Generator
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Product Not Found | Aplus Business Link Nepal",
      description: "The requested commercial equipment or institutional supply was not found.",
    };
  }

  return {
    title: `${product.name} | Aplus Business Link Nepal`,
    description:
      product.description ||
      `Procure ${product.name} with certified commercial quality, official VAT invoicing, and institutional warranty from Aplus Business Link Nepal.`,
    keywords: [
      product.name,
      product.category,
      product.subcategory,
      "Commercial Equipment Nepal",
      "Aplus Business Link Supplies",
      "Institutional Procurement Nepal",
    ],
    openGraph: {
      title: `${product.name} - Aplus Business Link`,
      description: `Official supplier of ${product.name} in Nepal. Rs. ${product.price.toLocaleString()} /${product.unit || "unit"}.`,
      images: [
        {
          url: product.image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
  };
}

// Generate static params for common products
export async function generateStaticParams() {
  return ALL_PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return (
      <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
        <Navbar />
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-red-50 text-[#DC2626] flex items-center justify-center mb-4">
            <PackageOpen className="w-8 h-8 stroke-[1.5]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
            Product Not Found
          </h1>
          <p className="text-sm text-neutral-600 max-w-md mb-6 leading-relaxed">
            The product you are searching for does not exist or has been updated in our catalog.
          </p>
          <div className="flex items-center gap-3">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white text-xs sm:text-sm font-semibold rounded-sm shadow-sm transition-all"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2]" />
              <span>Browse All Products</span>
            </Link>
            <Link
              href="/categories"
              className="px-5 py-2.5 bg-white hover:bg-neutral-50 text-neutral-800 text-xs sm:text-sm font-semibold rounded-sm border border-neutral-300 transition-all"
            >
              View Categories
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Related products from same category
  const relatedProducts = getProductsByCategory(product.categorySlug)
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      <Navbar />

      {/* Breadcrumbs Navigation - Exactly aligned to Navbar */}
      <div className="bg-white border-b border-neutral-200 shadow-2xs">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav
            aria-label="Breadcrumbs"
            className="flex items-center gap-2 text-xs sm:text-[13px] text-neutral-600 font-medium flex-wrap"
          >
            <Link
              href="/"
              className="flex items-center gap-1.5 text-neutral-600 hover:text-[#DC2626] transition-colors"
            >
              <Home className="w-3.5 h-3.5 text-neutral-700 stroke-[2]" />
              <span>Home</span>
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

            <Link
              href="/categories"
              className="text-neutral-600 hover:text-[#DC2626] transition-colors"
            >
              Categories
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

            <Link
              href={`/category/${product.categorySlug}`}
              className="text-neutral-700 hover:text-[#DC2626] transition-colors font-medium"
            >
              {product.category}
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

            <Link
              href={`/category/${product.categorySlug}?sub=${product.subcategorySlug}`}
              className="text-neutral-700 hover:text-[#DC2626] transition-colors font-medium"
            >
              {product.subcategory}
            </Link>

            <ChevronRight className="w-3.5 h-3.5 text-neutral-400 stroke-[2] shrink-0" />

            <span className="text-[#DC2626] font-semibold truncate max-w-[240px] sm:max-w-md">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 space-y-6">
        {/* Top 3-Column Product Section (Daraz / Alibaba Style) */}
        <div className="bg-white rounded-sm border border-neutral-200 p-4 sm:p-5 lg:p-6 shadow-2xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-start">
            {/* Left Column: Image Gallery (4 cols on lg) */}
            <div className="lg:col-span-4 xl:col-span-4 w-full">
              <ProductGallery product={product} />
            </div>

            {/* Center Column: Product Details & Buying Actions (5 cols on lg) */}
            <div className="lg:col-span-5 xl:col-span-5 w-full">
              <ProductInfoCenter product={product} />
            </div>

            {/* Right Column: Delivery, Guarantees & Supplier (3 cols on lg) */}
            <div className="lg:col-span-3 xl:col-span-3 w-full">
              <ProductDeliverySidebar product={product} />
            </div>
          </div>
        </div>

        {/* Full-Width Bottom Section: Product Tabs */}
        <ProductTabsSection product={product} />

        {/* Related Products Grid (5 Cards in a row) */}
        <RelatedProductsSection
          currentProduct={product}
          relatedProducts={relatedProducts}
        />
      </div>

      <FinalCTA />
      <Footer />
    </main>
  );
}
