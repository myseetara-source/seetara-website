"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Heart, Eye, Star, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";

const products: Product[] = [
  {
    id: "1",
    name: "Executive Tote",
    price: 1800,
    description: "Professional elegance meets everyday functionality. 16\" laptop compartment.",
    image: "/images/products/tote-black.jpg",
    hoverImage: "/images/products/tote-black-detail.jpg",
    category: "Tote Bags",
    colors: ["#1a1a1a", "#5D3A1A", "#3d3d3d"],
    rating: 4.9,
    reviews: 127,
    badge: "Bestseller",
    stock: 25,
    isActive: true,
    createdAt: "2024-01-15T00:00:00.000Z",
    updatedAt: "2024-01-15T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Cognac Classic",
    price: 2500,
    description: "Timeless cognac leather that ages beautifully with every use.",
    image: "/images/products/tote-cognac.jpg",
    hoverImage: "/images/products/tote-cognac-detail.jpg",
    category: "Tote Bags",
    colors: ["#A0522D", "#8B5A2B", "#5D3A1A"],
    rating: 4.8,
    reviews: 89,
    stock: 18,
    isActive: true,
    createdAt: "2024-01-20T00:00:00.000Z",
    updatedAt: "2024-01-20T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Chain Shoulder Bag",
    price: 1500,
    description: "Elegant evening companion with signature gold chain strap.",
    image: "/images/products/shoulder-black.jpg",
    category: "Shoulder Bags",
    colors: ["#1a1a1a", "#722F37", "#5D3A1A"],
    rating: 4.7,
    reviews: 64,
    badge: "New Arrival",
    stock: 30,
    isActive: true,
    createdAt: "2024-02-01T00:00:00.000Z",
    updatedAt: "2024-02-01T00:00:00.000Z",
  },
  {
    id: "4",
    name: "Coffee Brown Hobo",
    price: 1700,
    description: "Spacious hobo bag for the woman who carries her world with style.",
    image: "/images/products/hobo-brown.jpg",
    category: "Hobo Bags",
    colors: ["#5D3A1A", "#3d3d3d", "#A0522D"],
    rating: 4.9,
    reviews: 93,
    stock: 22,
    isActive: true,
    createdAt: "2024-02-10T00:00:00.000Z",
    updatedAt: "2024-02-10T00:00:00.000Z",
  },
  {
    id: "5",
    name: "Olive Professional",
    price: 1900,
    description: "Modern olive green for the bold professional making a statement.",
    image: "/images/products/tote-olive.jpg",
    category: "Tote Bags",
    colors: ["#556B2F", "#5D3A1A", "#1a1a1a"],
    rating: 4.6,
    reviews: 51,
    stock: 15,
    isActive: true,
    createdAt: "2024-02-15T00:00:00.000Z",
    updatedAt: "2024-02-15T00:00:00.000Z",
  },
  {
    id: "6",
    name: "Maroon Elegance",
    price: 1900,
    description: "Rich maroon shoulder bag for special occasions and everyday luxury.",
    image: "/images/products/shoulder-maroon.jpg",
    category: "Shoulder Bags",
    colors: ["#722F37", "#5D3A1A", "#1a1a1a"],
    rating: 4.8,
    reviews: 72,
    badge: "Limited Edition",
    stock: 10,
    isActive: true,
    createdAt: "2024-02-20T00:00:00.000Z",
    updatedAt: "2024-02-20T00:00:00.000Z",
  },
];

