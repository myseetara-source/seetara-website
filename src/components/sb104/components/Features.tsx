'use client';

import { Truck, Eye, Award, Star, TrendingUp, Flame, Quote, Verified, Grid3X3, Package, Layers, Lock, Zap, Sparkles, Luggage, Briefcase } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import React from 'react';
import { getFeatureGif } from '../config/r2Config';

interface FeaturesProps {
  stockLeft: number;
  viewers: number;
}

// Feature reasons with video data - Only 3 cards now
const buyReasons = [
  {
    id: 'luggage-sleeve',
    number: '01',
    title: 'Travel Ready',
    subtitle: 'Suitcase मा Slide गर्नुहोस् — Hands-free यात्रा! ✈️',
    icon: Luggage,
    color: 'from-blue-500 to-indigo-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    aspectRatio: 'aspect-square' // 1:1
  },
  {
    id: 'compartments',
    number: '02',
    title: '5 Compartments',
    subtitle: 'सबै सामान organized — कहिल्यै खोज्नु पर्दैन! 📦',
    icon: Grid3X3,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    aspectRatio: 'aspect-square' // 1:1
  },
  {
    id: 'lifestyle',
    number: '03',
    title: 'Premium Style',
    subtitle: 'जहाँ जाँदा पनि Confidence र Elegance! ✨',
    icon: Sparkles,
    color: 'from-purple-500 to-pink-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    aspectRatio: 'aspect-[3/4]' // 3:4
  }
];

