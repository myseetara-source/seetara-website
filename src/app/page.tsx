import Navbar from "@/components/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Products from "@/components/sections/Products";
import Testimonials from "@/components/sections/Testimonials";
import Founder from "@/components/sections/Founder";
import Trust from "@/components/sections/Trust";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <About />
      <Products />
      <Testimonials />
      <Founder />
      <Trust />
      <Footer />
    </main>
  );
}
