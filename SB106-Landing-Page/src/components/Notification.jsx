import React from 'react';
import { ShoppingBag } from 'lucide-react';

const Notification = ({ show, data }) => {
  return (
    <div className={`fixed top-24 right-4 z-[100] max-w-[90%] md:max-w-sm transform transition-all duration-500 cubic-bezier(0.68, -0.55, 0.27, 1.55) ${show ? 'translate-x-0 opacity-100' : 'translate-x-[150%] opacity-0 pointer-events-none'}`}>
      <div className="glass-nav shadow-2xl rounded-2xl p-3 flex items-center gap-3 border border-green-100/50 backdrop-blur-xl bg-white/90">
        <div className="bg-green-100 p-2 rounded-full shrink-0">
          <ShoppingBag className="w-5 h-5 text-green-700" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-gray-900 truncate">{data.name} <span className="text-gray-500 font-normal">from</span> {data.city}</p>
          <p className="text-xs text-gray-600 mt-0.5">Just ordered a bag • <span className="text-green-600 font-medium">{data.time}</span></p>
        </div>
      </div>
    </div>
  );
};

export default Notification;

