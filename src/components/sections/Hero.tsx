"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect, useState } from "react";

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Reduce parallax effects on mobile for better performance
  const y = useTransform(scrollYProgress, [0, 1], [0, isMobile ? 50 : 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -30 : -100]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, isMobile ? 0 : 10]);

  return (
    <motion.section 
      ref={containerRef}
      style={{ opacity }}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-warm"
    >
      {/* Animated Background Gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-[#FFFBF7] via-[#F5EDE6] to-[#FFFBF7] animate-gradient"
        style={{ backgroundSize: '400% 400%' }}
      />

      {/* Background Pattern with Parallax */}
      <motion.div 
        className="absolute inset-0 opacity-[0.03]"
        style={{ y }}
      >
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8B5A2B" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#grid)" />
        </svg>
      </motion.div>

      {/* Floating Orbs - Simplified on mobile */}
      <motion.div
        className="absolute top-1/4 left-[5%] md:left-[10%] w-20 md:w-32 h-20 md:h-32 rounded-full bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 blur-2xl md:blur-3xl"
        animate={isMobile ? { opacity: [0.3, 0.5, 0.3] } : {
          y: [0, -40, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-[5%] md:right-[15%] w-24 md:w-40 h-24 md:h-40 rounded-full bg-gradient-to-tr from-[#8B5A2B]/15 to-[#8B5A2B]/5 blur-2xl md:blur-3xl"
        animate={isMobile ? { opacity: [0.3, 0.5, 0.3] } : {
          y: [0, 40, 0],
          x: [0, -30, 0],
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Hide third orb on mobile */}
      <motion.div
        className="hidden md:block absolute top-1/2 left-1/3 w-24 h-24 rounded-full bg-gradient-to-bl from-[#E8DDD4]/30 to-transparent blur-2xl"
        animate={{
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 md:py-32 lg:py-40">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center lg:text-left order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#F5EDE6] border border-[#E8DDD4] mb-4 sm:mb-6 md:mb-8"
            >
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A227]" />
              <span className="text-xs sm:text-sm font-medium text-[#5D3A1A] tracking-wide">
                Handcrafted in Nepal
              </span>
            </motion.div>

            {/* Headline - Responsive sizes */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-serif text-[#2C1810] leading-[1.15] sm:leading-[1.1] mb-4 sm:mb-6"
            >
              Where{" "}
              <span className="relative inline-block">
                <span className="text-gradient-gold">Heritage</span>
                <motion.svg
                  className="absolute -bottom-1 sm:-bottom-2 left-0 w-full"
                  viewBox="0 0 200 12"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.8, duration: 0.8 }}
                >
                  <path
                    d="M0 6 Q50 12 100 6 T200 6"
                    fill="none"
                    stroke="#C9A227"
                    strokeWidth="2"
                  />
                </motion.svg>
              </span>{" "}
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              Meets Elegance
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm sm:text-base md:text-lg lg:text-xl text-[#7A6252] max-w-xl mb-6 sm:mb-8 md:mb-10 leading-relaxed mx-auto lg:mx-0 px-2 sm:px-0"
            >
              Discover exquisite handcrafted bags born from generations of Nepali 
              craftsmanship. Each piece tells a story of dedication and elegance.
            </motion.p>

            {/* CTAs - Stack on mobile, row on larger */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start px-4 sm:px-0"
            >
              <motion.a
                href="#collection"
                whileTap={{ scale: 0.97 }}
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-gradient-leather text-white rounded-full font-medium overflow-hidden shadow-luxury text-sm sm:text-base active:scale-95 transition-transform"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Explore Collection
                  <span className="inline-block">→</span>
                </span>
                <div className="absolute inset-0 bg-[#5D3A1A] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </motion.a>
              <motion.a
                href="#story"
                whileTap={{ scale: 0.97 }}
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#8B5A2B] text-[#8B5A2B] rounded-full font-medium hover:bg-[#8B5A2B] hover:text-white transition-all duration-300 text-sm sm:text-base active:bg-[#8B5A2B] active:text-white"
              >
                Our Story
              </motion.a>
            </motion.div>

            {/* Stats - Compact on mobile */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-6 sm:gap-8 md:gap-12 mt-8 sm:mt-12 md:mt-16 justify-center lg:justify-start"
            >
              {[
                { value: "100%", label: "Handcrafted" },
                { value: "Made in", label: "Nepal" },
                { value: "Quality", label: "Assured" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-serif text-[#8B5A2B] font-semibold">
                    {stat.value}
                  </div>
                  <div className="text-[10px] sm:text-xs text-[#7A6252] tracking-wide uppercase mt-0.5 sm:mt-1">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Image - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={isMobile ? {} : { y: imageY }}
            className="relative order-1 lg:order-2 mx-auto w-full max-w-[280px] sm:max-w-[350px] md:max-w-[400px] lg:max-w-none"
          >
            {/* Main Image Container */}
            <motion.div 
              className="relative z-10"
              style={isMobile ? {} : { rotateX }}
            >
              <motion.div
                className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl lg:rounded-[2rem] overflow-hidden shadow-luxury group"
                whileTap={isMobile ? { scale: 0.98 } : {}}
                whileHover={isMobile ? {} : { scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <Image
                  src="/images/hero-bag.jpg"
                  alt="Seetara Premium Leather Bag"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                
                {/* Shine Effect - Desktop only */}
                <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/40 via-transparent to-transparent" />
              </motion.div>

              {/* Floating Card - Mobile repositioned */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
                className="absolute left-2 sm:left-4 lg:-left-6 bottom-4 sm:bottom-8 lg:bottom-16 bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 shadow-lg sm:shadow-luxury border border-[#E8DDD4]/50"
              >
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-to-br from-[#F5EDE6] to-[#E8DDD4] flex items-center justify-center">
                    <span className="text-base sm:text-lg lg:text-xl">🏆</span>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-[#2C1810]">Certified Quality</p>
                    <p className="text-[10px] sm:text-xs text-[#7A6252]">Handcrafted in Nepal</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Badge Top Right - Mobile sized */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, type: "spring", stiffness: 200 }}
                className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 lg:-top-4 lg:-right-4 w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 bg-gradient-to-br from-[#C9A227] to-[#9A7B1A] rounded-full flex items-center justify-center shadow-gold z-20"
              >
                <div className="text-center text-white">
                  <span className="text-[10px] sm:text-xs font-bold block">Made</span>
                  <span className="text-[8px] sm:text-[10px]">in Nepal</span>
                </div>
              </motion.div>
            </motion.div>

            {/* Background Shapes - Hidden on small mobile */}
            <motion.div
              className="hidden sm:block absolute -top-4 -right-4 lg:-top-8 lg:-right-8 w-full h-full rounded-2xl lg:rounded-[2rem] border-2 border-[#C9A227]/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            />
            <motion.div
              className="hidden sm:block absolute top-4 left-4 lg:top-8 lg:left-8 w-full h-full rounded-2xl lg:rounded-[2rem] bg-gradient-to-br from-[#C9A227]/10 to-[#8B5A2B]/5"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
            
            {/* Decorative Dots - Desktop only */}
            <motion.div
              className="hidden lg:flex absolute -bottom-12 right-12 gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 rounded-full bg-[#C9A227]"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
                />
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        style={{ opacity }}
        className="hidden sm:block absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.a
          href="#collection"
          className="flex flex-col items-center gap-2 cursor-pointer group"
        >
          <span className="text-[10px] sm:text-xs text-[#7A6252] tracking-widest uppercase group-hover:text-[#8B5A2B] transition-colors">
            Scroll to Explore
          </span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-[#8B5A2B]/50 flex items-start justify-center p-1"
          >
            <motion.div
              animate={{ y: [0, 10, 0], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 h-2.5 sm:w-1.5 sm:h-3 rounded-full bg-[#8B5A2B]"
            />
          </motion.div>
        </motion.a>
      </motion.div>
    </motion.section>
  );
}

