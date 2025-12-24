'use client';

import { ShoppingBag } from 'lucide-react';

interface NotificationProps {
  show: boolean;
  data: {
    name: string;
    city: string;
    time: string;
  };
}

export default function Notification({ show, data }: NotificationProps) {
  if (!show) return null;

  return (
    <div className="fixed top-20 inset-x-0 z-[60] px-4 flex justify-center animate-notification-pop pointer-events-none">
      <div className="bg-white shadow-lg rounded-full border border-gray-200 px-4 py-2 flex items-center gap-2 pointer-events-auto">
        {/* Icon */}
        <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
          <ShoppingBag className="w-3 h-3 text-white" />
        </div>
        
        {/* Text */}
        <p className="text-xs text-gray-700 whitespace-nowrap">
          <span className="font-bold">{data.name}</span>
          <span className="text-gray-500"> from </span>
          <span className="font-semibold">{data.city}</span>
          <span className="text-green-600 font-bold"> Ordered!</span>
          <span className="text-gray-400 ml-1 text-[10px]">{data.time}</span>
        </p>
      </div>
    </div>
  );
}