export default function Products() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -30 : -100]);
  const decorY = useTransform(scrollYProgress, [0, 1], [20, isMobile ? -20 : -50]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Stagger animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
      },
    },
  };

  return (
    <section ref={sectionRef} id="collection" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-[#FFFBF7]">
      {/* Animated Background Decorations - Smaller on mobile */}
      <motion.div 
        style={isMobile ? {} : { y: decorY }}
        className="absolute top-0 right-0 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-gradient-to-bl from-[#C9A227]/10 to-transparent rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" 
      />
      <motion.div 
        style={isMobile ? {} : { y: backgroundY }}
        className="absolute bottom-0 left-0 w-[150px] sm:w-[250px] md:w-[400px] h-[150px] sm:h-[250px] md:h-[400px] bg-gradient-to-tr from-[#8B5A2B]/10 to-transparent rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" 
      />
      
      {/* Floating Decorative Elements - Hidden on mobile */}
      <motion.div
        className="hidden sm:block absolute top-1/4 left-10 w-4 h-4 rounded-full bg-[#C9A227]/30"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="hidden sm:block absolute bottom-1/3 right-20 w-6 h-6 rounded-full bg-[#8B5A2B]/20"
        animate={{ y: [0, 20, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block text-[#C9A227] text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
            Curated Collection
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#2C1810] leading-tight mb-3 sm:mb-4 md:mb-6 px-2">
            Quality Over{" "}
            <span className="text-gradient-gold">Quantity</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#7A6252] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-0">
            We don&apos;t chase trends. We create timeless pieces — each design 
            perfected over months, crafted to last years.
          </p>
        </motion.div>

        {/* Filter Tags - Horizontal scrollable on mobile */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-start sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-12 overflow-x-auto pb-2 px-1 sm:px-0 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0"
        >
          {["All", "Tote Bags", "Shoulder Bags", "Hobo Bags"].map((filter, index) => (
            <motion.button
              key={filter}
              onClick={() => setSelectedCategory(filter)}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 sm:px-6 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap flex-shrink-0 ${
                filter === selectedCategory
                  ? "bg-[#8B5A2B] text-white shadow-md"
                  : "bg-white text-[#5D3A1A] border border-[#E8DDD4] active:bg-[#F5EDE6]"
              }`}
            >
              {filter}
            </motion.button>
          ))}
        </motion.div>

        {/* Products Grid - Mobile optimized */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {products
            .filter((product) => selectedCategory === "All" || product.category === selectedCategory)
            .map((product, index) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
              onMouseEnter={() => !isMobile && setHoveredProduct(product.id)}
              onMouseLeave={() => !isMobile && setHoveredProduct(null)}
              onClick={() => isMobile && setHoveredProduct(hoveredProduct === product.id ? null : product.id)}
            >
              <motion.div 
                className="relative bg-white rounded-xl sm:rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm transition-all duration-300"
                whileHover={isMobile ? {} : { 
                  y: -8, 
                  boxShadow: "0 25px 50px -12px rgba(93, 58, 26, 0.2)",
                }}
                whileTap={isMobile ? { scale: 0.98 } : {}}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Image Container */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5EDE6]">
                  {/* Main Image */}
                  <motion.div
                    className="absolute inset-0"
                    animate={{
                      scale: hoveredProduct === product.id ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover transition-opacity duration-400 ${
                        hoveredProduct === product.id && product.hoverImage
                          ? "opacity-0"
                          : "opacity-100"
                      }`}
                    />
                  </motion.div>
                  
                  {/* Hover Image - Desktop only */}
                  {product.hoverImage && !isMobile && (
                    <motion.div
                      className="absolute inset-0"
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: hoveredProduct === product.id ? 1 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Image
                        src={product.hoverImage}
                        alt={`${product.name} Detail`}
                        fill
                        className="object-cover"
                      />
                    </motion.div>
                  )}
                  
                  {/* Shine Effect - Desktop only */}
                  {!isMobile && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full"
                      animate={{
                        translateX: hoveredProduct === product.id ? "200%" : "-100%",
                      }}
                      transition={{ duration: 0.7 }}
                    />
                  )}

                  {/* Badge - Mobile sized */}
                  {product.badge && (
                    <motion.div 
                      className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <span className="px-2 sm:px-3 py-0.5 sm:py-1 bg-gradient-to-r from-[#C9A227] to-[#9A7B1A] text-white text-[10px] sm:text-xs font-medium rounded-full shadow-md">
                        {product.badge}
                      </span>
                    </motion.div>
                  )}

                  {/* Quick Actions - Always visible on mobile, hover on desktop */}
                  <div className="absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 flex flex-col gap-1.5 sm:gap-2 z-10">
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isInWishlist(product.id)) {
                          removeFromWishlist(product.id);
                        } else {
                          addToWishlist(product);
                        }
                      }}
                      initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : 20 }}
                      animate={{
                        opacity: isMobile ? 1 : (hoveredProduct === product.id ? 1 : 0),
                        x: isMobile ? 0 : (hoveredProduct === product.id ? 0 : 20),
                      }}
                      transition={{ type: "spring", stiffness: 400 }}
                      whileTap={{ scale: 0.9 }}
                      className={`p-1.5 sm:p-2 md:p-2.5 backdrop-blur-sm rounded-full shadow-md transition-colors ${
                        isInWishlist(product.id) 
                          ? "bg-red-500 text-white" 
                          : "bg-white/90 active:bg-[#F5EDE6]"
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isInWishlist(product.id) ? "fill-white" : "text-[#5D3A1A]"}`} />
                    </motion.button>
                    <motion.button
                      initial={{ opacity: isMobile ? 1 : 0, x: isMobile ? 0 : 20 }}
                      animate={{
                        opacity: isMobile ? 1 : (hoveredProduct === product.id ? 1 : 0),
                        x: isMobile ? 0 : (hoveredProduct === product.id ? 0 : 20),
                      }}
                      transition={{ type: "spring", stiffness: 400, delay: 0.03 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-1.5 sm:p-2 md:p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-md active:bg-[#F5EDE6] transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#5D3A1A]" />
                    </motion.button>
                  </div>

                  {/* Add to Cart Button - Always visible on mobile */}
                  <motion.div
                    initial={{ opacity: isMobile ? 1 : 0, y: isMobile ? 0 : 20 }}
                    animate={{
                      opacity: isMobile ? 1 : (hoveredProduct === product.id ? 1 : 0),
                      y: isMobile ? 0 : (hoveredProduct === product.id ? 0 : 20),
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-2 sm:left-3 md:left-4 right-2 sm:right-3 md:right-4 z-10"
                  >
                    <motion.button 
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                      }}
                      className={`w-full py-2 sm:py-2.5 md:py-3 rounded-lg sm:rounded-xl font-medium flex items-center justify-center gap-1.5 sm:gap-2 shadow-md text-xs sm:text-sm transition-all ${
                        isInCart(product.id)
                          ? "bg-green-600 text-white"
                          : "bg-[#2C1810] active:bg-[#5D3A1A] text-white"
                      }`}
                      whileTap={{ scale: 0.97 }}
                    >
                      {isInCart(product.id) ? (
                        <>
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Added</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                          <span className="hidden sm:inline">Quick Add</span>
                          <span className="sm:hidden">Add</span>
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                  
                  {/* Overlay Gradient - pointer-events-none to not block button clicks */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                </div>

                {/* Content - Mobile optimized */}
                <div className="p-2.5 sm:p-3 md:p-4 lg:p-5">
                  {/* Category & Rating */}
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <span className="text-[10px] sm:text-xs text-[#7A6252] uppercase tracking-wide truncate">
                      {product.category.split(' ')[0]}
                    </span>
                    <div className="flex items-center gap-0.5 sm:gap-1">
                      <Star className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-[#C9A227] fill-[#C9A227]" />
                      <span className="text-[10px] sm:text-xs text-[#5D3A1A] font-medium">
                        {product.rating}
                      </span>
                      <span className="hidden sm:inline text-[10px] sm:text-xs text-[#7A6252]">
                        ({product.reviews})
                      </span>
                    </div>
                  </div>

                  {/* Name & Description */}
                  <h3 className="text-sm sm:text-base md:text-lg font-serif text-[#2C1810] mb-0.5 sm:mb-1 line-clamp-1 sm:line-clamp-none">
                    {product.name}
                  </h3>
                  <p className="hidden sm:block text-xs sm:text-sm text-[#7A6252] line-clamp-2 mb-2 sm:mb-3">
                    {product.description}
                  </p>

                  {/* Price & Colors */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1 sm:gap-2">
                      <span className="text-sm sm:text-base md:text-lg lg:text-xl font-semibold text-[#2C1810]">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice && (
                        <span className="hidden sm:inline text-xs sm:text-sm text-[#7A6252] line-through">
                          {formatPrice(product.originalPrice)}
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 sm:gap-1">
                      {product.colors.slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border border-[#E8DDD4]"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-8 sm:mt-12 md:mt-16"
        >
          <motion.button
            whileTap={{ scale: 0.97 }}
            className="group inline-flex items-center gap-2 sm:gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-leather text-white rounded-full font-medium shadow-lg sm:shadow-luxury active:shadow-md transition-all text-sm sm:text-base"
          >
            <span>View All Collection</span>
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

