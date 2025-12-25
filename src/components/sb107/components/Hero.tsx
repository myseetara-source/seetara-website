'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, X, Star, Loader2, Sparkles, ShoppingCart, Zap } from 'lucide-react';
import { productColors, products } from '../utils/constants';
import { getVideoUrl } from '../config/r2Config';
import Image from 'next/image';

interface HeroProps {
  selectedColorIndex: number;
  setSelectedColorIndex: (index: number) => void;
  showVideo: boolean;
  setShowVideo: (show: boolean) => void;
}

export default function Hero({ 
  selectedColorIndex, 
  setSelectedColorIndex, 
  showVideo, 
  setShowVideo 
}: HeroProps) {
  const [slideDirection, setSlideDirection] = useState('right'); 
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const currentColor = productColors[selectedColorIndex];
  const currentProduct = products[currentColor];
  const videoUrl = getVideoUrl();
  const savings = currentProduct.originalPrice - currentProduct.price;

  // Preload ALL product images on mount
  useEffect(() => {
    productColors.forEach((color) => {
      const img = new window.Image();
      img.src = products[color].image;
    });
  }, []);

  useEffect(() => {
    setImageLoading(true);
    setImageError(false);
  }, [selectedColorIndex]);

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('right');
    setSelectedColorIndex((selectedColorIndex + 1) % productColors.length);
    setShowVideo(false); 
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setSlideDirection('left');
    setSelectedColorIndex((selectedColorIndex - 1 + productColors.length) % productColors.length);
    setShowVideo(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const handleColorSelect = (index: number) => {
    if (index === selectedColorIndex) return;
    setSlideDirection(index > selectedColorIndex ? 'right' : 'left');
    setIsAnimating(true);
    setSelectedColorIndex(index);
    setShowVideo(false);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="px-3 pt-1 pb-1 overflow-hidden md:px-0"> 
      
      {/* Product Title */}
      <div className="text-center mb-1">
        <h1 className="text-lg font-black text-gray-900 leading-tight">
          Seetara <span className="bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 bg-clip-text text-transparent">Golden</span> Chain Bag
        </h1>
        <p className="text-xs text-gray-600 font-medium">
          ✨ हेर्दा महँगो, किन्दा सस्तो — सबैले सोध्छन् कहाँबाट किनेको!
        </p>
      </div>

      {/* Product Image Card */}
      <div className={`relative rounded-2xl bg-gradient-to-b from-white to-gray-50 shadow-lg overflow-hidden mb-1 group ${showVideo ? 'aspect-[3/4]' : 'aspect-[4/5]'} transition-all duration-300 border border-gray-100`}> 
        
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 z-20 bg-gradient-to-r from-red-500 to-orange-500 text-white px-2 py-0.5 rounded-full text-[10px] font-black shadow-lg flex items-center gap-0.5">
          <Zap className="w-2.5 h-2.5" /> ३०% OFF
        </div>

        {/* Navigation Arrows */}
        <button onClick={handlePrev} className="absolute left-1 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white active:scale-90 transition-all">
           <ChevronLeft className="w-4 h-4 text-gray-800" />
        </button>
        <button onClick={handleNext} className="absolute right-1 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white active:scale-90 transition-all">
           <ChevronRight className="w-4 h-4 text-gray-800" />
        </button>

        {/* Video Button */}
        {!showVideo && (
           <button 
             onClick={() => setShowVideo(true)}
             className="absolute top-2 right-2 z-20 bg-black/80 hover:bg-black text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-0.5 transition-all shadow-lg"
           >
              <Play className="w-2.5 h-2.5 fill-current" /> Video
           </button>
        )}

        {/* Best Seller Badge */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-yellow-400 to-amber-500 text-white px-2 py-0.5 rounded-full flex items-center gap-0.5 text-[10px] font-black shadow-lg border border-white">
           <Star className="w-2.5 h-2.5 fill-current" /> Bestseller
        </div>

        {/* Image/Video Container */}
        <div className={`w-full h-full transition-all duration-300 ${isAnimating ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
           {showVideo ? (
              <div className="w-full h-full bg-black relative">
                 <video 
                   src={videoUrl}
                   className="w-full h-full object-cover"
                   controls
                   autoPlay
                   playsInline
                   loop
                 />
                 <button 
                   onClick={() => setShowVideo(false)}
                   className="absolute top-3 right-3 bg-black/50 backdrop-blur-md p-2 rounded-full text-white z-30 hover:bg-black/70 transition-colors"
                 >
                    <X className="w-5 h-5" />
                 </button>
              </div>
           ) : (
              <div className="w-full h-full relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                  </div>
                )}
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 p-8">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">Image लोड हुन सकेन</p>
                      <p className="text-gray-500 text-xs">{currentProduct.labelNp}</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    key={selectedColorIndex} 
                    src={currentProduct.image} 
                    alt={`Seetara ${currentColor} Bag`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-contain p-4 ${slideDirection === 'right' ? 'slide-right' : 'slide-left'} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
                    priority
                    loading="eager"
                    quality={90}
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError(true);
                    }}
                  />
                )}
              </div>
           )}
        </div>
      </div>

      {/* Color Selector - Compact */}
      <div className="mb-1 flex flex-col items-center">
        <p className="text-[9px] font-semibold text-gray-500 uppercase mb-1 tracking-wide">
          Choose Color
        </p>
        <div className="flex gap-2 items-center bg-white p-1 rounded-full shadow-sm border border-gray-100">
          {productColors.map((color, index) => (
            <button
              key={color}
              onClick={() => handleColorSelect(index)}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedColorIndex === index 
                  ? 'ring-2 ring-offset-1 ring-green-500 shadow-lg scale-110' 
                  : 'hover:scale-105 opacity-70 hover:opacity-100'
              }`}
              style={{ backgroundColor: products[color].hex }}
              title={products[color].label}
            />
          ))}
        </div>
        <p className="mt-0.5 text-[10px] text-gray-600">
          <span className="font-bold text-gray-900">{currentProduct.label}</span>
          <span className="text-gray-400 mx-1">•</span>
          <span className="text-gray-500">{currentProduct.labelNp}</span>
        </p>
      </div>

      {/* Price & CTA Section - Compact */}
      <div className="bg-gradient-to-r from-green-50 via-emerald-50 to-teal-50 rounded-xl p-3 border border-green-200 shadow-md">
        {/* Price Display */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="text-gray-400 text-xs line-through">रु. {currentProduct.originalPrice}</span>
          <span className="text-2xl font-black text-green-600">रु. {currentProduct.price}/-</span>
          <span className="bg-red-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded">-30%</span>
        </div>
        
        {/* Savings Badge */}
        <div className="flex justify-center mb-2">
          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-sm">
            <Sparkles className="w-2.5 h-2.5" />
            तपाईंको रु. {savings}/- बचत!
          </div>
        </div>

        {/* Order Now CTA Button */}
        <button 
          onClick={scrollToOrder}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white py-2.5 rounded-lg font-bold text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all active:scale-[0.98] animate-cta-pulse"
        >
          <ShoppingCart className="w-4 h-4" />
          अहिले Order गर्नुहोस्!
        </button>
        
        {/* Trust Text */}
        <p className="text-center text-[9px] text-gray-500 mt-1.5">
          💵 Cash on Delivery • 🎁 Free Makeup Purse
        </p>
      </div>
    </div>
  );
}
