"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import Image from "next/image";
import { Play, Pause, Star, Quote, ChevronLeft, ChevronRight, CheckCircle, Users } from "lucide-react";

interface VideoReview {
  id: string;
  customerName: string;
  location: string;
  avatar: string;
  videoUrl: string;
  thumbnail: string;
  rating: number;
  reviewText: string;
  productName: string;
  verified: boolean;
}

const videoReviews: VideoReview[] = [
  {
    id: "r1",
    customerName: "Priya Sharma",
    location: "Kathmandu",
    avatar: "/images/testimonials/customer-1.jpg",
    videoUrl: "/videos/review-1.mp4",
    thumbnail: "/images/testimonials/customer-1.jpg",
    rating: 5,
    reviewText: "The quality is absolutely amazing! I've been using this bag for 6 months and it still looks brand new.",
    productName: "Executive Tote",
    verified: true,
  },
  {
    id: "r2",
    customerName: "Anisha Thapa",
    location: "Pokhara",
    avatar: "/images/testimonials/customer-2.jpg",
    videoUrl: "/videos/review-2.mp4",
    thumbnail: "/images/testimonials/customer-2.jpg",
    rating: 5,
    reviewText: "Best investment I've made! The leather smell is divine and the craftsmanship is unmatched.",
    productName: "Cognac Classic",
    verified: true,
  },
  {
    id: "r3",
    customerName: "Sita Gurung",
    location: "Lalitpur",
    avatar: "/images/testimonials/customer-3.jpg",
    videoUrl: "/videos/review-3.mp4",
    thumbnail: "/images/testimonials/customer-3.jpg",
    rating: 5,
    reviewText: "I get so many compliments every time I carry this bag. Worth every rupee!",
    productName: "Chain Shoulder Bag",
    verified: true,
  },
];

function ReviewCard({ review, isActive }: { review: VideoReview; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      className="relative bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-luxury flex-shrink-0 w-[300px] sm:w-[350px] snap-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      {/* Video Section */}
      <div className="relative aspect-[4/3] bg-[#F5EDE6] overflow-hidden">
        <Image
          src={review.thumbnail}
          alt={review.customerName}
          fill
          className={`object-cover transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
        />
        
        <video
          ref={videoRef}
          src={review.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          poster={review.thumbnail}
        />

        {/* Play Button Overlay */}
        <motion.button
          onClick={togglePlay}
          className="absolute inset-0 flex items-center justify-center bg-black/20"
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {!isPlaying ? (
              <motion.div
                key="play"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              >
                <Play className="w-6 h-6 sm:w-7 sm:h-7 text-[#2C1810] fill-[#2C1810] ml-1" />
              </motion.div>
            ) : (
              <motion.div
                key="pause"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg"
              >
                <Pause className="w-6 h-6 sm:w-7 sm:h-7 text-[#2C1810]" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>

        {/* Verified Badge */}
        {review.verified && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
            <CheckCircle className="w-3 h-3" />
            Verified Purchase
          </div>
        )}

        {/* Product Tag */}
        <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm text-[#5D3A1A] text-xs font-medium rounded-full">
          {review.productName}
        </div>
      </div>

      {/* Review Content */}
      <div className="p-4 sm:p-5">
        {/* Stars */}
        <div className="flex gap-1 mb-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < review.rating ? "text-[#C9A227] fill-[#C9A227]" : "text-[#E8DDD4]"
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <div className="relative mb-4">
          <Quote className="absolute -top-1 -left-1 w-6 h-6 text-[#C9A227]/20" />
          <p className="text-sm text-[#5D3A1A] leading-relaxed pl-4 line-clamp-3">
            {review.reviewText}
          </p>
        </div>

        {/* Customer Info */}
        <div className="flex items-center gap-3 pt-3 border-t border-[#E8DDD4]">
          <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#F5EDE6]">
            <Image
              src={review.avatar}
              alt={review.customerName}
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-medium text-sm text-[#2C1810]">{review.customerName}</p>
            <p className="text-xs text-[#7A6252]">{review.location}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LivePlayReviews() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollTo = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 370;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = 370;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, videoReviews.length - 1));
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-[#FFFBF7] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[#C9A227] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-3">
            🎬 Real Stories
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-[#2C1810] leading-tight mb-4">
            Live Play <span className="text-gradient-gold">Reviews</span>
          </h2>
          <p className="text-sm sm:text-base text-[#7A6252] max-w-xl mx-auto mb-6">
            Watch real customers share their Seetara experience
          </p>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-[#C9A227]/10 to-[#8B5A2B]/10 rounded-full border border-[#C9A227]/20"
          >
            <div className="flex -space-x-2">
              {videoReviews.slice(0, 3).map((review, i) => (
                <div
                  key={i}
                  className="relative w-8 h-8 rounded-full border-2 border-white overflow-hidden"
                >
                  <Image src={review.avatar} alt="" fill className="object-cover" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Users className="w-4 h-4 text-[#C9A227]" />
              <span className="text-[#5D3A1A] font-medium">
                Nepal&apos;s most trusted bag brand
              </span>
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-4 text-[#C9A227] font-medium text-sm"
          >
            ⭐ 250+ Glowing Genuine Customer Reviews
          </motion.p>
        </motion.div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={() => scrollTo("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-[#5D3A1A] hover:bg-[#F5EDE6] transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollTo("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white shadow-lg items-center justify-center text-[#5D3A1A] hover:bg-[#F5EDE6] transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Reviews Cards */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center"
          >
            {videoReviews.map((review, index) => (
              <ReviewCard
                key={review.id}
                review={review}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          {/* Dots Indicator - Mobile */}
          <div className="flex justify-center gap-2 mt-6 md:hidden">
            {videoReviews.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * 320,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-[#C9A227] w-6"
                    : "bg-[#E8DDD4] hover:bg-[#C9A227]/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10 sm:mt-14"
        >
          <a
            href="#collection"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-[#8B5A2B] to-[#5D3A1A] text-white rounded-full font-medium shadow-luxury hover:shadow-xl transition-all text-sm sm:text-base"
          >
            Join 250+ Happy Customers
            <span>→</span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}

