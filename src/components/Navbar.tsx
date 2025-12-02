"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import { Menu, X, ShoppingBag, Search, Heart } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const navLinks = [
  { name: "Collection", href: "#collection" },
  { name: "Our Story", href: "#story" },
  { name: "Trust", href: "#trust" },
  { name: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getCartCount, setIsCartOpen } = useCart();
  const { getWishlistCount } = useWishlist();
  
  // Scroll progress for progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#C9A227] via-[#E8D48A] to-[#C9A227] origin-left z-[60]"
        style={{ scaleX }}
      />
      
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-md py-2.5 sm:py-3"
            : "bg-transparent py-3 sm:py-4 md:py-5"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10">
              <motion.div
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2"
              >
                <Image
                  src="/images/logo/logo.png"
                  alt="Seetara Logo"
                  width={140}
                  height={50}
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                  priority
                />
              </motion.div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-10">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                >
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium tracking-wide uppercase transition-colors duration-300 group ${
                      isScrolled
                        ? "text-[#5D3A1A] hover:text-[#8B5A2B]"
                        : "text-[#5D3A1A] hover:text-[#8B5A2B]"
                    }`}
                  >
                    {link.name}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C9A227] transition-all duration-300 group-hover:w-full" />
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className={`hidden md:flex p-2 rounded-full transition-colors ${
                  isScrolled ? "hover:bg-[#F5EDE6]" : "hover:bg-white/20"
                }`}
              >
                <Search className="w-5 h-5 text-[#5D3A1A]" />
              </motion.button>
              <Link href="/wishlist">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className={`hidden md:flex p-2 rounded-full transition-colors relative ${
                    isScrolled ? "hover:bg-[#F5EDE6]" : "hover:bg-white/20"
                  }`}
                >
                  <Heart className="w-5 h-5 text-[#5D3A1A]" />
                  {getWishlistCount() > 0 && (
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                      {getWishlistCount()}
                    </span>
                  )}
                </motion.button>
              </Link>
              <motion.button
                onClick={() => setIsCartOpen(true)}
                whileTap={{ scale: 0.95 }}
                className={`relative p-1.5 sm:p-2 rounded-full transition-colors ${
                  isScrolled ? "hover:bg-[#F5EDE6]" : "hover:bg-white/20"
                }`}
              >
                <ShoppingBag className="w-5 h-5 text-[#5D3A1A]" />
                <span className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-4 h-4 bg-[#C9A227] rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                  {getCartCount()}
                </span>
              </motion.button>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-1.5 sm:p-2 rounded-lg active:bg-[#F5EDE6]"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-[#5D3A1A]" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-[#5D3A1A]" />
                )}
              </motion.button>
            </div>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu - Enhanced */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-gradient-to-b from-[#FFFBF7] to-[#F5EDE6]"
          >
            {/* Background decoration */}
            <motion.div 
              className="absolute top-1/4 right-0 w-64 h-64 bg-[#C9A227]/10 rounded-full blur-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.div 
              className="absolute bottom-1/4 left-0 w-48 h-48 bg-[#8B5A2B]/10 rounded-full blur-3xl"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            />
            
            <div className="relative h-full flex flex-col items-center justify-center px-6 -mt-12">
              {/* Nav Links */}
              <div className="flex flex-col items-center gap-6 sm:gap-8">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.08, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-2xl sm:text-3xl font-serif text-[#2C1810] active:text-[#8B5A2B] transition-colors relative group"
                    >
                      {link.name}
                      <motion.span 
                        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#C9A227]"
                        initial={{ scaleX: 0 }}
                        whileTap={{ scaleX: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </Link>
                  </motion.div>
                ))}
              </div>
              
              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mt-10 sm:mt-12 flex gap-4"
              >
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="p-3.5 bg-white rounded-full shadow-md active:bg-[#F5EDE6]"
                >
                  <Search className="w-5 h-5 text-[#5D3A1A]" />
                </motion.button>
                <Link href="/wishlist" onClick={() => setIsMobileMenuOpen(false)}>
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="p-3.5 bg-white rounded-full shadow-md active:bg-[#F5EDE6] relative"
                  >
                    <Heart className="w-5 h-5 text-[#5D3A1A]" />
                    {getWishlistCount() > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] text-white flex items-center justify-center font-medium">
                        {getWishlistCount()}
                      </span>
                    )}
                  </motion.button>
                </Link>
              </motion.div>
              
              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-12 text-sm text-[#7A6252] text-center"
              >
                Premium Handcrafted Bags • Made in Nepal
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

