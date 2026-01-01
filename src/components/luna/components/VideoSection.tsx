'use client';

import { Play, Moon } from 'lucide-react';
import { getVideoUrl } from '../config/r2Config';

export default function VideoSection() {
  const videoUrl = getVideoUrl();

  return (
    <div className="px-4 py-4">
       {/* Header - Luna themed light */}
       <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 px-3 py-1.5 rounded-full shadow-sm border border-amber-200">
            <Moon className="w-3.5 h-3.5 text-amber-500"/>
            <Play className="w-3.5 h-3.5 text-amber-600 fill-current"/>
            <span className="text-[11px] font-bold text-amber-700">Real Product Video</span>
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
       </div>
       
       {/* Caption */}
       <p className="text-center text-xs text-gray-500 mt-3">
         🌙 Space for your Universe — Watch it in action!
       </p>
    </div>
  );
}

