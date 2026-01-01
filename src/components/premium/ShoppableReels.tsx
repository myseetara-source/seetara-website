'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Heart, 
  Share2, 
  Volume2, 
  VolumeX, 
  X, 
  ChevronLeft, 
  ChevronRight,
  ShoppingBag,
  Play,
  Pause
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Reel {
  id: string;
  videoUrl: string;
  thumbnailUrl: string;
  productName: string;
  productPrice: number;
  originalPrice?: number;
  productUrl: string;
  likes: number;
  isLiked?: boolean;
}

interface ShoppableReelsProps {
  reels?: Reel[];
  title?: string;
}

// Mock data for reels
export const mockReels: Reel[] = [
  {
    id: '1',
    videoUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/sb106-video.mp4',
    thumbnailUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/maroon-handbag.webp',
    productName: 'Golden Chain Bag',
    productPrice: 1499,
    originalPrice: 2100,
    productUrl: '/sb107',
    likes: 248,
  },
  {
    id: '2',
    videoUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/sb106-video.mp4',
    thumbnailUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/black-handbag.webp',
    productName: 'Classic Black Tote',
    productPrice: 1699,
    originalPrice: 2500,
    productUrl: '/products/black-tote',
    likes: 156,
  },
  {
    id: '3',
    videoUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/sb106-video.mp4',
    thumbnailUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/coffee-handbag.webp',
    productName: 'Coffee Brown Sling',
    productPrice: 1299,
    originalPrice: 1800,
    productUrl: '/products/coffee-sling',
    likes: 312,
  },
  {
    id: '4',
    videoUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/sb106-video.mp4',
    thumbnailUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/brown-handbag.webp',
    productName: 'Brown Leather Bag',
    productPrice: 1899,
    originalPrice: 2800,
    productUrl: '/products/brown-leather',
    likes: 189,
  },
  {
    id: '5',
    videoUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/sb106-video.mp4',
    thumbnailUrl: 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/SB106/maroon-handbag.webp',
    productName: 'Maroon Party Bag',
    productPrice: 1599,
    originalPrice: 2200,
    productUrl: '/products/maroon-party',
    likes: 421,
  },
];

