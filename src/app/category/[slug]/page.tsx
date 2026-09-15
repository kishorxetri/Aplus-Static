import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FinalCTA from "@/components/home/FinalCTA";
import CategoryProductBrowser from "@/components/category/CategoryProductBrowser";
import { MAIN_CATEGORIES, getCategoryBySlug } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return MAIN_CATEGORIES.map((cat) => ({
    slug: cat.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    return {
      title: "Category Not Found | Aplus Business Link",
      description: "The requested commercial equipment category could not be found.",
    };
  }

  const subNames = category.subcategories.map((s) => s.name).join(", ");

  return {
    title: `${category.name} Supplies & Equipment | Aplus Business Link`,
    description: `${category.shortDescription} Explore wholesale and institutional ${category.name.toLowerCase()} catalog including ${subNames}.`,
    keywords: [
      category.name,
      ...category.subcategories.map((s) => s.name),
      "Aplus Business Link Nepal",
      "Institutional Equipment Wholesale",
    ],
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = getProductsByCategory(category.slug);

  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      <Navbar />
      <Suspense fallback={<div className="py-20 text-center text-sm font-semibold text-neutral-600">Loading products...</div>}>
        <CategoryProductBrowser
          category={category}
          initialProducts={products}
        />
      </Suspense>
      <FinalCTA />
      <Footer />
    </main>
  );
}

