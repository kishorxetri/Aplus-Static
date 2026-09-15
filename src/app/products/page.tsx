import type { Metadata } from "next";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import FinalCTA from "@/components/home/FinalCTA";
import AllProductsBrowser from "@/components/products/AllProductsBrowser";

export const metadata: Metadata = {
  title: "Complete Product Catalog | Aplus Business Link Nepal",
  description:
    "Browse our full commercial equipment line: FIFA-grade artificial turf, competition sports gear, Montessori wooden educational materials, playground bouncers, and commercial gym solutions.",
  keywords: [
    "Aplus Business Link Catalog",
    "Commercial Equipment Nepal",
    "Sports Supplies Wholesale",
    "Montessori Educational Materials",
    "Artificial Turf Supplier",
    "Playground Bouncer Systems",
  ],
};

export default function ProductsPage() {
  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans flex flex-col">
      <Navbar />
      <AllProductsBrowser />
      <FinalCTA />
      <Footer />
    </main>
  );
}
