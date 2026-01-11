'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, Check, ChevronLeft, ChevronRight, Heart, Sparkles } from 'lucide-react';
import { productColors, colorHexCodes, products, productSizes } from '../utils/constants';
import { R2_IMAGE_URLS, THUMBNAIL_IMAGE_URL } from '../config/r2Config';

interface HeroProps {
  selectedColorIndex: number;
  setSelectedColorIndex: (index: number) => void;
  selectedSize: string;
  setSelectedSize: (size: string) => void;
}

export default function Hero({ 
  selectedColorIndex, 
  setSelectedColorIndex,
  selectedSize,
  setSelectedSize 
}: HeroProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [hasChangedColor, setHasChangedColor] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const currentColor = productColors[selectedColorIndex];
  const currentProduct = products[currentColor];
  const currentImages = R2_IMAGE_URLS[currentColor] || [THUMBNAIL_IMAGE_URL];
  const discountPercent = Math.round((1 - currentProduct.price / currentProduct.originalPrice) * 100);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [selectedColorIndex]);

  const handleColorChange = (index: number) => {
    setSelectedColorIndex(index);
    setHasChangedColor(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

  return (
    <div className="px-4 pt-4 pb-6">
      {/* Product Image Gallery */}
      <div className="relative bg-gradient-to-b from-rose-50 to-pink-50 rounded-3xl overflow-hidden shadow-xl mb-4">
        {/* Label Badge */}
        {currentProduct.label && (
          <div className="absolute top-3 left-3 z-10 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            {currentProduct.label}
          </div>
        )}

        {/* Heart/Like Button */}
        <button
          onClick={() => setIsLiked(!isLiked)}
          className="absolute top-3 right-3 z-10 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
        >
          <Heart 
            className={`w-5 h-5 transition-colors ${isLiked ? 'fill-rose-500 text-rose-500' : 'text-gray-400'}`} 
          />
        </button>

        {/* Main Image */}
        <div className="relative aspect-square">
          <Image
            src={hasChangedColor ? currentImages[currentImageIndex] : THUMBNAIL_IMAGE_URL}
            alt={`Seetara Push Up Bra - ${currentColor}`}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />

          {/* Navigation Arrows */}
          {currentImages.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <ChevronLeft className="w-5 h-5 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg active:scale-90 transition-transform"
              >
                <ChevronRight className="w-5 h-5 text-gray-700" />
              </button>
            </>
          )}

          {/* Image Indicators */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {currentImages.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentImageIndex 
                    ? 'bg-rose-500 w-6' 
                    : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-4">
        {/* Title & Rating */}
        <div>
          <h1 className="text-2xl font-black text-gray-900 leading-tight">
            Push Up Bra
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">Wire-Free • Breathable • All Day Comfort</p>
          
          {/* Rating */}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">4.9</span>
            <span className="text-xs text-gray-400">(2,847 reviews)</span>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3">
          <span className="text-3xl font-black text-gray-900">
            रु. {currentProduct.price.toLocaleString()}
          </span>
          <span className="text-lg text-gray-400 line-through">
            रु. {currentProduct.originalPrice.toLocaleString()}
          </span>
          <span className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            -{discountPercent}%
          </span>
        </div>

        {/* Color Selection */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Color: <span className="text-rose-500">{currentColor}</span>
          </p>
          <div className="flex gap-3">
            {productColors.map((color, index) => (
              <button
                key={color}
                onClick={() => handleColorChange(index)}
                className={`relative w-12 h-12 rounded-full transition-all duration-200 ${
                  selectedColorIndex === index 
                    ? 'ring-2 ring-rose-500 ring-offset-2 scale-110' 
                    : 'hover:scale-105'
                }`}
                style={{ backgroundColor: colorHexCodes[color] }}
                title={color}
              >
                {selectedColorIndex === index && (
                  <Check className={`absolute inset-0 m-auto w-5 h-5 ${
                    color === 'White' || color === 'Nude' ? 'text-gray-800' : 'text-white'
                  }`} />
                )}
                {color === 'White' && (
                  <span className="absolute inset-0 rounded-full border-2 border-gray-200" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div>
          <p className="text-sm font-semibold text-gray-700 mb-2">
            Size: <span className="text-rose-500">{selectedSize || 'Select Size'}</span>
          </p>
          <div className="grid grid-cols-4 gap-2">
            {productSizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`py-2.5 rounded-xl text-sm font-bold transition-all ${
                  selectedSize === size
                    ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-lg'
                    : 'bg-rose-50 text-gray-700 hover:bg-rose-100 border border-rose-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Features */}
        <div className="flex flex-wrap gap-2">
          {['Wire-Free', 'Breathable', 'Perfect Lift', 'Seamless'].map((feature) => (
            <span
              key={feature}
              className="bg-rose-50 text-rose-600 text-xs font-medium px-3 py-1.5 rounded-full border border-rose-100"
            >
              ✓ {feature}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
