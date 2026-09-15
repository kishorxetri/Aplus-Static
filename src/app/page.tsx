import Navbar from "@/components/navbar/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import ShopByCategories from "@/components/home/ShopByCategories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import KidsZoneSection from "@/components/home/KidsZoneSection";
import NewArrivals from "@/components/home/NewArrivals";
import OfferBanner from "@/components/home/OfferBanner";
import JustForYou from "@/components/home/JustForYou";
import B2BSolutions from "@/components/home/B2BSolutions";
import OurPartners from "@/components/home/OurPartners";
import PlaygroundRecreationSection from "@/components/home/PlaygroundRecreationSection";
// import LatestGuides from "@/components/home/LatestGuides";
import FinalCTA from "@/components/home/FinalCTA";
import ContactSection from "@/components/home/ContactSection";
import Footer from "@/components/footer/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-100/60 font-sans">
      <Navbar />
      <HeroSection />
      <ShopByCategories />
      <FeaturedProducts />
      <KidsZoneSection />
      <NewArrivals />
      <OfferBanner />
      <JustForYou />
      <B2BSolutions />
      <OurPartners />
      <PlaygroundRecreationSection />
      {/* <LatestGuides /> */}
      <FinalCTA />
      <ContactSection />
      <Footer />
    </main>
  );
}
