"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import Image from "next/image";
import { Quote, CheckCircle2 } from "lucide-react";
import { useRef } from "react";

export default function Founder() {
  const sectionRef = useRef<HTMLElement>(null);
  const letterRef = useRef(null);
  const isLetterInView = useInView(letterRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const quoteY = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [0.9, 1]);
  const contentX = useTransform(scrollYProgress, [0, 0.3], [50, 0]);

  // Text reveal animation variants
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  return (
    <section ref={sectionRef} className="relative py-24 md:py-32 overflow-hidden bg-[#FFFBF7]">
      {/* Animated Large Quote Icon Background */}
      <motion.div 
        style={{ y: quoteY }}
        className="absolute top-20 left-10 opacity-[0.03]"
      >
        <motion.div
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <Quote className="w-80 h-80 text-[#8B5A2B]" strokeWidth={1} />
        </motion.div>
      </motion.div>
      <motion.div 
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 right-10 opacity-[0.03] rotate-180"
      >
        <Quote className="w-64 h-64 text-[#8B5A2B]" strokeWidth={1} />
      </motion.div>

      {/* Subtle Paper Texture Background */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <filter id="paper-texture">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5" />
            <feDiffuseLighting in="noise" lightingColor="#8B5A2B" surfaceScale="2">
              <feDistantLight azimuth="45" elevation="60" />
            </feDiffuseLighting>
          </filter>
          <rect width="100%" height="100%" filter="url(#paper-texture)" />
        </svg>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block text-[#C9A227] text-sm font-medium tracking-[0.2em] uppercase">
            A Letter From The Co-Founder
          </span>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
          {/* Left: Image Column with Enhanced Animations */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ scale: imageScale }}
            className="lg:col-span-2"
          >
            <div className="sticky top-32">
              {/* Main Image - Founder at Work */}
              <motion.div
                whileHover={{ scale: 1.03, rotateY: 5 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-luxury group perspective-1000"
              >
                <motion.div
                  className="absolute inset-0"
                  initial={{ scale: 1.1 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.5 }}
                >
                  <Image
                    src="/images/founder-working.jpg"
                    alt="Dhiraj Thakur inspecting bag quality"
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                  />
                </motion.div>
                
                {/* Shine Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#2C1810]/70 via-[#2C1810]/20 to-transparent" />
                
                {/* Caption with Animation */}
                <motion.div 
                  className="absolute bottom-0 left-0 right-0 p-5"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-white/90 text-sm italic">
                    "Every stitch tells a story. Every bag carries a promise."
                  </p>
                </motion.div>
              </motion.div>

              {/* Secondary Image - With Artisans */}
              <motion.div
                initial={{ opacity: 0, y: 30, rotate: -5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg mt-4 border-4 border-white cursor-pointer"
              >
                <Image
                  src="/images/founder-artisans.jpg"
                  alt="Dhiraj working with local artisans"
                  fill
                  className="object-cover object-[center_30%]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-[#C9A227]/0 hover:bg-[#C9A227]/10 transition-colors duration-300" />
              </motion.div>

              {/* Quality Badge with Pulse */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring" }}
                whileHover={{ scale: 1.02 }}
                className="mt-6 p-4 bg-white rounded-xl shadow-sm border border-[#E8DDD4] cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <motion.div 
                    className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A227]/20 to-[#C9A227]/5 flex items-center justify-center"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#C9A227]" />
                  </motion.div>
                  <div>
                    <p className="text-sm font-medium text-[#2C1810]">
                      100% Quality Checked
                    </p>
                    <p className="text-xs text-[#7A6252]">
                      Every bag personally approved
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Letter Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3"
          >
            {/* Letter Container - Paper Style */}
            <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-luxury border border-[#E8DDD4]/50">
              {/* Decorative Corner */}
              <div className="absolute top-0 right-0 w-20 h-20">
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#C9A227]/30 rounded-tr-xl" />
              </div>
              <div className="absolute bottom-0 left-0 w-20 h-20">
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#C9A227]/30 rounded-bl-xl" />
              </div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2C1810] leading-tight mb-8"
              >
                Not Just a Bag,
                <br />
                <span className="text-gradient-gold">But a Promise.</span>
              </motion.h2>

              {/* The Story */}
              <div className="space-y-6 text-[#5D3A1A] leading-relaxed">
                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-lg"
                >
                  When I started Seetara, many people told me,{" "}
                  <span className="italic text-[#7A6252]">
                    &ldquo;Dhiraj, you can&apos;t create a world-class luxury brand here. 
                    The finishing won&apos;t be right.&rdquo;
                  </span>
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-lg font-medium"
                >
                  Hearing that hurt. But it also{" "}
                  <span className="text-[#C9A227] font-semibold">lit a fire inside me.</span>
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  I didn&apos;t start Seetara just to sell bags. I started it to prove a point.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="py-6 border-l-4 border-[#C9A227] pl-6 bg-[#F5EDE6]/50 rounded-r-xl -ml-2"
                >
                  <p className="text-[#2C1810]">
                    For the first year, I personally rejected{" "}
                    <span className="font-semibold text-[#8B5A2B]">hundreds of samples</span>. 
                    I argued with suppliers over a{" "}
                    <span className="font-semibold text-[#8B5A2B]">single millimeter of stitching</span>. 
                    I spent sleepless nights worrying if &ldquo;refusing to compromise on quality&rdquo; 
                    would bankrupt me before we even started.
                  </p>
                </motion.div>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-lg"
                >
                  But I refused to cut corners.{" "}
                  <span className="font-medium">Why?</span>
                </motion.p>

                <motion.p
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.6 }}
                  className="text-xl font-serif text-[#8B5A2B]"
                >
                  Because I believe Nepali craftsmanship deserves to be on the global stage.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                  className="pt-4"
                >
                  <p className="text-lg leading-relaxed">
                    When you buy a Seetara bag, you aren&apos;t just buying leather.{" "}
                    <span className="font-semibold text-[#2C1810]">
                      You are holding my sleepless nights, my persistence, and my guarantee.
                    </span>
                  </p>
                </motion.div>

                {/* The Promise */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.8 }}
                  className="mt-8 p-6 bg-gradient-to-r from-[#2C1810] to-[#5D3A1A] rounded-2xl text-white"
                >
                  <p className="text-lg md:text-xl font-serif leading-relaxed">
                    &ldquo;If it&apos;s not perfect, it doesn&apos;t leave my warehouse.{" "}
                    <span className="text-[#C9A227]">This is my personal promise to you.</span>&rdquo;
                  </p>
                </motion.div>

                {/* Signature Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.9 }}
                  className="pt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6"
                >
                  <div>
                    {/* Digital Signature */}
                    <div className="relative h-16 w-48 mb-3">
                      <Image
                        src="/images/signature.png"
                        alt="Dhiraj Thakur Signature"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                    <p className="font-serif text-xl text-[#2C1810]">Dhiraj Thakur</p>
                    <p className="text-sm text-[#7A6252]">Co-Founder, Seetara Global</p>
                  </div>

                  {/* Stats */}
                  <div className="flex gap-6">
                    {[
                      { value: "100+", label: "Samples Rejected" },
                      { value: "0", label: "Quality Shortcuts" },
                    ].map((stat) => (
                      <div key={stat.label} className="text-center">
                        <div className="text-2xl font-serif text-[#8B5A2B] font-semibold">
                          {stat.value}
                        </div>
                        <div className="text-xs text-[#7A6252] uppercase tracking-wide">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Trust Reinforcement */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1 }}
              className="mt-8 grid grid-cols-3 gap-4"
            >
              {[
                { icon: "🔍", text: "Personally Inspected" },
                { icon: "✨", text: "Premium Materials Only" },
                { icon: "🇳🇵", text: "Proudly Nepali" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex flex-col items-center text-center p-4 bg-white rounded-xl shadow-sm border border-[#E8DDD4]"
                >
                  <span className="text-2xl mb-2">{item.icon}</span>
                  <span className="text-xs text-[#5D3A1A] font-medium">{item.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
