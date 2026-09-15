import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import ContactHero from "@/components/contact/ContactHero";
import ContactGrid from "@/components/contact/ContactGrid";
import ContactMapSection from "@/components/contact/ContactMapSection";
import FinalCTA from "@/components/home/FinalCTA";
import Footer from "@/components/footer/Footer";

export const metadata: Metadata = {
  title: "Contact Us | A Plus Business Link Pvt. Ltd.",
  description:
    "Get in touch with A Plus Business Link Pvt. Ltd. Reach our commercial sports, playground recreation, and institutional equipment team for custom quotes, inquiries, and showroom visits.",
  keywords: [
    "Contact A Plus Business Link",
    "Sports Equipment Supplier Nepal Contact",
    "Playground Equipment Quotation",
    "Kathmandu Sports Infrastructure Office",
    "A Plus Business Link Hotline",
  ],
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      {/* Primary Global Navigation */}
      <Navbar />

      {/* Hero Section with Integrated Breadcrumbs & Topic */}
      <ContactHero />

      {/* 2-Column Contact Section: Info on Left, Professional Form on Right */}
      <ContactGrid />

      {/* Full Google Map & Experience Center Details */}
      <ContactMapSection />

      {/* Final Call to Action Matching Homepage */}
      <FinalCTA />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
