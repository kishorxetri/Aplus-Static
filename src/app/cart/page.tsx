import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import CartHero from "@/components/cart/CartHero";
import CartContent from "@/components/cart/CartContent";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Shopping Cart & Procurement Checkout | Aplus Business Link",
  description:
    "Review your commercial equipment, artificial turf rolls, sports goods, and educational playground items. Calculate costs with inclusive 13% VAT, apply discount vouchers, and request institutional proforma invoices or checkout directly.",
  keywords: [
    "Aplus Business Link Shopping Cart",
    "Commercial Equipment Procurement Nepal",
    "Sports Equipment Checkout",
    "Artificial Turf Pricing Nepal",
    "Institutional Procurement Proforma Invoice",
  ],
};

export default function CartPage() {
  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      {/* Primary Global Sticky Navigation */}
      <Navbar />

      {/* Hero Header with Breadcrumbs & Metrics */}
      <CartHero />

      {/* Main Cart Interactive Content with Items Table, Stepper, Promo Codes & Checkout Sidebar */}
      <CartContent />

      {/* Final Call to Action Strip */}
      <FinalCTA />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
