import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import WishlistHero from "@/components/wishlist/WishlistHero";
import WishlistContent from "@/components/wishlist/WishlistContent";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Saved Wishlist & Procurement Planner | Aplus Business Link",
  description:
    "Review and manage your saved commercial sports infrastructure, playground equipment, artificial turf, and Montessori educational supplies. Request instant proforma invoices or order directly.",
  keywords: [
    "Aplus Business Link Wishlist",
    "Commercial Equipment Procurement Nepal",
    "Institutional Sports Supplies Quote",
    "Playground Equipment Quotation",
    "Montessori Supplies Wishlist",
  ],
};

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      {/* Primary Global Sticky Navigation */}
      <Navbar />

      {/* Hero Header with Breadcrumbs & Metrics */}
      <WishlistHero />

      {/* Main Wishlist Interactive Content with Filters, Grid, Table & Summary */}
      <WishlistContent />

      {/* Final Call to Action Strip */}
      <FinalCTA />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
