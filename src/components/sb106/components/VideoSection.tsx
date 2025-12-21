'use client';

import { Play } from 'lucide-react';
import { getVideoUrl } from '../config/r2Config';

export default function VideoSection() {
  const videoUrl = getVideoUrl();

  return (
    <div className="px-4 mt-8 animate-slide-up md:mt-0 md:px-0" style={{ animationDelay: '0.25s' }}>
       <div className="flex items-center gap-2 mb-3 ml-1 md:justify-center">
          <div className="bg-red-500 p-1 rounded-full"><Play className="w-3 h-3 text-white fill-current"/></div>
          <p className="text-xs font-bold text-gray-600 uppercase">Watch Product Video</p>
       </div>
       <div className="relative w-full rounded-[2rem] overflow-hidden shadow-xl border-4 border-white bg-black aspect-[3/4] md:max-w-xs md:mx-auto">
          <video 
             src={videoUrl}
             className="w-full h-full object-cover"
             controls
             muted
             autoPlay
             loop
             playsInline
          />
          <div className="absolute top-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
            HD Quality
          </div>
       </div>
    </div>
  );
}

