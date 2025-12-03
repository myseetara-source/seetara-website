"use client";

import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { ShoppingBag, Star, Sparkles } from "lucide-react";
import { useCart } from "@/context/CartContext";

interface ColorVariant {
  name: string;
  color: string;
  image: string;
}

const colorVariants: ColorVariant[] = [
  {
    name: "Cinnamon",
    color: "#A0522D",
    image: "/images/products/tote-cognac.jpg",
  },
  {
    name: "Espresso",
    color: "#5D3A1A",
    image: "/images/products/tote-black.jpg",
  },
  {
    name: "Olive",
    color: "#556B2F",
    image: "/images/products/tote-olive.jpg",
  },
];

export default function FeaturedProduct() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const { addToCart, openCheckout } = useCart();

  // Motion values for smooth cursor tracking
  const mouseX = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  
  // Transform cursor position to color index
  const colorProgress = useTransform(smoothX, [0, 1], [0, colorVariants.length - 1]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    mouseX.set(Math.max(0, Math.min(1, x)));
    
    // Update active index based on cursor position
    const newIndex = Math.round(x * (colorVariants.length - 1));
    setActiveIndex(Math.max(0, Math.min(colorVariants.length - 1, newIndex)));
  };

  const handleBuyNow = () => {
    addToCart({
      id: "featured-1",
      name: `Cognac Classic - ${colorVariants[activeIndex].name}`,
      price: 2500,
      description: "Our signature tote bag, handcrafted with premium Nepali leather.",
      image: colorVariants[activeIndex].image,
      category: "Tote Bags",
      colors: colorVariants.map(v => v.color),
      rating: 4.9,
      reviews: 156,
      stock: 20,
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
    openCheckout();
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section className="py-16 sm:py-20 md:py-28 bg-gradient-to-b from-[#FFFBF7] to-[#F5EDE6] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-flex items-center gap-2 text-[#C9A227] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-3">
            <Sparkles className="w-4 h-4" />
            Interactive Experience
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2C1810] leading-tight mb-4">
            Slide to Explore <span className="text-gradient-gold">Colors</span>
          </h2>
          <p className="text-sm sm:text-base text-[#7A6252] max-w-xl mx-auto">
            Move your cursor across the bag to see different color options instantly
          </p>
        </motion.div>

        {/* Interactive Product Display */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Product Image with Cursor Interaction */}
          <motion.div
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative aspect-square max-w-lg mx-auto w-full cursor-none"
          >
            {/* Background Glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `radial-gradient(circle at center, ${colorVariants[activeIndex].color}20 0%, transparent 70%)`,
              }}
              animate={{ scale: isHovering ? 1.05 : 1 }}
              transition={{ duration: 0.3 }}
            />

            {/* Image Container */}
            <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-luxury bg-white">
              {/* Color Variant Images */}
              {colorVariants.map((variant, index) => (
                <motion.div
                  key={variant.name}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: index === activeIndex ? 1 : 0,
                    scale: index === activeIndex ? 1 : 1.05,
                  }}
                  transition={{ duration: 0.4, ease: "easeInOut" }}
                >
                  <Image
                    src={variant.image}
                    alt={`Bag in ${variant.name}`}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </motion.div>
              ))}

              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

              {/* Cursor Hint */}
              {isHovering && (
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm text-[#5D3A1A] shadow-lg">
                    <span>← Slide to change color →</span>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Color Progress Indicator */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3">
              {colorVariants.map((variant, index) => (
                <motion.button
                  key={variant.name}
                  onClick={() => setActiveIndex(index)}
                  className="relative"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div
                    className={`w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                      index === activeIndex
                        ? "border-[#C9A227] scale-110 shadow-gold"
                        : "border-white shadow-md"
                    }`}
                    style={{ backgroundColor: variant.color }}
                  />
                  {index === activeIndex && (
                    <motion.div
                      layoutId="activeColor"
                      className="absolute -inset-1 rounded-full border-2 border-[#C9A227]"
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Active Color Name */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute -bottom-12 left-1/2 -translate-x-1/2"
            >
              <span className="text-sm font-medium text-[#5D3A1A]">
                {colorVariants[activeIndex].name}
              </span>
            </motion.div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-center lg:text-left mt-16 lg:mt-0"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-[#C9A227]/20 to-[#C9A227]/10 rounded-full mb-4"
            >
              <span className="text-xs font-medium text-[#C9A227] uppercase tracking-wider">
                Featured Product
              </span>
            </motion.div>

            <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2C1810] mb-4">
              Cognac Classic Tote
            </h3>

            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start gap-2 mb-4">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className="w-5 h-5 text-[#C9A227] fill-[#C9A227]"
                  />
                ))}
              </div>
              <span className="text-sm text-[#7A6252]">(156 reviews)</span>
            </div>

            <p className="text-[#7A6252] leading-relaxed mb-6 max-w-md mx-auto lg:mx-0">
              Our signature tote bag, handcrafted with premium Nepali leather.
              Features spacious interior, laptop sleeve, and elegant gold-tone
              hardware. Perfect for the modern professional.
            </p>

            {/* Features */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
              {["100% Leather", "Handcrafted", "16\" Laptop"].map((feature) => (
                <span
                  key={feature}
                  className="px-4 py-2 bg-white rounded-full text-sm text-[#5D3A1A] shadow-sm"
                >
                  {feature}
                </span>
              ))}
            </div>

            {/* Price */}
            <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
              <span className="text-3xl sm:text-4xl font-serif text-[#2C1810]">
                {formatPrice(2500)}
              </span>
              <span className="text-lg text-[#7A6252] line-through">
                {formatPrice(3200)}
              </span>
              <span className="px-3 py-1 bg-red-100 text-red-600 text-sm font-medium rounded-full">
                22% OFF
              </span>
            </div>

            {/* Buy Now Button */}
            <motion.button
              onClick={handleBuyNow}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2C1810] to-[#5D3A1A] text-white rounded-full font-medium shadow-luxury hover:shadow-xl transition-all text-lg"
            >
              <ShoppingBag className="w-5 h-5" />
              Buy Now in {colorVariants[activeIndex].name}
            </motion.button>

            {/* Trust Badges */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 text-sm text-[#7A6252]">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                Free Shipping
              </div>
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                COD Available
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