export default function ShoppableReels({
  reels = mockReels,
  title = "THE STYLE EDIT",
}: ShoppableReelsProps) {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [likedReels, setLikedReels] = useState<Set<string>>(new Set());
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeReel = activeReelIndex !== null ? reels[activeReelIndex] : null;

  // Handle video controls
  useEffect(() => {
    if (videoRef.current && activeReel) {
      if (isPlaying) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
      videoRef.current.muted = isMuted;
    }
  }, [isPlaying, isMuted, activeReel]);

  // Reset playing state when modal opens
  useEffect(() => {
    if (activeReelIndex !== null) {
      setIsPlaying(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeReelIndex]);

  const openReel = (index: number) => {
    setActiveReelIndex(index);
    setIsPlaying(true);
  };

  const closeReel = () => {
    setActiveReelIndex(null);
  };

  const goToNext = () => {
    if (activeReelIndex !== null && activeReelIndex < reels.length - 1) {
      setActiveReelIndex(activeReelIndex + 1);
    }
  };

  const goToPrev = () => {
    if (activeReelIndex !== null && activeReelIndex > 0) {
      setActiveReelIndex(activeReelIndex - 1);
    }
  };

  const toggleLike = (reelId: string) => {
    setLikedReels((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reelId)) {
        newSet.delete(reelId);
      } else {
        newSet.add(reelId);
      }
      return newSet;
    });
  };

  const handleShare = async () => {
    if (activeReel && navigator.share) {
      try {
        await navigator.share({
          title: activeReel.productName,
          text: `Check out ${activeReel.productName} from Seetara!`,
          url: window.location.origin + activeReel.productUrl,
        });
      } catch (err) {
        console.log('Share cancelled');
      }
    }
  };

  const scrollLeft = () => {
    scrollContainerRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
  };

  const scrollRight = () => {
    scrollContainerRef.current?.scrollBy({ left: 300, behavior: 'smooth' });
  };

  return (
    <section className="py-12 md:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1a1a1a] tracking-wide">
            {title}
          </h2>
          
          {/* Navigation Arrows (Desktop) */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollRight}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reels Horizontal Scroll */}
        <div className="relative -mx-4 md:mx-0">
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4 md:px-0 snap-x snap-mandatory"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {reels.map((reel, index) => (
              <motion.div
                key={reel.id}
                className="flex-shrink-0 w-[200px] md:w-[240px] snap-start cursor-pointer group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => openReel(index)}
              >
                {/* Thumbnail */}
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-gray-100 mb-3">
                  <Image
                    src={reel.thumbnailUrl}
                    alt={reel.productName}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileHover={{ scale: 1, opacity: 1 }}
                      className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center"
                    >
                      <Play className="w-6 h-6 text-[#1a1a1a] ml-1" fill="currentColor" />
                    </motion.div>
                  </div>

                  {/* Likes Badge */}
                  <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                    <Heart className="w-3 h-3" fill="currentColor" />
                    {reel.likes}
                  </div>
                </div>

                {/* Product Info */}
                <h3 className="font-semibold text-[#1a1a1a] text-sm mb-1 truncate">
                  {reel.productName.toUpperCase()}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#1a1a1a]">
                    ₹ {reel.productPrice.toLocaleString()}
                  </span>
                  {reel.originalPrice && (
                    <span className="text-gray-400 text-sm line-through">
                      ₹{reel.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {activeReel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
          >
            {/* Close Button */}
            <button
              onClick={closeReel}
              className="absolute top-4 right-4 md:top-6 md:right-6 z-50 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation Arrows */}
            {activeReelIndex !== null && activeReelIndex > 0 && (
              <button
                onClick={goToPrev}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors hidden md:flex"
              >
                <ChevronLeft className="w-6 h-6 text-[#1a1a1a]" />
              </button>
            )}
            {activeReelIndex !== null && activeReelIndex < reels.length - 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-50 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-100 transition-colors hidden md:flex"
              >
                <ChevronRight className="w-6 h-6 text-[#1a1a1a]" />
              </button>
            )}

            {/* Video Container */}
            <motion.div
              key={activeReel.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[400px] h-full max-h-[90vh] md:max-h-[85vh] mx-4"
            >
              {/* Video */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-black">
                <video
                  ref={videoRef}
                  src={activeReel.videoUrl}
                  className="w-full h-full object-cover"
                  loop
                  playsInline
                  autoPlay
                  muted={isMuted}
                  onClick={() => setIsPlaying(!isPlaying)}
                />

                {/* Play/Pause Overlay */}
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                      onClick={() => setIsPlaying(true)}
                    >
                      <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                        <Play className="w-10 h-10 text-white ml-1" fill="currentColor" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sound Toggle */}
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="absolute top-4 right-4 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5 text-white" />
                  ) : (
                    <Volume2 className="w-5 h-5 text-white" />
                  )}
                </button>

                {/* Side Actions */}
                <div className="absolute right-4 bottom-32 flex flex-col gap-4">
                  {/* Like */}
                  <button
                    onClick={() => toggleLike(activeReel.id)}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      likedReels.has(activeReel.id) ? 'bg-red-500' : 'bg-white/20'
                    }`}>
                      <Heart
                        className={`w-6 h-6 ${likedReels.has(activeReel.id) ? 'text-white' : 'text-white'}`}
                        fill={likedReels.has(activeReel.id) ? 'currentColor' : 'none'}
                      />
                    </div>
                    <span className="text-white text-xs font-medium">
                      {activeReel.likes + (likedReels.has(activeReel.id) ? 1 : 0)}
                    </span>
                  </button>

                  {/* Share */}
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1"
                  >
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                      <Share2 className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-white text-xs font-medium">Share</span>
                  </button>
                </div>

                {/* Product Card */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-lg">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <Image
                        src={activeReel.thumbnailUrl}
                        alt={activeReel.productName}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-[#1a1a1a] text-sm truncate">
                        {activeReel.productName}
                      </h4>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-[#1a1a1a]">
                          ₹{activeReel.productPrice.toLocaleString()}
                        </span>
                        {activeReel.originalPrice && (
                          <span className="text-gray-400 text-sm line-through">
                            ₹{activeReel.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <Link
                      href={activeReel.productUrl}
                      className="bg-[#1a1a1a] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#333] transition-colors flex items-center gap-1"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      SHOP
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Mobile Swipe Hint */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 md:hidden">
              <p className="text-white/50 text-xs">Swipe for more</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

