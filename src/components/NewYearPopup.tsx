'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Gift, Star } from 'lucide-react';
import Image from 'next/image';
import { LOGO } from '@/lib/images';

export default function NewYearPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if already shown today
    const lastShown = localStorage.getItem('seetara_newyear_popup_2026');
    const today = new Date().toDateString();
    
    if (lastShown !== today) {
      // Show popup after a short delay for better UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    // Save to localStorage so it doesn't show again today
    localStorage.setItem('seetara_newyear_popup_2026', new Date().toDateString());
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 500);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center p-4 transition-all duration-500 ${
        isClosing ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Popup Container */}
      <div 
        className={`relative w-full max-w-md transform transition-all duration-700 ${
          isClosing ? 'scale-90 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        {/* Main Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a0a05] via-[#2C1810] to-[#1a0a05] shadow-2xl border border-[#C9A227]/30">
          
          {/* Animated Background Elements */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Floating Stars */}
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-twinkle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${2 + Math.random() * 2}s`,
                }}
              >
                <Star className={`text-[#C9A227]/40 ${i % 3 === 0 ? 'w-2 h-2' : 'w-1 h-1'}`} fill="currentColor" />
              </div>
            ))}
            
            {/* Gradient Orbs */}
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#C9A227]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-[#C9A227]/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
            
            {/* Confetti Effect */}
            <div className="absolute inset-0">
              {[...Array(15)].map((_, i) => (
                <div
                  key={`confetti-${i}`}
                  className="absolute w-2 h-2 animate-confetti-fall"
                  style={{
                    left: `${10 + Math.random() * 80}%`,
                    animationDelay: `${Math.random() * 5}s`,
                    animationDuration: `${3 + Math.random() * 2}s`,
                    backgroundColor: ['#C9A227', '#FFD700', '#FFA500', '#FF6B6B', '#4ECDC4'][i % 5],
                    borderRadius: i % 2 === 0 ? '50%' : '2px',
                    transform: `rotate(${Math.random() * 360}deg)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-all duration-300 hover:rotate-90"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Content */}
          <div className="relative z-10 p-8 text-center">
            
            {/* Logo */}
            <div className="flex justify-center mb-4">
              <div className="relative w-28 h-12">
                <Image
                  src={LOGO}
                  alt="Seetara"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>

            {/* Year Badge */}
            <div className="flex justify-center mb-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C9A227]/20 border border-[#C9A227]/40">
                <Sparkles className="w-4 h-4 text-[#C9A227] animate-pulse" />
                <span className="text-sm font-medium text-[#C9A227] tracking-widest">2026</span>
                <Sparkles className="w-4 h-4 text-[#C9A227] animate-pulse" />
              </div>
            </div>

            {/* Main Heading */}
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-2 leading-tight">
              Happy
            </h2>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-[#FFD700] via-[#C9A227] to-[#FFD700] bg-clip-text text-transparent animate-shimmer-text bg-[length:200%_100%]">
                New Year!
              </span>
            </h1>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#C9A227]" />
              <Star className="w-4 h-4 text-[#C9A227]" fill="currentColor" />
              <div className="h-px w-12 bg-gradient-to-l from-transparent to-[#C9A227]" />
            </div>

            {/* Message */}
            <p className="text-[#E8DDD4] text-base mb-6 leading-relaxed max-w-xs mx-auto">
              Wishing you a year filled with style, elegance & beautiful moments! ✨
            </p>

            {/* Gift Banner */}
            <div className="bg-gradient-to-r from-[#C9A227]/20 via-[#C9A227]/30 to-[#C9A227]/20 rounded-2xl p-4 mb-6 border border-[#C9A227]/30">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-[#FFD700] animate-bounce" />
                <span className="text-[#FFD700] font-bold text-lg">New Year Special!</span>
                <Gift className="w-5 h-5 text-[#FFD700] animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
              <p className="text-[#E8DDD4] text-sm">
                Explore our premium collection & start your year in style
              </p>
            </div>

            {/* CTA Button */}
            <button
              onClick={handleClose}
              className="group relative w-full py-4 rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              {/* Button Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#C9A227] via-[#FFD700] to-[#C9A227] bg-[length:200%_100%] animate-shimmer-bg" />
              
              {/* Button Shine Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              
              {/* Button Text */}
              <span className="relative z-10 text-[#2C1810] flex items-center justify-center gap-2">
                <Sparkles className="w-5 h-5" />
                Explore Collection
                <Sparkles className="w-5 h-5" />
              </span>
            </button>

            {/* Footer */}
            <p className="mt-4 text-[#7A6252] text-xs">
              Be The Star You Are ⭐
            </p>
          </div>

          {/* Bottom Decorative Border */}
          <div className="h-1 bg-gradient-to-r from-transparent via-[#C9A227] to-transparent" />
        </div>
      </div>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
          100% { transform: translateY(400px) rotate(720deg); opacity: 0; }
        }
        @keyframes shimmer-text {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes shimmer-bg {
          0% { background-position: 0% center; }
          100% { background-position: 200% center; }
        }
        .animate-twinkle { animation: twinkle 2s ease-in-out infinite; }
        .animate-confetti-fall { animation: confetti-fall 5s linear infinite; }
        .animate-shimmer-text { animation: shimmer-text 3s linear infinite; }
        .animate-shimmer-bg { animation: shimmer-bg 2s linear infinite; }
      `}</style>
    </div>
  );
}

