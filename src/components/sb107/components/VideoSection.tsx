'use client';

import { Play } from 'lucide-react';
import { getVideoUrl } from '../config/r2Config';

export default function VideoSection() {
  const videoUrl = getVideoUrl();

  return (
    <div className="px-4 py-4">
       {/* Header */}
       <div className="text-center mb-3">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-100 to-pink-100 px-3 py-1.5 rounded-full shadow-sm border border-red-200">
            <Play className="w-3.5 h-3.5 text-red-500 fill-current"/>
            <span className="text-[11px] font-bold text-red-700">Real Product Video</span>
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
    </div>
  );
}
