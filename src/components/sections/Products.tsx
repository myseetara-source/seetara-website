"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import { ShoppingBag, Heart, Eye, Star, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { Product } from "@/types";

interface ProductsProps {
  products?: Product[];
}

export default function Products({ products: initialProducts }: ProductsProps) {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isMobile, setIsMobile] = useState(false);
  const [products, setProducts] = useState<Product[]>(initialProducts || []);
  const [isLoading, setIsLoading] = useState(!initialProducts);
  const { addToCart, isInCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  // Fetch products from API if not provided as props
  useEffect(() => {
    if (!initialProducts) {
      const fetchProducts = async () => {
        try {
          const response = await fetch('/api/products');
          if (response.ok) {
            const data = await response.json();
            setProducts(data.products || []);
          }
        } catch (error) {
          console.error('Failed to fetch products:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchProducts();
    }
  }, [initialProducts]);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Get unique categories from products
  const categories = ["All", ...new Set(products.map((p) => p.category))];

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

  // Filter products by category and active status
  const filteredProducts = products.filter(
    (product) =>
      product.isActive &&
      (selectedCategory === "All" || product.category === selectedCategory)
  );

  if (isLoading) {
    return (
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-10 w-64 bg-gray-200 rounded mx-auto mb-4 animate-pulse" />
            <div className="h-4 w-96 bg-gray-200 rounded mx-auto animate-pulse" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm">
                <div className="aspect-[3/4] bg-gray-200 animate-pulse" />
                <div className="p-4">
                  <div className="h-4 w-20 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-6 w-32 bg-gray-200 rounded mb-2 animate-pulse" />
                  <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-[#FFFBF7]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-[#C9A227] text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
            Curated Collection
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif text-[#2C1810] mb-6">
            Coming Soon
          </h2>
          <p className="text-[#7A6252] max-w-xl mx-auto">
            We&apos;re preparing our exclusive collection for you. Check back soon!
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="collection" className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-[#FFFBF7]">
      {/* Background Decorations */}
      <div className="absolute top-0 right-0 w-[200px] sm:w-[300px] md:w-[500px] h-[200px] sm:h-[300px] md:h-[500px] bg-gradient-to-bl from-[#C9A227]/10 to-transparent rounded-full blur-[60px] sm:blur-[80px] md:blur-[120px]" />
      <div className="absolute bottom-0 left-0 w-[150px] sm:w-[250px] md:w-[400px] h-[150px] sm:h-[250px] md:h-[400px] bg-gradient-to-tr from-[#8B5A2B]/10 to-transparent rounded-full blur-[50px] sm:blur-[70px] md:blur-[100px]" />
      
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
          className="flex justify-start sm:justify-center gap-2 sm:gap-3 mb-6 sm:mb-8 md:mb-12 overflow-x-auto pb-2 scrollbar-hide -mx-4 sm:mx-0 px-4 sm:px-0"
        >
          {categories.map((filter, index) => (
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
          {filteredProducts.map((product, index) => (
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
