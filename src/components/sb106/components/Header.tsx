'use client';

import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
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
  const logoUrl = getLogoUrl();
  const fallbackLogoUrl = LOGO || 'https://pub-618cb6a991114e6b97382558a5b2adea.r2.dev/website/logo/logo.png'; // Use main website logo as fallback

  useEffect(() => {
    const DURATION = (4 * 60 * 60 * 1000) + (58 * 60 * 1000) + (30 * 1000); 
    const STORAGE_KEY = 'seetara_flash_sale_v1';
    
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

  return (
    <>
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white text-center py-2 px-3 text-xs font-bold shadow-md z-[60] fixed top-0 left-0 right-0 h-8 flex items-center justify-center">
        <div className="flex items-center justify-center gap-2">
          <Clock className="w-3 h-3 animate-pulse" />
          <span>🔥 FLASH SALE: Price increase in {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
        </div>
      </div>
      <div className="h-8 w-full bg-gray-50"></div>
      <header className="glass-nav shadow-sm py-3 px-4 sticky top-8 z-40 transition-all">
        <div className="flex justify-between items-center">
          {logoError ? (
            <div className="h-8 flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-[#8B5A2B] to-[#5D3A1A] bg-clip-text text-transparent">
                Seetara
              </span>
            </div>
          ) : (
            <Image 
              src={useFallback ? fallbackLogoUrl : logoUrl} 
              alt="Seetara Logo" 
              width={120}
              height={32}
              className="h-8 w-auto object-contain"
              priority
              quality={90}
              onError={() => {
                if (!useFallback) {
                  // Try fallback logo first
                  setUseFallback(true);
                } else {
                  // If fallback also fails, show text
                  setLogoError(true);
                }
              }}
            />
          )}
          <button onClick={onClaimOffer} className="bg-black text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg active:scale-95 transition-transform">
            Claim Offer
          </button>
        </div>
      </header>
    </>
  );
}

