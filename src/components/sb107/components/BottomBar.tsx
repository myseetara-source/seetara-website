'use client';

import { ShoppingCart, Sparkles, Gift, Check } from 'lucide-react';

interface BottomBarProps {
  orderType: 'buy' | 'inquiry';
  currentProduct: {
    price: number;
    originalPrice: number;
  };
  grandTotal: number;
  handleSubmit: (e: React.FormEvent) => void;
  scrollToOrder: () => void;
  formData: {
    name: string;
    phone: string;
  };
  isSubmitting: boolean;
}

export default function BottomBar({ 
  currentProduct, 
  scrollToOrder
}: BottomBarProps) {

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl md:hidden">
      <div className="max-w-md mx-auto px-4 py-3">
        {/* Main Content */}
        <div className="flex items-center gap-3">
          {/* Price Section */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 line-through">रु. {currentProduct.originalPrice}</span>
              <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">-30%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-gray-900">रु. {currentProduct.price}/-</span>
              <Sparkles className="w-4 h-4 text-yellow-500" />
            </div>
          </div>
          
          {/* Order Button with Animation */}
          <button
            onClick={scrollToOrder}
            className="flex-1 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 text-white py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-xl animate-order-pulse relative overflow-hidden group"
          >
            {/* Animated Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Button Content */}
            <ShoppingCart className="w-5 h-5 animate-bounce-gentle" />
            <span>Order Now</span>
          </button>
        </div>
        
        {/* Trust Badges - Without Free Shipping */}
        <div className="flex items-center justify-center gap-3 mt-2 text-[10px] text-gray-500">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" /> Cash on Delivery
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <Gift className="w-3 h-3 text-pink-500" /> Free Strap
          </span>
        </div>
      </div>
    </div>
  );
}
