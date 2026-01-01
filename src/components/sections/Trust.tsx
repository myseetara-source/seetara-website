"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Shield, FileCheck, BadgeCheck, CheckCircle2, Award } from "lucide-react";
import { CERTIFICATES } from "@/lib/images";

const certificates = [
  {
    id: 1,
    title: "Company Registration",
    subtitle: "Private Firm Registration Certificate",
    description: "Officially registered under the Government of Bagmati Pradesh, Nepal",
    icon: FileCheck,
    image: CERTIFICATES.REGISTRATION,
    highlights: ["Seetara Global", "Registered 2021", "Kathmandu, Nepal"],
  },
  {
    id: 2,
    title: "PAN Certificate",
    subtitle: "Permanent Account Number Registration",
    description: "Tax compliant and transparent business operations",
    icon: Shield,
    image: CERTIFICATES.PAN,
    highlights: ["PAN: 123106690", "Verified Business", "Tax Compliant"],
  },
];

const trustBadges = [
  { icon: BadgeCheck, label: "Verified Business" },
  { icon: Shield, label: "Secure Payments" },
  { icon: CheckCircle2, label: "Quality Guaranteed" },
  { icon: Award, label: "Authentic Products" },
];

export default function Trust() {
  return (
    <section id="trust" className="relative py-24 md:py-32 overflow-hidden bg-[#F5EDE6]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="trust-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 L10 0 L20 10 L10 20 Z" fill="none" stroke="#8B5A2B" strokeWidth="0.2"/>
          </pattern>
          <rect width="100" height="100" fill="url(#trust-pattern)" />
        </svg>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-[#E8DDD4] mb-6"
          >
            <Shield className="w-4 h-4 text-[#C9A227]" />
            <span className="text-sm font-medium text-[#5D3A1A]">
              Verified & Trusted
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#2C1810] leading-tight mb-6">
            Built on{" "}
            <span className="text-gradient-gold">Trust</span>
          </h2>
          <p className="text-lg text-[#7A6252] max-w-2xl mx-auto">
            We believe in complete transparency. Here are our official registrations 
            and certifications that make Seetara a brand you can trust.
          </p>
        </motion.div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4 md:gap-6 mb-16"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm"
            >
              <badge.icon className="w-4 h-4 text-[#C9A227]" />
              <span className="text-sm font-medium text-[#5D3A1A]">{badge.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Certificates Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="group"
            >
              <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-luxury transition-all duration-500">
                {/* Certificate Image */}
                <div className="relative aspect-[3/4] overflow-hidden bg-[#F5EDE6]">
                  <Image
                    src={cert.image}
                    alt={cert.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-[#2C1810]/0 group-hover:bg-[#2C1810]/40 transition-all duration-500 flex items-center justify-center">
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileHover={{ scale: 1.05 }}
                      className="opacity-0 group-hover:opacity-100 px-6 py-3 bg-white rounded-full text-sm font-medium text-[#2C1810] transition-opacity duration-300"
                    >
                      View Document
                    </motion.button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-serif text-[#2C1810] mb-1">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-[#C9A227] font-medium mb-3">
                    {cert.subtitle}
                  </p>
                  <p className="text-[#7A6252] text-sm mb-4">
                    {cert.description}
                  </p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2">
                    {cert.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="px-3 py-1 bg-[#F5EDE6] rounded-full text-xs text-[#5D3A1A] font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="inline-block max-w-3xl mx-auto p-8 md:p-10 rounded-3xl bg-white shadow-sm">
            <div className="flex justify-center mb-6">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full bg-[#F5EDE6] border-2 border-white flex items-center justify-center"
                  >
                    <span className="text-xs">⭐</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="text-lg font-serif text-[#2C1810] mb-4">
              &ldquo;As a government-registered business, we stand behind every product 
              we create. Our commitment to transparency isn&apos;t just policy — it&apos;s 
              our promise to you.&rdquo;
            </p>
            <p className="text-sm text-[#7A6252]">
              Seetara Global — Registered in Kathmandu, Nepal
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

