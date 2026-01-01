'use client';

import { ShoppingCart, Sparkles, Moon, Check } from 'lucide-react';

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
  const discountPercent = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-2xl md:hidden">
      <div className="max-w-md mx-auto px-4 py-3">
        {/* Main Content */}
        <div className="flex items-center gap-3">
          {/* Price Section */}
          <div className="flex-shrink-0">
            <div className="flex items-center gap-1">
              <span className="text-xs text-gray-400 line-through">रु. {currentProduct.originalPrice}</span>
              <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-full font-bold">-{discountPercent}%</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-xl font-black text-amber-600">रु. {currentProduct.price}/-</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
          </div>
          
          {/* Order Button with Animation */}
          <button
            onClick={scrollToOrder}
            className="flex-1 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white py-3 rounded-xl font-bold text-base flex items-center justify-center gap-2 shadow-xl animate-order-pulse relative overflow-hidden group"
          >
            {/* Animated Shine Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            
            {/* Button Content */}
            <Moon className="w-5 h-5" />
            <span>Order Luna</span>
            <ShoppingCart className="w-5 h-5 animate-bounce-gentle" />
          </button>
        </div>
        
        {/* Trust Badges */}
        <div className="flex items-center justify-center gap-3 mt-2 text-[10px] text-gray-500">
          <span className="flex items-center gap-1">
            <Check className="w-3 h-3 text-green-500" /> Cash on Delivery
          </span>
          <span className="text-gray-300">•</span>
          <span className="flex items-center gap-1">
            <Moon className="w-3 h-3 text-amber-500" /> Free Pouch
          </span>
        </div>
      </div>
    </div>
  );
}

