'use client';

import { Play, Eye, Smartphone } from 'lucide-react';
import { getVideoUrl } from '../config/r2Config';

export default function VideoSection() {
  const videoUrl = getVideoUrl();

  return (
    <div className="px-4 py-4">
       {/* Header */}
       <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 px-3 py-1.5 rounded-full shadow-sm border border-purple-200">
            <Play className="w-3.5 h-3.5 text-purple-500 fill-current"/>
            <span className="text-[11px] font-bold text-purple-700">Smart Pull-Tab Demo!</span>
          </div>
       </div>
       
       {/* Video Container - 3:4 Ratio */}
       <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black aspect-[3/4] max-w-[280px] mx-auto">
          <video 
             src={videoUrl}
             className="w-full h-full object-cover"
             controls
             muted
             autoPlay
             loop
             playsInline
          />
          
          {/* HD Badge */}
          <div className="absolute top-3 right-3 bg-black/70 text-white text-[9px] px-2 py-1 rounded-full backdrop-blur-sm font-bold flex items-center gap-1">
            <Eye className="w-3 h-3" /> HD
          </div>
          
          {/* Feature Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-[9px] px-2.5 py-1 rounded-full font-bold animate-pulse shadow-lg flex items-center gap-1">
            <Smartphone className="w-3 h-3" /> Pull-Tab Magic
          </div>

          {/* Bottom Caption */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-[10px] px-3 py-1.5 rounded-full font-medium">
            👆 Tab तान्नुहोस् - Phone निस्कन्छ!
          </div>
       </div>
       
       {/* Caption */}
       <p className="text-center text-xs text-gray-500 mt-3">
         ✨ एक हातले सजिलै Phone निकाल्नुहोस्!
       </p>
    </div>
  );
}

