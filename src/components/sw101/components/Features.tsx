'use client';

import { Truck, ShieldCheck, Eye, Award, Star, TrendingUp, Flame, Heart, CheckCircle, Quote, Verified, Smartphone, CreditCard, Wallet, Lock, Grip } from 'lucide-react';
import { useState, useEffect } from 'react';

interface FeaturesProps {
  stockLeft: number;
  viewers: number;
}

export default function Features({ stockLeft, viewers }: FeaturesProps) {
  const totalStock = 50;
  const soldPercentage = Math.min(100, Math.max(0, ((totalStock - stockLeft) / totalStock) * 100));
  const [isStatsVisible, setIsStatsVisible] = useState(false);

  // Animate stats visibility
  useEffect(() => {
    const timer = setTimeout(() => setIsStatsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="px-4 py-4 space-y-4">
      
      {/* LIVE STATS BAR */}
      <div className={`relative rounded-2xl overflow-hidden shadow-xl transition-all duration-700 ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-500 to-red-500 animate-gradient-x"></div>
        <div className="absolute inset-0 bg-black/10"></div>
        
        {/* Floating particles */}
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
            {/* Stock Left */}
            <div className="text-center flex-1">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Flame className="w-5 h-5 animate-pulse text-yellow-300" />
                <span className="text-3xl font-black animate-pulse">{stockLeft}</span>
              </div>
              <p className="text-[10px] text-white/80">बाँकी छ</p>
            </div>
            
            {/* Divider */}
            <div className="w-px h-12 bg-white/30"></div>
            
            {/* Viewers */}
            <div className="text-center flex-1">
              <div className="flex items-center gap-1 justify-center mb-1">
                <Eye className="w-5 h-5 text-blue-200" />
                <span className="text-3xl font-black">{viewers}</span>
              </div>
              <p className="text-[10px] text-white/80">हेर्दैछन्</p>
            </div>
            
            {/* Divider */}
            <div className="w-px h-12 bg-white/30"></div>
            
            {/* Sold Today */}
            <div className="text-center flex-1">
              <div className="flex items-center gap-1 justify-center mb-1">
                <TrendingUp className="w-5 h-5 text-green-300" />
                <span className="text-3xl font-black">38</span>
              </div>
              <p className="text-[10px] text-white/80">आज बिक्यो</p>
            </div>
          </div>
          
          {/* Progress Bar - Urgency Gradient */}
          <div className="bg-black/30 rounded-xl p-2">
            <div className="flex items-center justify-between text-[11px] font-bold mb-2 px-1">
              <span className="flex items-center gap-1">
                <span className="animate-bounce text-lg">🔥</span> 
                {soldPercentage.toFixed(0)}% बिक्री भयो
              </span>
              <span className="text-white bg-red-600 px-2 py-0.5 rounded-full text-[10px] animate-pulse">
                छिटो गर्नुहोस्!
              </span>
            </div>
            <div className="h-4 bg-gray-800/50 rounded-full overflow-hidden relative">
              {/* Progress fill */}
              <div 
                className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ 
                  width: `${soldPercentage}%`,
                  background: 'linear-gradient(90deg, #22c55e 0%, #84cc16 25%, #eab308 50%, #f97316 75%, #ef4444 100%)'
                }}
              >
                {/* Shimmer effect */}
                <div className="absolute inset-0 animate-shimmer-fast bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
              </div>
            </div>
            <p className="text-center text-[10px] text-white/70 mt-1">
              ⚠️ Stock सकिँदै छ - अहिले नै Order गर्नुहोस्!
            </p>
          </div>
        </div>
      </div>

      {/* SMART WALLET FEATURES - Hero Feature Section */}
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-amber-50 rounded-2xl p-4 border border-purple-100 shadow-lg">
        <h3 className="font-black text-gray-900 text-base mb-3 flex items-center gap-2 justify-center">
          <Smartphone className="w-5 h-5 text-purple-500" />
          <span>Smart <span className="text-purple-600">Pull-Tab</span> Feature!</span>
        </h3>
        
        {/* Feature Demo Visual */}
        <div className="bg-white rounded-xl p-4 mb-3 shadow-sm border border-purple-100">
          <div className="flex items-center justify-center gap-4">
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center mb-2 shadow-lg">
                <Grip className="w-7 h-7 text-white" />
              </div>
              <p className="text-[10px] font-bold text-gray-600">Tab तान्नुहोस्</p>
            </div>
            <div className="text-2xl animate-bounce">➡️</div>
            <div className="text-center">
              <div className="w-14 h-14 mx-auto bg-gradient-to-br from-amber-400 to-orange-500 rounded-xl flex items-center justify-center mb-2 shadow-lg animate-bounce-subtle">
                <Smartphone className="w-7 h-7 text-white" />
              </div>
              <p className="text-[10px] font-bold text-gray-600">Phone निस्कन्छ!</p>
            </div>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            🎯 एक हातले सजिलै फोन निकाल्नुहोस्!
          </p>
        </div>
        
        <p className="text-center text-[11px] text-purple-600 font-medium">
          ✨ Nepal मा पहिलो पटक - Smart Pull-Tab Technology!
        </p>
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
          <p className="text-[10px] font-bold text-gray-800">2-3 दिन</p>
          <p className="text-[9px] text-gray-500">Delivery</p>
        </div>
        
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="w-10 h-10 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-2">
            <Award className="w-5 h-5 text-yellow-600" />
          </div>
          <p className="text-[10px] font-bold text-gray-800">Premium</p>
          <p className="text-[9px] text-gray-500">Leather</p>
        </div>
        
        <div className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
          <div className="w-10 h-10 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-2">
            <ShieldCheck className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-[10px] font-bold text-gray-800">Secure</p>
          <p className="text-[9px] text-gray-500">Lock</p>
        </div>
      </div>

      {/* ALL-IN-ONE FEATURES */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
          <Wallet className="w-5 h-5 text-amber-500" />
          <span>एउटै Wallet मा <span className="text-amber-600">सबै कुरा</span>!</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-3">
          {/* Feature 1 - Phone Pocket */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
              <Smartphone className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-bold text-gray-800">Phone Pocket</p>
            <p className="text-[10px] text-gray-500">Flip/Standard दुबै अट्छ</p>
          </div>
          
          {/* Feature 2 - Card Slots */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 border border-blue-100">
            <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
              <CreditCard className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-bold text-gray-800">5 Card Slots</p>
            <p className="text-[10px] text-gray-500">ATM, PAN सबै राख्नुहोस्</p>
          </div>
          
          {/* Feature 3 - ID Window */}
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 border border-green-100">
            <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-2">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-bold text-gray-800">ID Window</p>
            <p className="text-[10px] text-gray-500">License, Photo देखाउनुहोस्</p>
          </div>
          
          {/* Feature 4 - Zipper Pocket */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl p-3 border border-amber-100">
            <div className="w-8 h-8 bg-amber-500 rounded-lg flex items-center justify-center mb-2">
              <Lock className="w-4 h-4 text-white" />
            </div>
            <p className="text-xs font-bold text-gray-800">Zipper Pocket</p>
            <p className="text-[10px] text-gray-500">Coins, छुट्टा सुरक्षित</p>
          </div>
        </div>
      </div>

      {/* WHY BUY */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-current" />
          <span>किन <span className="text-amber-600">Smart Wallet</span> किन्ने?</span>
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Bag बोक्नुपर्दैन - <span className="text-amber-600">Grab & Go!</span></p>
              <p className="text-[11px] text-gray-500">Phone + Cash + Cards एकैमा 👜</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Pull-Tab = <span className="text-purple-600">Magic Feel</span></p>
              <p className="text-[11px] text-gray-500">सबैले सोध्छन् कहाँबाट किनेको! ✨</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Premium <span className="text-pink-600">PU Leather</span></p>
              <p className="text-[11px] text-gray-500">Classy look + Durable quality 💎</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800"><span className="text-red-500">Best Gift</span> for loved ones</p>
              <p className="text-[11px] text-gray-500">GF, Wife, Sister, Mom - सबैलाई मन पर्छ 💝</p>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMER REVIEWS */}
      <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 rounded-2xl p-4 border border-amber-100">
        <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2">
          <Quote className="w-5 h-5 text-amber-500" />
          Customer Love 💛
        </h3>
        
        <div className="space-y-3">
          {/* Review 1 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-amber-100 relative">
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
              <Verified className="w-3 h-3 text-white" />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">A</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-gray-800">Anju Thapa</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">📍 Kathmandu • 3 days ago</p>
                <p className="text-xs text-gray-700">&quot;Pull-tab feature त amazing छ! Phone निकाल्दा सबै हेर्छन् 😍&quot;</p>
              </div>
            </div>
          </div>
          
          {/* Review 2 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-amber-100 relative">
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
              <Verified className="w-3 h-3 text-white" />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">S</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-gray-800">Sabina Rai</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">📍 Pokhara • 1 week ago</p>
                <p className="text-xs text-gray-700">&quot;Market जाँदा bag बोक्नुपर्दैन अब। Phone, cards, cash सबै एकैमा! 💖&quot;</p>
              </div>
            </div>
          </div>
          
          {/* Review 3 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-amber-100 relative">
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
              <Verified className="w-3 h-3 text-white" />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">R</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-gray-800">Rita Sharma</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">📍 Chitwan • 2 weeks ago</p>
                <p className="text-xs text-gray-700">&quot;Sister लाई gift दिएँ, उसले भन्छे यो best gift हो! अर्को color पनि किन्ने 🥰&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

