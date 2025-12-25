'use client';

import { Play, Eye } from 'lucide-react';
import { getVideoUrl } from '../config/r2Config';

export default function VideoSection() {
  const videoUrl = getVideoUrl();

  return (
    <div className="px-4 py-4">
       {/* Header */}
       <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-3 py-1.5 rounded-full shadow-sm border border-emerald-200">
            <Play className="w-3.5 h-3.5 text-emerald-500 fill-current"/>
            <span className="text-[11px] font-bold text-emerald-700">Real Product Video</span>
          </div>
       </div>
       
       {/* Video Container - 3:4 Ratio on mobile, 16:9 on desktop */}
       <div className="relative w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-black aspect-[3/4] max-w-[280px] mx-auto lg:max-w-lg lg:aspect-video">
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
          
          {/* Real Product Badge */}
          <div className="absolute top-3 left-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-[9px] px-2.5 py-1 rounded-full font-bold animate-pulse shadow-lg">
            🔴 LIVE
          </div>
       </div>
       
       <p className="text-center text-xs text-gray-500 mt-3">
         👆 Video हेरेर Product को Quality बुझ्नुहोस्
       </p>
    </div>
  );
}

