"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Heart, Leaf, Award, Users } from "lucide-react";
import { ABOUT } from "@/lib/images";

const values = [
  {
    icon: Heart,
    title: "Crafted with Love",
    description: "Every stitch carries the passion of artisans who pour their hearts into each creation.",
  },
  {
    icon: Leaf,
    title: "Sustainable Practices",
    description: "Ethically sourced materials and eco-conscious production honor both craft and nature.",
  },
  {
    icon: Award,
    title: "Uncompromising Quality",
    description: "Premium materials and rigorous standards ensure bags that age beautifully over time.",
  },
  {
    icon: Users,
    title: "Community First",
    description: "Supporting local artisans and preserving generations of Nepali craftsmanship tradition.",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Reduced parallax on mobile for better performance
  const imageY = useTransform(scrollYProgress, [0, 1], [isMobile ? 20 : 50, isMobile ? -20 : -50]);
  const floatingY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -30 : -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1, 0.98]);

  // Animation variants for values cards
  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -15 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    }),
  };

  return (
    <section id="story" ref={containerRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden">
      {/* Animated Background */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-b from-[#FFFBF7] via-[#F5EDE6]/30 to-[#FFFBF7]" 
        style={isMobile ? {} : { scale }}
      />
      <div className="absolute top-0 left-0 w-full h-20 sm:h-32 bg-gradient-to-b from-white to-transparent" />
      
      {/* Floating Background Elements - Smaller on mobile */}
      <motion.div
        style={isMobile ? {} : { y: floatingY }}
        className="absolute top-1/4 right-5 sm:right-10 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full bg-gradient-to-br from-[#C9A227]/10 to-transparent blur-2xl sm:blur-3xl"
      />
      <motion.div
        className="absolute bottom-1/4 left-5 sm:left-10 w-24 sm:w-36 md:w-48 h-24 sm:h-36 md:h-48 rounded-full bg-gradient-to-tr from-[#8B5A2B]/10 to-transparent blur-2xl sm:blur-3xl"
        animate={isMobile ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-14 md:mb-20"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block text-[#C9A227] text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4"
          >
            Our Story
          </motion.span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#2C1810] leading-tight mb-3 sm:mb-4 md:mb-6 px-2">
            The Art of{" "}
            <span className="text-gradient-gold">Seetara</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#7A6252] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-0">
            From the heart of Nepal to your hands — a journey of passion, 
            tradition, and timeless elegance.
          </p>
        </motion.div>

        {/* Main Story Content */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 xl:gap-24 items-center mb-16 sm:mb-24 md:mb-32">
          {/* Image Stack */}
          <motion.div
            ref={imageRef}
            style={isMobile ? {} : { y: imageY }}
            className="relative mx-auto w-full max-w-md sm:max-w-lg lg:max-w-none"
          >
            <motion.div
              initial={{ opacity: 0, x: isMobile ? 0 : -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              {/* Main Image */}
              <motion.div 
                className="relative aspect-[4/5] rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg sm:shadow-luxury z-10 group"
                whileTap={isMobile ? { scale: 0.98 } : {}}
                whileHover={isMobile ? {} : { scale: 1.02 }}
                transition={{ duration: 0.4 }}
              >
                <Image
                  src={ABOUT.CRAFTSMANSHIP}
                  alt="Seetara Craftsmanship"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority
                />
                
                {/* Shine effect on hover - Desktop only */}
                {!isMobile && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                  />
                )}
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/50 via-transparent to-transparent" />
                
                {/* Caption - Hidden on mobile */}
                <motion.div
                  className="hidden sm:block absolute bottom-4 left-4 right-4 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Traditional craftsmanship in action
                </motion.div>
              </motion.div>

              {/* Floating Image - Repositioned for mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 lg:-bottom-8 lg:-right-8 w-24 h-24 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-xl sm:rounded-2xl overflow-hidden shadow-lg sm:shadow-luxury z-20 border-2 sm:border-4 border-white"
              >
                <Image
                  src={ABOUT.DETAIL}
                  alt="Bag Detail"
                  fill
                  className="object-cover"
                />
              </motion.div>

              {/* Decorative Elements - Hidden on mobile */}
              <motion.div 
                className="hidden sm:block absolute -top-4 -left-4 lg:-top-6 lg:-left-6 w-16 lg:w-24 h-16 lg:h-24 border-2 border-[#C9A227]/40 rounded-full"
                animate={isMobile ? {} : { rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div 
                className="hidden sm:block absolute -bottom-2 left-8 lg:-bottom-4 lg:left-12 w-12 lg:w-16 h-12 lg:h-16 bg-[#C9A227]/30 rounded-full blur-lg lg:blur-xl"
                animate={isMobile ? {} : { scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Floating dots - Hidden on mobile */}
              <motion.div
                className="hidden lg:flex absolute top-1/2 -left-12 flex-col gap-3"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-[#C9A227]"
                    animate={{ x: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Story Text - Mobile optimized */}
          <motion.div
            initial={{ opacity: 0, y: isMobile ? 20 : 0, x: isMobile ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 sm:space-y-6 md:space-y-8"
          >
            <div className="space-y-4 sm:space-y-5 md:space-y-6">
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-sm sm:text-base md:text-lg leading-relaxed text-[#5D3A1A]"
              >
                <span className="text-3xl sm:text-4xl md:text-5xl font-serif text-[#8B5A2B] float-left mr-2 sm:mr-3 md:mr-4 mt-1 leading-none">
                  S
                </span>
                eetara was born from a vision — to bring the rich tradition of 
                Nepali leatherwork to discerning women around the world. The name 
                &ldquo;Seetara,&rdquo; inspired by the stars that guide travelers through the 
                Himalayan nights, reflects our commitment to being a beacon of 
                quality and elegance.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="text-[#7A6252] leading-relaxed"
              >
                Our journey began in the bustling streets of Kathmandu, where 
                generations of master craftsmen have honed their skills, passing 
                down secrets of leather artistry from father to son, mother to 
                daughter.
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-[#7A6252] leading-relaxed"
              >
                Today, we partner with these artisan communities, ensuring fair 
                wages and preserving traditional techniques while creating 
                contemporary designs that speak to the modern woman&apos;s lifestyle.
              </motion.p>
            </div>

            {/* Quote - Mobile optimized */}
            <motion.blockquote
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative pl-4 sm:pl-6 border-l-2 sm:border-l-4 border-[#C9A227]"
            >
              <p className="text-base sm:text-lg md:text-xl font-serif italic text-[#5D3A1A]">
                &ldquo;A bag is not just an accessory — it&apos;s a companion that carries 
                your dreams, your stories, your life.&rdquo;
              </p>
              <cite className="block mt-2 sm:mt-3 text-xs sm:text-sm text-[#7A6252] not-italic">
                — The Seetara Philosophy
              </cite>
            </motion.blockquote>

            {/* CTA - Mobile optimized */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="#collection"
                className="inline-flex items-center gap-2 text-[#8B5A2B] font-medium hover:text-[#5D3A1A] transition-colors group text-sm sm:text-base"
              >
                <span>Explore Our Collection</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Values Grid - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-30px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8"
        >
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              custom={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              whileTap={isMobile ? { scale: 0.98 } : {}}
              whileHover={isMobile ? {} : { 
                y: -8, 
                boxShadow: "0 20px 40px -10px rgba(93, 58, 26, 0.2)",
              }}
              className="group relative p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl bg-white active:bg-[#F5EDE6] transition-all duration-300 shadow-sm"
            >
              {/* Icon Container */}
              <motion.div 
                className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-[#F5EDE6] to-[#E8DDD4] flex items-center justify-center mb-3 sm:mb-4 md:mb-6 transition-all duration-300"
              >
                <value.icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-[#8B5A2B]" />
              </motion.div>

              {/* Content */}
              <h3 className="text-sm sm:text-base md:text-lg lg:text-xl font-serif text-[#2C1810] mb-1 sm:mb-2 md:mb-3">
                {value.title}
              </h3>
              <p className="text-[#7A6252] text-xs sm:text-sm leading-relaxed line-clamp-3 sm:line-clamp-none">
                {value.description}
              </p>

              {/* Bottom Accent - Simplified on mobile */}
              <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#C9A227] to-[#8B5A2B] rounded-b-xl sm:rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

