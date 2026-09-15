import type { Metadata } from "next";
import { Baloo_2 } from "next/font/google";
import { CartProvider } from "@/context/CartContext";
import { WishlistProvider } from "@/context/WishlistContext";
import "./globals.css";

const baloo2 = Baloo_2({
  subsets: ["latin"],
  variable: "--font-baloo-2",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aplus Business Link | Premium Commercial & Institutional Supplies",
  description:
    "Aplus Business Link Pvt. Ltd. is a leading enterprise supplier of sports equipment, Montessori educational products, commercial playgrounds, artificial turf, and gym systems.",
  keywords: [
    "Aplus Business Link",
    "Sports Equipment",
    "Kids Educational Toys",
    "Commercial Playground",
    "Artificial Turf",
    "Gym Fitness Equipment",
    "B2B Wholesale Supplies",
  ],
  authors: [{ name: "Aplus Business Link Pvt. Ltd." }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${baloo2.variable} antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body
        className="min-h-screen bg-neutral-50/50 text-neutral-900 selection:bg-[#DC2626] selection:text-white font-sans"
        suppressHydrationWarning
      >
        <CartProvider>
          <WishlistProvider>{children}</WishlistProvider>
        </CartProvider>
      </body>
    </html>
  );
}
