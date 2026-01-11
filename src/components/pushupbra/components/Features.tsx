'use client';

import { Star, Users, ShoppingBag, Shield, Truck, Package, Heart, Sparkles } from 'lucide-react';
import { trustBadges } from '../utils/constants';

interface FeaturesProps {
  stockLeft: number;
  viewers: number;
}

export default function Features({ stockLeft, viewers }: FeaturesProps) {
  // Customer reviews
  const reviews = [
    {
      name: 'Sunita M.',
      location: 'Kathmandu',
      rating: 5,
      text: 'सबैभन्दा comfortable bra! Wire नभएकोले दिनभर आरामदायक। Must buy!',
      verified: true,
    },
    {
      name: 'Priya S.',
      location: 'Pokhara',
      rating: 5,
      text: 'Perfect lift र shape! T-shirt मुनि seamless देखिन्छ। Love it! 💕',
      verified: true,
    },
    {
      name: 'Rekha T.',
      location: 'Lalitpur',
      rating: 5,
      text: 'Discrete packaging ma आयो। Quality excellent छ। Highly recommend!',
      verified: true,
    },
  ];

  return (
    <div className="px-4 py-6 space-y-6">
      {/* Live Stats */}
      <div className="bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 rounded-2xl p-4 border border-rose-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center animate-pulse">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Stock Left</p>
              <p className="text-lg font-black text-rose-600">{stockLeft} Only!</p>
            </div>
          </div>
          
          <div className="h-10 w-px bg-rose-200" />
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-xs text-gray-500">Viewing Now</p>
              <p className="text-lg font-black text-emerald-600">{viewers}+ महिला</p>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-2 gap-3">
        {trustBadges.map((badge, index) => (
          <div
            key={index}
            className="bg-white rounded-xl p-3 border border-rose-100 shadow-sm flex items-center gap-3"
          >
            <span className="text-2xl">{badge.icon}</span>
            <span className="text-xs font-semibold text-gray-700">{badge.text}</span>
          </div>
        ))}
      </div>

      {/* Why Choose Us */}
      <div className="bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-2xl p-5 text-white">
        <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5" />
          किन Seetara Push Up Bra?
        </h3>
        
        <div className="space-y-3">
          {[
            { icon: Heart, text: 'Wire-Free = All Day Comfort' },
            { icon: Shield, text: 'Premium Cotton Blend Fabric' },
            { icon: Truck, text: 'Free Delivery Nepal-wide' },
            { icon: Package, text: '100% Discrete Packaging' },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <item.icon className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews */}
      <div>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
          Customer Reviews
        </h3>
        
        <div className="space-y-3">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 border border-rose-100 shadow-sm"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-rose-300 to-pink-400 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{review.name}</p>
                    <p className="text-xs text-gray-400">{review.location}</p>
                  </div>
                </div>
                {review.verified && (
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-1 rounded-full">
                    ✓ Verified
                  </span>
                )}
              </div>
              
              <div className="flex gap-0.5 mb-2">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              
              <p className="text-sm text-gray-600 leading-relaxed">{review.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Size Guide Helper */}
      <div className="bg-rose-50 rounded-2xl p-4 border border-rose-100">
        <h4 className="text-sm font-bold text-gray-800 mb-2">📏 Size Guide</h4>
        <p className="text-xs text-gray-600 leading-relaxed">
          आफ्नो correct size थाहा नभए? Normal bra को tag हेर्नुहोस्। 
          यदि 32-34 हो भने 32B/34B choose गर्नुहोस्। 
          Doubt भए हाम्रो team लाई WhatsApp गर्नुहोस्! 💬
        </p>
      </div>
    </div>
  );
}
