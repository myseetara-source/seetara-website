"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Founder from "@/components/sections/Founder";
import Trust from "@/components/sections/Trust";
import Footer from "@/components/sections/Footer";

// Dynamic imports for heavy sections (code splitting)
const FeaturedProduct = dynamic(() => import("@/components/sections/FeaturedProduct"), {
  loading: () => (
    <div className="py-24 bg-[#FFFBF7] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#8B5A2B] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const WatchAndBuy = dynamic(() => import("@/components/sections/WatchAndBuy"), {
  loading: () => (
    <div className="py-24 bg-[#2C1810] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#C9A227] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const LivePlayReviews = dynamic(() => import("@/components/sections/LivePlayReviews"), {
  loading: () => (
    <div className="py-24 bg-[#FFFBF7] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#8B5A2B] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

const Testimonials = dynamic(() => import("@/components/sections/Testimonials"), {
  loading: () => (
    <div className="py-24 bg-[#FFFBF7] flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-[#8B5A2B] border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <FeaturedProduct />
      <Products />
      <WatchAndBuy />
      <LivePlayReviews />
      <Testimonials />
      <Founder />
      <Trust />
      <Footer />
    </main>
  );
}
