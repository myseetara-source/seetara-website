'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Play, X, Star, Check, Loader2 } from 'lucide-react';
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

  // Preload ALL product images on mount for instant color switching
  useEffect(() => {
    const preloadAllImages = () => {
      productColors.forEach((color) => {
        const img = new window.Image();
        img.src = products[color].image;
      });
    };
    
    preloadAllImages();
  }, []); // Only run once on mount

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

  return (
    <div className="px-3 pt-0 pb-1 overflow-hidden mt-1 md:px-0 md:mt-0"> 
      <div className={`relative rounded-2xl bg-gray-50 shadow-lg overflow-hidden mb-1 group cursor-zoom-in ${showVideo ? 'aspect-[3/4]' : 'aspect-[4/5]'} transition-all duration-300`}> 
        <div className="absolute top-2 left-2 z-20 bg-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold shadow-md animate-pulse">
          -30% OFF
        </div>

        <button onClick={handlePrev} className="absolute left-1 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white active:scale-95 transition-all">
           <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>
        <button onClick={handleNext} className="absolute right-1 top-1/2 -translate-y-1/2 z-30 p-1.5 bg-white/80 backdrop-blur-sm rounded-full shadow-md hover:bg-white active:scale-95 transition-all">
           <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>

        {!showVideo && (
           <button 
             onClick={() => setShowVideo(true)}
             className="absolute top-2 right-2 z-20 bg-black/40 backdrop-blur-md text-white px-2 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all"
           >
              <Play className="w-2.5 h-2.5 fill-current" /> Video
           </button>
        )}

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 bg-[#FFFACD]/95 backdrop-blur-sm text-[#8B4513] px-2 py-0.5 rounded-full flex items-center gap-1 text-[9px] font-black tracking-wide shadow-md border border-[#F0E68C]">
           <Star className="w-2.5 h-2.5 fill-current" /> BEST SELLER
        </div>

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
                   className="absolute top-4 right-4 bg-black/50 backdrop-blur-md p-2 rounded-full text-white z-30 hover:bg-black/70 transition-colors"
                 >
                    <X className="w-5 h-5" />
                 </button>
                 <div className="absolute top-4 left-4 bg-red-500 text-white text-[10px] px-2 py-1 rounded-full font-bold animate-pulse">
                    LIVE
                 </div>
              </div>
           ) : (
              <div className="w-full h-full animate-float group-hover:scale-110 transition-transform duration-700 ease-in-out relative">
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-10">
                    <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
                  </div>
                )}
                {imageError ? (
                  <div className="w-full h-full flex items-center justify-center bg-gray-100 p-8">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-2">Image load huna sakyo</p>
                      <p className="text-gray-500 text-xs">{currentColor} Handbag</p>
                    </div>
                  </div>
                ) : (
                  <Image
                    key={selectedColorIndex} 
                    src={currentProduct.image} 
                    alt={`Seetara ${currentColor} Handbag - Premium Quality Bag`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className={`object-contain p-2 ${slideDirection === 'right' ? 'slide-right' : 'slide-left'} ${imageLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
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

      <div className="mb-1 flex flex-col items-center">
        <p className="text-[9px] font-bold text-gray-400 uppercase mb-1 tracking-widest">Choose Color</p>
        <div className="flex gap-2 items-center bg-white p-1 rounded-full shadow-sm border border-gray-100">
          {productColors.map((color, index) => (
            <button
              key={color}
              onClick={() => handleColorSelect(index)}
              className={`relative w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                selectedColorIndex === index 
                  ? 'ring-2 ring-offset-1 ring-gray-400 shadow-lg scale-110' 
                  : 'hover:scale-105 opacity-90'
              }`}
              style={{ backgroundColor: products[color].hex }}
              title={color}
            >
              {selectedColorIndex === index && (
                 <Check className="w-3 h-3 text-white drop-shadow-md" strokeWidth={3} />
              )}
            </button>
          ))}
        </div>
        <p className="mt-0.5 text-xs font-bold text-gray-800">{currentColor}</p>
      </div>
    </div>
  );
}

