'use client';

import { ShoppingBag, MapPin } from 'lucide-react';

interface NotificationProps {
  show: boolean;
  data: {
    name: string;
    city: string;
    time: string;
  };
}

export default function Notification({ show, data }: NotificationProps) {
  return (
    <div
      className={`fixed top-20 left-4 right-4 z-[60] transition-all duration-500 ease-out ${
        show
          ? 'opacity-100 translate-y-0'
          : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl border border-rose-100 p-3 flex items-center gap-3 max-w-sm mx-auto">
        {/* Icon */}
        <div className="w-12 h-12 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
          <ShoppingBag className="w-6 h-6 text-white" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-800 truncate">
            {data.name} ले Order गर्नुभयो! 🎀
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
            <MapPin className="w-3 h-3" />
            <span>{data.city}</span>
            <span>•</span>
            <span>{data.time}</span>
          </div>
        </div>

        {/* Verified Badge */}
        <div className="bg-emerald-100 text-emerald-600 text-[9px] font-bold px-2 py-1 rounded-full flex-shrink-0">
          ✓ Verified
        </div>
      </div>
    </div>
  );
}
