'use client';

import { ShoppingBag, Sparkles } from 'lucide-react';

interface BottomBarProps {
  currentProduct: { name: string; price: number; originalPrice: number };
  grandTotal: number;
  scrollToOrder: () => void;
  isSubmitting: boolean;
  selectedSize: string;
}

export default function BottomBar({
  currentProduct,
  grandTotal,
  scrollToOrder,
  isSubmitting,
  selectedSize,
}: BottomBarProps) {
  const displayPrice = grandTotal > 0 ? grandTotal : currentProduct.price;
  const needsSize = !selectedSize;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-lg border-t border-rose-100 shadow-2xl z-50 md:hidden">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        {/* Price Display */}
        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-gray-900">
              रु. {displayPrice}
            </span>
            <span className="text-sm text-gray-400 line-through">
              रु. {currentProduct.originalPrice}
            </span>
          </div>
          <span className="text-[10px] text-rose-500 font-medium">
            {needsSize ? 'Select size above' : 'Free Delivery Available'}
          </span>
        </div>

        {/* CTA Button */}
        <button
          onClick={scrollToOrder}
          disabled={isSubmitting}
          className={`flex-1 max-w-[180px] py-3.5 rounded-xl font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 ${
            isSubmitting
              ? 'bg-gray-300 text-gray-500'
              : 'bg-gradient-to-r from-rose-500 via-pink-500 to-rose-500 text-white active:scale-95 hover:shadow-xl'
          }`}
        >
          {isSubmitting ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Order Now
            </>
          )}
        </button>
      </div>

      {/* Safety Strip */}
      <div className="bg-gradient-to-r from-rose-50 to-pink-50 px-4 py-1.5 flex items-center justify-center gap-4 text-[10px] text-gray-500">
        <span>🔒 Secure</span>
        <span>📦 Discrete Pack</span>
        <span>💳 COD Available</span>
      </div>
    </div>
  );
}