// Video Card Component with auto-play loop (no controls)
function FeatureVideoCard({ reason, index, isVisible }: { reason: typeof buyReasons[0]; index: number; isVisible: boolean }) {
  const [videoError, setVideoError] = useState(false);
  const videoData = getFeatureGif(reason.id); // Still using same config, but now returns MP4 URLs
  const Icon = reason.icon;
  const videoRef = React.useRef<HTMLVideoElement>(null);

  // Auto-play video when visible
  useEffect(() => {
    if (videoRef.current && isVisible && videoData.url) {
      videoRef.current.play().catch(() => {
        // Ignore play errors (e.g., autoplay policy)
      });
    }
  }, [isVisible, videoData.url]);

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden shadow-lg border-2 ${reason.borderColor} ${reason.bgColor} transition-all duration-300 hover:shadow-xl hover:scale-[1.02]`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Number Badge */}
      <div className={`absolute top-2 left-2 z-20 w-8 h-8 rounded-full bg-gradient-to-br ${reason.color} flex items-center justify-center text-white text-xs font-black shadow-lg`}>
        {reason.number}
      </div>

      {/* Video Container - Original aspect ratio on mobile, square on desktop */}
      <div 
        className={`relative ${reason.aspectRatio} lg:!aspect-square bg-gray-100`}
      >
        {!videoError && videoData.url ? (
          <video
            ref={videoRef}
            src={videoData.url}
            poster={videoData.placeholder}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
            autoPlay
            onError={() => setVideoError(true)}
          />
        ) : (
          // Fallback when no video available
          <div className={`w-full h-full flex flex-col items-center justify-center bg-gradient-to-br ${reason.color} p-4`}>
            <Icon className="w-12 h-12 text-white mb-2" />
            <p className="text-white text-xs font-bold text-center">Video Coming Soon</p>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3">
        <div className="flex items-center gap-2 mb-1">
          <Icon className={`w-4 h-4 bg-gradient-to-br ${reason.color} text-white rounded p-0.5`} />
          <h4 className="font-black text-gray-900 text-sm">{reason.title}</h4>
        </div>
        <p className="text-[11px] text-gray-600 font-medium leading-snug">{reason.subtitle}</p>
      </div>
    </div>
  );
}

export default function Features({ stockLeft, viewers }: FeaturesProps) {
  const totalStock = 50;
  const soldPercentage = Math.min(100, Math.max(0, ((totalStock - stockLeft) / totalStock) * 100));
  const [isStatsVisible, setIsStatsVisible] = useState(false);
  const [isVideoSectionVisible, setIsVideoSectionVisible] = useState(false);
  const videoSectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsStatsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Intersection Observer for video section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVideoSectionVisible(true);
          }
        });
      },
      { threshold: 0.2 } // Trigger when 20% of section is visible
    );

    if (videoSectionRef.current) {
      observer.observe(videoSectionRef.current);
    }

    return () => {
      if (videoSectionRef.current) {
        observer.unobserve(videoSectionRef.current);
      }
    };
  }, []);

  return (
    <div className="px-4 py-4 space-y-4 lg:py-8 lg:space-y-6">
      
      {/* LIVE STATS BAR */}
      <div className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 via-teal-600 to-emerald-700 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(5)].map((_, i) => (
            <div 
              key={i}
              className="absolute w-1 h-1 bg-white/40 rounded-full animate-float-particle"
              style={{
                left: `${20 + i * 15}%`,
                animationDelay: `${i * 0.3}s`
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="text-center flex-1">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Flame className="w-5 h-5 animate-pulse text-yellow-300" />
                <span className="text-3xl font-black animate-pulse">{stockLeft}</span>
              </div>
              <p className="text-[10px] text-white/80">बाँकी छ</p>
            </div>
            
            <div className="w-px h-12 bg-white/30"></div>
            
            <div className="text-center flex-1">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Eye className="w-5 h-5 text-blue-200" />
                <span className="text-3xl font-black">{viewers}</span>
              </div>
              <p className="text-[10px] text-white/80">हेर्दैछन्</p>
            </div>
            
            <div className="w-px h-12 bg-white/30"></div>
            
            <div className="text-center flex-1">
              <div className="flex items-center gap-1 justify-center mb-1">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="text-3xl font-black">32</span>
              </div>
              <p className="text-[10px] text-white/80">आज बिक्यो</p>
            </div>
          </div>
          
          <div className="bg-black/30 rounded-xl p-2">
            <div className="flex items-center justify-between text-[11px] font-bold mb-2 px-1">
              <span className="flex items-center gap-1">
                <span className="animate-bounce text-lg">🔥</span> 
                {soldPercentage.toFixed(0)}% बिक्री भयो
              </span>
              <span className="text-white bg-emerald-600 px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                छिटो गर्नुहोस्!
              </span>
            </div>
            <div className="h-4 bg-gray-800/50 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 flex">
                <div className="flex-1 bg-green-900/30"></div>
                <div className="flex-1 bg-yellow-900/30"></div>
                <div className="flex-1 bg-orange-900/30"></div>
                <div className="flex-1 bg-red-900/30"></div>
              </div>
              <div 
                className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ 
                  width: `${soldPercentage}%`,
                  background: 'linear-gradient(90deg, #22c55e 0%, #84cc16 25%, #eab308 50%, #f97316 75%, #ef4444 100%)'
                }}
              >
                <div className="absolute inset-0 animate-shimmer-fast bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
                <div className="absolute right-0 top-0 bottom-0 w-4 bg-gradient-to-l from-white/60 to-transparent animate-pulse"></div>
              </div>
            </div>
            <p className="text-center text-[10px] text-white/70 mt-1">
              ⚠️ Stock सकिँदै छ - अहिले नै Order गर्नुहोस्!
            </p>
          </div>
        </div>
      </div>

      {/* TRUST BADGES */}
      <div className="grid grid-cols-4 gap-2">
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="w-10 h-10 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-2">
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-[10px] font-bold text-gray-800">Check</p>
          <p className="text-[9px] text-gray-500">& Pay</p>
        </div>
        
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="w-10 h-10 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-2">
            <Truck className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-[10px] font-bold text-gray-800">Fast</p>
          <p className="text-[9px] text-gray-500">Delivery</p>
        </div>
        
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="w-10 h-10 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-[10px] font-bold text-gray-800">Premium</p>
          <p className="text-[9px] text-gray-500">Quality</p>
        </div>
        
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="w-10 h-10 mx-auto bg-purple-100 rounded-full flex items-center justify-center mb-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-[10px] font-bold text-gray-800">Laptop</p>
          <p className="text-[9px] text-gray-500">Fits 15"</p>
        </div>
      </div>

      {/* 3 REASONS TO BUY - VIDEO SHOWCASE */}
      <div ref={videoSectionRef} className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-4 border border-gray-200 shadow-sm">
        {/* Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 rounded-full text-sm font-black shadow-lg">
            <Sparkles className="w-4 h-4" />
            3 Reasons to Buy
          </div>
        </div>

        {/* Mobile: 2 cols for first 2, then 1 full width | Desktop: 3 cols */}
        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-3">
          {buyReasons.map((reason, index) => (
            <FeatureVideoCard key={reason.id} reason={reason} index={index} isVisible={isVideoSectionVisible} />
          ))}
        </div>

        {/* Mobile Layout - Original */}
        <div className="lg:hidden">
          <div className="grid grid-cols-2 gap-3">
            {buyReasons.slice(0, 2).map((reason, index) => (
              <FeatureVideoCard key={reason.id} reason={reason} index={index} isVisible={isVideoSectionVisible} />
            ))}
          </div>
          
          {/* 3rd Reason - Full Width (3:4 ratio) */}
          <div className="mt-3">
            <FeatureVideoCard reason={buyReasons[2]} index={2} isVisible={isVideoSectionVisible} />
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            ✨ <span className="font-bold text-emerald-600">एउटा Bag</span> — Office + Travel + Style = Complete! ✨
          </p>
        </div>
      </div>

      {/* CUSTOMER LOVE - COMPACT HORIZONTAL */}
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-3 border border-emerald-100">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-black text-gray-900 text-xs flex items-center gap-1.5">
            <Quote className="w-4 h-4 text-emerald-500" />
            Customer Love
          </h3>
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
            ))}
            <span className="text-[10px] text-gray-500 ml-1">4.9/5</span>
          </div>
        </div>
        
        {/* Horizontal Scroll Reviews */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { name: 'Pratima', city: 'KTM', review: 'Laptop fit, organized! 👌', color: 'from-emerald-400 to-teal-500' },
            { name: 'Samiksha', city: 'Pokhara', review: 'Suitcase slide feature 👏', color: 'from-blue-400 to-indigo-500' },
            { name: 'Anuja', city: 'Butwal', review: 'Quality top class! 💼', color: 'from-pink-400 to-rose-500' },
          ].map((review, i) => (
            <div key={i} className="flex-shrink-0 bg-white rounded-xl p-2.5 shadow-sm border border-emerald-100 min-w-[180px] max-w-[200px]">
              <div className="flex items-center gap-2 mb-1.5">
                <div className={`w-7 h-7 rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-white text-[10px] font-bold`}>
                  {review.name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    <p className="text-[10px] font-bold text-gray-800 truncate">{review.name}</p>
                    <Verified className="w-3 h-3 text-green-500 flex-shrink-0" />
                  </div>
                  <p className="text-[9px] text-gray-400">📍 {review.city}</p>
                </div>
              </div>
              <p className="text-[10px] text-gray-600 leading-snug">&quot;{review.review}&quot;</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
