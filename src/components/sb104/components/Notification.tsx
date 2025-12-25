'use client';

import { Briefcase } from 'lucide-react';

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
    <div className={`fixed top-20 right-3 z-[100] max-w-[85%] transform transition-all duration-500 ${show ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0 pointer-events-none'}`}>
      <div className="bg-white/95 backdrop-blur-md shadow-lg rounded-xl p-2 flex items-center gap-2 border border-gray-100">
        {/* Icon */}
        <div className="bg-emerald-100 p-1.5 rounded-full shrink-0">
          <Briefcase className="w-4 h-4 text-emerald-600" />
        </div>
        
        {/* Text */}
        <div className="min-w-0">
          <p className="text-xs font-bold text-gray-800 truncate">
            {data.name} <span className="font-normal text-gray-500">from</span> {data.city}
          </p>
          <p className="text-[10px] text-gray-500">
            Just ordered a work bag • <span className="text-emerald-600 font-medium">{data.time}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

