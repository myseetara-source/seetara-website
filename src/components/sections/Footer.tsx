"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Mail,
  Phone,
  MapPin,
  Heart,
  MessageCircle,
} from "lucide-react";

const footerLinks = {
  shop: [
    { name: "All Products", href: "#collection" },
    { name: "Tote Bags", href: "#" },
    { name: "Shoulder Bags", href: "#" },
    { name: "Hobo Bags", href: "#" },
    { name: "New Arrivals", href: "#" },
  ],
  company: [
    { name: "Our Story", href: "#story" },
    { name: "Craftsmanship", href: "#" },
    { name: "Sustainability", href: "#" },
    { name: "Trust & Certificates", href: "#trust" },
    { name: "Careers", href: "#" },
  ],
  support: [
    { name: "Contact Us", href: "#contact" },
    { name: "FAQs", href: "#" },
    { name: "Shipping Info", href: "#" },
    { name: "Returns & Exchange", href: "#" },
    { name: "Size Guide", href: "#" },
  ],
};

const socialLinks = [
  { 
    icon: Facebook, 
    href: "https://www.facebook.com/myseetara", 
    label: "Facebook",
    color: "hover:bg-[#1877F2]"
  },
  { 
    icon: Instagram, 
    href: "https://www.instagram.com/myseetara/", 
    label: "Instagram",
    color: "hover:bg-gradient-to-br hover:from-[#833AB4] hover:via-[#FD1D1D] hover:to-[#F77737]"
  },
  { 
    icon: MessageCircle, 
    href: "https://wa.me/+9779802359033", 
    label: "WhatsApp",
    color: "hover:bg-[#25D366]"
  },
];

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

export default function Footer() {
  return (
    <footer id="contact" className="relative bg-gradient-to-b from-[#2C1810] via-[#1F1209] to-[#0F0905] text-white overflow-hidden">
      {/* Decorative Top Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
      
      {/* Main Footer Content */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Column */}
          <motion.div 
            variants={itemVariants}
            className="col-span-2 mb-8 lg:mb-0"
          >
            <Link href="/" className="inline-block mb-6 group">
              <Image
                src="/images/logo/logo.png"
                alt="Seetara Logo"
                width={160}
                height={60}
                className="h-14 w-auto object-contain brightness-0 invert group-hover:scale-105 transition-transform duration-300"
              />
            </Link>
            <p className="text-[#B8A99A] text-sm mb-6 max-w-xs leading-relaxed">
              <span className="text-[#C9A227] font-medium">Be The Star You Are ✨</span>
              <br />
              Premium handcrafted bags born from generations of Nepali craftsmanship.
            </p>
            
            {/* Social Links with Brand Colors */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-300 group ${social.color}`}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-[#B8A99A] group-hover:text-white transition-colors" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Shop Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#C9A227] mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-[#C9A227]" />
              Shop
            </h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#B8A99A] hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#C9A227] mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-[#C9A227]" />
              Company
            </h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#B8A99A] hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Support Links */}
          <motion.div variants={itemVariants}>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#C9A227] mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-[#C9A227]" />
              Support
            </h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-[#B8A99A] hover:text-white text-sm transition-all duration-300 hover:translate-x-1 inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <h4 className="text-sm font-semibold uppercase tracking-widest text-[#C9A227] mb-5 flex items-center gap-2">
              <span className="w-6 h-px bg-[#C9A227]" />
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://maps.google.com/?q=Ranibari,Kathmandu,Nepal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 group"
                >
                  <MapPin className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span className="text-[#B8A99A] text-sm group-hover:text-white transition-colors">
                    Ranibari, Kathmandu, Nepal
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="tel:+9779802359033"
                  className="flex items-center gap-2.5 group"
                >
                  <Phone className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span className="text-[#B8A99A] hover:text-white text-sm transition-colors">
                    +977 9802359033
                  </span>
                </a>
              </li>
              <li>
                <a 
                  href="mailto:hello@seetara.com"
                  className="flex items-center gap-2.5 group"
                >
                  <Mail className="w-4 h-4 text-[#C9A227] shrink-0" />
                  <span className="text-[#B8A99A] hover:text-white text-sm transition-colors">
                    hello@seetara.com
                  </span>
                </a>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Bar */}
      <div className="border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#7A6252] text-sm text-center md:text-left"
            >
              © {new Date().getFullYear()} Seetara Global. All rights reserved.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-[#7A6252] text-sm flex items-center gap-2"
            >
              <span className="hidden sm:inline">Handcrafted with</span>
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              </motion.span>
              <span>in Nepal</span>
              <span className="text-lg">🇳🇵</span>
            </motion.p>
            
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-[#7A6252] hover:text-[#C9A227] text-sm transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-[#7A6252] hover:text-[#C9A227] text-sm transition-colors"
              >
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-0 w-96 h-96 bg-[#C9A227]/3 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-80 h-80 bg-[#8B5A2B]/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C9A227]/2 rounded-full blur-[200px] pointer-events-none" />
    </footer>
  );
}
