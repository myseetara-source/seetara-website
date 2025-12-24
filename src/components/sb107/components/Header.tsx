'use client';

import { useEffect, useState } from 'react';
import { Flame, ShoppingCart, Gift } from 'lucide-react';
import { getLogoUrl } from '../config/r2Config';
import { LOGO } from '@/lib/images';
import Image from 'next/image';

interface HeaderProps {
  onClaimOffer: () => void;
}

export default function Header({ onClaimOffer }: HeaderProps) {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 58, seconds: 30 });
  const [logoError, setLogoError] = useState(false);
  const [useFallback, setUseFallback] = useState(false);
  const [isFlashing, setIsFlashing] = useState(false);
  const logoUrl = getLogoUrl();
  const fallbackLogoUrl = LOGO || 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/logo/logo.png';

  useEffect(() => {
    const DURATION = (4 * 60 * 60 * 1000) + (58 * 60 * 1000) + (30 * 1000); 
    const STORAGE_KEY = 'seetara_flash_sale_sb107_v2';
    
    let savedDeadline = localStorage.getItem(STORAGE_KEY);
    let now = new Date().getTime();

    if (!savedDeadline || parseInt(savedDeadline) < now) {
      const newDeadline = now + DURATION;
      localStorage.setItem(STORAGE_KEY, newDeadline.toString());
      savedDeadline = newDeadline.toString();
    }

    const timer = setInterval(() => {
      now = new Date().getTime();
      const difference = parseInt(savedDeadline!) - now;

      if (difference <= 0) {
        const nextDeadline = now + DURATION;
        localStorage.setItem(STORAGE_KEY, nextDeadline.toString());
        savedDeadline = nextDeadline.toString();
      } else {
        setTimeLeft({
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Flash animation for urgency
  useEffect(() => {
    const flashInterval = setInterval(() => {
      setIsFlashing(true);
      setTimeout(() => setIsFlashing(false), 300);
    }, 10000);
    return () => clearInterval(flashInterval);
  }, []);

  const formatTime = (num: number) => num.toString().padStart(2, '0');

  return (
    <>
      {/* Urgency Banner */}
      <div className={`bg-gradient-to-r from-red-600 via-orange-500 to-red-600 text-white text-center py-2 px-3 font-bold z-[60] fixed top-1 left-0 right-0 flex items-center justify-center transition-all ${isFlashing ? 'scale-105' : ''}`}>
        <div className="flex items-center justify-center gap-2">
          <Flame className="w-4 h-4 animate-pulse flex-shrink-0" />
          <div className="flex items-center gap-1.5 text-[11px] sm:text-xs">
            <span className="font-bold">🔥 OFFER सकिँदैछ!</span>
            <div className="flex items-center gap-0.5 bg-black/30 px-2 py-0.5 rounded font-mono">
              <span className="bg-white/20 px-1 rounded">{formatTime(timeLeft.hours)}</span>
              <span className="animate-pulse">:</span>
              <span className="bg-white/20 px-1 rounded">{formatTime(timeLeft.minutes)}</span>
              <span className="animate-pulse">:</span>
              <span className="bg-white/20 px-1 rounded">{formatTime(timeLeft.seconds)}</span>
            </div>
          </div>
          <Flame className="w-4 h-4 animate-pulse flex-shrink-0" />
        </div>
      </div>
      
      {/* Spacer for fixed header */}
      <div className="h-9 w-full"></div>
      
      {/* Main Header */}
      <header className="bg-white shadow-md py-2.5 px-4 sticky top-9 z-40 border-b border-gray-100">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          {logoError ? (
            <div className="h-7 flex items-center">
              <span className="text-lg font-bold bg-gradient-to-r from-[#8B5A2B] to-[#5D3A1A] bg-clip-text text-transparent">
                Seetara
              </span>
            </div>
          ) : (
            <Image 
              src={useFallback ? fallbackLogoUrl : logoUrl} 
              alt="Seetara Logo" 
              width={100}
              height={28}
              className="h-7 w-auto object-contain"
              priority
              loading="eager"
              quality={90}
              onError={() => {
                if (!useFallback) {
                  setUseFallback(true);
                } else {
                  setLogoError(true);
                }
              }}
            />
          )}
          
          {/* CTA Button with Gift Icon */}
          <button 
            onClick={onClaimOffer} 
            className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg active:scale-95 transition-all flex items-center gap-1.5"
          >
            <Gift className="w-3.5 h-3.5" />
            <span>Order Now</span>
            <ShoppingCart className="w-3.5 h-3.5" />
          </button>
        </div>
      </header>
    </>
  );
}
