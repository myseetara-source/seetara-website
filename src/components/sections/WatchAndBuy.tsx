"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Play, Pause, Volume2, VolumeX, ShoppingBag, Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

interface VideoProduct {
  id: string;
  videoUrl: string;
  thumbnail: string;
  productName: string;
  price: number;
  originalPrice?: number;
  productImage: string;
  description: string;
}

// Sample video products - replace with actual video URLs
const videoProducts: VideoProduct[] = [
  {
    id: "v1",
    videoUrl: "/videos/bag-reel-1.mp4",
    thumbnail: "/images/products/tote-black.jpg",
    productName: "Executive Tote",
    price: 1800,
    originalPrice: 2200,
    productImage: "/images/products/tote-black.jpg",
    description: "Professional elegance meets functionality",
  },
  {
    id: "v2",
    videoUrl: "/videos/bag-reel-2.mp4",
    thumbnail: "/images/products/tote-cognac.jpg",
    productName: "Cognac Classic",
    price: 2500,
    productImage: "/images/products/tote-cognac.jpg",
    description: "Timeless cognac leather beauty",
  },
  {
    id: "v3",
    videoUrl: "/videos/bag-reel-3.mp4",
    thumbnail: "/images/products/shoulder-black.jpg",
    productName: "Chain Shoulder Bag",
    price: 1500,
    productImage: "/images/products/shoulder-black.jpg",
    description: "Elegant evening companion",
  },
  {
    id: "v4",
    videoUrl: "/videos/bag-reel-4.mp4",
    thumbnail: "/images/products/hobo-brown.jpg",
    productName: "Coffee Brown Hobo",
    price: 1700,
    productImage: "/images/products/hobo-brown.jpg",
    description: "Spacious & stylish hobo bag",
  },
];

function VideoCard({ video, isActive }: { video: VideoProduct; isActive: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [showOverlay, setShowOverlay] = useState(true);
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-NP", {
      style: "currency",
      currency: "NPR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  useEffect(() => {
    if (videoRef.current) {
      if (isActive && isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive, isPlaying]);

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

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: video.id,
      name: video.productName,
      price: video.price,
      description: video.description,
      image: video.productImage,
      category: "Bags",
      colors: ["#1a1a1a"],
      sizes: [],
      rating: 4.8,
      reviews: 100,
      isActive: true,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  const toggleWishlist = () => {
    const product = {
      id: video.id,
      name: video.productName,
      price: video.price,
      description: video.description,
      image: video.productImage,
      category: "Bags",
      colors: ["#1a1a1a"],
      sizes: [],
      rating: 4.8,
      reviews: 100,
      isActive: true,
      isFeatured: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (isInWishlist(video.id)) {
      removeFromWishlist(video.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <motion.div
      className="relative aspect-[9/16] w-full max-w-[280px] sm:max-w-[320px] rounded-2xl sm:rounded-3xl overflow-hidden bg-[#2C1810] shadow-luxury flex-shrink-0 snap-center"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 300 }}
      onMouseEnter={() => setShowOverlay(true)}
      onMouseLeave={() => setShowOverlay(true)}
    >
      {/* Video/Thumbnail */}
      <div className="absolute inset-0">
        {/* Thumbnail as fallback */}
        <Image
          src={video.thumbnail}
          alt={video.productName}
          fill
          className={`object-cover transition-opacity duration-500 ${isPlaying ? "opacity-0" : "opacity-100"}`}
        />
        
        {/* Video element - will show placeholder if no video */}
        <video
          ref={videoRef}
          src={video.videoUrl}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted={isMuted}
          playsInline
          poster={video.thumbnail}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
      </div>

      {/* Play/Pause Button - Center */}
      <motion.button
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: showOverlay && !isPlaying ? 1 : 0, scale: 1 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
          <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-white ml-1" />
        </div>
      </motion.button>

      {/* Top Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
        <motion.button
          onClick={toggleMute}
          whileTap={{ scale: 0.9 }}
          className="p-2 rounded-full bg-black/30 backdrop-blur-sm text-white"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </motion.button>
        <motion.button
          onClick={toggleWishlist}
          whileTap={{ scale: 0.9 }}
          className={`p-2 rounded-full backdrop-blur-sm ${
            isInWishlist(video.id) ? "bg-red-500 text-white" : "bg-black/30 text-white"
          }`}
        >
          <Heart className={`w-4 h-4 ${isInWishlist(video.id) ? "fill-white" : ""}`} />
        </motion.button>
      </div>

      {/* Playing Indicator */}
      <AnimatePresence>
        {isPlaying && (
          <motion.button
            onClick={togglePlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-4 left-4 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white z-10"
          >
            <Pause className="w-4 h-4" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Product Overlay - Bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-4 z-10"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        {/* Product Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg">
          <div className="flex items-start gap-3">
            {/* Product Image */}
            <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 bg-[#F5EDE6]">
              <Image
                src={video.productImage}
                alt={video.productName}
                fill
                className="object-cover"
              />
            </div>
            
            {/* Product Info */}
            <div className="flex-1 min-w-0">
              <h4 className="font-serif text-sm font-semibold text-[#2C1810] truncate">
                {video.productName}
              </h4>
              <p className="text-xs text-[#7A6252] truncate">{video.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="font-semibold text-[#8B5A2B]">{formatPrice(video.price)}</span>
                {video.originalPrice && (
                  <span className="text-xs text-[#7A6252] line-through">
                    {formatPrice(video.originalPrice)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Buy Now Button */}
          <motion.button
            onClick={handleAddToCart}
            whileTap={{ scale: 0.97 }}
            className="w-full mt-3 py-2.5 bg-gradient-to-r from-[#2C1810] to-[#5D3A1A] text-white rounded-xl font-medium flex items-center justify-center gap-2 text-sm shadow-md"
          >
            <ShoppingBag className="w-4 h-4" />
            Buy Now
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WatchAndBuy() {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollTo = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 340;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const scrollLeft = scrollContainerRef.current.scrollLeft;
      const cardWidth = 340;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setActiveIndex(Math.min(newIndex, videoProducts.length - 1));
    }
  };

  return (
    <section className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-[#2C1810] to-[#1F1209] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 sm:mb-14"
        >
          <span className="inline-block text-[#C9A227] text-xs sm:text-sm font-medium tracking-[0.2em] uppercase mb-3">
            ✨ Featured Reels
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-tight mb-4">
            Watch & <span className="text-gradient-gold">Buy</span>
          </h2>
          <p className="text-sm sm:text-base text-[#B8A99A] max-w-xl mx-auto">
            See our bags in action. Watch, fall in love, and buy — all in one place.
          </p>
        </motion.div>

        {/* Video Carousel */}
        <div className="relative">
          {/* Navigation Arrows - Desktop */}
          <button
            onClick={() => scrollTo("left")}
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollTo("right")}
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm items-center justify-center text-white hover:bg-white/20 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Video Cards Container */}
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide snap-x snap-mandatory pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center"
          >
            {videoProducts.map((video, index) => (
              <VideoCard
                key={video.id}
                video={video}
                isActive={index === activeIndex}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {videoProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  if (scrollContainerRef.current) {
                    scrollContainerRef.current.scrollTo({
                      left: index * 340,
                      behavior: "smooth",
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === activeIndex
                    ? "bg-[#C9A227] w-6"
                    : "bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

