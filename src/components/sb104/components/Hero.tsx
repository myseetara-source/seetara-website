'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, X, Star, Loader2, Sparkles, ShoppingCart } from 'lucide-react';
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
  const [justSelectedIndex, setJustSelectedIndex] = useState<number | null>(null);

  const currentColor = productColors[selectedColorIndex];
  const currentProduct = products[currentColor];
  const videoUrl = getVideoUrl();
  const savings = currentProduct.originalPrice - currentProduct.price;
  const discountPercent = Math.round((savings / currentProduct.originalPrice) * 100);

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
    setJustSelectedIndex(index);
    setSelectedColorIndex(index);
    setShowVideo(false);
    setTimeout(() => setIsAnimating(false), 300);
    setTimeout(() => setJustSelectedIndex(null), 400);
  };

  const scrollToOrder = () => {
    document.getElementById('order-form')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="px-4 pt-2 pb-3 overflow-hidden md:px-0"> 
      
      {/* Product Title */}
      <div className="text-center mb-3">
        <h1 className="text-xl font-black text-gray-900 leading-tight">
          Seetara <span className="bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 bg-clip-text text-transparent">Multi-Functional</span> Bag
        </h1>
      </div>

      {/* Product Image Card */}
      <div className={`relative rounded-3xl bg-white shadow-xl overflow-hidden mb-3 group ${showVideo ? 'aspect-[3/4]' : 'aspect-square'} transition-all duration-300 border border-gray-100`}> 
        
        {/* Discount Badge */}
        <div className="absolute top-3 left-3 z-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-2.5 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1">
          <Sparkles className="w-3 h-3" /> {discountPercent}% OFF
        </div>

        {/* Navigation Arrows */}
        <button onClick={handlePrev} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white active:scale-90 transition-all">
           <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button onClick={handleNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 p-2 bg-white/95 backdrop-blur-sm rounded-full shadow-lg hover:bg-white active:scale-90 transition-all">
           <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>

        {/* Video Button */}
        {!showVideo && (
           <button 
             onClick={() => setShowVideo(true)}
             className="absolute top-3 right-3 z-20 bg-black/80 hover:bg-black text-white px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 transition-all shadow-lg"
           >
              <Play className="w-3 h-3 fill-current" /> Video
           </button>
        )}

        {/* Best Seller Badge */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-xs font-black shadow-lg border-2 border-white">
           <Star className="w-3 h-3 fill-current" /> Work Bag Bestseller
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
                    alt={`Seetara ${currentColor} Multi-Functional Bag`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-cover ${slideDirection === 'right' ? 'slide-right' : 'slide-left'} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
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

      {/* Color Selector */}
      <div className="mb-3 flex flex-col items-center">
        <p className="text-xs font-semibold text-gray-600 mb-2">
          ५ Colors मा उपलब्ध — Choose Yours
        </p>
        <div className="flex gap-2 items-center bg-white p-2 rounded-full shadow-md border border-gray-100">
          {productColors.map((color, index) => (
            <button
              key={color}
              onClick={() => handleColorSelect(index)}
              className={`relative w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedColorIndex === index 
                  ? `ring-2 ring-offset-2 ring-emerald-500 shadow-lg opacity-100 ${justSelectedIndex === index ? 'animate-pulse-once' : 'scale-110'}` 
                  : 'opacity-50 hover:scale-105'
              }`}
              style={{ backgroundColor: products[color].hex }}
              title={products[color].label}
            />
          ))}
        </div>
        {/* Selected Color Text */}
        <p className="mt-2 text-xs text-gray-600">
          You selected: <span className="font-bold text-gray-900">{currentProduct.label}</span>
          <span className="text-gray-400 mx-1">•</span>
          <span className="text-gray-500">{currentProduct.labelNp} छानियो</span>
        </p>
      </div>

      {/* Price & CTA Section */}
      <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-2xl p-4 border border-emerald-200 shadow-lg">
        {/* Price Display */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <div className="text-center">
            <span className="text-gray-400 text-sm line-through">रु. {currentProduct.originalPrice}</span>
            <span className="text-[10px] text-red-500 font-bold ml-1">-{discountPercent}%</span>
          </div>
          <div className="text-center">
            <span className="text-3xl font-black text-emerald-600">रु. {currentProduct.price}</span>
            <span className="text-emerald-600 font-bold">/-</span>
          </div>
        </div>
        
        {/* Savings Badge */}
        <div className="flex justify-center mb-3">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-md">
            <Sparkles className="w-3 h-3" />
            तपाईंको रु. {savings}/- बचत!
          </div>
        </div>

        {/* Order Now CTA Button */}
        <button 
          onClick={scrollToOrder}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-xl transition-all active:scale-[0.98] animate-cta-pulse"
        >
          <ShoppingCart className="w-5 h-5" />
          अहिले Order गर्नुहोस्!
        </button>
        
        {/* Trust Text */}
        <p className="text-center text-[10px] text-gray-500 mt-2">
          💵 Cash on Delivery • 💼 Laptop Compatible • ✈️ Travel Ready
        </p>
      </div>
    </div>
  );
}

