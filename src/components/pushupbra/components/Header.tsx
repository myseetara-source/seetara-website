'use client';

import { useState, useEffect } from 'react';
import { Clock, Sparkles, Shield } from 'lucide-react';

interface HeaderProps {
  onClaimOffer: () => void;
}

export default function Header({ onClaimOffer }: HeaderProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer
          return { hours: 2, minutes: 45, seconds: 30 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-rose-50 via-pink-50 to-rose-50 backdrop-blur-md border-b border-rose-100/50">
      {/* Urgency Banner */}
      <div className="bg-gradient-to-r from-rose-400 via-pink-500 to-rose-400 text-white py-2 px-3">
        <div className="flex items-center justify-center gap-2 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 animate-pulse" />
          <span>✨ LIMITED OFFER - 33% OFF ✨</span>
          <div className="flex items-center gap-1 bg-white/20 px-2 py-0.5 rounded-full">
            <Clock className="w-3 h-3" />
            <span className="font-mono font-bold">
              {formatTime(timeLeft.hours)}:{formatTime(timeLeft.minutes)}:{formatTime(timeLeft.seconds)}
            </span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex items-center justify-between px-4 py-2.5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-sm font-bold">S</span>
          </div>
          <div>
            <h1 className="text-sm font-bold text-gray-800 tracking-tight">Seetara</h1>
            <p className="text-[9px] text-rose-500 -mt-0.5">Confidence Starts Here</p>
          </div>
        </div>
        
        <button
          onClick={onClaimOffer}
          className="bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:shadow-xl active:scale-95 transition-all flex items-center gap-1.5"
        >
          <Shield className="w-3.5 h-3.5" />
          Order Now
        </button>
      </div>
    </header>
  );
}
