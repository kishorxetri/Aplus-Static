import { Suspense } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FinalCTA from "@/components/home/FinalCTA";
import BlogHero from "@/components/blogs/BlogHero";
import BlogListing from "@/components/blogs/BlogListing";
import { getAllBlogs, getAllCategories } from "@/data/blogs";

export const metadata: Metadata = {
  title: "Our Blog & Buying Guides | A Plus Business Link Pvt. Ltd.",
  description:
    "Expert technical blueprints, buying guides, and procurement advice for sports arenas, artificial turf, commercial gyms, school playgrounds, and institutional furniture in Nepal.",
  keywords: [
    "A Plus Business Link Blog",
    "Futsal Turf Guide Nepal",
    "Commercial Gym Setup Nepal",
    "School Playground Safety Standards",
    "Classroom Furniture Ergonomics",
    "Sports Infrastructure Nepal",
  ],
};

export default function BlogPage() {
  const allBlogs = getAllBlogs();
  const categories = getAllCategories();

  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      {/* Global Navigation */}
      <Navbar />

      {/* Hero Section with Static Background Image & Breadcrumbs */}
      <BlogHero />

      {/* Interactive Blog Listing with Search & Category Filters */}
      <Suspense fallback={<div className="py-12 text-center font-bold text-neutral-600">Loading articles...</div>}>
        <BlogListing initialPosts={allBlogs} categories={categories} />
      </Suspense>

      {/* Final Call to Action */}
      <FinalCTA />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
