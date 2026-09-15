import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import CheckoutHero from "@/components/checkout/CheckoutHero";
import CheckoutContent from "@/components/checkout/CheckoutContent";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Checkout & Order Confirmation | Aplus Business Link",
  description:
    "Secure commercial and institutional checkout with Cash on Delivery (COD), inclusive 13% VAT invoicing, and nationwide insured delivery across Nepal.",
  keywords: [
    "Aplus Checkout",
    "Cash on Delivery Sports Equipment Nepal",
    "Artificial Turf Order Nepal",
    "Commercial Equipment Procurement",
    "VAT Invoice Checkout Nepal",
  ],
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      {/* Primary Global Sticky Navigation */}
      <Navbar />

      {/* Checkout Hero with Progress Wizard */}
      <CheckoutHero currentStep={2} />

      {/* Main Checkout Form & Summary */}
      <CheckoutContent />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
