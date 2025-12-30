'use client';

import { Truck, ShieldCheck, Eye, Award, Star, TrendingUp, Flame, Gift, Heart, CheckCircle, Quote, Verified } from 'lucide-react';
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
      
      {/* LIVE STATS BAR - Clean & Readable Design */}
      <div className={`relative rounded-2xl overflow-hidden shadow-lg transition-all duration-700 ${isStatsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* Clean Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800"></div>
        
        <div className="relative z-10 p-4">
          {/* Stats Row */}
          <div className="flex items-center justify-between mb-4 bg-white/10 rounded-xl p-3">
            {/* Stock Left */}
            <div className="text-center flex-1">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Flame className="w-4 h-4 text-orange-400" />
                <span className="text-2xl font-black text-white">{stockLeft}</span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium">बाँकी छ</p>
            </div>
            
            {/* Divider */}
            <div className="w-px h-10 bg-white/20"></div>
            
            {/* Viewers */}
            <div className="text-center flex-1">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span className="text-2xl font-black text-white">{viewers}</span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium">हेर्दैछन्</p>
            </div>
            
            {/* Divider */}
            <div className="w-px h-10 bg-white/20"></div>
            
            {/* Sold Today */}
            <div className="text-center flex-1">
              <div className="flex items-center gap-1.5 justify-center mb-1">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span className="text-2xl font-black text-white">47</span>
              </div>
              <p className="text-[11px] text-gray-300 font-medium">आज बिक्यो</p>
            </div>
          </div>
          
          {/* Progress Section */}
          <div className="bg-white rounded-xl p-3 shadow-inner">
            <div className="flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5 text-sm font-bold text-gray-800">
                <span className="text-lg">🔥</span> 
                {soldPercentage.toFixed(0)}% बिक्री भयो
              </span>
              <span className="text-white bg-red-500 px-3 py-1 rounded-full text-xs font-bold shadow-md">
                छिटो गर्नुहोस्!
              </span>
            </div>
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full rounded-full transition-all duration-1000 relative overflow-hidden"
                style={{ 
                  width: `${soldPercentage}%`,
                  background: 'linear-gradient(90deg, #22c55e 0%, #84cc16 30%, #eab308 60%, #f97316 80%, #ef4444 100%)'
                }}
              >
                <div className="absolute inset-0 animate-shimmer-fast bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-2 font-medium">
              ⚠️ Stock सकिँदै छ - अहिले नै Order गर्नुहोस्!
            </p>
          </div>
        </div>
      </div>

      {/* TRUST BADGES - Simple Grid */}
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
          <div className="w-10 h-10 mx-auto bg-pink-100 rounded-full flex items-center justify-center mb-2">
            <Gift className="w-5 h-5 text-pink-600" />
          </div>
          <p className="text-[10px] font-bold text-gray-800">Free</p>
          <p className="text-[9px] text-gray-500">Gift</p>
        </div>
      </div>


      {/* WHY BUY */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <h3 className="font-black text-gray-900 text-base mb-4 flex items-center gap-2">
          <Heart className="w-5 h-5 text-red-500 fill-current" />
          <span>Why Choose <span className="text-amber-600">Golden Chain</span> Bag?</span>
        </h3>
        
        <div className="space-y-1">
          <div className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Golden Chain = <span className="text-amber-600">Premium Look</span></p>
              <p className="text-[11px] text-gray-500">रु. 5000+ को Bag जस्तो देखिन्छ</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Party, Office, College - <span className="text-purple-600">सबैतिर</span></p>
              <p className="text-[11px] text-gray-500">Every occasion को लागि perfect</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800">Photo मा <span className="text-pink-600">झक्कास</span> देखिन्छ</p>
              <p className="text-[11px] text-gray-500">Instagram-ready aesthetic ✨</p>
            </div>
          </div>
          
          <div className="flex items-start gap-2.5 py-1.5 px-2 rounded-lg hover:bg-gray-50 transition-colors">
            <div className="w-6 h-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <CheckCircle className="w-3.5 h-3.5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800"><span className="text-red-500">Best Gift</span> for loved ones</p>
              <p className="text-[11px] text-gray-500">GF, Wife, Sister, Mom - सबैलाई मन पर्छ 💝</p>
            </div>
          </div>
        </div>
      </div>

      {/* CUSTOMER REVIEWS - Enhanced Design */}
      <div className="bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-2xl p-4 border border-purple-100">
        <h3 className="font-black text-gray-900 text-sm mb-4 flex items-center gap-2">
          <Quote className="w-5 h-5 text-purple-500" />
          Customer Love 💜
        </h3>
        
        <div className="space-y-3">
          {/* Review 1 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-purple-100 relative">
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
              <Verified className="w-3 h-3 text-white" />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">S</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-gray-800">Sita Sharma</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">📍 Kathmandu • 2 days ago</p>
                <p className="text-xs text-gray-700">&quot;Photo भन्दा Real मा झन् राम्रो छ! सबैले सोध्छन् कहाँबाट किनेको 😍&quot;</p>
              </div>
            </div>
          </div>
          
          {/* Review 2 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-purple-100 relative">
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
              <Verified className="w-3 h-3 text-white" />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">R</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-gray-800">Rabina Magar</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">📍 Pokhara • 5 days ago</p>
                <p className="text-xs text-gray-700">&quot;Quality एकदमै top class! 2 दिनमै आइपुग्यो। Highly recommend! 💖&quot;</p>
              </div>
            </div>
          </div>
          
          {/* Review 3 */}
          <div className="bg-white rounded-xl p-3 shadow-sm border border-purple-100 relative">
            <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
              <Verified className="w-3 h-3 text-white" />
            </div>
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">A</div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-xs font-bold text-gray-800">Anju Gurung</p>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 mb-1">📍 Chitwan • 1 week ago</p>
                <p className="text-xs text-gray-700">&quot;BF ले Birthday मा gift दियो, I loved it! अर्को color पनि किन्ने plan छ 🥰&quot;</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
