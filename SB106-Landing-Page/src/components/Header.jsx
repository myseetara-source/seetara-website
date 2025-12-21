import React, { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';
import { getLogoUrl } from '../config/r2Config';

const Header = ({ onClaimOffer }) => {
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 58, seconds: 30 });
  const logoUrl = getLogoUrl();

  useEffect(() => {
    const DURATION = (4 * 60 * 60 * 1000) + (58 * 60 * 1000) + (30 * 1000); 
    const STORAGE_KEY = 'seetara_flash_sale_v1';
    
    let savedDeadline = localStorage.getItem(STORAGE_KEY);
    let now = new Date().getTime();

    if (!savedDeadline || parseInt(savedDeadline) < now) {
      const newDeadline = now + DURATION;
      localStorage.setItem(STORAGE_KEY, newDeadline);
      savedDeadline = newDeadline;
    }

    const timer = setInterval(() => {
      now = new Date().getTime();
      const difference = parseInt(savedDeadline) - now;

      if (difference <= 0) {
        const nextDeadline = now + DURATION;
        localStorage.setItem(STORAGE_KEY, nextDeadline);
        savedDeadline = nextDeadline;
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
          <img 
            src={logoUrl} 
            alt="Seetara Logo" 
            className="h-8 w-auto object-contain"
            onError={(e) => {
              // Fallback to text logo if image fails to load
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'block';
            }}
          />
          <span className="text-xl font-serif font-black tracking-tighter text-gray-900 hidden">Se'etara<span className="text-yellow-500">.</span></span>
          <button onClick={onClaimOffer} className="bg-black text-white px-4 py-2 rounded-full font-bold text-xs shadow-lg active:scale-95 transition-transform">
            Claim Offer
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;

