"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import { useRef, useEffect, useState } from "react";
import { TESTIMONIALS } from "@/lib/images";

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    role: "Marketing Executive",
    location: "Kathmandu",
    image: TESTIMONIALS.CUSTOMER_1,
    rating: 5,
    text: "The Executive Tote has become my daily companion. The quality is exceptional — after 8 months of daily use, it still looks brand new. Truly worth every rupee!",
  },
  {
    id: 2,
    name: "Anisha Gurung",
    role: "Entrepreneur",
    location: "Pokhara",
    image: TESTIMONIALS.CUSTOMER_2,
    rating: 5,
    text: "I was skeptical about ordering online, but Seetara exceeded all expectations. The bag is even more beautiful in person, and the customer service was outstanding.",
  },
  {
    id: 3,
    name: "Sunita Thapa",
    role: "Doctor",
    location: "Lalitpur",
    image: TESTIMONIALS.CUSTOMER_3,
    rating: 5,
    text: "Finally, a Nepali brand that understands what working women need. Spacious, stylish, and sturdy. I've already bought two more as gifts!",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isMobile, setIsMobile] = useState(false);

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

  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, isMobile ? -20 : -50]);
  const cardsY = useTransform(scrollYProgress, [0, 1], [isMobile ? 20 : 50, isMobile ? -10 : -30]);

  // Stagger animation variants - Simplified for mobile
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: isMobile ? 0.1 : 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: isMobile ? 30 : 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 18,
      },
    },
  };

  return (
    <section ref={sectionRef} className="relative py-16 sm:py-20 md:py-24 lg:py-32 overflow-hidden bg-[#FFFBF7]">
      {/* Animated Background - Smaller on mobile */}
      <motion.div className="absolute inset-0" style={isMobile ? {} : { y: backgroundY }}>
        <motion.div 
          className="absolute top-1/4 left-0 w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 bg-gradient-to-br from-[#C9A227]/10 to-transparent rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]"
          animate={isMobile ? {} : { scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-0 w-56 sm:w-72 md:w-[400px] h-56 sm:h-72 md:h-[400px] bg-gradient-to-tl from-[#8B5A2B]/10 to-transparent rounded-full blur-[80px] sm:blur-[100px] md:blur-[120px]"
          animate={isMobile ? {} : { scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <span className="inline-block text-[#C9A227] text-xs sm:text-sm font-medium tracking-[0.15em] sm:tracking-[0.2em] uppercase mb-2 sm:mb-4">
            Customer Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif text-[#2C1810] leading-tight mb-3 sm:mb-4 md:mb-6 px-2">
            Why Women{" "}
            <span className="text-gradient-gold">Trust</span> Seetara
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#7A6252] max-w-xl md:max-w-2xl mx-auto px-4 sm:px-0">
            Every bag we sell comes with a promise — quality you can feel, 
            craftsmanship you can see.
          </p>
        </motion.div>

        {/* Testimonials Grid - Horizontal scroll on mobile */}
        <motion.div 
          className="flex md:grid md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-4 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0"
          style={isMobile ? {} : { y: cardsY }}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-30px" }}
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              className="group flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center"
            >
              <motion.div 
                className="relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 md:p-8 shadow-sm h-full flex flex-col"
                whileTap={isMobile ? { scale: 0.98 } : {}}
                whileHover={isMobile ? {} : { 
                  y: -10, 
                  boxShadow: "0 25px 50px -12px rgba(93, 58, 26, 0.18)",
                }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Quote Icon - Smaller on mobile */}
                <motion.div 
                  className="absolute -top-3 sm:-top-4 right-6 sm:right-8 w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#C9A227] to-[#9A7B1A] rounded-lg sm:rounded-xl flex items-center justify-center shadow-md"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1, type: "spring" }}
                >
                  <Quote className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </motion.div>

                {/* Stars Rating - Simplified animation on mobile */}
                <div className="flex gap-0.5 sm:gap-1 mb-3 sm:mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A227] fill-[#C9A227]" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-sm sm:text-base text-[#5D3A1A] leading-relaxed flex-1 mb-4 sm:mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author */}
                <div className="flex items-center gap-3 sm:gap-4 pt-3 sm:pt-4 border-t border-[#E8DDD4]">
                  <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden bg-[#F5EDE6]">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base text-[#2C1810]">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#7A6252]">
                      {testimonial.role} • {testimonial.location}
                    </p>
                  </div>
                </div>

                {/* Bottom Accent - Simplified */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 bg-gradient-to-r from-[#8B5A2B] via-[#C9A227] to-[#8B5A2B] rounded-b-2xl sm:rounded-b-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator for mobile */}
        <div className="flex md:hidden justify-center mt-4 gap-1.5">
          {testimonials.map((_, index) => (
            <div key={index} className="w-2 h-2 rounded-full bg-[#E8DDD4]" />
          ))}
        </div>

        {/* Trust Indicators - Mobile optimized */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 sm:mt-12 md:mt-16 flex justify-center items-center gap-6 sm:gap-10 md:gap-16"
        >
          {[
            { value: "100%", label: "Handcrafted" },
            { value: "Made in", label: "Nepal" },
            { value: "Quality", label: "Assured" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="text-center"
            >
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif text-[#8B5A2B] font-semibold">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs md:text-sm text-[#7A6252] tracking-wide uppercase mt-0.5 sm:mt-1">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

